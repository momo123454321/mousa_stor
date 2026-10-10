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
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  // --- موبايلات (10 منتجات) ---
  {
    id: 1,
    name: "iPhone 16",
    brand: "Apple",
    category: "موبايلات",
    price: 44999,
    oldPrice: 47999,
    storage: "128GB",
    ram: "8GB",
    color: "أزرق صحراوي",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=900&q=85",
    badge: "الأكثر مبيعًا",
    stock: 10,
    description: "الجيل الجديد من آبل مع زر التحكم بالكاميرا Camera Control ومعالج A18 الفائق.",
  },
  {
    id: 2,
    name: "iPhone 16 Pro Max",
    brand: "Apple",
    category: "موبايلات",
    price: 64999,
    oldPrice: 69999,
    storage: "256GB",
    ram: "8GB",
    color: "تيتانيوم صحراوي",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&w=900&q=85",
    badge: "جديد",
    stock: 10,
    description: "أكبر شاشة في تاريخ آيفون بإطارات أنحف وكاميرا بيريسكوب محسنة وبطارية خارقة.",
  },
  {
    id: 3,
    name: "Samsung Galaxy S25 Ultra",
    brand: "Samsung",
    category: "موبايلات",
    price: 54999,
    oldPrice: 59999,
    storage: "256GB",
    ram: "12GB",
    color: "تيتانيوم رمادي",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85",
    badge: "خصم",
    stock: 10,
    description: "تحفة سامسونج الرائدة مع ذكاء اصطناعي متطور جداً One UI وكاميرا خارقة 200MP.",
  },
  {
    id: 4,
    name: "Samsung Galaxy A56",
    brand: "Samsung",
    category: "موبايلات",
    price: 20999,
    oldPrice: 22999,
    storage: "256GB",
    ram: "8GB",
    color: "أخضر ليموني",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=900&q=85",
    badge: "عرض",
    stock: 10,
    description: "الفئة المتوسطة بمعالج قوي وتصميم زجاجي فاخر يضاهي الهواتف الرائدة.",
  },
  {
    id: 5,
    name: "Xiaomi 14 Pro",
    brand: "Xiaomi",
    category: "موبايلات",
    price: 34999,
    oldPrice: 38999,
    storage: "512GB",
    ram: "12GB",
    color: "أسود تيتانيوم",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "شراكة استثنائية مع Leica لتجربة تصوير احترافية وشاشة منحنية الأطراف بدقة فائقة.",
  },
  {
    id: 6,
    name: "Oppo Reno 13 Pro",
    brand: "Oppo",
    category: "موبايلات",
    price: 23999,
    oldPrice: 25999,
    storage: "512GB",
    ram: "12GB",
    color: "بنفسجي لامع",
    image: "https://images.unsplash.com/photo-1607936854279-55e8a4c64888?auto=format&fit=crop&w=900&q=85",
    badge: "جديد",
    stock: 10,
    description: "الموبايل الأجمل تصميماً مع تركيز فائق على صور البورتريه والبطارية الذكية.",
  },
  {
    id: 7,
    name: "Realme GT 6",
    brand: "Realme",
    category: "موبايلات",
    price: 27999,
    oldPrice: 30999,
    storage: "256GB",
    ram: "12GB",
    color: "فضي مرآة",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "قاتل الهواتف الرائدة بأداء جبار في الألعاب وشحن فائق السرعة 120 واط.",
  },
  {
    id: 8,
    name: "Honor Magic 6 Pro",
    brand: "Honor",
    category: "موبايلات",
    price: 41999,
    oldPrice: 45999,
    storage: "512GB",
    ram: "12GB",
    color: "أخضر غابي",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "كاميرا مقربة فائقة وبطارية سيليكون كربون ضخمة وشاشة مقاومة للكسر.",
  },
  {
    id: 9,
    name: "iPhone 15",
    brand: "Apple",
    category: "موبايلات",
    price: 38999,
    oldPrice: 41999,
    storage: "128GB",
    ram: "6GB",
    color: "وردي",
    image: "https://images.unsplash.com/photo-1592286927505-2fd6b7a4e3d4?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "شاشة Dynamic Island وكاميرا رئيسية 48 ميجابكسل وتصميم زجاجي مشبع باللون.",
  },
  {
    id: 10,
    name: "Samsung Galaxy S24",
    brand: "Samsung",
    category: "موبايلات",
    price: 32999,
    oldPrice: 35999,
    storage: "256GB",
    ram: "8GB",
    color: "صفر أصفر",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "أداء متميز مع ميزات ذكاء اصطناعي مدمجة وتصميم مريح خفيف الوزن.",
  },

  // --- سماعات (10 منتجات) ---
  {
    id: 11,
    name: "AirPods Pro 2",
    brand: "Apple",
    category: "سماعات",
    price: 9999,
    oldPrice: 10999,
    storage: "-",
    ram: "-",
    color: "أبيض",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=85",
    badge: "الأكثر مبيعًا",
    stock: 10,
    description: "عزل صوتي أقوى بمرتين مع صوت مكاني مخصص وعلبة شحن بمعالج U1.",
  },
  {
    id: 12,
    name: "Samsung Galaxy Buds 3 Pro",
    brand: "Samsung",
    category: "سماعات",
    price: 6499,
    oldPrice: 7299,
    storage: "-",
    ram: "-",
    color: "فضي عصري",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "تصميم ساق جديد مع إضاءة ليد ذكية وصوت عالي الدقة Hi-Fi.",
  },
  {
    id: 13,
    name: "Sony WH-1000XM5",
    brand: "Xiaomi", // للاختيار المجازي أو تفرع عام
    category: "سماعات",
    price: 14999,
    oldPrice: 16999,
    storage: "-",
    ram: "-",
    color: "أسود مطفي",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    badge: "مميز",
    stock: 10,
    description: "أفضل سماعة فوق الأذن للعزل الصوتي الاحترافي والراحة القصوى طوال اليوم.",
  },
  {
    id: 14,
    name: "JBL Tune 720BT",
    brand: "Xiaomi",
    category: "سماعات",
    price: 3499,
    oldPrice: 3999,
    storage: "-",
    ram: "-",
    color: "أزرق",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "صوت باس نقي وقوي مع بطارية تدوم حتى 76 ساعة من التشغيل المستمر.",
  },
  {
    id: 15,
    name: "Anker Soundcore Liberty 4",
    brand: "Xiaomi",
    category: "سماعات",
    price: 4599,
    oldPrice: 5199,
    storage: "-",
    ram: "-",
    color: "أسود",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "استشعار نبضات القلب وصوت مكاني مذهل مع عزل ضوضاء تكيفي ممتاز.",
  },
  {
    id: 16,
    name: "Apple AirPods Max",
    brand: "Apple",
    category: "سماعات",
    price: 24999,
    oldPrice: 27999,
    storage: "-",
    ram: "-",
    color: "فضي",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "فخامة الصوت النقي والتصميم الراقي المصنوع من الألمنيوم والفولاذ المقاوم.",
  },
  {
    id: 17,
    name: "Xiaomi Buds 5",
    brand: "Xiaomi",
    category: "سماعات",
    price: 2999,
    oldPrice: 3499,
    storage: "-",
    ram: "-",
    color: "رمادي تيتانيوم",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "صوت احترافي مضبوط بدقة مع خفة وزن مذهلة واستقرار داخل الأذن.",
  },
  {
    id: 18,
    name: "Oppo Enco Air 3",
    brand: "Oppo",
    category: "سماعات",
    price: 2199,
    oldPrice: 2599,
    storage: "-",
    ram: "-",
    color: "أبيض شفاف",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "تصميم علبة مبتكر ومقاومة لرذاذ الماء مع زمن تأخير منخفض للغاية للألعاب.",
  },
  {
    id: 19,
    name: "Realme Buds T300",
    brand: "Realme",
    category: "سماعات",
    price: 1799,
    oldPrice: 2099,
    storage: "-",
    ram: "-",
    color: "أسود ديناميكي",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "عزل ضوضاء فعال وباس عميق لتجربة استماع ممتعة ومريحة طوال اليوم.",
  },
  {
    id: 20,
    name: "Honor Choice Earbuds X5",
    brand: "Honor",
    category: "سماعات",
    price: 1599,
    oldPrice: 1899,
    storage: "-",
    ram: "-",
    color: "أبيض",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "عمر بطارية طويل جداً ومكالمات واضحة بفضل الميكروفونات المزدوجة الذكية.",
  },

  // --- ساعات ذكية (10 منتجات) ---
  {
    id: 21,
    name: "Apple Watch Series 10",
    brand: "Apple",
    category: "ساعات ذكية",
    price: 18999,
    oldPrice: 20999,
    storage: "64GB",
    ram: "-",
    color: "تيتانيوم أسود",
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=85",
    badge: "جديد",
    stock: 10,
    description: "أنحف وأكبر شاشة ذكية مع مستشعر رصد انقطاع التنفس أثناء النوم.",
  },
  {
    id: 22,
    name: "Samsung Galaxy Watch 7",
    brand: "Samsung",
    category: "ساعات ذكية",
    price: 12999,
    oldPrice: 14499,
    storage: "32GB",
    ram: "-",
    color: "أخضر عسكري",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "معالج جديد كلياً ومستشعر BioActive لتتبع الصحة واللياقة بدقة متناهية.",
  },
  {
    id: 23,
    name: "Huawei Watch GT 4",
    brand: "Xiaomi",
    category: "ساعات ذكية",
    price: 9999,
    oldPrice: 11499,
    storage: "4GB",
    ram: "-",
    color: "بني كلاسيكي",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=85",
    badge: "مميز",
    stock: 10,
    description: "تصميم هندسي فخم وبطارية تدوم لأسبوعين كاملين مع تتبع شامل للصحة.",
  },
  {
    id: 24,
    name: "Xiaomi Watch S3",
    brand: "Xiaomi",
    category: "ساعات ذكية",
    price: 6999,
    oldPrice: 7999,
    storage: "4GB",
    ram: "-",
    color: "فضي أنيق",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "إطار ساعة قابل للتبديل بسهولة مع شاشة AMOLED ساطعة ونظام HyperOS.",
  },
  {
    id: 25,
    name: "Amazfit GTR 4",
    brand: "Xiaomi",
    category: "ساعات ذكية",
    price: 7499,
    oldPrice: 8499,
    storage: "2GB",
    ram: "-",
    color: "أسود تيتانيوم",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "تحديد مواقع GPS مزدوج النطاق بدقة احترافية ومكالمات بلوتوث واضحة.",
  },
  {
    id: 26,
    name: "Apple Watch Ultra 2",
    brand: "Apple",
    category: "ساعات ذكية",
    price: 39999,
    oldPrice: 43999,
    storage: "64GB",
    ram: "-",
    color: "تيتانيوم طبيعي",
    image: "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "الساعة الأقوى للمغامرات والرياضات الشاقة مع أقصى درجة سطوع للشاشة.",
  },
  {
    id: 27,
    name: "Honor Watch 4",
    brand: "Honor",
    category: "ساعات ذكية",
    price: 4999,
    oldPrice: 5799,
    storage: "4GB",
    ram: "-",
    color: "أسود ليلي",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "شاشة مربعة أنيقة مع دعم مكالمات البلوتوث وعمر بطارية طويل.",
  },
  {
    id: 28,
    name: "Oppo Watch X",
    brand: "Oppo",
    category: "ساعات ذكية",
    price: 11999,
    oldPrice: 13499,
    storage: "32GB",
    ram: "-",
    color: "بلاتينيوم",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "نظام تشغيل Wear OS لتطبيقات جوجل مع هيكل من الستانلس ستيل المتين.",
  },
  {
    id: 29,
    name: "Realme Watch 3 Pro",
    brand: "Realme",
    category: "ساعات ذكية",
    price: 2999,
    oldPrice: 3499,
    storage: "1GB",
    ram: "-",
    color: "رمادي داكن",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "مكالمات واضحة عبر البلوتوث وشاشة AMOLED منحنية وواجهات متنوعة.",
  },
  {
    id: 30,
    name: "Garmin Forerunner 55",
    brand: "Xiaomi",
    category: "ساعات ذكية",
    price: 9499,
    oldPrice: 10499,
    storage: "4GB",
    ram: "-",
    color: "أبيض رياضي",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "الساعة الرياضية المثالية للعدائين لتتبع المسافات والتدريبات باحترافية.",
  },

  // --- شواحن (10 منتجات) ---
  {
    id: 31,
    name: "Baseus Magnetic Power Bank 10000mAh",
    brand: "Baseus",
    category: "شواحن",
    price: 2999,
    oldPrice: 3499,
    storage: "-",
    ram: "-",
    color: "أزرق داكن",
    image: "https://images.unsplash.com/photo-1609592424695-7e4a1d4d9f89?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "شاحن مغناطيسي لاسلكي MagSafe نحيف للغاية للاستخدام اليومي أثناء التنقل.",
  },
  {
    id: 32,
    name: "Anker GaNPrime 65W Charger",
    brand: "Xiaomi",
    category: "شواحن",
    price: 2499,
    oldPrice: 2899,
    storage: "-",
    ram: "-",
    color: "أسود",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85",
    badge: "الأكثر مبيعًا",
    stock: 10,
    description: "شاحن حائط فائق السرعة وصغير الحجم يشحن الهواتف وأجهزة اللابتوب بكفاءة.",
  },
  {
    id: 33,
    name: "Samsung 45W PD Fast Charger",
    brand: "Samsung",
    category: "شواحن",
    price: 1599,
    oldPrice: 1899,
    storage: "-",
    ram: "-",
    color: "أسود",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "شاحن سامسونج الأصلي السريع جداً المخصص لهواتف السلسلة الرائدة.",
  },
  {
    id: 34,
    name: "Apple 20W USB-C Power Adapter",
    brand: "Apple",
    category: "شواحن",
    price: 1299,
    oldPrice: 1499,
    storage: "-",
    ram: "-",
    color: "أبيض",
    image: "https://images.unsplash.com/photo-1609592424695-7e4a1d4d9f89?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "رأس شاحن آبل الأصلي الآمن تماماً على بطارية الآيفون والأيباد.",
  },
  {
    id: 35,
    name: "Ugreen 100W GaN Fast Charger",
    brand: "Xiaomi",
    category: "شواحن",
    price: 3799,
    oldPrice: 4299,
    storage: "-",
    ram: "-",
    color: "رمادي غامق",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "4 منافذ شحن ذكية بقوة إجمالية 100 واط لشحن جميع أجهزتك في وقت واحد.",
  },
  {
    id: 36,
    name: "Xiaomi 120W HyperCharge",
    brand: "Xiaomi",
    category: "شواحن",
    price: 1999,
    oldPrice: 2399,
    storage: "-",
    ram: "-",
    color: "أبيض",
    image: "https://images.unsplash.com/photo-1609592424695-7e4a1d4d9f89?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "شاحن شاومي الخارق لشحن هاتفك من 0 إلى 100% في أقل من 25 دقيقة.",
  },
  {
    id: 37,
    name: "Anker PowerCore 20000mAh",
    brand: "Xiaomi",
    category: "شواحن",
    price: 2199,
    oldPrice: 2599,
    storage: "-",
    ram: "-",
    color: "أزرق",
    image: "https://images.unsplash.com/photo-1609592424695-7e4a1d4d9f89?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "بنك طاقة ضخم ومتين يشحن هاتفك عدة مرات مع حماية متكاملة ضد ارتفاع الحرارة.",
  },
  {
    id: 38,
    name: "Belkin 3-in-1 MagSafe Wireless Charger",
    brand: "Apple",
    category: "شواحن",
    price: 5999,
    oldPrice: 6799,
    storage: "-",
    ram: "-",
    color: "أسود فاخر",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "محطة شحن لاسلكية أنيقة لشحن الآيفون والساعة والسماعة في نفس الوقت.",
  },
  {
    id: 39,
    name: "Baseus Super Si 30W",
    brand: "Baseus",
    category: "شواحن",
    price: 799,
    oldPrice: 999,
    storage: "-",
    ram: "-",
    color: "أسود",
    image: "https://images.unsplash.com/photo-1609592424695-7e4a1d4d9f89?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "شاحن جداري صغير الحجم وفعال يدعم الشحن السريع لجميع الهواتف الذكية.",
  },
  {
    id: 40,
    name: "Joyroom Car Charger 63W",
    brand: "Xiaomi",
    category: "شواحن",
    price: 699,
    oldPrice: 899,
    storage: "-",
    ram: "-",
    color: "أسود معدني",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "شاحن سيارة سريع بمنفذين USB و Type-C مع شاشة رقمية لعرض جهد البطارية.",
  },

  // --- كفرات (10 منتجات) ---
  {
    id: 41,
    name: "iPhone 16 Pro Max Silicone Case with MagSafe",
    brand: "Apple",
    category: "كفرات",
    price: 899,
    oldPrice: 1199,
    storage: "-",
    ram: "-",
    color: "أخضر داكن",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=85",
    badge: "أصلي",
    stock: 10,
    description: "جراب سيليكون أصلي ناعم الملمس من الخارج ومبطن بالألياف الدقيقة من الداخل لحماية كاملة.",
  },
  {
    id: 42,
    name: "Samsung Galaxy S25 Ultra Clear Protective Case",
    brand: "Samsung",
    category: "كفرات",
    price: 699,
    oldPrice: 899,
    storage: "-",
    ram: "-",
    color: "شفاف",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "جراب شفاف مقاوم للاصفرار يحافظ على مظهر الهاتف الأصلي مع حماية ضد الصدمات.",
  },
  {
    id: 43,
    name: "iPhone 16 MagSafe Leather Case",
    brand: "Apple",
    category: "كفرات",
    price: 1299,
    oldPrice: 1599,
    storage: "-",
    ram: "-",
    color: "بني كلاسيكي",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "جراب جلدي فاخر يضفي مظهرًا أنيقًا ويدعم خاصية الشحن اللاسلكي السريع MagSafe.",
  },
  {
    id: 44,
    name: "Samsung Galaxy A56 Armor Rugged Case",
    brand: "Samsung",
    category: "كفرات",
    price: 599,
    oldPrice: 799,
    storage: "-",
    ram: "-",
    color: "أسود عسكري",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "تصميم مدرع مزدوج الطبقات يوفر أقصى حماية ممكنة ضد السقوط القوي.",
  },
  {
    id: 45,
    name: "Xiaomi 14 Pro Carbon Fiber Case",
    brand: "Xiaomi",
    category: "كفرات",
    price: 499,
    oldPrice: 699,
    storage: "-",
    ram: "-",
    color: "أسود كربون",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "جراب خفيف الوزن للغاية بنقشة ألياف الكربون الفخمة ومقاوم للبصمات.",
  },
  {
    id: 46,
    name: "Oppo Reno 13 Pro Liquid Silicon Case",
    brand: "Oppo",
    category: "كفرات",
    price: 450,
    oldPrice: 599,
    storage: "-",
    ram: "-",
    color: "بنفسجي باستيل",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "سيليكون مرن عالي الجودة يحمي حواف الكاميرا والشاشة بشكل ممتاز.",
  },
  {
    id: 47,
    name: "Realme GT 6 Magnetic Case",
    brand: "Realme",
    category: "كفرات",
    price: 550,
    oldPrice: 750,
    storage: "-",
    ram: "-",
    color: "فضي",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "إطار معدني متين مع ظهر شفاف مغناطيسي لحماية أنيقة ومميزة.",
  },
  {
    id: 48,
    name: "Honor Magic 6 Pro Anti-Fall Case",
    brand: "Honor",
    category: "كفرات",
    price: 520,
    oldPrice: 699,
    storage: "-",
    ram: "-",
    color: "أخضر داكن",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "زوايا مدعمة بوسائد هوائية لامتصاص الصدمات الناتجة عن السقوط المفاجئ.",
  },
  {
    id: 49,
    name: "Universal Waterproof Phone Pouch",
    brand: "Xiaomi",
    category: "كفرات",
    price: 250,
    oldPrice: 350,
    storage: "-",
    ram: "-",
    color: "أصفر مضيء",
    image: "https://images.unsplash.com/photo-1585060544812-6b45742d762f?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "حافظة مقاومة للماء بالكامل مناسبة للسباحة والتصوير تحت الماء حتى عمق 30 متر.",
  },
  {
    id: 50,
    name: "Matte Frost Anti-Fingerprint Case",
    brand: "Apple",
    category: "كفرات",
    price: 399,
    oldPrice: 499,
    storage: "-",
    ram: "-",
    color: "أسود مطفي",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "ملمس مطفي ناعم يمنع انزلاق الهاتف ويحميه من الخدوش والبصمات المزعجة.",
  },

  // --- إكسسوارات (10 منتجات) ---
  {
    id: 51,
    name: "Bluetooth Selfie Stick & Tripod",
    brand: "Xiaomi",
    category: "إكسسوارات",
    price: 699,
    oldPrice: 899,
    storage: "-",
    ram: "-",
    color: "أسود",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=900&q=85",
    badge: "عملي",
    stock: 10,
    description: "عصا سيلفي قابلة للتحويل إلى حامل ثلاثي القوائم Tripod مع زر بلوتوث قابل للإزالة.",
  },
  {
    id: 52,
    name: "MagSafe Car Mount Phone Holder",
    brand: "Baseus",
    category: "إكسسوارات",
    price: 899,
    oldPrice: 1199,
    storage: "-",
    ram: "-",
    color: "أسود معدني",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "حامل سيارة مغناطيسي قوي يثبت على فتحات التكييف ويدعم الشحن اللاسلكي.",
  },
  {
    id: 53,
    name: "Tempered Glass Screen Protector (2 Pack)",
    brand: "Apple",
    category: "إكسسوارات",
    price: 299,
    oldPrice: 399,
    storage: "-",
    ram: "-",
    color: "شفاف",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "طبقة حماية زجاجية صلبة مقاومة للكسر والخدوش مع وضوح تام للشاشة.",
  },
  {
    id: 54,
    name: "Mobile Gaming Controller Trigger",
    brand: "Xiaomi",
    category: "إكسسوارات",
    price: 350,
    oldPrice: 499,
    storage: "-",
    ram: "-",
    color: "أسود بأحمر",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "أزرار تحكم إضافية لألعاب الباتل رويال (PUBG / Call of Duty) لسرعة استجابة فائقة.",
  },
  {
    id: 55,
    name: "Camera Lens Metal Protector",
    brand: "Samsung",
    category: "إكسسوارات",
    price: 220,
    oldPrice: 300,
    storage: "-",
    ram: "-",
    color: "تيتانيوم أسود",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "حماية مستقلة لعدسات الكاميرا من الخدوش والصدمات دون التأثير على جودة الصور.",
  },
  {
    id: 56,
    name: "Type-C Fast Braided Cable 2M",
    brand: "Baseus",
    category: "إكسسوارات",
    price: 320,
    oldPrice: 450,
    storage: "-",
    ram: "-",
    color: "رمادي",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "كابل شحن ونقل بيانات قماشي مضفر عالي المتانة بطول 2 متر يدعم الشحن السريع 100W.",
  },
  {
    id: 57,
    name: "Desktop Phone & Tablet Stand",
    brand: "Xiaomi",
    category: "إكسسوارات",
    price: 399,
    oldPrice: 550,
    storage: "-",
    ram: "-",
    color: "فضي",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "حامل مكتب قابل للتعديل والطي مصنوع من الألمنيوم المتين للهواتف والأجهزة اللوحية.",
  },
  {
    id: 58,
    name: "Mini Ring Light for Phone",
    brand: "Oppo",
    category: "إكسسوارات",
    price: 349,
    oldPrice: 499,
    storage: "-",
    ram: "-",
    color: "أبيض",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "إضاءة سيلفي دائرية قابلة للشحن وثلاث درجات إضاءة لالتقاط صور ومقاطع فيديو احترافية.",
  },
  {
    id: 59,
    name: "Phone Cleaning Kit 8-in-1",
    brand: "Xiaomi",
    category: "إكسسوارات",
    price: 299,
    oldPrice: 400,
    storage: "-",
    ram: "-",
    color: "أبيض رمادي",
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "أداة تنظيف شاملة ومبتكرة للسماعات، شاشات الهواتف، ولوحات المفاتيح.",
  },
  {
    id: 60,
    name: "MagSafe Metal Ring Sticker",
    brand: "Baseus",
    category: "إكسسوارات",
    price: 150,
    oldPrice: 220,
    storage: "-",
    ram: "-",
    color: "أسود",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=85",
    stock: 10,
    description: "حلقة مغناطيسية لاصقة لتحويل أي جراب عادي إلى جراب يدعم خاصية MagSafe.",
  },
];

