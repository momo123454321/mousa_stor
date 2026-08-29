"use client";

import { useMemo, useState } from "react";

type Category =
  | "shirts"
  | "hoodies"
  | "jackets"
  | "pants"
  | "shoes"
  | "accessories";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: Category;
};

type Offer = Omit<Product, "category"> & {
  category: Category;
};

const whatsappNumber = "201287254329";

const categories = [
  { id: "all", name: "كل المنتجات" },
  { id: "shirts", name: "قمصان وتيشرتات" },
  { id: "hoodies", name: "هوديز وسويت شيرت" },
  { id: "jackets", name: "جواكيت ومعاطف" },
  { id: "pants", name: "بنطلونات وشورتات" },
  { id: "shoes", name: "أحذية وسنيكرز" },
  { id: "accessories", name: "إكسسوارات وعناية" },
];

const offers: Offer[] = [
  {
    id: 1,
    name: "عرض الصيف المتكامل",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=800&q=80",
    description:
      "طقم كاجوال صيفي مريح جداً بخامة ممتازة، مثالي للخروجات اليومية والمصايف.",
    category: "shirts",
  },
  {
    id: 2,
    name: "طقم كلاسيك أنيق",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=800&q=80",
    description:
      "بدلة شبه رسمية بتفصيل عصري وخامات فاخرة تناسب المناسبات واجتماعات العمل.",
    category: "jackets",
  },
  {
    id: 3,
    name: "الباقة الشبابية المحدودة",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    description:
      "تجميعة مميزة من قطعتين بألوان متناسقة وعصرية لإطلالة جذابة ومختلفة.",
    category: "shirts",
  },
];

