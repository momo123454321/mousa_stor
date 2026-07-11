"use client";

import { useState, useMemo } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: "shirts" | "hoodies" | "jackets" | "pants" | "shoes" | "accessories";
};

export default function Home() {
  const whatsappNumber = "201287254329";

  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = [
    { id: "all", name: "كل المنتجات" },
    { id: "shirts", name: "قمصان وتيشرتات" },
    { id: "hoodies", name: "هوديز وسويت شيرت" },
    { id: "jackets", name: "جواكيت ومعاطف" },
    { id: "pants", name: "بنطلونات وشورتات" },
    { id: "shoes", name: "أحذية وسنيكرز" },
    { id: "accessories", name: "إكسسوارات وعناية" },
  ];

  // --- مصفوفة الـ 150 منتج ---
  const products: Product[] = [
    // --- فئة Shirts (25 منتج) ---
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `قميص أو تيشرت موديل ${i + 1}`,
      price: 200 + (i * 20),
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      description: "قطعة أساسية عالية الجودة تناسب جميع الأوقات وتوفر راحة تامة.",
      category: "shirts" as const
    })),
    // --- فئة Hoodies (25 منتج) ---
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 26,
      name: `هودي سويت شيرت ${i + 1}`,
      price: 400 + (i * 30),
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      description: "تصميم عصري يوفر دفء فائق وخامة قطنية ناعمة ومريحة.",
      category: "hoodies" as const
    })),
    // --- فئة Jackets (25 منتج) ---
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 51,
      name: `جاكيت أنيق ${i + 1}`,
      price: 800 + (i * 50),
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      description: "جاكيت ذو تصميم فريد يحميك من البرد ويضفي لمسة أناقة على مظهرك.",
      category: "jackets" as const
    })),
    // --- فئة Pants (25 منتج) ---
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 76,
      name: `بنطلون جينز/كاجوال ${i + 1}`,
      price: 300 + (i * 25),
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
      description: "بنطلون مريح ومتين، مناسب للعمل والمشاوير اليومية.",
      category: "pants" as const
    })),
    // --- فئة Shoes (25 منتج) ---
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 101,
      name: `حذاء/سنيكرز ${i + 1}`,
      price: 600 + (i * 40),
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
      description: "حذاء طبي مريح بتصميم عصري يجمع بين الرياضة والأناقة.",
      category: "shoes" as const
    })),
    // --- فئة Accessories (25 منتج) ---
    ...Array.from({ length: 25 }, (_, i) => ({
      id: i + 126,
      name: `إكسسوار/ساعة ${i + 1}`,
      price: 150 + (i * 15),
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      description: "إكسسوار مميز يضيف لمسة خاصة إلى مظهرك العام.",
      category: "accessories" as const
    })),
  ];

  // باقي الدوال (Cart, Filtering, Sorting)
  const offers: Omit<Product, "category">[] = [
    { id: 999, name: "عرض الصيف", price: 599, image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=600&q=80", description: "طقم كاجوال صيفي مريح." },
    { id: 998, name: "عرض الشتاء", price: 1299, image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&q=80", description: "طقم كلاسيك أنيق." },
  ];

  const addToCart = (item: Product | Omit<Product, "category">) => {
    const formattedItem = { ...item, category: (item as Product).category || "shirts" } as Product;
    setCart((prev) => [...prev, formattedItem]);
    setToastMessage(`تمت إضافة "${item.name}" للسلة!`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const toggleFavorite = (id: number, name: string) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      setToastMessage(`تمت الإزالة من المفضلة`);
    } else {
      setFavorites((prev) => [...prev, id]);
      setToastMessage(`تمت الإضافة للمفضلة`);
    }
    setTimeout(() => setToastMessage(null), 2000);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const filteredAndSortedProducts = useMemo(() => {
    let result = activeCategory === "all" ? [...products] : products.filter(p => p.category === activeCategory);
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery));
    }
    if (sortBy === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <main dir="rtl" className={`min-h-screen font-sans pb-20 ${darkMode ? "bg-slate-950 text-white" : "bg-slate-50 text-gray-900"}`}>
      {/* (باقي الكود كما هو بنفس التصميم الخاص بك، فقط تأكد من دمج مصفوفة المنتجات أعلاه في ملفك) */}
      
      {/* مثال بسيط لطريقة عرض المنتجات */}
      <div className="p-10">
        <h2 className="text-3xl font-bold mb-6">كل المنتجات ({products.length})</h2>
        <div className="grid grid-cols-4 gap-4">
          {filteredAndSortedProducts.map(p => (
            <div key={p.id} className="p-4 border rounded shadow">
              <img src={p.image} className="w-full h-40 object-cover mb-2" />
              <h3 className="font-bold">{p.name}</h3>
              <p>{p.price} ج.م</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
