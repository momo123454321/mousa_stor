"use client";

import { useState, useRef } from "react";

// مكون مخصص لتطبيق تأثير الـ 3D التفاعلي مع حركة الماوس
function Interactive3DCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const box = card.getBoundingClientRect();
    
    // حساب موقع الماوس بالنسبة لمركز الكارت
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // حساب زوايا الدوران (حد أقصى 15 درجة للدوران العكسي والمباشر)
    const rotateX = -(y / (box.height / 2)) * 12;
    const rotateY = (x / (box.width / 2)) * 12;
    
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
  };

  const handleMouseLeave = () => {
    // إرجاع الكارت لوضعه الطبيعي بنعومة عند خروج الماوس
    setTransform("rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transform,
        transformStyle: "preserve-3d",
        transition: "transform 0.15s ease-out, shadow 0.3s ease",
      }}
      className={`perspective-3d ${className}`}
    >
      {children}
    </div>
  );
}

type Product = {
  id: number;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: "shirts" | "hoodies" | "jackets" | "pants" | "shoes" | "accessories";
};

export default function Home() {
  const whatsappNumber = "201287254329";

  // حالات التحكم
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // فئات الفلترة
  const categories = [
    { id: "all", name: "كل المنتجات" },
    { id: "shirts", name: "قمصان وتيشرتات" },
    { id: "hoodies", name: "هوديز وسويت شيرت" },
    { id: "jackets", name: "جواكيت ومعاطف" },
    { id: "pants", name: "بنطلونات وشورتات" },
    { id: "shoes", name: "أحذية وسنيكرز" },
    { id: "accessories", name: "إكسسوارات وعناية" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  // العروض الخاصة
  const offers: Omit<Product, "category">[] = [
    {
      id: 1,
      name: "عرض الصيف المتكامل",
      price: 599,
      images: [
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
      ],
      description: "طقم كاجوال صيفي مريح جداً خامة قطن ليكرا ممتازة، مثالي للخروجات اليومية.",
    },
    {
      id: 2,
      name: "طقم كلاسيك أنيق",
      price: 1299,
      images: [
        "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80"
      ],
      description: "بدلة شبه رسمية بتفصيل عصري وخامات تركية فاخرة تناسب مناسباتك السعيدة.",
    },
    {
      id: 3,
      name: "الباقة الشبابية المحدودة",
      price: 899,
      images: [
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
      ],
      description: "تجميعة مميزة من قطعتين بألوان متناسقة وعصرية توفر لك إطلالة جذابة ومختلفة.",
    },
  ];

  // قائمة المنتجات الكاملة بدون أي حذف
  const products: Product[] = [
    {
      id: 4,
      name: "قميص أبيض أوكسفورد",
      price: 450,
      images: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=600&q=80"
      ],
      description: "قميص كلاسيكي أبيض بخامة الأوكسفورد الثقيلة والمقاومة للتجعد، قطعة أساسية في دولابك.",
      category: "shirts"
    },
    {
      id: 5,
      name: "تيشرت بيزك أسود",
      price: 250,
      images: [
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
      ],
      description: "تيشرت قطن 100% مريح وعملي للاستخدام اليومي.",
      category: "shirts"
    },
    {
      id: 6,
      name: "هودي أوفر سايز رصاصي",
      price: 650,
      images: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1556821835-f09b307ec3fc?auto=format&fit=crop&w=600&q=80"
      ],
      description: "هودي شتوي ثقيل مبطن من الداخل، بتصميم أوفر سايز عصري.",
      category: "hoodies"
    },
    {
      id: 7,
      name: "سويت شيرت كحلي",
      price: 550,
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&w=600&q=80"
      ],
      description: "سويت شيرت بياقة دائرية، مناسب للخروجات السريعة.",
      category: "hoodies"
    },
    {
      id: 8,
      name: "جاكيت جلد بايكر",
      price: 1499,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80"
      ],
      description: "جاكيت جلد كاجوال بتصميم راكب الدراجات، متين ويمنحك هيبة وأناقة.",
      category: "jackets"
    },
    {
      id: 9,
      name: "جاكيت جينز فاتح",
      price: 850,
      images: [
        "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1601333144130-8cbb312386b6?auto=format&fit=crop&w=600&q=80"
      ],
      description: "جاكيت جينز كلاسيكي يتناسب مع كل أطقمك الكاجوال.",
      category: "jackets"
    },
    {
      id: 10,
      name: "بنطلون جينز سليم فيت",
      price: 600,
      images: [
        "https://images.unsplash.com/photo-1542272604-780c878515af?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
      ],
      description: "جينز أزرق داكن بقصة سليم فيت مريحة بفضل نسبة الليكرا.",
      category: "pants"
    },
    {
      id: 11,
      name: "بنطلون جابردين بيج",
      price: 550,
      images: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1624378441864-6ad2ce9ea43c?auto=format&fit=crop&w=600&q=80"
      ],
      description: "بنطلون قماش مريح وعملي للشغل والجامعة.",
      category: "pants"
    },
    {
      id: 12,
      name: "حذاء سنيكرز أبيض فاخر",
      price: 899,
      images: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80"
      ],
      description: "حذاء رياضي خفيف الوزن بنعل مريح جداً للمشي الطويل.",
      category: "shoes"
    },
    {
      id: 13,
      name: "حذاء كلاسيك أسود",
      price: 1100,
      images: [
        "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80"
      ],
      description: "حذاء جلد طبيعي للمناسبات الرسمية والبدل.",
      category: "shoes"
    },
    {
      id: 14,
      name: "ساعة يد أنالوج",
      price: 1200,
      images: [
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=600&q=80"
      ],
      description: "ساعة يد كلاسيكية بتصميم فخم لتكمل شياكتك.",
      category: "accessories"
    },
    {
      id: 15,
      name: "نظارة شمسية سوداء",
      price: 350,
      images: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=600&q=80"
      ],
      description: "نظارة شمسية بعدسات مستقطبة لحماية كاملة من أشعة الشمس.",
      category: "accessories"
    }
  ];

  // دوال التحكم بالعمليات
  const addToCart = (item: Product | Omit<Product, "category">) => {
    const formattedItem = { ...item, category: (item as Product).category || "shirts" } as Product;
    setCart((prev) => [...prev, formattedItem]);
    showToast(`تمت إضافة "${item.name}" للسلة بنجاح! 🛒`);
  };

  const toggleFavorite = (id: number, name: string) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      showToast(`تمت إزالة "${name}" من المفضلة 💔`);
    } else {
      setFavorites((prev) => [...prev, id]);
      showToast(`تمت إضافة "${name}" للمفضلة ❤️`);
    }
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const orderText = encodeURIComponent(
    cart.length
      ? `طلب جديد من متجر 3l_nagar\n\n${cart
          .map((item, i) => `${i + 1}- ${item.name} | ${item.price} جنيه`)
          .join("\n")}\n\nالإجمالي: ${total} جنيه`
      : "أرغب بالاستفسار عن المنتجات"
  );

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  const favoriteItems = products.filter(p => favorites.includes(p.id)).concat(
    (offers.filter(o => favorites.includes(o.id)) as unknown as Product[])
  );

  return (
    <main 
      dir="rtl" 
      className={`min-h-screen font-sans pb-20 selection:bg-green-200 transition-colors duration-500 overflow-x-hidden ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-gray-900"
      }`}
    >
      <style jsx global>{`
        .perspective-3d { perspective: 1200px; }
      `}</style>
      
      {/* إشعار بمنتصف الشاشة تماماً */}
      {toastMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[200] pointer-events-none px-4">
          <div className="bg-gray-900/95 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl border border-gray-800 text-center text-lg font-bold animate-in fade-in zoom-in duration-300">
            {toastMessage}
          </div>
        </div>
      )}

      {/* الهيدر */}
      <header className={`sticky top-0 z-40 border-b shadow-sm backdrop-blur-md transition-colors ${
        darkMode ? "bg-slate-900/90 border-slate-800" : "bg-white/90 border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-extrabold tracking-tight">
            3l_nagar <span className="text-green-600">Clothing</span>
          </h1>

          <nav className={`hidden md:flex gap-8 font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <a href="#" className="hover:text-green-500 transition">الرئيسية</a>
            <a href="#offers" className="hover:text-green-500 transition">العروض</a>
            <a href="#products" className="hover:text-green-500 transition">المنتجات</a>
          </nav>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full border transition-all active:scale-90 ${
              darkMode ? "bg-slate-800 border-slate-700 text-yellow-400" : "bg-gray-100 border-gray-200 text-slate-700"
            }`}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className={`py-20 px-6 transition-colors ${darkMode ? "bg-slate-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-right">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              ارتقِ بأناقتك مع <br /> 3l_nagar
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              اكتشف تشكيلتنا الجديدة والحصرية من الملابس الرجالية الفخمة والأحذية المصممة بعناية.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("أهلاً، أريد الاستفسار عن متجر 3l_nagar")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg text-lg hover:-translate-y-1"
            >
              تواصل عبر واتساب
            </a>
          </div>
          
          {/* كارت الـ Hero بتأثير 3D تفاعلي */}
          <Interactive3DCard className="relative cursor-pointer">
            <div className="absolute inset-0 bg-green-600/20 rounded-3xl transform rotate-3 scale-105 -z-10 blur-sm"></div>
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"
              alt="Fashion"
              className="rounded-3xl shadow-2xl w-full object-cover h-[500px] border border-white/10"
              style={{ transform: "translateZ(30px)" }} // يدفع الصورة للأمام في البُعد الثالث
            />
          </Interactive3DCard>
        </div>
      </section>

      {/* قسم العروض */}
      <section id="offers" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-3xl">🔥</span>
            <h3 className="text-3xl font-extrabold">أقوى العروض</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <Interactive3DCard
                key={offer.id} 
                className={`group border rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
                }`}
              >
                <div className="relative cursor-pointer overflow-hidden h-80" onClick={() => { setSelectedProduct(offer as Product); setModalImageIndex(0); }}>
                  <img src={offer.images[0]} alt={offer.name} className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" />
                  {offer.images[1] && (
                    <img src={offer.images[1]} alt={offer.name} className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none"></div>
                  
                  {/* زر المفضلة الشفاف الذي يتحول لأبيض */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(offer.id, offer.name);
                    }}
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 z-20 border-2 ${
                      favorites.includes(offer.id) 
                        ? "bg-white border-white text-red-500 shadow-md" 
                        : "bg-transparent border-white/70 text-white hover:bg-white/20" 
                    }`}
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={favorites.includes(offer.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                </div>
                <div className="p-6" style={{ transform: "translateZ(20px)" }}>
                  <h4 className="font-bold text-xl mb-1">{offer.name}</h4>
                  <p className="text-green-600 font-extrabold text-lg mb-5">{offer.price} جنيه</p>
                  <button onClick={() => addToCart(offer)} className="w-full bg-gray-900 hover:bg-black text-white dark:bg-green-600 dark:hover:bg-green-700 font-medium py-3 rounded-xl transition-all">
                    أضف للسلة
                  </button>
                </div>
              </Interactive3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* شريط الفلتر */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-medium transition-all ${
              activeCategory === cat.id
                ? "bg-green-600 text-white shadow-md"
                : darkMode
                ? "bg-slate-800 text-gray-300 hover:bg-slate-700"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* قسم المنتجات */}
      <section id="products" className={`py-10 px-6 border-t rounded-t-[3rem] transition-colors ${darkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-gray-200"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <Interactive3DCard 
                key={product.id} 
                className={`group border rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between ${darkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-gray-100"}`}
              >
                <div className="relative cursor-pointer overflow-hidden aspect-[4/5]" onClick={() => { setSelectedProduct(product); setModalImageIndex(0); }}>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0" />
                  {product.images[1] && (
                    <img src={product.images[1]} alt={product.name} className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100" />
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10 pointer-events-none"></div>
                  
                  {/* زر المفضلة الشفاف التفاعلي */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id, product.name);
                    }}
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 z-20 border-2 ${
                      favorites.includes(product.id) 
                        ? "bg-white border-white text-red-500 shadow-md"
                        : "bg-transparent border-white/70 text-white hover:bg-white/20"
                    }`}
                    style={{ transform: "translateZ(40px)" }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={favorites.includes(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
                  <div>
                    <h4 className="font-bold text-lg mb-1 line-clamp-1">{product.name}</h4>
                    <p className="text-green-600 font-extrabold text-base mb-4">{product.price} جنيه</p>
                  </div>
                  <button onClick={() => addToCart(product)} className="w-full bg-gray-900 hover:bg-black text-white dark:bg-green-600 dark:hover:bg-green-700 font-medium py-2.5 rounded-xl transition-all">
                    أضف للسلة
                  </button>
                </div>
              </Interactive3DCard>
            ))}
          </div>
        </div>
      </section>

      {/* الأزرار العائمة للمفضلة والسلة */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <button onClick={() => setFavoritesOpen(true)} className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-xl transition-transform hover:scale-110 relative">
          ❤️ {favorites.length > 0 && <span className="absolute -top-2 -right-3 bg-gray-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">{favorites.length}</span>}
        </button>
        <button onClick={() => setCartOpen(true)} className="bg-gray-900 hover:bg-black text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-transform hover:scale-110 relative">
          🛒 {cart.length > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">{cart.length}</span>}
        </button>
      </div>

      {/* نافذة تفاصيل المنتج - تغلق عند النقر على الخلفية */}
      {selectedProduct && (
        <div 
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 cursor-default ${
              darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 bg-white/80 text-gray-900 w-10 h-10 rounded-full flex items-center justify-center z-30 font-bold hover:bg-gray-200">
              ✕
            </button>
            <div className="relative w-full h-80 bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
              <img src={selectedProduct.images[modalImageIndex]} alt={selectedProduct.name} className="w-full h-full object-cover transition-all duration-300" />
              <button onClick={() => setModalImageIndex((prev) => (prev === 0 ? selectedProduct.images.length - 1 : prev - 1))} className="absolute right-3 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/70 z-10 font-bold">❯</button>
              <button onClick={() => setModalImageIndex((prev) => (prev === selectedProduct.images.length - 1 ? 0 : prev + 1))} className="absolute left-3 bg-black/50 text-white w-9 h-9 rounded-full flex items-center justify-center hover:bg-black/70 z-10 font-bold">❮</button>
            </div>
            <div className="flex justify-center gap-2 py-3 bg-slate-100/50 dark:bg-slate-950/30 border-b dark:border-slate-800">
              {selectedProduct.images.map((img, idx) => (
                <button key={idx} onClick={() => setModalImageIndex(idx)} className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${modalImageIndex === idx ? "border-green-600 scale-105 shadow-md" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">{selectedProduct.description}</p>
              <p className="text-green-600 font-extrabold text-xl mb-4">{selectedProduct.price} جنيه</p>
              <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }} className="w-full bg-gray-900 hover:bg-black dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-transform active:scale-95 text-lg">
                أضف للسلة الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة السلة - تغلق عند النقر على الخلفية */}
      {cartOpen && (
        <div 
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full md:w-[450px] max-h-[85vh] flex flex-col rounded-t-[2rem] md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 cursor-default ${darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-800">
              <h3 className="font-extrabold text-xl">🛒 سلة المشتريات</h3>
              <button onClick={() => setCartOpen(false)} className="bg-gray-100 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700">✕</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 py-10">السلة فارغة 🛒</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b border-gray-100 dark:border-slate-800 last:border-0">
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-green-600 text-sm font-bold">{item.price} جنيه</p>
                    </div>
                    <button onClick={() => removeFromCart(index)} className="text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">حذف</button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-t border-gray-200 dark:border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">الإجمالي:</span>
                  <span className="font-extrabold text-xl text-green-600">{total} جنيه</span>
                </div>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-transform active:scale-95"
                >
                  إتمام الطلب عبر واتساب
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* نافذة المفضلة - تغلق عند النقر على الخلفية */}
      {favoritesOpen && (
        <div 
          onClick={() => setFavoritesOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full md:w-[450px] max-h-[85vh] flex flex-col rounded-t-[2rem] md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 cursor-default ${darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"}`}
          >
            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-slate-800">
              <h3 className="font-extrabold text-xl">❤️ قائمة المفضلة</h3>
              <button onClick={() => setFavoritesOpen(false)} className="bg-gray-100 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700">✕</button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {favoriteItems.length === 0 ? (
                <p className="text-center text-gray-500 py-10">قائمة المفضلة فارغة 💔</p>
              ) : (
                favoriteItems.map((item, index) => (
                  <div key={index} className="flex gap-4 items-center py-4 border-b border-gray-100 dark:border-slate-800 last:border-0">
                    <img src={item.images[0]} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div className="flex-1">
                      <p className="font-bold line-clamp-1">{item.name}</p>
                      <p className="text-green-600 text-sm font-bold">{item.price} جنيه</p>
                    </div>
                    <button onClick={() => toggleFavorite(item.id, item.name)} className="text-red-500 bg-red-50 dark:bg-red-500/10 px-3 py-1 rounded-lg text-sm font-bold hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors">إزالة</button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

