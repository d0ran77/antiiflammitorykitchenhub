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
      color: 'bg-[#f28d35]/10 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'Refreshing, nutrient-dense blends to start your day or refuel.'
    },
    { 
      id: 'breakfast', 
      name: 'Breakfast', 
      icon: <Coffee className="w-5 h-5" />, 
      color: 'bg-[#f28d35]/10 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'Fuel your morning with high-protein and gut-friendly options.'
    },
    { 
      id: 'lunch', 
      name: 'Lunch', 
      icon: <Sun className="w-5 h-5" />, 
      color: 'bg-[#f28d35]/10 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'Light yet satisfying meals to maintain steady energy levels.'
    },
    { 
      id: 'dinner', 
      name: 'Dinner', 
      icon: <Moon className="w-5 h-5" />, 
      color: 'bg-[#f28d35]/10 text-[#f28d35]',
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800&h=1200',
      description: 'Nourishing evening meals rich in Omega-3s and minerals.'
    },
    { 
      id: 'ingredients', 
      name: 'Ingredients', 
      icon: <ShoppingBasket className="w-5 h-5" />, 
      color: 'bg-[#f28d35]/10 text-[#f28d35]',
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
      }
    ]
  };

  const IngredientSection = ({ title, items }) => (
    <div className="mb-12">
      <h3 className="text-xl font-black text-[#1a1a1a] mb-6 border-b-4 border-[#f28d35] pb-2 font-heading tracking-tight inline-block uppercase">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-4 text-[#1a1a1a] bg-[#1a1a1a]/5 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-sm transition-transform hover:scale-105">
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

      {/* FIXED GLOBAL BACKGROUND */}
      <div 
        className="fixed inset-0 z-[-1]"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#e8e7e7]/65 backdrop-blur-[10px]"></div>
      </div>

      <nav className="sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-2xl border-b border-white/10 shadow-lg">
        <div className="max-w-5xl mx-auto px-4 h-20 flex items-center justify-between">
          <button onClick={() => setActiveTab('home')} className="flex items-center space-x-3 text-[#e8e7e7] font-heading font-black text-2xl tracking-tighter uppercase">
            <Leaf className="w-8 h-8 text-[#f28d35]" />
            <span className="hidden sm:inline">The Kitchen Hub</span>
          </button>
          <div className="hidden md:flex items-center space-x-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-[10px] font-black tracking-widest transition-all font-heading ${
                  activeTab === cat.id 
                  ? 'bg-[#f28d35] text-[#1a1a1a] shadow-xl shadow-[#f28d35]/30' 
                  : 'text-[#e8e7e7] hover:text-[#f28d35]'
                }`}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 pb-16">
        {activeTab === 'home' && (
          <div className="animate-in fade-in duration-1000">
            <section className="min-h-[50vh] flex flex-col items-center justify-center text-center py-20">
              <div className="inline-flex items-center space-x-3 bg-[#1a1a1a] text-[#f28d35] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-[0.25em] mb-10 shadow-2xl font-heading">
                <Sparkles className="w-4 h-4" />
                <span>Modern Healing Cuisine</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-[#1a1a1a] mb-10 tracking-tighter font-heading leading-[0.9] uppercase">
                Eat to <span className="text-[#f28d35]">Heal.</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#1a1a1a] font-bold max-w-2xl mx-auto mb-16 font-body opacity-80 leading-relaxed">
                Harness the power of natural ingredients to boost immunity, reduce systemic pain, and reclaim your daily vitality.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button onClick={() => setActiveTab('smoothies')} className="bg-[#f28d35] text-[#1a1a1a] px-14 py-6 rounded-3xl font-black shadow-2xl hover:bg-[#e67a21] hover:-translate-y-1.5 transition-all flex items-center text-xl font-heading uppercase tracking-tighter">
                  GET RECIPES <ChevronRight className="ml-2 w-7 h-7" />
                </button>
                <button onClick={() => setActiveTab('ingredients')} className="bg-[#1a1a1a] text-[#e8e7e7] px-14 py-6 rounded-3xl font-black shadow-2xl hover:-translate-y-1.5 transition-all text-xl font-heading uppercase tracking-tighter">
                  INGREDIENTS
                </button>
              </div>
            </section>

            {/* Mobile Swipeable Carousel */}
            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 md:grid md:grid-cols-4 pb-10 px-2 md:px-0">
              {categories.slice(0, 4).map(cat => (
                <button 
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className="flex-shrink-0 w-[85vw] md:w-auto group relative bg-[#1a1a1a] rounded-[3.5rem] shadow-2xl snap-center transition-all border border-white/5 text-left overflow-hidden h-[26rem] hover:-translate-y-2"
                >
                  <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[30%] group-hover:scale-110 transition-all duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/20 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-10 text-[#e8e7e7]">
                    <div className="w-14 h-14 bg-[#f28d35] rounded-2xl flex items-center justify-center mb-6 shadow-xl text-[#1a1a1a]">
                      {cat.icon}
                    </div>
                    <h3 className="font-black text-4xl mb-2 font-heading tracking-tighter uppercase">{cat.name}</h3>
                    <p className="text-[#f28d35] text-[10px] font-black uppercase tracking-[0.2em] font-heading">Digital Collection</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {['smoothies', 'breakfast', 'lunch', 'dinner', 'ingredients'].includes(activeTab) && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-600 pt-20">
            <header className="mb-20 border-l-[12px] border-[#f28d35] pl-10 max-w-3xl">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-4 rounded-2xl bg-[#1a1a1a] shadow-xl text-[#f28d35]">
                  {activeCategoryData?.icon}
                </div>
                <span className="text-[#1a1a1a]/40 font-black uppercase tracking-[0.4em] text-xs font-heading">Digital Collection</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-black text-[#1a1a1a] capitalize tracking-tighter font-heading leading-none mb-8">
                {activeTab}
              </h2>
              <p className="text-2xl font-bold text-[#1a1a1a]/70 leading-relaxed font-body">
                {activeCategoryData?.description}
              </p>
            </header>

            {activeTab === 'ingredients' ? (
              <article className="bg-[#1a1a1a]/5 backdrop-blur-3xl rounded-[4rem] p-10 md:p-14 border border-white/50 shadow-2xl">
                <IngredientSection title="🍎 Fruits & Berries" items={['Blueberries', 'Raspberries', 'Avocado', 'Lemon', 'Papaya', 'Pineapple', 'Tart Cherries']} />
                <IngredientSection title="🥦 Vegetables & Greens" items={['Spinach', 'Rocket', 'Baby Kale', 'Beetroot', 'Sweet Potato', 'Broccoli', 'Asparagus', 'Garlic', 'Ginger']} />
                <IngredientSection title="🐟 Proteins" items={['Salmon', 'Mackerel', 'Cod', 'Turkey Breast', 'Free-range Eggs', 'Firm Tofu']} />
                <IngredientSection title="🫘 Pantry" items={['Jumbo Rolled Oats', 'Quinoa', 'Red Split Lentils', 'Chickpeas', 'Sourdough or Rye']} />
                <IngredientSection title="🌿 Boosters & Oils" items={['Turmeric', 'Chia & Flaxseeds', 'Hemp Hearts', 'Walnuts', 'Extra Virgin Olive Oil', 'Aloe Vera Juice']} />
              </article>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {data[activeTab].map((item, idx) => (
                  <article key={idx} className="bg-[#1a1a1a]/90 backdrop-blur-xl rounded-[4rem] p-10 shadow-2xl border border-white/10 flex flex-col h-full hover:shadow-[#f28d35]/20 hover:-translate-y-2 transition-all duration-500">
                    <div className="flex justify-between items-start mb-8">
                      <h3 className="text-4xl font-black text-[#e8e7e7] leading-tight font-heading tracking-tighter uppercase">{item.title}</h3>
                      <div className="p-5 bg-[#f28d35] rounded-3xl text-[#1a1a1a] shadow-xl">{item.icon}</div>
                    </div>
                    <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-[#1a1a1a] bg-[#f28d35] px-6 py-3 rounded-full w-fit mb-10 font-heading">
                      <Info className="w-4 h-4 mr-2" /> {item.benefit}
                    </div>
                    <div className="mb-12 flex-grow">
                      <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-6 font-heading">The Ingredients</h4>
                      <ul className="space-y-4">
                        {item.ingredients.map((ing, i) => (
                          <li key={i} className="text-[#e8e7e7] text-lg font-bold flex items-center font-body opacity-80">
                            <div className="w-2.5 h-2.5 bg-[#f28d35] rounded-full mr-5"></div> {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button onClick={() => setSelectedRecipe(item)} className="w-full py-6 bg-white/5 text-[#f28d35] border-2 border-[#f28d35] text-lg font-black rounded-3xl hover:bg-[#f28d35] hover:text-[#1a1a1a] transition-all font-heading tracking-tighter uppercase">
                      View Method
                    </button>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {selectedRecipe && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-[#1a1a1a]/80 backdrop-blur-2xl" onClick={() => setSelectedRecipe(null)}></div>
          <div className="relative bg-[#e8e7e7] w-full max-w-3xl rounded-[5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border-4 border-[#1a1a1a]">
            <div className="p-10 sm:p-14 border-b-2 border-[#1a1a1a]/10 flex justify-between items-center bg-white/50">
              <h3 className="text-4xl sm:text-5xl font-black text-[#1a1a1a] tracking-tighter font-heading uppercase">{selectedRecipe.title}</h3>
              <button onClick={() => setSelectedRecipe(null)} className="p-5 bg-[#1a1a1a] text-[#f28d35] rounded-3xl transition-all shadow-2xl active:scale-90">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="p-10 sm:p-14 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <h4 className="text-[#1a1a1a]/40 font-black uppercase text-xs tracking-[0.5em] mb-12 flex items-center font-heading">
                <Utensils className="w-5 h-5 mr-4" /> THE COOKING METHOD
              </h4>
              <div className="space-y-12 mb-16">
                {selectedRecipe.instructions.map((step, idx) => (
                  <div key={idx} className="flex space-x-10">
                    <div className="flex-shrink-0 w-16 h-16 rounded-[2rem] bg-[#1a1a1a] text-[#f28d35] flex items-center justify-center font-black text-3xl shadow-xl font-heading">
                      {idx + 1}
                    </div>
                    <p className="text-[#1a1a1a] text-2xl leading-relaxed font-bold pt-1 font-body">{step}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#1a1a1a] text-[#f28d35] rounded-[3.5rem] p-12 shadow-2xl">
                <h4 className="text-white/20 font-black uppercase text-[10px] tracking-[0.4em] mb-5 font-heading">Therapeutic Benefit</h4>
                <p className="text-2xl font-black flex items-start leading-snug font-heading tracking-tight uppercase">
                  <Info className="w-8 h-8 mr-5 text-white mt-0.5" /> {selectedRecipe.benefit}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="relative z-10 py-16 px-4 border-t border-[#1a1a1a]/10 text-center">
        <div className="flex justify-center items-center space-x-3 text-[#1a1a1a] font-heading font-black text-2xl tracking-tighter mb-10">
          <Leaf className="w-8 h-8 text-[#f28d35]" />
          <span>THE KITCHEN HUB</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-10">
          <button onClick={() => setActiveTab('home')} className="text-xs font-black uppercase tracking-[0.4em] text-[#1a1a1a]/40 hover:text-[#f28d35] font-heading">HOME</button>
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)} className="text-xs font-black uppercase tracking-[0.4em] text-[#1a1a1a]/40 hover:text-[#f28d35] font-heading">
              {cat.name.toUpperCase()}
            </button>
          ))}
        </nav>
        <p className="text-[10px] text-[#1a1a1a]/30 font-black uppercase tracking-[0.4em] font-heading">
          Precision Nutrition • Functional Recipes • Natural Recovery
        </p>
      </footer>
    </div>
  );
};

export default App;