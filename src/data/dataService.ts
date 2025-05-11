import { Restaurant, Dish, TimelineEvent, CountryData } from './types';

// Initial real restaurant data
const restaurants: Restaurant[] = [
  // Example of a real restaurant entry - REPLACE OR DELETE THIS EXAMPLE
  {
    id: 'r1',
    name: 'Le Petit Bistro',
    location: {
      lat: 48.8566,
      lng: 2.3522,
      address: '123 Rue de Paris, Paris, France',
      city: 'Paris',
      country: 'France',
      googleMapsUrl: 'https://goo.gl/maps/MQvmS3uQQx4EbHip8'
    },
    rating: 4.5,
    visitDate: '2024-02-15',
    review: 'Amazing French cuisine in the heart of Paris. The beef bourguignon was perfectly cooked and the chocolate mousse was divine. The service was attentive and the atmosphere was cozy and authentic.',
    cuisine: 'French',
    priceRange: '€€€',
    photos: [
      'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmVzdGF1cmFudCUyMGZyZW5jaHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8ZnJlbmNoJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    ],
    googlePlaceId: 'ChIJR3122p9v5kcRRIUyZYQRmX8',
    googleRating: 4.7,
    phoneNumber: '+33 1 23 45 67 89',
    website: 'https://example.com/le-petit-bistro',
    openingHours: [
      'Monday: 12:00 PM - 10:00 PM',
      'Tuesday: 12:00 PM - 10:00 PM',
      'Wednesday: 12:00 PM - 10:00 PM',
      'Thursday: 12:00 PM - 10:00 PM',
      'Friday: 12:00 PM - 11:00 PM',
      'Saturday: 12:00 PM - 11:00 PM',
      'Sunday: Closed'
    ],
    tags: ['French', 'Paris', 'Fine Dining', 'Romantic']
  },
  
  // ADD YOUR OWN RESTAURANT ENTRIES HERE
  // {
  //   id: 'r2',  // Give each restaurant a unique ID (r2, r3, r4, etc.)
  //   name: 'Your Restaurant Name',
  //   location: {
  //     lat: 34.0522,  // Latitude - find on Google Maps
  //     lng: -118.2437,  // Longitude - find on Google Maps
  //     address: 'Full address here',
  //     city: 'Los Angeles',  // Used for filtering on the map
  //     country: 'USA',
  //     googleMapsUrl: 'https://goo.gl/maps/your-restaurant-link'  // Optional
  //   },
  //   rating: 4.8,  // Your personal rating (0-5)
  //   visitDate: '2024-04-20',  // Format: YYYY-MM-DD
  //   review: 'Your detailed review of the restaurant...',
  //   cuisine: 'Italian',  // Used for filtering on the map
  //   priceRange: '$$',  // Use $ to $$$$
  //   photos: [
  //     'URL to your main photo',
  //     'URL to additional photo 1',
  //     'URL to additional photo 2'
  //     // Add as many photos as you want
  //   ],
  //   // Optional fields
  //   googlePlaceId: 'ChIJxyz123...',  // Only if you know it
  //   googleRating: 4.6,  // From Google if you want to include it
  //   phoneNumber: '+1 213 555 1234',
  //   website: 'https://restaurant-website.com',
  //   openingHours: [
  //     'Monday: 11:00 AM - 10:00 PM',
  //     // Include as many days as you want
  //   ],
  //   tags: ['Italian', 'Pasta', 'Wine', 'Date Night']  // Any tags you want to add
  // }
];

// Initial real dish data
  // Example dish entry (you can keep or remove this)
    
  // ADD YOUR OWN DISH ENTRIES HERE
  // {
  //   id: 'd2',  // Give each dish a unique ID (d2, d3, d4, etc.)
  //   name: 'Your Dish Name',
  //   country: 'JP',  // 2-letter country code - this groups dishes on the world map
  //   countryName: 'Japan',  // Full country name for display
  //   dateCooked: '2024-04-15',  // Format: YYYY-MM-DD
  //   rating: 4.7,  // Your rating (0-5)
  //   difficulty: 'Easy',  // Must be 'Easy', 'Medium', or 'Hard'
  //   recipeDetails: 'Your detailed description of the dish and how you prepared it...',
  //   ingredients: [
  //     'Ingredient 1',
  //     'Ingredient 2',
  //     'Ingredient 3',
  //     // Add as many ingredients as needed
  //   ],
  //   sourceUrl: 'https://website-where-you-found-recipe.com',  // Optional
  //   googleSearchUrl: 'https://www.google.com/search?q=your+search+term',  // Optional
  //   photos: [
  //     'URL to your main dish photo',
  //     'URL to process photo 1',
  //     'URL to process photo 2',
  //     'URL to finished dish photo'
  //     // Add as many photos as you want
  //   ],
  //   // Optional fields
  //   prepTime: '15 minutes',
  //   cookTime: '30 minutes',
  //   totalTime: '45 minutes',
  //   servings: 2,
  //   notes: 'Your notes about the cooking process, substitutions, or ideas for next time',
  //   tags: ['Japanese', 'Seafood', 'Healthy', 'Quick']  // Any tags you want
  // }

const dishes: Dish[] = [
  {
    id: 'us-1',
    name: 'Cajun Pasta',
    country: 'US',
    countryName: 'United States',
    dateCooked: '2024-03-15',
    rating: 4.8,
    difficulty: 'Medium',
    recipeDetails: 'A spicy pasta dish with chorizo (substituted for pineapple sausage), shrimp, and a creamy sauce. The perfect blend of Southern and Italian flavors with a kick of heat. The dish combines rigatoni pasta with sautéed chorizo, shrimp, and a rich cream sauce seasoned with Cajun spices.',
    ingredients: [
      '1 lb rigatoni pasta',
      '2 pineapple sausages (substituted with chorizo)',
      '3 cloves garlic, minced',
      '3 sun dried tomatoes, chopped',
      '5 cherry tomatoes, chopped',
      '10 tiger shrimp (seasoned with salt & pepper)',
      '2 tbsp butter',
      '1 tbsp tomato paste',
      '2 cups heavy cream',
      '2 tsp salt',
      '2 tsp pepper',
      '2 tsp Cajun seasoning',
      '2 tsp lemon pepper',
      '2 tsp smoked paprika',
      '2 tsp onion powder',
      '2 tsp garlic powder',
      '1/4 cup parmesan cheese',
      'Shredded cheese (optional, for extra cheesiness)'
    ],
    mainImage: '/images/dishes/cajun-pasta/CajunPasta.jpg',
    photos: [
      '/images/dishes/cajun-pasta/CajunPasta.jpg',
      '/images/dishes/cajun-pasta/prep-work-sausage.heic',
      '/images/dishes/cajun-pasta/prep-work-tomato.heic',
      '/images/dishes/cajun-pasta/sauce.heic'
    ],
    // Optional fields
    prepTime: '15 minutes',
    cookTime: '20 minutes',
    totalTime: '35 minutes',
    servings: 4,
    notes: 'We substituted chorizo for the pineapple sausage in this recipe. Adjust the Cajun seasoning and cayenne to control the heat level. For a lighter version, use half-and-half instead of heavy cream.',
    tags: ['American', 'Pasta', 'Spicy', 'Seafood', 'Chorizo']
  },
  {
    id: 'us-2',
    name: 'Cajun Pasta4',
    country: 'US',
    countryName: 'United States',
    dateCooked: '2024-03-15',
    rating: 4.8,
    difficulty: 'Medium',
    recipeDetails: 'A spicy pasta dish with chorizo (substituted for pineapple sausage), shrimp, and a creamy sauce. The perfect blend of Southern and Italian flavors with a kick of heat. The dish combines rigatoni pasta with sautéed chorizo, shrimp, and a rich cream sauce seasoned with Cajun spices.',
    ingredients: [
      '1 lb rigatoni pasta',
      '2 pineapple sausages (substituted with chorizo)',
      '3 cloves garlic, minced',
      '3 sun dried tomatoes, chopped',
      '5 cherry tomatoes, chopped',
      '10 tiger shrimp (seasoned with salt & pepper)',
      '2 tbsp butter',
      '1 tbsp tomato paste',
      '2 cups heavy cream',
      '2 tsp salt',
      '2 tsp pepper',
      '2 tsp Cajun seasoning',
      '2 tsp lemon pepper',
      '2 tsp smoked paprika',
      '2 tsp onion powder',
      '2 tsp garlic powder',
      '1/4 cup parmesan cheese',
      'Shredded cheese (optional, for extra cheesiness)'
    ],
    mainImage: '/images/dishes/cajun-pasta/CajunPasta.jpg',
    photos: [
      '/images/dishes/cajun-pasta/CajunPasta.jpg',
      '/images/dishes/cajun-pasta/prep-work-sausage.heic',
      '/images/dishes/cajun-pasta/prep-work-tomato.heic',
      '/images/dishes/cajun-pasta/sauce.heic'
    ],
    // Optional fields
    prepTime: '15 minutes',
    cookTime: '20 minutes',
    totalTime: '35 minutes',
    servings: 4,
    notes: 'We substituted chorizo for the pineapple sausage in this recipe. Adjust the Cajun seasoning and cayenne to control the heat level. For a lighter version, use half-and-half instead of heavy cream.',
    tags: ['American', 'Pasta', 'Spicy', 'Seafood', 'Chorizo']
  },
  
  // YOUR GARLIC BREAD - RESTORED
  {
    id: 'it-1',
    name: 'Garlic Bread',
    country: 'IT',
    countryName: 'Italy',
    dateCooked: '2024-04-02',
    rating: 4.5,
    difficulty: 'Easy',
    recipeDetails: 'Crusty Italian bread slathered with garlic-infused butter and herbs, then toasted to golden perfection. A simple yet irresistible side that pairs perfectly with pasta dishes.',
    ingredients: [
      'Italian bread',
      'Butter',
      'Fresh garlic',
      'Parsley',
      'Parmesan cheese',
      'Salt',
      'Oregano',
      'Olive oil',
      'Black pepper'
    ],
    mainImage: '/images/dishes/garlic-bread/GarlicBread.jpg',
    photos: [
      '/images/dishes/garlic-bread/GarlicBread.jpg',
      '/images/dishes/garlic-bread/prep-work-add-cheese.heic',
      '/images/dishes/garlic-bread/prep-work-baste.heic',
      '/images/dishes/garlic-bread/prep-work-stuffing.heic'
    ],
    prepTime: '10 minutes',
    cookTime: '12 minutes',
    totalTime: '22 minutes',
    servings: 6,
    tags: ['Italian', 'Bread', 'Side Dish', 'Vegetarian']
  },
  
];

// ============================================================================

// No need to modify anything below this line
// The rest of the code handles data processing and exports

// Create a map of countries with their dishes
const generateCountriesData = (): Record<string, CountryData> => {
  const countriesMap: Record<string, CountryData> = {};

  dishes.forEach(dish => {
    if (!countriesMap[dish.country]) {
      countriesMap[dish.country] = {
        dishCount: 0,
        dishes: [],
        flagEmoji: getFlagEmoji(dish.country)
      };
    }
    
    countriesMap[dish.country].dishes.push(dish);
    countriesMap[dish.country].dishCount = countriesMap[dish.country].dishes.length;
  });

  return countriesMap;
};

// Generate timeline events from restaurants and dishes
const generateTimelineEvents = (): TimelineEvent[] => {
  const restaurantEvents: TimelineEvent[] = restaurants.map(r => ({
    id: `rest-${r.id}`,
    type: 'restaurant',
    content: r.name,
    start: r.visitDate,
    location: `${r.location.city}, ${r.location.country}`,
    rating: r.rating
  }));

  const dishEvents: TimelineEvent[] = dishes.map(d => ({
    id: `dish-${d.id}`,
    type: 'dish',
    content: d.name,
    start: d.dateCooked,
    country: d.countryName,
    rating: d.rating
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

// Add a new restaurant
export const addRestaurant = (restaurant: Restaurant): void => {
  restaurants.push(restaurant);
};

// Add a new dish
export const addDish = (dish: Dish): void => {
  dishes.push(dish);
};

// Get all restaurants
export const getRestaurants = (): Restaurant[] => {
  return [...restaurants];
};

// Get a specific restaurant by ID
export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(r => r.id === id);
};

// Get all dishes
export const getDishes = (): Dish[] => {
  return [...dishes];
};

// Get a specific dish by ID
export const getDishById = (id: string): Dish | undefined => {
  return dishes.find(d => d.id === id);
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