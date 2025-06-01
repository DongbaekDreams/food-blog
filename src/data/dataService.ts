import { Restaurant, Dish, TimelineEvent, CountryData, InitialRestaurantData, Drink } from './types';
import imageManifestData from './imageManifest.json';

// Define types for the imported manifest
interface ImageCollection {
  [dirName: string]: string[];
}

interface CombinedImageManifest {
  dishes: ImageCollection;
  restaurants: ImageCollection;
  drinks: ImageCollection;
}

// Type assertion for the imported JSON
const typedManifest = imageManifestData as CombinedImageManifest;

// Helper function to extract image key from a path
const extractKeyFromPath = (path: string, type: 'dishes' | 'restaurants' | 'drinks'): string | undefined => {
  const parts = path.split('/');
  // Assumes path like /images/type/key/image.jpg
  if (parts.length > 3 && parts[1] === 'images' && parts[2] === type) {
    return parts[3];
  }
  // Fallback for simpler structures or direct keys if needed, can be expanded.
  // For now, primarily designed for the above structure.
  if (parts.length > 2) { 
    return parts[parts.length - 2];
  }
  return undefined;
};

// --- Load Data from JSON Files ---

// Load Restaurant Data using Vite's import.meta.glob
const restaurantModules = import.meta.glob('./restaurants/*.json', { eager: true });
console.log('Restaurant Modules:', JSON.stringify(restaurantModules, null, 2)); // Log the raw modules

const restaurantsData: InitialRestaurantData[] = Object.values(restaurantModules)
  .map((module: any) => module.default || module) // Try to access data, whether it's default export or the module itself
  .filter(Boolean) as InitialRestaurantData[]; // Filter out any undefined/null modules
console.log('Loaded restaurantsData:', JSON.stringify(restaurantsData, null, 2));
console.log('Number of restaurants loaded:', restaurantsData.length);

// Load Dish Data using Vite's import.meta.glob
const dishModules = import.meta.glob('./dishes/*.json', { eager: true });
console.log('Dish Modules:', JSON.stringify(dishModules, null, 2)); // Log the raw modules

const dishesData: (Omit<Dish, 'photos' | 'mainImage'> & { originalMainImagePath: string })[] =
  Object.values(dishModules)
    .map((module: any) => module.default || module) // Try to access data
    .filter(Boolean) as (Omit<Dish, 'photos' | 'mainImage'> & { originalMainImagePath: string })[];
console.log('Loaded dishesData:', JSON.stringify(dishesData, null, 2));
console.log('Number of dishes loaded:', dishesData.length);

// Load Drink Data using Vite's import.meta.glob (New)
const drinkModules = import.meta.glob('./drinks/*.json', { eager: true });
console.log('Drink Modules:', JSON.stringify(drinkModules, null, 2));

// Adjusted type for initial drink data loading
const drinksData: (Omit<Drink, 'photos' | 'mainImage'> & { originalMainImagePath: string; id: string })[] =
  Object.entries(drinkModules)
    .map(([path, module]: [string, any]) => {
      // Ensure the ID from the file content is used if present, otherwise derive from path.
      // The manifest key will still primarily be from the filename.
      const fileContent = module.default || module;
      const idFromFile = fileContent.id || path.split('/').pop()?.replace('.json', '') || 'unknown';
      return { ...fileContent, id: idFromFile } as (Omit<Drink, 'photos' | 'mainImage'> & { originalMainImagePath: string; id: string });
    })
    .filter(Boolean);
console.log('Loaded drinksData:', JSON.stringify(drinksData, null, 2));
console.log('Number of drinks loaded:', drinksData.length);

// --- End Load Data from JSON Files ---

// ============================================================================

// No need to modify anything below this line
// The rest of the code handles data processing and exports

// Create a map of countries with their dishes
const generateCountriesData = (): Record<string, CountryData> => {
  const countriesMap: Record<string, CountryData> = {};

  // Use processed dish data that includes mainImage and photos
  const processedDishesList = getDishes(); // This calls processDishData()

  processedDishesList.forEach(dish => {
    if (!countriesMap[dish.country]) {
      countriesMap[dish.country] = {
        dishCount: 0,
        dishes: [],
        flagEmoji: getFlagEmoji(dish.country)
      };
    }
    
    countriesMap[dish.country].dishes.push(dish); // Push the fully processed dish
    countriesMap[dish.country].dishCount = countriesMap[dish.country].dishes.length;
  });

  return countriesMap;
};

