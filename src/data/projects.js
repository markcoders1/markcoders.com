/**
 * Row-based project grid — each row = 2 side-by-side images (k72-style).
 * Used by ProjectsGrid.jsx
 */
export const GRID_PROJECTS = [
  {
    id: 'identity-engine',
    client: 'Studio Mark',
    title: 'Identity Engine',
    year: '2026',
    href: '#',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=80',
        alt: 'Runners against bright sky',
      },
      {
        src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80',
        alt: 'Abstract purple liquid waves',
      },
    ],
  },
  {
    id: 'liquid-chrome',
    client: 'Chrome Lab',
    title: 'Liquid Chrome',
    year: '2026',
    href: '#',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
        alt: 'Mountain landscape in snow',
      },
      {
        src: 'https://images.unsplash.com/photo-1452195100486-9cc8059874a0?auto=format&fit=crop&w=1400&q=80',
        alt: 'Cheese wheel on patterned paper',
      },
    ],
  },
  {
    id: 'cinematic-scroll',
    client: 'Reel House',
    title: 'Cinematic Scroll',
    year: '2026',
    href: '#',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1494869042583-f6c911f318d1?auto=format&fit=crop&w=1400&q=80',
        alt: 'Close-up eye detail',
      },
      {
        src: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=1400&q=80',
        alt: 'Product packaging bags',
      },
    ],
  },
  {
    id: 'spatial-menu',
    client: 'Interface Co',
    title: 'Spatial Menu',
    year: '2026',
    href: '#',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
        alt: 'Mountain peaks',
      },
      {
        src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1400&q=80',
        alt: 'Neon glass geometry',
      },
    ],
  },
  {
    id: 'type-reveal',
    client: 'Type Foundry',
    title: 'Type Reveal',
    year: '2025',
    href: '#',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1400&q=80',
        alt: 'Camera on desk',
      },
      {
        src: 'https://images.unsplash.com/photo-1493612276201-517e6b5f2ce5?auto=format&fit=crop&w=1400&q=80',
        alt: 'Creative desk flatlay',
      },
    ],
  },
  {
    id: 'motion-stack',
    client: 'Motion Desk',
    title: 'Motion Stack',
    year: '2025',
    href: '#',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
        alt: 'Alpine ridgeline',
      },
      {
        src: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1400&q=80',
        alt: 'Mobile interface mockups',
      },
    ],
  },
  {
    id: 'neon-grid',
    client: 'Grid Works',
    title: 'Neon Grid',
    year: '2025',
    href: '#',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
        alt: 'Laptop and notes',
      },
      {
        src: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1400&q=80',
        alt: 'Abstract fluid art',
      },
    ],
  },
  {
    id: 'signal-field',
    client: 'Signal Studio',
    title: 'Signal Field',
    year: '2025',
    href: '#',
    images: [
      {
        src: 'https://images.unsplash.com/photo-1634017839464-5c339bbe3c32?auto=format&fit=crop&w=1400&q=80',
        alt: '3D abstract shapes',
      },
      {
        src: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?auto=format&fit=crop&w=1400&q=80',
        alt: 'Gradient light field',
      },
    ],
  },
];

// Hero preview card
export const FEATURED_PROJECT = {
  tagline: 'Designing a bold voice for thought  leadership',
  image: GRID_PROJECTS[0].images[0].src,
  title: GRID_PROJECTS[0].title,
};
