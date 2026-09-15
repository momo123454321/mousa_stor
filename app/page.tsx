"use client";

import { useEffect, useMemo, useState } from "react";

/*
===========================================================
                 MECCA STORE
===========================================================

ده ملف المتجر بالكامل.

✅ لا يوجد Supabase
✅ لا يوجد Admin
✅ لا يوجد Login
✅ لا يوجد Database
✅ أنت فقط تعدل المنتجات من الكود

===========================================================
                تعديل المنتجات
===========================================================

انزل إلى جزء:

const PRODUCTS: Product[] = [

وهناك تقدر تضيف / تعدل / تحذف المنتجات.

مثال موبايل:

{
  id: 6,
  name: "iPhone 16 Pro Max",
  category: "phones",
  brand: "Apple",
  price: 65000,
  oldPrice: 68000,
  stock: 5,
  color: "Titanium",
  storage: "256GB",
  ram: "8GB",
  image: "ضع رابط الصورة هنا",
  description: "وصف المنتج هنا",
  featured: true,
}

===========================================================
*/

// =========================================================
// إعدادات المتجر
// =========================================================

const STORE_NAME = "Mecca Store";

const WHATSAPP_NUMBER = "201203632925";

const WHATSAPP_DISPLAY = "01203632925";

// =========================================================
// أنواع المنتجات
// =========================================================

type Category = "phones" | "cases" | "accessories";

type Product = {
  id: number;

  name: string;

  category: Category;

  brand: string;

  price: number;

  oldPrice?: number;

  stock: number;

  color?: string;

  storage?: string;

  ram?: string;

  compatible?: string;

  image: string;

  description: string;

  featured?: boolean;
};

// =========================================================
// المنتجات
//
// 👇👇👇 عدل هنا فقط لو عايز تغير المنتجات
// =========================================================

const PRODUCTS: Product[] = [
  // =======================================================
  // موبايلات
  // =======================================================

  {
    id: 1,

    name: "iPhone 15 Pro Max",

    category: "phones",

    brand: "Apple",

    price: 55000,

    oldPrice: 58000,

    stock: 5,

    color: "Natural Titanium",

    storage: "256GB",

    ram: "8GB",

    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=900&q=85",

    description:
      "iPhone 15 Pro Max بتصميم التيتانيوم وأداء قوي وكاميرا احترافية.",

    featured: true,
  },

  {
    id: 2,

    name: "Samsung Galaxy S24 Ultra",

    category: "phones",

    brand: "Samsung",

    price: 48000,

    oldPrice: 51000,

    stock: 4,

    color: "Titanium Gray",

    storage: "256GB",

    ram: "12GB",

    image:
      "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=900&q=85",

    description:
      "Galaxy S24 Ultra بشاشة مذهلة وكاميرا قوية وقلم S Pen.",

    featured: true,
  },

  {
    id: 3,

    name: "Redmi Note 13 Pro",

    category: "phones",

    brand: "Xiaomi",

    price: 14500,

    oldPrice: 15500,

    stock: 8,

    color: "Black",

    storage: "256GB",

    ram: "8GB",

    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",

    description:
      "موبايل عملي بأداء ممتاز وكاميرا عالية الدقة.",

    featured: false,
  },

  // =======================================================
  // كفرات
  // =======================================================

  {
    id: 4,

    name: "iPhone Case MagSafe",

    category: "cases",

    brand: "Generic",

    price: 350,

    oldPrice: 450,

    stock: 20,

    color: "Black",

    compatible: "iPhone 15 Pro Max",

    image:
      "https://images.unsplash.com/photo-1603313011108-4f2e4e0b6f9d?auto=format&fit=crop&w=900&q=85",

    description:
      "جراب حماية أنيق يدعم MagSafe ويوفر حماية جيدة للموبايل.",

    featured: true,
  },

  // =======================================================
  // إكسسوارات
  // =======================================================

  {
    id: 5,

    name: "Type-C Fast Charger",

    category: "accessories",

    brand: "Generic",

    price: 650,

    oldPrice: 800,

    stock: 15,

    color: "White",

    compatible: "Type-C",

    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=900&q=85",

    description:
      "شاحن Type-C سريع مناسب للموبايلات والأجهزة المتوافقة.",

    featured: true,
  },
];

// =========================================================
// التصنيفات
// =========================================================