// Generate timeline events from restaurants and dishes
const generateTimelineEvents = (): TimelineEvent[] => {
  const processedRestaurantData = getRestaurants(); // Use processed data
  const restaurantEvents: TimelineEvent[] = processedRestaurantData
    .filter(r => r.visitDates.length > 0 && r.visitDates[0] !== 'YYYY-MM-DD') // Filter out placeholder dates
    .flatMap(r => r.visitDates.map(visitDate => ({
      id: `rest-${r.id}-${visitDate}`,
      type: 'restaurant',
      content: r.name,
      start: visitDate,
      location: `${r.location.city}, ${r.location.country}`,
      rating: r.rating ?? 0, // Use rating directly, default to 0 if undefined
      photoUrl: r.photos && r.photos.length > 0 ? r.photos[0] : undefined,
      itemUrl: `/restaurant/${r.id}`
    })));

  const processedDishesList = getDishes(); // Use processed dish data
  const dishEvents: TimelineEvent[] = processedDishesList
    .filter(d => d.dateCooked !== 'YYYY-MM-DD') // Filter out placeholder dates
    .map(d => ({
      id: `dish-${d.id}`,
      type: 'dish',
      content: d.name,
      start: d.dateCooked,
      country: d.countryName,
      rating: d.rating,
      photoUrl: d.mainImage, // Use processed mainImage from Dish type
      itemUrl: `/dish/${d.id}`
    }));

  return [...restaurantEvents, ...dishEvents].sort((a, b) => 
    new Date(b.start).getTime() - new Date(a.start).getTime()
  );
};

// Helper function to get flag emoji from country code
const getFlagEmoji = (countryCode: string): string => {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
};

// Google Maps integration helpers
export const getGoogleMapsUrl = (address: string): string => {
  const encodedAddress = encodeURIComponent(address);
  return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
};

export const getGoogleSearchUrl = (query: string): string => {
  const encodedQuery = encodeURIComponent(query);
  return `https://www.google.com/search?q=${encodedQuery}`;
};

// --- Processed Data Functions ---

let processedRestaurants: Restaurant[] | null = null;
let processedDishes: Dish[] | null = null;
let processedDrinks: Drink[] | null = null; // Added for drinks

function processRestaurantData(): Restaurant[] {
  if (processedRestaurants) return processedRestaurants;

  processedRestaurants = restaurantsData.map(baseRestaurant => {
    let restaurantImages: string[] = [];
    const restaurantId = baseRestaurant.id;

    // 1. Direct match
    if (typedManifest.restaurants[restaurantId]) {
      restaurantImages = typedManifest.restaurants[restaurantId];
    } 
    // 2. Known aliases (can be expanded)
    else if (restaurantId === 'varasanos-pizzeria-atlanta' && typedManifest.restaurants['verasanos-pizzeria']) {
      restaurantImages = typedManifest.restaurants['verasanos-pizzeria'];
    }
    // 3. Fallback: Check if any manifest key is a substring of the restaurant ID or vice-versa
    // This is a bit fuzzy and might be error-prone. Ideally, IDs should match or be explicitly mapped.
    else {
      const manifestKeys = Object.keys(typedManifest.restaurants);
      const matchingKey = manifestKeys.find(key => restaurantId.includes(key) || key.includes(restaurantId));
      if (matchingKey) {
        restaurantImages = typedManifest.restaurants[matchingKey];
      }
    }
    
    return {
      ...baseRestaurant,
      photos: restaurantImages,
      mainImage: restaurantImages.length > 0 ? restaurantImages[0] : undefined,
    } as Restaurant;
  });
  return processedRestaurants;
}

function processDishData(): Dish[] {
  if (processedDishes) return processedDishes;

  processedDishes = dishesData.map(baseDish => {
    const imageKey = extractKeyFromPath(baseDish.originalMainImagePath, 'dishes');
    const dishImages = imageKey ? (typedManifest.dishes[imageKey] || []) : [];
    
    return {
      ...baseDish,
      mainImage: dishImages.length > 0 ? dishImages[0] : baseDish.originalMainImagePath, // Fallback to original if not in manifest
      photos: dishImages.length > 0 ? dishImages : (baseDish.originalMainImagePath ? [baseDish.originalMainImagePath] : []), // Fallback, ensure array
    } as Dish; 
  });
  return processedDishes;
}

