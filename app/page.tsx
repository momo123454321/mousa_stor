"use client";

import { useState } from "react";

// تعريف نوع بيانات المنتج
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  detailImages: string[];
  description: string;
  category: "shirts" | "hoodies" | "jackets" | "pants" | "shoes" | "accessories";
};

export default function Home() {
  const whatsappNumber = "201287254329";

  // حالات التحكم بالواجهة (State)
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

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

  // العروض المميزة الحالية
  const offers: Omit<Product, "category">[] = [
    {
      id: 1,
      name: "طقم الكتان الصيفي الراقي",
      price: 850,
      image: "https://images.unsplash.com/photo-1596455607563-ad6193f78b78?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1596455607563-ad6193f78b78?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1620012253295-c15bc3a65ce4?auto=format&fit=crop&w=600&q=80"
      ],
      description: "طقم صيفي متكامل من الكتان الطبيعي، يوفر لك أقصى درجات الراحة والأناقة في الأيام الحارة.",
    },
    {
      id: 2,
      name: "باقة الأناقة الشتوية",
      price: 1450,
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80"
      ],
      description: "باقة تتكون من جاكيت بومبر فاخر مع هودي قطني ثقيل، مثالية للإطلالات الشبابية في الشتاء.",
    },
    {
      id: 3,
      name: "عرض الإكسسوارات الفاخرة",
      price: 1100,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80"
      ],
      description: "ساعة كلاسيكية راقية مع محفظة وحزام من الجلد الطبيعي، الهدية المثالية لتكملة أناقتك.",
    },
  ];

  // قائمة المنتجات المزودة بصور رايقة وعالية الجودة
  const products: Product[] = [
    // --- قمصان وتيشرتات ---
    {
      id: 4,
      name: "تيشرت جرافيك بطبعة فرعونية",
      price: 350,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80"
      ],
      description: "تيشرت قطني فاخر باللون الأسود الملكي، مزين بطبعة ذهبية راقية مستوحاة من الفن المصري القديم. قصة أوفرسايز مريحة.",
      category: "shirts"
    },
    {
      id: 5,
      name: "قميص أبيض أوكسفورد إيطالي",
      price: 550,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1621072156002-e2f56cb0a581?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80"
      ],
      description: "قطعة لا غنى عنها في دولابك، قميص أبيض بخامة الأوكسفورد المضادة للتجعد، مناسب للعمل والمناسبات الرسمية.",
      category: "shirts"
    },
    {
      id: 6,
      name: "تيشرت بيزك بيج دافئ",
      price: 280,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80"
      ],
      description: "تيشرت سادة بلون بيج هادئ، مصنوع من القطن العضوي الناعم، ممتاز للارتداء اليومي تحت الجواكيت.",
      category: "shirts"
    },
    {
      id: 7,
      name: "قميص جينز شبابي أزرق",
      price: 490,
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&w=600&q=80"
      ],
      description: "قميص دنيم خفيف وعملي، يتماشى مع البنطلونات الكارغو والجينز الأسود لإطلالة كاجوال مميزة.",
      category: "shirts"
    },

    // --- هوديز وسويت شيرت ---
    {
      id: 8,
      name: "هودي أسود أوفرسايز بريميوم",
      price: 650,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1511511450040-677116ff389e?auto=format&fit=crop&w=600&q=80"
      ],
      description: "هودي فضفاض مبطن بالفرو الناعم من الداخل، خامة ثقيلة جداً للتدفئة في أبرد ليالي الشتاء.",
      category: "hoodies"
    },
    {
      id: 9,
      name: "سويت شيرت باستيل هادئ",
      price: 550,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80"
      ],
      description: "سويت شيرت بياقة دائرية ولون باستيل عصري، خفيف نسبياً ومناسب لفترات الخريف وبداية الشتاء.",
      category: "hoodies"
    },

    // --- جواكيت ومعاطف ---
    {
      id: 10,
      name: "جاكيت جلد بايكر كلاسيك",
      price: 1850,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1515347619152-16e68da783ef?auto=format&fit=crop&w=600&q=80"
      ],
      description: "جاكيت راكب الدراجات (Biker) من الجلد الطبيعي الفاخر، مزود بسحابات معدنية متينة وتفاصيل دقيقة ليعطيك مظهراً حاداً وجذاباً.",
      category: "jackets"
    },
    {
      id: 11,
      name: "جاكيت جينز مبطن بالفرو",
      price: 1200,
      image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1604644401890-0bd678c83788?auto=format&fit=crop&w=600&q=80"
      ],
      description: "جاكيت دنيم كلاسيكي بياقة وبطانة كاملة من الفرو الأبيض الدافئ، يدمج بين ستايل الكاجوال والتدفئة الممتازة.",
      category: "jackets"
    },
    {
      id: 12,
      name: "معطف صوف إنجليزي طويل",
      price: 2600,
      image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80"
      ],
      description: "بالطو رجالي طويل بقصة مستقيمة وأزرار مزدوجة، مصمم للرجل العصري الذي يبحث عن الفخامة المطلقة في فصل الشتاء.",
      category: "jackets"
    },

    // --- بنطلونات وشورتات ---
    {
      id: 13,
      name: "بنطلون جينز أزرق كلاسيك",
      price: 499,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80"
      ],
      description: "جينز أزرق أساسي بخامة ليكرا مريحة للارتداء طوال اليوم دون الشعور بالضيق.",
      category: "pants"
    },
    {
      id: 14,
      name: "بنطلون تشينو بيج سمارت",
      price: 550,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"
      ],
      description: "بنطلون جبردين ناعم بلون رملي أنيق، قصة مجسمة تليق مع القمصان الكلاسيكية وأحذية اللوفرز.",
      category: "pants"
    },
    {
      id: 15,
      name: "بنطلون كارغو هيب هوب زيتي",
      price: 650,
      image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
      ],
      description: "بنطلون بجيوب جانبية متعددة وتصميم عملي عصري جداً، ممتاز للحركة الكثيرة والستايل الرياضي.",
      category: "pants"
    },

    // --- أحذية وسنيكرز ---
    {
      id: 16,
      name: "سنيكرز أبيض كاجوال فخم",
      price: 950,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80"
      ],
      description: "حذاء رياضي أبيض سادة بتصميم إنسيابي ونعل مريح جداً، الجوكر الذي يليق مع جميع الأطقم في خزانتك.",
      category: "shoes"
    },
    {
      id: 17,
      name: "حذاء تشيلسي بوت شمواه بني",
      price: 1150,
      image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1614252339460-e17635634626?auto=format&fit=crop&w=600&q=80"
      ],
      description: "حذاء هاف بوت مصنوع من الشمواه الإيطالي الفاخر، يعطي مظهراً شتوياً راقياً مع بنطلونات الجينز والتشينو.",
      category: "shoes"
    },
    {
      id: 18,
      name: "حذاء أوكسفورد كلاسيك أسود",
      price: 1300,
      image: "https://images.unsplash.com/photo-1614252339460-e17635634626?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1614252339460-e17635634626?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80"
      ],
      description: "حذاء رسمي من الجلد الطبيعي اللامع، مصمم خصيصاً ليناسب البدل الرسمية واجتماعات العمل والمناسبات الفخمة.",
      category: "shoes"
    },

    // --- إكسسوارات وعناية ---
    {
      id: 19,
      name: "سلسلة فضة بقلادة حورس",
      price: 450,
      image: "https://images.unsplash.com/photo-1599643478524-fb524ee072bd?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1599643478524-fb524ee072bd?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80"
      ],
      description: "سلسلة من الفضة الإسترليني عيار 925، تحمل قلادة لعين حورس بتفاصيل دقيقة تجسد العراقة والفن المصري القديم.",
      category: "accessories"
    },
    {
      id: 20,
      name: "ساعة يد أوتوماتيكية راقية",
      price: 2200,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1587836173080-d26989f66826?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?auto=format&fit=crop&w=600&q=80"
      ],
      description: "ساعة أوتوماتيكية بقرص أسود أنيق وسوار جلدي، تعكس شخصية الرجل الدقيق والمهتم بأدق تفاصيل أناقته.",
      category: "accessories"
    },
    {
      id: 21,
      name: "خاتم فضي بنقش مصري قديم",
      price: 380,
      image: "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1599643478524-fb524ee072bd?auto=format&fit=crop&w=600&q=80"
      ],
      description: "خاتم رجالي كلاسيكي مصاغ بعناية يحمل نقوشاً هندسية مستوحاة من العمارة الفرعونية الفخمة.",
      category: "accessories"
    },
    {
      id: 22,
      name: "نظارة شمسية كلاسيك أفياتور",
      price: 550,
      image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1572635196237-14b3f281501f?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1589717520038-f1f3a970eab1?auto=format&fit=crop&w=600&q=80"
      ],
      description: "نظارة شمسية بإطار معدني خفيف وعدسات بولارايزد لحماية كاملة من أشعة الشمس، تصميم يعطي كاريزما وثقة.",
      category: "accessories"
    },
    {
      id: 23,
      name: "محفظة جلد طبيعي سليم فيت",
      price: 320,
      image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
      detailImages: [
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1553531384-397c80973a0b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1600862025732-c51a70ccb5bc?auto=format&fit=crop&w=600&q=80"
      ],
      description: "محفظة كروت عصرية صغيرة الحجم، لا تأخذ مساحة في الجيب وتتسع لجميع كروتك وأوراقك النقدية الأساسية.",
      category: "accessories"
    }
  ];

  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // دالة الإضافة للسلة
  const addToCart = (item: Product | Omit<Product, "category">) => {
    const formattedItem = { ...item, category: (item as Product).category || "shirts" } as Product;
    setCart((prev) => [...prev, formattedItem]);
    setToastMessage(`تمت إضافة "${item.name}" للسلة بنجاح! 🛒`);
    
    setTimeout(() => {
      setToastMessage(null);
    }, 1500);
  };

  // دالة الإضافة والحذف من المفضلة
  const toggleFavorite = (id: number, name: string) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      setToastMessage(`تمت إزالة "${name}" من المفضلة 💔`);
    } else {
      setFavorites((prev) => [...prev, id]);
      setToastMessage(`تمت إضافة "${name}" للمفضلة ❤️`);
    }
    setTimeout(() => setToastMessage(null), 1500);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const orderText = encodeURIComponent(
    cart.length
      ? `طلب جديد من متجر 3l_nagar Clothing\n\n${cart
          .map((item, i) => `${i + 1}- ${item.name} | ${item.price} جنيه`)
          .join("\n")}\n\nالإجمالي: ${total} جنيه`
      : "أرغب بالاستفسار عن المنتجات"
  );

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <main 
      dir="rtl" 
      className={`min-h-screen font-sans pb-20 selection:bg-green-200 transition-colors duration-500 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-gray-900"
      }`}
    >
      <style jsx global>{`
        .perspective-3d {
          perspective: 1000px;
        }
        .card-3d-effect {
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s;
        }
        .card-3d-effect:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px -15px rgba(0,0,0,0.2);
        }
      `}</style>
      
      {/* إشعار عائم منبثق أعلى الشاشة */}
      {toastMessage && (
        <div className="fixed top-24 inset-x-0 flex justify-center z-[200] pointer-events-none px-4">
          <div className="bg-gray-900/95 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl border border-gray-800 text-center text-sm md:text-base font-bold animate-bounce">
            {toastMessage}
          </div>
        </div>
      )}

      {/* الهيدر العلوي */}
      <header className={`sticky top-0 z-40 border-b shadow-sm backdrop-blur-md transition-colors ${
        darkMode ? "bg-slate-900/90 border-slate-800" : "bg-white/90 border-gray-200"
      }`} >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-extrabold tracking-tight">
            3l_nagar <span className="text-green-600">Clothing</span>
          </h1>

          <nav className={`hidden md:flex gap-8 font-medium ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <a href="#" className="hover:text-green-500 transition">الرئيسية</a>
            <a href="#offers" className="hover:text-green-500 transition">العروض</a>
            <a href="#products" className="hover:text-green-500 transition">المنتجات</a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all active:scale-90 ${
                darkMode ? "bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700" : "bg-gray-100 border-gray-200 text-slate-700 hover:bg-gray-200"
              }`}
              title={darkMode ? "الوضع النهاري" : "الوضع الليلي"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      {/* القسم الترحيبي (Hero Section) */}
      <section className={`py-20 px-6 transition-colors ${darkMode ? "bg-slate-900" : "bg-white"}`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center perspective-3d">
          <div className="text-right">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              أناقتك تعكس شخصيتك مع <br /> 3l_nagar
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              تصفح أحدث الكولكشن الحصري المكون من أرقى القطع الكاجوال، الكلاسيك، والإكسسوارات المصممة بعناية لتبرز هويتك الفريدة.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg text-lg hover:-translate-y-1"
            >
              تواصل عبر واتساب للطلبات
            </a>
          </div>
          <div className="relative card-3d-effect cursor-pointer">
            <div className="absolute inset-0 bg-green-600/20 rounded-3xl transform rotate-3 scale-105 -z-10 blur-sm"></div>
            <img
              src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80"
              alt="Luxury Fashion"
              className="rounded-3xl shadow-2xl w-full object-cover h-[500px] border border-white/10"
            />
          </div>
        </div>
      </section>

      {/* قسم العروض المميزة */}
      <section id="offers" className="py-20 px-6 perspective-3d">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-3xl">🔥</span>
            <h3 className="text-3xl font-extrabold">أقوى العروض والباقات</h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className={`group card-3d-effect border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
                }`}
              >
                <div className="relative cursor-pointer overflow-hidden aspect-[4/3]" onClick={() => setSelectedProduct(offer as Product)}>
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">عرض التفاصيل</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(offer.id, offer.name);
                    }}
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md transition active:scale-95 z-20 ${
                      favorites.includes(offer.id) ? "bg-red-50 text-red-500" : "bg-white/80 text-gray-600 hover:text-red-500"
                    }`}
                  >
                    {favorites.includes(offer.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl mb-1">{offer.name}</h4>
                  <p className="text-green-600 font-extrabold text-lg mb-5">{offer.price} جنيه</p>
                  <button
                    onClick={() => addToCart(offer)}
                    className="w-full bg-gray-900 hover:bg-black text-white dark:bg-green-600 dark:hover:bg-green-700 font-medium py-3 rounded-xl transition-all active:scale-95"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المنتجات المفلترة */}
      <section 
        id="products" 
        className={`py-20 px-6 border-t rounded-t-[3rem] perspective-3d transition-colors ${
          darkMode ? "bg-slate-900/50 border-slate-800" : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-extrabold mb-4 text-center">تشكيلة المتجر الفاخرة</h3>
          <p className={`text-center mb-12 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>تصفح جميع المنتجات حسب الفئة واختر ما يعبر عن أسلوبك</p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                  activeCategory === cat.id 
                    ? "bg-green-600 text-white shadow-md scale-105" 
                    : darkMode ? "bg-slate-800 text-gray-300 hover:bg-slate-700" : "bg-slate-100 text-gray-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className={`group card-3d-effect border rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-slate-50 border-gray-100"
                }`}
              >
                <div className="relative cursor-pointer overflow-hidden aspect-[4/5]" onClick={() => setSelectedProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm">التفاصيل والصور 🔍</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id, product.name);
                    }}
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md transition active:scale-95 z-20 ${
                      favorites.includes(product.id) ? "bg-red-50 text-red-500" : "bg-white/80 text-gray-600 hover:text-red-500"
                    }`}
                  >
                    {favorites.includes(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-green-600 transition-colors line-clamp-1">{product.name}</h4>
                    <p className="text-green-600 font-extrabold text-base mb-4">{product.price} جنيه</p>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 hover:bg-black text-white dark:bg-green-600 dark:hover:bg-green-700 font-medium py-2.5 rounded-xl transition-all active:scale-95 text-sm"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* الأزرار العائمة الثابتة بالأسفل */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* زر المفضلة */}
        <button
          onClick={() => setFavoritesOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-xl transition-transform hover:scale-110 active:scale-95"
        >
          <span className="relative">
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-gray-900 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {favorites.length}
              </span>
            )}
          </span>
        </button>

        {/* زر السلة */}
        <button
          onClick={() => setCartOpen(true)}
          className="bg-gray-900 hover:bg-black dark:bg-green-600 dark:hover:bg-green-700 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95"
        >
          <span className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                {cart.length}
              </span>
            )}
          </span>
        </button>
      </div>

      {/* نافذة عرض تفاصيل المنتج */}
      {selectedProduct && (
        <div 
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 cursor-default flex flex-col max-h-[90vh] ${
              darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition z-10 font-bold"
            >
              ✕
            </button>
            <div className="flex overflow-x-auto snap-x snap-mandatory w-full h-72 md:h-80 shrink-0" dir="ltr">
              {(selectedProduct.detailImages || [selectedProduct.image]).map((img, i) => (
                <img key={i} src={img} alt={selectedProduct.name} className="w-full h-full object-cover shrink-0 snap-center" />
              ))}
            </div>
            <div className="p-6 md:p-8 overflow-y-auto">
              <h3 className="text-2xl font-bold mb-2">{selectedProduct.name}</h3>
              <p className="text-green-600 font-extrabold text-xl mb-4">{selectedProduct.price} جنيه</p>
              <div className={`p-4 rounded-xl border mb-6 leading-relaxed text-sm md:text-base ${
                darkMode ? "bg-slate-800 border-slate-700 text-gray-300" : "bg-slate-50 border-gray-200 text-gray-600"
              }`}>
                {selectedProduct.description}
              </div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all active:scale-95 text-lg shadow-lg hover:shadow-xl mt-auto"
              >
                أضف إلى السلة الآن 🛒
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة السلة الجانبية أو المنبثقة */}
      {cartOpen && (
        <div 
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] flex justify-end"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-left duration-300 ${
              darkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">سلة المشتريات 🛒</h2>
              <button onClick={() => setCartOpen(false)} className="text-2xl hover:text-red-500 transition">✕</button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
                  <span className="text-6xl mb-4">🛍️</span>
                  <p>السلة فارغة حالياً</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item, i) => (
                    <div key={i} className={`flex gap-4 items-center p-3 rounded-2xl border ${darkMode ? 'border-slate-800 bg-slate-800/50' : 'border-gray-100 bg-gray-50'}`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h4 className="font-bold text-sm mb-1 line-clamp-1">{item.name}</h4>
                        <p className="text-green-600 font-bold">{item.price} ج.م</p>
                      </div>
                      <button onClick={() => removeFromCart(i)} className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className={`mt-6 pt-6 border-t ${darkMode ? 'border-slate-800' : 'border-gray-200'}`}>
                <div className="flex justify-between items-center mb-6 text-xl">
                  <span className="font-bold">الإجمالي:</span>
                  <span className="font-extrabold text-green-600">{total} جنيه</span>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg text-lg"
                >
                  إتمام الطلب عبر واتساب 💬
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