const CATEGORIES = [
  {
    id: "all",
    name: "الكل",
    icon: "▦",
  },

  {
    id: "phones",
    name: "موبايلات",
    icon: "📱",
  },

  {
    id: "cases",
    name: "كفرات",
    icon: "🛡️",
  },

  {
    id: "accessories",
    name: "إكسسوارات",
    icon: "🔌",
  },
] as const;

// =========================================================
// تنسيق السعر
// =========================================================

function formatPrice(price: number) {
  return (
    new Intl.NumberFormat("ar-EG").format(price) +
    " ج.م"
  );
}

// =========================================================
// نسبة الخصم
// =========================================================

function getDiscount(product: Product) {
  if (
    !product.oldPrice ||
    product.oldPrice <= product.price
  ) {
    return 0;
  }

  return Math.round(
    ((product.oldPrice - product.price) /
      product.oldPrice) *
      100
  );
}

// =========================================================
// رابط واتساب
// =========================================================

function getWhatsAppLink(product?: Product) {
  if (!product) {
    return `https://wa.me/${WHATSAPP_NUMBER}`;
  }

  const message = `السلام عليكم، أريد الاستفسار عن:

${product.name}

السعر: ${formatPrice(product.price)}

هل المنتج متوفر؟`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    message
  )}`;
}

// =========================================================
// الصفحة الرئيسية
// =========================================================

export default function Home() {
  // الوضع الأساسي = فاتح
  const [darkMode, setDarkMode] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState<"all" | Category>("all");

  const [favorites, setFavorites] =
    useState<number[]>([]);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [showFavorites, setShowFavorites] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  // =======================================================
  // تحميل المفضلة والوضع الليلي
  // =======================================================

  useEffect(() => {
    try {
      const savedFavorites =
        localStorage.getItem(
          "mecca_favorites"
        );

      const savedDarkMode =
        localStorage.getItem(
          "mecca_dark_mode"
        );

      if (savedFavorites) {
        setFavorites(
          JSON.parse(savedFavorites)
        );
      }

      /*
        الوضع الأساسي فاتح.

        لو المستخدم سبق واختار Dark Mode
        نحافظ على اختياره.
      */

      if (savedDarkMode === "true") {
        setDarkMode(true);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  // =======================================================
  // حفظ المفضلة
  // =======================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "mecca_favorites",
        JSON.stringify(favorites)
      );
    } catch {}
  }, [favorites]);

  // =======================================================
  // حفظ الوضع
  // =======================================================

  useEffect(() => {
    try {
      localStorage.setItem(
        "mecca_dark_mode",
        String(darkMode)
      );
    } catch {}
  }, [darkMode]);

  // =======================================================
  // المنتجات بعد الفلترة
  // =======================================================

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // التصنيف

    if (category !== "all") {
      result = result.filter(
        (product) =>
          product.category === category
      );
    }

    // البحث

    if (search.trim()) {
      const query =
        search.trim().toLowerCase();

      result = result.filter((product) => {
        return (
          product.name
            .toLowerCase()
            .includes(query) ||
          product.brand
            .toLowerCase()
            .includes(query) ||
          product.description
            .toLowerCase()
            .includes(query) ||
          product.compatible
            ?.toLowerCase()
            .includes(query)
        );
      });
    }

    // المفضلة

    if (showFavorites) {
      result = result.filter((product) =>
        favorites.includes(product.id)
      );
    }

    return result;
  }, [
    search,
    category,
    favorites,
    showFavorites,
  ]);

  // =======================================================
  // تغيير المفضلة
  // =======================================================

  function toggleFavorite(id: number) {
    setFavorites((current) => {
      if (current.includes(id)) {
        return current.filter(
          (item) => item !== id
        );
      }

      return [...current, id];
    });
  }

  // =======================================================
  // الذهاب للمنتجات
  // =======================================================

  function goToProducts() {
    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  // =======================================================
  // إحصائيات
  // =======================================================

  const phoneCount = PRODUCTS.filter(
    (product) =>
      product.category === "phones"
  ).length;

  const casesCount = PRODUCTS.filter(
    (product) =>
      product.category === "cases"
  ).length;

  const accessoriesCount =
    PRODUCTS.filter(
      (product) =>
        product.category === "accessories"
    ).length;

  const availableCount = PRODUCTS.filter(
    (product) => product.stock > 0
  ).length;

  // =======================================================
  // الصفحة
  // =======================================================

  return (
    <main
      dir="rtl"
      style={{
        minHeight: "100vh",

        background: darkMode
          ? "#09090b"
          : "#f6f7fb",

        color: darkMode
          ? "#f4f4f5"
          : "#18181b",

        transition: "all .25s ease",
      }}
    >
      {/* =================================================
          CSS
      ================================================= */}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          font-family:
            Arial,
            Tahoma,
            "Segoe UI",
            sans-serif;
        }

        button,
        input {
          font-family: inherit;
        }

        button {
          cursor: pointer;
        }

        a {
          text-decoration: none;
        }

        .product-card {
          transition:
            transform .2s ease,
            box-shadow .2s ease;
        }

        .product-card:hover {
          transform: translateY(-5px);
        }

        .image-zoom {
          transition:
            transform .35s ease;
        }

        .product-card:hover
        .image-zoom {
          transform: scale(1.05);
        }

        .hide-scrollbar {
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 800px) {
          .desktop-nav {
            display: none !important;
          }

          .mobile-menu {
            display: flex !important;
          }

          .hero-grid {
            grid-template-columns:
              1fr !important;
          }

          .stats-grid {
            grid-template-columns:
              repeat(2, 1fr) !important;
          }

          .products-grid {
            grid-template-columns:
              repeat(2, minmax(0, 1fr))
              !important;

            gap: 10px !important;
          }

          .product-image {
            height: 190px !important;
          }

          .product-info {
            padding: 11px !important;
          }

          .product-title {
            font-size: 14px !important;
          }

          .hero-title {
            font-size: 34px !important;
          }

          .modal-content {
            grid-template-columns:
              1fr !important;
          }

          .modal-image {
            min-height: 280px !important;
          }

          .modal-image img {
            min-height: 280px !important;
          }
        }

        @media (max-width: 430px) {
          .products-grid {
            gap: 8px !important;
          }

          .product-image {
            height: 170px !important;
          }

          .hero-title {
            font-size: 29px !important;
          }

          .stats-number {
            font-size: 18px !important;
          }
        }
      `}</style>

      {/* =================================================
          HEADER
      ================================================= */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,

          borderBottom: `1px solid ${
            darkMode
              ? "#27272a"
              : "#e4e4e7"
          }`,

          background: darkMode
            ? "rgba(9,9,11,.94)"
            : "rgba(255,255,255,.94)",

          backdropFilter:
            "blur(15px)",
        }}
      >
        <div
          style={{
            maxWidth: 1250,
            margin: "auto",
            padding:
              "13px 20px",

            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",

            gap: 15,
          }}
        >
          {/* LOGO */}

          <button
            onClick={() => {
              setCategory("all");
              setSearch("");
              setShowFavorites(false);

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,

              border: 0,
              background:
                "transparent",

              color: "inherit",

              padding: 0,
            }}
          >
            <div
              style={{
                width: 43,
                height: 43,
                borderRadius: 14,

                display: "grid",
                placeItems: "center",

                background:
                  "linear-gradient(135deg,#111827,#3f3f46)",

                color: "#fff",

                fontSize: 22,

                boxShadow:
                  "0 8px 20px rgba(0,0,0,.14)",
              }}
            >
              📱
            </div>

            <div
              style={{
                textAlign: "right",
              }}
            >
              <div
                style={{
                  fontWeight: 950,
                  fontSize: 18,
                }}
              >
                {STORE_NAME}
              </div>

              <div
                style={{
                  fontSize: 10,
                  opacity: 0.5,
                }}
              >
                موبايلات وإكسسوارات
              </div>
            </div>
          </button>

          {/* NAV */}

          <nav
            className="desktop-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <HeaderButton
              text="المنتجات"
              onClick={() => {
                setShowFavorites(false);
                setCategory("all");
                goToProducts();
              }}
            />

            <HeaderButton
              text={`❤️ المفضلة${
                favorites.length
                  ? ` (${favorites.length})`
                  : ""
              }`}
              onClick={() => {
                setShowFavorites(true);
                goToProducts();
              }}
            />
          </nav>

          {/* ACTIONS */}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
          >
            {/* DARK MODE */}

            <button
              onClick={() =>
                setDarkMode(
                  (current) => !current
                )
              }
              title={
                darkMode
                  ? "الوضع الفاتح"
                  : "الوضع الليلي"
              }
              style={{
                width: 41,
                height: 41,
                borderRadius: 12,

                border: `1px solid ${
                  darkMode
                    ? "#3f3f46"
                    : "#e4e4e7"
                }`,

                background: darkMode
                  ? "#18181b"
                  : "#fff",

                color: "inherit",

                fontSize: 18,
              }}
            >
              {darkMode
                ? "☀️"
                : "🌙"}
            </button>

            {/* WHATSAPP */}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              style={{
                minHeight: 41,
                padding:
                  "0 13px",

                display: "flex",
                alignItems:
                  "center",
                justifyContent:
                  "center",

                gap: 6,

                borderRadius: 12,

                background:
                  "#22c55e",

                color: "#fff",

                fontWeight: 900,

                fontSize: 12,
              }}
            >
              💬 واتساب
            </a>

            {/* MOBILE MENU */}

            <button
              className="mobile-menu"
              onClick={() =>
                setMobileMenu(
                  (current) =>
                    !current
                )
              }
              style={{
                width: 41,
                height: 41,

                alignItems:
                  "center",
                justifyContent:
                  "center",

                borderRadius: 12,

                border: `1px solid ${
                  darkMode
                    ? "#3f3f46"
                    : "#e4e4e7"
                }`,

                background: darkMode
                  ? "#18181b"
                  : "#fff",

                color: "inherit",

                fontSize: 18,
              }}
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}

        {mobileMenu && (
          <div
            className="mobile-menu"
            style={{
              flexDirection: "column",
              gap: 8,

              padding:
                "0 15px 14px",
            }}
          >
            <button
              onClick={() => {
                setShowFavorites(false);
                setCategory("all");
                setMobileMenu(false);
                goToProducts();
              }}
              style={{
                width: "100%",
                padding: 13,

                border: 0,
                borderRadius: 12,

                background: darkMode
                  ? "#18181b"
                  : "#f4f4f5",

                color: "inherit",

                fontWeight: 800,
              }}
            >
              📦 المنتجات
            </button>

            <button
              onClick={() => {
                setShowFavorites(true);
                setMobileMenu(false);
                goToProducts();
              }}
              style={{
                width: "100%",
                padding: 13,

                border: 0,
                borderRadius: 12,

                background: darkMode
                  ? "#18181b"
                  : "#f4f4f5",

                color: "inherit",

                fontWeight: 800,
              }}
            >
              ❤️ المفضلة
            </button>
          </div>
        )}
      </header>

      {/* =================================================
          HERO
      ================================================= */}

      <section
        style={{
          maxWidth: 1250,
          margin: "auto",

          padding:
            "35px 20px 20px",
        }}
      >
        <div
          className="hero-grid"
          style={{
            display: "grid",

            gridTemplateColumns:
              "1.35fr .65fr",

            gap: 17,
          }}
        >
          {/* HERO */}

          <div
            style={{
              minHeight: 320,

              borderRadius: 28,

              padding:
                "42px 35px",

              position: "relative",

              overflow: "hidden",

              color: "#fff",

              background:
                "radial-gradient(circle at 85% 15%,rgba(255,255,255,.18),transparent 30%),linear-gradient(135deg,#111827,#27272a 55%,#3f3f46)",

              boxShadow:
                "0 25px 60px rgba(0,0,0,.14)",
            }}
          >
            <div
              style={{
                display:
                  "inline-flex",

                padding:
                  "7px 11px",

                borderRadius: 99,

                background:
                  "rgba(255,255,255,.1)",

                border:
                  "1px solid rgba(255,255,255,.12)",

                fontSize: 12,

                marginBottom: 18,
              }}
            >
              ✨ أهلاً بيك في مكة ستور
            </div>

            <h1
              className="hero-title"
              style={{
                margin: 0,

                fontSize: 48,

                lineHeight: 1.1,

                fontWeight: 950,
              }}
            >
              أحدث الموبايلات
              <br />
              والإكسسوارات
              <br />
              في{" "}
              <span
                style={{
                  color: "#d4d4d8",
                }}
              >
                {STORE_NAME}
              </span>
            </h1>

            <p
              style={{
                maxWidth: 580,

                color: "#d4d4d8",

                lineHeight: 1.8,

                fontSize: 14,

                margin:
                  "18px 0 22px",
              }}
            >
              اختار الموبايل أو
              الإكسسوار اللي يناسبك
              وشوف التفاصيل والسعر
              وتواصل معانا مباشرة
              على واتساب.
            </p>

            <button
              onClick={goToProducts}
              style={{
                border: 0,

                borderRadius: 13,

                padding:
                  "13px 20px",

                background: "#fff",

                color: "#111827",

                fontWeight: 900,
              }}
            >
              تصفح المنتجات ←
            </button>
          </div>

          {/* CONTACT */}

          <div
            style={{
              borderRadius: 28,

              padding: 25,

              background: darkMode
                ? "#18181b"
                : "#fff",

              border: `1px solid ${
                darkMode
                  ? "#27272a"
                  : "#e4e4e7"
              }`,

              boxShadow: darkMode
                ? "none"
                : "0 15px 40px rgba(0,0,0,.05)",

              display: "flex",

              flexDirection:
                "column",

              justifyContent:
                "space-between",
            }}
          >
            <div>
              <div
                style={{
                  width: 55,
                  height: 55,

                  borderRadius: 17,

                  display: "grid",
                  placeItems: "center",

                  background:
                    "#dcfce7",

                  fontSize: 27,

                  marginBottom: 18,
                }}
              >
                💬
              </div>

              <div
                style={{
                  fontSize: 12,
                  opacity: 0.5,
                }}
              >
                تواصل معنا
              </div>

              <div
                style={{
                  direction: "ltr",
                  textAlign: "right",

                  fontSize: 24,

                  fontWeight: 950,

                  marginTop: 5,
                }}
              >
                {WHATSAPP_DISPLAY}
              </div>

              <p
                style={{
                  lineHeight: 1.8,

                  opacity: 0.6,

                  fontSize: 13,
                }}
              >
                للاستفسار عن السعر
                والتوفر أو طلب المنتج
                تواصل معنا على واتساب.
              </p>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "flex",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                padding: 14,

                borderRadius: 14,

                background:
                  "#22c55e",

                color: "#fff",

                fontWeight: 900,
              }}
            >
              افتح واتساب
            </a>
          </div>
        </div>
      </section>

      {/* =================================================
          STATISTICS
      ================================================= */}

      <section
        style={{
          maxWidth: 1250,
          margin: "auto",

          padding:
            "0 20px 25px",
        }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(4,1fr)",

            gap: 11,
          }}
        >
          <StatCard
            darkMode={darkMode}
            icon="📦"
            number={PRODUCTS.length}
            title="إجمالي المنتجات"
          />

          <StatCard
            darkMode={darkMode}
            icon="📱"
            number={phoneCount}
            title="موبايلات"
          />

          <StatCard
            darkMode={darkMode}
            icon="🛡️"
            number={casesCount}
            title="كفرات"
          />

          <StatCard
            darkMode={darkMode}
            icon="🔌"
            number={accessoriesCount}
            title="إكسسوارات"
          />
        </div>
      </section>

      {/* =================================================
          PRODUCTS
      ================================================= */}

      <section
        id="products"
        style={{
          maxWidth: 1250,
          margin: "auto",

          padding:
            "10px 20px 70px",
        }}
      >
        {/* TITLE */}

        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "end",

            gap: 15,

            flexWrap: "wrap",

            marginBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                opacity: 0.5,
                marginBottom: 5,
              }}
            >
              {showFavorites
                ? "المنتجات المحفوظة"
                : "متجر مكة"}
            </div>

            <h2
              style={{
                margin: 0,

                fontSize: 30,

                fontWeight: 950,
              }}
            >
              {showFavorites
                ? "المفضلة ❤️"
                : "منتجاتنا"}
            </h2>
          </div>

          {showFavorites && (
            <button
              onClick={() =>
                setShowFavorites(false)
              }
              style={{
                padding:
                  "10px 14px",

                borderRadius: 12,

                border: `1px solid ${
                  darkMode
                    ? "#3f3f46"
                    : "#e4e4e7"
                }`,

                background:
                  darkMode
                    ? "#18181b"
                    : "#fff",

                color: "inherit",

                fontWeight: 800,
              }}
            >
              عرض كل المنتجات
            </button>
          )}
        </div>

        {/* SEARCH */}

        <div
          style={{
            position: "relative",

            marginBottom: 14,
          }}
        >
          <span
            style={{
              position: "absolute",

              right: 15,

              top: "50%",

              transform:
                "translateY(-50%)",

              opacity: 0.5,
            }}
          >
            🔎
          </span>

          <input
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="ابحث عن موبايل أو كفر أو إكسسوار..."
            style={{
              width: "100%",

              minHeight: 52,

              borderRadius: 14,

              border: `1px solid ${
                darkMode
                  ? "#3f3f46"
                  : "#e4e4e7"
              }`,

              background:
                darkMode
                  ? "#18181b"
                  : "#fff",

              color: "inherit",

              outline: "none",

              padding:
                "0 45px 0 15px",

              fontSize: 14,
            }}
          />
        </div>

        {/* CATEGORIES */}

        <div
          className="hide-scrollbar"
          style={{
            display: "flex",

            gap: 8,

            overflowX: "auto",

            paddingBottom: 5,

            marginBottom: 22,
          }}
        >
          {CATEGORIES.map(
            (item) => {
              const active =
                !showFavorites &&
                category ===
                  item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setShowFavorites(
                      false
                    );

                    setCategory(
                      item.id as
                        | "all"
                        | Category
                    );
                  }}
                  style={{
                    flexShrink: 0,

                    border: active
                      ? "1px solid #111827"
                      : `1px solid ${
                          darkMode
                            ? "#3f3f46"
                            : "#e4e4e7"
                        }`,

                    background: active
                      ? "#111827"
                      : darkMode
                      ? "#18181b"
                      : "#fff",

                    color: active
                      ? "#fff"
                      : "inherit",

                    padding:
                      "10px 15px",

                    borderRadius: 12,

                    fontWeight: 800,

                    fontSize: 13,
                  }}
                >
                  {item.icon}{" "}
                  {item.name}
                </button>
              );
            }
          )}
        </div>

        {/* PRODUCTS */}

        {filteredProducts.length ===
        0 ? (
          <div
            style={{
              minHeight: 260,

              display: "grid",

              placeItems: "center",

              textAlign: "center",

              borderRadius: 20,

              border: `1px dashed ${
                darkMode
                  ? "#3f3f46"
                  : "#d4d4d8"
              }`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 40,
                  marginBottom: 10,
                }}
              >
                🔍
              </div>

              <div
                style={{
                  fontWeight: 900,

                  fontSize: 18,
                }}
              >
                مفيش منتجات
              </div>

              <div
                style={{
                  opacity: 0.5,

                  fontSize: 13,

                  marginTop: 5,
                }}
              >
                جرّب تغير البحث أو
                القسم.
              </div>
            </div>
          </div>
        ) : (
          <div
            className="products-grid"
            style={{
              display: "grid",

              gridTemplateColumns:
                "repeat(4,minmax(0,1fr))",

              gap: 16,
            }}
          >
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  darkMode={darkMode}
                  favorite={favorites.includes(
                    product.id
                  )}
                  onFavorite={() =>
                    toggleFavorite(
                      product.id
                    )
                  }
                  onDetails={() =>
                    setSelectedProduct(
                      product
                    )
                  }
                />
              )
            )}
          </div>
        )}
      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer
        style={{
          borderTop: `1px solid ${
            darkMode
              ? "#27272a"
              : "#e4e4e7"
          }`,

          background: darkMode
            ? "#0f0f11"
            : "#fff",
        }}
      >
        <div
          style={{
            maxWidth: 1250,
            margin: "auto",

            padding:
              "30px 20px",

            display: "flex",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            gap: 20,

            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,

                fontWeight: 950,

                marginBottom: 5,
              }}
            >
              {STORE_NAME}
            </div>

            <div
              style={{
                fontSize: 11,

                opacity: 0.5,
              }}
            >
              موبايلات وإكسسوارات
            </div>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noreferrer"
            style={{
              color: "#16a34a",

              fontWeight: 900,
            }}
          >
            💬 {WHATSAPP_DISPLAY}
          </a>
        </div>
      </footer>

      {/* =================================================
          PRODUCT MODAL
      ================================================= */}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          darkMode={darkMode}
          favorite={favorites.includes(
            selectedProduct.id
          )}
          onClose={() =>
            setSelectedProduct(null)
          }
          onFavorite={() =>
            toggleFavorite(
              selectedProduct.id
            )
          }
        />
      )}
    </main>
  );
}

