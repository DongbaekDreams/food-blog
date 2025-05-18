import { Restaurant, Dish, TimelineEvent, CountryData } from './types';

// Initial real restaurant data
const restaurants: Restaurant[] = [
  {
    id: 'varasanos-pizzeria-atlanta',
    name: 'Varasano\'s Pizzeria',
    location: {
      lat: 33.753746,
      lng: -84.386330,
      address: '2171 Peachtree Rd NE UNIT 100, Atlanta, GA 30309, USA',
      city: 'Atlanta',
      country: 'USA',
      googleMapsUrl: 'https://maps.app.goo.gl/HRTTuTpDdmEN5LP66'
    },
    rating: 5,
    googleRating: 4.9,
    visitDate: '2025-04-26',
    review: 'We visited the pizzeria and enjoyed fantastic pizza, each slice showcasing a bold, aromatic hit of garlic. The wood-fired oven produced an impeccably crisp crust with a subtle smoky depth, perfectly complementing the toppings.',
    cuisine: 'Pizzeria',
    priceRange: '$$',
    photos: ['/images/dishes/restaurants/verasanos-pizzeria/generated-pizza.png'],
    phoneNumber: '+1 404-352-8216',
    website: 'https://varasanos.com',
    openingHours: [
      'Monday - Thursday: 5:30-9:00 PM',
      'Friday: 5:30-10:00 PM',
      'Saturday: 11:30 AM-10:00 PM',
      'Sunday: 11:30 AM-9:00 PM'
    ],
    tags: ['Pizza', 'Casual', 'Wood-fired']
  },
  {
    id: 'rreal-tacos-buckhead',
    name: 'Rreal Tacos - Buckhead',
    location: {
      lat: 33.788181,
      lng: -84.371338,
      address: '3365 Piedmont Rd NE Suite 1120, Atlanta, GA 30305, USA',
      city: 'Atlanta',
      country: 'USA',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rreal+Tacos+-+Buckhead+3365+Piedmont+Rd+NE+Suite+1120+Atlanta+GA+30305'
    },
    rating: 4.8, // Our Rating
    googleRating: 4.9,
    visitDate: 'YYYY-MM-DD', // Please update!
    review: 'Review pending.', // Please update!
    cuisine: 'Tacos',
    priceRange: '$$', // Please update if different
    photos: ['/images/dishes/restaurants/rreal-tacos/generated-tacos.png'],
    phoneNumber: '+1 404-968-9837',
    website: 'https://rrealtacos.com',
    openingHours: [
      'Monday - Saturday: 11:00 AM-12:00 AM',
      'Sunday: 11:00 AM-11:00 PM'
    ],
    tags: ['Tacos', 'Mexican', 'Casual'] // Please update if different
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
    tags: ['American', 'Pasta', 'Spicy', 'Seafood', 'Chorizo'],
    recipe: `Instructions:

1. Bring a large pot of salted water to a rolling boil. Add the rigatoni and cook according to package instructions until al dente. Drain and reserve.

2. While the pasta cooks, heat a pan over medium heat. Add the sliced chorizo and sauté until browned. Transfer the cooked chorizo to a bowl and set aside.

3. In the same pan, melt 1 tbsp of butter. Add the seasoned tiger shrimp and cook until opaque and lightly golden on both sides. Remove the shrimp and add to the chorizo bowl.

4. Reduce the heat to medium‑low. Add the remaining 1 tbsp butter, then the minced garlic, chopped sun‑dried tomatoes, and chopped cherry tomatoes. Stir gently to combine, taking care not to burn the garlic.

5. Spoon in the tomato paste and stir until fully incorporated.

6. Pour in the heavy cream and bring the sauce just to a simmer. Stir in salt, pepper, Cajun seasoning, lemon pepper, smoked paprika, onion powder, and garlic powder.

7. Return the chorizo and shrimp to the pan. Stir to coat evenly with the sauce.

8. Add the cooked rigatoni to the pan and toss thoroughly, ensuring each piece is well coated.

9. Sprinkle in the Parmesan cheese and stir until melted into the sauce. For extra cheesiness, top with shredded cheese just before serving.

10. Serve immediately, garnished with a light dusting of smoked paprika or chopped fresh parsley if desired.`,
    sourceUrls: [
      { url: 'https://www.instagram.com/p/DI2Ekj1zMmw/', type: 'instagram', description: 'Original Recipe' }
    ]
  },
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
    tags: ['Italian', 'Bread', 'Side Dish'],
    sourceUrls: [
      { url: 'https://www.instagram.com/p/DIuATxcoDdb/', type: 'instagram', description: 'Original Recipe' }
    ]
  },
  {
    id: 'baby-octopus-stirfry-1',
    name: 'Baby Octopus Stir-fry',
    country: 'KR',
    countryName: 'South Korea',
    dateCooked: '2015-05-17',
    rating: 4,
    difficulty: 'Medium',
    recipeDetails: "A vibrant and spicy Korean stir-fry featuring tender baby octopus and savory pork belly, all brought together with a rich gochujang-based sauce and crisp vegetables. A flavorful dish with a delightful kick.",
    ingredients: [
      '주꾸미 (webfoot octopus): 400g',
      '삼겹살 (pork belly): 250g',
      '대파 (green onion/scallion): 90g',
      '양파 (onion): 85g',
      '양배추 (cabbage): 50g',
      '청양고추 (Korean hot chili pepper): 25g',
      '소주 (soju, for blanching): 50g',
      '설탕 (sugar, for searing pork): 1 tablespoon',
      '청주 (cooking rice wine): 2 tablespoons',
      '--- Stir-fry Sauce ---',
      '굵은고춧가루 (coarse red chili powder): 3 tablespoons',
      '다진마늘 (minced garlic): 1 tablespoon',
      '양조간장 (brewed soy sauce): 1 tablespoon',
      '굴소스 (oyster sauce): 1 tablespoon',
      '물엿 (corn syrup): 1 tablespoon',
      '설탕 (sugar): 1 tablespoon',
      '고추장 (gochujang chili paste): 1 heaping tablespoon',
      '후추 (ground pepper): a few shakes'
    ],
    mainImage: '/images/dishes/baby-octopus-stirfry/Dish.png',
    photos: [
      '/images/dishes/baby-octopus-stirfry/Dish.png',
      '/images/dishes/baby-octopus-stirfry/octopus-fresh.heic',
      '/images/dishes/baby-octopus-stirfry/octopus.heic',
      '/images/dishes/baby-octopus-stirfry/pork-belly.heic',
      '/images/dishes/baby-octopus-stirfry/stir-frying.heic',
      '/images/dishes/baby-octopus-stirfry/stir-fried.heic'
    ],
    recipe: `1. 씻어서 손질해놓은 쭈꾸미는 살짝 데쳐주는데요. 끓는 물에 소주 1컵을 넣고 쭈꾸미를 넣어 1분 정도 데쳐줍니다.\n   Blanch the cleaned and prepared octopus: bring water to a boil, add 1 cup of soju, then add the octopus and cook for about 1 minute.\n\n2. 데친 주꾸미는 물기를 제거해준 후에 먹기 좋은 크기로 잘라주는데 편하게 가위로 작업해주세요.\n   Drain the blanched octopus, pat dry, and cut into bite-sized pieces using scissors for convenience.\n\n3. 물기를 제거한 후 쭈꾸미볶음 양념을 해줄 텐데요. 다진 마늘 1, 굵은 고춧가루 3, 양조간장 1, 굴소스 1, 물엿 1, 설탕 1, 고추장 1, 후추 톡톡톡 넣어준 후에 골고루 섞어줍니다.\n   Prepare the stir-fry sauce: in a bowl combine 1 Tbsp minced garlic, 3 Tbsp coarse red chili powder, 1 Tbsp brewed soy sauce, 1 Tbsp oyster sauce, 1 Tbsp corn syrup, 1 Tbsp sugar, 1 heaping Tbsp gochujang, and a few shakes of ground pepper; mix thoroughly.\n\n4. 양배추와 양파는 1cm 두께로 썰어주고, 대파와 청양고추는 어슷하게 썰어 준비해둡니다.\n   Slice the cabbage and onion into 1 cm-thick pieces, and cut the green onion and Korean hot chili pepper on the diagonal.\n\n5. 팬에 삼겹살을 먼저 구워주는데, 한쪽 면이 익으면 뒤집어 설탕 1스푼을 넣고 노릇노릇하게 구워주세요.\n   In a hot pan, cook the pork belly first; when one side is done, flip it, add 1 Tbsp sugar, and cook until golden brown.\n\n6. 청주 2스푼을 넣고 한 번 더 구워준 후에…\n   Pour in 2 Tbsp cooking rice wine and sear once more.\n\n7. 준비해놓은 주꾸미와 쭈꾸미 볶음 양념을 넣고 센 불에서 함께 볶아줍니다. 강한 불에서 볶아야 물이 생기지 않아 양념 맛을 그대로 즐길 수 있어요.\n   Add the prepared octopus and stir-fry sauce, then stir-fry over high heat so no liquid forms and the flavors stay concentrated.\n\n8. 준비해놓은 채소들(양파, 대파, 양배추, 청양고추)를 넣고 함께 볶아줍니다.\n   Add the prepared vegetables (onion, green onion, cabbage, chili pepper) and continue stir-frying together.\n\n9. 양파가 투명해지면 통깨를 솔솔 뿌려주면 주꾸미볶음 완성입니다.\n   When the onion becomes translucent, sprinkle with sesame seeds to finish the stir-fried octopus.`,
    // Optional fields
    prepTime: '20 minutes',
    cookTime: '20 minutes',
    totalTime: '40 minutes',
    servings: 3,
    notes: 'A collaborative cooking adventure! Details on our experience to come.',
    tags: ['Seafood', 'Stir-fry', 'Korean', 'Octopus', 'Pork Belly'],
    sourceUrls: [
      { url: 'https://naver.me/FbO31oO3', type: 'web', description: 'Original Recipe' }
    ]
  },
  {
    id: 'cake-jello-1',
    name: 'Cake Jello',
    country: 'US',
    countryName: 'United States',
    dateCooked: '2015-05-17',
    rating: 2.5,
    difficulty: 'Easy',
    recipeDetails: "A soft, homemade cake topped with a light and tangy frosting made from Greek yogurt and a blend of cheesecake and white chocolate jello powders. Finished with fresh, sliced strawberries for a delightful and unique dessert experience.",
    ingredients: [
      '--- Cake ---',
      '3 cups (354g) cake flour (spooned & leveled)',
      '1 and 1/2 cups (300g) granulated sugar',
      '1 teaspoon baking powder',
      '1/2 teaspoon baking soda',
      '1/2 teaspoon salt',
      '1 cup (16 Tbsp; 226g) unsalted butter, cubed and softened to room temperature',
      '1 Tablespoon pure vanilla extract',
      '1 cup (240ml) whole milk, at room temperature and divided',
      '1/3 cup (80g) sour cream, at room temperature',
      '3 large eggs, at room temperature',
      '--- Frosting ---',
      '600g vanilla Greek yogurt',
      '15g cheesecake jello powder',
      '15g white chocolate jello powder',
      '1/2 cup of milk',
      '--- Topping ---',
      'Sliced Strawberries'
    ],
    mainImage: '/images/dishes/cake-jello/finished-plate.heic',
    photos: [
      '/images/dishes/cake-jello/finished-plate.heic',
      '/images/dishes/cake-jello/mixing.heic',
      '/images/dishes/cake-jello/some-ingredients.heic',
      '/images/dishes/cake-jello/cake-batter.heic',
      '/images/dishes/cake-jello/cake.heic',
      '/images/dishes/cake-jello/icing.heic',
      '/images/dishes/cake-jello/decorated.heic'
    ],
    recipe: `Make the cake: Preheat the oven to 350°F (177°C). Generously grease a 9×13-inch cake pan.\n\nSift the cake flour, sugar, baking powder, baking soda, and salt in the bowl of a stand mixer. (Or if using a handheld mixer, any large mixing bowl.) With the paddle attachment, beat the ingredients together on low speed for a few seconds to gently combine. Add the butter, vanilla, and 1/2 cup of milk. Mix on medium speed until the dry ingredients are moistened, about 1 minute. Stop the mixer and scrape down the sides and up the bottom of the bowl. The mixture will resemble a thick dough.\n\nWhisk the remaining milk, the sour cream, and eggs together in a medium bowl. With the mixer running on medium speed, add the egg mixture in 3 additions, mixing for about 15 seconds after each addition. Stop the mixer and scrape down the sides and up the bottom of the bowl, then mix for about 15 more seconds until batter is completely combined. Avoid over-mixing. Some small lumps are OK.\n\nPour and spread batter evenly into prepared pan. Bake for around 32-35 minutes or until the cake is baked through. To test for doneness, insert a toothpick into the center of the cake. If it comes out clean, it's done. Allow cake to cool completely in the pan set on a wire rack. The cake must be completely cool before frosting.\n\nPrepare the frosting: In a medium bowl, combine the vanilla Greek yogurt, cheesecake jello powder, white chocolate jello powder, and milk. Whisk until smooth and well combined. Once the cake has cooled completely, spread the frosting evenly over the top. Garnish with sliced strawberries.`,
    // Optional fields
    prepTime: '40 minutes',
    cookTime: '40 minutes',
    totalTime: '80 minutes (plus cooling time for cake)',
    servings: 20,
    notes: 'Cake must cool completely before frosting. Both the cake and the frosting were good individually (potentially 4/5 each), but they didn\'t fit well together.',
    tags: ['Dessert', 'Cake', 'Jello', 'American'],
    sourceUrls: [
      { url: 'https://sallysbakingaddiction.com/vanilla-sheet-cake/', type: 'web', description: 'Vanilla Sheet Cake Recipe' },
      { url: 'https://www.instagram.com/reel/DIwrv6CPyat/', type: 'instagram', description: 'Frosting Inspiration Reel' }
    ]
  }
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