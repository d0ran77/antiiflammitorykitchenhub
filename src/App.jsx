import React, { useState, useRef, useEffect } from 'react';
import { 
  Leaf, 
  Coffee, 
  Sun, 
  Moon, 
  Utensils, 
  Droplets, 
  ShoppingBasket, 
  ChevronRight, 
  Info,
  Sparkles,
  Zap,
  X,
  Activity,
  MessageCircle,
  Send,
  Loader2,
  Copy,
  Check,
  Home
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  
  // Chatbot State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: 'Hi! I am your Anti-Inflammatory Kitchen assistant. Ask me about the health benefits of our recipes, specific ingredients, or meals for conditions like endometriosis or perimenopause!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [lastRecipeContext, setLastRecipeContext] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const chatEndRef = useRef(null);

  const mainCategories = [
    { 
      id: 'smoothies', 
      name: 'Drinks', 
      icon: <Droplets className="w-5 h-5" />, 
      color: 'bg-orange-50 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'Refreshing, nutrient-dense blends to start your day or refuel.'
    },
    { 
      id: 'breakfast', 
      name: 'Breakfast', 
      icon: <Coffee className="w-5 h-5" />, 
      color: 'bg-orange-50 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'Fuel your morning with high-protein and gut-friendly options.'
    },
    { 
      id: 'lunch', 
      name: 'Lunch', 
      icon: <Sun className="w-5 h-5" />, 
      color: 'bg-orange-50 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'Light yet satisfying meals to maintain steady energy levels.'
    },
    { 
      id: 'dinner', 
      name: 'Dinner', 
      icon: <Moon className="w-5 h-5" />, 
      color: 'bg-orange-50 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'Nourishing evening meals rich in Omega-3s and minerals.'
    }
  ];

  const specialCategories = [
    { 
      id: 'perimenopause', 
      name: 'Perimenopause', 
      icon: <Activity className="w-5 h-5" />, 
      color: 'bg-[#f28d35]/10 text-[#f28d35]',
      description: 'Cooling, phytoestrogen-rich recipes to support hormonal transitions and ease hot flushes.'
    },
    { 
      id: 'endometriosis', 
      name: 'Endometriosis', 
      icon: <Activity className="w-5 h-5" />, 
      color: 'bg-[#f28d35]/10 text-[#f28d35]',
      description: 'Ultra-high Omega-3 and potent anti-inflammatory meals designed to help manage pelvic pain.'
    },
    { 
      id: 'hormones', 
      name: 'Hormones', 
      icon: <Activity className="w-5 h-5" />, 
      color: 'bg-[#f28d35]/10 text-[#f28d35]',
      description: 'Seed-cycling and cruciferous-heavy dishes aimed at optimal hormone clearing and balance.'
    }
  ];

  const allCategories = [...mainCategories, ...specialCategories];

  const data = {
    smoothies: [
      { title: 'Golden Glow', benefit: 'Immunity & Systemic Inflammation', ingredients: ['75g frozen pineapple', '75g frozen mango', '1 handful spinach', '1.5cm ginger', '1/2 tsp turmeric', '1 tbsp chia seeds', '240ml coconut water'], instructions: ['Peel the fresh ginger.', 'Add all ingredients into a high-speed blender.', 'Blend on high until completely smooth and creamy.', 'Serve immediately to retain maximum nutrients.'] },
      { title: 'Soothing Relief', benefit: 'Joint Pain & Sensitive Stomach', ingredients: ['75g papaya', '75g strawberries', '2.5cm ginger', '60ml kefir', '1 tbsp hemp hearts', '180ml aloe vera juice'], instructions: ['Remove seeds from the papaya if using fresh.', 'Grate or finely chop the ginger to ensure it blends well.', 'Combine all ingredients in the blender.', 'Pulse a few times then blend until smooth.', 'The papaya and ginger work together to soothe the stomach lining.'] },
      { title: 'Radiant Skin Elixir', benefit: 'Collagen & Skin Elasticity', ingredients: ['75g mixed berries', '1/4 avocado', '1 handful spinach', '1 tbsp ground flaxseeds', '1/2 tsp cinnamon', '240ml chilled green tea'], instructions: ['Brew green tea in advance and chill thoroughly.', 'Scoop out the avocado flesh.', 'Combine all ingredients in your blender.', 'Blend until the avocado has created a silky, creamy texture.', 'The healthy fats help your body absorb the vitamins from the greens.'] },
      { title: 'Deep Sleep Dreamer', benefit: 'Nervous System & Rest', ingredients: ['75g tart cherries', '1/2 banana', '30g walnuts', '1 tbsp almond butter', 'Dash of cinnamon', '240ml chamomile tea'], instructions: ['Brew chamomile tea and allow it to cool completely.', 'Add all ingredients to the blender.', 'Blend until the walnuts are fully incorporated.', 'Drink 1-2 hours before bed to allow the natural melatonin to take effect.'] },
      { title: 'Matcha Green Giant', benefit: 'Cellular Health & Energy', ingredients: ['1 tsp matcha powder', '1 handful spinach', '75g frozen pineapple', '1 tbsp hemp hearts', '240ml almond milk'], instructions: ['Add all ingredients to a blender.', 'Blend on high until smooth and vibrant green.', 'Enjoy immediately for best antioxidant benefit.'] },
      { title: 'Cherry Cacao Recovery', benefit: 'Muscle Recovery & Antioxidants', ingredients: ['75g frozen tart cherries', '1 tbsp raw cacao powder', '1/4 avocado', '240ml oat milk', '1 tsp maple syrup (optional)'], instructions: ['Pit cherries if using fresh.', 'Combine all ingredients in a blender.', 'Blend until creamy and rich.'] },
      { title: 'Beetroot Blood Builder', benefit: 'Liver Detoxification & Circulation', ingredients: ['1 small cooked beetroot', '75g frozen raspberries', '1 tbsp ground flaxseeds', '240ml coconut water'], instructions: ['Roughly chop the cooked beetroot.', 'Add to blender with berries, flax, and coconut water.', 'Blend on high until smooth.'] },
      { title: 'Spiced Carrot Cake', benefit: 'Vision Health & Blood Sugar Balance', ingredients: ['1 medium carrot (chopped)', '2.5cm fresh ginger', '1/2 tsp cinnamon', '30g walnuts', '240ml almond milk'], instructions: ['Peel the ginger and roughly chop the carrot.', 'Add all ingredients to the blender.', 'Blend on high until completely pulverized.'] }
    ],
    breakfast: [
      { title: 'Overnight Omega Oats', benefit: 'Gut Health & Fibre', ingredients: ['50g jumbo oats', '1 tbsp chia/flax', '150ml almond milk', '50g blueberries', '20g walnuts'], instructions: ['Combine oats, seeds, and almond milk in a glass jar.', 'Stir well and seal the lid.', 'Refrigerate overnight (or for at least 6 hours).', 'In the morning, top with fresh blueberries and walnuts just before eating.'] },
      { title: 'Turmeric Scrambled Eggs', benefit: 'Morning Protein Boost', ingredients: ['2 eggs', '1/2 tsp turmeric', 'Pinch black pepper', 'Handful spinach', '1 slice sourdough'], instructions: ['Whisk the eggs in a bowl with turmeric and a generous pinch of black pepper.', 'Heat a little olive oil in a non-stick pan over medium heat.', 'Pour in the egg mixture and scramble gently.', 'When the eggs are nearly set, toss in the spinach and stir until wilted.', 'Serve immediately on toasted sourdough.'] },
      { title: 'Berry & Chia Pot', benefit: 'Antioxidant Power', ingredients: ['3 tbsp chia seeds', '200ml coconut milk', '1/2 tsp vanilla', '75g raspberries', '1 tbsp hemp hearts'], instructions: ['Whisk chia seeds, coconut milk, and vanilla in a bowl or jar.', 'Wait 5 minutes and whisk again to prevent clumping.', 'Cover and refrigerate for at least 30 minutes (ideally overnight).', 'Layer with fresh raspberries and hemp hearts before serving.'] },
      { title: 'Smashed Avocado', benefit: 'Healthy Fats & Zinc', ingredients: ['1/2 avocado', '1 slice sourdough', '1 tbsp pumpkin seeds', 'Squeeze of lemon', 'Olive oil'], instructions: ['Toast the sourdough bread.', 'In a small bowl, mash the avocado with lemon juice and a tiny pinch of salt.', 'Spread the mash onto the toast.', 'Sprinkle with pumpkin seeds and a light drizzle of extra virgin olive oil.'] },
      { title: 'Green Shakshuka', benefit: 'Iron & Immune Support', ingredients: ['2 eggs', '1 handful kale', '1 handful spinach', '1/2 avocado', '1/2 tsp cumin'], instructions: ['Wilt kale and spinach in a pan with cumin and a little olive oil.', 'Make two wells in the greens and crack the eggs in.', 'Cover the pan and cook until eggs are set.', 'Serve topped with sliced avocado.'] },
      { title: 'Sweet Potato Toast', benefit: 'Sustained Energy & Potassium', ingredients: ['2 slices sweet potato (1cm thick)', '2 tbsp almond butter', '1/2 banana', '1 tsp chia seeds'], instructions: ['Toast sweet potato slices in a toaster or oven until tender (10-15 mins).', 'Spread almond butter over the warm slices.', 'Top with sliced banana and a sprinkle of chia seeds.'] },
      { title: 'Anti-Inflammatory Pancakes', benefit: 'Comfort Food Without Inflammation', ingredients: ['50g buckwheat flour', '1 egg', '100ml almond milk', '50g blueberries', '1/2 tsp cinnamon'], instructions: ['Whisk buckwheat flour, egg, milk, and cinnamon together into a batter.', 'Gently fold in the fresh blueberries.', 'Cook small spoonfuls in a lightly oiled pan until golden brown on both sides.'] },
      { title: 'Smoked Salmon Frittata', benefit: 'High-Dose Brain Nourishment', ingredients: ['3 eggs', '50g smoked salmon', '50g asparagus tips', '1 tbsp fresh dill'], instructions: ['Whisk the eggs in a bowl with the fresh dill.', 'Lightly sauté asparagus tips in an oven-proof pan.', 'Pour the eggs into the pan and layer the salmon on top.', 'Cook gently until the bottom sets, then finish under the grill.'] }
    ],
    lunch: [
      { title: 'Quinoa & Beetroot Salad', benefit: 'Liver Detoxification', ingredients: ['100g cooked quinoa', '1 medium beetroot', '1/2 avocado', 'Handful rocket', 'Ginger-lemon dressing'], instructions: ['Ensure quinoa is cooked and cooled.', 'Slice the beetroot and avocado into bite-sized pieces.', 'Place rocket in a bowl and top with quinoa, beetroot, and avocado.', 'Whisk olive oil, lemon, and grated ginger to make the dressing.', 'Drizzle over the salad and toss gently.'] },
      { title: 'Red Lentil & Ginger Soup', benefit: 'Easy Digestion', ingredients: ['100g red lentils', '400ml veg stock', '2.5 cm fresh ginger', '1 tsp turmeric'], instructions: ['Rinse lentils thoroughly until the water runs clear.', 'Place lentils, stock, grated ginger, and turmeric in a pot.', 'Bring to a boil, then reduce heat and simmer for 20 minutes until lentils are soft.', 'For easier digestion, use a stick blender to cream the soup until smooth.'] },
      { title: 'Mackerel on Rye', benefit: 'High Omega-3 Intake', ingredients: ['1 tinned mackerel fillet', '2 slices rye bread', 'Handful rocket', '1 tsp apple cider vinegar'], instructions: ['Lightly toast the rye bread.', 'Flake the mackerel fillet (with its oil if using olive oil version) onto the toast.', 'In a small bowl, toss the rocket with apple cider vinegar.', 'Pile the dressed rocket on top of the fish.'] },
      { title: 'Hummus & Veg Wrap', benefit: 'Plant Diversity', ingredients: ['1 wholemeal wrap', '2 tbsp hummus', '100g roasted veg', 'Handful spinach'], instructions: ['Spread a thick layer of hummus over the centre of the wrap.', 'Arrange roasted vegetables (like peppers and courgettes) over the hummus.', 'Top with a generous handful of fresh spinach.', 'Fold in the sides and roll tightly. Slice in half to serve.'] },
      { title: 'Sardines & Bean Salad', benefit: 'Bone Health & Sustained Focus', ingredients: ['1 tin sardines in olive oil', '100g cannellini beans', '1/2 lemon (juiced)', '1 handful fresh parsley', '1/4 red onion (finely chopped)'], instructions: ['Rinse the beans and finely chop the parsley and red onion.', 'Mix the beans, onion, and parsley in a serving bowl.', 'Top with sardines and dress with lemon juice and a little of the sardine oil.'] },
      { title: 'Turmeric Cauliflower Bowl', benefit: 'Low-Carb Systemic Cleanse', ingredients: ['150g cauliflower rice', '30g chopped walnuts', '2 tbsp pomegranate seeds', '1 handful spinach', '1/2 tsp turmeric'], instructions: ['Sauté cauliflower rice in a pan with turmeric and a little olive oil for 4 minutes.', 'Stir in the spinach until just wilted.', 'Transfer to a bowl and top with walnuts and pomegranate seeds.'] },
      { title: 'Sweet Potato & Black Bean Soup', benefit: 'Heart Health & Circulation', ingredients: ['1 medium sweet potato (diced)', '100g black beans', '400ml veg stock', '1/2 tsp cumin', '1/2 tsp coriander'], instructions: ['Simmer diced sweet potato in stock with the cumin and coriander for 15 minutes.', 'Stir in the black beans and heat through.', 'For a creamier texture, blend half of the soup and mix it back in.'] },
      { title: 'Green Goddess Chicken Wrap', benefit: 'Lean Muscle & Joint Lubrication', ingredients: ['1 spinach wrap', '100g poached chicken breast', '1/2 avocado', '1 handful fresh basil', '1 tbsp olive oil'], instructions: ['Blend the avocado, fresh basil, and olive oil to make a thick dressing.', 'Shred the poached chicken and mix it thoroughly with the dressing.', 'Spoon the mixture into the spinach wrap and roll tightly.'] }
    ],
    dinner: [
      { title: 'Baked Salmon & Sweet Potato', benefit: 'Heart & Skin Health', ingredients: ['1 salmon fillet', '1 sweet potato', '100g broccoli', 'Lemon & olive oil'], instructions: ['Preheat oven to 200°C.', 'Cut sweet potato into thin wedges, toss in olive oil, and bake for 10 mins.', 'Add the salmon fillet to the tray, seasoned with lemon and oregano.', 'Bake both for a further 12-15 minutes.', 'Steam the broccoli separately for 4 minutes and serve together.'] },
      { title: 'Chickpea Sunshine Curry', benefit: 'Systemic Relief', ingredients: ['200g chickpeas', '100ml light coconut milk', 'Turmeric/Cumin/Coriander', '2.5 cm ginger', 'Spinach'], instructions: ['Sauté minced ginger and dry spices in a pan with a little oil for 1 minute.', 'Add drained chickpeas and coconut milk.', 'Simmer on low for 10-15 minutes to let flavours meld.', 'Stir in fresh spinach right at the end until it just wilts. Serve with brown rice.'] },
      { title: 'Turkey & Ginger Stir-fry', benefit: 'Lean Muscle & Pain Relief', ingredients: ['150g turkey strips', '100g mixed veg', '2.5 cm ginger', '1 clove garlic', '1 tbsp tamari'], instructions: ['Heat oil in a wok or large pan over high heat.', 'Stir-fry turkey strips with garlic and ginger until cooked through.', 'Add mixed vegetables and toss for 3-4 minutes until tender-crisp.', 'Add tamari sauce and stir well before serving.'] },
      { title: 'Cod with Garlic & Parsley', benefit: 'Gentle Digestion', ingredients: ['150g cod fillet', '1 clove garlic', '1 tbsp fresh parsley', '100g baby potatoes', '100g green beans'], instructions: ['Boil baby potatoes for 12-15 mins until tender.', 'Place cod on a piece of baking foil.', 'Top with minced garlic, chopped parsley, lemon juice, and olive oil.', 'Fold foil into a parcel and bake at 180°C for 12-15 mins.', 'Steam green beans for the last 5 mins and serve.'] },
      { title: 'Turmeric Lemon Chicken', benefit: 'Post-Workout Healing', ingredients: ['150g chicken breast', '1/2 lemon', '1 tsp turmeric', '1 medium courgette (chopped)', '1 tbsp olive oil'], instructions: ['Marinate the chicken in lemon juice, turmeric, and olive oil for 15 minutes.', 'Place chicken and chopped courgette on a baking tray.', 'Roast at 200°C for 25 minutes until chicken is cooked through.'] },
      { title: 'Walnut & Lentil Bolognese', benefit: 'Plant-Based Cellular Renewal', ingredients: ['100g cooked brown lentils', '50g crushed walnuts', '200g crushed tomatoes', '1 medium courgette (spiralised)', '1 clove garlic'], instructions: ['Sauté minced garlic in a pan, then add lentils, walnuts, and crushed tomatoes.', 'Simmer the sauce for 15 minutes to thicken.', 'Serve hot over raw or lightly blanched courgetti (zucchini noodles).'] },
      { title: 'Miso Glazed Black Cod', benefit: 'Deep Hydration & Reduced Swelling', ingredients: ['150g cod fillet', '1 tbsp miso paste', '1 tsp grated ginger', '100g bok choy', '1 tsp sesame oil'], instructions: ['Mix the miso paste and ginger, then spread evenly over the cod fillet.', 'Bake the cod at 200°C for 12-15 minutes.', 'Lightly steam the bok choy and drizzle with sesame oil to serve on the side.'] },
      { title: 'Anti-Inflammatory Veggie Stew', benefit: 'Microbiome Diversity & Comfort', ingredients: ['1/2 aubergine (diced)', '200g crushed tomatoes', '100g chickpeas', '1 clove garlic', '1 tbsp extra virgin olive oil'], instructions: ['Sauté the diced aubergine and garlic in olive oil until soft.', 'Pour in the crushed tomatoes and add the chickpeas.', 'Cover and simmer for 20 minutes until rich and thick.'] }
    ],
    perimenopause: [
      { title: 'Maca & Berry Cooling Smoothie', benefit: 'Hot Flush Relief & Hormone Support', ingredients: ['1 tbsp maca powder', '75g frozen blueberries', '1/2 cucumber (peeled)', '1 tbsp ground flaxseeds', '240ml chilled almond milk'], instructions: ['Combine all ingredients in a high-speed blender.', 'Blend until smooth. The cucumber provides a deeply cooling effect to counter hot flushes.'] },
      { title: 'Phytoestrogen Salad Bowl', benefit: 'Natural Oestrogen Balancing', ingredients: ['100g edamame beans', '1 handful mixed greens', '30g pumpkin seeds', '1/2 avocado', 'Lemon and tahini dressing'], instructions: ['Steam edamame beans until tender.', 'Toss greens, edamame, and seeds in a bowl.', 'Top with sliced avocado and drizzle generously with tahini dressing.'] },
      { title: 'Tofu & Broccoli Stir-Fry', benefit: 'Bone Density & Phyto-Nutrients', ingredients: ['150g firm tofu (cubed)', '100g broccoli florets', '1 tbsp sesame oil', '1 tsp grated ginger', '1 tbsp tamari'], instructions: ['Pan-fry tofu in sesame oil until golden on all sides.', 'Add ginger and broccoli, stir-frying for 4 minutes.', 'Add tamari and a splash of water, cover, and steam for 2 minutes before serving.'] },
      { title: 'Sage & Pumpkin Seed Chicken', benefit: 'Night Sweat Reduction', ingredients: ['150g chicken breast', '1 tbsp fresh sage (chopped)', '30g crushed pumpkin seeds', '1 tbsp olive oil'], instructions: ['Coat the chicken in olive oil and press the chopped sage and crushed pumpkin seeds onto it.', 'Bake at 200°C for 25 minutes.', 'Sage is traditionally used to help manage excessive sweating.'] }
    ],
    endometriosis: [
      { title: 'Turmeric Ginger Relief Broth', benefit: 'Deep Pelvic Inflammation Reduction', ingredients: ['400ml bone broth (or veg stock)', '1 tbsp grated fresh ginger', '1 tsp turmeric powder', '1 clove crushed garlic', '1 handful spinach'], instructions: ['Simmer the broth with ginger, turmeric, and garlic for 15 minutes to infuse the active compounds.', 'Turn off the heat and stir in the spinach until wilted.', 'Sip slowly for deep, warming relief.'] },
      { title: 'Omega-3 Sardine Smash', benefit: 'Prostaglandin Balancing & Pain Management', ingredients: ['1 tin sardines in olive oil', '1/2 avocado', '1 slice sourdough', 'Squeeze of lemon'], instructions: ['Mash the avocado and sardines together in a bowl with a fork.', 'Stir in the lemon juice to cut the richness.', 'Serve over toasted sourdough. The extreme high dose of Omega-3s directly combats inflammatory pain pathways.'] },
      { title: 'Warm Lentil & Beetroot Detox', benefit: 'Liver Cleansing & Excess Oestrogen Removal', ingredients: ['100g cooked green lentils', '1 medium beetroot (roasted and diced)', '1 handful rocket', 'Apple cider vinegar dressing'], instructions: ['Warm the lentils slightly in a pan.', 'Mix with the roasted beetroot and fresh rocket.', 'Dress with apple cider vinegar to support stomach acid and digestion.'] },
      { title: 'Wild Salmon & Asparagus', benefit: 'Cellular Repair & Anti-Bloating', ingredients: ['1 wild-caught salmon fillet', '100g asparagus spears', '1 tbsp olive oil', '1/2 lemon'], instructions: ['Place salmon and asparagus on a baking tray.', 'Drizzle with olive oil and bake at 180°C for 15 minutes.', 'Asparagus acts as a natural, gentle diuretic to help ease endo belly bloating.'] }
    ],
    hormones: [
      { title: 'Seed Cycling Smoothie', benefit: 'Follicular / Luteal Phase Support', ingredients: ['1 tbsp seed cycling blend (flax/pumpkin OR sesame/sunflower)', '1/2 banana', '1 handful spinach', '240ml oat milk'], instructions: ['Ensure you are using the correct seeds for your current menstrual phase.', 'Blend seeds, banana, spinach, and milk until completely smooth.'] },
      { title: 'Cruciferous Crunch Salad', benefit: 'Oestrogen Detoxification', ingredients: ['100g finely shredded kale', '50g shredded red cabbage', '30g walnuts', 'Olive oil and lemon dressing'], instructions: ['Massage the kale and cabbage vigorously with the olive oil dressing for 2 minutes to soften it and release the enzymes.', 'Top with walnuts before serving.'] },
      { title: 'Hemp & Walnut Crusted Cod', benefit: 'Perfect Omega 3/6 Ratio', ingredients: ['150g cod fillet', '1 tbsp hemp hearts', '1 tbsp finely crushed walnuts', '1 tsp Dijon mustard'], instructions: ['Spread a thin layer of mustard over the top of the cod.', 'Press the hemp and walnut mixture into the mustard to form a crust.', 'Bake at 180°C for 15 minutes until fish is flaky.'] },
      { title: 'Sweet Potato Hormone Balancer', benefit: 'Progesterone Support & Carb Cycling', ingredients: ['1 medium sweet potato (baked whole)', '2 tbsp tahini', '1 tsp cinnamon', '1 handful spinach (steamed)'], instructions: ['Bake sweet potato until completely soft.', 'Split open and load with steamed spinach.', 'Drizzle generously with tahini and a dusting of cinnamon for blood sugar balance.'] }
    ]
  };

  const IngredientSection = ({ title, items }) => (
    <div className="mb-12">
      <h3 className="text-xl font-black text-[#1a1a1a] mb-6 border-b-4 border-[#f28d35] pb-2 font-heading tracking-tight inline-block uppercase">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4 text-[#1a1a1a] bg-[#1a1a1a]/5 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-sm transition-transform hover:scale-105">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f28d35] shadow-sm flex-shrink-0"></div>
            <span className="font-bold text-sm tracking-tight font-body">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );

  const activeCategoryData = allCategories.find(c => c.id === activeTab);

  // Chatbot Logic
  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isBotTyping, isChatOpen]);

  // Custom Markdown Formatter for Kitchen AI
  const renderFormattedText = (text) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return null;

      const formatBold = (str) => {
        const parts = str.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, j) => 
          part.startsWith('**') && part.endsWith('**') 
            ? <strong key={j} className="font-black text-[#1a1a1a]">{part.slice(2, -2)}</strong> 
            : part
        );
      };

      // Clean, neutral subtitles to break up text without loud colors
      if (line.startsWith('### ')) {
        return <h4 key={i} className="text-lg font-black mt-6 mb-2 text-[#1a1a1a]">{formatBold(line.replace('### ', ''))}</h4>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={i} className="text-xl font-black mt-7 mb-3 text-[#1a1a1a] border-b border-[#1a1a1a]/10 pb-2">{formatBold(line.replace('## ', ''))}</h3>;
      }
      if (line.startsWith('# ')) {
        return <h2 key={i} className="text-2xl font-black mt-7 mb-3 text-[#1a1a1a]">{formatBold(line.replace('# ', ''))}</h2>;
      }
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return <div key={i} className="flex items-start mb-2"><span className="text-[#f28d35] mr-2 mt-0.5">•</span><span className="text-[#1a1a1a]/80 font-medium">{formatBold(line.replace(/^[-•]\s/, ''))}</span></div>;
      }

      return <p key={i} className="mb-3 text-[#1a1a1a]/80 font-medium leading-relaxed">{formatBold(line)}</p>;
    });
  };

  // Copy Ingredients Fallback for iFrames
  const handleCopy = (ingredients, title) => {
    const textToCopy = `Ingredients for ${title}:\n` + ingredients.map(i => `- ${i}`).join('\n');
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

  // Dedicated AI request when the Neumorphic Button is clicked
  const handleAskAIAboutRecipe = async (recipe) => {
    setIsChatOpen(true);
    setChatMessages(prev => [...prev, { role: 'user', text: `Can you explain the health benefits of the ${recipe.title} and why the ingredients work?` }]);
    setIsBotTyping(true);

    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ 
          text: `You are 'Kitchen AI'. The user clicked on the recipe "${recipe.title}". Write a 1-2 paragraph enthusiastic explanation of EXACTLY WHY the specific ingredients in this recipe (such as ${recipe.ingredients.join(', ')}) are highly anti-inflammatory and beneficial for health. Focus on the nutritional science. 
          FORMATTING RULES:
          - Use '### ' to create clean subtitles to break up the text (e.g., '### Why Your Body Loves This').
          - Write short, easy-to-read paragraphs under each subtitle.
          - Use **bold** text for emphasis on key nutrients.
          DO NOT list the ingredients or instructions, as the UI will display them automatically.`
        }]
      },
      contents: [{
        parts: [{ text: `Explain the health benefits of ${recipe.title}.` }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            reply: { type: "STRING" }
          },
          required: ["reply"]
        }
      }
    };

    try {
      let result;
      const delays = [1000, 2000, 4000, 8000, 16000];
      for (let i = 0; i < 5; i++) {
        try {
          const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          if (!response.ok) throw new Error('API Error');
          result = await response.json();
          break;
        } catch (err) {
          if (i === 4) throw err;
          await new Promise(r => setTimeout(r, delays[i]));
        }
      }
      
      const jsonText = result.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(jsonText);
      
      setChatMessages(prev => [...prev, { role: 'bot', text: parsed.reply, fullRecipe: recipe }]);
      setLastRecipeContext(recipe);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'bot', text: "I'm having a little trouble connecting right now, but you can see the ingredients and method below!", fullRecipe: recipe }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsBotTyping(true);

    const allRecipesWithCategory = Object.keys(data).flatMap(category => 
      data[category].map(r => ({ category: category, title: r.title, benefit: r.benefit, ingredients: r.ingredients }))
    );

    const apiKey = ""; 
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ 
          text: `You are 'Kitchen AI', an expert anti-inflammatory nutrition assistant. You must ONLY recommend recipes from the provided Database. If a user asks about an ailment or specific condition/category (like perimenopause, endometriosis), recommend a recipe and explain why its ingredients help. Always be empathetic and conversational.
          FORMATTING RULES:
          - Use '### ' to create clean subtitles to break up the text.
          - Write short, easy-to-read paragraphs under each subtitle.
          - Use **bold** text for emphasis on key ingredients.`
        }]
      },
      contents: [{
        parts: [{ 
          text: `Last Discussed Recipe: ${lastRecipeContext ? lastRecipeContext.title : 'None'}\nRecipe Database:\n${JSON.stringify(allRecipesWithCategory)}\nUser Query: ${userMessage.text}` 
        }]
      }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            reply: { type: "STRING" },
            recommendedRecipeTitle: { type: "STRING", nullable: true }
          },
          required: ["reply"]
        }
      }
    };

    try {
      let result;
      const delays = [1000, 2000, 4000, 8000, 16000];
      for (let i = 0; i < 5; i++) {
        try {
          const response = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          if (!response.ok) throw new Error('API Error');
          result = await response.json();
          break;
        } catch (err) {
          if (i === 4) throw err;
          await new Promise(r => setTimeout(r, delays[i]));
        }
      }

      const jsonText = result.candidates[0].content.parts[0].text;
      const parsed = JSON.parse(jsonText);
      
      let matchedRecipe = null;
      if (parsed.recommendedRecipeTitle) {
         const allRecipes = Object.values(data).flat();
         matchedRecipe = allRecipes.find(r => 
           r.title.toLowerCase() === parsed.recommendedRecipeTitle.toLowerCase() ||
           r.title.toLowerCase().includes(parsed.recommendedRecipeTitle.toLowerCase())
         );
      }

      setChatMessages(prev => [...prev, { role: 'bot', text: parsed.reply, recipeLink: matchedRecipe }]);
      if (matchedRecipe) setLastRecipeContext(matchedRecipe);

    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'bot', text: "I'm having a little trouble connecting right now. Please try again!" }]);
    } finally {
      setIsBotTyping(false);
    }
  };

  return (
    <div className="min-h-screen relative font-body text-[#1a1a1a] overflow-x-hidden selection:bg-[#f28d35]/30 flex flex-col">
      {/* GLOBAL TYPOGRAPHY & OVERRIDES */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@700;800&display=swap');
        
        :root {
          --font-heading: 'Plus Jakarta Sans', sans-serif;
          --font-body: 'Inter', sans-serif;
        }

        .font-heading { font-family: var(--font-heading); }
        .font-body { font-family: var(--font-body); }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #f28d35; border-radius: 10px; }

        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }

        @keyframes gentle-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-gentle-bounce { animation: gentle-bounce 3s ease-in-out infinite; }
      `}</style>

      {/* GLOBAL BACKGROUND PHOTO */}
      <div 
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#e8e7e7]/65 backdrop-blur-[5px]"></div>
      </div>

      {/* Navigation Header - Fully Transparent */}
      <nav className="sticky top-0 z-40 bg-transparent">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 text-[#1a1a1a] font-heading font-black text-2xl tracking-tighter uppercase"
          >
            <Leaf className="w-8 h-8 text-[#f28d35]" />
            <span className="inline">The Kitchen Hub</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('home')}
            className="text-[#1a1a1a] hover:text-[#f28d35] transition-colors duration-300 animate-gentle-bounce p-2"
            title="Home"
          >
            <Home className="w-7 h-7" />
          </button>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-20 flex-grow w-full">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-1000">
            {/* Home Hero Section */}
            <section className="flex flex-col items-center justify-center text-center pt-16 pb-8 md:pt-24 md:pb-12 px-4">
              <div className="inline-flex items-center space-x-3 bg-[#1a1a1a] text-[#f28d35] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.25em] mb-8 shadow-2xl font-heading">
                <Sparkles className="w-4 h-4" />
                <span>Anti-Inflammatory Kitchen</span>
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-9xl font-black text-[#1a1a1a] mb-6 tracking-tighter font-heading leading-[1.1] md:leading-[0.9] flex flex-wrap justify-center gap-x-3 md:gap-x-5">
                <span>Eat to</span> <span className="text-[#f28d35]">Heal.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#1a1a1a] font-bold max-w-2xl mx-auto font-body opacity-80">
                Harness the power of natural ingredients to boost immunity and reclaim your vitality.
              </p>
            </section>

            {/* Mobile Carousel - Main Categories */}
            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-4 pt-4 pb-6 px-4 md:px-0 -mt-4">
              {mainCategories.map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className="flex-shrink-0 w-[75vw] md:w-auto group relative bg-[#1a1a1a]/90 backdrop-blur-xl rounded-[3.5rem] shadow-2xl hover:shadow-[#f28d35]/20 snap-center transition-all border border-white/10 text-left overflow-hidden h-[35rem] md:h-[26rem] hover:-translate-y-2"
                >
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[40%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 text-[#e8e7e7]">
                    <div className="w-14 h-14 bg-[#f28d35] rounded-2xl flex items-center justify-center mb-6 shadow-xl text-[#1a1a1a]">
                      {cat.icon}
                    </div>
                    <h3 className="font-black text-3xl mb-2 font-heading tracking-tighter uppercase leading-none">{cat.name}</h3>
                    <p className="text-[#f28d35] text-[10px] font-black uppercase tracking-[0.2em] font-heading">Digital Collection</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Targeted Recipe Section */}
            <div className="w-full mb-6">
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pt-4 pb-6 px-4 md:px-0 md:justify-center -mt-4">
                {specialCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    className="flex-shrink-0 w-[75vw] md:w-auto snap-center bg-[#1a1a1a]/90 backdrop-blur-xl border border-white/10 text-[#e8e7e7] px-8 py-5 rounded-full font-heading font-black tracking-[0.2em] text-xs hover:bg-[#f28d35] hover:text-[#1a1a1a] transition-all shadow-2xl hover:-translate-y-2 uppercase flex items-center justify-center space-x-3 group"
                  >
                    <span className="text-[#f28d35] group-hover:text-[#1a1a1a] flex-shrink-0">{cat.icon}</span>
                    <span className="truncate">{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Slim Ingredients Button under Carousels */}
            <div className="flex justify-center mt-2 mb-10">
                <button 
                  onClick={() => setActiveTab('ingredients')} 
                  className="bg-[#1a1a1a] text-[#e8e7e7] px-8 py-3 rounded-[2rem] font-black shadow-2xl hover:bg-[#252525] hover:-translate-y-1 transition-all text-sm font-heading tracking-[0.1em] uppercase"
                >
                  VIEW MASTER INGREDIENTS
                </button>
            </div>
          </div>
        )}

        {['smoothies', 'breakfast', 'lunch', 'dinner', 'perimenopause', 'endometriosis', 'hormones', 'ingredients'].includes(activeTab) && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-600 pt-16 md:pt-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 border-l-[10px] border-[#f28d35] pl-6 md:pl-10 mx-2 md:mx-0">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-[#1a1a1a] shadow-xl border border-white/10 text-[#f28d35]`}>
                    {activeCategoryData?.icon || <Utensils className="w-5 h-5" />}
                  </div>
                  <span className="text-[#1a1a1a] font-black uppercase tracking-[0.4em] text-xs font-heading opacity-40">
                    {activeTab === 'ingredients' ? 'Essential Knowledge' : 'Science-Backed Collection'}
                  </span>
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-8xl font-black text-[#1a1a1a] capitalize tracking-tighter font-heading mb-6 md:mb-8 leading-tight md:leading-none break-words hyphens-auto">
                  {activeTab}
                </h2>
                <p className="text-[#1a1a1a] font-bold text-lg md:text-2xl leading-relaxed font-body opacity-70">
                  {activeCategoryData?.description || 'The raw powerhouses behind your anti-inflammatory diet.'}
                </p>
              </div>
            </header>

            {activeTab === 'ingredients' ? (
              <article className="bg-[#e8e7e7]/80 backdrop-blur-3xl rounded-[3rem] md:rounded-[4rem] p-8 md:p-14 shadow-2xl border border-white mx-2 md:mx-0">
                <IngredientSection 
                  title="🍎 Fruits & Berries" 
                  items={['Blueberries & Raspberries', 'Avocado', 'Lemon', 'Papaya', 'Pineapple', 'Tart Cherries']} 
                />
                <IngredientSection 
                  title="🥦 Vegetables & Greens" 
                  items={['Spinach, Rocket, Baby Kale', 'Beetroot', 'Sweet Potato', 'Broccoli, Asparagus', 'Mixed Med Veg', 'Garlic', 'Ginger']} 
                />
                <IngredientSection 
                  title="🐟 Proteins" 
                  items={['Salmon & Mackerel', 'Cod / White Fish', 'Turkey Breast', 'Free-range Eggs', 'Firm Tofu']} 
                />
                <IngredientSection 
                  title="🫘 Pantry Staples" 
                  items={['Jumbo Rolled Oats', 'Quinoa', 'Red Split Lentils', 'Chickpeas', 'Sourdough or Rye']} 
                />
                <IngredientSection 
                  title="🌿 Boosters & Oils" 
                  items={['Turmeric & Black Pepper', 'Chia & Flaxseeds', 'Hemp Hearts', 'Walnuts', 'Extra Virgin Olive Oil', 'Aloe Vera Juice']} 
                />
              </article>
            ) : (
              <div className="flex overflow-x-auto items-stretch snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-2 md:auto-rows-fr md:gap-12 pt-4 pb-8 px-4 md:px-0 -mt-4">
                {data[activeTab]?.map((item, idx) => (
                  <article key={idx} className="flex-shrink-0 w-[85vw] md:w-auto snap-center bg-[#1a1a1a]/85 backdrop-blur-xl rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 shadow-2xl border border-white/10 flex flex-col h-full hover:shadow-[#f28d35]/10 hover:-translate-y-3 transition-all duration-500">
                    
                    <div className="flex justify-between items-start mb-8 md:mb-10">
                      <h3 className="text-3xl md:text-4xl font-black text-[#e8e7e7] leading-tight font-heading tracking-tighter">{item.title}</h3>
                      
                      {/* Neumorphic AI Interactive Button */}
                      <button 
                        onClick={() => handleAskAIAboutRecipe(item)}
                        className="p-4 md:p-5 bg-[#f28d35] rounded-2xl md:rounded-3xl text-[#1a1a1a] shadow-[inset_2px_2px_4px_rgba(255,255,255,0.5),inset_-2px_-2px_4px_rgba(0,0,0,0.15),4px_4px_8px_rgba(0,0,0,0.2)] hover:shadow-[inset_3px_3px_6px_rgba(255,255,255,0.6),inset_-3px_-3px_6px_rgba(0,0,0,0.2),6px_6px_12px_rgba(0,0,0,0.3)] active:shadow-[inset_4px_4px_8px_rgba(0,0,0,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.2),0px_0px_0px_rgba(0,0,0,0)] ml-4 flex-shrink-0 transition-all duration-300 flex items-center justify-center relative group active:scale-95"
                        title="Ask AI about this recipe"
                      >
                        <MessageCircle className="w-6 h-6 md:w-7 md:h-7" />
                        <Sparkles className="w-3 h-3 absolute top-3 right-3 md:top-4 md:right-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>

                    </div>
                    
                    <div className="flex items-center text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] bg-[#f28d35] px-4 md:px-6 py-2 md:py-3 rounded-full w-fit mb-8 md:mb-12 font-heading shadow-lg shadow-[#f28d35]/20">
                      <Info className="w-4 h-4 mr-2.5 flex-shrink-0" />
                      {item.benefit}
                    </div>

                    <div className="mb-10 md:mb-14 flex-grow">
                      <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-6 md:mb-8 font-heading">The Ingredients</h4>
                      <ul className="space-y-4 md:space-y-5">
                        {item.ingredients.map((ing, i) => (
                          <li key={i} className="text-[#e8e7e7] text-base md:text-lg font-bold flex items-center font-body opacity-80 hover:opacity-100 transition-opacity">
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-[#f28d35] rounded-full mr-4 md:mr-5 shadow-sm flex-shrink-0"></div>
                            {ing}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => setSelectedRecipe(item)}
                      className="w-full py-5 md:py-6 bg-white/5 text-[#f28d35] border-2 border-[#f28d35] text-base md:text-lg font-black rounded-[1.5rem] md:rounded-3xl hover:bg-[#f28d35] hover:text-[#1a1a1a] shadow-2xl transition-all flex items-center justify-center active:scale-95 font-heading tracking-tighter mt-auto"
                    >
                      START THE METHOD
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Recipe Modal */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-2xl" onClick={() => setSelectedRecipe(null)}></div>
          <div className="relative bg-[#e8e7e7]/90 backdrop-blur-3xl w-full max-w-3xl rounded-[3rem] md:rounded-[5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-400 border-4 border-[#1a1a1a]">
            <div className="p-8 md:p-16 border-b-2 border-[#1a1a1a]/10 flex justify-between items-center bg-white/50 backdrop-blur-md">
              <h3 className="text-3xl md:text-5xl font-black text-[#1a1a1a] tracking-tighter font-heading leading-none pr-4">{selectedRecipe.title}</h3>
              <button 
                onClick={() => setSelectedRecipe(null)}
                className="p-4 md:p-5 bg-[#1a1a1a] text-[#f28d35] rounded-2xl md:rounded-3xl transition-all shadow-2xl active:scale-90 hover:rotate-90 duration-300 flex-shrink-0"
              >
                <X className="w-6 h-6 md:w-8 md:h-8" />
              </button>
            </div>
            <div className="p-8 md:p-16 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="mb-12 md:mb-16">
                <h4 className="text-[#1a1a1a] font-black uppercase text-[10px] md:text-xs tracking-[0.5em] mb-8 md:mb-12 flex items-center font-heading opacity-40">
                  <Utensils className="w-4 h-4 md:w-5 md:h-5 mr-3 md:mr-4" /> THE COOKING METHOD
                </h4>
                <div className="space-y-10 md:space-y-16">
                  {selectedRecipe.instructions.map((step, idx) => (
                    <div key={idx} className="flex space-x-6 md:space-x-10">
                      <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl md:rounded-[2rem] bg-[#1a1a1a] text-[#f28d35] flex items-center justify-center font-black text-xl md:text-3xl shadow-2xl font-heading">
                        {idx + 1}
                      </div>
                      <p className="text-[#1a1a1a] text-lg md:text-2xl leading-relaxed font-bold pt-1 font-body">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-[#1a1a1a] text-[#f28d35] rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 shadow-2xl border border-white/5">
                <h4 className="text-white/20 font-black uppercase text-[10px] tracking-[0.4em] mb-4 md:mb-5 font-heading">Digital Health Benefit</h4>
                <p className="text-xl md:text-2xl font-black flex items-start leading-snug font-heading tracking-tight">
                  <Info className="w-6 h-6 md:w-8 md:h-8 mr-4 md:mr-5 text-white mt-0.5 flex-shrink-0" />
                  {selectedRecipe.benefit}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chatbot Assistant */}
      <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
        {/* Chat Window */}
        {isChatOpen && (
          <div className="mb-4 w-[90vw] md:w-[450px] h-[65vh] md:h-[600px] bg-[#e8e7e7]/95 backdrop-blur-3xl border-2 border-[#1a1a1a] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
            {/* Chat Header */}
            <div className="bg-[#1a1a1a] p-5 flex justify-between items-center shrink-0">
              <div className="flex items-center space-x-3 text-[#f28d35]">
                <MessageCircle className="w-6 h-6" />
                <span className="font-heading font-black tracking-tighter text-lg uppercase text-[#e8e7e7]">Kitchen AI</span>
              </div>
              <button onClick={() => setIsChatOpen(false)} className="text-[#e8e7e7] hover:text-[#f28d35] transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-5 overflow-y-auto custom-scrollbar flex flex-col space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[90%] p-5 rounded-3xl font-body text-sm leading-relaxed ${
                    msg.role === 'user' 
                    ? 'bg-[#f28d35] text-[#1a1a1a] rounded-br-none font-bold whitespace-pre-wrap' 
                    : 'bg-white text-[#1a1a1a] shadow-sm border border-[#1a1a1a]/10 rounded-bl-none'
                  }`}>
                    {msg.role === 'bot' ? renderFormattedText(msg.text) : msg.text}
                    
                    {/* Interactive Button for standard recipes found in chat */}
                    {msg.recipeLink && (
                      <button 
                        onClick={() => setSelectedRecipe(msg.recipeLink)}
                        className="mt-3 w-full bg-[#1a1a1a] text-[#f28d35] py-2.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center hover:bg-[#252525] transition-colors"
                      >
                        Open {msg.recipeLink.title} <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    )}

                    {/* Highly detailed Recipe Card specifically for the Neumorphic Button request */}
                    {msg.fullRecipe && (
                      <div className="mt-5 bg-[#1a1a1a]/5 rounded-[1.5rem] p-5 border border-[#1a1a1a]/10">
                        <h4 className="font-black text-[#1a1a1a] text-xs uppercase tracking-widest mb-4 flex items-center justify-between border-b border-[#1a1a1a]/10 pb-3">
                          <span>Ingredients</span>
                          <button 
                            onClick={() => handleCopy(msg.fullRecipe.ingredients, msg.fullRecipe.title)}
                            className="bg-[#1a1a1a] text-[#f28d35] px-3 py-1.5 rounded-lg hover:bg-[#252525] transition-colors flex items-center space-x-1.5 active:scale-95"
                          >
                            {copiedId === msg.fullRecipe.title ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedId === msg.fullRecipe.title ? 'COPIED' : 'COPY'}</span>
                          </button>
                        </h4>
                        <ul className="text-sm font-bold text-[#1a1a1a]/80 space-y-2 mb-6">
                          {msg.fullRecipe.ingredients.map((ing, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-[#f28d35] mr-2.5 mt-0.5">•</span>
                              {ing}
                            </li>
                          ))}
                        </ul>

                        <h4 className="font-black text-[#1a1a1a] text-xs uppercase tracking-widest mb-4 border-b border-[#1a1a1a]/10 pb-3">
                          Method
                        </h4>
                        <ol className="text-sm font-bold text-[#1a1a1a]/80 space-y-3">
                          {msg.fullRecipe.instructions.map((step, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-[#f28d35] mr-2.5 mt-0.5">{i+1}.</span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isBotTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] p-4 rounded-3xl rounded-bl-none bg-white text-[#1a1a1a] shadow-sm border border-white/50 flex space-x-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#f28d35]" />
                    <span className="text-xs font-bold text-slate-400 font-heading tracking-widest uppercase">Thinking</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white/50 border-t border-[#1a1a1a]/10 shrink-0 flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about recipes or health..."
                className="flex-1 bg-white border border-[#1a1a1a]/20 rounded-2xl px-4 py-3 text-sm font-bold text-[#1a1a1a] focus:outline-none focus:border-[#f28d35] focus:ring-1 focus:ring-[#f28d35] font-body placeholder:text-[#1a1a1a]/30"
              />
              <button 
                type="submit" 
                disabled={!chatInput.trim() || isBotTyping}
                className="bg-[#1a1a1a] text-[#f28d35] p-3 rounded-2xl hover:bg-[#252525] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}

        {/* Floating Action Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-16 h-16 rounded-[1.5rem] bg-[#f28d35] text-[#1a1a1a] shadow-2xl shadow-[#f28d35]/40 flex items-center justify-center hover:-translate-y-1 transition-all duration-300 ${!isChatOpen ? 'animate-float' : ''}`}
        >
          {isChatOpen ? <X className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
        </button>
      </div>

      {/* COMPACT & TRANSPARENT FOOTER */}
      <footer className="relative z-10 py-16 px-6 bg-transparent mt-auto border-t border-[#1a1a1a]/10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          
          <div className="flex items-center space-x-3 text-[#1a1a1a] font-heading font-black text-xl tracking-tighter">
            <Leaf className="w-7 h-7 text-[#f28d35]" />
            <span>The Kitchen Hub</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center md:items-stretch gap-y-8 md:gap-x-12">
            <div className="flex items-center">
              <button onClick={() => setActiveTab('home')} className="text-sm md:text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:text-[#f28d35] transition-all font-heading opacity-60 hover:opacity-100">
                HOME
              </button>
            </div>

            <div className="hidden md:block w-px bg-[#1a1a1a]/20 min-h-[80px]"></div>

            <div className="flex flex-col items-center md:items-start space-y-5 md:space-y-3 justify-center">
              {['breakfast', 'lunch', 'dinner'].map(id => {
                const cat = mainCategories.find(c => c.id === id);
                return <button key={id} onClick={() => setActiveTab(id)} className="text-sm md:text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:text-[#f28d35] transition-all font-heading opacity-60 hover:opacity-100">{cat.name}</button>
              })}
            </div>

            <div className="hidden md:block w-px bg-[#1a1a1a]/20 min-h-[80px]"></div>

            <div className="flex flex-col items-center md:items-start space-y-5 md:space-y-3 justify-center">
              {['endometriosis', 'hormones', 'perimenopause'].map(id => {
                const cat = specialCategories.find(c => c.id === id);
                return <button key={id} onClick={() => setActiveTab(id)} className="text-sm md:text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:text-[#f28d35] transition-all font-heading opacity-60 hover:opacity-100">{cat.name}</button>
              })}
            </div>
          </div>

          <p className="w-full md:w-auto text-[10px] text-[#1a1a1a] font-black uppercase tracking-[0.4em] font-heading opacity-30 text-center md:text-right mt-4 md:mt-0">
            Functional Recovery
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;