// =========================================================
// HEADER BUTTON
// =========================================================

function HeaderButton({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: 0,

        background:
          "transparent",

        color: "inherit",

        padding:
          "10px 13px",

        borderRadius: 10,

        fontWeight: 800,
      }}
    >
      {text}
    </button>
  );
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  darkMode,
  icon,
  number,
  title,
}: {
  darkMode: boolean;
  icon: string;
  number: number;
  title: string;
}) {
  return (
    <div
      style={{
        padding: 16,

        borderRadius: 18,

        background: darkMode
          ? "#18181b"
          : "#fff",

        border: `1px solid ${
          darkMode
            ? "#27272a"
            : "#e4e4e7"
        }`,

        display: "flex",

        alignItems: "center",

        gap: 11,
      }}
    >
      <div
        style={{
          width: 43,
          height: 43,

          borderRadius: 13,

          display: "grid",

          placeItems: "center",

          background: darkMode
            ? "#27272a"
            : "#f4f4f5",

          fontSize: 20,
        }}
      >
        {icon}
      </div>

      <div>
        <div
          className="stats-number"
          style={{
            fontSize: 20,

            fontWeight: 950,
          }}
        >
          {number}
        </div>

        <div
          style={{
            fontSize: 10,

            opacity: 0.5,
          }}
        >
          {title}
        </div>
      </div>
    </div>
  );
}

