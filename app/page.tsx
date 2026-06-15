"use client";

import { useState, useEffect, useRef } from "react";

// --- 1. الأنواع (Types) ---
type CategoryType = "all" | "shirts" | "hoodies" | "jackets" | "pants" | "shoes" | "accessories" | "offers";
type Product = { id: number; name: string; price: number; image: string; description: string; category: CategoryType; };
type CartItem = Product & { quantity: number };

// --- 2. البيانات ---
const whatsappNumber = "201287254329";

const categories = [
  { id: "all", name: "كل المنتجات" },
  { id: "shirts", name: "قمصان وتيشرتات" },
  { id: "hoodies", name: "هوديز وسويت شيرت" },
  { id: "jackets", name: "جواكيت ومعاطف" },
  { id: "pants", name: "بنطلونات وشورتات" },
  { id: "shoes", name: "أحذية" },
  { id: "accessories", name: "إكسسوارات" },
];

const products: Product[] = [
  { id: 4, name: "قميص أبيض أوكسفورد", price: 499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80", description: "قميص كلاسيكي أبيض بخامة الأوكسفورد الثقيلة.", category: "shirts" },
  { id: 14, name: "هودي أوفرسايز عصري", price: 799, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80", description: "هودي مريح جداً بقصة فضفاضة ومبطن من الداخل.", category: "hoodies" },
  { id: 21, name: "جاكيت جلد بريميوم", price: 1499, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80", description: "جاكيت جلد كاجوال بتصميم راكب الدراجات (Biker).", category: "jackets" },
  { id: 29, name: "بنطلون تشينو كلاسيك بيج", price: 549, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80", description: "بنطلون مريح بخامة قطنية متينة.", category: "pants" },
  { id: 37, name: "حذاء سنيكرز أبيض فاخر", price: 899, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80", description: "حذاء رياضي خفيف الوزن بنعل مريح.", category: "shoes" },
  { id: 45, name: "ساعة كوارتز سوداء", price: 1200, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", description: "ساعة يد كلاسيكية أنيقة.", category: "accessories" },
];

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]); // قائمة المفضلة
  const [cartOpen, setCartOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeout = useRef<NodeJS.Timeout | null>(null);

  // منطق الوضع الليلي
  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  // منطق السلة
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      return existing 
        ? prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...prev, { ...product, quantity: 1 }];
    });
    setToast(`تمت إضافة "${product.name}" للسلة!`);
    if (toastTimeout.current) clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToast(null), 2000);
  };

  // منطق المفضلة
  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const filtered = activeCategory === "all" ? products : products.filter(p => p.category === activeCategory);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans" dir="rtl">
      
      {/* إشعار الـ Toast */}
      {toast && (
        <div className="fixed top-20 left-0 right-0 z-[100] flex justify-center px-4">
          <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-full shadow-xl font-bold animate-bounce text-sm">
            {toast}
          </div>
        </div>
      )}

      {/* الهيدر */}
      <header className="sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-40 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-extrabold tracking-tight">3l_nagar <span className="text-green-600">Clothing</span></h1>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsDark(!isDark)} className="p-2 rounded-full bg-slate-100 dark:bg-gray-800 transition">
              {isDark ? "☀️" : "🌙"}
            </button>
            <div className="relative p-2">❤️ <span className="text-xs bg-red-500 text-white rounded-full px-1.5">{favorites.length}</span></div>
            <button onClick={() => setCartOpen(true)} className="relative p-2 hover:bg-slate-100 dark:hover:bg-gray-800 rounded-full transition">
              🛒
              {cart.length > 0 && <span className="absolute top-0 right-0 bg-green-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cart.reduce((a,b)=>a+b.quantity,0)}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* المحتوى */}
      <section className="py-12 px-6">
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-medium transition ${activeCategory === cat.id ? "bg-green-600 text-white" : "bg-white dark:bg-gray-900 border dark:border-gray-800 hover:bg-slate-100 dark:hover:bg-gray-800"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {filtered.map((p) => (
            <div key={p.id} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg transition relative">
              {/* زر المفضلة */}
              <button 
                onClick={() => toggleFavorite(p.id)}
                className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-sm transition ${favorites.includes(p.id) ? "bg-red-500 text-white" : "bg-white/80 dark:bg-gray-800/80 text-gray-400"}`}
              >
                ❤️
              </button>
              <img src={p.image} alt={p.name} className="w-full h-60 object-cover" />
              <div className="p-4">
                <h4 className="font-bold mb-1">{p.name}</h4>
                <p className="text-green-600 font-bold mb-4">{p.price} جنيه</p>
                <button onClick={() => addToCart(p)} className="w-full bg-gray-900 dark:bg-gray-50 text-white dark:text-gray-900 py-2.5 rounded-lg font-bold">أضف للسلة</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* نافذة السلة */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setCartOpen(false)}>
          <div className="bg-white dark:bg-gray-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
             <h3 className="font-bold text-xl mb-4">سلة المشتريات</h3>
             <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-slate-50 dark:bg-gray-800 p-3 rounded-xl text-sm">
                        <span>{item.name} (x{item.quantity})</span>
                        <span className="font-bold">{item.price * item.quantity} ج</span>
                    </div>
                ))}
             </div>
             <div className="flex justify-between font-bold text-lg mb-6"><span>الإجمالي:</span> <span>{total} جنيه</span></div>
             <a href={`https://wa.me/${whatsappNumber}`} className="block text-center bg-green-600 text-white py-4 rounded-xl font-bold">إتمام الطلب (واتساب)</a>
          </div>
        </div>
      )}
    </main>
  );
}

