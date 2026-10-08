/**
 * Hero backdrops for the Pune pages. These are generic illustrative photographs (not KARGAR
 * sites or staff), rendered as low-opacity decorative backgrounds — so the alt text below only
 * describes what is literally in the frame and never claims a location, client or KARGAR team.
 * Replace with real KARGAR photographs via the admin Media Library (ManagedImage) when available.
 */
export const heroImages = {
  lobbyScrubbing: { src: '/images/services/housekeeping-services.webp', alt: 'Cleaning staff operating floor scrubbers in a marble-floored office lobby' },
  officeCleaning: { src: '/images/services/soft-services.webp', alt: 'Cleaning staff wiping desks and mopping the floor of an open-plan office' },
  technicians: { src: '/images/services/hard-services.webp', alt: 'Technicians in safety gear inspecting an electrical panel and plant-room equipment' },
  security: { src: '/images/services/security-services.webp', alt: 'Uniformed security officer standing at the glass entrance of an office building' },
  meeting: { src: '/images/services/facility-support.webp', alt: 'Two professionals reviewing documents at a conference table' },
  building: { src: '/images/page/hero-building.webp', alt: 'Modern glass office building at dusk' },
  brightLobby: { src: '/images/page/services-hero.webp', alt: 'Bright office lobby with a cleaner operating a floor machine' },
} as const;
