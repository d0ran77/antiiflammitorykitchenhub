import React, { useState } from 'react';
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
  X
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const categories = [
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
    },
    { 
      id: 'ingredients', 
      name: 'Ingredients', 
      icon: <ShoppingBasket className="w-5 h-5" />, 
      color: 'bg-orange-50 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'The raw powerhouses behind your anti-inflammatory diet.'
    }
  ];

  const data = {
    smoothies: [
      { 
        title: 'Golden Glow', 
        benefit: 'Immunity & Systemic Inflammation', 
        icon: <Zap className="text-[#f28d35]" />,
        ingredients: ['75g frozen pineapple', '75g frozen mango', '1 handful spinach', '1.5cm ginger', '1/2 tsp turmeric', '1 tbsp chia seeds', '240ml coconut water'],
        instructions: ['Peel the fresh ginger.', 'Add all ingredients into a high-speed blender.', 'Blend on high until completely smooth and creamy.', 'Serve immediately to retain maximum nutrients.']
      },
      { 
        title: 'Soothing Relief', 
        benefit: 'Joint Pain & Sensitive Stomach', 
        icon: <Info className="text-[#f28d35]" />,
        ingredients: ['75g papaya', '75g strawberries', '2.5cm ginger', '60ml kefir', '1 tbsp hemp hearts', '180ml aloe vera juice'],
        instructions: ['Remove seeds from the papaya if using fresh.', 'Grate or finely chop the ginger to ensure it blends well.', 'Combine all ingredients in the blender.', 'Pulse a few times then blend until smooth.', 'The papaya and ginger work together to soothe the stomach lining.']
      },
      { 
        title: 'Radiant Skin Elixir', 
        benefit: 'Collagen & Skin Elasticity', 
        icon: <Sparkles className="text-[#f28d35]" />,
        ingredients: ['75g mixed berries', '1/4 avocado', '1 handful spinach', '1 tbsp ground flaxseeds', '1/2 tsp cinnamon', '240ml chilled green tea'],
        instructions: ['Brew green tea in advance and chill thoroughly.', 'Scoop out the avocado flesh.', 'Combine all ingredients in your blender.', 'Blend until the avocado has created a silky, creamy texture.', 'The healthy fats help your body absorb the vitamins from the greens.']
      },
      { 
        title: 'Deep Sleep Dreamer', 
        benefit: 'Nervous System & Rest', 
        icon: <Moon className="text-[#f28d35]" />,
        ingredients: ['75g tart cherries', '1/2 banana', '30g walnuts', '1 tbsp almond butter', 'Dash of cinnamon', '240ml chamomile tea'],
        instructions: ['Brew chamomile tea and allow it to cool completely.', 'Add all ingredients to the blender.', 'Blend until the walnuts are fully incorporated.', 'Drink 1-2 hours before bed to allow the natural melatonin to take effect.']
      },
      { 
        title: 'Matcha Green Giant', 
        benefit: 'Cellular Health & Energy', 
        icon: <Leaf className="text-[#f28d35]" />,
        ingredients: ['1 tsp matcha powder', '1 handful spinach', '75g frozen pineapple', '1 tbsp hemp hearts', '240ml almond milk'],
        instructions: ['Add all ingredients to a blender.', 'Blend on high until smooth and vibrant green.', 'Enjoy immediately for best antioxidant benefit.']
      },
      { 
        title: 'Cherry Cacao Recovery', 
        benefit: 'Muscle Recovery & Antioxidants', 
        icon: <Sparkles className="text-[#f28d35]" />,
        ingredients: ['75g frozen tart cherries', '1 tbsp raw cacao powder', '1/4 avocado', '240ml oat milk', '1 tsp maple syrup (optional)'],
        instructions: ['Pit cherries if using fresh.', 'Combine all ingredients in a blender.', 'Blend until creamy and rich.']
      },
      { 
        title: 'Beetroot Blood Builder', 
        benefit: 'Liver Detoxification & Circulation', 
        icon: <Zap className="text-[#f28d35]" />,
        ingredients: ['1 small cooked beetroot', '75g frozen raspberries', '1 tbsp ground flaxseeds', '240ml coconut water'],
        instructions: ['Roughly chop the cooked beetroot.', 'Add to blender with berries, flax, and coconut water.', 'Blend on high until smooth.']
      },
      { 
        title: 'Spiced Carrot Cake', 
        benefit: 'Vision Health & Blood Sugar Balance', 
        icon: <Coffee className="text-[#f28d35]" />,
        ingredients: ['1 medium carrot (chopped)', '2.5cm fresh ginger', '1/2 tsp cinnamon', '30g walnuts', '240ml almond milk'],
        instructions: ['Peel the ginger and roughly chop the carrot.', 'Add all ingredients to the blender.', 'Blend on high until completely pulverized.']
      }
    ],
    breakfast: [
      { 
        title: 'Overnight Omega Oats', 
        benefit: 'Gut Health & Fibre', 
        ingredients: ['50g jumbo oats', '1 tbsp chia/flax', '150ml almond milk', '50g blueberries', '20g walnuts'],
        instructions: ['Combine oats, seeds, and almond milk in a glass jar.', 'Stir well and seal the lid.', 'Refrigerate overnight (or for at least 6 hours).', 'In the morning, top with fresh blueberries and walnuts just before eating.']
      },
      { 
        title: 'Turmeric Scrambled Eggs', 
        benefit: 'Morning Protein Boost', 
        ingredients: ['2 eggs', '1/2 tsp turmeric', 'Pinch black pepper', 'Handful spinach', '1 slice sourdough'],
        instructions: ['Whisk the eggs in a bowl with turmeric and a generous pinch of black pepper.', 'Heat a little olive oil in a non-stick pan over medium heat.', 'Pour in the egg mixture and scramble gently.', 'When the eggs are nearly set, toss in the spinach and stir until wilted.', 'Serve immediately on toasted sourdough.']
      },
      { 
        title: 'Berry & Chia Pot', 
        benefit: 'Antioxidant Power', 
        ingredients: ['3 tbsp chia seeds', '200ml coconut milk', '1/2 tsp vanilla', '75g raspberries', '1 tbsp hemp hearts'],
        instructions: ['Whisk chia seeds, coconut milk, and vanilla in a bowl or jar.', 'Wait 5 minutes and whisk again to prevent clumping.', 'Cover and refrigerate for at least 30 minutes (ideally overnight).', 'Layer with fresh raspberries and hemp hearts before serving.']
      },
      { 
        title: 'Smashed Avocado', 
        benefit: 'Healthy Fats & Zinc', 
        ingredients: ['1/2 avocado', '1 slice sourdough', '1 tbsp pumpkin seeds', 'Squeeze of lemon', 'Olive oil'],
        instructions: ['Toast the sourdough bread.', 'In a small bowl, mash the avocado with lemon juice and a tiny pinch of salt.', 'Spread the mash onto the toast.', 'Sprinkle with pumpkin seeds and a light drizzle of extra virgin olive oil.']
      },
      { 
        title: 'Green Shakshuka', 
        benefit: 'Iron & Immune Support', 
        icon: <Sun className="text-[#f28d35]" />,
        ingredients: ['2 eggs', '1 handful kale', '1 handful spinach', '1/2 avocado', '1/2 tsp cumin'],
        instructions: ['Wilt kale and spinach in a pan with cumin and a little olive oil.', 'Make two wells in the greens and crack the eggs in.', 'Cover the pan and cook until eggs are set.', 'Serve topped with sliced avocado.']
      },
      { 
        title: 'Sweet Potato Toast', 
        benefit: 'Sustained Energy & Potassium', 
        icon: <Zap className="text-[#f28d35]" />,
        ingredients: ['2 slices sweet potato (1cm thick)', '2 tbsp almond butter', '1/2 banana', '1 tsp chia seeds'],
        instructions: ['Toast sweet potato slices in a toaster or oven until tender (10-15 mins).', 'Spread almond butter over the warm slices.', 'Top with sliced banana and a sprinkle of chia seeds.']
      },
      { 
        title: 'Anti-Inflammatory Pancakes', 
        benefit: 'Comfort Food Without Inflammation', 
        icon: <Sparkles className="text-[#f28d35]" />,
        ingredients: ['50g buckwheat flour', '1 egg', '100ml almond milk', '50g blueberries', '1/2 tsp cinnamon'],
        instructions: ['Whisk buckwheat flour, egg, milk, and cinnamon together into a batter.', 'Gently fold in the fresh blueberries.', 'Cook small spoonfuls in a lightly oiled pan until golden brown on both sides.']
      },
      { 
        title: 'Smoked Salmon Frittata', 
        benefit: 'High-Dose Brain Nourishment', 
        icon: <Info className="text-[#f28d35]" />,
        ingredients: ['3 eggs', '50g smoked salmon', '50g asparagus tips', '1 tbsp fresh dill'],
        instructions: ['Whisk the eggs in a bowl with the fresh dill.', 'Lightly sauté asparagus tips in an oven-proof pan.', 'Pour the eggs into the pan and layer the salmon on top.', 'Cook gently until the bottom sets, then finish under the grill.']
      }
    ],
    lunch: [
      { 
        title: 'Quinoa & Beetroot Salad', 
        benefit: 'Liver Detoxification', 
        ingredients: ['100g cooked quinoa', '1 medium beetroot', '1/2 avocado', 'Handful rocket', 'Ginger-lemon dressing'],
        instructions: ['Ensure quinoa is cooked and cooled.', 'Slice the beetroot and avocado into bite-sized pieces.', 'Place rocket in a bowl and top with quinoa, beetroot, and avocado.', 'Whisk olive oil, lemon, and grated ginger to make the dressing.', 'Drizzle over the salad and toss gently.']
      },
      { 
        title: 'Red Lentil & Ginger Soup', 
        benefit: 'Easy Digestion', 
        ingredients: ['100g red lentils', '400ml veg stock', '2.5cm grated ginger', '1 tsp turmeric'],
        instructions: ['Rinse lentils thoroughly until the water runs clear.', 'Place lentils, stock, grated ginger, and turmeric in a pot.', 'Bring to a boil, then reduce heat and simmer for 20 minutes until lentils are soft.', 'For easier digestion, use a stick blender to cream the soup until smooth.']
      },
      { 
        title: 'Mackerel on Rye', 
        benefit: 'High Omega-3 Intake', 
        ingredients: ['1 tinned mackerel fillet', '2 slices rye bread', 'Handful rocket', '1 tsp apple cider vinegar'],
        instructions: ['Lightly toast the rye bread.', 'Flake the mackerel fillet (with its oil if using olive oil version) onto the toast.', 'In a small bowl, toss the rocket with apple cider vinegar.', 'Pile the dressed rocket on top of the fish.']
      },
      { 
        title: 'Hummus & Veg Wrap', 
        benefit: 'Plant Diversity', 
        ingredients: ['1 wholemeal wrap', '2 tbsp hummus', '100g roasted veg', 'Handful spinach'],
        instructions: ['Spread a thick layer of hummus over the centre of the wrap.', 'Arrange roasted vegetables (like peppers and courgettes) over the hummus.', 'Top with a generous handful of fresh spinach.', 'Fold in the sides and roll tightly. Slice in half to serve.']
      },
      { 
        title: 'Sardines & Bean Salad', 
        benefit: 'Bone Health & Sustained Focus', 
        icon: <Droplets className="text-[#f28d35]" />,
        ingredients: ['1 tin sardines in olive oil', '100g cannellini beans', '1/2 lemon (juiced)', '1 handful fresh parsley', '1/4 red onion (finely chopped)'],
        instructions: ['Rinse the beans and finely chop the parsley and red onion.', 'Mix the beans, onion, and parsley in a serving bowl.', 'Top with sardines and dress with lemon juice and a little of the sardine oil.']
      },
      { 
        title: 'Turmeric Cauliflower Bowl', 
        benefit: 'Low-Carb Systemic Cleanse', 
        icon: <Sparkles className="text-[#f28d35]" />,
        ingredients: ['150g cauliflower rice', '30g chopped walnuts', '2 tbsp pomegranate seeds', '1 handful spinach', '1/2 tsp turmeric'],
        instructions: ['Sauté cauliflower rice in a pan with turmeric and a little olive oil for 4 minutes.', 'Stir in the spinach until just wilted.', 'Transfer to a bowl and top with walnuts and pomegranate seeds.']
      },
      { 
        title: 'Sweet Potato & Black Bean Soup', 
        benefit: 'Heart Health & Circulation', 
        icon: <Sun className="text-[#f28d35]" />,
        ingredients: ['1 medium sweet potato (diced)', '100g black beans', '400ml veg stock', '1/2 tsp cumin', '1/2 tsp coriander'],
        instructions: ['Simmer diced sweet potato in stock with the cumin and coriander for 15 minutes.', 'Stir in the black beans and heat through.', 'For a creamier texture, blend half of the soup and mix it back in.']
      },
      { 
        title: 'Green Goddess Chicken Wrap', 
        benefit: 'Lean Muscle & Joint Lubrication', 
        icon: <Leaf className="text-[#f28d35]" />,
        ingredients: ['1 spinach wrap', '100g poached chicken breast', '1/2 avocado', '1 handful fresh basil', '1 tbsp olive oil'],
        instructions: ['Blend the avocado, fresh basil, and olive oil to make a thick dressing.', 'Shred the poached chicken and mix it thoroughly with the dressing.', 'Spoon the mixture into the spinach wrap and roll tightly.']
      }
    ],
    dinner: [
      { 
        title: 'Baked Salmon & Sweet Potato', 
        benefit: 'Heart & Skin Health', 
        ingredients: ['1 salmon fillet', '1 sweet potato', '100g broccoli', 'Lemon & olive oil'],
        instructions: ['Preheat oven to 200°C.', 'Cut sweet potato into thin wedges, toss in olive oil, and bake for 10 mins.', 'Add the salmon fillet to the tray, seasoned with lemon and oregano.', 'Bake both for a further 12-15 minutes.', 'Steam the broccoli separately for 4 minutes and serve together.']
      },
      { 
        title: 'Chickpea Sunshine Curry', 
        benefit: 'Systemic Relief', 
        ingredients: ['200g chickpeas', '100ml light coconut milk', 'Turmeric/Cumin/Coriander', '2.5cm ginger', 'Spinach'],
        instructions: ['Sauté minced ginger and dry spices in a pan with a little oil for 1 minute.', 'Add drained chickpeas and coconut milk.', 'Simmer on low for 10-15 minutes to let flavours meld.', 'Stir in fresh spinach right at the end until it just wilts. Serve with brown rice.']
      },
      { 
        title: 'Turkey & Ginger Stir-fry', 
        benefit: 'Lean Muscle & Pain Relief', 
        ingredients: ['150g turkey strips', '100g mixed veg', '2.5cm fresh ginger', '1 clove garlic', '1 tbsp tamari'],
        instructions: ['Heat oil in a wok or large pan over high heat.', 'Stir-fry turkey strips with garlic and ginger until cooked through.', 'Add mixed vegetables and toss for 3-4 minutes until tender-crisp.', 'Add tamari sauce and stir well before serving.']
      },
      { 
        title: 'Cod with Garlic & Parsley', 
        benefit: 'Gentle Digestion', 
        ingredients: ['150g cod fillet', '1 clove garlic', '1 tbsp fresh parsley', '100g baby potatoes', '100g green beans'],
        instructions: ['Boil baby potatoes for 12-15 mins until tender.', 'Place cod on a piece of baking foil.', 'Top with minced garlic, chopped parsley, lemon juice, and olive oil.', 'Fold foil into a parcel and bake at 180°C for 12-15 mins.', 'Steam green beans for the last 5 mins and serve.']
      },
      { 
        title: 'Turmeric Lemon Chicken', 
        benefit: 'Post-Workout Healing', 
        icon: <Zap className="text-[#f28d35]" />,
        ingredients: ['150g chicken breast', '1/2 lemon', '1 tsp turmeric', '1 medium courgette (chopped)', '1 tbsp olive oil'],
        instructions: ['Marinate the chicken in lemon juice, turmeric, and olive oil for 15 minutes.', 'Place chicken and chopped courgette on a baking tray.', 'Roast at 200°C for 25 minutes until chicken is cooked through.']
      },
      { 
        title: 'Walnut & Lentil Bolognese', 
        benefit: 'Plant-Based Cellular Renewal', 
        icon: <Leaf className="text-[#f28d35]" />,
        ingredients: ['100g cooked brown lentils', '50g crushed walnuts', '200g crushed tomatoes', '1 medium courgette (spiralised)', '1 clove garlic'],
        instructions: ['Sauté minced garlic in a pan, then add lentils, walnuts, and crushed tomatoes.', 'Simmer the sauce for 15 minutes to thicken.', 'Serve hot over raw or lightly blanched courgetti (zucchini noodles).']
      },
      { 
        title: 'Miso Glazed Black Cod', 
        benefit: 'Deep Hydration & Reduced Swelling', 
        icon: <Sparkles className="text-[#f28d35]" />,
        ingredients: ['150g cod fillet', '1 tbsp miso paste', '1 tsp grated ginger', '100g bok choy', '1 tsp sesame oil'],
        instructions: ['Mix the miso paste and ginger, then spread evenly over the cod fillet.', 'Bake the cod at 200°C for 12-15 minutes.', 'Lightly steam the bok choy and drizzle with sesame oil to serve on the side.']
      },
      { 
        title: 'Anti-Inflammatory Veggie Stew', 
        benefit: 'Microbiome Diversity & Comfort', 
        icon: <Info className="text-[#f28d35]" />,
        ingredients: ['1/2 aubergine (diced)', '200g crushed tomatoes', '100g chickpeas', '1 clove garlic', '1 tbsp extra virgin olive oil'],
        instructions: ['Sauté the diced aubergine and garlic in olive oil until soft.', 'Pour in the crushed tomatoes and add the chickpeas.', 'Cover and simmer for 20 minutes until rich and thick.']
      }
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

  const activeCategoryData = categories.find(c => c.id === activeTab);

  return (
    <div className="min-h-screen relative font-body text-[#1a1a1a] overflow-x-hidden selection:bg-[#f28d35]/30">
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

      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center space-x-3 text-[#e8e7e7] font-heading font-black text-2xl tracking-tighter uppercase"
          >
            <Leaf className="w-8 h-8 text-[#f28d35]" />
            <span className="inline">The Kitchen Hub</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <select 
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="bg-[#e8e7e7] border-none rounded-xl px-4 py-2.5 text-sm font-black focus:ring-2 focus:ring-[#f28d35] md:hidden font-heading text-[#1a1a1a]"
            >
              <option value="home">HOME</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
              ))}
            </select>

            <div className="hidden md:flex items-center space-x-1">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all font-heading ${
                    activeTab === cat.id 
                    ? 'bg-[#f28d35] text-[#1a1a1a] shadow-xl shadow-[#f28d35]/30' 
                    : 'text-[#e8e7e7] hover:text-[#f28d35] hover:bg-white/5'
                  }`}
                >
                  {cat.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-16">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-1000">
            {/* Home Hero Section */}
            <section className="flex flex-col items-center justify-center text-center pt-16 pb-8 md:pt-24 md:pb-12 px-4">
              <div className="inline-flex items-center space-x-3 bg-[#1a1a1a] text-[#f28d35] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.25em] mb-8 shadow-2xl font-heading">
                <Sparkles className="w-4 h-4" />
                <span>Anti-Inflammatory Kitchen</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-[#1a1a1a] mb-6 tracking-tighter font-heading leading-[0.9]">
                Eat to <span className="text-[#f28d35]">Heal.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#1a1a1a] font-bold max-w-2xl mx-auto font-body opacity-80">
                Harness the power of natural ingredients to boost immunity and reclaim your vitality.
              </p>
            </section>

            {/* Mobile Carousel - Wider cards */}
            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-4 pb-8 px-2 md:px-0">
              {categories.slice(0, 4).map(cat => (
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

            {/* Slim Ingredients Button under Carousel */}
            <div className="flex justify-center mt-6 md:mt-10">
                <button 
                  onClick={() => setActiveTab('ingredients')} 
                  className="bg-[#1a1a1a] text-[#e8e7e7] px-8 py-3 rounded-2xl font-black shadow-2xl hover:bg-[#252525] hover:-translate-y-1 transition-all text-sm font-heading tracking-[0.1em] uppercase"
                >
                  VIEW MASTER INGREDIENTS
                </button>
            </div>
          </div>
        )}

        {['smoothies', 'breakfast', 'lunch', 'dinner', 'ingredients'].includes(activeTab) && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-600 pt-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 border-l-[10px] border-[#f28d35] pl-8 md:pl-10 mx-2 md:mx-0">
              <div className="max-w-2xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-[#1a1a1a] shadow-xl border border-white/10 text-[#f28d35]`}>
                    {activeCategoryData?.icon}
                  </div>
                  <span className="text-[#1a1a1a] font-black uppercase tracking-[0.4em] text-xs font-heading opacity-40">Science-Backed Collection</span>
                </div>
                <h2 className="text-6xl md:text-8xl font-black text-[#1a1a1a] capitalize tracking-tighter font-heading mb-8 leading-none">{activeTab}</h2>
                <p className="text-[#1a1a1a] font-bold text-xl md:text-2xl leading-relaxed font-body opacity-70">{activeCategoryData?.description}</p>
              </div>
            </header>

            {activeTab === 'ingredients' ? (
              <article className="bg-[#e8e7e7]/80 backdrop-blur-3xl rounded-[4rem] p-10 md:p-14 shadow-2xl border border-white mx-2 md:mx-0">
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
              <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-2 md:gap-12 pb-8 px-2 md:px-0">
                {data[activeTab].map((item, idx) => (
                  <article key={idx} className="flex-shrink-0 w-[85vw] md:w-auto snap-center bg-[#1a1a1a]/85 backdrop-blur-xl rounded-[3rem] md:rounded-[4rem] p-8 md:p-12 shadow-2xl border border-white/10 flex flex-col h-full hover:shadow-[#f28d35]/10 hover:-translate-y-3 transition-all duration-500">
                    <div className="flex justify-between items-start mb-8 md:mb-10">
                      <h3 className="text-3xl md:text-4xl font-black text-[#e8e7e7] leading-tight font-heading tracking-tighter">{item.title}</h3>
                      <div className="p-4 md:p-5 bg-[#f28d35] rounded-2xl md:rounded-3xl text-[#1a1a1a] shadow-2xl ml-4">{item.icon || <Info className="text-[#1a1a1a]" />}</div>
                    </div>
                    
                    <div className="flex items-center text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] bg-[#f28d35] px-4 md:px-6 py-2 md:py-3 rounded-full w-fit mb-8 md:mb-12 font-heading shadow-lg shadow-[#f28d35]/20">
                      <Info className="w-4 h-4 mr-2.5" />
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
                      className="w-full py-5 md:py-6 bg-white/5 text-[#f28d35] border-2 border-[#f28d35] text-base md:text-lg font-black rounded-[1.5rem] md:rounded-3xl hover:bg-[#f28d35] hover:text-[#1a1a1a] shadow-2xl transition-all flex items-center justify-center active:scale-95 font-heading tracking-tighter"
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

      {/* COMPACT & NON-STACKED FOOTER */}
      <footer className="relative z-10 py-12 px-6 bg-transparent border-t border-[#1a1a1a]/10">
        <div className="max-w-5xl mx-auto flex flex-row flex-wrap items-center justify-between gap-6">
          <div className="flex items-center space-x-3 text-[#1a1a1a] font-heading font-black text-xl tracking-tighter">
            <Leaf className="w-7 h-7 text-[#f28d35]" />
            <span>The Kitchen Hub</span>
          </div>
          
          <nav className="flex flex-row flex-wrap gap-x-6 gap-y-2">
            <button onClick={() => setActiveTab('home')} className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:text-[#f28d35] transition-all font-heading opacity-60 hover:opacity-100">HOME</button>
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id)}
                className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] hover:text-[#f28d35] transition-all font-heading opacity-60 hover:opacity-100"
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </nav>

          <p className="hidden lg:block text-[10px] text-[#1a1a1a] font-black uppercase tracking-[0.4em] font-heading opacity-30">
            Functional Recovery
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;