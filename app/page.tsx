"use client";

import { useState } from "react";

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

export default function Home() {
  const whatsappNumber = "201203632925";
  const storeName = "mousa elnagar";

  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const categories = [
    { id: "all", name: "كل المنتجات" },
    { id: "shirts", name: "قمصان وتيشرتات" },
    { id: "hoodies", name: "هوديز وسويت شيرت" },
    { id: "jackets", name: "جواكيت ومعاطف" },
    { id: "pants", name: "بنطلونات وشورتات" },
    { id: "shoes", name: "أحذية وسنيكرز" },
    { id: "accessories", name: "إكسسوارات وعناية" },
  ];

  /* =========================
     OFFERS
  ========================= */

  const offers: Product[] = [
    {
      id: 1001,
      name: "عرض الصيف المتكامل",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=800&q=85",
      description:
        "طقم كاجوال صيفي مريح جداً بخامة قطنية ممتازة، مناسب للخروجات اليومية والمصايف.",
      category: "shirts",
    },
    {
      id: 1002,
      name: "طقم كلاسيك أنيق",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85",
      description:
        "طقم كلاسيك أنيق بتفصيل عصري وخامة فاخرة، مناسب للمناسبات والاجتماعات.",
      category: "jackets",
    },
    {
      id: 1003,
      name: "الباقة الشبابية المحدودة",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=85",
      description:
        "تجميعة شبابية من قطع متناسقة بألوان عصرية تمنحك إطلالة مميزة.",
      category: "shirts",
    },
  ];

  /* =========================
     PRODUCTS
  ========================= */

  const products: Product[] = [
    // =====================
    // SHIRTS
    // =====================

    {
      id: 1,
      name: "قميص أبيض أوكسفورد",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=85",
      description:
        "قميص كلاسيكي أبيض بخامة أوكسفورد ممتازة، مناسب للخروجات والعمل والمناسبات.",
      category: "shirts",
    },
    {
      id: 2,
      name: "تيشرت بيزك قطن صافي",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=85",
      description:
        "تيشرت قطني ناعم ومريح للاستخدام اليومي، مناسب للتنسيق مع الجينز أو الشورت.",
      category: "shirts",
    },
    {
      id: 3,
      name: "قميص جينز كاجوال أزرق",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=85",
      description:
        "قميص جينز كاجوال بتصميم شبابي وخامة دنيم متينة ومريحة.",
      category: "shirts",
    },
    {
      id: 4,
      name: "قميص كتان بيج صيفي",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=85",
      description:
        "قميص كتان خفيف ومنعش، مثالي لأجواء الصيف والمصايف والخروجات النهارية.",
      category: "shirts",
    },
    {
      id: 5,
      name: "تيشرت بولو كلاسيك أسود",
      price: 380,
      image:
        "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=800&q=85",
      description:
        "تيشرت بولو أنيق بياقة كلاسيكية وأزرار أمامية، مناسب للكاجوال والشبه رسمي.",
      category: "shirts",
    },
    {
      id: 6,
      name: "قميص مقلم كاجوال",
      price: 480,
      image:
        "https://images.unsplash.com/photo-1608063615781-e2ef8c73d114?auto=format&fit=crop&w=800&q=85",
      description:
        "قميص مقلم بتصميم عصري يمنحك مظهراً أنيقاً ومناسباً للخروجات اليومية.",
      category: "shirts",
    },
    {
      id: 7,
      name: "تيشرت جرافيك أسود",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85",
      description:
        "تيشرت شبابي بطباعة جرافيك عصرية وقصة مريحة مناسبة للإطلالات الكاجوال.",
      category: "shirts",
    },
    {
      id: 8,
      name: "قميص زيتي سليم فيت",
      price: 460,
      image:
        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=85",
      description:
        "قميص زيتي بقصة سليم فيت وخامة مريحة، مناسب للإطلالات اليومية.",
      category: "shirts",
    },
    {
      id: 9,
      name: "تيشرت أوفرسايز رمادي",
      price: 340,
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=85",
      description:
        "تيشرت أوفرسايز رمادي بتصميم شبابي وقصة فضفاضة مريحة.",
      category: "shirts",
    },
    {
      id: 10,
      name: "قميص كاروهات",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=85",
      description:
        "قميص كاروهات كاجوال يمكن ارتداؤه مغلقاً أو مفتوحاً فوق تيشرت سادة.",
      category: "shirts",
    },

    // =====================
    // HOODIES
    // =====================

    {
      id: 11,
      name: "هودي أوفرسايز عصري",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
      description:
        "هودي أوفرسايز مريح ودافئ، مناسب لفصل الشتاء والخروجات الشبابية.",
      category: "hoodies",
    },
    {
      id: 12,
      name: "سويت شيرت كحلي بيزك",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=85",
      description:
        "سويت شيرت كحلي بخامة ثقيلة ومريحة، مناسب للشتاء الخفيف.",
      category: "hoodies",
    },
    {
      id: 13,
      name: "هودي بسحاب كامل أسود",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=85",
      description:
        "هودي أسود بسحاب كامل وجيوب أمامية، عملي ومناسب للاستخدام اليومي.",
      category: "hoodies",
    },
    {
      id: 14,
      name: "بلوفر تريكو صوف",
      price: 690,
      image:
        "https://images.unsplash.com/photo-1610652492500-ded49ceeb378?auto=format&fit=crop&w=800&q=85",
      description:
        "بلوفر تريكو أنيق بخامة دافئة وناعمة، مناسب للأجواء الباردة.",
      category: "hoodies",
    },
    {
      id: 15,
      name: "سويت شيرت مطبوع",
      price: 550,
      image:
        "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=85",
      description:
        "سويت شيرت شبابي بطباعة عصرية وقصة مريحة.",
      category: "hoodies",
    },
    {
      id: 16,
      name: "هودي باستيل",
      price: 749,
      image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=85",
      description:
        "هودي بألوان هادئة وخامة ناعمة، مناسب للإطلالات الشبابية.",
      category: "hoodies",
    },
    {
      id: 17,
      name: "سويت شيرت رياضي",
      price: 480,
      image:
        "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=800&q=85",
      description:
        "سويت شيرت رياضي خفيف ومريح للتمارين والمشاوير.",
      category: "hoodies",
    },

    // =====================
    // JACKETS
    // =====================

    {
      id: 18,
      name: "جاكيت جلد بريميوم",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=85",
      description:
        "جاكيت جلد بتصميم عصري وقوي، مناسب للإطلالات الشبابية والشتوية.",
      category: "jackets",
    },
    {
      id: 19,
      name: "جاكيت جينز كلاسيك",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=800&q=85",
      description:
        "جاكيت جينز أزرق كلاسيك مناسب للتنسيق مع التيشرتات والبناطيل المختلفة.",
      category: "jackets",
    },
    {
      id: 20,
      name: "بالطو صوف طويل",
      price: 2400,
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=85",
      description:
        "بالطو شتوي طويل بخامة دافئة وتصميم أنيق للمناسبات والإطلالات الرسمية.",
      category: "jackets",
    },
    {
      id: 21,
      name: "جاكيت بامب ووتربروف",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=85",
      description:
        "جاكيت شتوي خفيف ومقاوم للمياه والهواء، مناسب للأجواء الباردة.",
      category: "jackets",
    },
    {
      id: 22,
      name: "جاكيت بومبر أسود",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=85",
      description:
        "جاكيت بومبر أسود بتصميم عصري وخامة مناسبة للإطلالات الشبابية.",
      category: "jackets",
    },
    {
      id: 23,
      name: "جاكيت وندبريكر خفيف",
      price: 650,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85",
      description:
        "جاكيت خفيف يحمي من الرياح وتقلبات الجو، مناسب للخريف والربيع.",
      category: "jackets",
    },
    {
      id: 24,
      name: "جاكيت سفاري زيتي",
      price: 950,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=85",
      description:
        "جاكيت سفاري عملي بعدة جيوب وتصميم شبابي مناسب للخروجات.",
      category: "jackets",
    },
    {
      id: 25,
      name: "بليزر كاجوال رمادي",
      price: 1350,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=85",
      description:
        "بليزر رمادي أنيق مناسب للستايل Smart Casual والمناسبات شبه الرسمية.",
      category: "jackets",
    },

    // =====================
    // PANTS
    // =====================

    {
      id: 26,
      name: "بنطلون تشينو بيج",
      price: 549,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=85",
      description:
        "بنطلون تشينو قطني بقصة مريحة، مناسب للكاجوال والشبه رسمي.",
      category: "pants",
    },
    {
      id: 27,
      name: "بنطلون جينز أزرق غامق",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=85",
      description:
        "جينز أزرق غامق بقصة مريحة وخامة متينة للاستخدام اليومي.",
      category: "pants",
    },
    {
      id: 28,
      name: "بنطلون جينز أسود سليم",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=85",
      description:
        "جينز أسود بقصة سليم وخامة مرنة تمنحك راحة أثناء الحركة.",
      category: "pants",
    },
    {
      id: 29,
      name: "بنطلون كارغو زيتي",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=800&q=85",
      description:
        "بنطلون كارغو عملي بجيوب جانبية وتصميم شبابي.",
      category: "pants",
    },
    {
      id: 30,
      name: "بنطلون جوجر رمادي",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=800&q=85",
      description:
        "جوجر قطني مريح للمنزل والمشاوير والتمارين.",
      category: "pants",
    },
    {
      id: 31,
      name: "شورت كاجوال كحلي",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=800&q=85",
      description:
        "شورت صيفي خفيف ومريح للمصايف والشواطئ والخروجات.",
      category: "pants",
    },
    {
      id: 32,
      name: "بنطلون قماش رمادي",
      price: 580,
      image:
        "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=85",
      description:
        "بنطلون قماش أنيق مناسب للمناسبات والاجتماعات والإطلالات الرسمية.",
      category: "pants",
    },
    {
      id: 33,
      name: "بنطلون جينز ثلجي",
      price: 540,
      image:
        "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=800&q=85",
      description:
        "جينز فاتح بتصميم عصري مناسب للصيف والإطلالات الكاجوال.",
      category: "pants",
    },

    // =====================
    // SHOES
    // =====================

    {
      id: 34,
      name: "سنيكرز أبيض فاخر",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85",
      description:
        "سنيكرز أبيض مريح وخفيف، مناسب مع معظم الإطلالات الكاجوال.",
      category: "shoes",
    },
    {
      id: 35,
      name: "حذاء كلاسيك جلد بني",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=85",
      description:
        "حذاء كلاسيك أنيق مناسب للأفراح والمناسبات والاجتماعات.",
      category: "shoes",
    },
    {
      id: 36,
      name: "هاف بوت شمواه",
      price: 950,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=85",
      description:
        "بوت شمواه أنيق مناسب للشتاء والتنسيق مع الجينز.",
      category: "shoes",
    },
    {
      id: 37,
      name: "سنيكرز رمادي رياضي",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=85",
      description:
        "سنيكرز رياضي خفيف ومريح للجامعة والمشاوير اليومية.",
      category: "shoes",
    },
    {
      id: 38,
      name: "لوفرز جلد مريح",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=85",
      description:
        "لوفرز أنيق وسهل الارتداء، مناسب للكاجوال والشبه رسمي.",
      category: "shoes",
    },
    {
      id: 39,
      name: "بوت جلدي شتوي",
      price: 1390,
      image:
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=800&q=85",
      description:
        "بوت جلدي متين ومناسب للأجواء الباردة والخروجات الشتوية.",
      category: "shoes",
    },
    {
      id: 40,
      name: "سليبر جلدي مريح",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&w=800&q=85",
      description:
        "سليبر خفيف ومريح للمنزل والشاطئ والاستخدام اليومي.",
      category: "shoes",
    },

    // =====================
    // ACCESSORIES
    // =====================

    {
      id: 41,
      name: "ساعة كوارتز سوداء",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=85",
      description:
        "ساعة كلاسيكية أنيقة بسير جلدي، مناسبة للكاجوال والمناسبات.",
      category: "accessories",
    },
    {
      id: 42,
      name: "نظارة شمسية كلاسيك",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=85",
      description:
        "نظارة شمسية بتصميم كلاسيكي مناسب للإطلالات الصيفية.",
      category: "accessories",
    },
    {
      id: 43,
      name: "حزام جلد أسود",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=85",
      description:
        "حزام جلد بتصميم كلاسيكي وإبزيم معدني أنيق.",
      category: "accessories",
    },
    {
      id: 44,
      name: "كاب قطني أسود",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=85",
      description:
        "كاب قطني رياضي مع إمكانية تعديل المقاس.",
      category: "accessories",
    },
    {
      id: 45,
      name: "محفظة كروت جلدية",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=85",
      description:
        "محفظة كروت صغيرة وأنيقة بتصميم عملي يناسب الاستخدام اليومي.",
      category: "accessories",
    },
    {
      id: 46,
      name: "برفان رجالي",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=85",
      description:
        "عطر رجالي برائحة جذابة مناسبة للاستخدام اليومي والمناسبات.",
      category: "accessories",
    },
    {
      id: 47,
      name: "طقم جوارب قطنية 3 قطع",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=800&q=85",
      description:
        "ثلاثة أزواج من الجوارب القطنية المريحة للاستخدام اليومي.",
      category: "accessories",
    },
    {
      id: 48,
      name: "سوار جلدي رجالي",
      price: 130,
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=85",
      description:
        "سوار جلدي شبابي يضيف لمسة مميزة للإطلالة.",
      category: "accessories",
    },
    {
      id: 49,
      name: "شنطة كروس صغيرة",
      price: 390,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=85",
      description:
        "شنطة كروس عملية تتسع للموبايل والمحفظة والنظارة والأغراض الشخصية.",
      category: "accessories",
    },
  ];

  /* =========================
     FUNCTIONS
  ========================= */

  const addToCart = (item: Product) => {
    setCart((prev) => [...prev, item]);

    setToastMessage(`تمت إضافة "${item.name}" للسلة بنجاح! 🛒`);

    setTimeout(() => {
      setToastMessage(null);
    }, 1200);
  };

  const toggleFavorite = (id: number, name: string) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      setToastMessage(`تمت إزالة "${name}" من المفضلة 💔`);
    } else {
      setFavorites((prev) => [...prev, id]);
      setToastMessage(`تمت إضافة "${name}" للمفضلة ❤️`);
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 1200);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  /* =========================
     WHATSAPP ORDER
  ========================= */

  const orderText = encodeURIComponent(
    cart.length
      ? `طلب جديد من متجر ${storeName}

${cart
  .map(
    (item, index) =>
      `${index + 1}- ${item.name} | ${item.price} جنيه`
  )
  .join("\n")}

الإجمالي: ${total} جنيه`
      : "أرغب بالاستفسار عن المنتجات"
  );

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter(
          (product) => product.category === activeCategory
        );

  const favoriteItems = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <main
      dir="rtl"
      className={`min-h-screen font-sans pb-20 transition-colors duration-500 ${
        darkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-gray-900"
      }`}
    >
      <style jsx global>{`
        .perspective-3d {
          perspective: 1000px;
        }

        .card-3d-effect {
          transform-style: preserve-3d;
          transition:
            transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.5s;
        }

        .card-3d-effect:hover {
          transform: rotateX(3deg) rotateY(-3deg)
            translateZ(8px);
        }

        @media (max-width: 640px) {
          .card-3d-effect:hover {
            transform: none;
          }
        }
      `}</style>

      {toastMessage && (
        <div className="fixed top-24 inset-x-0 flex justify-center z-[200] pointer-events-none px-4">
          <div className="bg-gray-900/95 backdrop-blur-md text-white px-6 py-4 rounded-full shadow-2xl border border-gray-800 text-center text-sm font-bold max-w-[90vw]">
            {toastMessage}
          </div>
        </div>
      )}

      {/* HEADER */}

      <header
        className={`sticky top-0 z-40 border-b shadow-sm backdrop-blur-md ${
          darkMode
            ? "bg-slate-900/90 border-slate-800"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-4 sm:px-6 py-4">
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight whitespace-nowrap">
            3l_nagar{" "}
            <span className="text-green-600">
              Clothing
            </span>
          </h1>

          <nav
            className={`hidden md:flex gap-8 font-medium ${
              darkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            <a href="#" className="hover:text-green-500 transition">
              الرئيسية
            </a>

            <a
              href="#offers"
              className="hover:text-green-500 transition"
            >
              العروض
            </a>

            <a
              href="#products"
              className="hover:text-green-500 transition"
            >
              المنتجات
            </a>

            <a
              href="#contact"
              className="hover:text-green-500 transition"
            >
              تواصل معنا
            </a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all active:scale-90 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-yellow-400"
                  : "bg-gray-100 border-gray-200 text-slate-700"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setFavoritesOpen(true)}
              className={`p-2.5 rounded-full border relative transition-all active:scale-90 ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              ❤️

              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}

      <section
        className={`py-14 sm:py-20 px-4 sm:px-6 ${
          darkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <div className="text-right">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
              ارتقِ بأناقتك مع
              <br />
              <span className="text-green-600">
                𝙚𝙡𝙣𝙖𝙜𝙖𝙧
              </span>
            </h2>

            <p
              className={`text-base sm:text-lg mb-8 leading-relaxed ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              اكتشف تشكيلتنا الجديدة والحصرية من
              الملابس الرجالية والأحذية والإكسسوارات
              المصممة بعناية لتناسب أناقتك اليومية.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-6 sm:px-8 py-4 rounded-full transition-all shadow-md text-base sm:text-lg"
            >
              تواصل معنا عبر واتساب
            </a>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85"
              alt="3l_nagar Clothing"
              className="rounded-3xl shadow-2xl w-full object-cover h-[380px] sm:h-[500px]"
            />
          </div>
        </div>
      </section>

      {/* OFFERS */}

      <section
        id="offers"
        className="py-16 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-10 sm:mb-12">
            <span className="text-3xl">🔥</span>

            <h3 className="text-2xl sm:text-3xl font-extrabold">
              أقوى العروض الحالية
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`group border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-gray-100"
                }`}
              >
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() =>
                    setSelectedProduct(offer)
                  }
                >
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-72 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(
                        offer.id,
                        offer.name
                      );
                    }}
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md z-20 ${
                      favorites.includes(offer.id)
                        ? "bg-red-50 text-red-500"
                        : "bg-white/80 text-gray-600"
                    }`}
                  >
                    {favorites.includes(offer.id)
                      ? "❤️"
                      : "🤍"}
                  </button>
                </div>

                <div className="p-5 sm:p-6">
                  <h4 className="font-bold text-xl mb-2">
                    {offer.name}
                  </h4>

                  <p className="text-green-600 font-extrabold text-lg mb-5">
                    {offer.price} جنيه
                  </p>

                  <button
                    onClick={() => addToCart(offer)}
                    className="w-full bg-gray-900 hover:bg-black dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-3 rounded-xl transition-all active:scale-95"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}

      <section
        id="products"
        className={`py-16 sm:py-20 px-4 sm:px-6 border-t rounded-t-[2rem] sm:rounded-t-[3rem] ${
          darkMode
            ? "bg-slate-900/50 border-slate-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center">
            كل منتجات متجرنا
          </h3>

          <p
            className={`text-center mb-10 sm:mb-12 ${
              darkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            تصفح تشكيلتنا من الملابس والأحذية
            والإكسسوارات.
          </p>

          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveCategory(cat.id)
                }
                className={`px-4 sm:px-5 py-2.5 rounded-full font-medium text-xs sm:text-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-green-600 text-white shadow-md scale-105"
                    : darkMode
                      ? "bg-slate-800 text-gray-300"
                      : "bg-slate-100 text-gray-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className={`group border rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col justify-between ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-50 border-gray-100"
                }`}
              >
                <div
                  className="relative cursor-pointer overflow-hidden aspect-[4/5]"
                  onClick={() =>
                    setSelectedProduct(product)
                  }
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(
                        product.id,
                        product.name
                      );
                    }}
                    className={`absolute top-2 sm:top-4 left-2 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md z-20 ${
                      favorites.includes(product.id)
                        ? "bg-red-50 text-red-500"
                        : "bg-white/80 text-gray-600"
                    }`}
                  >
                    {favorites.includes(product.id)
                      ? "❤️"
                      : "🤍"}
                  </button>
                </div>

                <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm sm:text-lg mb-1 line-clamp-2">
                      {product.name}
                    </h4>

                    <p className="text-green-600 font-extrabold text-sm sm:text-base mb-3 sm:mb-4">
                      {product.price} جنيه
                    </p>
                  </div>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 hover:bg-black dark:bg-green-600 dark:hover:bg-green-700 text-white font-medium py-2 sm:py-2.5 rounded-xl transition-all active:scale-95 text-xs sm:text-sm"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>const products: Product[] = [
    {
      id: 4,
      name: "قميص أبيض أوكسفورد",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص كلاسيكي أبيض بخامة أوكسفورد ممتازة، مناسب للخروجات والعمل والمناسبات.",
      category: "shirts",
    },
    {
      id: 5,
      name: "تيشرت بيزك قطن",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      description:
        "تيشرت قطني مريح بتصميم بسيط وعصري، مناسب للاستخدام اليومي.",
      category: "shirts",
    },
    {
      id: 6,
      name: "قميص جينز أزرق",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص جينز كاجوال بتصميم شبابي، مناسب مع البنطلونات الجينز أو القماش.",
      category: "shirts",
    },
    {
      id: 7,
      name: "قميص كتان بيج",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص كتان خفيف ومريح، اختيار ممتاز للأجواء الصيفية والخروجات.",
      category: "shirts",
    },
    {
      id: 8,
      name: "تيشرت بولو أسود",
      price: 380,
      image:
        "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=600&q=80",
      description:
        "تيشرت بولو أنيق بياقة كلاسيكية، مناسب للكاجوال والمناسبات شبه الرسمية.",
      category: "shirts",
    },
    {
      id: 9,
      name: "قميص مقلم كاجوال",
      price: 480,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص مقلم بتصميم عصري، مناسب للخروجات اليومية والإطلالات الكاجوال.",
      category: "shirts",
    },
    {
      id: 10,
      name: "تيشرت جرافيك",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
      description:
        "تيشرت شبابي بطباعة جرافيك عصرية وقصة مريحة للاستخدام اليومي.",
      category: "shirts",
    },
    {
      id: 11,
      name: "قميص زيتي سليم فيت",
      price: 460,
      image:
        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص زيتي بقصة سليم فيت، يمنحك مظهراً أنيقاً وعصرياً.",
      category: "shirts",
    },
    {
      id: 12,
      name: "تيشرت أوفرسايز رمادي",
      price: 340,
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
      description:
        "تيشرت أوفرسايز رمادي بقصة فضفاضة ومريحة، مناسب للستايل الشبابي.",
      category: "shirts",
    },
    {
      id: 13,
      name: "قميص كاروهات أحمر",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص كاروهات أنيق يمكن ارتداؤه مغلقاً أو فوق تيشرت سادة.",
      category: "shirts",
    },

    {
      id: 14,
      name: "هودي أوفرسايز",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      description:
        "هودي أوفرسايز مريح ودافئ بتصميم شبابي مناسب للشتاء.",
      category: "hoodies",
    },
    {
      id: 15,
      name: "سويت شيرت كحلي",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
      description:
        "سويت شيرت كحلي بخامة مريحة وتصميم بسيط يناسب الاستخدام اليومي.",
      category: "hoodies",
    },
    {
      id: 16,
      name: "هودي بسحاب أسود",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      description:
        "هودي أسود بسحاب أمامي وجيوب عملية، مناسب للخروجات والجامعة.",
      category: "hoodies",
    },
    {
      id: 17,
      name: "بلوفر تريكو صوف",
      price: 690,
      image:
        "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80",
      description:
        "بلوفر تريكو أنيق بخامة دافئة ومظهر شتوي راقٍ.",
      category: "hoodies",
    },
    {
      id: 18,
      name: "سويت شيرت مطبوع",
      price: 550,
      image:
        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
      description:
        "سويت شيرت شبابي بطباعة عصرية وقصة مريحة.",
      category: "hoodies",
    },
    {
      id: 19,
      name: "هودي باستيل",
      price: 749,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      description:
        "هودي بألوان هادئة وتصميم عصري، مناسب للإطلالات الشبابية.",
      category: "hoodies",
    },
    {
      id: 20,
      name: "سويت شيرت رياضي",
      price: 480,
      image:
        "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=600&q=80",
      description:
        "سويت شيرت رياضي مريح مناسب للتمارين والمشاوير اليومية.",
      category: "hoodies",
    },

    {
      id: 21,
      name: "جاكيت جلد أسود",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت جلد بتصميم Biker عصري يمنحك مظهراً قوياً وأنيقاً.",
      category: "jackets",
    },
    {
      id: 22,
      name: "جاكيت جينز أزرق",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت جينز كلاسيكي مناسب للتيشرتات والبنطلونات الكاجوال.",
      category: "jackets",
    },
    {
      id: 23,
      name: "بالطو صوف طويل",
      price: 2400,
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
      description:
        "بالطو شتوي طويل بتصميم أنيق وخامة دافئة مناسبة للأجواء الباردة.",
      category: "jackets",
    },
    {
      id: 24,
      name: "جاكيت بامب",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت Puffer خفيف ودافئ، مناسب للأجواء الباردة والممطرة.",
      category: "jackets",
    },
    {
      id: 25,
      name: "جاكيت بومبر أسود",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت بومبر أسود بتصميم شبابي وعصري، مناسب للخروجات اليومية.",
      category: "jackets",
    },
    {
      id: 26,
      name: "جاكيت وندبريكر",
      price: 650,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت خفيف مقاوم للرياح، مناسب للربيع والخريف.",
      category: "jackets",
    },
    {
      id: 27,
      name: "جاكيت سفاري زيتي",
      price: 950,
      image:
        "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت سفاري زيتي بجيوب متعددة وتصميم عملي.",
      category: "jackets",
    },
    {
      id: 28,
      name: "بليزر كاجوال رمادي",
      price: 1350,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      description:
        "بليزر رمادي أنيق مناسب للستايل Smart Casual والمناسبات.",
      category: "jackets",
    },

    {
      id: 29,
      name: "بنطلون تشينو بيج",
      price: 549,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      description:
        "بنطلون تشينو قطني مريح بقصة عصرية، مناسب للخروجات اليومية.",
      category: "pants",
    },
    {
      id: 30,
      name: "بنطلون جينز أزرق",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
      description:
        "جينز أزرق كلاسيكي بقصة مريحة ومناسب للاستخدام اليومي.",
      category: "pants",
    },
    {
      id: 31,
      name: "بنطلون جينز أسود",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
      description:
        "جينز أسود بقصة سليم وخامة مرنة توفر الراحة وسهولة الحركة.",
      category: "pants",
    },
    {
      id: 32,
      name: "بنطلون كارغو زيتي",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
      description:
        "بنطلون Cargo زيتي بجيوب جانبية وتصميم شبابي عملي.",
      category: "pants",
    },
    {
      id: 33,
      name: "بنطلون جوجر رمادي",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80",
      description:
        "بنطلون جوجر رياضي مريح للمنزل والجامعة والمشاوير.",
      category: "pants",
    },
    {
      id: 34,
      name: "شورت كاجوال كحلي",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
      description:
        "شورت قطني خفيف مناسب للصيف والمصايف والخروجات.",
      category: "pants",
    },
    {
      id: 35,
      name: "بنطلون قماش رمادي",
      price: 580,
      image:
        "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=600&q=80",
      description:
        "بنطلون قماش أنيق مناسب للمناسبات والعمل والإطلالات الرسمية.",
      category: "pants",
    },
    {
      id: 36,
      name: "بنطلون جينز فاتح",
      price: 540,
      image:
        "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=600&q=80",
      description:
        "جينز فاتح بتصميم عصري مناسب للإطلالات الصيفية والكاجوال.",
      category: "pants",
    },

    {
      id: 37,
      name: "سنيكرز أبيض",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
      description:
        "سنيكرز أبيض مريح وسهل التنسيق مع مختلف الملابس الكاجوال.",
      category: "shoes",
    },
    {
      id: 38,
      name: "حذاء كلاسيك بني",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
      description:
        "حذاء كلاسيك بني أنيق مناسب للبدل والمناسبات الرسمية.",
      category: "shoes",
    },
    {
      id: 40,
      name: "هاف بوت شمواه بني",
      price: 950,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
      description:
        "هاف بوت شمواه بتصميم أنيق مناسب للجينز والإطلالات الشتوية.",
      category: "shoes",
    },
    {
      id: 41,
      name: "سنيكرز رمادي رياضي",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80",
      description:
        "سنيكرز رياضي خفيف ومريح للمشي والجامعة والمشاوير.",
      category: "shoes",
    },
    {
      id: 42,
      name: "لوفرز كاجوال",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
      description:
        "حذاء Loafers أنيق وسهل الارتداء، مناسب للكاجوال والستايل شبه الرسمي.",
      category: "shoes",
    },
    {
      id: 43,
      name: "بوت جلدي شتوي",
      price: 1390,
      image:
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80",
      description:
        "بوت جلدي شتوي متين ومناسب للأجواء الباردة والخروجات.",
      category: "shoes",
    },
    {
      id: 44,
      name: "سليبر جلدي",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&w=600&q=80",
      description:
        "سليبر مريح وخفيف مناسب للمنزل والشاطئ والاستخدام اليومي.",
      category: "shoes",
    },

    {
      id: 45,
      name: "ساعة كوارتز سوداء",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      description:
        "ساعة يد كلاسيكية بتصميم أنيق تناسب الإطلالات الكاجوال والرسمية.",
      category: "accessories",
    },
    {
      id: 46,
      name: "نظارة شمسية كلاسيك",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      description:
        "نظارة شمسية بتصميم عصري مناسبة للخروجات والقيادة.",
      category: "accessories",
    },
    {
      id: 47,
      name: "حزام جلد أسود",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=600&q=80",
      description:
        "حزام جلد أسود بتصميم كلاسيكي وإبزيم معدني أنيق.",
      category: "accessories",
    },
    {
      id: 48,
      name: "كاب رياضي أسود",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
      description:
        "كاب رياضي قطني مناسب للخروجات والأنشطة اليومية.",
      category: "accessories",
    },
    {
      id: 49,
      name: "محفظة كروت جلدية",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=600&q=80",
      description:
        "محفظة كروت جلدية صغيرة وعملية، مناسبة لحمل الكروت والنقود.",
      category: "accessories",
    },
    {
      id: 50,
      name: "برفان رجالي",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
      description:
        "عطر رجالي برائحة أنيقة وجذابة مناسب للاستخدام اليومي والمناسبات.",
      category: "accessories",
    },
    {
      id: 51,
      name: "طقم جوارب قطنية 3 قطع",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&w=600&q=80",
      description:
        "ثلاثة أزواج من الجوارب القطنية المريحة للاستخدام اليومي.",
      category: "accessories",
    },
    {
      id: 52,
      name: "سوار جلدي رجالي",
      price: 130,
      image:
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
      description:
        "سوار جلدي بتصميم شبابي بسيط يضيف لمسة مميزة للإطلالة.",
      category: "accessories",
    },
    {
      id: 53,
      name: "شنطة كروس",
      price: 390,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      description:
        "شنطة كروس عملية وصغيرة لحمل الموبايل والمحفظة والنظارة والأغراض الشخصية.",
      category: "accessories",
    },
  ];

  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (item: Product | Omit<Product, "category">) => {
    const formattedItem = {
      ...item,
      category: "category" in item ? item.category : "shirts",
    } as Product;

    setCart((prev) => [...prev, formattedItem]);

    setToastMessage(`تمت إضافة "${item.name}" للسلة بنجاح! 🛒`);

    setTimeout(() => {
      setToastMessage(null);
    }, 1000);
  };

  const toggleFavorite = (id: number, name: string) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      setToastMessage(`تمت إزالة "${name}" من المفضلة 💔`);
    } else {
      setFavorites((prev) => [...prev, id]);
      setToastMessage(`تمت إضافة "${name}" للمفضلة ❤️`);
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 1000);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const orderText = encodeURIComponent(
    cart.length
      ? `طلب جديد من متجر mousa elnagar\n\n${cart
          .map(
            (item, i) =>
              `${i + 1}- ${item.name} | ${item.price} جنيه`
          )
          .join("\n")}\n\nالإجمالي: ${total} جنيه`
      : "أرغب بالاستفسار عن المنتجات"
  );

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const favoriteItems = products
    .filter((p) => favorites.includes(p.id))
    .concat(
      offers
        .filter((o) => favorites.includes(o.id))
        .map(
          (o) =>
            ({
              ...o,
              category: "shirts",
            }) as Product
        )
    );

  return (
    <main
      dir="rtl"
      className={`min-h-screen font-sans pb-20 selection:bg-green-200 transition-colors duration-500 ${
        darkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-gray-900"
      }`}
    >
      <style jsx global>{`
        .perspective-3d {
          perspective: 1000px;
        }

        .card-3d-effect {
          transform-style: preserve-3d;
          transition:
            transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1),
            box-shadow 0.5s;
        }

        .card-3d-effect:hover {
          transform: rotateX(6deg) rotateY(-6deg) translateZ(15px);
        }
      `}</style>

      {toastMessage && (
        <div className="fixed top-24 inset-x-0 flex justify-center z-[200] pointer-events-none px-4">
          <div className="bg-gray-900/95 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl border border-gray-800 text-center text-sm md:text-base font-bold animate-bounce max-w-full">
            {toastMessage}

            
