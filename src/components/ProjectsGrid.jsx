import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GRID_PROJECTS } from '../data/projects';
import './ProjectsGrid.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectsGrid = ({ previewImageRef }) => {
  const rootRef = useRef(null);
  const firstCellRef = useRef(null);
  const [morphComplete, setMorphComplete] = useState(false);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let morphCleanup = () => {};
    let morphTimer;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const cells = root.querySelectorAll('.projects-grid__cell');

      if (!reduce) {
        cells.forEach((cell) => {
          const frame = cell.querySelector('.projects-grid__frame');
          if (!frame) return;

          gsap.set(frame, { scale: 0.72, yPercent: 8, force3D: true });

          gsap.to(frame, {
            scale: 1,
            yPercent: 0,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: cell,
              start: 'top 95%',
              end: 'top 35%',
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          });
        });
      }
    }, root);

    const previewImg = previewImageRef?.current;
    const targetCell = firstCellRef.current;

    if (previewImg && targetCell) {
      morphTimer = window.setTimeout(() => {
        const clone = document.createElement('img');
        clone.src = previewImg.src;
        clone.alt = '';
        clone.style.cssText = `
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          border-radius: 16px;
          object-fit: cover;
          will-change: top, left, width, height;
        `;
        document.body.appendChild(clone);
        gsap.set(clone, { opacity: 0 });

        const st = ScrollTrigger.create({
          trigger: root,
          start: 'top 90%',
          end: 'top 5%',
          scrub: 0.6,
          onUpdate: (self) => {
            const progress = self.progress;
            const previewRect = previewImg.getBoundingClientRect();
            const targetRect = targetCell.getBoundingClientRect();

            clone.style.top = `${previewRect.top + (targetRect.top - previewRect.top) * progress}px`;
            clone.style.left = `${previewRect.left + (targetRect.left - previewRect.left) * progress}px`;
            clone.style.width = `${previewRect.width + (targetRect.width - previewRect.width) * progress}px`;
            clone.style.height = `${previewRect.height + (targetRect.height - previewRect.height) * progress}px`;
            clone.style.borderRadius = `${16 + (28 - 16) * progress}px`;

            if (progress > 0.02) {
              clone.style.opacity = '1';
              previewImg.style.opacity = '0';
            } else {
              clone.style.opacity = '0';
              previewImg.style.opacity = '1';
            }

            const done = progress > 0.95;
            setMorphComplete(done);
            if (done) clone.style.opacity = '0';
          },
        });

        morphCleanup = () => {
          st.kill();
          clone.remove();
          previewImg.style.opacity = '1';
        };
      }, 400);
    }

    const refresh = () => ScrollTrigger.refresh(true);
    const onLoad = () => refresh();

    const images = root.querySelectorAll('.projects-grid__media');
    images.forEach((img) => {
      if (!img.complete) img.addEventListener('load', onLoad, { once: true });
    });

    requestAnimationFrame(refresh);
    const refreshTimers = [150, 600, 1200, 2000].map((ms) =>
      window.setTimeout(refresh, ms)
    );

    return () => {
      window.clearTimeout(morphTimer);
      refreshTimers.forEach((id) => window.clearTimeout(id));
      images.forEach((img) => img.removeEventListener('load', onLoad));
      morphCleanup();
      ctx.revert();
    };
  }, [previewImageRef]);

  return (
    <div ref={rootRef} className="projects-grid">
      <div className="projects-grid__rows">
        {GRID_PROJECTS.map((project, rowIndex) => (
          <div className="projects-grid__row" data-id={project.id} key={project.id}>
            {project.images.map((img, i) => {
              const isFirstCell = rowIndex === 0 && i === 0;
              return (
                <a
                  href={project.href}
                  ref={isFirstCell ? firstCellRef : null}
                  className={`projects-grid__cell${
                    i === 0 ? ' projects-grid__cell--left' : ' projects-grid__cell--right'
                  }`}
                  key={`${project.id}-${img.src}`}
                >
                  <div className="projects-grid__frame">
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="projects-grid__media"
                      loading={rowIndex < 2 ? 'eager' : 'lazy'}
                      style={isFirstCell && !morphComplete ? { opacity: 0 } : undefined}
                    />
                    <div className="projects-grid__overlay">
                      <span className="projects-grid__cta">View project</span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsGrid;
