"use client";

import { useState, useEffect } from "react";

// --- Types ---
type Category = "shirts" | "hoodies" | "jackets" | "pants" | "shoes" | "accessories";
type Product = { id: number; name: string; price: number; image: string; description: string; category: Category; };
type CartItem = Product & { quantity: number };

// --- Products Data (نفس البيانات السابقة) ---
const products: Product[] = [
  { id: 101, name: "قميص أبيض أوكسفورد", price: 499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c", description: "خامة أوكسفورد ثقيلة كلاسيكية مريحة جداً في الصيف والشتاء.", category: "shirts" },
  { id: 102, name: "تيشرت بيزك قطن", price: 249, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518", description: "تيشرت قطني 100% ناعم على البشرة بتصميم بسيط.", category: "shirts" },
  // ... (بقية الـ 50 منتج كما هي في القائمة السابقة)
  { id: 610, name: "ساعة رقمية", price: 550, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", description: "ساعة رياضية متطورة مقاومة للماء مع تتبع للنشاط.", category: "accessories" }
];

export default function Shop() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1000);
  };

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation(); // عشان ميتفتحش المودال لما تدوس إضافة
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id);
      return exists ? prev.map(i => i.id === product.id ? {...i, quantity: i.quantity + 1} : i) : [...prev, {...product, quantity: 1}];
    });
    showToast(`تم إضافة ${product.name} للسلة`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`} dir="rtl">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white px-6 py-3 rounded-full shadow-xl font-bold">
          {toast}
        </div>
      )}

      {/* Modal Popup */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)} // الضغط على الخلفية يقفل
        >
          <div 
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 max-w-lg w-full relative shadow-2xl"
            onClick={(e) => e.stopPropagation()} // الضغط جوه المودال مبيقفلش
          >
            <button 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 left-4 text-gray-500 hover:text-black dark:hover:text-white"
            >✕</button>
            <img src={selectedProduct.image} className="w-full h-64 object-cover rounded-2xl mb-4" />
            <h2 className="text-2xl font-bold mb-2">{selectedProduct.name}</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{selectedProduct.description}</p>
            <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{selectedProduct.price} ج.م</span>
                <button onClick={(e) => addToCart(selectedProduct, e)} className="bg-black dark:bg-white text-white dark:text-black px-8 py-3 rounded-xl font-bold">
                    إضافة للسلة
                </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <nav className="sticky top-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-40 border-b dark:border-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">3l_nagar Store</h1>
            <div className="flex gap-4">
                <button onClick={() => setDarkMode(!darkMode)} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    {darkMode ? '☀️' : '🌙'}
                </button>
                <div className="text-xl">🛒 {cart.reduce((a, b) => a + b.quantity, 0)}</div>
            </div>
        </div>
      </nav>

      {/* Product Grid */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div 
              key={p.id} 
              onClick={() => setSelectedProduct(p)} // فتح المودال عند الضغط
              className="cursor-pointer group bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="h-56 overflow-hidden">
                <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                <p className="text-sm text-gray-500 mb-3 truncate">{p.description}</p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">{p.price} ج.م</span>
                    <button onClick={(e) => addToCart(p, e)} className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold">
                        أضف
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