const products: Product[] = [
  {
    id: 4,
    name: "قميص أبيض أوكسفورد",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
    description: "قميص كلاسيكي أبيض بخامة أوكسفورد ثقيلة ومقاومة للتجعد.",
    category: "shirts",
  },
  {
    id: 5,
    name: "تيشرت بيزك قطن صافي",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    description: "تيشرت قطني ناعم ومريح، مناسب للاستخدام اليومي.",
    category: "shirts",
  },
  {
    id: 6,
    name: "قميص جينز كاجوال الأزرق",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
    description: "قميص جينز عصري مصنوع من الدنيم الخفيف والمتين.",
    category: "shirts",
  },
  {
    id: 7,
    name: "قميص كتان بيج صيفي",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
    description: "قميص كتان خفيف ومنعش، مناسب للأجواء الصيفية.",
    category: "shirts",
  },
  {
    id: 8,
    name: "تيشرت بولو كلاسيك أسود",
    price: 380,
    image:
      "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=600&q=80",
    description: "تيشرت بولو بياقة أنيقة مناسب للخروج اليومي.",
    category: "shirts",
  },
  {
    id: 9,
    name: "قميص مقلم كاجوال عصري",
    price: 480,
    image:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
    description: "قميص مقلم بتصميم عصري يناسب الإطلالات الكاجوال.",
    category: "shirts",
  },
  {
    id: 10,
    name: "تيشرت جرافيك هيب هوب",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
    description: "تيشرت شبابي بطباعة جرافيك وقصة مريحة.",
    category: "shirts",
  },
  {
    id: 11,
    name: "قميص زيتي سليم فيت",
    price: 460,
    image:
      "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80",
    description: "قميص زيتي أنيق بقصة Slim Fit.",
    category: "shirts",
  },
  {
    id: 12,
    name: "تيشرت أوفرسايز رمادي",
    price: 340,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
    description: "تيشرت Oversized شبابي ومريح.",
    category: "shirts",
  },
  {
    id: 13,
    name: "قميص كاروهات أحمر",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    description: "قميص كاروهات كلاسيكي مناسب للارتداء مع تيشرت سادة.",
    category: "shirts",
  },

  {
    id: 14,
    name: "هودي أوفرسايز عصري",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
    description: "هودي Oversized مريح ومبطن من الداخل.",
    category: "hoodies",
  },
  {
    id: 15,
    name: "سويت شيرت نيفي بيزك",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
    description: "سويت شيرت كحلي بخامة مريحة وثقيلة.",
    category: "hoodies",
  },
  {
    id: 16,
    name: "هودي بسحاب كامل أسود",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
    description: "هودي Zip-up عملي بجيوب أمامية واسعة.",
    category: "hoodies",
  },
  {
    id: 17,
    name: "بلوفر تريكو صوف ناعم",
    price: 690,
    image:
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80",
    description: "بلوفر تريكو أنيق بخامة صوف ناعمة.",
    category: "hoodies",
  },
  {
    id: 18,
    name: "سويت شيرت مطبوع كاجوال",
    price: 550,
    image:
      "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
    description: "سويت شيرت شبابي بطبعة عصرية.",
    category: "hoodies",
  },
  {
    id: 19,
    name: "هودي باستيل مبطن",
    price: 749,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
    description: "هودي بألوان باستيل وخامة قطنية ناعمة.",
    category: "hoodies",
  },
  {
    id: 20,
    name: "سويت شيرت رياضي مريح",
    price: 480,
    image:
      "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=600&q=80",
    description: "سويت شيرت خفيف مناسب للجيم والجري.",
    category: "hoodies",
  },

  {
    id: 21,
    name: "جاكيت جلد بريميوم",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    description: "جاكيت جلد بتصميم Biker أنيق وقوي.",
    category: "jackets",
  },
  {
    id: 22,
    name: "جاكيت جينز كلاسيك ممزق",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80",
    description: "جاكيت دنيم أزرق بلمسات كاجوال عصرية.",
    category: "jackets",
  },
  {
    id: 23,
    name: "بالطو صوف طويل فخم",
    price: 2400,
    image:
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
    description: "معطف شتوي طويل من الصوف الفاخر.",
    category: "jackets",
  },
  {
    id: 24,
    name: "جاكيت بامب ووتربروف",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
    description: "جاكيت Puffer مقاوم للماء والهواء.",
    category: "jackets",
  },
  {
    id: 25,
    name: "جاكيت بومبر شبابي أسود",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
    description: "جاكيت Bomber شبابي مقاوم للرياح.",
    category: "jackets",
  },
  {
    id: 26,
    name: "جاكيت وندبريكر خفيف",
    price: 650,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
    description: "جاكيت رياضي خفيف لفصلي الخريف والربيع.",
    category: "jackets",
  },
  {
    id: 27,
    name: "جاكيت جباردين زيتي بجيوب",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=80",
    description: "جاكيت عملي بأربع جيوب أمامية.",
    category: "jackets",
  },
  {
    id: 28,
    name: "بليزر كاجوال رمادي",
    price: 1350,
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    description: "بليزر رمادي مناسب للـ Smart Casual.",
    category: "jackets",
  },

  {
    id: 29,
    name: "بنطلون تشينو كلاسيك بيج",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
    description: "بنطلون تشينو مريح بقصة Slim Fit.",
    category: "pants",
  },
  {
    id: 30,
    name: "بنطلون جينز أزرق غامق",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    description: "جينز أزرق متين ومريح للاستخدام اليومي.",
    category: "pants",
  },
  {
    id: 31,
    name: "بنطلون جينز أسود سليم ليكرا",
    price: 520,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    description: "جينز أسود بخامة مرنة وقصة Slim.",
    category: "pants",
  },
  {
    id: 32,
    name: "بنطلون كارغو زيتي بجيوب",
    price: 599,
    image:
      "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
    description: "Cargo شبابي بجيوب جانبية واسعة.",
    category: "pants",
  },
  {
    id: 33,
    name: "بنطلون جوجر قطن رمادي",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80",
    description: "Jogger قطني مريح للمنزل والمشاوير.",
    category: "pants",
  },
  {
    id: 34,
    name: "شورت كاجوال قطن كحلي",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
    description: "شورت صيفي خفيف ومريح.",
    category: "pants",
  },
  {
    id: 35,
    name: "بنطلون قماش رمادي رسمي",
    price: 580,
    image:
      "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
    description: "بنطلون قماش أنيق للمناسبات والاجتماعات.",
    category: "pants",
  },
  {
    id: 36,
    name: "بنطلون جينز ثلجي هادي",
    price: 540,
    image:
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
    description: "جينز فاتح بلون ثلجي وقصة عصرية.",
    category: "pants",
  },

  {
    id: 37,
    name: "حذاء سنيكرز أبيض فاخر",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
    description: "سنيكرز أبيض خفيف ومريح للمشي.",
    category: "shoes",
  },
  {
    id: 38,
    name: "حذاء كلاسيك جلد بني",
    price: 1100,
    image:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
    description: "حذاء Oxford كلاسيكي من الجلد.",
    category: "shoes",
  },

  // المنتج رقم 39 كان ناقصاً في الكود الأصلي
  {
    id: 39,
    name: "سنيكرز أسود كاجوال",
    price: 749,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "سنيكرز أسود عملي ومناسب للإطلالات اليومية.",
    category: "shoes",
  },

  {
    id: 40,
    name: "هاف بوت شمواه هافان",
    price: 950,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    description: "Chelsea Boot من الشمواه الفاخر.",
    category: "shoes",
  },
  {
    id: 41,
    name: "سنيكرز رمادي رياضي عصري",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80",
    description: "سنيكرز رمادي خفيف وجيد التهوية.",
    category: "shoes",
  },
  {
    id: 42,
    name: "حذاء لوفرز مريح بدون أربطة",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
    description: "Loafers مريح وسهل الارتداء.",
    category: "shoes",
  },
  {
    id: 43,
    name: "بوت جلدي شتوي متين",
    price: 1390,
    image:
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80",
    description: "بوت جلدي شتوي متين ومبطن من الداخل.",
    category: "shoes",
  },
  {
    id: 44,
    name: "سليبر جلدي منزلي مريح",
    price: 250,
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
    description: "سليبر مريح للمنزل والشاطئ.",
    category: "shoes",
  },

  {
    id: 45,
    name: "ساعة كوارتز سوداء بسير جلدي",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "ساعة كلاسيكية أنيقة بسير جلدي.",
    category: "accessories",
  },
  {
    id: 46,
    name: "نظارة شمسية بولارايزد كلاسيك",
    price: 450,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    description: "نظارة شمسية بتصميم كلاسيكي وعدسات Polarized.",
    category: "accessories",
  },
  {
    id: 47,
    name: "حزام جلد طبيعي 100% أسود",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
    description: "حزام جلد أسود بتصميم كلاسيكي.",
    category: "accessories",
  },
  {
    id: 48,
    name: "كاب قطني رياضي أسود",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
    description: "كاب قطني رياضي قابل لتعديل المقاس.",
    category: "accessories",
  },
  {
    id: 49,
    name: "محفظة كروت جلدية نحيفة",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
    description: "محفظة كروت Slim بتصميم عملي.",
    category: "accessories",
  },
  {
    id: 50,
    name: "برفان رجالي نايت ليميتد إيديشن",
    price: 850,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    description: "عطر رجالي برائحة شرقية جذابة.",
    category: "accessories",
  },
  {
    id: 51,
    name: "طقم جوارب قطنية طويلة 3 قطع",
    price: 150,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
    description: "ثلاثة أزواج جوارب قطنية مريحة.",
    category: "accessories",
  },
  {
    id: 52,
    name: "سوار جلدي كاجوال رجالي",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    description: "سوار جلدي شبابي بتصميم عصري.",
    category: "accessories",
  },
  {
    id: 53,
    name: "شنطة كروس للمتعلقات الشخصية",
    price: 390,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description: "شنطة Cross صغيرة وعملية للاستخدام اليومي.",
    category: "accessories",
  },
];

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeCategory, setActiveCategory] = useState("all");

  const showToast = (message: string) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage(null);
    }, 2200);
  };

  const addToCart = (item: Product | Offer) => {
    const product: Product = {
      ...item,
      category: item.category,
    };

    setCart((prev) => [...prev, product]);
    showToast(`تمت إضافة "${item.name}" للسلة بنجاح! 🛒`);
  };

  const toggleFavorite = (id: number, name: string) => {
    setFavorites((prev) => {
      if (prev.includes(id)) {
        showToast(`تمت إزالة "${name}" من المفضلة 💔`);
        return prev.filter((favId) => favId !== id);
      }

      showToast(`تمت إضافة "${name}" للمفضلة ❤️`);
      return [...prev, id];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const orderText = encodeURIComponent(
    cart.length
      ? `طلب جديد من متجر 3l_nagar Clothing 🛒

${cart
  .map((item, index) => `${index + 1}- ${item.name} | ${item.price} جنيه`)
  .join("\n")}

الإجمالي: ${total} جنيه

يرجى تأكيد الطلب وتحديد عنوان التوصيل.`
      : "أرغب بالاستفسار عن بعض المنتجات المتاحة لديكم."
  );

  const filteredAndSortedProducts = useMemo(() => {
    let result =
      activeCategory === "all"
        ? [...products]
        : products.filter((product) => product.category === activeCategory);

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  const favoriteItems: Product[] = [
    ...products.filter((product) => favorites.includes(product.id)),
    ...offers
      .filter((offer) => favorites.includes(offer.id))
      .map((offer) => ({ ...offer }) as Product),
  ];

  return (
    <main
      dir="rtl"
      className={`min-h-screen pb-20 font-sans transition-colors duration-500 ${
        darkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-gray-900"
      }`}
    >
      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
        }

        .perspective-3d {
          perspective: 1200px;
        }

        .card-3d-effect {
          transform-style: preserve-3d;
          transition:
            transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.5s;
        }

        .card-3d-effect:hover {
          transform:
            translateY(-8px)
            rotateX(2deg)
            rotateY(-2deg)
            translateZ(10px);
        }

        .glass-header {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 10px;
        }
      `}</style>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed inset-x-0 top-24 z-[300] flex justify-center px-4">
          <div className="rounded-2xl border border-gray-700/50 bg-gray-900/95 px-7 py-3.5 font-bold text-white shadow-2xl backdrop-blur-xl">
            {toastMessage}
          </div>
        </div>
      )}

      {/* Header */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors ${
          darkMode
            ? "border-slate-800 bg-slate-900/85"
            : "border-gray-200 bg-white/85"
        } glass-header`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <a
            href="#"
            className="text-2xl font-black tracking-tight md:text-3xl"
          >
            3l_nagar{" "}
            <span className="bg-gradient-to-l from-green-400 to-green-600 bg-clip-text text-transparent">
              Clothing
            </span>
          </a>

          <nav
            className={`hidden gap-7 text-sm font-bold md:flex ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <a className="transition hover:text-green-500" href="#">
              الرئيسية
            </a>
            <a className="transition hover:text-green-500" href="#offers">
              العروض
            </a>
            <a className="transition hover:text-green-500" href="#products">
              المنتجات
            </a>
            <a className="transition hover:text-green-500" href="#contact">
              تواصل معنا
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              aria-label="تغيير الوضع"
              onClick={() => setDarkMode((prev) => !prev)}
              className={`rounded-full border p-2.5 transition hover:scale-110 ${
                darkMode
                  ? "border-slate-700 bg-slate-800 text-yellow-400"
                  : "border-gray-200 bg-slate-100 text-slate-700"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              aria-label="المفضلة"
              onClick={() => setFavoritesOpen(true)}
              className="relative rounded-full border border-gray-200 bg-slate-100 p-2.5 text-red-500 transition hover:scale-110 dark:border-slate-700 dark:bg-slate-800"
            >
              ❤️

              {favorites.length > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section
        className={`relative overflow-hidden px-6 py-20 md:py-28 ${
          darkMode ? "bg-slate-900" : "bg-slate-50"
        }`}
      >
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-green-500/20 blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]" />

        <div className="perspective-3d mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div className="relative z-10">
            <span className="mb-6 inline-block rounded-full border border-green-200 bg-green-100 px-4 py-1.5 text-sm font-bold text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
              🌟 التشكيلة الجديدة
            </span>

            <h2 className="mb-6 text-5xl font-black leading-tight md:text-7xl">
              ارتقِ بأناقتك مع
              <br />
              <span className="bg-gradient-to-l from-green-500 to-emerald-700 bg-clip-text text-transparent">
                3l_nagar
              </span>
            </h2>

            <p
              className={`mb-10 max-w-2xl text-lg leading-relaxed md:text-xl ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              اكتشف تشكيلتنا الحصرية من الملابس الرجالية والكاجوال والأحذية
              والإكسسوارات المصممة بعناية لتبرز شخصيتك وتميزك في كل وقت.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="rounded-full bg-gray-900 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:bg-white dark:text-gray-900"
              >
                تسوق الآن 🛒
              </a>

              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-green-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-green-700"
              >
                تواصل عبر واتساب 💬
              </a>
            </div>
          </div>

          <div className="card-3d-effect relative">
            <div className="absolute inset-0 -z-10 scale-105 rotate-3 rounded-[2rem] bg-green-600/30 blur-md" />

            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1000&q=80"
              alt="3l_nagar Fashion"
              className="h-[450px] w-full rounded-[2rem] border-4 border-white/20 object-cover shadow-2xl md:h-[550px]"
            />
          </div>
        </div>
      </section>

      {/* Offers */}
      <section id="offers" className="perspective-3d px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h3 className="flex items-center gap-3 text-3xl font-black md:text-4xl">
              <span>🔥</span>
              عروض حصرية لفترة محدودة
            </h3>

            <p
              className={`mt-3 text-lg ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              وفر أكثر مع باقاتنا المجهزة خصيصاً لك.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`card-3d-effect group relative overflow-hidden rounded-[2rem] border ${
                  darkMode
                    ? "border-slate-800 bg-slate-900"
                    : "border-gray-100 bg-white"
                }`}
              >
                <span className="absolute right-4 top-4 z-20 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">
                  عرض خاص 🔥
                </span>

                <div
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden"
                  onClick={() => setSelectedProduct(offer)}
                >
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    loading="lazy"
                  />

                  <button
                    aria-label="إضافة للمفضلة"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(offer.id, offer.name);
                    }}
                    className="absolute left-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-md transition hover:scale-110"
                  >
                    {favorites.includes(offer.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="p-6 md:p-8">
                  <h4 className="mb-2 text-2xl font-black">{offer.name}</h4>

                  <p className="mb-6 text-2xl font-black text-green-600">
                    {offer.price}{" "}
                    <span className="text-sm text-gray-500">ج.م</span>
                  </p>

                  <button
                    onClick={() => addToCart(offer)}
                    className="w-full rounded-xl bg-gray-900 py-3.5 font-bold text-white transition hover:bg-black dark:bg-green-600 dark:hover:bg-green-700"
                  >
                    أضف للسلة 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search / Sort */}
      <section className="relative z-10 -mb-10 px-6">
        <div
          className={`mx-auto flex max-w-7xl flex-col gap-4 rounded-[2rem] border p-4 shadow-xl backdrop-blur-xl md:flex-row md:items-center md:justify-between md:p-6 ${
            darkMode
              ? "border-slate-700 bg-slate-800/80"
              : "border-gray-100 bg-white/80"
          }`}
        >
          <div className="relative w-full md:w-1/2">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg text-gray-400">
              🔍
            </span>

            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="ابحث عن قميص، بنطلون، سنيكرز..."
              className={`w-full rounded-xl border py-3.5 pl-4 pr-12 font-medium outline-none transition focus:ring-2 focus:ring-green-500 ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white placeholder-gray-500"
                  : "border-gray-200 bg-gray-50 text-gray-900"
              }`}
            />
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <span className="whitespace-nowrap font-bold">ترتيب حسب:</span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`w-full cursor-pointer rounded-xl border px-4 py-3.5 font-medium outline-none focus:ring-2 focus:ring-green-500 md:w-auto ${
                darkMode
                  ? "border-slate-700 bg-slate-900 text-white"
                  : "border-gray-200 bg-gray-50 text-gray-900"
              }`}
            >
              <option value="default">الافتراضي</option>
              <option value="price-asc">السعر: الأقل للأعلى</option>
              <option value="price-desc">السعر: الأعلى للأقل</option>
            </select>
          </div>
        </div>
      </section>

      {/* Products */}
      <section
        id="products"
        className={`px-6 pb-24 pt-32 ${
          darkMode ? "bg-slate-900/50" : "bg-slate-100/50"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-4xl font-black">التشكيلة الكاملة</h3>

            <p
              className={`mx-auto max-w-2xl text-lg ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              تصفح أحدث صيحات الموضة من ملابس وأحذية وإكسسوارات.
            </p>
          </div>

          {/* Categories */}
          <div className="mb-12 flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-bold transition ${
                  activeCategory === category.id
                    ? "scale-105 bg-green-600 text-white shadow-lg"
                    : darkMode
                      ? "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white"
                      : "border border-gray-200 bg-white text-gray-600 hover:border-green-500 hover:text-green-600"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="py-20 text-center">
              <div className="mb-4 text-6xl">🕵️‍♂️</div>

              <h4 className="mb-2 text-2xl font-bold">
                لم نتمكن من العثور على نتائج!
              </h4>

              <p className="text-gray-500">
                حاول البحث بكلمات مختلفة أو إزالة الفلاتر.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
              {filteredAndSortedProducts.map((product) => (
                <div
                  key={product.id}
                  className={`card-3d-effect group relative flex flex-col justify-between overflow-hidden rounded-[2rem] border ${
                    darkMode
                      ? "border-slate-800 bg-slate-900"
                      : "border-transparent bg-white shadow-sm"
                  }`}
                >
                  {product.price >= 1000 && (
                    <span className="absolute right-4 top-4 z-20 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 px-3 py-1 text-xs font-bold text-white shadow-md">
                      Premium 🌟
                    </span>
                  )}

                  <div
                    className="relative aspect-[4/5] cursor-pointer overflow-hidden bg-gray-100 dark:bg-slate-800"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    <button
                      aria-label="المفضلة"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product.id, product.name);
                      }}
                      className="absolute left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 shadow-md backdrop-blur-md transition hover:scale-110"
                    >
                      {favorites.includes(product.id) ? "❤️" : "🤍"}
                    </button>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h4 className="mb-1 line-clamp-1 text-lg font-bold transition group-hover:text-green-600">
                        {product.name}
                      </h4>

                      <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
                        {product.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-slate-800">
                      <p className="text-xl font-black">
                        {product.price}{" "}
                        <span className="text-xs text-gray-400">ج.م</span>
                      </p>

                      <button
                        onClick={() => addToCart(product)}
                        title="أضف للسلة"
                        className="rounded-xl bg-gray-100 p-3 font-bold text-gray-900 transition hover:bg-green-600 hover:text-white dark:bg-slate-800 dark:text-white"
                      >
                        ➕ 🛒
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="relative overflow-hidden bg-gradient-to-br from-gray-900 to-black px-6 py-24 text-center text-white"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1920&q=80')",
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl">
          <span className="mb-4 block font-bold text-green-400">
            نحن هنا لخدمتك 24/7
          </span>

          <h3 className="mb-6 text-4xl font-black md:text-5xl">
            محتار في المقاس أو التنسيق؟
          </h3>

          <p className="mb-10 text-lg leading-relaxed text-gray-300 md:text-xl">
            تواصل معنا الآن للحصول على استشارة مجانية أو لطلب منتجاتك مباشرة.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-green-500 px-10 py-5 text-lg font-black text-white shadow-lg transition hover:scale-105 hover:bg-green-600"
          >
            💬 تحدث معنا عبر الواتساب
          </a>
        </div>
      </section>

      {/* Floating buttons */}
      <div className="fixed bottom-6 right-6 z-[80] flex flex-col gap-4">
        <button
          onClick={() => setFavoritesOpen(true)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full border bg-white text-xl text-red-500 shadow-2xl transition hover:scale-110 dark:border-slate-700 dark:bg-slate-800"
        >
          ❤️

          {favorites.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {favorites.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-green-600 text-2xl text-white shadow-2xl transition hover:scale-110 dark:border-slate-900"
        >
          🛒

          {cart.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white">
              {cart.length}
            </span>
          )}
        </button>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] shadow-2xl md:flex-row ${
              darkMode
                ? "border border-slate-800 bg-slate-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white"
            >
              ✕
            </button>

            <div className="h-64 md:h-auto md:w-1/2">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center overflow-y-auto p-7 md:w-1/2 md:p-8">
              <span className="mb-2 text-sm font-bold uppercase text-green-500">
                {selectedProduct.category}
              </span>

              <h3 className="mb-3 text-3xl font-black">
                {selectedProduct.name}
              </h3>

              <p className="mb-6 text-2xl font-black text-green-600">
                {selectedProduct.price}{" "}
                <span className="text-sm text-gray-500">جنيه مصري</span>
              </p>

              <div
                className={`mb-8 rounded-2xl p-5 text-sm leading-relaxed ${
                  darkMode
                    ? "bg-slate-800 text-gray-300"
                    : "bg-gray-50 text-gray-700"
                }`}
              >
                {selectedProduct.description}
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full rounded-xl bg-green-600 py-4 text-lg font-bold text-white transition hover:bg-green-700"
              >
                أضف للسلة الآن 🛒
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
          onClick={() => setCartOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[2rem] shadow-2xl md:w-[500px] md:rounded-[2rem] ${
              darkMode
                ? "border border-slate-800 bg-slate-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="flex items-center justify-between border-b p-6 dark:border-slate-800">
              <h3 className="text-2xl font-black">🛒 سلة المشتريات</h3>

              <button
                onClick={() => setCartOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="py-16 text-center text-gray-500">
                  <div className="mb-6 text-7xl opacity-30">🪹</div>

                  <p className="mb-2 text-xl font-bold">
                    سلتك فارغة تماماً!
                  </p>

                  <p className="text-sm">
                    أضف بعض المنتجات إلى السلة أولاً.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className={`flex items-center gap-4 rounded-2xl border p-4 ${
                        darkMode
                          ? "border-slate-700 bg-slate-800/50"
                          : "border-gray-100 bg-gray-50"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">
                        <h4 className="mb-1 line-clamp-2 font-bold">
                          {item.name}
                        </h4>

                        <p className="font-black text-green-600">
                          {item.price} ج.م
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(index)}
                        className="rounded-xl p-2.5 text-red-500 transition hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t bg-gray-50 p-6 dark:border-slate-800 dark:bg-slate-800/50">
                <div className="mb-6 flex items-center justify-between">
                  <span className="font-bold text-gray-500">الإجمالي:</span>

                  <span className="text-3xl font-black">
                    {total}{" "}
                    <span className="text-lg text-gray-500">ج.م</span>
                  </span>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-3 rounded-xl bg-green-600 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-green-700"
                >
                  إتمام الطلب عبر واتساب 💬
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Favorites Modal */}
      {favoritesOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-end justify-center bg-black/60 backdrop-blur-sm md:items-center"
          onClick={() => setFavoritesOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[2rem] shadow-2xl md:w-[500px] md:rounded-[2rem] ${
              darkMode
                ? "border border-slate-800 bg-slate-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div className="flex items-center justify-between border-b p-6 dark:border-slate-800">
              <h3 className="text-2xl font-black">❤️ المفضلة</h3>

              <button
                onClick={() => setFavoritesOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {favoriteItems.length === 0 ? (
                <div className="py-16 text-center text-gray-500">
                  <div className="mb-6 text-7xl opacity-30">💔</div>

                  <p className="mb-2 text-xl font-bold">
                    قائمة المفضلة فارغة!
                  </p>

                  <p className="text-sm">
                    اضغط ❤️ على أي منتج لإضافته إلى المفضلة.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteItems.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className={`flex items-center gap-4 rounded-2xl border p-4 ${
                        darkMode
                          ? "border-slate-700 bg-slate-800/50"
                          : "border-gray-100 bg-gray-50"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        onClick={() => setSelectedProduct(item)}
                        className="h-20 w-20 cursor-pointer rounded-xl object-cover"
                      />

                      <div
                        className="flex-1 cursor-pointer"
                        onClick={() => setSelectedProduct(item)}
                      >
                        <h4 className="mb-1 line-clamp-2 font-bold">
                          {item.name}
                        </h4>

                        <p className="font-bold text-green-600">
                          {item.price} ج.م
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="rounded-lg bg-green-600 p-2.5 text-white"
                        >
                          🛒
                        </button>

                        <button
                          onClick={() =>
                            toggleFavorite(item.id, item.name)
                          }
                          className="rounded-lg bg-red-50 p-2.5 text-red-500 dark:bg-slate-700"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={`border-t px-6 pb-10 pt-20 ${
          darkMode
            ? "border-slate-800 bg-slate-950 text-gray-400"
            : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <div className="mx-auto mb-16 grid max-w-7xl gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-5 text-2xl font-black text-gray-900 dark:text-white">
              3l_nagar{" "}
              <span className="text-green-600">Clothing</span>
            </h3>

            <p className="leading-relaxed">
              متجر متخصص في الأزياء الرجالية والملابس الكاجوال والأحذية
              والإكسسوارات.
            </p>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-black text-gray-900 dark:text-white">
              روابط سريعة
            </h4>

            <div className="flex flex-col gap-3">
              <a href="#" className="transition hover:text-green-600">
                الرئيسية
              </a>

              <a href="#offers" className="transition hover:text-green-600">
                العروض
              </a>

              <a href="#products" className="transition hover:text-green-600">
                المنتجات
              </a>

              <a href="#contact" className="transition hover:text-green-600">
                تواصل معنا
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-lg font-black text-gray-900 dark:text-white">
              الأقسام
            </h4>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setActiveCategory("shirts");
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-right transition hover:text-green-600"
              >
                قمصان وتيشرتات
              </button>

              <button
                onClick={() => {
                  setActiveCategory("hoodies");
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-right transition hover:text-green-600"
              >
                هوديز وسويت شيرت
              </button>

              <button
                onClick={() => {
                  setActiveCategory("jackets");
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-right transition hover:text-green-600"
              >
