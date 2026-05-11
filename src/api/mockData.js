// =============================================
// MOCK DATA — Saudi Traditional Foods
// Used until PHP backend is connected
// =============================================

export const MOCK_MEALS = [
  {
    id: 1,
    name: "Kabsa",
    nameAr: "كبسة",
    category: "Main Course",
    origin: "Najd Region",
    description: "The national dish of Saudi Arabia — fragrant basmati rice cooked with tender chicken or lamb, seasoned with an aromatic blend of spices including saffron, cardamom, cinnamon, and dried limes.",
    prepTime: "30 min",
    cookTime: "90 min",
    servings: 6,
    difficulty: "Medium",
    calories: 520,
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    rating: 4.9,
    reviewCount: 2341,
    isFeatured: true,
    ingredients: [
      "2 kg whole chicken, cut into pieces",
      "3 cups basmati rice",
      "2 large onions, finely chopped",
      "4 tomatoes, diced",
      "½ cup tomato paste",
      "4 tbsp Kabsa spice mix",
      "1 tsp saffron threads",
      "3 dried limes (loomi)",
      "4 cardamom pods",
      "2 cinnamon sticks",
      "4 cloves garlic, minced",
      "4 tbsp ghee",
      "Salt to taste",
      "Fresh parsley and raisins for garnish"
    ],
    instructions: [
      { step: 1, title: "Prepare the chicken", text: "Season chicken pieces generously with salt and half the Kabsa spice mix. In a large heavy pot, heat ghee over medium-high heat and brown the chicken on all sides until golden. Remove and set aside." },
      { step: 2, title: "Build the base", text: "In the same pot, sauté onions until deeply golden, about 15 minutes. Add garlic and cook 2 more minutes. Add tomato paste and cook until it darkens slightly, 3–4 minutes." },
      { step: 3, title: "Simmer the broth", text: "Add tomatoes, remaining spice mix, dried limes, cardamom, cinnamon, and enough water to submerge the chicken. Return chicken to pot. Bring to boil, then simmer covered for 45 minutes." },
      { step: 4, title: "Cook the rice", text: "Remove chicken. Measure the remaining broth — you need 5 cups for 3 cups rice. Dissolve saffron in 2 tbsp warm water and add to broth. Add washed rice. Bring to boil, reduce heat, cover tightly, and cook 20 minutes." },
      { step: 5, title: "Serve", text: "Arrange rice on a large platter. Place chicken pieces on top. Garnish with toasted almonds, raisins, and fresh parsley. Serve with tomato sauce and yogurt on the side." }
    ]
  },
  {
    id: 2,
    name: "Jareesh",
    nameAr: "جريش",
    category: "Traditional",
    origin: "Najd Region",
    description: "A beloved Najdi dish of crushed wheat simmered for hours with meat, creating a hearty, creamy porridge garnished with caramelized onions and a drizzle of ghee.",
    prepTime: "12 hrs (soaking)",
    cookTime: "3 hrs",
    servings: 8,
    difficulty: "Hard",
    calories: 380,
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&q=80",
    rating: 4.7,
    reviewCount: 987,
    isFeatured: true,
    ingredients: [
      "2 cups crushed wheat (jareesh)",
      "500g lamb or chicken",
      "2 large onions",
      "1 cup full-fat yogurt",
      "4 tbsp ghee",
      "1 tsp turmeric",
      "1 tsp cumin",
      "Salt and pepper to taste",
      "Fried onions and ghee for garnish"
    ],
    instructions: [
      { step: 1, title: "Soak the wheat", text: "Soak crushed wheat in cold water overnight or for at least 4 hours." },
      { step: 2, title: "Cook the meat", text: "Boil meat with onion, turmeric, cumin, salt and pepper in plenty of water for 45 minutes until tender. Remove meat and reserve broth." },
      { step: 3, title: "Cook the wheat", text: "Drain wheat and add to the hot broth. Cook over medium heat, stirring frequently, for 2 hours until completely broken down and creamy." },
      { step: 4, title: "Finish with yogurt", text: "Stir in yogurt and shredded meat. Continue cooking 20 more minutes until smooth and thick like porridge." },
      { step: 5, title: "Serve", text: "Ladle into bowls. Top with caramelized onions and a generous spoonful of ghee." }
    ]
  },
  {
    id: 3,
    name: "Mutabbaq",
    nameAr: "مطبق",
    category: "Street Food",
    origin: "Hejaz Region",
    description: "A crispy, flaky stuffed pancake filled with spiced minced meat, eggs, and spring onions — a beloved street food from the historic streets of Jeddah and Mecca.",
    prepTime: "20 min",
    cookTime: "30 min",
    servings: 4,
    difficulty: "Medium",
    calories: 450,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
    rating: 4.8,
    reviewCount: 1432,
    isFeatured: true,
    ingredients: [
      "4 sheets spring roll pastry or thin bread dough",
      "300g minced lamb or beef",
      "4 eggs",
      "4 green onions, chopped",
      "1 tsp cumin",
      "1 tsp coriander",
      "½ tsp chili flakes",
      "Salt and pepper",
      "Oil for frying",
      "Cucumber pickle to serve"
    ],
    instructions: [
      { step: 1, title: "Prepare filling", text: "Cook minced meat with spices until browned. Let cool slightly. Mix in green onions." },
      { step: 2, title: "Assemble", text: "Place a sheet of dough flat. Add meat mixture in center. Crack an egg over the filling. Fold edges to form a square packet." },
      { step: 3, title: "Fry", text: "Heat oil in a heavy pan. Fry folded side down first, pressing gently, until golden. Flip and fry the other side." },
      { step: 4, title: "Serve", text: "Cut into squares. Serve immediately while crispy, with cucumber pickle and sweet tea." }
    ]
  },
  {
    id: 4,
    name: "Saleeg",
    nameAr: "سليق",
    category: "Main Course",
    origin: "Hejaz Region",
    description: "Creamy white rice slow-cooked in rich chicken broth and whole milk, then crowned with golden roasted chicken — a sublime dish from the Hejaz known for its silky texture.",
    prepTime: "15 min",
    cookTime: "2 hrs",
    servings: 5,
    difficulty: "Medium",
    calories: 490,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    rating: 4.6,
    reviewCount: 756,
    isFeatured: false,
    ingredients: [
      "1 whole chicken",
      "3 cups short-grain rice",
      "2 cups whole milk",
      "4 cups chicken broth",
      "3 tbsp ghee",
      "1 cinnamon stick",
      "4 cardamom pods",
      "1 tsp white pepper",
      "Salt to taste",
      "Fried onions for garnish"
    ],
    instructions: [
      { step: 1, title: "Roast chicken", text: "Season chicken and roast at 200°C for 45 minutes until golden and cooked through." },
      { step: 2, title: "Make the rice base", text: "Bring broth to a boil with spices. Add washed rice and cook covered for 15 minutes." },
      { step: 3, title: "Add milk", text: "Stir in warm milk. Continue cooking uncovered on low heat, stirring often, until rice is very creamy." },
      { step: 4, title: "Serve", text: "Mound creamy rice on platter. Top with roasted chicken. Drizzle with ghee and garnish with fried onions." }
    ]
  },
  {
    id: 5,
    name: "Mandi",
    nameAr: "مندي",
    category: "Main Course",
    origin: "Asir Region",
    description: "Tender meat and fragrant rice slow-cooked using the traditional tandoor method — smoke infuses every grain in this ancient dish originating from Yemen and perfected across Saudi Arabia.",
    prepTime: "1 hr",
    cookTime: "4 hrs",
    servings: 8,
    difficulty: "Hard",
    calories: 600,
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80",
    rating: 4.9,
    reviewCount: 3201,
    isFeatured: true,
    ingredients: [
      "2 kg whole lamb (or chicken)",
      "3 cups basmati rice",
      "2 tbsp Mandi spice blend",
      "1 tsp saffron",
      "3 dried limes",
      "2 bay leaves",
      "1 onion",
      "4 tbsp ghee",
      "Wood chips for smoking",
      "Rose water for serving"
    ],
    instructions: [
      { step: 1, title: "Marinate meat", text: "Rub lamb with mandi spice blend, salt, and a drizzle of oil. Marinate at least 1 hour." },
      { step: 2, title: "Slow cook meat", text: "Place meat in a large pot with onion, dried limes, and bay leaves. Add water to cover and slow cook for 3 hours until very tender." },
      { step: 3, title: "Smoke the rice", text: "Cook rice in the meat broth. When almost done, create a well in the center and place a small charcoal brazier with wood chips. Cover tightly and allow smoke to infuse for 15 minutes." },
      { step: 4, title: "Serve", text: "Spread rice on a huge platter. Arrange meat on top. Drizzle with rose water. Serve with tomato sauce (saltah) and zhug." }
    ]
  },
  {
    id: 6,
    name: "Harees",
    nameAr: "هريس",
    category: "Traditional",
    origin: "Al-Ahsa Region",
    description: "An ancient dish of slow-cooked wheat and meat blended to a smooth, comforting paste — a Ramadan staple prepared for centuries during holy occasions and family gatherings.",
    prepTime: "8 hrs (soaking)",
    cookTime: "4 hrs",
    servings: 10,
    difficulty: "Hard",
    calories: 310,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
    rating: 4.5,
    reviewCount: 542,
    isFeatured: false,
    ingredients: [
      "2 cups whole wheat grains",
      "500g lamb or chicken",
      "1 large onion",
      "1 tsp cinnamon",
      "1 tsp cardamom",
      "Salt to taste",
      "Ghee and cinnamon for garnish"
    ],
    instructions: [
      { step: 1, title: "Soak wheat", text: "Soak wheat overnight. Drain and rinse well." },
      { step: 2, title: "Cook together", text: "Place wheat and meat in a large pot with onion and spices. Cover generously with water and cook on low heat for 4 hours, stirring every 30 minutes." },
      { step: 3, title: "Blend", text: "Using a heavy wooden spoon or stand mixer paddle, beat the mixture until completely smooth and homogeneous." },
      { step: 4, title: "Serve", text: "Pour into bowls, make a well in the center, and fill with ghee. Dust with cinnamon and sugar if desired." }
    ]
  },
  {
    id: 7,
    name: "Asida",
    nameAr: "عصيدة",
    category: "Dessert",
    origin: "Southwestern Region",
    description: "A thick, silky wheat porridge sweetened with dates and honey, drizzled with warm ghee — a simple yet deeply nourishing breakfast or dessert enjoyed across the Arabian Peninsula.",
    prepTime: "10 min",
    cookTime: "25 min",
    servings: 4,
    difficulty: "Easy",
    calories: 290,
    image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
    rating: 4.4,
    reviewCount: 328,
    isFeatured: false,
    ingredients: [
      "2 cups whole wheat flour",
      "4 cups water",
      "1 tsp salt",
      "Medjool dates, pitted and halved",
      "3 tbsp honey",
      "4 tbsp ghee",
      "Sesame seeds for garnish"
    ],
    instructions: [
      { step: 1, title: "Make dough", text: "Bring salted water to boil. Gradually whisk in flour, stirring vigorously to avoid lumps." },
      { step: 2, title: "Cook and stir", text: "Reduce heat. Stir constantly with a wooden spoon for 20 minutes until very thick and smooth and pulling away from sides." },
      { step: 3, title: "Serve", text: "Turn onto a large plate. Make a hollow in the center. Add ghee, honey, and dates. Sprinkle sesame seeds." }
    ]
  },
  {
    id: 8,
    name: "Madfoon",
    nameAr: "مدفون",
    category: "Main Course",
    origin: "Najd Region",
    description: "\"The buried one\" — meat sealed in a clay pot with rice and spices, then literally buried underground over hot coals to slow-cook for hours, yielding supremely tender meat and deeply perfumed rice.",
    prepTime: "30 min",
    cookTime: "5 hrs",
    servings: 8,
    difficulty: "Hard",
    calories: 560,
    image: "https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&q=80",
    rating: 4.8,
    reviewCount: 891,
    isFeatured: true,
    ingredients: [
      "2 kg whole chicken or lamb",
      "3 cups basmati rice",
      "2 tomatoes",
      "1 onion, sliced",
      "4 tbsp baharat spice mix",
      "3 tbsp ghee",
      "Saffron water",
      "Fresh coriander and fried onions to garnish"
    ],
    instructions: [
      { step: 1, title: "Season", text: "Rub meat generously with baharat spice mix, salt, and ghee. Let marinate 30 minutes." },
      { step: 2, title: "Layer in pot", text: "In a large clay or cast iron pot, layer sliced tomatoes, onions, then rice. Place marinated meat on top. Add just enough water to cover rice." },
      { step: 3, title: "Slow cook", text: "Seal pot tightly and cook in oven at 160°C for 4–5 hours, or traditionally buried in coals." },
      { step: 4, title: "Reveal and serve", text: "Invert onto a large platter so the meat is on top of the rice. Garnish with fried onions and coriander." }
    ]
  }
];

export const MOCK_CATEGORIES = [
  { id: 1, name: "Main Course", nameAr: "طبق رئيسي", icon: "🍛", count: 24 },
  { id: 2, name: "Traditional", nameAr: "تقليدي", icon: "🫕", count: 18 },
  { id: 3, name: "Street Food", nameAr: "أكل الشارع", icon: "🥙", count: 12 },
  { id: 4, name: "Dessert", nameAr: "حلويات", icon: "🍮", count: 15 },
  { id: 5, name: "Breakfast", nameAr: "فطور", icon: "🥞", count: 9 },
  { id: 6, name: "Soup", nameAr: "شوربة", icon: "🥣", count: 7 },
];

export const MOCK_USER = {
  id: 1,
  username: "Abdullah",
  email: "abdullah@example.com",
  joinDate: "January 2024",
  avatar: null,
  favoritesCount: 12,
  bio: "Passionate about authentic Saudi cuisine and preserving culinary heritage."
};

// Simulate API delay
export function mockDelay(ms = 800) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
