// Define types for our data structures

// Restaurant types
export interface RestaurantLocation {
  lat: number;
  lng: number;
  address: string;
  city: string;
  country: string;
  googleMapsUrl?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  location: RestaurantLocation;
  rating: number;
  visitDate: string;
  review: string;
  cuisine: string;
  priceRange: string;
  photos: string[];
  googlePlaceId?: string;
  googleRating?: number;
  phoneNumber?: string;
  website?: string;
  openingHours?: string[];
  tags?: string[];
}

// New interface for structured source links
export interface SourceLink {
  url: string;
  type: 'instagram' | 'youtube' | 'web'; // Type of the link for embedding/display logic
  description?: string; // Optional description of the link
}

// Dish types
export interface Dish {
  id: string;
  name: string;
  country: string;
  countryName: string;
  dateCooked: string;
  rating: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  recipeDetails: string;
  ingredients: string[];
  sourceUrls?: SourceLink[]; // Replaced sourceUrl with an array of SourceLink objects
  googleSearchUrl?: string;
  mainImage: string;
  photos: string[];
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: number;
  notes?: string;
  tags?: string[];
  recipe?: string;
  videoUrl?: string;
}

// Country data type with dishes
export interface CountryData {
  dishCount: number;
  dishes: Dish[];
  flagEmoji?: string;
}

// Timeline event
export interface TimelineEvent {
  id: string;
  type: 'dish' | 'restaurant';
  content: string;
  start: string;
  country?: string;
  location?: string;
  rating: number;
} 