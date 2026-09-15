"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  storage: string;
  ram: string;
  color: string;
  image: string;
  badge?: string;
  stock: number;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "iPhone 15",
    brand: "Apple",
    category: "موبايلات",
    price: 39999,
    oldPrice: 42999,
    storage: "128GB",
    ram: "6GB",
    color: "أسود",
    image:
      "https://images.unsplash.com/photo-1592286927505-2fd6b7a4e3d4?auto=format&fit=crop&w=900&q=85",
    badge: "الأكثر مبيعًا",
    stock: 8,
  },
  {
    id: 2,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    category: "موبايلات",
    price: 59999,
    oldPrice: 63999,
    storage: "256GB",
    ram: "8GB",
    color: "تيتانيوم",
    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=900&q=85",
    badge: "جديد",
    stock: 5,
  },
  {
    id: 3,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "موبايلات",
    price: 48999,
    oldPrice: 52999,
    storage: "256GB",
    ram: "12GB",
    color: "أسود",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85",
    badge: "خصم",
    stock: 6,
  },
  {
    id: 4,
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    category: "موبايلات",
    price: 18999,
    oldPrice: 20999,
    storage: "256GB",
    ram: "8GB",
    color: "أزرق",
    image:
      "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=900&q=85",
    stock: 12,
  },
  {
    id: 5,
    name: "Xiaomi Redmi Note 13 Pro",
    brand: "Xiaomi",
    category: "موبايلات",
    price: 13999,
    oldPrice: 15999,
    storage: "256GB",
    ram: "8GB",
    color: "أسود",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
    badge: "عرض",
    stock: 15,
  },
  {
    id: 6,
    name: "Oppo Reno 12",
    brand: "Oppo",
    category: "موبايلات",
    price: 19999,
    oldPrice: 21999,
    storage: "256GB",
    ram: "12GB",
    color: "فضي",
    image:
      "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?auto=format&fit=crop&w=900&q=85",
    stock: 7,
  },
  {
    id: 7,
    name: "Realme 13 Pro",
    brand: "Realme",
    category: "موبايلات",
    price: 15999,
    oldPrice: 17999,
    storage: "256GB",
    ram: "8GB",
    color: "أخضر",
    image:
      "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85",
    badge: "جديد",
    stock: 10,
  },
  {
    id: 8,
    name: "Honor 200",
    brand: "Honor",
    category: "موبايلات",
    price: 21999,
    oldPrice: 23999,
    storage: "512GB",
    ram: "12GB",
    color: "أبيض",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
    stock: 9,
  },
  {
    id: 9,
    name: "AirPods Pro",
    brand: "Apple",
    category: "سماعات",
    price: 8999,
    oldPrice: 9999,
    storage: "-",
    ram: "-",
    color: "أبيض",
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=85",
    badge: "خصم",
    stock: 20,
  },
  {
    id: 10,
    name: "Samsung Galaxy Buds",
    brand: "Samsung",
    category: "سماعات",
    price: 4999,
    oldPrice: 5799,
    storage: "-",
    ram: "-",
    color: "أسود",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85",
    stock: 18,
  },
  {
    id: 11,
    name: "Apple Watch Series",
    brand: "Apple",
    category: "ساعات ذكية",
    price: 15999,
    oldPrice: 17999,
    storage: "32GB",
    ram: "-",
    color: "أسود",
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=85",
    badge: "جديد",
    stock: 6,
  },
  {
    id: 12,
    name: "Power Bank 20000mAh",
    brand: "Baseus",
    category: "إكسسوارات",
    price: 2499,
    oldPrice: 2999,
    storage: "-",
    ram: "-",
    color: "أسود",
    image:
      "https://images.unsplash.com/photo-1609592424695-7e4a1d4d9f89?auto=format&fit=crop&w=900&q=85",
    stock: 25,
  },
];

