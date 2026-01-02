// Property image imports
import property1 from '@/assets/property-1.jpg';
import property2 from '@/assets/property-2.jpg';
import property3 from '@/assets/property-3.jpg';
import property4 from '@/assets/property-4.jpg';
import property5 from '@/assets/property-5.jpg';
import property6 from '@/assets/property-6.jpg';
import property7 from '@/assets/property-7.jpg';

export const propertyImages = {
  'property-1': property1,
  'property-2': property2,
  'property-3': property3,
  'property-4': property4,
  'property-5': property5,
  'property-6': property6,
  'property-7': property7,
};

;
export const getPropertyImage = (imagePath) => {
  if (!imagePath) return '/placeholder.svg';
  return new URL(`../assets/${imagePath}`, import.meta.url).href;
};