// =========================================================
// PRODUCT CARD
// =========================================================

function ProductCard({
  product,
  darkMode,
  favorite,
  onFavorite,
  onDetails,
}: {
  product: Product;
  darkMode: boolean;
  favorite: boolean;
  onFavorite: () => void;
  onDetails: () => void;
}) {
  const discount =
    getDiscount(product);

  return (
    <article
      className="product-card"
      style={{
        overflow: "hidden",

        borderRadius: 20,

        background: darkMode
          ? "#18181b"
          : "#fff",

        border: `1px solid ${
          darkMode
            ? "#27272a"
            : "#e4e4e7"
        }`,

        boxShadow: darkMode
          ? "none"
          : "0 10px 30px rgba(0,0,0,.05)",
      }}
    >
      {/* IMAGE */}

      <div
        className="product-image"
        style={{
          height: 230,

          background: darkMode
            ? "#27272a"
            : "#f4f4f5",

          position: "relative",

          overflow: "hidden",
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="image-zoom"
            style={{
              width: "100%",
              height: "100%",

              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              height: "100%",

              display: "grid",

              placeItems: "center",

              fontSize: 50,
            }}
          >
            📱
          </div>
        )}

        {/* FAVORITE */}

        <button
          onClick={onFavorite}
          style={{
            position: "absolute",

            top: 10,
            left: 10,

            width: 38,
            height: 38,

            borderRadius: 12,

            border:
              "1px solid rgba(255,255,255,.35)",

            background:
              "rgba(0,0,0,.4)",

            color: "#fff",

            fontSize: 18,

            backdropFilter:
              "blur(8px)",
          }}
        >
          {favorite
            ? "❤️"
            : "♡"}
        </button>

        {/* DISCOUNT */}

        {discount > 0 && (
          <div
            style={{
              position:
                "absolute",

              top: 10,
              right: 10,

              background:
                "#ef4444",

              color: "#fff",

              padding:
                "6px 8px",

              borderRadius: 8,

              fontSize: 10,

              fontWeight: 900,
            }}
          >
            خصم {discount}%
          </div>
        )}

        {/* STOCK */}

        {product.stock <= 0 ? (
          <div
            style={{
              position:
                "absolute",

              bottom: 10,
              right: 10,

              background:
                "#18181b",

              color: "#fff",

              padding:
                "6px 9px",

              borderRadius: 8,

              fontSize: 10,

              fontWeight: 800,
            }}
          >
            غير متوفر
          </div>
        ) : product.stock <= 3 ? (
          <div
            style={{
              position:
                "absolute",

              bottom: 10,
              right: 10,

              background:
                "#f59e0b",

              color: "#fff",

              padding:
                "6px 9px",

              borderRadius: 8,

              fontSize: 10,

              fontWeight: 800,
            }}
          >
            متبقي {product.stock}
          </div>
        ) : null}
      </div>

      {/* INFO */}

      <div
        className="product-info"
        style={{
          padding: 15,
        }}
      >
        <div
          style={{
            fontSize: 10,

            opacity: 0.5,

            marginBottom: 5,
          }}
        >
          {product.brand}
        </div>

        <h3
          className="product-title"
          style={{
            margin:
              "0 0 9px",

            fontSize: 16,

            lineHeight: 1.4,

            fontWeight: 900,

            minHeight: 44,
          }}
        >
          {product.name}
        </h3>

        {/* SPECS */}

        <div
          style={{
            display: "flex",

            flexWrap: "wrap",

            gap: 5,

            marginBottom: 11,
          }}
        >
          {product.storage && (
            <Tag
              text={
                product.storage
              }
              darkMode={
                darkMode
              }
            />
          )}

          {product.ram && (
            <Tag
              text={product.ram}
              darkMode={
                darkMode
              }
            />
          )}

          {product.color && (
            <Tag
              text={
                product.color
              }
              darkMode={
                darkMode
              }
            />
          )}

          {product.compatible && (
            <Tag
              text={
                product.compatible
              }
              darkMode={
                darkMode
              }
            />
          )}
        </div>

        {/* PRICE */}

        <div
          style={{
            marginBottom: 12,
          }}
        >
          <div
            style={{
              fontSize: 18,

              fontWeight: 950,
            }}
          >
            {formatPrice(
              product.price
            )}
          </div>

          {product.oldPrice &&
            product.oldPrice >
              product.price && (
              <div
                style={{
                  marginTop: 2,

                  fontSize: 10,

                  opacity: 0.4,

                  textDecoration:
                    "line-through",
                }}
              >
                {formatPrice(
                  product.oldPrice
                )}
              </div>
            )}
        </div>

        {/* BUTTONS */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "1fr 1fr",

            gap: 7,
          }}
        >
          <button
            onClick={onDetails}
            style={{
              padding: 10,

              borderRadius: 11,

              border: `1px solid ${
                darkMode
                  ? "#3f3f46"
                  : "#e4e4e7"
              }`,

              background:
                darkMode
                  ? "#27272a"
                  : "#fff",

              color: "inherit",

              fontWeight: 800,

              fontSize: 11,
            }}
          >
            التفاصيل
          </button>

          <a
            href={getWhatsAppLink(
              product
            )}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",

              alignItems:
                "center",

              justifyContent:
                "center",

              borderRadius: 11,

              background:
                product.stock > 0
                  ? "#22c55e"
                  : "#71717a",

              color: "#fff",

              fontWeight: 900,

              fontSize: 11,

              pointerEvents:
                product.stock > 0
                  ? "auto"
                  : "none",
            }}
          >
            💬 واتساب
          </a>
        </div>
      </div>
    </article>
  );
}