// New function to process drink data (currently simple, can be expanded if needed)
function processDrinkData(): Drink[] {
  if (processedDrinks) return processedDrinks;
  // console.log('[processDrinkData] Starting to process drinks...');
  // console.log('[processDrinkData] Raw drinksData:', JSON.stringify(drinksData, null, 2));
  // console.log('[processDrinkData] Image Manifest (drinks section):', JSON.stringify(typedManifest.drinks, null, 2));

  processedDrinks = drinksData.map(baseDrink => {
    // Use baseDrink.id (which should match filename for manifest lookup) as the primary key
    const imageKey = baseDrink.id; 
    // console.log(`[processDrinkData] Processing drink with id (imageKey): ${imageKey}`);
    let manifestImagePaths: string[] = [];

    if (typedManifest.drinks && typedManifest.drinks[imageKey] && Array.isArray(typedManifest.drinks[imageKey])) {
      manifestImagePaths = typedManifest.drinks[imageKey].filter(img => typeof img === 'string');
      // console.log(`[processDrinkData] Found images in manifest for ${imageKey}:`, JSON.stringify(manifestImagePaths));
    } else {
      // console.log(`[processDrinkData] No images found in manifest for ${imageKey}, will check originalMainImagePath.`);
    }

    const resultDrink: Drink = {
      // Spread Omit<Drink, 'photos' | 'mainImage'>
      id: baseDrink.id,
      title: baseDrink.title,
      date: baseDrink.date,
      stars: baseDrink.stars,
      tags: baseDrink.tags,
      description: baseDrink.description,
      // Add mainImage and photos from manifest or fallback
      mainImage: manifestImagePaths.length > 0 ? manifestImagePaths[0] : (baseDrink.originalMainImagePath || ''),
      photos: manifestImagePaths.length > 0 ? manifestImagePaths : (baseDrink.originalMainImagePath ? [baseDrink.originalMainImagePath] : []),
    };
    // console.log(`[processDrinkData] Processed drink object for ${imageKey}:`, JSON.stringify(resultDrink, null, 2));
    return resultDrink;
  });
  // console.log('[processDrinkData] Finished processing drinks.');
  return processedDrinks;
}

// --- Data Export Functions ---

// Modified to use processed data
export const getRestaurants = (): Restaurant[] => {
  return processRestaurantData();
};

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return processRestaurantData().find(restaurant => restaurant.id === id);
};

export const getDishes = (): Dish[] => {
  return processDishData();
};

export const getDishById = (id: string): Dish | undefined => {
  return processDishData().find(dish => dish.id === id);
};

export const addRestaurant = (restaurant: Restaurant): void => {
  // This would need to reset processedRestaurants and potentially write to a new JSON file.
  // For now, it's a simplified version that wouldn't persist if app reloads.
  // restaurantsData.push(restaurant); // This would need to be InitialRestaurantData
  console.warn("addRestaurant: Dynamic additions are not persisted to JSON files in this version.");
  processedRestaurants = null; // Reset the cache to force reprocessing
};

export const addDish = (dish: Dish): void => {
  // Similar to addRestaurant, this is not persisting to JSON.
  console.warn("addDish: Dynamic additions are not persisted to JSON files in this version. Any images must be manually added to the manifest.");
  // const { photos, mainImage, ...baseDish } = dish;
  // const originalMainImagePath = mainImage || (photos && photos.length > 0 ? photos[0] : '');
  // (dishesData as any).push({ ...baseDish, originalMainImagePath });
  processedDishes = null; // Reset the cache to force reprocessing
};

// Get all countries with dishes
export const getCountriesData = (): Record<string, CountryData> => {
  return generateCountriesData();
};

// Get timeline events
export const getTimelineEvents = (): TimelineEvent[] => {
  return generateTimelineEvents();
};

// Function to load information from Google Places API (this would require API key and setup)
export const loadGooglePlaceDetails = async (placeId: string): Promise<Partial<Restaurant>> => {
  // In a real implementation, you would make an API call to Google Places API
  // For now, we'll return a mock response
  console.log(`Loading details for place ID: ${placeId}`);
  return {
    googleRating: 4.5,
    phoneNumber: '+1 234 567 890',
    website: 'https://example.com',
    openingHours: ['Monday: 9:00 AM - 10:00 PM', 'Tuesday: 9:00 AM - 10:00 PM']
  };
};

// New export function for drinks
export const getDrinks = (): Drink[] => {
  return processDrinkData();
};

export const getDrinkById = (id: string): Drink | undefined => {
  return processDrinkData().find(drink => drink.id === id);
};

