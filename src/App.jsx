import React, { useState, useRef, useEffect } from 'react';
import { 
  Leaf, 
  Coffee, 
  Sun, 
  Moon, 
  Utensils, 
  Droplets, 
  ShoppingBasket, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Sparkles,
  Zap,
  X,
  Activity,
  Copy,
  Check,
  Home
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const scrollContainerRef = useRef(null);

  // --- SEO & SCHEMA ENGINE ---
  useEffect(() => {
    if (selectedRecipe) {
      document.title = `${selectedRecipe.title} | Anti-Inflammatory Kitchen Hub`;
      updateMetaDescription(`Learn how to make ${selectedRecipe.title}. ${selectedRecipe.benefit}. High-protein, anti-inflammatory recipe.`);
      injectRecipeSchema(selectedRecipe);
    } else if (activeTab === 'home') {
      document.title = "Anti-Inflammatory Kitchen Hub | Eat to Heal";
      updateMetaDescription("Harness the power of natural ingredients to boost immunity, reduce systemic pain, and reclaim your daily vitality with our functional recipe collections.");
      removeSchema();
    } else {
      const categoryName = allCategories.find(c => c.id === activeTab)?.name || activeTab;
      document.title = `${categoryName} Recipes | Anti-Inflammatory Kitchen Hub`;
      updateMetaDescription(`Explore our collection of ${categoryName} recipes designed to reduce inflammation and support natural recovery.`);
      removeSchema();
    }
  }, [activeTab, selectedRecipe]);

  const updateMetaDescription = (text) => {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = "description";
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
    meta.setAttribute('content', text);
  };

  const injectRecipeSchema = (recipe) => {
    removeSchema();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'recipe-schema';
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": recipe.title,
      "image": [mainCategories.find(c => c.id === activeTab)?.image || ""],
      "author": { "@type": "Organization", "name": "The Kitchen Hub" },
      "description": recipe.benefit,
      "recipeIngredient": recipe.ingredients,
      "recipeInstructions": recipe.instructions.map((step, index) => ({
        "@type": "HowToStep",
        "text": step,
        "position": index + 1
      })),
      "suitableForDiet": "https://schema.org/GlutenFreeDiet"
    };
    script.innerHTML = JSON.stringify(schemaData);
    document.head.appendChild(script);
  };

  const removeSchema = () => {
    const existing = document.getElementById('recipe-schema');
    if (existing) existing.remove();
  };

  // --- DATA CATEGORIES ---
  const mainCategories = [
    { id: 'smoothies', name: 'Drinks', icon: <Droplets className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800&h=1200' },
    { id: 'breakfast', name: 'Breakfast', icon: <Coffee className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800&h=1200' },
    { id: 'lunch', name: 'Lunch', icon: <Sun className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800&h=1200' },
    { id: 'dinner', name: 'Dinner', icon: <Moon className="w-5 h-5" />, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=1200' }
  ];

  const specialCategories = [
    { id: 'perimenopause', name: 'Perimenopause', icon: <Activity className="w-5 h-5" /> },
    { id: 'endometriosis', name: 'Endometriosis', icon: <Activity className="w-5 h-5" /> },
    { id: 'hormones', name: 'Hormones', icon: <Activity className="w-5 h-5" /> }
  ];

  const allCategories = [...mainCategories, ...specialCategories];

  const masterIngredientsData = [
    { title: "🍎 Fruits & Berries", items: ['Blueberries & Raspberries', 'Avocado', 'Lemon', 'Papaya', 'Pineapple', 'Tart Cherries'] },
    { title: "🥦 Vegetables & Greens", items: ['Spinach, Rocket, Baby Kale', 'Beetroot', 'Sweet Potato', 'Broccoli, Asparagus', 'Mixed Med Veg', 'Garlic', 'Ginger'] },
    { title: "🐟 Proteins", items: ['Salmon & Mackerel', 'Cod / White Fish', 'Turkey Breast', 'Free-range Eggs', 'Firm Tofu'] },
    { title: "🫘 Pantry Staples", items: ['Jumbo Rolled Oats', 'Quinoa', 'Red Split Lentils', 'Chickpeas', 'Sourdough or Rye'] },
    { title: "🌿 Boosters & Oils", items: ['Turmeric & Black Pepper', 'Chia & Flaxseeds', 'Hemp Hearts', 'Walnuts', 'Extra Virgin Olive Oil', 'Aloe Vera Juice'] }
  ];

  const createDesc = (why, science) => `### Why Your Body Loves This\n${why}\n\n### The Nutritional Science\n${science}`;

  const data = {
    smoothies: [
      { 
        title: 'Golden Glow', benefit: 'Immunity & Systemic Inflammation', icon: <Zap />, 
        ingredients: ['75g frozen pineapple chunks', '75g frozen mango chunks', '1 large handful fresh baby spinach', '1.5cm fresh ginger (peeled and grated)', '1/2 tsp ground turmeric', '1 tbsp black chia seeds', '240ml chilled coconut water'], 
        instructions: [
          'Peel the fresh ginger using the edge of a spoon to scrape the skin off, then grate it finely into a paste.',
          'Place the baby spinach at the bottom of the blender, followed by the frozen fruit and the spices.',
          'Pour in the chilled coconut water, ensuring it covers at least half of the fruit.',
          'Blend on high speed for 45-60 seconds until the chia seeds are broken down and the texture is electric green and smooth.',
          'Serve immediately in a glass to maintain maximum antioxidant potency.'
        ],
        description: createDesc(
          "This vibrant blend acts as a powerful morning reset. The **natural bromelain** found in pineapple helps your body **digest proteins** more effectively and significantly **reduces internal swelling**. The **Vitamin C** from mango and spinach provides an antioxidant-rich energy lift that protects your cells from daily oxidative stress.",
          "**Turmeric** contains its most active compound, **curcumin**, which is scientifically proven to inhibit the **NF-kB molecule**—a protein complex that travels into the nuclei of your cells and turns on genes related to chronic inflammation. When paired with **fresh ginger**, this creates a dual-action pathway to **suppress pro-inflammatory cytokines**."
        )
      },
      { 
        title: 'Soothing Relief', benefit: 'Joint Pain & Sensitive Stomach', icon: <Info />, 
        ingredients: ['75g ripe papaya (cubed)', '75g frozen strawberries', '2.5cm fresh ginger root', '60ml plain unsweetened kefir or coconut yogurt', '1 tbsp raw hemp hearts', '180ml pure aloe vera juice (food grade)'], 
        instructions: [
          'Remove the seeds from the papaya and cube the flesh into small pieces.',
          'Grate the fresh ginger root finely; the juice of the ginger is just as important as the pulp.',
          'Add all solid ingredients to the blender, then pour in the liquid kefir and aloe vera juice.',
          'Blend on high speed until the hemp hearts are completely pulverized into the cream.',
          'Sip slowly to allow the aloe and ginger to coat and soothe the digestive tract.'
        ],
        description: createDesc(
          "Specifically designed for those with **sensitive digestive systems** or **joint stiffness**, this smoothie uses **aloe vera** and **papaya** to coat and protect the stomach lining. The **strawberries** provide a dense hit of antioxidants that help reduce the heat of systemic inflammation throughout the body.",
          "**Papaya** contains **papain**, a proteolytic enzyme that assists in protein breakdown and actively reduces gut-based inflammation. **Aloe vera juice** adds a layer of **soothing mucilage**, which has been clinically shown to support **mucosal healing** throughout the digestive tract while the **gingerol** in ginger blocks pain signaling."
        )
      },
      { 
        title: 'Radiant Skin Elixir', benefit: 'Collagen & Skin Elasticity', icon: <Sparkles />, 
        ingredients: ['75g mixed organic berries', '1/4 ripe avocado', '1 handful fresh spinach', '1 tbsp ground flaxseeds', '1/2 tsp ground cinnamon', '240ml high-quality green tea (brewed and chilled)'], 
        instructions: [
          'Brew your green tea 30 minutes in advance and let it chill in the fridge or freezer.',
          'Scoop the avocado flesh directly into the blender—its fats are required to absorb the Vitamin K in the spinach.',
          'Add the berries, spinach, ground flax, and cinnamon.',
          'Pour the chilled tea over the mixture and blend on high for 60 seconds.',
          'The result should be a silky, deep-purple blend that is rich in skin-protecting lipids.'
        ],
        description: createDesc(
          "This is a beauty-focused blend that works from the inside out. The **healthy monounsaturated fats** from **avocado** and **Omega-3s** from **flaxseeds** help maintain the skin's **lipid barrier**, effectively reducing redness and preventing the chronic dryness that leads to premature aging.",
          "**Mixed berries** are packed with **anthocyanins**, which act as biological bodyguards, protecting your **collagen structures** from oxidative damage. **Green tea** provides **EGCG** (epigallocatechin gallate), a unique catechin that neutralizes the free radicals responsible for inflammatory breakouts and cellular degradation."
        )
      },
      { 
        title: 'Deep Sleep Dreamer', benefit: 'Nervous System & Rest', icon: <Moon />, 
        ingredients: ['75g frozen tart cherries (Montmorency)', '1/2 small ripe banana', '30g raw walnut halves', '1 tbsp unsweetened almond butter', '1 tiny dash ground cinnamon', '240ml chamomile tea (brewed and cooled)'], 
        instructions: [
          'Prepare your chamomile tea by steeping two bags in one cup of hot water, then allow it to reach room temperature.',
          'Combine the frozen tart cherries, banana, and walnuts in the blender.',
          'Add the almond butter and a pinch of cinnamon for blood sugar stability.',
          'Pour in the chamomile tea and blend until the walnuts are no longer grainy.',
          'Enjoy 1 hour before sleep to signal your body to produce natural melatonin.'
        ],
        description: createDesc(
          "A functional evening treat designed to switch your nervous system from 'fight-or-flight' to **'rest-and-digest'**. The combination of **magnesium** and **healthy fats** creates a steady blood sugar environment, making it easier for your brain to initiate a deep, restorative sleep cycle.",
          "**Tart cherries** are one of the very few natural food sources of **melatonin**, the hormone that regulates your internal sleep-wake cycle. **Walnuts** provide additional melatonin and **ALA Omega-3s**, while **chamomile tea** contains **apigenin**, an antioxidant that binds to specific receptors in your brain to promote **muscle relaxation and anxiety reduction**."
        )
      },
      { 
        title: 'Matcha Green Giant', benefit: 'Cellular Health & Energy', icon: <Leaf />, 
        ingredients: ['1 tsp ceremonial grade matcha powder', '1 large handful fresh spinach', '75g frozen pineapple chunks', '1 tbsp raw hemp hearts', '240ml unsweetened almond milk'], 
        instructions: [
          'Sift your matcha powder through a small sieve to ensure there are no bitter clumps.',
          'Add the spinach and frozen pineapple to the blender first.',
          'Pour in the almond milk and add the hemp hearts for high-quality plant protein.',
          'Blend on high for 90 seconds until the mixture is frothy and electric green.',
          'Drink this mid-morning to maintain a steady, non-inflammatory focus.'
        ],
        description: createDesc(
            "This drink provides a highly focused, **sustained energy lift** without the jittery crash associated with coffee. It floods your cells with **chlorophyll**, a natural detoxifier, and **high-quality plant proteins** from hemp that support muscle maintenance.",
            "**Matcha** contains a high concentration of **L-theanine**, a rare amino acid that promotes a state of **relaxed alertness**. This works synergistically with natural caffeine to enhance cognitive function while **EGCG catechins** inhibit inflammatory markers in the brain and support overall cellular longevity."
        )
      },
      { 
        title: 'Cherry Cacao Recovery', benefit: 'Muscle Recovery & Antioxidants', icon: <Sparkles />, 
        ingredients: ['75g frozen tart cherries', '1 tbsp raw organic cacao powder', '1/4 ripe avocado', '240ml unsweetened oat milk', '1 tsp pure maple syrup (optional)'], 
        instructions: [
          'Pit your cherries if using fresh, though frozen is recommended for a thicker texture.',
          'Combine the cherries, raw cacao, and avocado in the blender.',
          'Add the oat milk; it provides a gentle sweetness that balances the rich cacao.',
          'Blend on high until the texture is like a liquid chocolate truffle.',
          'Consume within 30 minutes of exercise to maximize the muscle recovery window.'
        ],
        description: createDesc(
            "An ideal post-workout recovery drink. The **magnesium** in cacao helps relax tense muscles, while the **tart cherries** contain specific compounds that actively help your body **flush out metabolic waste** and reduce the inflammation caused by physical exertion.",
            "**Raw cacao** is a **flavonoid powerhouse** that significantly improves blood flow and reduces **oxidative stress** in muscle tissue. The **healthy fats** from avocado ensure that the **fat-soluble vitamins** and phytonutrients from the cherries are fully absorbed, maximizing the recovery window."
        )
      },
      { 
        title: 'Beetroot Blood Builder', benefit: 'Liver Detox & Circulation', icon: <Zap />, 
        ingredients: ['1 small cooked beetroot (unpickled)', '75g frozen raspberries', '1 tbsp ground flaxseeds', '240ml pure coconut water'], 
        instructions: [
          'Ensure the beetroot is plain (steamed or roasted) and not pickled in vinegar.',
          'Chop the beetroot into quarters and place it in the blender with the frozen raspberries.',
          'Add the flaxseeds and the coconut water—this provides natural electrolytes.',
          'Blend on high for 60 seconds until the mixture is a deep, jewel-toned magenta.',
          'Perfect for post-travel or after a period of poor diet to support liver clearance.'
        ],
        description: createDesc(
            "Beetroot is a master liver supporter. This earthy yet sweet smoothie helps **improve oxygen delivery** to your muscles and provides a significant boost to your body's natural **Phase 2 detoxification** pathways, helping you feel lighter and more energized.",
            "**Beets** contain **betalains**, potent antioxidants that support the liver in neutralizing and removing **inflammatory toxins**. The natural **nitrates** in the beetroot are converted into **nitric oxide** in the body, which relaxes blood vessels and improves overall **cardiovascular circulation**."
        )
      },
      { 
        title: 'Spiced Carrot Cake', benefit: 'Vision & Blood Sugar Balance', icon: <Coffee />, 
        ingredients: ['1 medium carrot (chopped)', '2.5cm fresh ginger root', '1/2 tsp ground cinnamon', '30g raw walnut halves', '240ml unsweetened almond milk'], 
        instructions: [
          'Peel the carrot and chop it into very small cubes to help the blender achieve a smooth finish.',
          'Grate the fresh ginger and add it along with the cinnamon and walnuts.',
          'Pour in the almond milk.',
          'Blend on high speed for at least 90 seconds to ensure the carrot is completely smooth.',
          'This warming blend is fantastic for stabilizing energy levels in the late afternoon.'
        ],
        description: createDesc(
            "This blend allows you to enjoy the flavors of a classic treat while **stabilizing your energy levels**. It is exceptionally rich in **fiber** and warming spices that support your metabolism and prevent the afternoon energy slump.",
            "**Cinnamon** is highly effective at improving **insulin sensitivity**, which prevents the rapid blood sugar spikes that trigger **systemic inflammation**. **Carrots** provide a massive dose of **beta-carotene**, a precursor to **Vitamin A**, which is essential for maintaining healthy vision and immune cell integrity."
        )
      }
    ],
    breakfast: [
      { 
        title: 'Overnight Omega Oats', benefit: 'Gut Health & Fibre', 
        ingredients: ['50g jumbo organic rolled oats', '1 tbsp black chia seeds or ground flaxseeds', '150ml unsweetened almond or oat milk', '50g fresh blueberries', '20g crushed raw walnuts'], 
        instructions: [
          'In a clean glass jar, combine the jumbo oats and the seeds.',
          'Pour in the milk and stir thoroughly to ensure no chia seeds clump at the bottom.',
          'Seal the jar and place it in the refrigerator for at least 6 hours, ideally overnight.',
          'In the morning, top with fresh blueberries and the crushed walnuts just before eating to maintain the crunch.'
        ],
        description: createDesc(
            "A zero-effort breakfast that acts as a **prebiotic feast** for your gut microbiome. The high **Omega-3 content** from walnuts and seeds ensures your brain is fueled and your joints are lubricated for the day ahead.",
            "The **beta-glucan fiber** in jumbo oats is a unique type of soluble fiber that feeds beneficial gut bacteria. A **healthy microbiome** is the primary foundation of a balanced immune system, preventing the chronic 'leaky gut' issues that lead to **widespread systemic inflammation**."
        )
      },
      { 
        title: 'Turmeric Scrambled Eggs', benefit: 'Morning Protein Boost', 
        ingredients: ['2 large free-range organic eggs', '1/2 tsp ground turmeric', '1 generous pinch black pepper', '1 large handful fresh spinach', '1 slice toasted sourdough bread'], 
        instructions: [
          'In a small bowl, crack the eggs and whisk them with the turmeric and black pepper—the pepper is vital for turmeric absorption.',
          'Heat a teaspoon of extra virgin olive oil in a non-stick pan over medium heat.',
          'Gently fold the eggs with a spatula until they are 80% set, then add the fresh spinach to the pan.',
          'Toss for 30 seconds until just wilted and serve immediately on the warm sourdough toast.'
        ],
        description: createDesc(
            "A savory, protein-dense start utilizing **turmeric**, the world's most studied anti-inflammatory spice. The addition of **black pepper** is the 'master key' to this meal.",
            "Turmeric’s active compound, **curcumin**, has low bioavailability on its own. The **piperine** in black pepper increases curcumin absorption by up to **2,000%**, allowing it to block inflammatory enzymes like **COX-2**."
        )
      },
      { 
        title: 'Berry & Chia Pot', benefit: 'Antioxidant Power', 
        ingredients: ['3 tbsp black chia seeds', '200ml unsweetened coconut milk (carton)', '1/2 tsp pure vanilla extract', '75g fresh raspberries', '1 tbsp raw hemp hearts'], 
        instructions: [
          'Whisk the chia seeds, coconut milk, and vanilla extract together in a small bowl.',
          'Wait 5 minutes for the seeds to begin swelling, then whisk again vigorously to prevent any clumps.',
          'Cover and refrigerate for at least 30 minutes.',
          'Before serving, layer the raspberries on top and finish with a sprinkle of hemp hearts.'
        ],
        description: createDesc(
            "A cooling, pudding-like breakfast that is **incredibly gentle** on the digestive tract. Perfect for those who struggle with morning bloating.",
            "**Chia seeds** are a powerhouse source of **ALA Omega-3**, which reduces **C-reactive protein** levels. Combined with the **anthocyanins** in raspberries, this pot provides massive **cellular protection**."
        )
      },
      { 
        title: 'Smashed Avocado', benefit: 'Healthy Fats & Zinc', 
        ingredients: ['1/2 large ripe avocado', '1 slice toasted sourdough or rye bread', '1 tbsp raw pumpkin seeds', '1 small squeeze fresh lemon juice', '1 tsp extra virgin olive oil'], 
        instructions: [
          'Toast your bread until golden and firm.',
          'In a small bowl, mash the avocado flesh with the lemon juice and a tiny pinch of sea salt.',
          'Spread the avocado thickly onto the warm toast.',
          'Sprinkle the pumpkin seeds over the top and finish with a light drizzle of olive oil.'
        ],
        description: createDesc(
            "A nutritional masterpiece. The combination of **monounsaturated fats** and **zinc-rich seeds** creates a shield for your heart and boosts **immune resilience**.",
            "**Oleic acid** found in avocado and olive oil significantly reduces inflammatory markers. **Pumpkin seeds** provide **zinc**, a mineral absolutely essential for the development and function of **T-cells**."
        )
      },
      { 
        title: 'Green Shakshuka', benefit: 'Iron & Immune Support', 
        ingredients: ['2 eggs', '1 large handful kale (chopped)', '1 handful baby spinach', '1/2 avocado', '1/2 tsp ground cumin'], 
        instructions: [
          'Sauté the kale and spinach in a pan with cumin and olive oil over medium heat until softened.',
          'Use a spoon to create two small wells in the greens.',
          'Crack an egg into each well, cover the pan with a lid, and cook for 3-5 minutes until the whites are set.',
          'Serve directly from the pan topped with sliced avocado.'
        ],
        description: createDesc(
            "A vibrant, low-carb start. Packing two servings of **leafy greens** into your first meal provides the minerals needed for deep cellular repair.",
            "**Vitamin K** and **chlorophyll** in kale and spinach help alkalize the body and reduce oxidative stress. The **healthy monounsaturated fats** in the avocado make the iron in the greens much more bioavailable."
        )
      },
      { 
        title: 'Sweet Potato Toast', benefit: 'Sustained Energy & Potassium', 
        ingredients: ['2 slices sweet potato (1cm thick)', '2 tbsp unsweetened almond butter', '1/2 banana (sliced)', '1 tsp black chia seeds'], 
        instructions: [
          'Toast the sweet potato slices in a standard toaster 2-3 times on the highest setting until tender, or bake at 200°C for 15 minutes.',
          'Spread each warm slice with almond butter.',
          'Top with the banana slices and a sprinkle of chia seeds.',
          'A fantastic gluten-free alternative that provides long-lasting fuel.'
        ],
        description: createDesc(
            "A clever, whole-food alternative to bread. Provides a steady release of energy and a massive dose of **Vitamin A** for tissue repair.",
            "**Sweet potatoes** have a **low glycemic index**, preventing the insulin spikes that cause inflammation. They are also rich in **beta-carotene**, which protects your body's mucosal barriers."
        )
      },
      { 
        title: 'Anti-Inflammatory Pancakes', benefit: 'Comfort Food Reimagined', 
        ingredients: ['50g organic buckwheat flour', '1 large free-range egg', '100ml unsweetened almond milk', '50g fresh blueberries', '1/2 tsp ground cinnamon'], 
        instructions: [
          'In a bowl, whisk the buckwheat flour, egg, milk, and cinnamon into a smooth batter.',
          'Gently fold in the fresh blueberries.',
          'Heat a non-stick pan over medium heat with a little coconut oil.',
          'Pour small amounts of batter and cook until bubbles form on top, then flip and cook until golden brown.',
          'Serve warm with a tiny drizzle of honey if desired.'
        ],
        description: createDesc(
            "Indulge without the inflammatory consequences of refined flour. **Buckwheat** is a nutrient-dense seed that supports heart health.",
            "Buckwheat contains **rutin**, a bioflavonoid that strengthens blood vessels and has potent anti-inflammatory effects. **Anthocyanins** in blueberries remain stable even when lightly heated."
        )
      },
      { 
        title: 'Smoked Salmon Frittata', benefit: 'Brain Nourishment', 
        ingredients: ['3 eggs', '50g smoked salmon (torn)', '50g asparagus tips', '1 tbsp fresh dill (chopped)'], 
        instructions: [
          'Whisk the eggs in a bowl with the fresh dill.',
          'Lightly sauté the asparagus tips in an oven-proof pan for 3 minutes.',
          'Pour the eggs over the asparagus and layer the torn salmon on top.',
          'Cook on the stove for 2 minutes, then finish under a preheated grill (broiler) for 2-3 minutes until set and golden.'
        ],
        description: createDesc(
            "A high-protein, high-omega-3 breakfast that fuels your brain and keeps your **joints lubricated** for the day ahead.",
            "Oily fish like salmon provides **DHA and EPA**, which are essential for reducing **neuro-inflammation**. **Asparagus** acts as a gentle diuretic, helping the body flush out inflammatory toxins."
        )
      }
    ],
    lunch: [
        { 
          title: 'Quinoa & Beetroot Salad', benefit: 'Liver Detoxification', 
          ingredients: ['100g cooked white quinoa', '1 medium cooked beetroot (plain)', '1/2 ripe avocado (sliced)', '1 large handful fresh rocket'], 
          instructions: [
            'Combine the cooled quinoa and fresh rocket in a large mixing bowl.',
            'Slice the beetroot into small wedges and add to the bowl.',
            'Prepare a dressing using 1 tbsp olive oil, a squeeze of lemon, and 1/2 tsp of grated ginger.',
            'Toss the salad gently with the dressing.',
            'Place the avocado slices on top just before serving to prevent mashing.'
          ],
          description: createDesc(
              "A refreshing lunch supporting your **liver's natural filtering ability**. The colors indicate a broad spectrum of **protective phytonutrients**.",
              "**Quinoa** is a complete protein for **tissue repair**. The **betalains** in beetroot support the liver's **Phase 2 detoxification**, neutralizing pro-inflammatory substances before they cause damage."
          )
        },
        { 
          title: 'Red Lentil & Ginger Soup', benefit: 'Easy Digestion', 
          ingredients: ['100g red split lentils', '400ml low-sodium organic vegetable stock', '2.5cm fresh ginger (grated)', '1 tsp ground turmeric'], 
          instructions: [
            'Rinse the red lentils thoroughly under cold water.',
            'In a medium pot, simmer the lentils in the vegetable stock with the ginger and turmeric for 20 minutes.',
            'Once the lentils are very soft, use a stick blender to cream the soup until smooth.',
            'This reduces the digestive effort required by the body while providing warming relief.'
          ],
          description: createDesc(
              "Warm, grounding, and **soothing for the gut**. Formulated for days when your digestion feels sensitive, providing comfort without the load of dairy.",
              "**Gingerol** and **shogaol** in ginger speed up **gastric emptying**, preventing inflammatory food particles from lingering. **Red lentils** provide soluble fiber to move toxins out of the body."
          )
        },
        { 
          title: 'Mackerel on Rye', benefit: 'High Omega-3 Intake', 
          ingredients: ['1 tinned mackerel fillet (in olive oil)', '2 slices toasted rye bread', '1 large handful fresh rocket', '1 tsp apple cider vinegar'], 
          instructions: [
            'Lightly toast the rye bread until firm.',
            'Flake the mackerel fillet onto the toast, including a teaspoon of the omega-rich olive oil from the tin.',
            'In a small bowl, toss the rocket with apple cider vinegar to support stomach acid.',
            'Pile the dressed rocket on top of the fish and serve immediately.'
          ],
          description: createDesc(
              "One of the most potent anti-inflammatory lunches available. **Mackerel** is an Omega-3 powerhouse that directly targets systemic pain.",
              "Mackerel is exceptionally high in **EPA/DHA Omega-3s**, which compete with pro-inflammatory Omega-6s. **Rye bread** provides a slower insulin response than wheat, further reducing inflammatory potential."
          )
        },
        { 
          title: 'Hummus & Veg Wrap', benefit: 'Plant Diversity', 
          ingredients: ['1 wholemeal or gluten-free wrap', '2 tbsp organic hummus', '100g mixed roasted Mediterranean vegetables', '1 handful baby spinach'], 
          instructions: [
            'Spread a thick layer of hummus over the center of the wrap.',
            'Arrange your roasted vegetables (peppers, courgettes, and onions are best) over the hummus.',
            'Top with a generous handful of baby spinach.',
            'Fold in the sides and roll tightly; slice in half diagonally for easy eating.'
          ],
          description: createDesc(
              "A simple way to hit daily **plant diversity goals**. The healthy monounsaturated fats and fiber provide steady, crash-free energy.",
              "**Chickpeas** provide protein and fiber to **stabilize blood sugar**. A diverse array of antioxidants from Mediterranean veg helps neutralize free radicals produced during daily stress."
          )
        },
        { 
          title: 'Sardines & Bean Salad', benefit: 'Bone Health & Focus', 
          ingredients: ['1 tin sardines in olive oil', '100g cannellini beans (rinsed)', '1/2 fresh lemon', '1 handful fresh parsley (chopped)'], 
          instructions: [
            'In a bowl, mix the cannellini beans with the chopped parsley and a squeeze of lemon.',
            'Place the sardines on top of the bean mixture.',
            'Use the oil from the sardine tin as a natural dressing—it is loaded with Vitamin D and Omega-3s.',
            'Season with a tiny pinch of sea salt and cracked black pepper.'
          ],
          description: createDesc(
              "A pantry-staple lunch packing a massive punch. Rich in **Calcium, Vitamin D, and Omega-3s** to support both skeleton and spirit.",
              "**Sardines** are a rare natural source of **Vitamin D**, essential for modulating the immune response. **Cannellini beans** provide **resistant starch**, which ferments to produce anti-inflammatory **butyrate**."
        )
        },
        { 
          title: 'Turmeric Cauliflower Bowl', benefit: 'Low-Carb Cleanse', 
          ingredients: ['150g cauliflower rice', '30g chopped raw walnuts', '2 tbsp fresh pomegranate seeds', '1 handful fresh spinach'], 
          instructions: [
            'Sauté the cauliflower rice in a pan with a little olive oil and 1/2 tsp turmeric for 5 minutes.',
            'Stir in the baby spinach until it just begins to wilt.',
            'Transfer to a serving bowl and top with the crunchy walnuts and pomegranate seeds.',
            'A light, cleansing lunch that supports cellular detoxification.'
          ],
          description: createDesc(
              "A light, cleansing lunch mimicking rice without the glycemic load. **Pomegranate seeds** add a burst of antioxidant sweetness.",
              "**Cruciferous vegetables** like cauliflower contain **sulforaphane**, which activates the **Nrf2 pathway**—the most powerful internal antioxidant defense system. **Turmeric** adds additional systemic relief."
          )
        },
        { 
          title: 'Sweet Potato & Bean Soup', benefit: 'Heart Health', 
          ingredients: ['1 medium sweet potato (diced)', '100g black beans (rinsed)', '400ml organic vegetable stock', '1/2 tsp cumin'], 
          instructions: [
            'Simmer the diced sweet potato in the stock with cumin for 15 minutes until tender.',
            'Stir in the rinsed black beans and heat through for 2 minutes.',
            'For a creamier texture, blend half of the soup and then mix it back with the whole beans.',
            'This provides a fiber-rich, heart-healthy meal that keeps you full for hours.'
          ],
          description: createDesc(
              "A fiber-rich soup that supports **cardiovascular health**. The warming spices add depth and provide essential digestive support.",
              "**Black beans** are high in **soluble fiber**, which binds to inflammatory cholesterol. **Sweet potatoes** provide **potassium**, helping regulate fluid balance and counteract high sodium levels."
          )
        },
        { 
          title: 'Green Goddess Wrap', benefit: 'Lean Muscle & Joints', 
          ingredients: ['1 spinach or wholemeal wrap', '100g poached chicken breast', '1/2 ripe avocado', '1 large handful fresh basil'], 
          instructions: [
            'Blend the avocado with the fresh basil and a teaspoon of olive oil to create a thick green dressing.',
            'Shred the poached chicken breast and mix it thoroughly with the dressing.',
            'Spoon the mixture into the wrap and roll tightly.',
            'The high protein content supports muscle repair without the heavy inflammation of red meat.'
          ],
          description: createDesc(
              "A satisfying, protein-heavy wrap utilizing fresh herbs for a natural boost. **Basil** is a surprisingly powerful inflammation fighter.",
              "Basil contains **eugenol**, which works similarly to over-the-counter anti-inflammatories by inhibiting the **COX enzyme**. Lean protein supports muscle maintenance without the inflammation of red meat."
          )
        }
    ],
    dinner: [
        { 
          title: 'Baked Salmon & Sweet Potato', benefit: 'Heart & Skin Health', 
          ingredients: ['1 salmon fillet (150g)', '1 medium sweet potato (cubed)', '100g fresh broccoli florets', '1/2 fresh lemon'], 
          instructions: [
            'Preheat oven to 200°C.',
            'Toss sweet potato cubes in olive oil and bake for 10 minutes.',
            'Add the salmon fillet and broccoli to the tray; drizzle with lemon and more oil.',
            'Bake everything for a further 12-15 minutes until the salmon is flaky.',
            'This provides a balanced hit of fats and fiber for evening repair.'
          ],
          description: createDesc(
              "The ultimate anti-inflammatory dinner. A perfect balance of **Omega-3s**, **complex carbohydrates**, and **fiber** to ensure repair while you sleep.",
              "**Wild-caught salmon** provides long-chain **EPA/DHA**, the building blocks for anti-inflammatory signaling. **Broccoli** provides **Vitamin C and sulforaphane** to support natural antioxidant defenses."
          )
        },
        { 
          title: 'Chickpea Sunshine Curry', benefit: 'Systemic Relief', 
          ingredients: ['200g cooked chickpeas', '100ml light coconut milk', '1 tsp turmeric', '1 tsp fresh grated ginger', '2 large handfuls spinach'], 
          instructions: [
            'In a large pan, sauté the grated ginger and turmeric in a little oil for 1 minute.',
            'Add the chickpeas and the coconut milk.',
            'Simmer gently on low heat for 15 minutes to let the flavors meld.',
            'Stir in the fresh spinach right at the end until just wilted; serve with brown rice.'
          ],
          description: createDesc(
              "A mild, fragrant curry filling your kitchen with healing aromas. Spices work together to **lower systemic inflammation**.",
              "The combination of **turmeric and ginger** creates a 'synergistic effect', where active compounds enhance each other. **Chickpeas** provide slow-release carbs for steady evening energy."
          )
        },
        { 
          title: 'Turkey & Ginger Stir-fry', benefit: 'Lean Muscle & Pain Relief', 
          ingredients: ['150g turkey strips', '100g mixed stir-fry vegetables', '2.5cm fresh ginger matchsticks', '1 clove minced garlic'], 
          instructions: [
            'Heat a wok with a teaspoon of avocado oil.',
            'Stir-fry the turkey strips with garlic and ginger until fully cooked through.',
            'Add the mixed vegetables and toss for 4 minutes until they are tender-crisp.',
            'Add a tablespoon of tamari for a non-inflammatory salty finish.'
          ],
          description: createDesc(
              "High-protein dinner utilizing large amounts of **fresh ginger** to target **joint and muscle pain**. Lean turkey is an excellent source of **zinc**.",
              "Ginger acts as a natural pain reliever by **suppressing leukotrienes**—inflammatory molecules causing swelling. **Tamari** is used to avoid common grain-based inflammatory triggers."
          )
        },
        { 
          title: 'Cod with Garlic & Parsley', benefit: 'Gentle Digestion', 
          ingredients: ['150g fresh cod fillet', '1 large clove garlic (minced)', '1 tbsp chopped fresh parsley', '100g boiled baby potatoes'], 
          instructions: [
            'Place the cod on a large piece of foil.',
            'Top the fish with the minced garlic, parsley, lemon slices, and a drizzle of olive oil.',
            'Wrap the foil into a parcel and bake for 15 minutes at 180°C.',
            'Serve with the baby potatoes for a light, easy-to-digest evening meal.'
          ],
          description: createDesc(
              "A light evening meal easy on the digestive system. **Garlic and parsley** provide a potent antimicrobial and anti-inflammatory punch.",
              "**Garlic** contains **allicin**, which supports the immune system. **Parsley** is highly **alkalizing** and rich in **Vitamin K**, which is essential for bone density and blood integrity."
          )
        },
        { 
          title: 'Turmeric Lemon Chicken', benefit: 'Post-Workout Healing', 
          ingredients: ['150g chicken breast (chopped)', '1/2 fresh lemon', '1 tsp ground turmeric', '1 medium courgette (sliced)'], 
          instructions: [
            'Marinate the chicken pieces in the lemon juice and turmeric for 15 minutes.',
            'Roast the chicken and courgette slices on a baking tray at 200°C for 25 minutes.',
            'The lemon and turmeric work together to speed up the repair of exercised muscles.'
          ],
          description: createDesc(
              "A simple, clean meal focusing on **repairing tissues** after physical activity. Lemon juice helps soften protein for easier digestion.",
              "**Vitamin C** from lemon assists in **collagen synthesis**, aiding the repair of tendons. **Turmeric** targets the systemic inflammation that builds up after heavy exercise."
          )
        },
        { 
          title: 'Walnut & Lentil Bolognese', benefit: 'Cellular Renewal', 
          ingredients: ['100g cooked brown lentils', '50g crushed walnuts', '200g organic crushed tomatoes', '1 medium courgette'], 
          instructions: [
            'In a pan, sauté minced garlic and add the cooked lentils and walnuts.',
            'Pour in the crushed tomatoes and simmer for 15 minutes to allow the sauce to thicken.',
            'Spiralise the courgette into noodles and serve the hot sauce over the raw "zoodles".'
          ],
          description: createDesc(
              "A plant-based classic. **Walnuts and lentils** provide rich texture and a massive dose of **plant protein and healthy fats**.",
              "**Lentils** are high in **folate**, essential for DNA synthesis and repair. **Lycopene** in tomatoes becomes more bioavailable when cooked, shielding against oxidative stress."
          )
        },
        { 
          title: 'Miso Glazed Black Cod', benefit: 'Deep Hydration', 
          ingredients: ['150g cod fillet', '1 tbsp organic miso paste', '1 tsp fresh ginger (grated)', '100g steamed bok choy'], 
          instructions: [
            'Mix the miso paste and ginger with a tiny splash of water.',
            'Spread the mixture over the cod fillet and bake for 15 minutes at 200°C.',
            'Steam the bok choy separately for 3 minutes and serve on the side.'
          ],
          description: createDesc(
              "A sophisticated dinner bringing **fermented goodness** to your plate. **Miso** is a great way to support gut health in the evening.",
              "Miso provides **live probiotics** for a healthy microbiome. **Bok choy** belongs to the cruciferous family, providing **glucosinolates** that support your natural antioxidant systems."
          )
        },
        { 
          title: 'Anti-Inflammatory Veggie Stew', benefit: 'Microbiome Diversity', 
          ingredients: ['1/2 aubergine (cubed)', '200g crushed tomatoes', '100g cooked chickpeas', '1 tbsp extra virgin olive oil'], 
          instructions: [
            'Sauté the aubergine cubes and minced garlic in olive oil until the aubergine is very soft.',
            'Add the tomatoes and chickpeas and bring to a gentle simmer.',
            'Cover and cook for 20 minutes on the lowest setting until the stew is rich and thick.'
          ],
          description: createDesc(
              "A hearty stew allowing flavors to meld. Rich in **fiber** and diverse plant compounds that feed the immune system.",
              "**Aubergine** contains **nasunin**, a potent antioxidant in the purple skin that protects cell membranes. Slow cooking makes the **fiber** very easy for the gut to handle."
          )
        }
    ],
    perimenopause: [
      { 
        title: 'Maca & Berry Smoothie', benefit: 'Hot Flush Relief', 
        ingredients: ['1 tbsp raw maca powder', '75g frozen blueberries', '1/2 medium cucumber (peeled)', '1 tbsp ground flaxseeds', '240ml chilled almond milk'], 
        instructions: [
          'Combine the blueberries, peeled cucumber, maca, and flaxseeds in a blender.',
          'Pour in the almond milk.',
          'Blend on high for 60 seconds; the cucumber provides an immediate cooling thermal effect.'
        ],
        description: createDesc(
            "A cooling smoothie designed to **stabilize energy levels** and ease hormonal shifts. It targets the 'internal heat' felt during perimenopause.",
            "**Maca** is a powerful **adaptogen** that supports the endocrine system. **Cucumber** provides deep cellular hydration and acts as a **natural cooling agent** to counter hot flushes."
        )
      },
      { 
        title: 'Phytoestrogen Salad', benefit: 'Oestrogen Balancing', 
        ingredients: ['100g steamed edamame beans', '1 large handful mixed greens', '30g pumpkin seeds', '1/2 ripe avocado', 'Tahini dressing'], 
        instructions: [
          'Steam the edamame beans until tender (about 4 minutes).',
          'Toss the beans with the mixed greens and seeds in a large bowl.',
          'Top with sliced avocado and a generous drizzle of tahini dressing for balanced hormones.'
        ],
        description: createDesc(
            "A nutrient-rich salad providing **plant-based estrogens** to gently support hormonal harmony during transitions.",
            "**Edamame** contains **isoflavones**, a type of phytoestrogen that can modulate the effects of estrogen in the body, smoothing out hormonal fluctuations."
        )
      },
      { 
        title: 'Tofu & Broccoli Stir-Fry', benefit: 'Bone Density', 
        ingredients: ['150g firm organic tofu (cubed)', '100g fresh broccoli florets', '1 tbsp sesame oil', '1 tsp grated ginger', '1 tbsp tamari'], 
        instructions: [
          'Pan-fry the tofu cubes in sesame oil until they are golden on all sides.',
          'Add the ginger and broccoli, stir-frying for 4 minutes with a splash of water.',
          'Add the tamari at the very end to avoid burning the sauce.'
        ],
        description: createDesc(
            "Focus on bone-strengthening **minerals** and **plant protein**. This meal is essential as natural estrogen levels decline.",
            "**Tofu** is a rich source of **calcium and phytoestrogens**. **Broccoli** provides **Vitamin K**, which is essential for maintaining bone mineral density."
        )
      },
      { 
        title: 'Sage & Pumpkin Seed Chicken', benefit: 'Night Sweat Reduction', 
        ingredients: ['150g chicken breast', '1 tbsp fresh sage (finely chopped)', '30g crushed pumpkin seeds', '1 tbsp extra virgin olive oil'], 
        instructions: [
          'Coat the chicken breast in olive oil, then press the chopped sage and crushed pumpkin seeds onto the meat.',
          'Bake at 200°C for 25 minutes until cooked through and the seeds are toasted.',
          'Sage is a traditional remedy for reducing the intensity of hot flushes and sweats.'
        ],
        description: createDesc(
            "A grounding dinner utilizing the properties of **sage**. It is specifically targeted at temperature regulation.",
            "**Sage** has been used traditionally for centuries to manage **excessive sweating**. **Pumpkin seeds** provide **magnesium**, which calms the nervous system for better rest."
        )
      }
    ],
    endometriosis: [
      { 
        title: 'Turmeric Ginger Broth', benefit: 'Pelvic Relief', 
        ingredients: ['400ml low-sodium bone broth', '1 tbsp fresh ginger (sliced)', '1 tsp ground turmeric', '1 large clove garlic (crushed)', '1 handful fresh baby spinach'], 
        instructions: [
          'Simmer the broth with the ginger, turmeric, and garlic for 15 minutes on a low heat.',
          'Do not let the broth boil hard, as this can degrade the anti-inflammatory enzymes.',
          'Stir in the fresh spinach just before serving; sip while warm for pelvic comfort.'
        ],
        description: createDesc(
            "Liquid medicine for the body. Floods the **pelvic area** with warmth and potent **anti-pain nutrients** to manage discomfort naturally.",
            "The combination of high-dose **ginger and turmeric** specifically targets **prostaglandin production**—the chemical messengers responsible for triggering pelvic pain."
        )
      },
      { 
        title: 'Omega-3 Sardine Smash', benefit: 'Pain Management', 
        ingredients: ['1 tin sardines in olive oil', '1/2 large avocado', '1 slice toasted sourdough', 'Squeeze of fresh lemon'], 
        instructions: [
          'In a small bowl, mash the sardines and avocado together with a fork.',
          'Add the lemon juice and spread the mixture thickly over the warm sourdough toast.',
          'The extreme density of Omega-3s targets the pathways that create pelvic pain.'
        ],
        description: createDesc(
            "A high-impact meal for pain management. The sheer density of **Omega-3s** is designed to actively block pain pathways.",
            "**Sardines** provide an extremely high **Omega-3 to Omega-6 ratio**, which is critical for lowering the overall inflammatory load in the reproductive system."
        )
      },
      { 
        title: 'Warm Lentil Detox', benefit: 'Excess Oestrogen Removal', 
        ingredients: ['100g cooked green lentils', '1 medium roasted beetroot (cubed)', '1 handful rocket', 'Dressing: Apple Cider Vinegar'], 
        instructions: [
          'Gently warm the cooked lentils in a pan.',
          'Mix with the roasted beetroot cubes and fresh rocket leaves.',
          'Dress with 1 tbsp of apple cider vinegar to support hormone clearance via the liver and gut.'
        ],
        description: createDesc(
            "Fiber is key for managing endometriosis. This meal supports the **liver and gut** in removing excess hormones.",
            "Excess estrogen can drive tissue growth. The **fiber** in lentils and **betalains** in beetroot support the body's natural elimination pathways to maintain balance."
        )
      },
      { 
        title: 'Wild Salmon & Asparagus', benefit: 'Anti-Bloating', 
        ingredients: ['1 wild salmon fillet', '100g fresh asparagus spears', '1 tbsp extra virgin olive oil', '1/2 fresh lemon'], 
        instructions: [
          'Place the salmon and asparagus on a baking tray.',
          'Drizzle with olive oil and bake for 15 minutes at 180°C.',
          'The asparagus acts as a natural diuretic to help ease the "endo belly" bloating.'
        ],
        description: createDesc(
            "A clean meal targeting **'endo belly' bloating** and providing essential fats needed for **cellular repair** and tissue health.",
            "**Asparagus** contains **asparagine**, an amino acid acting as a natural diuretic to help shed excess fluid. **Salmon** provides the **Omega-3s** needed to reduce internal scarring."
        )
      }
    ],
    hormones: [
      { 
        title: 'Seed Cycling Smoothie', benefit: 'Cycle Phase Support', 
        ingredients: ['1 tbsp seed blend (Flax/Pumpkin OR Sesame/Sunflower)', '1/2 small ripe banana', '1 handful fresh spinach', '240ml unsweetened oat milk'], 
        instructions: [
          'Select your seed blend based on your cycle phase.',
          'Combine all ingredients in a blender and blend on high for 60 seconds.',
          'Consuming these specific minerals daily supports the regular clearance of hormones.'
        ],
        description: createDesc(
            "A rhythmic approach to nutrition. By **rotating seed intake** with your cycle, you provide the minerals your body needs most each month.",
            "**Flax and pumpkin seeds** provide zinc and lignans for the **follicular phase**, while **sesame and sunflower seeds** provide Vitamin E for the **luteal phase**."
        )
      },
      { 
        title: 'Cruciferous Crunch', benefit: 'Oestrogen Detox', 
        ingredients: ['100g fresh kale (shredded)', '50g red cabbage (shredded)', '30g raw walnuts', 'Lemon and olive oil dressing'], 
        instructions: [
          'Massage the kale and cabbage with the lemon and oil dressing for 3 minutes to soften the fiber.',
          'Top with raw walnuts for healthy fats.',
          'Cruciferous vegetables are essential for the liver to process estrogen correctly.'
        ],
        description: createDesc(
            "Raw cruciferous vegetables require 'massage' to release benefits. This salad is a masterclass in **hormonal detoxification**.",
            "Cruciferous vegetables contain **Indole-3-Carbinol (I3C)**, which converts to **DIM**. DIM helps the liver metabolize estrogen into its most beneficial, non-inflammatory forms."
        )
      },
      { 
        title: 'Walnut Crusted Cod', benefit: 'Omega 3/6 Ratio', 
        ingredients: ['150g fresh cod fillet', '1 tbsp raw hemp hearts', '1 tbsp finely crushed walnuts', '1 tsp Dijon mustard'], 
        instructions: [
          'Spread a thin layer of mustard over the top of the cod fillet.',
          'Press the hemp and walnut mixture onto the mustard to create a crust.',
          'Bake for 15 minutes at 180°C until the fish flakes easily.'
        ],
        description: createDesc(
            "A sophisticated dinner ensuring a **balanced ratio** of essential fatty acids to support brain and hormone health.",
            "**Cod** is a very lean, low-toxin protein. The **walnut and hemp crust** provides plant-based fats that act as vital precursors to hormone production."
        )
      },
      { 
        title: 'Sweet Potato Balancer', benefit: 'Progesterone Support', 
        ingredients: ['1 medium sweet potato', '2 tbsp organic tahini', '1 tsp ground cinnamon', '1 handful fresh steamed spinach'], 
        instructions: [
          'Bake the sweet potato whole until very soft (about 45 minutes).',
          'Split open and fill with the steamed spinach.',
          'Drizzle with the tahini and a sprinkle of cinnamon for blood sugar balance and progesterone support.'
        ],
        description: createDesc(
            "A grounding meal beneficial in the second half of your cycle to support **blood sugar** and **progesterone production**.",
            "The **complex carbohydrates** in sweet potato prevent blood sugar dips that cause mood swings, while the **healthy fats** in tahini support progesterone levels."
        )
      }
    ]
  };

  const handleCopy = (ingredients, title) => {
    let textToCopy = "";
    if (Array.isArray(ingredients)) {
      textToCopy = `Ingredients for ${title}:\n` + ingredients.map(i => `- ${i}`).join('\n');
    } else if (typeof ingredients === 'object') {
      textToCopy = "Master Anti-Inflammatory Ingredient List\n\n";
      ingredients.forEach(section => {
        textToCopy += `${section.title.toUpperCase()}\n` + section.items.map(i => `- ${i}`).join('\n') + "\n\n";
      });
    }
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      setCopiedId(title);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(textArea);
  };

  const renderFormattedText = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <div key={i} className="h-4" />;
      const formatBold = (str) => {
        const parts = str.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, j) => 
          part.startsWith('**') && part.endsWith('**') 
            ? <strong key={j} className="font-black text-[#1a1a1a]">{part.slice(2, -2)}</strong> 
            : part
        );
      };
      if (line.startsWith('### ')) {
        return <h3 key={i} className="text-xl font-black mt-10 mb-4 text-[#1a1a1a] uppercase tracking-tighter border-b-2 border-[#1a1a1a]/10 pb-2">{formatBold(line.replace('### ', ''))}</h3>;
      }
      return <p key={i} className="mb-5 text-[#1a1a1a]/80 font-medium leading-relaxed text-lg">{formatBold(line)}</p>;
    });
  };

  const scrollCarousel = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth * 0.6;
      scrollContainerRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedRecipe]);

  const activeCategoryData = allCategories.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen relative font-body text-[#1a1a1a] overflow-x-hidden selection:bg-[#f28d35]/30 flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        :root { --font-heading: 'Plus Jakarta Sans', sans-serif; --font-body: 'Inter', sans-serif; }
        .font-heading { font-family: var(--font-heading); }
        .font-body { font-family: var(--font-body); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f28d35; border-radius: 10px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes gentle-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-gentle-bounce { animation: gentle-bounce 3s ease-in-out infinite; }
      `}</style>

      {/* FIXED BACKGROUND */}
      <div className="fixed inset-0 z-[-1] h-[100dvh] w-full" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2000')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[#e8e7e7]/65 backdrop-blur-[5px]"></div>
      </div>

      <nav className="sticky top-0 z-40 bg-transparent h-20 flex items-center">
        <div className="max-w-5xl mx-auto w-full px-4 flex items-center justify-between">
          <button onClick={() => { setActiveTab('home'); setSelectedRecipe(null); }} className="flex items-center space-x-3 text-[#1a1a1a] font-heading font-black text-2xl tracking-tighter uppercase">
            <Leaf className="w-8 h-8 text-[#f28d35]" />
            <span className="inline">The Kitchen Hub</span>
          </button>
          <button onClick={() => { setActiveTab('home'); setSelectedRecipe(null); }} className="text-[#1a1a1a] hover:text-[#f28d35] transition-colors duration-300 animate-gentle-bounce p-2" title="Home">
            <Home className="w-7 h-7" />
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-20 flex-grow w-full">
        {selectedRecipe ? (
          <div className="animate-in slide-in-from-right-8 duration-500 pt-10">
            <button onClick={() => setSelectedRecipe(null)} className="flex items-center space-x-2 text-[#1a1a1a] font-black uppercase tracking-widest text-xs mb-8 hover:text-[#f28d35] transition-colors">
              <ChevronLeft className="w-5 h-5" /> <span>Back to {activeTab}</span>
            </button>
            <header className="mb-12 border-l-[12px] border-[#f28d35] pl-8">
              <h2 className="text-5xl md:text-7xl font-black text-[#1a1a1a] tracking-tighter font-heading leading-none mb-6">{selectedRecipe.title}</h2>
              <div className="flex items-center text-sm font-black uppercase tracking-widest text-[#1a1a1a] bg-[#f28d35] px-6 py-3 rounded-full w-fit font-heading shadow-xl shadow-[#f28d35]/20">
                <Info className="w-4 h-4 mr-3" /> {selectedRecipe.benefit}
              </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-2">
                <div className="bg-white/40 p-8 md:p-12 rounded-[3rem] border border-[#1a1a1a]/5 mb-12">
                  {renderFormattedText(selectedRecipe.description)}
                </div>
                <div className="space-y-12">
                  <h4 className="text-[#1a1a1a] font-black uppercase text-xs tracking-[0.5em] flex items-center font-heading opacity-40">
                    <Utensils className="w-5 h-5 mr-4" /> THE COOKING METHOD
                  </h4>
                  <div className="space-y-10">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <div key={idx} className="flex space-x-8">
                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#1a1a1a] text-[#f28d35] flex items-center justify-center font-black text-xl shadow-2xl font-heading">{idx + 1}</div>
                        <p className="text-[#1a1a1a] text-xl md:text-2xl leading-relaxed font-bold pt-1 font-body">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="sticky top-28">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-[#1a1a1a] font-black uppercase text-xs tracking-[0.4em] font-heading opacity-40">INGREDIENTS</h4>
                    <button onClick={() => handleCopy(selectedRecipe.ingredients, selectedRecipe.title)} className="bg-[#1a1a1a] text-[#f28d35] px-4 py-2 rounded-xl text-[10px] font-black tracking-widest hover:bg-[#252525] transition-all flex items-center space-x-2 active:scale-95 shadow-xl">
                      {copiedId === selectedRecipe.title ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === selectedRecipe.title ? 'COPIED' : 'COPY ALL'}</span>
                    </button>
                  </div>
                  <ul className="space-y-3">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-[#1a1a1a] font-bold text-lg flex items-center bg-white/60 p-5 rounded-2xl border border-[#1a1a1a]/5 shadow-sm transition-transform hover:translate-x-2">
                        <div className="w-2.5 h-2.5 bg-[#f28d35] rounded-full mr-4 flex-shrink-0"></div> {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeTab === 'home' && (
              <div className="animate-in fade-in duration-1000">
                <section className="flex flex-col items-center justify-center text-center pt-16 pb-8 md:pt-24 md:pb-12 px-4">
                  <div className="inline-flex items-center space-x-3 bg-[#1a1a1a] text-[#f28d35] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.25em] mb-8 shadow-2xl font-heading">
                    <Sparkles className="w-4 h-4" /> <span>Anti-Inflammatory Kitchen</span>
                  </div>
                  <h1 className="text-5xl sm:text-6xl md:text-9xl font-black text-[#1a1a1a] mb-6 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] flex flex-wrap justify-center gap-x-3 md:gap-x-5">
                    <span>Eat to</span> <span className="text-[#f28d35]">Heal.</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-[#1a1a1a] font-bold max-w-2xl mx-auto font-body opacity-80">Harness the power of natural ingredients to boost immunity and reclaim your vitality.</p>
                </section>
                <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-4 pt-4 pb-6 px-4 md:px-0 -mt-4">
                  {mainCategories.map(cat => (
                    <button key={cat.id} onClick={() => setActiveTab(cat.id)} className="flex-shrink-0 w-[75vw] md:w-auto group relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-[3.5rem] shadow-2xl hover:shadow-[#f28d35]/20 snap-center transition-all border border-white/10 text-left overflow-hidden h-[35rem] md:h-[26rem] hover:-translate-y-2">
                      <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-10 text-[#e8e7e7]">
                        <div className="w-14 h-14 bg-[#f28d35] rounded-2xl flex items-center justify-center mb-6 shadow-xl text-[#1a1a1a]">{cat.icon}</div>
                        <h2 className="font-black text-3xl mb-2 font-heading tracking-tighter uppercase leading-none">{cat.name}</h2>
                        <p className="text-[#f28d35] text-[10px] font-black uppercase tracking-[0.2em] font-heading">Digital Collection</p>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="w-full mb-6">
                  <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pt-4 pb-6 px-4 md:px-0 md:justify-center -mt-4">
                    {specialCategories.map(cat => (
                      <button key={cat.id} onClick={() => setActiveTab(cat.id)} className="flex-shrink-0 w-[75vw] md:w-auto snap-center bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 text-[#e8e7e7] px-8 py-5 rounded-full font-heading font-black tracking-[0.2em] text-xs hover:bg-[#f28d35] hover:text-[#1a1a1a] transition-all shadow-2xl hover:-translate-y-2 uppercase flex items-center justify-center space-x-3 group">
                        <span className="text-[#f28d35] group-hover:text-[#1a1a1a] flex-shrink-0">{cat.icon}</span>
                        <span className="truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-2 mb-10">
                  <button onClick={() => setActiveTab('ingredients')} className="bg-[#1a1a1a] text-[#e8e7e7] px-8 py-3 rounded-[2rem] font-black shadow-2xl hover:bg-[#252525] hover:-translate-y-1 transition-all text-sm font-heading tracking-[0.1em] uppercase">VIEW MASTER INGREDIENTS</button>
                </div>
              </div>
            )}
            {['smoothies', 'breakfast', 'lunch', 'dinner', 'perimenopause', 'endometriosis', 'hormones', 'ingredients'].includes(activeTab) && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-600 pt-16 md:pt-20">
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 border-l-[10px] border-[#f28d35] pl-6 md:pl-10 mx-2 md:mx-0">
                  <div className="max-w-2xl">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-4 rounded-2xl bg-[#1a1a1a] shadow-xl border border-white/10 text-[#f28d35]`}>{allCategories.find(c => c.id === activeTab)?.icon || <Utensils className="w-5 h-5" />}</div>
                      <span className="text-[#1a1a1a] font-black uppercase tracking-[0.4em] text-xs font-heading opacity-40">Science-Backed Collection</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-8xl font-black text-[#1a1a1a] capitalize tracking-tighter font-heading mb-6 md:mb-8 leading-tight md:leading-none break-words hyphens-auto">{activeTab}</h1>
                  </div>
                </header>
                {activeTab === 'ingredients' ? (
                  <article className="bg-[#e8e7e7]/80 backdrop-blur-3xl rounded-[3rem] md:rounded-[4rem] p-8 md:p-14 shadow-2xl border border-white mx-2 md:mx-0 relative">
                    <div className="absolute top-8 right-8 md:top-14 md:right-14">
                      <button onClick={() => handleCopy(masterIngredientsData, 'Master List')} className="bg-[#1a1a1a] text-[#f28d35] px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-[#252525] transition-all flex items-center space-x-2 active:scale-95">
                        {copiedId === 'Master List' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedId === 'Master List' ? 'COPIED TO CLIPBOARD' : 'COPY MASTER LIST'}</span>
                      </button>
                    </div>
                    {masterIngredientsData.map((section, idx) => (
                      <div key={idx} className="mb-12 last:mb-0">
                        <h2 className="text-xl font-black text-[#1a1a1a] mb-6 border-b-4 border-[#f28d35] pb-2 font-heading tracking-tight inline-block uppercase">{section.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                          {section.items.map((item, i) => (
                            <div key={i} className="flex items-center space-x-4 text-[#1a1a1a] bg-[#1a1a1a]/5 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-105">
                              <div className="w-2.5 h-2.5 rounded-full bg-[#f28d35] shadow-sm flex-shrink-0"></div>
                              <span className="font-bold text-sm tracking-tight font-body">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </article>
                ) : (
                  <div className="relative group">
                    <button onClick={() => scrollCarousel('left')} className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white shadow-xl rounded-full items-center justify-center text-[#1a1a1a] hover:bg-[#f28d35] hover:text-white transition-all opacity-0 group-hover:opacity-100"><ChevronLeft className="w-8 h-8" /></button>
                    <button onClick={() => scrollCarousel('right')} className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white shadow-xl rounded-full items-center justify-center text-[#1a1a1a] hover:bg-[#f28d35] hover:text-white transition-all opacity-0 group-hover:opacity-100"><ChevronRight className="w-8 h-8" /></button>
                    <div ref={scrollContainerRef} className="flex overflow-x-auto items-stretch snap-x snap-mandatory hide-scrollbar gap-6 pt-4 pb-8 px-4 md:px-0 -mt-4 scroll-smooth">
                      {data[activeTab]?.map((item, idx) => (
                        <article key={idx} className="flex-shrink-0 w-[85vw] md:w-[450px] snap-center bg-[#1a1a1a]/85 backdrop-blur-xl rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 shadow-2xl border border-white/10 flex flex-col h-full hover:shadow-[#f28d35]/10 hover:-translate-y-3 transition-all duration-500">
                          <div className="flex justify-between items-start mb-8 md:mb-10">
                            <h2 className="text-3xl md:text-4xl font-black text-[#e8e7e7] leading-tight font-heading tracking-tighter">{item.title}</h2>
                            <button onClick={() => setSelectedRecipe(item)} className="p-4 md:p-5 bg-[#f28d35] rounded-2xl md:rounded-3xl text-[#1a1a1a] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.15),4px_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[inset_3px_3px_6px_rgba(255,255,255,0.6),inset_-3px_-3px_6px_rgba(0,0,0,0.2),6px_6px_12px_rgba(0,0,0,0.3)] ml-4 flex-shrink-0 transition-all active:scale-95"><Info className="w-6 h-6 md:w-7 md:h-7" /></button>
                          </div>
                          <div className="flex items-center text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] bg-[#f28d35] px-4 md:px-6 py-2 md:py-3 rounded-full w-fit mb-8 md:mb-12 font-heading shadow-lg shadow-[#f28d35]/20"><Zap className="w-4 h-4 mr-2.5 flex-shrink-0" />{item.benefit}</div>
                          <div className="mb-10 md:mb-14 flex-grow">
                            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-6 md:mb-8 font-heading">The Ingredients</h3>
                            <ul className="space-y-4 md:space-y-5">
                              {item.ingredients.slice(0, 4).map((ing, i) => (
                                <li key={i} className="text-[#e8e7e7] text-base md:text-lg font-bold flex items-center font-body opacity-80"><div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#f28d35] rounded-full mr-4 md:mr-5 shadow-sm flex-shrink-0"></div>{ing}</li>
                              ))}
                              {item.ingredients.length > 4 && <li className="text-[#f28d35] text-xs font-black uppercase tracking-widest pl-6">+{item.ingredients.length - 4} More...</li>}
                            </ul>
                          </div>
                          <button onClick={() => setSelectedRecipe(item)} className="w-full py-5 md:py-6 bg-white/5 text-[#f28d35] border-2 border-[#f28d35] text-base md:text-lg font-black rounded-[1.5rem] md:rounded-3xl hover:bg-[#f28d35] hover:text-[#1a1a1a] shadow-2xl transition-all flex items-center justify-center active:scale-95 font-heading tracking-tighter mt-auto">VIEW FULL METHOD</button>
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <footer className="relative z-10 py-16 px-4 bg-transparent mt-auto border-t border-[#1a1a1a]/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          <div className="flex items-center space-x-3 text-[#1a1a1a] font-heading font-black text-xl tracking-tighter"><Leaf className="w-7 h-7 text-[#f28d35]" /><span>The Kitchen Hub</span></div>
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-y-8 md:gap-x-12">
            <div className="flex items-center"><button onClick={() => { setActiveTab('home'); setSelectedRecipe(null); }} className="text-sm md:text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:text-[#f28d35] transition-all font-heading opacity-60 hover:opacity-100">HOME</button></div>
            <div className="hidden md:block w-px bg-[#1a1a1a]/20 min-h-[80px]"></div>
            <div className="flex flex-col items-center md:items-start space-y-5 md:space-y-3 justify-center">
              {['breakfast', 'lunch', 'dinner'].map(id => {
                const cat = mainCategories.find(c => c.id === id);
                return <button key={id} onClick={() => { setActiveTab(id); setSelectedRecipe(null); }} className="text-sm md:text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:text-[#f28d35] transition-all font-heading opacity-60 hover:opacity-100">{cat?.name}</button>
              })}
            </div>
            <div className="hidden md:block w-px bg-[#1a1a1a]/20 min-h-[80px]"></div>
            <div className="flex flex-col items-center md:items-start space-y-5 md:space-y-3 justify-center">
              {['endometriosis', 'hormones', 'perimenopause'].map(id => {
                const cat = specialCategories.find(c => c.id === id);
                return <button key={id} onClick={() => { setActiveTab(id); setSelectedRecipe(null); }} className="text-sm md:text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:text-[#f28d35] transition-all font-heading opacity-60 hover:opacity-100">{cat?.name}</button>
              })}
            </div>
          </div>
          <p className="w-full md:w-auto text-[10px] text-[#1a1a1a] font-black uppercase tracking-[0.4em] font-heading opacity-30 text-center md:text-right mt-4 md:mt-0">Functional Recovery</p>
        </div>
      </footer>
    </div>
  );
};

export default App;