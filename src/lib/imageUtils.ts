/**
 * Image optimization utilities for Next.js Image component
 */

// Base64 blur placeholder for images
export const BLUR_DATA_URL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

// Image optimization configurations
export const IMAGE_CONFIGS = {
  profile: {
    quality: 90,
    priority: true,
    sizes: "(max-width: 640px) 160px, (max-width: 768px) 192px, 256px"
  },
  project: {
    quality: 85,
    loading: "lazy" as const,
    sizes: "(max-width: 1024px) 100vw, 256px"
  },
  thumbnail: {
    quality: 80,
    loading: "lazy" as const,
    sizes: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  }
} as const;

/**
 * Generate optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(
  src: string,
  alt: string,
  type: keyof typeof IMAGE_CONFIGS = 'thumbnail'
) {
  const config = IMAGE_CONFIGS[type];
  
  return {
    src,
    alt,
    placeholder: "blur" as const,
    blurDataURL: BLUR_DATA_URL,
    ...config
  };
}

/**
 * Generate responsive sizes string for different breakpoints
 */
export function generateSizes(breakpoints: Record<string, string>): string {
  return Object.entries(breakpoints)
    .map(([breakpoint, size]) => `(max-width: ${breakpoint}) ${size}`)
    .join(', ');
}