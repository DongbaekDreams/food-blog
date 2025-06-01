/**
 * Helper function to get the correct URL for images based on environment
 * 
 * @param imagePath The path to the image
 * @returns The corrected image path
 */
export const getImageUrl = (imagePath: string | undefined): string => {
  if (!imagePath) return '';
  
  // If it's already an absolute URL, return it as-is
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  const baseUrl = import.meta.env.BASE_URL;
  // Ensure cleanPath doesn't start with '/' if baseUrl is already '/' or ends with '/'
  // And ensure baseUrl ends with a '/' if it's not just '/'
  let effectiveBasePath = baseUrl;
  if (baseUrl !== '/' && !baseUrl.endsWith('/')) {
    effectiveBasePath = `${baseUrl}/`;
  }
  if (baseUrl === '/') { // If base is root, effectiveBasePath should be empty for joining with cleanPath
    effectiveBasePath = '';
  }

  const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
  
  return `${effectiveBasePath}${cleanPath}`;
}; 