const categories = [
  { name: "موبايلات", icon: "📱", count: "120+ منتج" },
  { name: "سماعات", icon: "🎧", count: "35+ منتج" },
  { name: "ساعات ذكية", icon: "⌚", count: "20+ منتج" },
  { name: "شواحن", icon: "🔌", count: "45+ منتج" },
  { name: "كفرات", icon: "📦", count: "80+ منتج" },
  { name: "إكسسوارات", icon: "🎮", count: "100+ منتج" },
];

const brands = [
  "الكل",
  "Apple",
  "Samsung",
  "Xiaomi",
  "Oppo",
  "Realme",
  "Honor",
  "Baseus",
];

function SearchIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="9" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />
      <path d="M3 4h2l2.5 11.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      width="23"
      height="23"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M17.47 14.37c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35ZM12 2a9.9 9.9 0 0 0-8.5 15.02L2 22l5.14-1.47A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.05.87.88-2.97-.2-.31A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  );
}

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("الكل");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [notification, setNotification] = useState("");
  const [sort, setSort] = useState("default");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const text = search.toLowerCase().trim();

      const matchesSearch =
        !text ||
        product.name.toLowerCase().includes(text) ||
        product.brand.toLowerCase().includes(text) ||
        product.category.toLowerCase().includes(text);

      const matchesBrand =
        selectedBrand === "الكل" || product.brand === selectedBrand;

      const matchesCategory =
        selectedCategory === "الكل" ||
        product.category === selectedCategory;

      return matchesSearch && matchesBrand && matchesCategory;
    });

    if (sort === "low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "new") {
      result = [...result].sort((a, b) => b.id - a.id);
    }

    return result;
  }, [search, selectedBrand, selectedCategory, sort]);

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) => {
    return price.toLocaleString("ar-EG");
  };

  const showMessage = (message: string) => {
    setNotification(message);

    setTimeout(() => {
      setNotification("");
    }, 2500);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((current) => {
      if (current.includes(id)) {
        showMessage("تم حذف المنتج من المفضلة ❤️");
        return current.filter((item) => item !== id);
      }

      showMessage("تمت إضافة المنتج إلى المفضلة ❤️");
      return [...current, id];
    });
  };

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        if (existing.quantity >= product.stock) {
          showMessage("لا توجد كمية إضافية من هذا المنتج");
          return current;
        }

        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });

    showMessage("تمت إضافة المنتج إلى السلة 🛒");
  };

  const increaseQuantity = (id: number) => {
    setCart((current) =>
      current.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
    showMessage("تم حذف المنتج من السلة");
  };

  const openWhatsApp = (product?: Product) => {
    const message = product
      ? `مرحبًا، أريد الاستفسار عن ${product.name} - ${formatPrice(
          product.price
        )} جنيه`
      : "مرحبًا، أريد الاستفسار عن المنتجات المتاحة";

    window.open(
      `https://wa.me/201203632925?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const orderOnWhatsApp = () => {
    if (cart.length === 0) {
      showMessage("السلة فارغة");
      return;
    }

    const items = cart
      .map(
        (item) =>
          `${item.name} × ${item.quantity} = ${formatPrice(
            item.price * item.quantity
          )} جنيه`
      )
      .join("\n");

    const message = `مرحبًا، أريد عمل طلب:\n\n${items}\n\nالإجمالي: ${formatPrice(
      cartTotal
    )} جنيه`;

    window.open(
      `https://wa.me/201203632925?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });

    setMobileMenu(false);
  };

  return (
    <div
      dir="rtl"
      className={
        darkMode
          ? "min-h-screen bg-[#070b14] text-white"
          : "min-h-screen bg-[#f7f9fc] text-slate-900"
      }
    >
      {/* Notification */}
      {notification && (
        <div className="fixed left-1/2 top-5 z-[100] -translate-x-1/2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-2xl">
          {notification}
        </div>
      )}

      {/* Navbar */}
      <header
        className={
          darkMode
            ? "sticky top-0 z-50 border-b border-slate-800 bg-[#070b14]/95 backdrop-blur-xl"
            : "sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-xl"
        }
      >
        <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-2xl shadow-lg shadow-blue-500/20">
              📱
            </div>

            <div className="text-right">
              <div className="text-lg font-black tracking-tight">
                Mobile<span className="text-blue-600">Store</span>
              </div>
              <div
                className={
                  darkMode
                    ? "text-[10px] text-slate-500"
                    : "text-[10px] text-slate-400"
                }
              >
                كل اللي محتاجه في مكان واحد
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-bold text-blue-600"
            >
              الرئيسية
            </button>

            <button
              onClick={scrollToProducts}
              className="text-sm font-bold opacity-75 transition hover:text-blue-600 hover:opacity-100"
            >
              الموبايلات
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("categories")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-bold opacity-75 transition hover:text-blue-600 hover:opacity-100"
            >
              التصنيفات
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("offers")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-sm font-bold opacity-75 transition hover:text-blue-600 hover:opacity-100"
            >
              العروض
            </button>

            <button
              onClick={() => openWhatsApp()}
              className="text-sm font-bold text-green-600"
            >
              تواصل معنا
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDarkMode((value) => !value)}
              className={
                darkMode
                  ? "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-yellow-400 transition hover:border-blue-500"
                  : "flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-blue-400"
              }
              aria-label="الوضع الليلي"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              onClick={() => setShowFavorites(true)}
              className={
                darkMode
                  ? "relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-red-500 hover:text-red-500"
                  : "relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-red-300 hover:text-red-500"
              }
              aria-label="المفضلة"
            >
              <HeartIcon filled={favorites.length > 0} />

              {favorites.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {favorites.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowCart(true)}
              className={
                darkMode
                  ? "relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-300 transition hover:border-blue-500 hover:text-blue-400"
                  : "relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
              }
              aria-label="السلة"
            >
              <CartIcon />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenu((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
            >
              {mobileMenu ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenu && (
          <div
            className={
              darkMode
                ? "border-t border-slate-800 bg-[#070b14] p-4 lg:hidden"
                : "border-t border-slate-200 bg-white p-4 lg:hidden"
            }
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-2">
              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setMobileMenu(false);
                }}
                className="rounded-xl p-3 text-right font-bold hover:bg-blue-50 hover:text-blue-600"
              >
                الرئيسية
              </button>

              <button
                onClick={scrollToProducts}
                className="rounded-xl p-3 text-right font-bold hover:bg-blue-50 hover:text-blue-600"
              >
                الموبايلات
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" });
                  setMobileMenu(false);
                }}
                className="rounded-xl p-3 text-right font-bold hover:bg-blue-50 hover:text-blue-600"
              >
                التصنيفات
              </button>

              <button
                onClick={() => openWhatsApp()}
                className="rounded-xl p-3 text-right font-bold text-green-600 hover:bg-green-50"
              >
                💬 تواصل عبر WhatsApp
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8 lg:pt-8">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b2a68] via-[#1558c7] to-[#4f46e5] px-6 py-12 text-white shadow-2xl shadow-blue-900/20 sm:px-10 md:py-16 lg:px-16 lg:py-20">
          {/* Background decorations */}
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 right-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              🔥 عروض قوية وأسعار مميزة
            </div>

            <h1 className="text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
              موبايلك الجديد
              <br />
              <span className="text-blue-200">مستنيك هنا</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              أحدث الموبايلات والإكسسوارات الأصلية بأسعار منافسة، اختار جهازك
              واطلبه بسهولة.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={scrollToProducts}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 font-black text-blue-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50"
              >
                تصفح المنتجات
                <ArrowLeft />
              </button>

              <button
                onClick={() => openWhatsApp()}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 py-3.5 font-black backdrop-blur transition hover:bg-white/20"
              >
                <WhatsAppIcon />
                اطلب عبر واتساب
              </button>
            </div>
          </div>

          {/* Hero phone decoration */}
          <div className="absolute left-5 top-1/2 hidden -translate-y-1/2 rotate-6 lg:block">
            <div className="relative h-[300px] w-[160px] rounded-[35px] border-[6px] border-slate-900 bg-slate-950 shadow-2xl">
              <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              <div className="flex h-full items-center justify-center overflow-hidden rounded-[28px]">
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 blur-sm" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          className={
            darkMode
              ? "grid overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 sm:grid-cols-2 lg:grid-cols-4"
              : "grid overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {[
            ["🚚", "توصيل سريع", "لحد باب بيتك"],
            ["🛡️", "منتجات أصلية", "جودة مضمونة"],
            ["💳", "دفع آمن", "طرق دفع متعددة"],
            ["💬", "دعم مستمر", "تواصل عبر واتساب"],
          ].map(([icon, title, desc], index) => (
            <div
              key={title}
              className={`flex items-center gap-4 p-5 ${
                index > 0
                  ? darkMode
                    ? "border-t border-slate-800 sm:border-r lg:border-t-0"
                    : "border-t border-slate-100 sm:border-r lg:border-t-0"
                  : ""
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-2xl">
                {icon}
              </div>

              <div>
                <div className="font-black">{title}</div>
                <div className="mt-1 text-xs text-slate-500">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section
        id="categories"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            <span className="text-sm font-black text-blue-600">
              اختار اللي يناسبك
            </span>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">
              تصفح التصنيفات
            </h2>
          </div>

          <button
            onClick={() => {
              setSelectedCategory("الكل");
              scrollToProducts();
            }}
            className="hidden items-center gap-1 text-sm font-bold text-blue-600 sm:flex"
          >
            عرض الكل <ArrowLeft />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
                scrollToProducts();
              }}
              className={
                darkMode
                  ? "group rounded-2xl border border-slate-800 bg-slate-900 p-5 text-center transition hover:-translate-y-1 hover:border-blue-600"
                  : "group rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              }
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-3xl transition group-hover:scale-110">
                {category.icon}
              </div>

              <h3 className="mt-3 font-black">{category.name}</h3>

              <p className="mt-1 text-[11px] text-slate-500">
                {category.count}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Offers */}
      <section
        id="offers"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white shadow-xl sm:p-8">
          <div className="relative z-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="mb-2 text-sm font-bold text-orange-100">
                🔥 لفترة محدودة
              </div>

              <h2 className="text-2xl font-black sm:text-3xl">
                خصومات حقيقية على أحدث الأجهزة
              </h2>

              <p className="mt-2 text-sm text-orange-100">
                الحق العروض قبل انتهاء الكمية.
              </p>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setSelectedBrand("الكل");
                setSelectedCategory("الكل");
                scrollToProducts();
              }}
              className="shrink-0 rounded-xl bg-white px-6 py-3 font-black text-red-600 transition hover:bg-orange-50"
            >
              شوف العروض
            </button>
          </div>

          <div className="absolute -left-10 -top-20 h-56 w-56 rounded-full bg-white/10" />
          <div className="absolute -bottom-24 right-1/3 h-64 w-64 rounded-full bg-yellow-300/10" />
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="mb-6">
          <span className="text-sm font-black text-blue-600">
            اختار جهازك
          </span>

          <div className="mt-1 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <h2 className="text-2xl font-black sm:text-3xl">
              أحدث المنتجات
            </h2>

            <div className="text-sm text-slate-500">
              {filteredProducts.length} منتج
            </div>
          </div>
        </div>

        {/* Search & Filters */}
        <div
          className={
            darkMode
              ? "mb-7 rounded-2xl border border-slate-800 bg-slate-900 p-4"
              : "mb-7 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          }
        >
          <div className="flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                <SearchIcon />
              </div>

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="ابحث باسم الموبايل أو الشركة..."
                className={
                  darkMode
                    ? "h-12 w-full rounded-xl border border-slate-700 bg-slate-800 pr-12 pl-4 text-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500"
                    : "h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pr-12 pl-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500"
                }
              />
            </div>

            <select
              value={selectedBrand}
              onChange={(event) => setSelectedBrand(event.target.value)}
              className={
                darkMode
                  ? "h-12 rounded-xl border border-slate-700 bg-slate-800 px-4 text-sm font-bold outline-none"
                  : "h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none"
              }
            >
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand === "الكل" ? "كل الشركات" : brand}
                </option>
              ))}
            </select>

            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className={
                darkMode
                  ? "h-12 rounded-xl border border-slate-700 bg-slate-800 px-4 text-sm font-bold outline-none"
                  : "h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold outline-none"
              }
            >
              <option value="default">ترتيب افتراضي</option>
              <option value="low">السعر: الأقل أولًا</option>
              <option value="high">السعر: الأعلى أولًا</option>
              <option value="new">الأحدث</option>
            </select>
          </div>

          {/* Brand Chips */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                  selectedBrand === brand
                    ? "bg-blue-600 text-white"
                    : darkMode
                    ? "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    : "bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Category */}
        {selectedCategory !== "الكل" && (
          <div className="mb-5 flex items-center gap-2">
            <span className="text-sm text-slate-500">التصنيف:</span>

            <button
              onClick={() => setSelectedCategory("الكل")}
              className="rounded-full bg-blue-100 px-4 py-2 text-xs font-black text-blue-700"
            >
              {selectedCategory} ×
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div
            className={
              darkMode
                ? "rounded-3xl border border-slate-800 bg-slate-900 py-20 text-center"
                : "rounded-3xl border border-slate-200 bg-white py-20 text-center"
            }
          >
            <div className="text-5xl">🔎</div>
            <h3 className="mt-4 text-xl font-black">مش لاقيين المنتج</h3>
            <p className="mt-2 text-sm text-slate-500">
              جرب تغير كلمة البحث أو الشركة.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setSelectedBrand("الكل");
                setSelectedCategory("الكل");
              }}
              className="mt-5 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
            >
              عرض كل المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const isFavorite = favorites.includes(product.id);

              const discount = product.oldPrice
                ? Math.round(
                    ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
                  )
                : 0;

              return (
                <article
                  key={product.id}
                  className={
                    darkMode
                      ? "group overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 transition duration-300 hover:-translate-y-1 hover:border-blue-700 hover:shadow-2xl hover:shadow-blue-950/30"
                      : "group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  }
                >
                  {/* Image */}
                  <div className="relative aspect-square overflow-hidden bg-slate-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute right-3 top-3 flex flex-col gap-2">
                      {product.badge && (
                        <span className="rounded-full bg-blue-600 px-3 py-1.5 text-[10px] font-black text-white shadow-lg">
                          {product.badge}
                        </span>
                      )}

                      {discount > 0 && (
                        <span className="rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-black text-white shadow-lg">
                          -{discount}%
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110 ${
                        isFavorite
                          ? "text-red-500"
                          : "text-slate-500 hover:text-red-500"
                      }`}
                      aria-label="إضافة للمفضلة"
                    >
                      <HeartIcon filled={isFavorite} />
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-blue-600">
                        {product.brand}
                      </span>

                      <span className="text-[10px] font-bold text-green-600">
                        ● متوفر
                      </span>
                    </div>

                    <h3 className="mt-2 truncate text-lg font-black">
                      {product.name}
                    </h3>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.storage !== "-" && (
                        <span
                          className={
                            darkMode
                              ? "rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-400"
                              : "rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500"
                          }
                        >
                          {product.storage}
                        </span>
                      )}

                      {product.ram !== "-" && (
                        <span
                          className={
                            darkMode
                              ? "rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-400"
                              : "rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500"
                          }
                        >
                          RAM {product.ram}
                        </span>
                      )}

                      <span
                        className={
                          darkMode
                            ? "rounded-lg bg-slate-800 px-2.5 py-1 text-[10px] font-bold text-slate-400"
                            : "rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-bold text-slate-500"
                        }
                      >
                        {product.color}
                      </span>
                    </div>

                    <div className="mt-5 flex items-end gap-2">
                      <span className="text-xl font-black text-blue-600">
                        {formatPrice(product.price)}
                      </span>

                      <span className="mb-0.5 text-xs font-bold text-slate-400">
                        جنيه
                      </span>

                      {product.oldPrice && (
                        <span className="mb-0.5 text-xs text-slate-400 line-through">
                          {formatPrice(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="rounded-xl bg-blue-600 py-3 text-xs font-black text-white transition hover:bg-blue-700 active:scale-95"
                      >
                        🛒 أضف للسلة
                      </button>

                      <button
                        onClick={() => openWhatsApp(product)}
                        className="flex items-center justify-center gap-1 rounded-xl bg-green-500 py-3 text-xs font-black text-white transition hover:bg-green-600 active:scale-95"
                      >
                        <WhatsAppIcon />
                        واتساب
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div
          className={
            darkMode
              ? "overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8"
              : "overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
          }
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="text-sm font-black text-green-600">
                💬 محتاج مساعدة؟
              </div>

              <h2 className="mt-2 text-2xl font-black">
                مش عارف تختار موبايل؟
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-500">
                كلمنا على واتساب ونساعدك تختار الجهاز المناسب لميزانيتك.
              </p>
            </div>

            <button
              onClick={() => openWhatsApp()}
              className="flex items-center gap-2 rounded-xl bg-green-500 px-7 py-3.5 font-black text-white shadow-lg shadow-green-500/20 transition hover:bg-green-600"
            >
              <WhatsAppIcon />
              01203632925
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={
          darkMode
            ? "mt-8 border-t border-slate-800 bg-[#050810]"
            : "mt-8 border-t border-slate-200 bg-white"
        }
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-xl text-white">
                  📱
                </div>

                <div>
                  <div className="font-black">
                    Mobile<span className="text-blue-600">Store</span>
                  </div>

                  <div className="text-[10px] text-slate-500">
                    عالم الموبايلات
                  </div>
                </div>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-7 text-slate-500">
                أحدث الموبايلات والإكسسوارات بأفضل الأسعار وخدمة مميزة.
              </p>
            </div>

            <div>
              <h3 className="font-black">روابط سريعة</h3>

              <div className="mt-4 flex flex-col gap-3 text-sm text-slate-500">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="text-right hover:text-blue-600"
                >
                  الرئيسية
                </button>

                <button
                  onClick={scrollToProducts}
                  className="text-right hover:text-blue-600"
                >
                  الموبايلات
                </button>

                <button
                  onClick={() =>
                    document
                      .getElementById("categories")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-right hover:text-blue-600"
                >
                  التصنيفات
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-black">تواصل معنا</h3>

              <div className="mt-4 space-y-3">
                <button
                  onClick={() => openWhatsApp()}
                  className="flex w-full items-center gap-3 rounded-xl bg-green-50 p-3 text-right text-sm font-bold text-green-700 transition hover:bg-green-100"
                >
                  <WhatsAppIcon />
                  01203632925
                </button>

                <p className="text-xs text-slate-500">
                  متاحين للرد على استفساراتك وطلباتك عبر WhatsApp.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-slate-200 pt-6 text-center text-xs text-slate-500 dark:border-slate-800">
            © {new Date().getFullYear()} Mobile Store — جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <button
        onClick={() => openWhatsApp()}
        className="fixed bottom-5 left-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 transition hover:scale-110 hover:bg-green-600"
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </button>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[90]">
          <button
            onClick={() => setShowCart(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="إغلاق"
          />

          <aside
            className={
              darkMode
                ? "absolute left-0 top-0 flex h-full w-full max-w-md flex-col bg-slate-950 text-white shadow-2xl"
                : "absolute left-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-black">🛒 سلة المشتريات</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {cartCount} منتج
                </p>
              </div>

              <button
                onClick={() => setShowCart(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
              >
                <XIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="text-6xl">🛒</div>

                  <h3 className="mt-5 text-xl font-black">
                    السلة فاضية
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    أضف المنتجات اللي عجبتك وهتظهر هنا.
                  </p>

                  <button
                    onClick={() => {
                      setShowCart(false);
                      scrollToProducts();
                    }}
                    className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
                  >
                    تصفح المنتجات
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={
                        darkMode
                          ? "rounded-2xl border border-slate-800 bg-slate-900 p-3"
                          : "rounded-2xl border border-slate-200 bg-slate-50 p-3"
                      }
                    >
                      <div className="flex gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-sm font-black">
                              {item.name}
                            </h3>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-xs text-red-500"
                            >
                              حذف
                            </button>
                          </div>

                          <p className="mt-1 text-xs text-blue-600">
                            {formatPrice(item.price)} جنيه
                          </p>

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
                              <button
                                onClick={() => decreaseQuantity(item.id)}
                                className="flex h-8 w-8 items-center justify-center font-black hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                −
                              </button>

                              <span className="flex h-8 min-w-8 items-center justify-center text-xs font-black">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() => increaseQuantity(item.id)}
                                className="flex h-8 w-8 items-center justify-center font-black hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                +
                              </button>
                            </div>

                            <span className="text-sm font-black">
                              {formatPrice(item.price * item.quantity)} ج
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-200 p-5 dark:border-slate-800">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-bold text-slate-500">
                    الإجمالي
                  </span>

                  <span className="text-2xl font-black text-blue-600">
                    {formatPrice(cartTotal)} ج
                  </span>
                </div>

                <button
                  onClick={orderOnWhatsApp}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-4 font-black text-white transition hover:bg-green-600"
                >
                  <WhatsAppIcon />
                  إتمام الطلب عبر WhatsApp
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Favorites Drawer */}
      {showFavorites && (
        <div className="fixed inset-0 z-[90]">
          <button
            onClick={() => setShowFavorites(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="إغلاق"
          />

          <aside
            className={
              darkMode
                ? "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-slate-950 text-white shadow-2xl"
                : "absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            }
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
              <div>
                <h2 className="text-xl font-black">❤️ المفضلة</h2>
                <p className="mt-1 text-xs text-slate-500">
                  {favoriteProducts.length} منتج
                </p>
              </div>

              <button
                onClick={() => setShowFavorites(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-300"
              >
                <XIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {favoriteProducts.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="text-6xl">❤️</div>

                  <h3 className="mt-5 text-xl font-black">
                    مفيش منتجات مفضلة
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    اضغط على القلب ❤️ عند أي منتج لإضافته هنا.
                  </p>

                  <button
                    onClick={() => {
                      setShowFavorites(false);
                      scrollToProducts();
                    }}
                    className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white"
                  >
                    تصفح المنتجات
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {favoriteProducts.map((product) => (
                    <div
                      key={product.id}
                      className={
                        darkMode
                          ? "flex gap-3 rounded-2xl border border-slate-800 bg-slate-900 p-3"
                          : "flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3"
                      }
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="truncate text-sm font-black">
                            {product.name}
                          </h3>

                          <button
                            onClick={() => toggleFavorite(product.id)}
                            className="text-red-500"
                          >
                            <HeartIcon filled />
                          </button>
                        </div>

                        <p className="mt-2 text-sm font-black text-blue-600">
                          {formatPrice(product.price)} جنيه
                        </p>

                        <button
                          onClick={() => addToCart(product)}
                          className="mt-2 rounded-lg bg-blue-600 px-3 py-2 text-[10px] font-bold text-white"
                        >
                          🛒 أضف للسلة
                        </button>
                
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
    </div>
  );
    }
