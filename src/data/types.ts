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

// Parking type for restaurant
export interface ParkingInfo {
  icon: string;
  count: number;
  description: string;
}

export interface Restaurant {
  id: string;
  name: string;
  location: RestaurantLocation;
  drinkRating?: number;
  rating?: number;
  visitDates: string[];
  review: string;
  cuisine: string;
  priceRange: string;
  photos: string[];
  mainImage?: string;
  googlePlaceId?: string;
  googleRating?: number;
  phoneNumber?: string;
  website?: string;
  openingHours?: string[];
  tags?: string[];
  parking?: ParkingInfo;
}

// Type for initial restaurant data, before processing (photos and mainImage are added later)
export type InitialRestaurantData = Omit<Restaurant, 'photos' | 'mainImage'> & {
  drinkRating?: number;
};

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
  comingSoon?: boolean;
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
  photoUrl?: string;
  itemUrl?: string;
}

// Drink types (New)
export interface Drink {
  id: string; // Will be derived from the filename
  title: string;
  date: string; // Date of tasting/purchase
  mainImage: string; // Main image path
  photos: string[]; // All images
  stars: number;
  tags: string[];
  description: string;
} 