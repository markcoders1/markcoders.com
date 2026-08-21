import { useEffect, useRef, useCallback } from 'react';

/*
 * WebGL Fluid Cursor Glow — Vivid Motion style
 * 
 * Creates an organic, lava-like flowing blob that follows
 * the mouse cursor with fluid physics simulation.
 * Color: #04215a (deep navy blue) based
 */

// ─── GLSL Shaders ───────────────────────────────────────────────

const VERTEX_SHADER = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Advection: moves the dye/velocity field along itself
const ADVECTION_SHADER = `
  precision highp float;
  uniform sampler2D u_velocity;
  uniform sampler2D u_source;
  uniform vec2 u_texelSize;
  uniform float u_dt;
  uniform float u_dissipation;
  
  void main() {
    vec2 uv = gl_FragCoord.xy * u_texelSize;
    vec2 vel = texture2D(u_velocity, uv).xy;
    vec2 coord = uv - u_dt * vel * u_texelSize;
    gl_FragColor = u_dissipation * texture2D(u_source, coord);
  }
`;

// Splat: adds dye/velocity at cursor position  
const SPLAT_SHADER = `
  precision highp float;
  uniform sampler2D u_target;
  uniform vec2 u_point;
  uniform vec3 u_color;
  uniform float u_radius;
  uniform float u_aspectRatio;
  uniform vec2 u_texelSize;
  
  void main() {
    vec2 uv = gl_FragCoord.xy * u_texelSize;
    vec2 p = uv - u_point;
    p.x *= u_aspectRatio;
    vec3 splat = exp(-dot(p, p) / u_radius) * u_color;
    vec3 base = texture2D(u_target, uv).xyz;
    gl_FragColor = vec4(base + splat, 1.0);
  }
`;

// Divergence computation
const DIVERGENCE_SHADER = `
  precision highp float;
  uniform sampler2D u_velocity;
  uniform vec2 u_texelSize;
  
  void main() {
    vec2 uv = gl_FragCoord.xy * u_texelSize;
    float L = texture2D(u_velocity, uv - vec2(u_texelSize.x, 0.0)).x;
    float R = texture2D(u_velocity, uv + vec2(u_texelSize.x, 0.0)).x;
    float T = texture2D(u_velocity, uv + vec2(0.0, u_texelSize.y)).y;
    float B = texture2D(u_velocity, uv - vec2(0.0, u_texelSize.y)).y;
    float div = 0.5 * (R - L + T - B);
    gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
  }
`;

// Pressure solve (Jacobi iteration)
const PRESSURE_SHADER = `
  precision highp float;
  uniform sampler2D u_pressure;
  uniform sampler2D u_divergence;
  uniform vec2 u_texelSize;
  
  void main() {
    vec2 uv = gl_FragCoord.xy * u_texelSize;
    float L = texture2D(u_pressure, uv - vec2(u_texelSize.x, 0.0)).x;
    float R = texture2D(u_pressure, uv + vec2(u_texelSize.x, 0.0)).x;
    float T = texture2D(u_pressure, uv + vec2(0.0, u_texelSize.y)).x;
    float B = texture2D(u_pressure, uv - vec2(0.0, u_texelSize.y)).x;
    float div = texture2D(u_divergence, uv).x;
    float pressure = (L + R + B + T - div) * 0.25;
    gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
  }
`;

// Gradient subtraction
const GRADIENT_SHADER = `
  precision highp float;
  uniform sampler2D u_pressure;
  uniform sampler2D u_velocity;
  uniform vec2 u_texelSize;
  
  void main() {
    vec2 uv = gl_FragCoord.xy * u_texelSize;
    float L = texture2D(u_pressure, uv - vec2(u_texelSize.x, 0.0)).x;
    float R = texture2D(u_pressure, uv + vec2(u_texelSize.x, 0.0)).x;
    float T = texture2D(u_pressure, uv + vec2(0.0, u_texelSize.y)).x;
    float B = texture2D(u_pressure, uv - vec2(0.0, u_texelSize.y)).x;
    vec2 velocity = texture2D(u_velocity, uv).xy;
    velocity -= vec2(R - L, T - B);
    gl_FragColor = vec4(velocity, 0.0, 1.0);
  }
`;

// Display: renders the dye field with the #04215a color palette
const DISPLAY_SHADER = `
  precision highp float;
  uniform sampler2D u_texture;
  uniform vec2 u_texelSize;
  
  void main() {
    vec2 uv = gl_FragCoord.xy * u_texelSize;
    vec3 dye = texture2D(u_texture, uv).rgb;
    
    // Base color: very dark navy (almost black like Vivid Motion bg)
    vec3 baseColor = vec3(0.012, 0.012, 0.02);
    
    // Glow color palette - deep blue #04215a mapped to warm vibrant feel
    vec3 color1 = vec3(0.016, 0.13, 0.353);  // #04215a deep blue
    vec3 color2 = vec3(0.03, 0.18, 0.55);     // brighter blue
    vec3 color3 = vec3(0.06, 0.25, 0.75);     // vivid blue core
    
    float intensity = length(dye);
    float t = clamp(intensity * 1.5, 0.0, 1.0);
    
    // Smooth color ramp from dark -> deep blue -> vivid blue
    vec3 glowColor;
    if (t < 0.5) {
      glowColor = mix(color1, color2, t * 2.0);
    } else {
      glowColor = mix(color2, color3, (t - 0.5) * 2.0);
    }
    
    vec3 finalColor = baseColor + glowColor * t * 2.5;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

// Clear shader
const CLEAR_SHADER = `
  precision highp float;
  uniform sampler2D u_texture;
  uniform float u_value;
  uniform vec2 u_texelSize;
  
  void main() {
    vec2 uv = gl_FragCoord.xy * u_texelSize;
    gl_FragColor = u_value * texture2D(u_texture, uv);
  }