const categories = [
  { name: "موبايلات", icon: "📱", count: "10+ منتج" },
  { name: "سماعات", icon: "🎧", count: "10+ منتج" },
  { name: "ساعات ذكية", icon: "⌚", count: "10+ منتج" },
  { name: "شواحن", icon: "🔌", count: "10+ منتج" },
  { name: "كفرات", icon: "📦", count: "10+ منتج" },
  { name: "إكسسوارات", icon: "🎮", count: "10+ منتج" },
];

const brands = [
  "الكل",
  "Apple",
  "Samsung",
  "Xiaomi",
  "Oppo",
  "Realme",
  "Honor",
];

function SearchIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="20" r="1" />
      <circle cx="19" cy="20" r="1" />
      <path d="M3 4h2l2.5 11.5a2 2 0 0 0 2 1.5h7.8a2 2 0 0 0 1.9-1.4L21 8H6" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="23" height="23" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.47 14.37c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.46-.89-.79-1.49-1.76-1.67-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.09 4.5.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35ZM12 2a9.9 9.9 0 0 0-8.5 15.02L2 22l5.14-1.47A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 01-4.18-1.14l-.3-.18-3.05.87.88-2.97-.2-.31A8.2 8.2 0 1 1 12 20.2Z" />
    </svg>
  );
}

