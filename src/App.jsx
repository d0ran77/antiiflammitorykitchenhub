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
          'Peel the fresh ginger using the edge of a spoon and grate it finely to avoid large spicy chunks.',
          'Add the frozen fruit and spinach to the blender first, then top with the spices and seeds.',
          'Pour in the chilled coconut water.',
          'Blend on high speed for 60 seconds until the chia seeds are fully incorporated and the texture is silky smooth.',
          'Serve immediately in a chilled glass to preserve the live enzymes.'
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
          'Scoop out the black seeds from the papaya and cube the flesh.',
          'Grate the fresh ginger finely to release the gingerol-rich oils.',
          'Place the papaya, frozen strawberries, ginger, and hemp hearts into the blender.',
          'Add the probiotic-rich kefir and the soothing aloe vera juice.',
          'Pulse 3 times to break up the fruit, then blend on high until creamy.',
          'Sip slowly to allow the aloe and ginger to coat the digestive tract.'
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
          'Brew one cup of green tea in advance and allow it to chill completely in the refrigerator.',
          'Scoop the avocado flesh from the skin—the healthy fats are essential for nutrient absorption.',
          'Combine the berries, avocado, spinach, flaxseeds, and cinnamon in the blender.',
          'Pour in the chilled green tea.',
          'Blend on high for 45-60 seconds until the avocado has created a silky, milkshake-like texture.'
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
          'Brew a strong cup of chamomile tea using 2 tea bags, then allow it to reach room temperature or chill.',
          'Ensure the tart cherries are the "Montmorency" variety for maximum melatonin content.',
          'Add all ingredients to the blender, ensuring the walnuts are raw and unsalted.',
          'Blend on a lower speed initially to crush the walnuts, then increase to high until perfectly smooth.',
          'Drink this 1-2 hours before bed as part of a winding-down ritual.'
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
          'Sift the matcha powder through a fine-mesh sieve into the blender to prevent clumping.',
          'Add the spinach, frozen pineapple, and hemp hearts.',
          'Pour in the almond milk.',
          'Blend on high speed until the mixture is a vibrant, electric green and completely smooth.',
          'Drink immediately to benefit from the high antioxidant concentration.'
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
          'Add the frozen cherries and raw cacao powder to the blender.',
          'Scoop in the avocado for healthy fats that support hormone production.',
          'Add the oat milk and maple syrup if you prefer a slightly sweeter finish.',
          'Blend on high for 60 seconds until the texture is like a thick chocolate mousse.',
          'Perfect as a post-workout fuel to reduce muscle soreness.'
        ],
        description: createDesc(
            "An ideal post-workout recovery drink. The **magnesium** in cacao helps relax tense muscles, while the **tart cherries** contain specific compounds that actively help your body **flush out metabolic waste** and reduce the inflammation caused by physical exertion.",
            "**Raw cacao** is a **flavonoid powerhouse** that significantly improves blood flow and reduces **oxidative stress** in muscle tissue. The **healthy fats** from avocado ensure that the **fat-soluble vitamins** and phytonutrients from the cherries are fully absorbed, maximizing the recovery window."
        )
      },
      { 
        title: 'Beetroot Blood Builder', benefit: 'Liver Detox & Circulation', icon: <Zap />, 
        ingredients: ['1 small cooked beetroot (not in vinegar)', '75g frozen raspberries', '1 tbsp ground flaxseeds', '240ml pure coconut water'], 
        instructions: [
          'Ensure the beetroot is plain, cooked, and cooled (avoid pickled versions).',
          'Roughly chop the beetroot to assist the blender blades.',
          'Combine the beetroot, frozen raspberries, and flaxseeds.',
          'Pour in the hydrating coconut water.',
          'Blend on high until the mixture is a deep, jewel-toned red.',
          'Drink after a period of high stress or travel to support liver clearing.'
        ],
        description: createDesc(
            "Beetroot is a master liver supporter. This earthy yet sweet smoothie helps **improve oxygen delivery** to your muscles and provides a significant boost to your body's natural **Phase 2 detoxification** pathways, helping you feel lighter and more energized.",
            "**Beets** contain **betalains**, potent antioxidants that support the liver in neutralizing and removing **inflammatory toxins**. The natural **nitrates** in the beetroot are converted into **nitric oxide** in the body, which relaxes blood vessels and improves overall **cardiovascular circulation**."
        )
      },
      { 
        title: 'Spiced Carrot Cake', benefit: 'Vision & Blood Sugar Balance', icon: <Coffee />, 
        ingredients: ['1 medium carrot (finely chopped)', '2.5cm fresh ginger root', '1/2 tsp ground cinnamon', '30g raw walnut halves', '240ml unsweetened almond milk'], 
        instructions: [
          'Peel and roughly chop the carrot into 1cm pieces to ensure it blends perfectly.',
          'Grate the fresh ginger to maximize the release of its anti-inflammatory compounds.',
          'Add the carrot, ginger, cinnamon, and walnuts to the blender jar.',
          'Pour in the almond milk.',
          'Blend on high speed for at least 60-90 seconds to ensure the carrot is completely pulverized into a smooth liquid.',
          'The result should taste like a liquid version of a healthy carrot cake.'
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
          'In the morning, the oats will have absorbed the liquid into a creamy pudding.',
          'Top with fresh blueberries and the crushed walnuts just before eating to maintain the crunch.'
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
          'Pour the egg mixture into the warm pan and let it sit for 10 seconds.',
          'Gently fold the eggs with a spatula until they are 80% set.',
          'Add the fresh spinach to the pan and toss for 30 seconds until just wilted.',
          'Remove from the heat immediately and serve on top of the warm sourdough toast.'
        ],
        description: createDesc(
            "A savory, protein-dense start that utilizes **turmeric**, the most studied anti-inflammatory spice in the world. The addition of **black pepper** is the 'master key' that unlocks the healing potential of this meal.",
            "Turmeric’s active compound, **curcumin**, has low bioavailability on its own. The **piperine** in black pepper increases curcumin absorption by up to **2,000%**, allowing it to actively block inflammatory enzymes like **COX-2**, which are responsible for pain and swelling."
        )
      },
      { 
        title: 'Berry & Chia Pot', benefit: 'Antioxidant Power', 
        ingredients: ['3 tbsp black chia seeds', '200ml unsweetened coconut milk (from a carton)', '1/2 tsp pure vanilla extract', '75g fresh raspberries', '1 tbsp raw hemp hearts'], 
        instructions: [
          'Whisk the chia seeds, coconut milk, and vanilla extract together in a small bowl.',
          'Wait 5 minutes for the seeds to begin swelling, then whisk again vigorously to prevent any clumps.',
          'Cover and refrigerate for at least 30 minutes (or overnight for a thicker texture).',
          'Before serving, stir the mixture one last time.',
          'Layer the raspberries on top and finish with a sprinkle of hemp hearts for added plant protein.'
        ],
        description: createDesc(
            "A light, pudding-like breakfast that is **incredibly gentle** on the digestive tract. It is the perfect option for those who find traditional heavy breakfasts difficult to digest or who struggle with morning bloating.",
            "**Chia seeds** are a powerhouse source of **Alpha-Linolenic Acid (ALA)**, a plant-based Omega-3 that reduces **C-reactive protein** levels in the blood. Combined with the **anthocyanins** in raspberries, this pot provides a massive spectrum of **cellular protection** against free radical damage."
        )
      },
      { 
        title: 'Smashed Avocado', benefit: 'Healthy Fats & Zinc', 
        ingredients: ['1/2 large ripe avocado', '1 slice toasted sourdough or rye bread', '1 tbsp raw pumpkin seeds (pepitas)', '1 small squeeze fresh lemon juice', '1 tsp extra virgin olive oil'], 
        instructions: [
          'Toast your bread until golden and firm.',
          'In a small bowl, mash the avocado flesh with the lemon juice and a tiny pinch of sea salt.',
          'Spread the avocado thickly onto the warm toast.',
          'Sprinkle the pumpkin seeds over the top—they provide essential zinc for immunity.',
          'Finish with a light drizzle of high-quality extra virgin olive oil to increase the absorption of fat-soluble vitamins.'
        ],
        description: createDesc(
            "This classic dish is a nutritional masterpiece. The combination of **monounsaturated fats** and **zinc-rich seeds** creates a shield for your heart and a massive boost for your **immune system's resilience**.",
            "**Oleic acid** found in both avocado and extra virgin olive oil is a healthy fat that significantly reduces inflammatory markers. **Pumpkin seeds** provide a significant dose of **zinc**, a mineral absolutely essential for the development and function of **T-cells and neutrophils**."
        )
      }
    ],
    lunch: [
        { 
          title: 'Quinoa & Beetroot Salad', benefit: 'Liver Detoxification', 
          ingredients: ['100g cooked white or red quinoa', '1 medium cooked beetroot (plain)', '1/2 ripe avocado (sliced)', '1 large handful fresh rocket', 'Dressing: 1 tbsp olive oil + 1 tsp lemon + 1/2 tsp grated ginger'], 
          instructions: [
            'Cook the quinoa in advance and allow it to cool completely (or use pre-cooked packs for speed).',
            'Slice the cooked beetroot and the avocado into bite-sized pieces.',
            'In a large bowl, toss the fresh rocket with the cooled quinoa.',
            'Whisk the dressing ingredients in a small cup until emulsified.',
            'Top the salad with the beetroot and avocado, then drizzle with the ginger-lemon dressing.',
            'Toss gently to ensure the delicate avocado doesn’t break apart.'
          ],
          description: createDesc(
              "A refreshing, colorful lunch that supports your **liver's natural filtering ability**. The wide variety of colors indicates a broad spectrum of **protective phytonutrients** that neutralize daily environmental toxins.",
              "**Quinoa** is a complete plant protein that provides the essential amino acids necessary for **tissue repair**. The **betalains** in beetroot support the liver's **Phase 2 detoxification process**, neutralizing pro-inflammatory substances before they can circulate and cause damage."
          )
        },
        { 
          title: 'Red Lentil & Ginger Soup', benefit: 'Easy Digestion', 
          ingredients: ['100g dried red split lentils', '400ml low-sodium organic vegetable stock', '2.5cm fresh ginger (grated)', '1 tsp ground turmeric', '1/2 clove garlic (minced)'], 
          instructions: [
            'Rinse the red lentils under cold water until the water runs clear.',
            'In a medium pot, combine the lentils, vegetable stock, grated ginger, turmeric, and minced garlic.',
            'Bring to a boil, then immediately reduce the heat to low.',
            'Simmer for 20 minutes with the lid slightly ajar until the lentils have completely softened and become mushy.',
            'For an ultra-smooth, easy-to-digest texture, use a stick blender to cream the soup directly in the pot.',
            'Season with a tiny pinch of sea salt and serve warm.'
          ],
          description: createDesc(
              "Warm, grounding, and incredibly **soothing for the gut**. This soup is specifically formulated for days when your digestion feels sensitive or sluggish, providing comfort without the inflammatory load of dairy.",
              "**Gingerol** and **shogaol** in fresh ginger have been proven to **speed up gastric emptying**, which prevents inflammatory food particles from lingering too long in the digestive tract. **Red lentils** provide soluble fiber to gently move toxins out of the body."
          )
        }
    ],
    dinner: [
        { 
          title: 'Baked Salmon & Sweet Potato', benefit: 'Heart & Skin Health', 
          ingredients: ['1 wild-caught salmon fillet (approx 150g)', '1 medium sweet potato (cut into 2cm cubes)', '100g fresh broccoli florets', '1 tbsp extra virgin olive oil', '1/2 fresh lemon'], 
          instructions: [
            'Preheat your oven to 200°C (400°F).',
            'Toss the sweet potato cubes in half the olive oil and spread them on a baking tray. Roast for 10-12 minutes first.',
            'Move the potatoes to one side of the tray and place the salmon fillet in the center.',
            'Add the broccoli florets to the remaining space on the tray.',
            'Drizzle the remaining oil over the salmon and broccoli, and squeeze the lemon over the fish.',
            'Bake everything together for a further 12-15 minutes until the salmon flakes easily with a fork and the potatoes are tender.',
            'Serve with a final sprinkle of dried oregano if desired.'
          ],
          description: createDesc(
              "The ultimate anti-inflammatory dinner. This meal provides a perfect balance of **Omega-3 healthy fats**, **complex carbohydrates**, and **high-fiber greens** to ensure systemic repair while you sleep.",
              "**Wild-caught salmon** provides long-chain **Omega-3s (EPA/DHA)**, which are the fundamental building blocks for anti-inflammatory signaling molecules. **Broccoli** provides **Vitamin C and sulforaphane**, ensuring your immune system and natural antioxidant defenses are supported."
          )
        }
    ],
    perimenopause: [
      { 
        title: 'Maca & Berry Smoothie', benefit: 'Hot Flush Relief', 
        ingredients: ['1 tbsp raw maca powder', '75g frozen organic blueberries', '1/2 medium cucumber (peeled)', '1 tbsp ground flaxseeds', '240ml chilled unsweetened almond milk'], 
        instructions: [
          'Peel the cucumber to remove the tougher outer skin, then roughly chop.',
          'Combine the cucumber, blueberries, maca powder, and flaxseeds in the blender.',
          'Add the chilled almond milk.',
          'Blend on high for 60 seconds until completely smooth.',
          'The cucumber provides a unique "cooling" thermal effect, while the maca supports the endocrine system during transitions.'
        ],
        description: createDesc(
            "A cooling, grounding smoothie designed to **stabilize energy levels** and ease the transition through hormonal shifts. It targets the 'internal heat' often felt during perimenopause.",
            "**Maca** is a powerful **adaptogen** that supports the endocrine system and may help balance fluctuating estrogen levels. **Cucumber** provides deep cellular hydration and acts as a **natural cooling agent** to counter systemic heat and flushes."
        )
      }
    ],
    endometriosis: [
      { 
        title: 'Turmeric Ginger Broth', benefit: 'Pelvic Relief', 
        ingredients: ['400ml low-sodium organic bone broth (or rich vegetable stock)', '1 tbsp fresh ginger (sliced into thin rounds)', '1 tsp ground turmeric', '1 large clove garlic (crushed)', '1 large handful fresh baby spinach'], 
        instructions: [
          'Pour the bone broth or stock into a small saucepan.',
          'Add the sliced ginger, turmeric, and the crushed garlic clove.',
          'Bring to a very gentle simmer—do not let it boil vigorously or you will destroy delicate nutrients.',
          'Simmer for 10-15 minutes to allow the active anti-inflammatory compounds to infuse into the liquid.',
          'Stir in the fresh spinach right at the end until it just wilts.',
          'Remove the larger pieces of ginger if you prefer, then pour into a large mug and sip slowly.'
        ],
        description: createDesc(
            "Liquid medicine for the body. This broth focuses on flooding the **pelvic area** with warmth and potent **anti-pain nutrients** to help manage cyclic discomfort naturally.",
            "The combination of high-dose **ginger** and **turmeric** specifically targets **prostaglandin production**—the chemical messengers in the body responsible for triggering pelvic pain and uterine contractions."
        )
      }
    ],
    hormones: [
      { 
        title: 'Seed Cycling Smoothie', benefit: 'Cycle Phase Support', 
        ingredients: ['1 tbsp seed cycling blend (Flax/Pumpkin for Phase 1, Sesame/Sunflower for Phase 2)', '1/2 medium ripe banana', '1 large handful fresh spinach', '240ml unsweetened oat milk'], 
        instructions: [
          'Choose the correct seeds based on your current menstrual phase (Follicular vs Luteal).',
          'Add the seeds, banana, and spinach to the blender.',
          'Pour in the oat milk—it provides a gentle, low-inflammatory base.',
          'Blend on high speed for 60 seconds until the seeds are completely pulverized and the texture is silky.',
          'Drink daily to provide your body with the specific minerals needed for hormone clearance.'
        ],
        description: createDesc(
            "A rhythmic approach to nutrition. By **rotating your seed intake** with your cycle, you provide the specific minerals and lignans your body needs most at different times of the month.",
            "**Flax and pumpkin seeds** provide zinc and lignans for the **follicular phase**, while **sesame and sunflower seeds** provide Vitamin E and selenium for the **luteal phase**, supporting optimal hormone clearance and progesterone production."
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

  // Auto-scroll to top on navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab, selectedRecipe]);

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