`;

// ─── Fluid Simulation Engine ────────────────────────────────────

class FluidSimulation {
  constructor(canvas) {
    this.canvas = canvas;
    const params = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    this.gl = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
    
    if (!this.gl) {
      console.warn('WebGL not supported');
      return;
    }

    const gl = this.gl;
    
    // Check for float texture support
    const halfFloat = gl.getExtension('OES_texture_half_float');
    const halfFloatLinear = gl.getExtension('OES_texture_half_float_linear');
    
    this.halfFloatType = halfFloat ? halfFloat.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;
    this.supportLinearFloat = !!halfFloatLinear;
    
    // Simulation resolution (lower = faster, more fluid-like)
    this.simWidth = 128;
    this.simHeight = 128;
    this.dyeWidth = 512;
    this.dyeHeight = 512;
    
    this.updateResolution();
    
    // Create vertex buffer (full-screen quad)
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
    
    this.indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
    
    this.vertexBuffer = buffer;
    
    // Compile all shader programs
    this.programs = {
      advection: this.createProgram(VERTEX_SHADER, ADVECTION_SHADER),
      splat: this.createProgram(VERTEX_SHADER, SPLAT_SHADER),
      divergence: this.createProgram(VERTEX_SHADER, DIVERGENCE_SHADER),
      pressure: this.createProgram(VERTEX_SHADER, PRESSURE_SHADER),
      gradient: this.createProgram(VERTEX_SHADER, GRADIENT_SHADER),
      display: this.createProgram(VERTEX_SHADER, DISPLAY_SHADER),
      clear: this.createProgram(VERTEX_SHADER, CLEAR_SHADER),
    };
    
    // Create framebuffers for simulation
    this.velocity = this.createDoubleFBO(this.simWidth, this.simHeight);
    this.pressure = this.createDoubleFBO(this.simWidth, this.simHeight);
    this.divergenceFBO = this.createFBO(this.simWidth, this.simHeight);
    this.dye = this.createDoubleFBO(this.dyeWidth, this.dyeHeight);
  }
  
  updateResolution() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const aspect = w / h;
    
    if (aspect > 1) {
      this.simWidth = Math.round(128 * aspect);
      this.simHeight = 128;
      this.dyeWidth = Math.round(512 * aspect);
      this.dyeHeight = 512;
    } else {
      this.simWidth = 128;
      this.simHeight = Math.round(128 / aspect);
      this.dyeWidth = 512;
      this.dyeHeight = Math.round(512 / aspect);
    }
  }

  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
    }
    return shader;
  }

  createProgram(vsSource, fsSource) {
    const gl = this.gl;
    const program = gl.createProgram();
    gl.attachShader(program, this.createShader(gl.VERTEX_SHADER, vsSource));
    gl.attachShader(program, this.createShader(gl.FRAGMENT_SHADER, fsSource));
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
    }
    
    const uniforms = {};
    const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(program, i);
      uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }
    
    return { program, uniforms };
  }

  createFBO(w, h) {
    const gl = this.gl;
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.supportLinearFloat ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.supportLinearFloat ? gl.LINEAR : gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, this.halfFloatType, null);
    
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    return { texture, fbo, width: w, height: h };
  }

  createDoubleFBO(w, h) {
    let fbo1 = this.createFBO(w, h);
    let fbo2 = this.createFBO(w, h);
    return {
      get read() { return fbo1; },
      get write() { return fbo2; },
      swap() { const temp = fbo1; fbo1 = fbo2; fbo2 = temp; },
      width: w,
      height: h,
    };
  }

  useProgram(prog) {
    const gl = this.gl;
    gl.useProgram(prog.program);
    
    // Bind vertex attribute
    const posLoc = gl.getAttribLocation(prog.program, 'a_position');
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
  }

  blit(target) {
    const gl = this.gl;
    if (target) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      gl.viewport(0, 0, target.width, target.height);
    } else {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  splat(x, y, dx, dy, color) {
    const gl = this.gl;
    const prog = this.programs.splat;
    this.useProgram(prog);
    
    gl.uniform1i(prog.uniforms.u_target, 0);
    gl.uniform2f(prog.uniforms.u_point, x, y);
    gl.uniform3f(prog.uniforms.u_color, dx, dy, 0.0);
    gl.uniform1f(prog.uniforms.u_radius, 0.0004);
    gl.uniform1f(prog.uniforms.u_aspectRatio, this.canvas.width / this.canvas.height);
    gl.uniform2f(prog.uniforms.u_texelSize, 1.0 / this.velocity.width, 1.0 / this.velocity.height);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
    this.blit(this.velocity.write);
    this.velocity.swap();
    
    // Splat dye
    gl.uniform2f(prog.uniforms.u_texelSize, 1.0 / this.dye.width, 1.0 / this.dye.height);
    gl.uniform3f(prog.uniforms.u_color, color.r, color.g, color.b);
    gl.uniform1f(prog.uniforms.u_radius, 0.0008);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
    this.blit(this.dye.write);
    this.dye.swap();
  }

  step(dt) {
    const gl = this.gl;
    
    // 1. Advect velocity
    const advProg = this.programs.advection;
    this.useProgram(advProg);
    gl.uniform2f(advProg.uniforms.u_texelSize, 1.0 / this.simWidth, 1.0 / this.simHeight);
    gl.uniform1f(advProg.uniforms.u_dt, dt);
    gl.uniform1f(advProg.uniforms.u_dissipation, 0.98);
    gl.uniform1i(advProg.uniforms.u_velocity, 0);
    gl.uniform1i(advProg.uniforms.u_source, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
    this.blit(this.velocity.write);
    this.velocity.swap();
    
    // 2. Advect dye
    gl.uniform2f(advProg.uniforms.u_texelSize, 1.0 / this.dyeWidth, 1.0 / this.dyeHeight);
    gl.uniform1f(advProg.uniforms.u_dissipation, 0.97);
    gl.uniform1i(advProg.uniforms.u_velocity, 0);
    gl.uniform1i(advProg.uniforms.u_source, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
    this.blit(this.dye.write);
    this.dye.swap();
    
    // 3. Compute divergence
    const divProg = this.programs.divergence;
    this.useProgram(divProg);
    gl.uniform2f(divProg.uniforms.u_texelSize, 1.0 / this.simWidth, 1.0 / this.simHeight);
    gl.uniform1i(divProg.uniforms.u_velocity, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
    this.blit(this.divergenceFBO);
    
    // 4. Clear pressure
    const clearProg = this.programs.clear;
    this.useProgram(clearProg);
    gl.uniform2f(clearProg.uniforms.u_texelSize, 1.0 / this.simWidth, 1.0 / this.simHeight);
    gl.uniform1f(clearProg.uniforms.u_value, 0.8);
    gl.uniform1i(clearProg.uniforms.u_texture, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
    this.blit(this.pressure.write);
    this.pressure.swap();
    
    // 5. Pressure solve (Jacobi iterations)
    const presProg = this.programs.pressure;
    this.useProgram(presProg);
    gl.uniform2f(presProg.uniforms.u_texelSize, 1.0 / this.simWidth, 1.0 / this.simHeight);
    gl.uniform1i(presProg.uniforms.u_divergence, 1);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.divergenceFBO.texture);
    
    for (let i = 0; i < 20; i++) {
      gl.uniform1i(presProg.uniforms.u_pressure, 0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
      this.blit(this.pressure.write);
      this.pressure.swap();
    }
    
    // 6. Subtract pressure gradient from velocity
    const gradProg = this.programs.gradient;
    this.useProgram(gradProg);
    gl.uniform2f(gradProg.uniforms.u_texelSize, 1.0 / this.simWidth, 1.0 / this.simHeight);
    gl.uniform1i(gradProg.uniforms.u_pressure, 0);
    gl.uniform1i(gradProg.uniforms.u_velocity, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
    this.blit(this.velocity.write);
    this.velocity.swap();
  }

  render() {
    const gl = this.gl;
    const prog = this.programs.display;
    this.useProgram(prog);
    gl.uniform2f(prog.uniforms.u_texelSize, 1.0 / this.canvas.width, 1.0 / this.canvas.height);
    gl.uniform1i(prog.uniforms.u_texture, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
    this.blit(null);
  }
}

// ─── React Component ────────────────────────────────────────────

const CursorGlow = () => {
  const canvasRef = useRef(null);
  const simRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const sim = new FluidSimulation(canvas);
    simRef.current = sim;

    if (!sim.gl) return;

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    let lastTime = performance.now();
    let splatCounter = 0;

    const animate = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.016);
      lastTime = now;

      const mouse = mouseRef.current;
      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // Splat dye at cursor position when mouse moves
      if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
        const x = mouse.x / canvas.width;
        const y = 1.0 - mouse.y / canvas.height;
        
        // Scale velocity for more dramatic fluid effect
        const velX = dx * 12.0;
        const velY = -dy * 12.0;
        
        // Deep blue #04215a color for the glow dye
        sim.splat(x, y, velX, velY, { r: 0.15, g: 0.45, b: 1.0 });
        splatCounter = 0;
      }

      // Simulation step
      sim.step(dt);
      sim.render();

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default CursorGlow;