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
  Home,
  Pill,
  AlertTriangle,
  Clock,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

// --- DECORATIVE COMPONENTS ---
const BotanicalIcon = () => (
  <svg className="absolute top-0 right-0 w-32 h-32 text-white/5 pointer-events-none transform translate-x-8 -translate-y-8 rotate-12" viewBox="0 0 100 100" fill="currentColor">
    <path d="M50 10c-5 10-15 15-25 15s-10 15-5 25c5 10 15 5 25 5s20 15 25 5c5-10 0-25-5-25s-10-5-15-25z" opacity="0.5" />
    <path d="M70 40c-10 0-15 10-25 10s-10 15-10 25c0 10 15 10 25 10s15-10 20-25c5-15-5-20-10-20z" opacity="0.3" />
  </svg>
);

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const scrollContainerRef = useRef(null);

  // --- SEO & SOCIAL ENGINE ---
  useEffect(() => {
    const siteTitle = "The Kitchen Hub | Eat to Heal";
    const defaultImage = "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&h=630&fit=crop";
    const defaultDesc = "Deep-dive functional nutrition protocols designed to target systemic inflammation and chronic pain.";

    if (selectedRecipe) {
      updateMetaTags(`${selectedRecipe.title} | Profile`, selectedRecipe.benefit, defaultImage);
      injectRecipeSchema(selectedRecipe);
    } else if (activeTab === 'home') {
      updateMetaTags(siteTitle, defaultDesc, defaultImage);
      removeSchema();
    } else {
      const category = allCategories.find(c => c.id === activeTab);
      updateMetaTags(`${category?.name || activeTab} | The Kitchen Hub`, defaultDesc, category?.image || defaultImage);
      removeSchema();
    }
  }, [activeTab, selectedRecipe]);

  const updateMetaTags = (title, desc, image) => {
    document.title = title;
    const setMeta = (attr, value, isProperty = false) => {
      const selector = isProperty ? `meta[property="${attr}"]` : `meta[name="${attr}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', attr); else el.name = attr;
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };
    setMeta('description', desc);
    setMeta('og:title', title, true);
    setMeta('og:description', desc, true);
    setMeta('og:image', image, true);
  };

  const injectRecipeSchema = (item) => {
    removeSchema();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'recipe-schema';
    const schemaData = {
      "@context": "https://schema.org/",
      "@type": activeTab === 'supplements' ? "Thing" : "Recipe",
      "name": item.title,
      "description": item.benefit,
      "author": { "@type": "Organization", "name": "The Kitchen Hub" }
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
    { id: 'smoothies', name: 'Drinks', icon: <Droplets className="w-6 h-6" />, image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800&h=1200' },
    { id: 'breakfast', name: 'Breakfast', icon: <Coffee className="w-6 h-6" />, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800&h=1200' },
    { id: 'lunch', name: 'Lunch', icon: <Sun className="w-6 h-6" />, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800&h=1200' },
    { id: 'dinner', name: 'Dinner', icon: <Moon className="w-6 h-6" />, image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=1200' }
  ];

  const specialCategories = [
    { id: 'perimenopause', name: 'Perimenopause', icon: <Activity className="w-5 h-5" /> },
    { id: 'endometriosis', name: 'Endometriosis', icon: <Activity className="w-5 h-5" /> },
    { id: 'hormones', name: 'Hormones', icon: <Activity className="w-5 h-5" /> },
    { id: 'supplements', name: 'Supplements', icon: <Pill className="w-5 h-5" /> }
  ];

  const allCategories = [...mainCategories, ...specialCategories];

  const masterIngredientsData = [
    { title: "🍎 Fruits & Berries", items: ['Organic Blueberries', 'Raspberries', 'Ripe Avocado', 'Fresh Lemon & Lime', 'Ripe Papaya', 'Frozen Pineapple', 'Tart Montmorency Cherries'] },
    { title: "🥦 Vegetables & Greens", items: ['Fresh Baby Spinach', 'Wild Rocket', 'Tuscan Kale', 'Raw Beetroot', 'Orange Sweet Potato', 'Broccoli Florets', 'Asparagus Spears', 'Garlic', 'Fresh Ginger'] },
    { title: "🐟 Proteins", items: ['Wild-caught Salmon', 'Mackerel (in Olive Oil)', 'White Cod Fillets', 'Organic Turkey Breast', 'Free-range Eggs', 'Firm Sprouted Tofu'] },
    { title: "🫘 Pantry Staples", items: ['Jumbo Organic Rolled Oats', 'Quinoa (Red/White)', 'Red Split Lentils', 'Cooked Chickpeas', 'Sourdough', 'Dark Rye Bread'] },
    { title: "🌿 Boosters & Oils", items: ['Curcumin 95%', 'Organic Black Pepper', 'Chia Seeds', 'Ground Flaxseeds', 'Raw Hemp Hearts', 'Raw Walnut Halves', 'Extra Virgin Olive Oil', 'Aloe Vera Juice'] },
    { title: "💊 Functional Supplements", items: ['95% Curcuminoids (with Piperine)', 'EPA/DHA Distilled Fish Oil', 'Magnesium Glycinate (Chelated)', 'Boswellia Serrata Extract (65% Acids)'] }
  ];

  const createDesc = (why, science) => `### Why Your Body Loves This\n${why}\n\n### The Nutritional Science\n${science}`;

  const data = {
    smoothies: [
      { title: 'Golden Glow', time: '5m', tag: 'Immunity', benefit: 'NF-kB Molecule Inhibition', icon: <Zap />, ingredients: ['75g frozen pineapple chunks', '75g frozen mango chunks', '1 large handful fresh baby spinach', '1.5cm fresh ginger', '1/2 tsp ground turmeric', '1 tbsp black chia seeds', '240ml chilled coconut water'], instructions: ['Peel and grate ginger into a fine paste.', 'Place spinach and frozen fruit in blender.', 'Add turmeric, chia seeds, and pour in coconut water.', 'Blend on high for 60 seconds.', 'Serve immediately to retain maximal enzymatic activity.'], description: createDesc("The **natural bromelain** in pineapple helps your body **digest proteins** effectively and significantly **reduces internal swelling**.", "**Turmeric's curcumin** inhibits the **NF-kB molecule**, stopping chronic inflammation at the genomic level. Paired with **gingerol**, it creates a dual-action pathway to suppress pain.") },
      { title: 'Soothing Relief', time: '5m', tag: 'Digestion', benefit: 'Joint & Gut Mucosal Healing', icon: <Info />, ingredients: ['75g ripe papaya', '75g frozen strawberries', '2.5cm fresh ginger root', '60ml plain kefir', '1 tbsp hemp hearts', '180ml food-grade aloe vera juice'], instructions: ['Remove papaya seeds and cube the flesh.', 'Grate ginger root finely.', 'Combine all ingredients in the blender jar.', 'Blend on high speed until completely smooth.', 'Drink slowly to allow the aloe to coat the digestive tract.'], description: createDesc("Uses **aloe vera** and **papaya** to coat the stomach lining while delivering anti-pain nutrients to the joints.", "**Papain** assists protein breakdown and reduces gut inflammation. **Aloe juice** provides mucilage for **mucosal healing**, while ginger blocks pain signaling.") },
      { title: 'Radiant Elixir', time: '8m', tag: 'Beauty', benefit: 'Collagen Structure Protection', icon: <Sparkles />, ingredients: ['75g mixed organic berries', '1/4 ripe avocado', '1 handful spinach', '1 tbsp ground flaxseeds', '1/2 tsp cinnamon', '240ml chilled green tea'], instructions: ['Brew high-quality green tea in advance and chill.', 'Scoop avocado flesh directly into the blender.', 'Add berries, spinach, flax, and cinnamon.', 'Blend on high for 45 seconds until silky.'], description: createDesc("Healthy **monounsaturated fats** from avocado maintain the skin's **lipid barrier**, reducing redness.", "**Berries' anthocyanins** protect collagen from oxidative damage. **Green tea's EGCG** neutralizes free radicals that cause inflammatory breakouts.") },
      { title: 'Deep Sleep Dreamer', time: '10m', tag: 'Rest', benefit: 'HPA-Axis Stabilization', icon: <Moon />, ingredients: ['75g tart cherries', '1/2 small banana', '30g raw walnut halves', '1 tbsp almond butter', 'Dash of cinnamon', '240ml chamomile tea'], instructions: ['Brew chamomile tea and allow it to cool completely.', 'Combine cherries, banana, walnuts, and almond butter.', 'Pour in tea and blend until the walnuts are smooth.', 'Drink 1-2 hours before bed for restorative sleep.'], description: createDesc("The combination of **magnesium** and **healthy fats** creates a steady blood sugar environment, assisting the switch to **rest-and-digest** mode.", "**Tart cherries** provide natural **melatonin** to regulate sleep. **Walnuts** provide ALA Omega-3s, and **chamomile's apigenin** binds brain receptors to reduce neuro-inflammation.") },
      { title: 'Matcha Green Giant', time: '5m', tag: 'Energy', benefit: 'Cognitive Neuro-Protection', icon: <Leaf />, ingredients: ['1 tsp matcha powder', '1 handful fresh baby spinach', '75g frozen pineapple', '1 tbsp hemp hearts', '240ml unsweetened almond milk'], instructions: ['Sift the matcha powder into the blender.', 'Add the spinach, frozen pineapple, and hemp hearts.', 'Blend on high speed until frothy and electric green.', 'Drink immediately for maximum antioxidant effect.'], description: createDesc("Provides a highly focused, **sustained energy lift**. It floods your cells with **chlorophyll**, a natural detoxifier, and **plant proteins**.", "**Matcha** contains a high concentration of **L-theanine**, an amino acid that promotes a state of **relaxed alertness**. This works with natural caffeine while **EGCG catechins** inhibit inflammatory markers in the brain.") },
      { title: 'Cherry Cacao Recovery', time: '5m', tag: 'Post-Gym', benefit: 'Metabolic Waste Clearance', icon: <Zap />, ingredients: ['75g frozen tart cherries', '1 tbsp raw cacao powder', '1/4 avocado', '240ml unsweetened oat milk'], instructions: ['Pit cherries if fresh.', 'Blend cherries, cacao, and avocado with oat milk.', 'Blend for 60 seconds until thick like chocolate mousse.', 'Consume within 30 mins of exercise for muscle repair.'], description: createDesc("**Magnesium** in cacao relaxes muscles, while **tart cherries** contain compounds that actively help your body **flush out metabolic waste**.", "**Raw cacao** is a flavonoid powerhouse that improves blood flow and reduces **oxidative stress** in muscle tissue.") },
      { title: 'Beetroot Blood Builder', time: '7m', tag: 'Detox', benefit: 'Nitric Oxide Circulation Boost', icon: <Activity />, ingredients: ['1 small cooked beetroot (plain)', '75g frozen raspberries', '1 tbsp ground flaxseeds', '240ml pure coconut water'], instructions: ['Ensure beetroot is plain and cooked (unpickled).', 'Quarter beetroot and blend with all ingredients.', 'Blend on high speed until jewel-toned magenta.', 'Perfect as a mid-morning tonic for improved circulation.'], description: createDesc("Beetroot is a master liver supporter. This earthy blend helps **improve oxygen delivery** to your muscles and provides a boost to liver **Phase 2 detoxification**.", "**Beets** contain **betalains**, potent antioxidants that support the liver. **Natural nitrates** in beetroot improve **cardiovascular circulation**.") },
      { title: 'Spiced Carrot Cake', time: '5m', tag: 'Balance', benefit: 'Insulin Sensitivity Support', icon: <Coffee />, ingredients: ['1 medium carrot', '2.5cm fresh ginger', '1/2 tsp ground cinnamon', '30g raw walnuts', '240ml almond milk'], instructions: ['Peel and finely chop carrot into small cubes.', 'Grate ginger to maximize anti-inflammatory release.', 'Add all to blender and blend for 90 seconds until smooth.'], description: createDesc("Stabilize your energy levels while enjoying classic flavors. This blend is rich in **fiber** and warming spices.", "**Cinnamon** improves **insulin sensitivity**, preventing the blood sugar spikes that trigger inflammation. **Carrots** provide **beta-carotene** (Vitamin A) for immune cell integrity.") }
    ],
    breakfast: [
      { title: 'Omega Oats', time: '5m Prep', tag: 'Gut-Friendly', benefit: 'Prebiotic Microbiome Support', ingredients: ['50g jumbo rolled oats', '1 tbsp chia seeds', '150ml almond milk', '50g blueberries', '20g walnuts'], instructions: ['Mix oats, seeds, and milk in a jar.', 'Stir well and refrigerate for 6 hours or overnight.', 'Top with fresh berries and walnuts before serving.'], description: createDesc("A zero-effort breakfast that acts as a **prebiotic feast** for your gut microbiome. High **Omega-3 content** from walnuts ensures brain fuel.", "The **beta-glucan fiber** in jumbo oats feeds beneficial gut bacteria. A **healthy microbiome** prevents the 'leaky gut' issues that lead to **systemic inflammation**.") },
      { title: 'Turmeric Eggs', time: '10m', tag: 'High Protein', benefit: 'COX-2 Enzyme Inhibition', ingredients: ['2 large eggs', '1/2 tsp turmeric', 'Pinch black pepper', 'Handful spinach', '1 slice sourdough'], instructions: ['Whisk the eggs with turmeric and black pepper—the pepper is vital for turmeric absorption.', 'Heat oil in pan over medium heat.', 'Scramble gently, adding spinach at the end to wilt.', 'Serve on warm toast for a protein-dense start.'], description: createDesc("Savory start utilizing **turmeric**, the world's most studied anti-inflammatory spice. The addition of **black pepper** is the 'master key' to this meal.", "**Curcumin** bioavailability is increased by **2,000%** by piperine in black pepper, allowing it to block inflammatory enzymes like **COX-2**, which cause swelling.") },
      { title: 'Berry Chia Pot', time: '30m', tag: 'Anti-Bloat', benefit: 'ALA Omega-3 Support', ingredients: ['3 tbsp chia seeds', '200ml coconut milk', '1/2 tsp vanilla', '75g raspberries', '1 tbsp hemp hearts'], instructions: ['Mix the chia seeds, milk, and vanilla in a bowl.', 'Wait 5 minutes then whisk again vigorously to remove any lumps.', 'Chill in the fridge for at least 30 minutes until set.', 'Serve topped with raspberries and hemp hearts.'], description: createDesc("A cooling, pudding-like breakfast that is **incredibly gentle** on the digestive tract. Perfect for those who struggle with morning bloating.", "**Chia seeds** provide **Alpha-Linolenic Acid (ALA)**, reducing **C-reactive protein** levels. Anthocyanins in berries provide broad **cellular protection** against free radicals.") },
      { title: 'Smashed Avocado', time: '5m', tag: 'Heart Health', benefit: 'Oleic Acid Cardio-Protection', ingredients: ['1/2 avocado', '1 slice sourdough', '1 tbsp pumpkin seeds', 'Lemon juice', 'Olive oil'], instructions: ['Toast your bread until golden.', 'Mash the avocado flesh with the lemon juice and a tiny pinch of salt.', 'Spread thickly over the toast.', 'Top with pumpkin seeds and a light drizzle of oil.'], description: createDesc("A nutritional masterpiece. The combination of **monounsaturated fats** and **zinc-rich seeds** creates a shield for your heart.", "**Oleic acid** found in avocado significantly reduces inflammatory markers. **Zinc** in pumpkin seeds is vital for the development and function of **T-cells** and neutrophils.") },
      { title: 'Green Shakshuka', time: '12m', tag: 'Alkalizing', benefit: 'Vitamin K Bone Support', ingredients: ['2 eggs', '1 large handful kale', '1 handful spinach', '1/2 avocado', '1/2 tsp ground cumin'], instructions: ['Sauté chopped kale and spinach with cumin until soft.', 'Make two small wells in the greens and crack an egg into each.', 'Cover and cook on low for 4-5 minutes until set.', 'Serve with sliced avocado.'], description: createDesc("Vibrant and low-carb. Leafy greens provide minerals for deep cellular repair.", "**Vitamin K** and **chlorophyll** help alkalize the body and reduce oxidative stress. Healthy fats in avocado increase iron bioavailability from the greens.") },
      { title: 'Sweet Potato Toast', time: '15m', tag: 'Gluten-Free', benefit: 'Beta-Carotene Barrier Repair', ingredients: ['2 sweet potato slices (1cm)', '2 tbsp almond butter', '1/2 banana', '1 tsp chia seeds'], instructions: ['Toast potato slices 2-3 times on high until tender.', 'Spread with almond butter.', 'Top with banana and chia seeds.', 'Grounding fuel source.'], description: createDesc("Whole-food alternative to bread. Provides a steady release of energy and a massive dose of **Vitamin A** for tissue health.", "The **low glycemic index** of sweet potatoes prevents the insulin spikes that cause inflammation. They are also rich in **beta-carotene**, which protects mucosal barriers.") },
      { title: 'Indulgent Pancakes', time: '15m', tag: 'Grain-Free', benefit: 'Rutin Bioflavonoid Support', ingredients: ['50g buckwheat flour', '1 egg', '100ml almond milk', '50g blueberries', '1/2 tsp cinnamon'], instructions: ['Whisk the flour, egg, and milk into a smooth batter.', 'Gently fold in fresh blueberries.', 'Cook small circles in a pan over medium heat.', 'Flip when bubbles form on the surface.'], description: createDesc("Indulge without inflammatory refined flour. Buckwheat is a nutrient-dense seed, not a grain.", "**Buckwheat** contains **rutin**, which strengthens blood vessels and has potent anti-inflammatory effects. Blueberries provide stable antioxidants.") },
      { title: 'Salmon Frittata', time: '12m', tag: 'Brain Fuel', benefit: 'DHA/EPA Neuro-Optimization', ingredients: ['3 eggs', '50g smoked salmon', '50g asparagus', '1 tbsp fresh dill'], instructions: ['Whisk eggs and dill together.', 'Lightly sauté the asparagus tips in an oven-proof pan for 3 minutes.', 'Add eggs and layer salmon on top.', 'Cook 2 mins, then finish under grill until set.'], description: createDesc("High-protein breakfast that fuels the brain and keeps **joints lubricated** for the day ahead.", "Oily fish provides **DHA and EPA**, essential for reducing **neuro-inflammation**. **Asparagus** acts as a gentle diuretic to flush toxins.") }
    ],
    lunch: [
      { title: 'Quinoa Beet Salad', time: '15m', tag: 'Detox', benefit: 'Liver Phase 2 Detoxification', ingredients: ['100g quinoa', '1 beetroot', '1/2 avocado', 'Rocket'], instructions: ['Toss rocket with cooled quinoa.', 'Add beetroot wedges.', 'Dress with lemon-ginger oil.', 'Top with avocado slices.'], description: createDesc("Supports the liver's filtering ability using a broad spectrum of **protective phytonutrients**.", "**Betalains** in beetroot neutralize pro-inflammatory substances before they enter circulation.") },
      { title: 'Red Lentil Soup', time: '25m', tag: 'Digestive', benefit: 'Soluble Fiber Toxin Binding', ingredients: ['100g red lentils', '400ml veg stock', '2.5cm ginger', '1 tsp turmeric'], instructions: ['Rinse lentils thoroughly.', 'Simmer with stock and spices for 20 mins.', 'Stick-blend until creamy for easier digestion.'], description: createDesc("Grounding and soothing for the gut. Formulated for sensitive digestive tracks.", "**Gingerol** speeds gastric emptying, preventing inflammatory food particles from lingering.") },
      { title: 'Mackerel on Rye', time: '5m', tag: 'High Omega-3', benefit: 'Resolvin Production', ingredients: ['1 mackerel fillet', '2 slices rye bread', 'Rocket', '1 tsp ACV'], instructions: ['Toast rye.', 'Flake mackerel on top.', 'Toss rocket with ACV and pile over fish.'], description: createDesc("One of the most potent meals for targeting **systemic pain**.", "Omega-3s compete with pro-inflammatory Omega-6s to produce **resolvins**, which actively shut down inflammation.") },
      { title: 'Hummus & Veg Wrap', time: '10m', tag: 'Plant-Based', benefit: 'Diversity Microbiome Fuel', ingredients: ['1 wrap', '2 tbsp hummus', '100g roasted veg', 'Spinach'], instructions: ['Spread hummus thickly on wrap.', 'Layer roasted veg and spinach.', 'Fold and roll tightly.'], description: createDesc("Increases plant diversity to feed the immune system with fiber and healthy fats.", "Chickpeas provide protein and fiber to **stabilize blood sugar**, preventing the insulin spikes that drive chronic inflammation.") },
      { title: 'Sardine & Bean Salad', time: '8m', tag: 'Bone Health', benefit: 'Vitamin D Immune Modulation', ingredients: ['1 tin sardines', '100g cannellini beans', 'Lemon', 'Parsley'], instructions: ['Mix beans, parsley, and lemon.', 'Top with sardines.', 'Use sardine oil as part of the dressing.'], description: createDesc("Pantry staple rich in **Calcium and Omega-3s** for skeleton support.", "Sardines are a rare natural source of **Vitamin D**, essential for modulating immune response and reducing autoimmune flare-ups.") },
      { title: 'Cauliflower Bowl', time: '12m', tag: 'Low-Carb', benefit: 'Nrf2 Pathway Activation', ingredients: ['150g cauliflower rice', '30g walnuts', '2 tbsp pomegranate', 'Spinach'], instructions: ['Sauté cauliflower rice with turmeric.', 'Stir in spinach.', 'Top with walnuts and pomegranate.'], description: createDesc("Low-carb cleanse that mimics rice texture without the glycemic load.", "**Sulforaphane** in cauliflower activates the **Nrf2 pathway**—the most powerful internal antioxidant system.") },
      { title: 'Sweet Potato Soup', time: '20m', tag: 'Heart', benefit: 'Soluble Fiber Clearing', ingredients: ['1 medium sweet potato', '100g black beans', 'Veg stock', 'Cumin'], instructions: ['Simmer potato in stock for 15 mins.', 'Add black beans.', 'Blend half for texture.'], description: createDesc("Fiber-rich soup that supports heart health and fluid balance.", "Black beans bind to inflammatory cholesterol. **Potassium** in sweet potatoes helps regulate fluid balance.") },
      { title: 'Green Goddess Wrap', time: '12m', tag: 'High Protein', benefit: 'COX Enzyme Suppression', ingredients: ['1 wrap', '100g chicken', '1/2 avocado', 'Basil'], instructions: ['Blend avocado and basil for dressing.', 'Shred chicken and mix.', 'Roll into wrap.'], description: createDesc("Herb-forward lunch using basil as a natural inflammation fighter.", "**Eugenol** in fresh basil has been shown to inhibit the **COX enzyme**, similar to anti-inflammatory meds.") }
    ],
    dinner: [
      { title: 'Baked Salmon', time: '25m', tag: 'Repair', benefit: 'Pro-Resolving Mediator Precursor', ingredients: ['1 salmon fillet', '1 sweet potato', '100g broccoli', 'Lemon'], instructions: ['Bake potato wedges for 10 mins at 200C.', 'Add salmon and broccoli.', 'Bake 15 mins more.', 'Drizzle with lemon.'], description: createDesc("The gold-standard anti-inflammatory dinner. Provides the ideal balance of **Omega-3s** and fiber for systemic repair.", "**EPA/DHA** in salmon are fundamental building blocks for signaling molecules that actively tell your immune system to switch into repair mode.") },
      { title: 'Sunshine Curry', time: '20m', tag: 'Relief', benefit: 'Synergistic Relief Pathway', ingredients: ['200g chickpeas', '100ml coconut milk', 'Turmeric/Ginger', 'Spinach'], instructions: ['Sauté ginger and turmeric.', 'Add chickpeas and coconut milk.', 'Simmer 15 mins.', 'Stir in spinach.'], description: createDesc("Mild curry that uses multiple spices to lower systemic inflammation.", "The combination of **turmeric and ginger** creates a 'synergistic effect', significantly enhancing their effectiveness.") },
      { title: 'Ginger Stir-fry', time: '15m', tag: 'Muscle Pain', benefit: 'Leukotriene Suppression', ingredients: ['150g turkey', '100g veg', '2.5cm ginger', 'Tamari'], instructions: ['Stir-fry turkey with garlic and ginger.', 'Add veg and toss 4 mins.', 'Season with tamari.'], description: createDesc("Utilizes large amounts of **fresh ginger** to target **joint and muscle pain** directly.", "Ginger acts as a natural pain reliever by **suppressing leukotrienes**—inflammatory molecules causing swelling.") },
      { title: 'Garlic Parsley Cod', time: '18m', tag: 'Immunity', benefit: 'Allicin Antimicrobial Action', ingredients: ['150g cod', '1 clove garlic', '1 tbsp parsley', '100g baby potatoes'], instructions: ['Place cod on foil with garlic and parsley.', 'Wrap and bake 15 mins.', 'Serve with boiled potatoes.'], description: createDesc("A light evening meal easy on the digestive system with a potent antimicrobial punch.", "**Allicin** in garlic supports immunity by stimulating white blood cells. **Parsley** is highly alkalizing.") },
      { title: 'Lemon Chicken', time: '30m', tag: 'Workout', benefit: 'Collagen Synthesis Support', ingredients: ['150g chicken', '1/2 lemon', '1 tsp turmeric', '1 courgette'], instructions: ['Marinate chicken in lemon and turmeric.', 'Roast at 200C for 25 mins with courgettes.', 'Serve hot.'], description: createDesc("Focuses on repairing connective tissues after physical activity using Vitamin C and curcumin.", "**Vitamin C** from fresh lemon assists in **collagen synthesis**, aiding the repair of tendons after exercise.") },
      { title: 'Lentil Bolognese', time: '25m', tag: 'Cellular', benefit: 'Bioavailable Lycopene Shield', ingredients: ['100g lentils', '50g walnuts', '200g tomatoes', '1 courgette'], instructions: ['Sauté garlic and lentils.', 'Add crushed walnuts and tomatoes.', 'Simmer 15 mins.', 'Serve over zoodles.'], description: createDesc("Plant-based classic rich in folate for DNA synthesis and cellular repair.", "**Lycopene** in tomatoes becomes more bioavailable when cooked, shielding against oxidative stress.") },
      { title: 'Miso Black Cod', time: '20m', tag: 'Gut-Health', benefit: 'Probiotic Microbiome Support', ingredients: ['150g cod', '1 tbsp miso', '1 tsp ginger', '100g bok choy'], instructions: ['Glaze cod with miso and ginger.', 'Bake 15 mins.', 'Serve with steamed bok choy.'], description: createDesc("Sophisticated dinner bringing **fermented goodness** and probiotics to your microbiome.", "**Miso** provides beneficial bacteria while **bok choy** supports your natural antioxidant systems.") },
      { title: 'Veggie Stew', time: '30m', tag: 'Systemic', benefit: 'Nasunin Cell Protection', ingredients: ['1/2 aubergine', '200g tomatoes', '100g chickpeas', 'Garlic'], instructions: ['Sauté aubergine until soft.', 'Simmer with tomatoes and chickpeas for 20 mins.', 'Serve with rye bread.'], description: createDesc("Hearty stew where the anti-inflammatory flavors meld together to feed the immune system.", "**Aubergine** contains **nasunin**, an antioxidant in the purple skin that protects cell membranes.") }
    ],
    perimenopause: [
      { title: 'Maca Smoothie', time: '5m', tag: 'Hormonal', benefit: 'Endocrine System Balancing', ingredients: ['1 tbsp maca powder', '75g blueberries', '1/2 cucumber', '1 tbsp flax'], instructions: ['Peel cucumber.', 'Blend with all items on high.', 'The cucumber provides cooling thermal relief.'], description: createDesc("Designed to stabilize energy levels and target internal heat felt during shifts.", "**Maca adaptogen** supports the endocrine system to help balance fluctuating estrogen levels during transition.") },
      { title: 'Phytoestrogen Salad', time: '10m', tag: 'Oestrogen', benefit: 'Natural Isoflavone Support', ingredients: ['100g edamame', 'Mixed greens', '30g pumpkin seeds', 'Avocado'], instructions: ['Steam edamame for 4 mins.', 'Toss with greens and seeds.', 'Top with avocado and tahini.'], description: createDesc("Nutrient-rich salad providing natural plant-based estrogens to support harmony.", "**Isoflavones** in edamame mimic or modulate the effects of estrogen, smoothing fluctuations.") },
      { title: 'Tofu Stir-fry', time: '15m', tag: 'Mineral', benefit: 'Phyto-Nutrient Bone Protection', ingredients: ['150g tofu', '100g broccoli', 'Sesame oil', 'Ginger'], instructions: ['Pan-fry tofu until golden.', 'Add ginger and broccoli.', 'Steam with a splash of water.'], description: createDesc("Focus on bone-strengthening minerals crucial during estrogen decline.", "**Tofu and broccoli** provide high doses of **calcium and Vitamin K** for density.") },
      { title: 'Sage Chicken', time: '25m', tag: 'Cooling', benefit: 'Hyperhidrosis Management', ingredients: ['150g chicken', '1 tbsp sage', '30g pumpkin seeds', 'Olive oil'], instructions: ['Coat chicken in oil/sage/seeds.', 'Bake at 200C for 25 mins.', 'Serve with greens.'], description: createDesc("Grounding dinner using sage for temperature regulation.", "**Sage** is a traditional remedy recognized for reducing hot flushes and night sweats.") }
    ],
    endometriosis: [
      { title: 'Turmeric Broth', time: '15m', tag: 'Pelvic Pain', benefit: 'Prostaglandin Synthesis Blockade', ingredients: ['400ml bone broth', '1 tbsp ginger', '1 tsp turmeric', 'Garlic'], instructions: ['Simmer broth with spices for 15 mins.', 'Add spinach at end.', 'Sip while warm.'], description: createDesc("Floods the pelvic area with warmth and potent anti-pain nutrients to manage cyclic discomfort.", "Ginger and turmeric target **prostaglandin production**—the molecules responsible for pelvic pain.") },
      { title: 'Sardine Smash', time: '5m', tag: 'Pain', benefit: 'Pro-Resolving Mediator Dose', ingredients: ['1 tin sardines', '1/2 avocado', 'Sourdough', 'Lemon'], instructions: ['Mash sardines and avocado.', 'Spread on toast with lemon juice.', 'Season with black pepper.'], description: createDesc("High-impact meal designed to actively block pain pathways using Omega-3s.", "Sardines provide an extreme **Omega-3 to 6 ratio**, critical for lowering reproductive inflammation.") },
      { title: 'Lentil Detox', time: '10m', tag: 'Metabolic', benefit: 'Estrogen Clearance Pathways', ingredients: ['100g lentils', '1 beetroot', 'Rocket', 'ACV'], instructions: ['Warm cooked lentils.', 'Mix with roasted beetroot and rocket.', 'Dress with apple cider vinegar.'], description: createDesc("Fiber-rich meal designed to support the liver in removing excess estrogen.", "Fiber and **betalains** support natural elimination pathways to prevent recycling of hormones.") },
      { title: 'Salmon Asparagus', time: '18m', tag: 'Bloating', benefit: 'Diuretic Asparagine Action', ingredients: ['1 salmon fillet', '100g asparagus', 'Olive oil', 'Lemon'], instructions: ['Bake salmon and asparagus for 15 mins.', 'Drizzle with olive oil and lemon.'], description: createDesc("Targets 'endo belly' bloating while providing the essential fats needed for cellular repair.", "**Asparagine** in asparagus acts as a natural diuretic to shed excess fluid.") }
    ],
    hormones: [
      { title: 'Seed Smoothie', time: '5m', tag: 'Rhythm', benefit: 'Lignan Hormone Modulation', ingredients: ['1 tbsp seeds (phase correct)', '1/2 banana', 'Spinach', 'Oat milk'], instructions: ['Select correct seeds for current phase.', 'Blend until smooth.', 'Consume daily.'], description: createDesc("Provides the specific minerals and lignans your body needs most each month.", "**Flax/Pumpkin** (Follicular) or **Sesame/Sunflower** (Luteal) help modulate balance.") },
      { title: 'Cruciferous Crunch', time: '10m', tag: 'Detox', benefit: 'I3C & DIM Pathway Support', ingredients: ['100g kale', '50g red cabbage', '30g walnuts', 'Lemon'], instructions: ['Massage kale/cabbage with lemon and oil.', 'Top with walnuts.', 'Eat slowly.'], description: createDesc("A masterclass in hormonal detoxification through the liver.", "**Indole-3-Carbinol (I3C)** converts to **DIM**, which helps metabolize used estrogen.") },
      { title: 'Crusted Cod', time: '15m', tag: 'Lipids', benefit: 'Precursor Hormone Synthesis', ingredients: ['150g cod', '1 tbsp hemp hearts', '1 tbsp walnuts', 'Mustard'], instructions: ['Spread mustard over cod.', 'Press seed/nut mix on top.', 'Bake 15 mins at 180C.'], description: createDesc("Ensures a perfectly balanced fatty acid ratio for brain health and hormone production.", "Healthy fats in the crust act as vital **precursors** to steroid hormone production.") },
      { title: 'Sweet Potato Balancer', time: '45m', tag: 'Glycemic', benefit: 'HPA-Axis Glycemic Control', ingredients: ['1 sweet potato', '2 tbsp tahini', 'Cinnamon', 'Spinach'], instructions: ['Bake potato whole until soft.', 'Fill with steamed spinach.', 'Drizzle with tahini.'], description: createDesc("A grounding meal beneficial in the second half of your cycle.", "**Complex carbohydrates** prevent the dips that cause mood swings and cravings.") }
    ],
    supplements: [
      { 
        title: 'Curcumin 95%', time: 'Daily', tag: 'Clinical', benefit: 'NF-kB Master Switch Block', icon: <Zap />, 
        ingredients: ['95% Standardized Curcuminoids', 'Piperine Extract'], 
        instructions: ['Take 500mg-1000mg with a meal containing fats.', 'Ensure your brand contains piperine to increase absorption.'],
        description: createDesc(
          "Concentrated dose of the world's most studied natural anti-inflammatory, impossible to get from the spice alone.",
          "Inhibits the **NF-kB molecule**, the 'master switch' for cellular inflammation, preventing **pro-inflammatory cytokine** overproduction."
        )
      },
      { 
        title: 'Omega-3 EPA/DHA', time: 'Daily', tag: 'Clinical', benefit: 'Inflammation Resolution', icon: <Droplets />, 
        ingredients: ['High-potency Fish Oil', 'EPA & DHA'], 
        instructions: ['Take daily with largest meal.', 'Keep refrigerated to prevent oxidation.'],
        description: createDesc(
          "Your body requires **EPA and DHA** to effectively shut down inflammatory pathways; these are the blocks for **resolvins**.",
          "Omega-3s actively produce specialized pro-resolving mediators (SPMs) that **'resolve' inflammation**, signaling your immune system to start cellular repair."
        )
      },
      { 
        title: 'Magnesium Glycinate', time: 'Daily', tag: 'Clinical', benefit: 'CRP & Cortisol Reduction', icon: <Moon />, 
        ingredients: ['Chelated Magnesium Glycinate'], 
        instructions: ['Take 200mg-400mg 1 hour before bed.', 'Highly bioavailable form.'],
        description: createDesc(
          "Critical mineral that over 50% of the population is deficient in, acting as a **natural relaxant**.",
          "Low magnesium is linked to increased **C-reactive protein (CRP)**. Magnesium glycinate helps lower CRP while stabilizing the **HPA axis**."
        )
      },
      { 
        title: 'Boswellia Serrata', time: 'Daily', tag: 'Clinical', benefit: '5-LOX Pathway Inhibition', icon: <Activity />, 
        ingredients: ['Standardized Boswellia Extract'], 
        instructions: ['Take 300mg - 500mg twice daily with food.', 'Look for extracts containing AKBA.'],
        description: createDesc(
          "Ancient botanical used for centuries to treat chronic inflammation, specifically in the **joints and digestive tract**.",
          "Specifically inhibits the **5-LOX pathway**, preventing production of **leukotrienes** responsible for chronic pain and asthma."
        )
      }
    ]
  };

  const handleCopy = (ingredients, title) => {
    let textToCopy = "";
    if (Array.isArray(ingredients)) {
      textToCopy = `Details for ${title}:\n` + ingredients.map(i => `- ${i}`).join('\n');
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
      const scrollAmount = window.innerWidth * 0.7;
      scrollContainerRef.current.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => { window.scrollTo(0, 0); }, [activeTab, selectedRecipe]);

  return (
    <div className="min-h-screen relative font-body text-[#1a1a1a] overflow-x-hidden selection:bg-[#f28d35]/30 flex flex-col">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        :root { --font-heading: 'Plus Jakarta Sans', sans-serif; --font-body: 'Inter', sans-serif; }
        .font-heading { font-family: var(--font-heading); }
        .font-body { font-family: var(--font-body); }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f28d35; border-radius: 10px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-8px); } 100% { transform: translateY(0px); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        @keyframes subtle-glow { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
        .animate-subtle-glow { animation: subtle-glow 4s ease-in-out infinite; }
        @keyframes gentle-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-gentle-bounce { animation: gentle-bounce 3s ease-in-out infinite; }
      `}</style>

      {/* FIXED BACKGROUND */}
      <div className="fixed inset-0 z-[-1] h-[100dvh] w-full" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2000')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-[#e8e7e7]/70 backdrop-blur-[10px]"></div>
      </div>

      <nav className="sticky top-0 z-40 bg-transparent h-24 flex items-center">
        <div className="max-w-6xl mx-auto w-full px-6 flex items-center justify-between">
          <button onClick={() => { setActiveTab('home'); setSelectedRecipe(null); }} className="flex items-center space-x-3 text-[#1a1a1a] font-heading font-black text-2xl tracking-tighter uppercase transition-transform hover:scale-105">
            <div className="bg-[#1a1a1a] p-2 rounded-xl shadow-lg">
              <Leaf className="w-6 h-6 text-[#f28d35]" />
            </div>
            <span className="hidden sm:inline">The Kitchen Hub</span>
          </button>
          
          <div className="flex items-center space-x-3 sm:space-x-5">
             <button onClick={() => {setActiveTab('ingredients'); setSelectedRecipe(null);}} className="text-[#1a1a1a] hover:text-[#f28d35] transition-all duration-300 animate-gentle-bounce p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30" title="Ingredients Master List">
              <ShoppingBasket className="w-6 h-6" />
            </button>
            <button onClick={() => { setActiveTab('home'); setSelectedRecipe(null); }} className="text-[#1a1a1a] hover:text-[#f28d35] transition-all duration-300 animate-gentle-bounce p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30" title="Home">
              <Home className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-20 flex-grow w-full">
        {selectedRecipe ? (
          <div className="animate-in slide-in-from-right-12 duration-700 pt-10">
            <button onClick={() => setSelectedRecipe(null)} className="flex items-center space-x-3 text-[#1a1a1a] font-black uppercase tracking-widest text-[10px] mb-12 group">
              <div className="bg-white/40 p-2 rounded-full group-hover:bg-[#f28d35]/20 transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <span>Back to {activeTab}</span>
            </button>

            <header className="mb-16 border-l-[12px] border-[#f28d35] pl-6 md:pl-10">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <span className="bg-[#1a1a1a] text-[#f28d35] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedRecipe.tag || 'Functional'}</span>
                <span className="bg-white/50 text-[#1a1a1a]/60 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center"><Clock className="w-3 h-3 mr-2" />{selectedRecipe.time || '10m'}</span>
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-black text-[#1a1a1a] tracking-tighter font-heading leading-[0.85] mb-8">{selectedRecipe.title}</h2>
              <div className="flex items-center text-xs md:text-sm font-black uppercase tracking-widest text-[#1a1a1a] bg-[#f28d35] px-6 md:px-8 py-3 md:py-4 rounded-full w-fit font-heading shadow-2xl shadow-[#f28d35]/30">
                <ShieldCheck className="w-5 h-5 mr-3" /> {selectedRecipe.benefit}
              </div>
            </header>

            {activeTab === 'supplements' && (
              <div className="mb-10 p-6 bg-red-50 border-2 border-red-200 rounded-3xl flex items-start space-x-4 shadow-xl">
                <AlertTriangle className="w-10 h-10 text-red-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-red-800 font-black uppercase tracking-widest text-xs mb-1">Clinical Safety Notice</h4>
                  <p className="text-red-700 font-bold text-sm leading-relaxed">Concentrated supplements can interact with medications. Always consult with a qualified professional before starting a new protocol.</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
              <div className="lg:col-span-2">
                <div className="bg-white/60 backdrop-blur-3xl p-8 sm:p-10 md:p-16 rounded-[3rem] md:rounded-[4rem] border border-white shadow-2xl mb-12 md:mb-16 relative overflow-hidden">
                  <BotanicalIcon />
                  <div className="relative z-10">
                    {renderFormattedText(selectedRecipe.description)}
                  </div>
                </div>

                <div className="space-y-12 md:space-y-16">
                  <h4 className="text-[#1a1a1a] font-black uppercase text-xs tracking-[0.5em] flex items-center font-heading opacity-40">
                    {activeTab === 'supplements' ? <><Pill className="w-6 h-6 mr-4 text-[#f28d35]" /> PROTOCOL DOSAGE</> : <><Utensils className="w-6 h-6 mr-4 text-[#f28d35]" /> THE PREPARATION</>}
                  </h4>
                  <div className="space-y-10 md:space-y-12">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <div key={idx} className="flex space-x-6 md:space-x-10 group">
                        <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-[1.5rem] md:rounded-[2rem] bg-[#1a1a1a] text-[#f28d35] flex items-center justify-center font-black text-2xl md:text-3xl shadow-2xl transition-transform group-hover:scale-110">{idx + 1}</div>
                        <p className="text-[#1a1a1a] text-xl md:text-2xl leading-relaxed font-bold pt-1 font-body">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-1 sticky top-32">
                <div className="bg-white/40 p-8 sm:p-10 rounded-[3rem] md:rounded-[4rem] border border-white shadow-xl">
                  <div className="flex items-center justify-between mb-10">
                    <h4 className="text-[#1a1a1a] font-black uppercase text-xs tracking-[0.4em] font-heading opacity-40">{activeTab === 'supplements' ? 'COMPONENTS' : 'INGREDIENTS'}</h4>
                    <button onClick={() => handleCopy(selectedRecipe.ingredients, selectedRecipe.title)} className="bg-[#1a1a1a] text-[#f28d35] p-3 rounded-2xl hover:bg-[#252525] transition-all active:scale-90 shadow-xl" title="Copy List">
                      {copiedId === selectedRecipe.title ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <ul className="space-y-4">
                    {selectedRecipe.ingredients.map((ing, i) => (
                      <li key={i} className="text-[#1a1a1a] font-bold text-lg flex items-start p-2 hover:translate-x-2 transition-transform">
                        <div className="w-2.5 h-2.5 bg-[#f28d35] rounded-full mr-4 mt-2 flex-shrink-0"></div> {ing}
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
              <div className="animate-in fade-in zoom-in-95 duration-1000">
                <section className="flex flex-col items-center justify-center text-center pt-16 pb-16 md:pt-20 md:pb-20 px-4">
                  <div className="inline-flex items-center space-x-4 bg-[#1a1a1a] text-[#f28d35] px-6 md:px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-12 shadow-2xl animate-float">
                    <Sparkles className="w-4 h-4" /> <span className="hidden sm:inline">Functional Nutrition Hub</span><span className="sm:hidden">Nutrition Hub</span>
                  </div>
                  <h1 className="text-6xl sm:text-7xl md:text-[10rem] font-black text-[#1a1a1a] mb-8 md:mb-10 tracking-tighter font-heading leading-[0.8] mix-blend-multiply text-center">
                    Eat to <span className="text-[#f28d35] relative">Heal.</span>
                  </h1>
                  <p className="text-lg md:text-3xl text-[#1a1a1a] font-medium max-w-3xl mx-auto opacity-70 leading-relaxed font-body text-center px-4">
                    Science-backed recipes to dampen inflammation, reset hormones, and reclaim your vitality.
                  </p>
                </section>
                
                {/* CAROUSEL 1: MAIN CATEGORIES */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory hide-scrollbar gap-6 md:gap-8 px-2 md:px-0 pt-6 pb-12">
                  {mainCategories.map(cat => (
                    <button key={cat.id} onClick={() => setActiveTab(cat.id)} className="flex-shrink-0 w-[85vw] md:w-auto snap-center group relative bg-[#1a1a1a] rounded-[3rem] md:rounded-[4rem] shadow-2xl hover:shadow-[#f28d35]/30 transition-all border border-white/10 text-center overflow-hidden h-[28rem] md:h-[30rem] hover:-translate-y-2 md:hover:-translate-y-4 active:scale-95 duration-500">
                      <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-10 md:p-12 text-[#e8e7e7] flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-[#f28d35] rounded-3xl flex items-center justify-center mb-8 shadow-2xl transition-transform group-hover:rotate-12">
                          <div className="text-[#1a1a1a]">{cat.icon}</div>
                        </div>
                        <h2 className="font-black text-3xl md:text-4xl mb-2 font-heading tracking-tighter uppercase leading-none">{cat.name}</h2>
                        <p className="text-[#f28d35] text-[10px] font-black uppercase tracking-[0.3em] font-heading opacity-60">Digital Collection</p>
                      </div>
                    </button>
                  ))}
                </div>

                {/* CAROUSEL 2: SPECIAL CATEGORIES */}
                <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 snap-x snap-mandatory hide-scrollbar gap-4 md:gap-6 px-2 md:px-0 pt-4 pb-12">
                  {specialCategories.map(cat => (
                    <button 
                      key={cat.id} 
                      onClick={() => setActiveTab(cat.id)} 
                      className="flex-shrink-0 w-[85vw] md:w-auto snap-center flex items-center justify-center space-x-4 bg-white/20 backdrop-blur-2xl text-[#1a1a1a] h-20 md:h-24 rounded-[2.5rem] font-heading font-black tracking-[0.1em] text-[10px] md:text-xs hover:bg-[#1a1a1a] hover:text-[#f28d35] transition-all border border-white/40 shadow-xl hover:-translate-y-2 group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="text-[#f28d35] relative z-10">{cat.icon}</span>
                      <span className="uppercase relative z-10">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {activeTab !== 'home' && (
              <div className="animate-in fade-in slide-in-from-bottom-12 duration-700 pt-16 md:pt-24">
                <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 border-l-[10px] md:border-l-[12px] border-[#f28d35] pl-6 md:pl-10 mx-2 md:mx-0">
                  <div className="max-w-2xl">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className={`p-4 md:p-5 rounded-2xl md:rounded-3xl bg-[#1a1a1a] shadow-2xl text-[#f28d35]`}>{allCategories.find(c => c.id === activeTab)?.icon || <Utensils className="w-6 h-6" />}</div>
                      <span className="text-[#1a1a1a] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px] font-heading opacity-40 animate-pulse">{activeTab === 'supplements' ? 'Clinical Protocol' : 'Nutritional Medicine'}</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[8rem] font-black text-[#1a1a1a] capitalize tracking-tighter font-heading mb-6 leading-[0.9] md:leading-[0.8]">{activeTab}</h1>
                  </div>
                </header>

                {activeTab === 'ingredients' ? (
                  <article className="bg-white/40 backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] p-8 md:p-20 shadow-2xl border border-white mx-2 md:mx-0 relative overflow-hidden">
                    <BotanicalIcon />
                    <div className="absolute top-6 right-6 md:top-12 md:right-12">
                      <button onClick={() => handleCopy(masterIngredientsData, 'Master List')} className="bg-[#1a1a1a] text-[#f28d35] px-6 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-black text-[10px] md:text-xs uppercase tracking-widest shadow-2xl hover:bg-[#252525] transition-all flex items-center space-x-3 active:scale-95">
                        {copiedId === 'Master List' ? <Check className="w-4 h-4 md:w-5 md:h-5" /> : <Copy className="w-4 h-4 md:w-5 md:h-5" />}
                        <span className="hidden sm:inline">{copiedId === 'Master List' ? 'COPIED' : 'COPY ALL'}</span>
                      </button>
                    </div>
                    {masterIngredientsData.map((section, idx) => (
                      <div key={idx} className="mb-12 md:mb-16 last:mb-0 relative z-10 pt-4 md:pt-0">
                        <h2 className="text-xl md:text-2xl font-black text-[#1a1a1a] mb-8 md:mb-10 border-b-4 border-[#f28d35] pb-3 font-heading tracking-tighter inline-block uppercase">{section.title}</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                          {section.items.map((item, i) => (
                            <div key={i} className="flex items-center space-x-4 md:space-x-5 text-[#1a1a1a] bg-white/60 backdrop-blur-md p-5 md:p-6 rounded-2xl md:rounded-[2rem] border border-white shadow-sm hover:scale-105 transition-transform">
                              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#f28d35] shadow-sm flex-shrink-0 animate-subtle-glow"></div>
                              <span className="font-bold text-sm md:text-lg tracking-tight font-body">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </article>
                ) : (
                  <div className="relative group px-0 md:px-6 lg:px-8">
                    {/* ARROWS (Desktop only) safely inside the padding to prevent clipping */}
                    <button onClick={() => scrollCarousel('left')} className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white shadow-2xl rounded-full items-center justify-center text-[#1a1a1a] hover:bg-[#f28d35] hover:text-white border border-black/5 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"><ChevronLeft className="w-8 h-8" /></button>
                    <button onClick={() => scrollCarousel('right')} className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-16 h-16 bg-white shadow-2xl rounded-full items-center justify-center text-[#1a1a1a] hover:bg-[#f28d35] hover:text-white border border-black/5 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"><ChevronRight className="w-8 h-8" /></button>
                    
                    <div ref={scrollContainerRef} className="flex overflow-x-auto items-stretch snap-x snap-mandatory hide-scrollbar gap-6 md:gap-8 pt-6 pb-16 px-4 md:px-2 scroll-smooth">
                      {data[activeTab]?.map((item, idx) => (
                        <article key={idx} className="flex-shrink-0 w-[85vw] md:w-[500px] snap-center bg-[#1a1a1a] rounded-[3rem] md:rounded-[5rem] p-8 md:p-12 shadow-2xl border border-white/5 flex flex-col min-h-[40rem] md:min-h-[46rem] hover:-translate-y-2 md:hover:-translate-y-4 transition-transform duration-500 group/card relative overflow-hidden">
                          <BotanicalIcon />
                          <div className="absolute inset-0 bg-gradient-to-br from-[#f28d35]/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none"></div>
                          
                          <div className="flex flex-col mb-8 md:mb-10 relative z-10">
                            <div className="flex items-center space-x-3 mb-4">
                              <span className="text-[#f28d35] text-[10px] font-black uppercase tracking-[0.2em]">{item.tag || 'Functional'}</span>
                              <span className="w-1.5 h-1.5 bg-white/20 rounded-full"></span>
                              <span className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] flex items-center"><Clock className="w-3 h-3 mr-1" />{item.time || '10m'}</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-[#e8e7e7] leading-[0.9] font-heading tracking-tighter group-hover/card:text-[#f28d35] transition-colors pr-10">{item.title}</h2>
                          </div>
                          
                          <div className="relative z-10 flex items-center text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] bg-[#f28d35] px-5 py-2.5 md:px-6 md:py-3 rounded-full w-fit mb-10 md:mb-12 font-heading shadow-xl shadow-[#f28d35]/20">
                            {activeTab === 'supplements' ? <Pill className="w-4 h-4 mr-2.5 flex-shrink-0" /> : <ShieldCheck className="w-4 h-4 mr-2.5 flex-shrink-0" />}
                            {item.benefit}
                          </div>

                          <div className="mb-10 md:mb-14 flex-grow relative z-10 overflow-hidden">
                            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-5 md:mb-6 font-heading">Key Components</h3>
                            <div className="flex flex-wrap gap-2">
                              {item.ingredients.slice(0, 6).map((ing, i) => (
                                <span key={i} className="bg-white/5 border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-xl text-white/60 text-[10px] md:text-xs font-bold font-body">{ing}</span>
                              ))}
                              {item.ingredients.length > 6 && <span className="px-3 py-1.5 md:px-4 md:py-2 text-[#f28d35] text-[10px] font-black uppercase">+{item.ingredients.length - 6} More</span>}
                            </div>
                          </div>

                          <div className="mt-auto pt-6 flex items-center justify-between relative z-10 border-t border-white/5">
                             <button onClick={() => setSelectedRecipe(item)} className="flex items-center space-x-2 text-[#f28d35] hover:text-white transition-colors group/link">
                                <BookOpen className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">Scientific Profile</span>
                              </button>
                              <button onClick={() => setSelectedRecipe(item)} className="w-12 h-12 md:w-14 md:h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#f28d35] hover:text-[#1a1a1a] transition-all">
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                              </button>
                          </div>
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

      <footer className="relative z-10 py-16 px-6 bg-transparent border-t border-black/5 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="bg-[#1a1a1a] p-3 rounded-2xl shadow-lg inline-block">
              <Leaf className="w-6 h-6 text-[#f28d35]" />
            </div>
            <span className="text-[#1a1a1a] font-heading font-black text-2xl tracking-tighter">The Kitchen Hub</span>
          </div>
          
          <nav className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-8 w-full">
            <button onClick={() => { setActiveTab('home'); setSelectedRecipe(null); }} className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#1a1a1a] hover:text-[#f28d35] transition-all opacity-60 hover:opacity-100">HOME</button>
            <div className="w-full h-px bg-black/5 md:hidden my-1"></div>
            
            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {mainCategories.map(cat => (
                <button key={cat.id} onClick={() => { setActiveTab(cat.id); setSelectedRecipe(null); }} className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#1a1a1a] hover:text-[#f28d35] transition-all opacity-60 hover:opacity-100">{cat.name}</button>
              ))}
            </div>
            
            <div className="w-full h-px bg-black/5 md:hidden my-1"></div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
              {specialCategories.map(cat => (
                <button key={cat.id} onClick={() => { setActiveTab(cat.id); setSelectedRecipe(null); }} className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.4em] text-[#1a1a1a] hover:text-[#f28d35] transition-all opacity-60 hover:opacity-100">{cat.name}</button>
              ))}
            </div>
          </nav>

          <div className="flex flex-col items-center gap-3 text-center mt-6">
            <p className="text-[9px] md:text-[10px] text-[#1a1a1a] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] font-heading opacity-30">Functional Recovery • Precision Nutrition</p>
            <p className="text-[8px] md:text-[9px] text-[#1a1a1a] font-bold uppercase tracking-[0.2em] opacity-20">© 2026 Kitchen Hub Project</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;