export default function HomePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("الكل");
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
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

  const scrollToProducts = () => {
    document
      .getElementById("products")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      dir="rtl"
      className={
        darkMode
          ? "dark min-h-screen bg-[#070b14] text-white"
          : "min-h-screen bg-[#f7f9fc] text-slate-900"
      }
    >
      {/* Notification */}
      {notification && (
        <div className="fixed left-1/2 top-5 z-[100] -translate-x-1/2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-2xl border border-blue-500/30">
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
                Mecca <span className="text-blue-600">Store</span>
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

          {/* Navigation Links */}
          <nav className="flex items-center gap-4 sm:gap-7">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs sm:text-sm font-bold text-blue-600"
            >
              الرئيسية
            </button>

            <button
              onClick={scrollToProducts}
              className="text-xs sm:text-sm font-bold opacity-75 transition hover:text-blue-600 hover:opacity-100"
            >
              الموبايلات
            </button>

            <button
              onClick={() => {
                document
                  .getElementById("categories")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="hidden sm:block text-sm font-bold opacity-75 transition hover:text-blue-600 hover:opacity-100"
            >
              التصنيفات
            </button>

            <button
              onClick={() => openWhatsApp()}
              className="text-xs sm:text-sm font-bold text-green-600"
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
              onClick={() => {
                setSearch("");
                setSelectedBrand("الكل");
                setSelectedCategory("الكل");
                scrollToProducts();
              }}
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

            {/* سلة المشتريات */}
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
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8 lg:pt-8">
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0b2a68] via-[#1558c7] to-[#4f46e5] px-6 py-12 text-white shadow-2xl shadow-blue-900/20 sm:px-10 md:py-16 lg:px-16 lg:py-20">
          <div className="absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-32 right-20 h-80 w-80 rounded-full bg-indigo-400/20 blur-3xl" />

          <div className="relative z-10 max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold backdrop-blur">
              🔥 أحدث إصدارات الأجهزة الذكية
            </div>

            <h1 className="text-4xl font-black leading-[1.2] tracking-tight sm:text-5xl lg:text-6xl">
              متجر Mecca Store
              <br />
              <span className="text-blue-200">الأقوى في مصر</span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-8 text-blue-100 sm:text-lg">
              تصفح التشكيلة الجديدة من أجهزة آيفون، سامسونج، والشاشات والإكسسوارات بأفضل الأسعار.
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

      {/* Offers Section */}
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
        </div>
      </section>

      {/* Products Grid */}
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
              أحدث المنتجات المتوفرة
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

          {/* Brand Chips (Without Baseus) */}
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

        {/* Products Grid with 3D Effects */}
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
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                  style={{ perspective: "1000px" }}











                
