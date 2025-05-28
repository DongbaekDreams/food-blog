import { Restaurant, Dish, TimelineEvent, CountryData, InitialRestaurantData } from './types';
import imageManifestData from './imageManifest.json'; // Reverted to original path
// import imageManifestData from '../../../public/imageManifest.json'; // Commented out the adjusted path

// Define types for the imported manifest
interface ImageCollection {
  [dirName: string]: string[];
}

interface CombinedImageManifest {
  dishes: ImageCollection;
  restaurants: ImageCollection;
}

// Type assertion for the imported JSON
const typedManifest = imageManifestData as CombinedImageManifest;

// Helper function to extract image key from a path
const extractKeyFromPath = (path: string, type: 'dishes' | 'restaurants'): string | undefined => {
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

// Initial real restaurant data (renamed to restaurantsData)
const restaurantsData: InitialRestaurantData[] = [
  {
    id: 'varasanos-pizzeria-atlanta',
    name: "Varasano's Pizzeria",
    location: {
      lat: 33.813414802239876,
      lng: -84.3918889204468,
      address: '2171 Peachtree Rd NE UNIT 100, Atlanta, GA 30309, USA',
      city: 'Atlanta',
      country: 'USA',
      googleMapsUrl: 'https://maps.app.goo.gl/HRTTuTpDdmEN5LP66'
    },
    rating: 4.7,
    drinkRating: undefined,
    googleRating: 4.9,
    visitDates: ['2025-04-26'],
    review: 'We visited the pizzeria and were delighted by their exceptional dough – perfectly chewy with a subtle complexity that elevates every bite. The menu offers an impressive variety of topping combinations, each showcasing a bold, aromatic hit of garlic. The wood-fired oven produced an impeccably crisp crust with a subtle smoky depth, perfectly complementing the toppings. The charming patio area provides a lovely outdoor dining experience when weather permits.',
    cuisine: 'Pizzeria',
    priceRange: '$$',
    phoneNumber: '+1 404-352-8216',
    website: 'https://varasanos.com',
    openingHours: [
      'Monday - Thursday: 5:30-9:00 PM',
      'Friday: 5:30-10:00 PM',
      'Saturday: 11:30 AM-10:00 PM',
      'Sunday: 11:30 AM-9:00 PM'
    ],
    tags: ['Pizza', 'Casual', 'Wood-fired'],
    parking: { 
      icon: '/images/icons/thumbs-up.png',
      count: 1,
      description: 'Street parking'
    }
  },
  {
    id: 'rreal-tacos-buckhead',
    name: 'Rreal Tacos - Buckhead',
    location: {
      lat: 33.84734319436399, 
      lng: -84.37277376044099,
      address: '3365 Piedmont Rd NE Suite 1120, Atlanta, GA 30305, USA',
      city: 'Atlanta',
      country: 'USA',
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rreal+Tacos+-+Buckhead+3365+Piedmont+Rd+NE+Suite+1120+Atlanta+GA+30305'
    },
    rating: 4.5,
    drinkRating: 4.5,
    googleRating: 4.9,
    visitDates: ['2025-04-25'],
    review: 'The birria quesadilla delivers tender, slow‑braised beef folded into a crisp tortilla with just the right balance of melted cheese and savory broth infusion. The drink menu complements the food perfectly, featuring well‑crafted margaritas and a decent beer selection that cleanse the palate between bites. The quality of ingredients is exceptional, evident in every flavorful bite. Do note that weekend visits can mean extended wait times as they don\'t accept reservations during peak hours. The consommé, while an additional charge, is worth considering as a rich complement to your meal. Parking is validated for two hours, which is a welcome convenience in the bustling Buckhead area.',
    cuisine: 'Tacos',
    priceRange: '$$',
    phoneNumber: '+1 404-968-9837',
    website: 'https://rrealtacos.com',
    openingHours: [
      'Monday - Saturday: 11:00 AM-12:00 AM',
      'Sunday: 11:00 AM-11:00 PM'
    ],
    tags: ['Tacos', 'Mexican', 'Casual'],
    parking: {
      icon: '/images/icons/thumbs-up.png',
      count: 1,
      description: 'Validated'
    }
  },
  {
    id: 'jbistro',
    name: 'J-Bistro',
    location: {
      lat: 33.9075105378245, 
      lng: -84.28713452936195,
      address: '6035 Peachtree Rd A112, Atlanta, GA 30360, USA',
      city: 'Atlanta',
      country: 'USA',
      googleMapsUrl: 'https://maps.google.com/?cid=11797768855317478154'
    },
    rating: 3.5,
    drinkRating: undefined,
    googleRating: 4.4,
    visitDates: ['2025-05-18'],
    review: 'A cozy and authentic spot serving up Chinese and Korean dishes with generous portions that provide excellent value for money. While the quantity of food is impressive, some dishes could benefit from bolder seasoning as flavors tend to be a bit subdued. The dumplings (mandu) were especially good - perfectly crispy on the outside and flavorful on the inside. For future visits, the jjamppong (spicy seafood noodle soup) is on our list to try. The casual atmosphere makes it perfect for a quick lunch or casual dinner, complemented by friendly, attentive service.',
    cuisine: 'Chinese',
    priceRange: '$',
    phoneNumber: '+1 678-691-8886',
    website: 'https://www.j-bistroga.com/',
    openingHours: [
      'Monday: 11:30 AM-2:30 PM, 4:30-9:00 PM',
      'Tuesday: 11:30 AM-2:30 PM, 4:30-9:00 PM',
      'Wednesday: Closed',
      'Thursday: 11:30 AM-2:30 PM, 4:30-9:00 PM',
      'Friday: 11:30 AM-2:30 PM, 4:30-10:00 PM',
      'Saturday: 12:00-10:00 PM',
      'Sunday: 11:30 AM-9:00 PM'
    ],
    tags: ['Korean', 'Chinese', 'Casual', 'Cozy', 'Inexpensive'],
    parking: {
      icon: '/images/icons/thumbs-up.png',
      count: 2,
      description: ''
    }
  },
  {
    id: 'sixty-vines-nashville',
    name: 'Sixty Vines',
    location: {
      lat: 36.16069249704874,
      lng: -86.77958110538302,
      address: '5055 Broadway Suite 3200, Nashville, TN 37203, USA',
      city: 'Nashville',
      country: 'USA',
      googleMapsUrl: 'https://maps.google.com/?cid=15828789826372707220'
    },
    rating: 3.8,
    drinkRating: 4.7,
    googleRating: 4.7,
    visitDates: ['2025-05-24'],
    review: 'Sixty Vines has a truly fantastic vibe, and the restaurant itself is absolutely beautiful, with a spacious and modern aesthetic that makes for a great atmosphere. Their drink selection, especially the extensive wine list, is genuinely impressive and we thoroughly enjoyed our beverages. However, we found the food to be rather mediocre. While nothing was inherently bad, it just didn\'t live up to the high standards set by the ambiance and drinks. It\'s a perfect spot for a drink and to soak in the surroundings, but perhaps not the best choice if food is your primary focus.',
    cuisine: 'New American',
    priceRange: '$$',
    phoneNumber: '+1 615-610-9330',
    website: 'https://sixtyvines.com/location/nashville/',
    openingHours: [
      'Monday: 11:00 AM-10:00 PM',
      'Tuesday: 11:00 AM-10:00 PM',
      'Wednesday: 11:00 AM-10:00 PM',
      'Thursday: 11:00 AM-10:00 PM',
      'Friday: 11:00 AM-11:00 PM',
      'Saturday: 10:00 AM-11:00 PM',
      'Sunday: 10:00 AM-9:00 PM'
    ],
    tags: [
      'New American',
      'Wine Bar',
      'Casual',
      'Upscale',
      'Date Night'
    ]
  },
  {
    id: 'back-40-nashville',
    name: 'Back 40 Nashville',
    location: {
      lat: 36.16576823397997,
      lng: -86.7788815900384,
      address: '315 Deaderick St #225, Nashville, TN 37238, USA',
      city: 'Nashville',
      country: 'USA',
      googleMapsUrl: 'https://maps.google.com/?cid=5591181285851591253'
    },
    // rating: 4.5,
    drinkRating: 5.0,
    googleRating: 4.5,
    visitDates: ['2025-05-24'],
    review: 'Back 40 Nashville boasts a perfect environment, ideal for a relaxed date night or similar vibe. The drink selection is outstanding, with handcrafted cocktails and a wide array of libations. It\'s the perfect spot to unwind and enjoy a special evening. The food is also very good.',
    cuisine: 'New American',
    priceRange: '$$',
    phoneNumber: '+1 615-258-5568',
    website: 'http://back40nashville.com/',
    openingHours: [
      'Monday: 4:00-9:00 PM',
      'Tuesday: 4:00-9:00 PM',
      'Wednesday: 4:00-9:00 PM',
      'Thursday: 4:00-9:00 PM',
      'Friday: 4:00-11:00 PM',
      'Saturday: 11:00 AM-11:00 PM',
      'Sunday: Closed'
    ],
    tags: [
      'Upscale',
      'Cocktails',
      'Dinner',
      'Live Music',
      'Date Night'
    ]
  },
  {
    id: 'alley-taps-nashville',
    name: 'Alley Taps',
    location: {
      lat: 36.163615091719755,
      lng: -86.77790668077557,
      address: '162 Printers Alley, Nashville, TN 37201, USA',
      city: 'Nashville',
      country: 'USA',
      googleMapsUrl: 'https://maps.google.com/?cid=7665939375427530112'
    },
    drinkRating: 1.5,
    googleRating: 4.5,
    visitDates: ['2025-05-24'],
    review: 'Alley Taps has a truly fun environment, especially with its lively atmosphere and live music. It\'s a cool spot off the beaten path in Printers Alley. However, we found the drinks to be outrageously overpriced, which really detracted from the overall experience. While the vibe is great for a night out, be prepared for a steep bar tab.',
    cuisine: 'Bar Food',
    priceRange: '$$$$',
    phoneNumber: '+1 615-712-8303',
    website: 'http://www.alleytapsnashville.com/',
    openingHours: [
      'Monday: 2:00 PM-3:00 AM',
      'Tuesday: 2:00 PM-3:00 AM',
      'Wednesday: 2:00 PM-3:00 AM',
      'Thursday: 2:00 PM-3:00 AM',
      'Friday: 12:00 PM-3:00 AM',
      'Saturday: 12:00 PM-3:00 AM',
      'Sunday: 12:00 PM-3:00 AM'
    ],
    tags: [
      'Bar',
      'Live Music',
      'Casual',
      'Late Night'
    ]
  },
  {
    id: 'riverport-grille-chattanooga',
    name: 'Riverport Grille',
    location: {
      lat: 35.05375827141748,
      lng: -85.31050379008802,
      address: '224 Broad St, Chattanooga, TN 37402, USA',
      city: 'Chattanooga',
      country: 'USA',
      googleMapsUrl: 'https://maps.google.com/?cid=10487858015603037616'
    },
    rating: 3.8,
    drinkRating: undefined,
    googleRating: 4.7,
    visitDates: ['2025-05-25'],
    review: 'The food at Riverport Grille was okay. The main dishes, such as the club sandwich and blackened catfish tacos, were tasty and well-prepared. However, the sides we had were unfortunately overcooked and quite salty, which was a bit disappointing. The environment is casual and the restaurant seems fairly new. Parking is a bit of a challenge; paid parking is available nearby, including garage, lot, and street parking, but it isn\'t always easy to find a spot.',
    cuisine: 'American',
    priceRange: '$$',
    phoneNumber: '+1 423-305-7000',
    website: 'http://riverportgrille.com/',
    openingHours: [
      'Monday: 11:00 AM-10:00 PM',
      'Tuesday: 11:00 AM-10:00 PM',
      'Wednesday: 11:00 AM-10:00 PM',
      'Thursday: 11:00 AM-10:00 PM',
      'Friday: 11:00 AM-11:00 PM',
      'Saturday: 11:00 AM-11:00 PM',
      'Sunday: 10:00 AM-10:00 PM'
    ],
    tags: [
      'American',
      'Grille',
      'Casual'
    ],
    parking: {
      icon: '/images/icons/thumbs-down.png',
      count: 1,
      description: 'Paid parking available nearby but difficult to find.'
    }
  },
  {
    id: 'buc-ees-adairsville-ga',
    name: "Buc-ee's",
    location: {
      lat: 34.441946862011264,
      lng: -84.91636765239784,
      address: '601 Union Grove Rd SE, Adairsville, GA 30103, USA',
      city: 'Adairsville',
      country: 'USA',
      googleMapsUrl: 'https://maps.google.com/?cid=14185891214205704908'
    },
    rating: 5.0,
    drinkRating: undefined,
    googleRating: 4.2,
    visitDates: ['2025-05-24', '2025-05-25'],
    review: 'The food at Buc-ee\'s was absolutely great! It\'s truly a bargain for the quality you get. Their burritos and sandwiches don\'t skimp on the meat, and it\'s always cooked beautifully. This place is perfect for a stop on the road – excellent fuel for both the car and yourself! Their breakfast burritos are a perfect way to start the day, and the brisket sandwich is always a reliable choice. The clean facilities and friendly staff make it a must-stop location on any road trip.',
    cuisine: 'American',
    priceRange: '$',
    phoneNumber: '+1 979-238-6390',
    website: 'http://buc-ees.com/',
    openingHours: [
      'Monday: Open 24 hours',
      'Tuesday: Open 24 hours',
      'Wednesday: Open 24 hours',
      'Thursday: Open 24 hours',
      'Friday: Open 24 hours',
      'Saturday: Open 24 hours',
      'Sunday: Open 24 hours'
    ],
    tags: [
      'Convenience Store',
      'Gas Station',
      'Barbecue',
      'Deli',
      'Road Trip Stop',
      '24 Hours',
      'Affordable'
    ],
    parking: {
      icon: '/images/icons/thumbs-up.png',
      count: 3,
      description: 'Ample free parking lot available.'
    }
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
  //   // photos: [
  //   //   'URL to your main photo',
  //   //   'URL to additional photo 1',
  //   //   'URL to additional photo 2'
  //   //   // Add as many photos as you want
  //   // ],
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

// Initial real dish data (renamed to dishesData)
// The mainImage path here will be used to find the manifest key
const dishesData: (Omit<Dish, 'photos' | 'mainImage'> & { originalMainImagePath: string })[] = [
  {
    id: 'us-1',
    name: 'Cajun Pasta',
    country: 'US',
    countryName: 'United States',
    dateCooked: '2025-03-15',
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
    originalMainImagePath: '/images/dishes/cajun-pasta/CajunPasta.jpg', // Used to find key
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
    dateCooked: '2025-03-15',
    rating: 4.2,
    difficulty: 'Easy',
    recipeDetails: 'Classic garlic bread with a crispy crust and buttery garlic topping. Perfect as a side for pasta dishes or soups. Made with a baguette, butter, fresh garlic, and parsley.',
    ingredients: [
      '1 baguette',
      '1/2 cup unsalted butter, softened',
      '4 cloves garlic, minced',
      '2 tbsp fresh parsley, chopped',
      'Pinch of salt'
    ],
    originalMainImagePath: '/images/dishes/garlic-bread/GarlicBread.jpg', 
    prepTime: '10 minutes',
    cookTime: '10 minutes',
    totalTime: '20 minutes',
    servings: 6,
    tags: ['Italian', 'Side Dish', 'Garlic', 'Bread']
  },
  {
    id: 'baby-octopus-stirfry-1',
    name: 'Baby Octopus Stir-Fry',
    country: 'KR',
    countryName: 'South Korea',
    dateCooked: '2025-05-17',
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
    originalMainImagePath: '/images/dishes/baby-octopus-stirfry/Dish.png',
    prepTime: '20 minutes',
    cookTime: '20 minutes',
    totalTime: '40 minutes',
    servings: 3,
    notes: 'A collaborative cooking adventure! Details on our experience to come.',
    tags: ['Seafood', 'Stir-fry', 'Korean', 'Octopus', 'Pork Belly'],
    sourceUrls: [
      { url: 'https://naver.me/FbO31oO3', type: 'web', description: 'Original Recipe' }
    ],
    recipe: `1. 씻어서 손질해놓은 쭈꾸미는 살짝 데쳐주는데요. 끓는 물에 소주 1컵을 넣고 쭈꾸미를 넣어 1분 정도 데쳐줍니다.
   Blanch the cleaned and prepared octopus: bring water to a boil, add 1 cup of soju, then add the octopus and cook for about 1 minute.

2. 데친 주꾸미는 물기를 제거해준 후에 먹기 좋은 크기로 잘라주는데 편하게 가위로 작업해주세요.
   Drain the blanched octopus, pat dry, and cut into bite-sized pieces using scissors for convenience.

3. 물기를 제거한 후 쭈꾸미볶음 양념을 해줄 텐데요. 다진 마늘 1, 굵은 고춧가루 3, 양조간장 1, 굴소스 1, 물엿 1, 설탕 1, 고추장 1, 후추 톡톡톡 넣어준 후에 골고루 섞어줍니다.
   Prepare the stir-fry sauce: in a bowl combine 1 Tbsp minced garlic, 3 Tbsp coarse red chili powder, 1 Tbsp brewed soy sauce, 1 Tbsp oyster sauce, 1 Tbsp corn syrup, 1 Tbsp sugar, 1 heaping Tbsp gochujang, and a few shakes of ground pepper; mix thoroughly.

4. 양배추와 양파는 1cm 두께로 썰어주고, 대파와 청양고추는 어슷하게 썰어 준비해둡니다.
   Slice the cabbage and onion into 1 cm-thick pieces, and cut the green onion and Korean hot chili pepper on the diagonal.

5. 팬에 삼겹살을 먼저 구워주는데, 한쪽 면이 익으면 뒤집어 설탕 1스푼을 넣고 노릇노릇하게 구워주세요.
   In a hot pan, cook the pork belly first; when one side is done, flip it, add 1 Tbsp sugar, and cook until golden brown.

6. 청주 2스푼을 넣고 한 번 더 구워준 후에…
   Pour in 2 Tbsp cooking rice wine and sear once more.

7. 준비해놓은 주꾸미와 쭈꾸미 볶음 양념을 넣고 센 불에서 함께 볶아줍니다. 강한 불에서 볶아야 물이 생기지 않아 양념 맛을 그대로 즐길 수 있어요.
   Add the prepared octopus and stir-fry sauce, then stir-fry over high heat so no liquid forms and the flavors stay concentrated.

8. 준비해놓은 채소들(양파, 대파, 양배추, 청양고추)를 넣고 함께 볶아줍니다.
   Add the prepared vegetables (onion, green onion, cabbage, chili pepper) and continue stir-frying together.

9. 양파가 투명해지면 통깨를 솔솔 뿌려주면 주꾸미볶음 완성입니다.
   When the onion becomes translucent, sprinkle with sesame seeds to finish the stir-fried octopus.`,
  },
  {
    id: 'cake-jello-1',
    name: 'Cake With Jello',
    country: 'US',
    countryName: 'United States',
    dateCooked: '2025-05-17',
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
    originalMainImagePath: '/images/dishes/cake-jello/finished-plate.heic',
    prepTime: '40 minutes',
    cookTime: '40 minutes',
    totalTime: '80 minutes (plus cooling time for cake)',
    servings: 20,
    notes: 'Cake must cool completely before frosting. Both the cake and the frosting were good individually (potentially 4/5 each), but they didn\'t fit well together.',
    tags: ['Dessert', 'Cake', 'Jello', 'American'],
    sourceUrls: [
      { url: 'https://sallysbakingaddiction.com/vanilla-sheet-cake/', type: 'web', description: 'Vanilla Sheet Cake Recipe' },
      { url: 'https://www.instagram.com/reel/DIwrv6CPyat/', type: 'instagram', description: 'Frosting Inspiration Reel' }
    ],
    recipe: `Make the cake: Preheat the oven to 350°F (177°C). Generously grease a 9×13-inch cake pan.

Sift the cake flour, sugar, baking powder, baking soda, and salt in the bowl of a stand mixer. (Or if using a handheld mixer, any large mixing bowl.) With the paddle attachment, beat the ingredients together on low speed for a few seconds to gently combine. Add the butter, vanilla, and 1/2 cup of milk. Mix on medium speed until the dry ingredients are moistened, about 1 minute. Stop the mixer and scrape down the sides and up the bottom of the bowl. The mixture will resemble a thick dough.

Whisk the remaining milk, the sour cream, and eggs together in a medium bowl. With the mixer running on medium speed, add the egg mixture in 3 additions, mixing for about 15 seconds after each addition. Stop the mixer and scrape down the sides and up the bottom of the bowl, then mix for about 15 more seconds until batter is completely combined. Avoid over-mixing. Some small lumps are OK.

Pour and spread batter evenly into prepared pan. Bake for around 32-35 minutes or until the cake is baked through. To test for doneness, insert a toothpick into the center of the cake. If it comes out clean, it's done. Allow cake to cool completely in the pan set on a wire rack. The cake must be completely cool before frosting.

Prepare the frosting: In a medium bowl, combine the vanilla Greek yogurt, cheesecake jello powder, white chocolate jello powder, and milk. Whisk until smooth and well combined. Once the cake has cooled completely, spread the frosting evenly over the top. Garnish with sliced strawberries.`
  }
];

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
      rating: r.rating, // Use rating directly
      photoUrl: r.photos && r.photos.length > 0 ? r.photos[0] : undefined,
      itemUrl: `/restaurant/${r.id}`
    })));

  const dishEvents: TimelineEvent[] = dishesData
    .filter(d => d.dateCooked !== 'YYYY-MM-DD') // Filter out placeholder dates
    .map(d => ({
      id: `dish-${d.id}`,
      type: 'dish',
      content: d.name,
      start: d.dateCooked,
      country: d.countryName,
      rating: d.rating,
      photoUrl: d.originalMainImagePath ? d.originalMainImagePath : undefined,
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

function processRestaurantData(): Restaurant[] {
  if (processedRestaurants) return processedRestaurants;

  processedRestaurants = (restaurantsData as any[]).map(baseRestaurant => {
    // Try to find images using different possible keys
    let restaurantImages: string[] = [];
    
    // First, try using the restaurant ID directly (most common case)
    const idKey = baseRestaurant.id;
    if (typedManifest.restaurants[idKey]) {
      restaurantImages = typedManifest.restaurants[idKey];
    } 
    // Handle known special cases
    else if (baseRestaurant.id === 'varasanos-pizzeria-atlanta' && typedManifest.restaurants['verasanos-pizzeria']) {
      restaurantImages = typedManifest.restaurants['verasanos-pizzeria'];
    }
    // If we still don't have images, try to extract a key from any existing photos
    else if (baseRestaurant.id) {
      // Look through all keys in the manifest to find a partial match
      const possibleKeys = Object.keys(typedManifest.restaurants);
      const matchingKey = possibleKeys.find(key => baseRestaurant.id.includes(key) || key.includes(baseRestaurant.id));
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

  processedDishes = (dishesData as any[]).map(baseDish => {
    const imageKey = extractKeyFromPath(baseDish.originalMainImagePath, 'dishes');
    const dishImages = imageKey ? (typedManifest.dishes[imageKey] || []) : [];
    
    return {
      ...baseDish,
      mainImage: dishImages.length > 0 ? dishImages[0] : baseDish.originalMainImagePath, // Fallback to original if not in manifest
      photos: dishImages.length > 0 ? dishImages : [baseDish.originalMainImagePath], // Fallback
    } as Dish; // Added type assertion
  });
  return processedDishes;
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

// The following functions (addRestaurant, addDish) are for potential future use
// and would need to be adapted if data is primarily managed via static arrays + manifest.
// For now, they are not modified as they seem to imply runtime data modification
// which is outside the scope of just reading from the manifest.
export const addRestaurant = (restaurant: Restaurant): void => {
  // This would need to reset processedRestaurants
  restaurantsData.push(restaurant);
  processedRestaurants = null; // Reset the cache to force reprocessing
};

export const addDish = (dish: Dish): void => {
  // This would need to reset processedDishes
  console.warn("addDish is not fully implemented for manifest-driven data. Any images must be manually added to the manifest.");
  const { photos, mainImage, ...baseDish } = dish;
  const originalMainImagePath = mainImage || (photos && photos.length > 0 ? photos[0] : '');
  (dishesData as any).push({ ...baseDish, originalMainImagePath });
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

