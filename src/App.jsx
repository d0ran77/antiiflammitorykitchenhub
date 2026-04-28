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
    // Update Document Title & Meta Description based on context
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
    removeSchema(); // Clean up old schema
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
        ingredients: ['75g frozen pineapple', '75g frozen mango', '1 handful spinach', '1.5cm ginger', '1/2 tsp turmeric', '1 tbsp chia seeds', '240ml coconut water'], 
        instructions: ['Peel the ginger.', 'Add all ingredients into a blender.', 'Blend on high until smooth.', 'Serve immediately.'],
        description: createDesc(
          "This vibrant blend acts as a powerful morning reset. The **natural bromelain** found in pineapple helps your body **digest proteins** more effectively and significantly **reduces internal swelling**. The **Vitamin C** from mango and spinach provides an antioxidant-rich energy lift that protects your cells from daily oxidative stress.",
          "**Turmeric** contains its most active compound, **curcumin**, which is scientifically proven to inhibit the **NF-kB molecule**—a protein complex that travels into the nuclei of your cells and turns on genes related to chronic inflammation. When paired with **fresh ginger**, this creates a dual-action pathway to **suppress pro-inflammatory cytokines**."
        )
      },
      { 
        title: 'Soothing Relief', benefit: 'Joint Pain & Sensitive Stomach', icon: <Info />, 
        ingredients: ['75g papaya', '75g strawberries', '2.5cm ginger', '60ml kefir', '1 tbsp hemp hearts', '180ml aloe vera juice'], 
        instructions: ['Remove papaya seeds.', 'Add all ingredients to the blender.', 'Pulse then blend until creamy.', 'Enjoy slowly to soothe the gut.'],
        description: createDesc(
          "Specifically designed for **sensitive digestive systems**, this smoothie uses **aloe vera** and **papaya** to coat and protect the stomach lining. The **strawberries** provide a dense hit of antioxidants that help reduce the heat of systemic inflammation.",
          "**Papaya** contains **papain**, a proteolytic enzyme that assists in protein breakdown and reduces gut-based inflammation. **Aloe vera juice** adds a layer of **soothing mucilage**, which supports **mucosal healing** throughout the digestive tract while **gingerol** blocks pain signaling."
        )
      },
      { 
        title: 'Radiant Skin Elixir', benefit: 'Collagen & Skin Elasticity', icon: <Sparkles />, 
        ingredients: ['75g mixed berries', '1/4 avocado', '1 handful spinach', '1 tbsp ground flaxseeds', '1/2 tsp cinnamon', '240ml chilled green tea'], 
        instructions: ['Brew and chill green tea.', 'Add everything to the blender.', 'Blend until the avocado creates a silky texture.'],
        description: createDesc(
          "A beauty-focused blend that works from the inside out. The **healthy monounsaturated fats** from avocado and **Omega-3s** from flaxseeds help maintain the skin's **lipid barrier**, reducing redness and preventing chronic dryness.",
          "**Mixed berries** are packed with **anthocyanins**, which protect your **collagen structures** from oxidative damage. **Green tea** provides **EGCG**, a unique catechin that neutralizes the free radicals responsible for inflammatory breakouts and cellular aging."
        )
      },
      { 
        title: 'Deep Sleep Dreamer', benefit: 'Nervous System & Rest', icon: <Moon />, 
        ingredients: ['75g tart cherries', '1/2 banana', '30g walnuts', '1 tbsp almond butter', 'Dash of cinnamon', '240ml chamomile tea'], 
        instructions: ['Brew and cool chamomile tea.', 'Blend with all other ingredients.', 'Enjoy 1-2 hours before bed.'],
        description: createDesc(
          "A functional evening treat designed to switch your nervous system to **'rest-and-digest'**. The combination of **magnesium** and **healthy fats** creates a steady blood sugar environment for restorative sleep.",
          "**Tart cherries** are a natural source of **melatonin**, the hormone that regulates your sleep-wake cycle. **Walnuts** provide additional melatonin and **ALA Omega-3s**, while **chamomile tea** contains **apigenin**, which promotes **muscle relaxation and anxiety reduction**."
        )
      },
      { 
        title: 'Matcha Green Giant', benefit: 'Cellular Health & Energy', icon: <Leaf />, 
        ingredients: ['1 tsp matcha powder', '1 handful spinach', '75g frozen pineapple', '1 tbsp hemp hearts', '240ml almond milk'], 
        instructions: ['Combine all ingredients in a blender.', 'Blend on high until smooth and vibrant green.'],
        description: createDesc(
            "This drink provides a highly focused, **sustained energy lift**. It floods your cells with **chlorophyll**, a natural detoxifier, and **plant proteins** from hemp that support muscle maintenance.",
            "**Matcha** contains a high concentration of **L-theanine**, an amino acid that promotes a state of **relaxed alertness**. This works with natural caffeine to enhance cognitive function while **EGCG catechins** inhibit inflammatory markers in the brain."
        )
      },
      { 
        title: 'Cherry Cacao Recovery', benefit: 'Muscle Recovery & Antioxidants', icon: <Sparkles />, 
        ingredients: ['75g frozen tart cherries', '1 tbsp raw cacao powder', '1/4 avocado', '240ml oat milk'], 
        instructions: ['Pit cherries if fresh.', 'Blend until rich and creamy.'],
        description: createDesc(
            "An ideal post-workout recovery drink. The **magnesium** in cacao helps relax tense muscles, while the **tart cherries** contain specific compounds that help your body **flush out metabolic waste**.",
            "**Raw cacao** is a **flavonoid powerhouse** that improves blood flow and reduces **oxidative stress** in muscle tissue. The **healthy monounsaturated fats** from avocado ensure that the **fat-soluble vitamins** are fully absorbed."
        )
      },
      { 
        title: 'Beetroot Blood Builder', benefit: 'Liver Detox & Circulation', icon: <Zap />, 
        ingredients: ['1 small cooked beetroot', '75g frozen raspberries', '1 tbsp ground flaxseeds', '240ml coconut water'], 
        instructions: ['Chop the beetroot.', 'Blend with berries and coconut water.'],
        description: createDesc(
            "Beetroot is a master liver supporter. This Earthy blend helps **improve oxygen delivery** to your muscles and provides a significant boost to your body's natural **Phase 2 detoxification** pathways.",
            "**Beets** contain **betalains**, potent antioxidants that support the liver in neutralizing and removing **inflammatory toxins**. The natural **nitrates** in beetroot improve **cardiovascular circulation** by relaxing blood vessels."
        )
      },
      { 
        title: 'Spiced Carrot Cake', benefit: 'Vision & Blood Sugar Balance', icon: <Coffee />, 
        ingredients: ['1 medium carrot', '2.5cm ginger', '1/2 tsp cinnamon', '30g walnuts', '240ml almond milk'], 
        instructions: ['Roughly chop the carrot.', 'Blend on high until completely pulverized.'],
        description: createDesc(
            "Stabilize your energy levels while enjoying classic flavors. This blend is rich in **fiber** and warming spices that support your metabolism and prevent insulin spikes.",
            "**Cinnamon** is highly effective at improving **insulin sensitivity**, which prevents the rapid blood sugar spikes that trigger inflammation. **Carrots** provide a massive dose of **beta-carotene**, a precursor to **Vitamin A** for immune integrity."
        )
      }
    ],
    breakfast: [
      { 
        title: 'Overnight Omega Oats', benefit: 'Gut Health & Fibre', 
        ingredients: ['50g jumbo oats', '1 tbsp chia/flax', '150ml almond milk', '50g blueberries', '20g walnuts'], 
        instructions: ['Combine oats, seeds, and milk in a jar.', 'Stir well and seal.', 'Refrigerate for 6 hours.'],
        description: createDesc(
            "A zero-effort breakfast that acts as a **prebiotic feast** for your gut microbiome. The high **Omega-3 content** ensures your brain is fueled and your joints are lubricated.",
            "The **beta-glucan fiber** in jumbo oats is a unique soluble fiber that feeds beneficial gut bacteria. A **healthy microbiome** is the primary foundation of a balanced immune system, preventing 'leaky gut' and **systemic inflammation**."
        )
      },
      { 
        title: 'Turmeric Scrambled Eggs', benefit: 'Morning Protein Boost', 
        ingredients: ['2 eggs', '1/2 tsp turmeric', 'Pinch black pepper', 'Handful spinach', '1 slice sourdough'], 
        instructions: ['Whisk eggs with turmeric/pepper.', 'Scramble gently with olive oil.', 'Add spinach at the end.'],
        description: createDesc(
            "A savory, protein-dense start utilizing **turmeric**, the world's most studied anti-inflammatory spice. The addition of **black pepper** is the 'master key' to this meal.",
            "Turmeric’s active compound, **curcumin**, has low bioavailability on its own. The **piperine** in black pepper increases curcumin absorption by up to **2,000%**, allowing it to block inflammatory enzymes like **COX-2**."
        )
      },
      { 
        title: 'Berry & Chia Pot', benefit: 'Antioxidant Power', 
        ingredients: ['3 tbsp chia seeds', '200ml coconut milk', '1/2 tsp vanilla', '75g raspberries', '1 tbsp hemp hearts'], 
        instructions: ['Whisk seeds, milk, and vanilla.', 'Wait 5 mins and whisk again.', 'Chill for 30 mins.'],
        description: createDesc(
            "A cooling, pudding-like breakfast that is **incredibly gentle** on the digestive tract. Perfect for those who struggle with morning bloating.",
            "**Chia seeds** are a powerhouse source of **ALA Omega-3**, which reduces **C-reactive protein** levels. Combined with the **anthocyanins** in raspberries, this pot provides massive **cellular protection**."
        )
      },
      { 
        title: 'Smashed Avocado', benefit: 'Healthy Fats & Zinc', 
        ingredients: ['1/2 avocado', '1 slice sourdough', '1 tbsp pumpkin seeds', 'Squeeze of lemon', 'Olive oil'], 
        instructions: ['Toast the bread.', 'Mash avocado with lemon juice.', 'Spread on toast.'],
        description: createDesc(
            "A nutritional masterpiece. The combination of **monounsaturated fats** and **zinc-rich seeds** creates a shield for your heart and boosts **immune resilience**.",
            "**Oleic acid** found in avocado and olive oil significantly reduces inflammatory markers. **Pumpkin seeds** provide **zinc**, a mineral absolutely essential for the development and function of **T-cells**."
        )
      },
      { 
        title: 'Green Shakshuka', benefit: 'Iron & Immune Support', 
        ingredients: ['2 eggs', '1 handful kale', '1 handful spinach', '1/2 avocado', '1/2 tsp cumin'], 
        instructions: ['Wilt greens with cumin.', 'Make two wells and crack eggs in.', 'Cover and cook until set.'],
        description: createDesc(
            "A vibrant, low-carb start. Packing two servings of **leafy greens** into your first meal provides the minerals needed for deep cellular repair.",
            "**Vitamin K** and **chlorophyll** in kale and spinach help alkalize the body and reduce oxidative stress. The **healthy monounsaturated fats** in the avocado make the iron in the greens much more bioavailable."
        )
      },
      { 
        title: 'Sweet Potato Toast', benefit: 'Sustained Energy & Potassium', 
        ingredients: ['2 slices sweet potato', '2 tbsp almond butter', '1/2 banana', '1 tsp chia seeds'], 
        instructions: ['Toast sweet potato until tender.', 'Spread with almond butter.', 'Top with banana.'],
        description: createDesc(
            "A clever, whole-food alternative to bread. Provides a steady release of energy and a massive dose of **Vitamin A** for tissue repair.",
            "**Sweet potatoes** have a **low glycemic index**, preventing the insulin spikes that cause inflammation. They are also rich in **beta-carotene**, which protects your body's mucosal barriers."
        )
      },
      { 
        title: 'Anti-Inflammatory Pancakes', benefit: 'Comfort Food Reimagined', 
        ingredients: ['50g buckwheat flour', '1 egg', '100ml almond milk', '50g blueberries', '1/2 tsp cinnamon'], 
        instructions: ['Whisk flour, egg, milk, and cinnamon.', 'Fold in blueberries.', 'Cook until golden.'],
        description: createDesc(
            "Indulge without the inflammatory consequences of refined flour. **Buckwheat** is a nutrient-dense seed that supports heart health.",
            "Buckwheat contains **rutin**, a bioflavonoid that strengthens blood vessels and has potent anti-inflammatory effects. **Anthocyanins** in blueberries remain stable even when lightly heated."
        )
      },
      { 
        title: 'Smoked Salmon Frittata', benefit: 'Brain Nourishment', 
        ingredients: ['3 eggs', '50g smoked salmon', '50g asparagus tips', '1 tbsp fresh dill'], 
        instructions: ['Whisk eggs and dill.', 'Sauté asparagus.', 'Add eggs and layer salmon on top.'],
        description: createDesc(
            "A high-protein, high-omega-3 breakfast that fuels your brain and keeps your **joints lubricated** for the day ahead.",
            "Oily fish like salmon provides **DHA and EPA**, which are essential for reducing **neuro-inflammation**. **Asparagus** acts as a gentle diuretic, helping the body flush out inflammatory toxins."
        )
      }
    ],
    lunch: [
        { 
          title: 'Quinoa & Beetroot Salad', benefit: 'Liver Detoxification', 
          ingredients: ['100g cooked quinoa', '1 medium beetroot', '1/2 avocado', 'Handful rocket'], 
          instructions: ['Slice beetroot/avocado.', 'Toss with rocket and quinoa.', 'Drizzle with ginger-lemon dressing.'],
          description: createDesc(
              "A refreshing lunch supporting your **liver's natural filtering ability**. The colors indicate a broad spectrum of **protective phytonutrients**.",
              "**Quinoa** is a complete protein for **tissue repair**. The **betalains** in beetroot support the liver's **Phase 2 detoxification**, neutralizing pro-inflammatory substances before they cause damage."
          )
        },
        { 
          title: 'Red Lentil & Ginger Soup', benefit: 'Easy Digestion', 
          ingredients: ['100g red lentils', '400ml veg stock', '2.5cm grated ginger', '1 tsp turmeric'], 
          instructions: ['Rinse lentils.', 'Simmer with stock and spices for 20 mins.', 'Blend until smooth.'],
          description: createDesc(
              "Warm, grounding, and **soothing for the gut**. Formulated for days when your digestion feels sensitive, providing comfort without the load of dairy.",
              "**Gingerol** and **shogaol** in ginger speed up **gastric emptying**, preventing inflammatory food particles from lingering. **Red lentils** provide soluble fiber to move toxins out of the body."
          )
        },
        { 
          title: 'Mackerel on Rye', benefit: 'High Omega-3 Intake', 
          ingredients: ['1 mackerel fillet', '2 slices rye bread', 'Handful rocket', '1 tsp apple cider vinegar'], 
          instructions: ['Toast rye bread.', 'Flake mackerel onto the toast.', 'Pile rocket on top.'],
          description: createDesc(
              "One of the most potent anti-inflammatory lunches available. **Mackerel** is an Omega-3 powerhouse that directly targets systemic pain.",
              "Mackerel is exceptionally high in **EPA/DHA Omega-3s**, which compete with pro-inflammatory Omega-6s. **Rye bread** provides a slower insulin response than wheat, further reducing inflammatory potential."
          )
        },
        { 
          title: 'Hummus & Veg Wrap', benefit: 'Plant Diversity', 
          ingredients: ['1 wholemeal wrap', '2 tbsp hummus', '100g roasted veg', 'Handful spinach'], 
          instructions: ['Spread hummus on wrap.', 'Layer with veg and spinach.', 'Fold and roll tightly.'],
          description: createDesc(
              "A simple way to hit daily **plant diversity goals**. The healthy monounsaturated fats and fiber provide steady, crash-free energy.",
              "**Chickpeas** provide protein and fiber to **stabilize blood sugar**. A diverse array of antioxidants from Mediterranean veg helps neutralize free radicals produced during daily stress."
          )
        },
        { 
          title: 'Sardines & Bean Salad', benefit: 'Bone Health & Focus', 
          ingredients: ['1 tin sardines', '100g cannellini beans', '1/2 lemon', 'Handful parsley'], 
          instructions: ['Rinse beans.', 'Mix beans, onion, and parsley.', 'Top with sardines and lemon.'],
          description: createDesc(
              "A pantry-staple lunch packing a massive punch. Rich in **Calcium, Vitamin D, and Omega-3s** to support both skeleton and spirit.",
              "**Sardines** are a rare natural source of **Vitamin D**, essential for modulating the immune response. **Cannellini beans** provide **resistant starch**, which ferments to produce anti-inflammatory **butyrate**."
        )
        },
        { 
          title: 'Turmeric Cauliflower Bowl', benefit: 'Low-Carb Cleanse', 
          ingredients: ['150g cauliflower rice', '30g walnuts', '2 tbsp pomegranate', 'Handful spinach'], 
          instructions: ['Sauté cauliflower rice with turmeric.', 'Stir in spinach.', 'Top with walnuts and seeds.'],
          description: createDesc(
              "A light, cleansing lunch mimicking rice without the glycemic load. **Pomegranate seeds** add a burst of antioxidant sweetness.",
              "**Cruciferous vegetables** like cauliflower contain **sulforaphane**, which activates the **Nrf2 pathway**—the most powerful internal antioxidant defense system. **Turmeric** adds additional systemic relief."
          )
        },
        { 
          title: 'Sweet Potato & Bean Soup', benefit: 'Heart Health', 
          ingredients: ['1 medium sweet potato', '100g black beans', '400ml veg stock', 'Cumin/Coriander'], 
          instructions: ['Simmer potato for 15 mins.', 'Stir in beans.', 'Blend half and mix back in.'],
          description: createDesc(
              "A fiber-rich soup that supports **cardiovascular health**. The warming spices add depth and provide essential digestive support.",
              "**Black beans** are high in **soluble fiber**, which binds to inflammatory cholesterol. **Sweet potatoes** provide **potassium**, helping regulate fluid balance and counteract high sodium levels."
          )
        },
        { 
          title: 'Green Goddess Wrap', benefit: 'Lean Muscle & Joints', 
          ingredients: ['1 spinach wrap', '100g poached chicken', '1/2 avocado', 'Handful basil'], 
          instructions: ['Blend avocado/basil/oil for dressing.', 'Shred chicken and mix.', 'Spoon into wrap.'],
          description: createDesc(
              "A satisfying, protein-heavy wrap utilizing fresh herbs for a natural boost. **Basil** is a surprisingly powerful inflammation fighter.",
              "Basil contains **eugenol**, which works similarly to over-the-counter anti-inflammatories by inhibiting the **COX enzyme**. Lean protein supports muscle maintenance without the inflammation of red meat."
          )
        }
    ],
    dinner: [
        { 
          title: 'Baked Salmon & Sweet Potato', benefit: 'Heart & Skin Health', 
          ingredients: ['1 salmon fillet', '1 sweet potato', '100g broccoli', 'Lemon & olive oil'], 
          instructions: ['Preheat oven to 200°C.', 'Bake potato for 10 mins.', 'Add salmon and bake 15 mins more.'],
          description: createDesc(
              "The ultimate anti-inflammatory dinner. A perfect balance of **Omega-3s**, **complex carbohydrates**, and **fiber** to ensure repair while you sleep.",
              "**Wild-caught salmon** provides long-chain **EPA/DHA**, the building blocks for anti-inflammatory signaling. **Broccoli** provides **Vitamin C and sulforaphane** to support natural antioxidant defenses."
          )
        },
        { 
          title: 'Chickpea Sunshine Curry', benefit: 'Systemic Relief', 
          ingredients: ['200g chickpeas', '100ml light coconut milk', 'Turmeric/Ginger', 'Spinach'], 
          instructions: ['Sauté ginger and spices.', 'Add chickpeas and milk.', 'Simmer for 15 mins.', 'Stir in spinach.'],
          description: createDesc(
              "A mild, fragrant curry filling your kitchen with healing aromas. Spices work together to **lower systemic inflammation**.",
              "The combination of **turmeric and ginger** creates a 'synergistic effect', where active compounds enhance each other. **Chickpeas** provide slow-release carbs for steady evening energy."
          )
        },
        { 
          title: 'Turkey & Ginger Stir-fry', benefit: 'Lean Muscle & Pain Relief', 
          ingredients: ['150g turkey strips', '100g mixed veg', '2.5cm ginger', '1 clove garlic'], 
          instructions: ['Heat oil.', 'Stir-fry turkey with garlic and ginger.', 'Add veg and toss for 4 mins.'],
          description: createDesc(
              "High-protein dinner utilizing large amounts of **fresh ginger** to target **joint and muscle pain**. Lean turkey is an excellent source of **zinc**.",
              "Ginger acts as a natural pain reliever by **suppressing leukotrienes**—inflammatory molecules causing swelling. **Tamari** is used to avoid common grain-based inflammatory triggers."
          )
        },
        { 
          title: 'Cod with Garlic & Parsley', benefit: 'Gentle Digestion', 
          ingredients: ['150g cod fillet', '1 clove garlic', '1 tbsp parsley', '100g baby potatoes'], 
          instructions: ['Boil potatoes.', 'Place cod on foil with herbs.', 'Bake 15 mins at 180°C.'],
          description: createDesc(
              "A light evening meal easy on the digestive system. **Garlic and parsley** provide a potent antimicrobial and anti-inflammatory punch.",
              "**Garlic** contains **allicin**, which supports the immune system. **Parsley** is highly **alkalizing** and rich in **Vitamin K**, which is essential for bone density and blood integrity."
          )
        },
        { 
          title: 'Turmeric Lemon Chicken', benefit: 'Post-Workout Healing', 
          ingredients: ['150g chicken breast', '1/2 lemon', '1 tsp turmeric', '1 medium courgette'], 
          instructions: ['Marinate chicken.', 'Roast at 200°C for 25 mins.', 'Add courgette to the tray.'],
          description: createDesc(
              "A simple, clean meal focusing on **repairing tissues** after physical activity. Lemon juice helps soften protein for easier digestion.",
              "**Vitamin C** from lemon assists in **collagen synthesis**, aiding the repair of tendons. **Turmeric** targets the systemic inflammation that builds up after heavy exercise."
          )
        },
        { 
          title: 'Walnut & Lentil Bolognese', benefit: 'Cellular Renewal', 
          ingredients: ['100g cooked lentils', '50g walnuts', '200g tomatoes', '1 courgette', 'Garlic'], 
          instructions: ['Sauté garlic.', 'Add lentils, walnuts, and tomatoes.', 'Simmer 15 mins.', 'Serve over courgetti.'],
          description: createDesc(
              "A plant-based classic. **Walnuts and lentils** provide rich texture and a massive dose of **plant protein and healthy fats**.",
              "**Lentils** are high in **folate**, essential for DNA synthesis and repair. **Lycopene** in tomatoes becomes more bioavailable when cooked, shielding against oxidative stress."
          )
        },
        { 
          title: 'Miso Glazed Black Cod', benefit: 'Deep Hydration', 
          ingredients: ['150g cod fillet', '1 tbsp miso paste', '1 tsp ginger', '100g bok choy'], 
          instructions: ['Mix miso and ginger.', 'Spread over cod and bake 15 mins.', 'Steam bok choy.'],
          description: createDesc(
              "A sophisticated dinner bringing **fermented goodness** to your plate. **Miso** is a great way to support gut health in the evening.",
              "Miso provides **live probiotics** for a healthy microbiome. **Bok choy** belongs to the cruciferous family, providing **glucosinolates** that support your natural antioxidant systems."
          )
        },
        { 
          title: 'Anti-Inflammatory Veggie Stew', benefit: 'Microbiome Diversity', 
          ingredients: ['1/2 aubergine', '200g tomatoes', '100g chickpeas', 'Garlic', 'Olive oil'], 
          instructions: ['Sauté aubergine/garlic.', 'Add tomatoes/chickpeas.', 'Simmer 20 mins.'],
          description: createDesc(
              "A hearty stew allowing flavors to meld. Rich in **fiber** and diverse plant compounds that feed the immune system.",
              "**Aubergine** contains **nasunin**, a potent antioxidant in the purple skin that protects cell membranes. Slow cooking makes the **fiber** very easy for the gut to handle."
          )
        }
    ],
    perimenopause: [
      { 
        title: 'Maca & Berry Smoothie', benefit: 'Hot Flush Relief', 
        ingredients: ['1 tbsp maca powder', '75g blueberries', '1/2 cucumber', '1 tbsp flaxseeds', '240ml almond milk'], 
        instructions: ['Combine and blend.', 'The cucumber provides a cooling effect.'],
        description: createDesc(
            "A cooling smoothie designed to **stabilize energy levels** and ease hormonal shifts. It targets the 'internal heat' felt during perimenopause.",
            "**Maca** is a powerful **adaptogen** that supports the endocrine system. **Cucumber** provides deep cellular hydration and acts as a **natural cooling agent** to counter hot flushes."
        )
      },
      { 
        title: 'Phytoestrogen Salad', benefit: 'Oestrogen Balancing', 
        ingredients: ['100g edamame', 'Handful mixed greens', '30g pumpkin seeds', '1/2 avocado', 'Tahini dressing'], 
        instructions: ['Steam edamame.', 'Toss with greens and seeds.', 'Top with avocado and tahini.'],
        description: createDesc(
            "A nutrient-rich salad providing **plant-based estrogens** to gently support hormonal harmony during transitions.",
            "**Edamame** contains **isoflavones**, a type of phytoestrogen that can modulate the effects of estrogen in the body, smoothing out hormonal fluctuations."
        )
      },
      { 
        title: 'Tofu & Broccoli Stir-Fry', benefit: 'Bone Density', 
        ingredients: ['150g firm tofu', '100g broccoli', '1 tbsp sesame oil', '1 tsp ginger', '1 tbsp tamari'], 
        instructions: ['Pan-fry tofu.', 'Add ginger and broccoli.', 'Stir-fry 4 mins.'],
        description: createDesc(
            "Focus on bone-strengthening **minerals** and **plant protein**. This meal is essential as natural estrogen levels decline.",
            "**Tofu** is a rich source of **calcium and phytoestrogens**. **Broccoli** provides **Vitamin K**, which is essential for maintaining bone mineral density."
        )
      },
      { 
        title: 'Sage & Pumpkin Seed Chicken', benefit: 'Night Sweat Reduction', 
        ingredients: ['150g chicken breast', '1 tbsp fresh sage', '30g pumpkin seeds', '1 tbsp olive oil'], 
        instructions: ['Coat chicken in oil/sage/seeds.', 'Bake at 200°C for 25 mins.'],
        description: createDesc(
            "A grounding dinner utilizing the properties of **sage**. It is specifically targeted at temperature regulation.",
            "**Sage** has been used traditionally for centuries to manage **excessive sweating**. **Pumpkin seeds** provide **magnesium**, which calms the nervous system for better rest."
        )
      }
    ],
    endometriosis: [
      { 
        title: 'Turmeric Ginger Broth', benefit: 'Pelvic Relief', 
        ingredients: ['400ml broth', '1 tbsp fresh ginger', '1 tsp turmeric', '1 clove garlic', 'Handful spinach'], 
        instructions: ['Simmer broth with spices for 15 mins.', 'Stir in spinach.'],
        description: createDesc(
            "Liquid medicine for the body. Floods the **pelvic area** with warmth and potent **anti-pain nutrients** to manage discomfort naturally.",
            "The combination of high-dose **ginger and turmeric** specifically targets **prostaglandin production**—the chemical messengers responsible for triggering pelvic pain."
        )
      },
      { 
        title: 'Omega-3 Sardine Smash', benefit: 'Pain Management', 
        ingredients: ['1 tin sardines', '1/2 avocado', '1 slice sourdough', 'Lemon'], 
        instructions: ['Mash sardines and avocado.', 'Add lemon juice.', 'Serve on toast.'],
        description: createDesc(
            "A high-impact meal for pain management. The sheer density of **Omega-3s** is designed to actively block pain pathways.",
            "**Sardines** provide an extremely high **Omega-3 to Omega-6 ratio**, which is critical for lowering the overall inflammatory load in the reproductive system."
        )
      },
      { 
        title: 'Warm Lentil Detox', benefit: 'Excess Oestrogen Removal', 
        ingredients: ['100g cooked lentils', '1 beetroot', 'Handful rocket', 'ACV dressing'], 
        instructions: ['Warm lentils.', 'Mix with roasted beetroot.', 'Dress with apple cider vinegar.'],
        description: createDesc(
            "Fiber is key for managing endometriosis. This meal supports the **liver and gut** in removing excess hormones.",
            "Excess estrogen can drive tissue growth. The **fiber** in lentils and **betalains** in beetroot support the body's natural elimination pathways to maintain balance."
        )
      },
      { 
        title: 'Wild Salmon & Asparagus', benefit: 'Anti-Bloating', 
        ingredients: ['1 salmon fillet', '100g asparagus', '1 tbsp olive oil', '1/2 lemon'], 
        instructions: ['Bake salmon and asparagus for 15 mins.', 'Asparagus is a natural diuretic.'],
        description: createDesc(
            "A clean meal targeting **'endo belly' bloating** and providing essential fats needed for **cellular repair** and tissue health.",
            "**Asparagus** contains **asparagine**, an amino acid acting as a natural diuretic to help shed excess fluid. **Salmon** provides the **Omega-3s** needed to reduce internal scarring."
        )
      }
    ],
    hormones: [
      { 
        title: 'Seed Cycling Smoothie', benefit: 'Cycle Phase Support', 
        ingredients: ['1 tbsp seeds (phase correct)', '1/2 banana', 'Handful spinach', '240ml oat milk'], 
        instructions: ['Select correct seeds.', 'Blend until smooth.'],
        description: createDesc(
            "A rhythmic approach to nutrition. By **rotating seed intake** with your cycle, you provide the minerals your body needs most each month.",
            "**Flax and pumpkin seeds** provide zinc and lignans for the **follicular phase**, while **sesame and sunflower seeds** provide Vitamin E for the **luteal phase**."
        )
      },
      { 
        title: 'Cruciferous Crunch', benefit: 'Oestrogen Detox', 
        ingredients: ['100g kale', '50g red cabbage', '30g walnuts', 'Lemon dressing'], 
        instructions: ['Massage kale/cabbage with dressing.', 'Top with walnuts.'],
        description: createDesc(
            "Raw cruciferous vegetables require 'massage' to release benefits. This salad is a masterclass in **hormonal detoxification**.",
            "Cruciferous vegetables contain **Indole-3-Carbinol (I3C)**, which converts to **DIM**. DIM helps the liver metabolize estrogen into its most beneficial, non-inflammatory forms."
        )
      },
      { 
        title: 'Walnut Crusted Cod', benefit: 'Omega 3/6 Ratio', 
        ingredients: ['150g cod fillet', '1 tbsp hemp hearts', '1 tbsp walnuts', '1 tsp Dijon'], 
        instructions: ['Spread mustard over cod.', 'Press nut mix onto cod.', 'Bake 15 mins at 180°C.'],
        description: createDesc(
            "A sophisticated dinner ensuring a **balanced ratio** of essential fatty acids to support brain and hormone health.",
            "**Cod** is a very lean, low-toxin protein. The **walnut and hemp crust** provides plant-based fats that act as vital precursors to hormone production."
        )
      },
      { 
        title: 'Sweet Potato Balancer', benefit: 'Progesterone Support', 
        ingredients: ['1 medium sweet potato', '2 tbsp tahini', '1 tsp cinnamon', 'Handful spinach'], 
        instructions: ['Bake potato until soft.', 'Fill with steamed spinach.', 'Drizzle with tahini.'],
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