// =========================================================
// TAG
// =========================================================

function Tag({
  text,
  darkMode,
}: {
  text: string;
  darkMode: boolean;
}) {
  return (
    <span
      style={{
        fontSize: 9,

        padding:
          "4px 6px",

        borderRadius: 6,

        background: darkMode
          ? "#27272a"
          : "#f4f4f5",

        opacity: 0.8,
      }}
    >
      {text}
    </span>
  );
}

// =========================================================
// PRODUCT MODAL
// =========================================================

function ProductModal({
  product,
  darkMode,
  favorite,
  onClose,
  onFavorite,
}: {
  product: Product;

  darkMode: boolean;

  favorite: boolean;

  onClose: () => void;

  onFavorite: () => void;
}) {
  const discount =
    getDiscount(product);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",

        inset: 0,

        zIndex: 100,

        padding: 15,

        display: "flex",

        alignItems:
          "center",

        justifyContent:
          "center",

        background:
          "rgba(0,0,0,.68)",

        backdropFilter:
          "blur(8px)",
      }}
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        style={{
          width:
            "min(900px,100%)",

          maxHeight: "90vh",

          overflowY: "auto",

          borderRadius: 24,

          background: darkMode
            ? "#18181b"
            : "#fff",

          color: "inherit",

          position: "relative",

          boxShadow:
            "0 30px 80px rgba(0,0,0,.3)",
        }}
      >
        {/* CLOSE */}

        <button
          onClick={onClose}
          style={{
            position:
              "absolute",

            top: 13,
            left: 13,

            zIndex: 2,

            width: 40,
            height: 40,

            borderRadius: 12,

            border:
              "1px solid rgba(255,255,255,.2)",

            background:
              "rgba(0,0,0,.5)",

            color: "#fff",

            fontSize: 20,
          }}
        >
          ×
        </button>

        <div
          className="modal-content"
          style={{
            display: "grid",

            gridTemplateColumns:
              "minmax(0,.9fr) minmax(0,1.1fr)",
          }}
        >
          {/* IMAGE */}

          <div
            className="modal-image"
            style={{
              minHeight: 430,

              background:
                darkMode
                  ? "#27272a"
                  : "#f4f4f5",

              overflow: "hidden",

              display: "grid",

              placeItems: "center",
            }}
          >
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: "100%",

                  height: "100%",

                  minHeight: 430,

                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  fontSize: 80,
                }}
              >
                📱
              </div>
            )}
          </div>

          {/* CONTENT */}

          <div
            style={{
              padding: 28,
            }}
          >
            <div
              style={{
                fontSize: 12,

                opacity: 0.5,

                marginBottom: 7,
              }}
            >
              {product.brand}
            </div>

            <h2
              style={{
                margin: 0,

                fontSize: 29,

                lineHeight: 1.3,

                fontWeight: 950,
              }}
            >
              {product.name}
            </h2>

            {discount > 0 && (
              <div
                style={{

                  
