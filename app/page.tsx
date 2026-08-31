"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category:
    | "shirts"
    | "hoodies"
    | "jackets"
    | "pants"
    | "shoes"
    | "accessories";
};

export default function Home() {
  const whatsappNumber = "201203632925";

  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "كل المنتجات" },
    { id: "shirts", name: "قمصان وتيشرتات" },
    { id: "hoodies", name: "هوديز وسويت شيرت" },
    { id: "jackets", name: "جواكيت ومعاطف" },
    { id: "pants", name: "بنطلونات وشورتات" },
    { id: "shoes", name: "أحذية وسنيكرز" },
    { id: "accessories", name: "إكسسوارات وعناية" },
  ];

  const offers: Omit<Product, "category">[] = [
    {
      id: 1,
      name: "عرض الصيف المتكامل",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=600&q=80",
      description:
        "طقم كاجوال صيفي مريح جداً خامة قطن ليكرا ممتازة، مثالي للخروجات اليومية والمصايف.",
    },
    {
      id: 2,
      name: "طقم كلاسيك أنيق",
      price: 1299,
      image:
        "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&q=80",
      description:
        "بدلة شبه رسمية بتفصيل عصري وخامات تركية فاخرة تناسب مناسباتك السعيدة واجتماعات العمل.",
    },
    {
      id: 3,
      name: "الباقة الشبابية المحدودة",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
      description:
        "تجميعة مميزة من قطعتين بألوان متناسقة وعصرية توفر لك إطلالة جذابة ومختلفة.",
    },
  ];

  const products: Product[] = [
    {
      id: 4,
      name: "قميص أبيض أوكسفورد",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص كلاسيكي أبيض بخامة الأوكسفورد الثقيلة والمقاومة للتجعد، قطعة أساسية في دولابك.",
      category: "shirts",
    },
    {
      id: 5,
      name: "تيشرت بيزك قطن صافي",
      price: 249,
      image:
        "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      description:
        "تيشرت قطني 100% ناعم على البشرة، متوفر بجميع المقاسات وممتاز لتنسيقه تحت الجواكيت.",
      category: "shirts",
    },
    {
      id: 6,
      name: "قميص جينز كاجوال الأزرق",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص جينز عصري مصنوع من الدنيم الخفيف المتين، يعطيك طابعاً شبابياً وعملياً طوال اليوم.",
      category: "shirts",
    },
    {
      id: 7,
      name: "قميص كتان بيج صيفي",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص مصنوع من الكتان الطبيعي بنسبة 100% لتوفير أقصى درجات الانتعاش والراحة في الصيف.",
      category: "shirts",
    },
    {
      id: 8,
      name: "تيشرت بولو كلاسيك أسود",
      price: 380,
      image:
        "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=600&q=80",
      description:
        "تيشرت بولو بياقة مقواة وأزرار أمامية أنيقة، مناسب للخروج شبه الرسمي واليومي.",
      category: "shirts",
    },
    {
      id: 9,
      name: "قميص مقلم كاجوال عصري",
      price: 480,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص مقلم بخطوط طولية مميزة تساعد على إعطاء مظهر متناسق وجذاب ومناسب للجسم.",
      category: "shirts",
    },
    {
      id: 10,
      name: "تيشرت جرافيك هيب هوب",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
      description:
        "تيشرت بطباعة ديجيتال خلفية عالية الجودة لا تتأثر بالغسيل، وقصة فضفاضة مريحة للشباب.",
      category: "shirts",
    },
    {
      id: 11,
      name: "قميص زيتي سليم فيت",
      price: 460,
      image:
        "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص بلون زيتي هادئ وقصة مجسمة تبرز جمال القوام، مصنوع من خليط القطن الفاخر المعالج.",
      category: "shirts",
    },
    {
      id: 12,
      name: "تيشرت أوفرسايز رمادي",
      price: 340,
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
      description:
        "تيشرت رمادي بتصميم فضفاض الأكتاف (Oversized Trend)، شبابي جداً ومواكب لأحدث صيحات الموضة.",
      category: "shirts",
    },
    {
      id: 13,
      name: "قميص كاروهات أحمر",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
      description:
        "قميص كاروهات كلاسيكي دافئ وخفيف، رائع للارتداء مفتوحاً فوق تيشرت بيزك أبيض.",
      category: "shirts",
    },

    {
      id: 14,
      name: "هودي أوفرسايز عصري",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      description:
        "هودي مريح جداً بقصة فضفاضة (Oversized) مبطن من الداخل بالفرو الناعم ليوفر لك أقصى درجات الدفء.",
      category: "hoodies",
    },
    {
      id: 15,
      name: "سويت شيرت نيفي بيزك",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80",
      description:
        "سويت شيرت كلاسيكي بدون زعبوط بلون كحلي فخم، خامة ثقيلة ومرنة ممتازة للشتاء الخفيف.",
      category: "hoodies",
    },
    {
      id: 16,
      name: "هودي بسحاب كامل أسود",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
      description:
        "هودي عملي مزود بسحاب (Zip-up) كامل وجيوب أمامية واسعة تتسع لأغراضك اليومية كالموبايل والمفاتيح.",
      category: "hoodies",
    },
    {
      id: 17,
      name: "بلوفر تريكو صوف ناعم",
      price: 690,
      image:
        "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80",
      description:
        "بلوفر تريكو أنيق من خيوط الصوف عالية الجودة التي لا توبر مع الاستخدام والغسيل المتكرر.",
      category: "hoodies",
    },
    {
      id: 18,
      name: "سويت شيرت مطبوع كاجوال",
      price: 550,
      image:
        "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80",
      description:
        "سويت شيرت شبابي بطبعة عصرية دقيقة على الصدر والظهر، يمنحك إطلالة فريدة ومتميزة.",
      category: "hoodies",
    },
    {
      id: 19,
      name: "هودي باستيل مبطن",
      price: 749,
      image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
      description:
        "هودي بألوان الباستيل المهدئة والمريحة للعين، مصنوع من خامات قطنية معالجة وناعمة للغسيل الشاق.",
      category: "hoodies",
    },
    {
      id: 20,
      name: "سويت شيرت رياضي مريح",
      price: 480,
      image:
        "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=600&q=80",
      description:
        "سويت شيرت خفيف الوزن بنظام طرد الرطوبة، مناسب جداً للجيم أو لممارسة رياضة الجري في الصباح.",
      category: "hoodies",
    },

    {
      id: 21,
      name: "جاكيت جلد بريميوم",
      price: 1499,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت جلد كاجوال بتصميم راكب الدراجات (Biker)، متين ويمنحك هيبة وأناقة لا مثيل لها.",
      category: "jackets",
    },
    {
      id: 22,
      name: "جاكيت جينز كلاسيك ممزق",
      price: 799,
      image:
        "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت دنيم أزرق مع بعض اللمسات الكاجوال العصرية، يتماشى بشكل مذهل مع تيشرت أبيض سادة بنطلون أسود.",
      category: "jackets",
    },
    {
      id: 23,
      name: "بالطو صوف طويل فخم",
      price: 2400,
      image:
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80",
      description:
        "معطف شتوي طويل مصنوع من الصوف الفاخر بقصة إنجليزية مستقيمة، يوفر الدفء الأمثل والأناقة الفخمة.",
      category: "jackets",
    },
    {
      id: 24,
      name: "جاكيت بامب ووتربروف",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت منفوخ (Puffer) عازل تماماً للمياه والهواء، خفيف الوزن ومناسب جداً لأيام المطر الغزير والبرد القارس.",
      category: "jackets",
    },
    {
      id: 25,
      name: "جاكيت بومبر شبابي أسود",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80",
      description:
        "جاكيت بومبر (Bomber) بأطراف مطاطية عند المعصم والخصر، مظهر عصري وخامة مقاومة للرياح.",
      category: "jackets",
    },
    {
      id: 26,
      name: "جاكيت وندبريكر خفيف",
      price: 650,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت رياضي خفيف ومثالي لفصلي الخريف والربيع، يحميك من تقلبات الجو والرياح المفاجئة السريعة.",
      category: "jackets",
    },
    {
      id: 27,
      name: "جاكيت جباردين زيتي بجيوب",
      price: 950,
      image:
        "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=80",
      description:
        "جاكيت سفاري مصنوع من قماش الجباردين المتين ومزود بـ 4 جيوب أمامية كبيرة وتصميم عملي وعسكري رائع.",
      category: "jackets",
    },
    {
      id: 28,
      name: "بليزر كاجوال رمادي",
      price: 1350,
      image:
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      description:
        "بليزر بتفصيلة كاجوال ناعمة بدون بطانة ثقيلة، يمكن ارتداؤه مع الجينز للحصول على مظهر ذكي (Smart Casual).",
      category: "jackets",
    },

    {
      id: 29,
      name: "بنطلون تشينو كلاسيك بيج",
      price: 549,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      description:
        "بنطلون مريح بخامة قطنية متينة وقصة سليم فيت، يجمع بين راحة الكاجوال وأناقة الكلاسيك.",
      category: "pants",
    },
    {
      id: 30,
      name: "بنطلون جينز أزرق غامق",
      price: 499,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
      description:
        "جينز متين بقصة مريحة وألوان ثابتة لا تبهت بكثرة الغسيل، مزود بـ 5 جيوب تقليدية عملية.",
      category: "pants",
    },
    {
      id: 31,
      name: "بنطلون جينز أسود سليم ليكرا",
      price: 520,
      image:
        "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
      description:
        "جينز أسود شديد السواد بخامة مرنة ومطاطية (ليكرا) تضمن لك سهولة تامة وحرية فائقة في الحركة اليومية.",
      category: "pants",
    },
    {
      id: 32,
      name: "بنطلون كارغو زيتي بجيوب",
      price: 599,
      image:
        "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80",
      description:
        "بنطلون كارغو (Cargo) بستايل هيب هوب شبابي مميز بجيوب جانبية ضخمة وأساور مطاطية من الأسفل.",
      category: "pants",
    },
    {
      id: 33,
      name: "بنطلون جوجر قطن رمادي",
      price: 399,
      image:
        "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80",
      description:
        "بنطلون جوجر رياضي مريح جداً للمنزل أو المشاوير السريعة والتمارين، برباط خصر مرن وقابل للتعديل.",
      category: "pants",
    },
    {
      id: 34,
      name: "شورت كاجوال قطن كحلي",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
      description:
        "شورت صيفي خفيف الوزن وطري، مناسب جداً للارتداء على الشواطئ والمصايف والتمشية الصيفية.",
      category: "pants",
    },
    {
      id: 35,
      name: "بنطلون قماش رمادي رسمي",
      price: 580,
      image:
        "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80",
      description:
        "بنطلون قماش فاخر مخصص للمناسبات والبدل والاجتماعات، خامة فاخرة باردة تمنحك الثقة والأناقة.",
      category: "pants",
    },
    {
      id: 36,
      name: "بنطلون جينز ثلجي هادي",
      price: 540,
      image:
        "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
      description:
        "جينز بلون ثلجي فاتح مميز ومفضل جداً في فترات الصيف والنهار، قصة عصرية جذابة وتناسب الأحذية الفاتحة.",
      category: "pants",
    },

    {
      id: 37,
      name: "حذاء سنيكرز أبيض فاخر",
      price: 899,
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
      description:
        "حذاء رياضي خفيف الوزن بنعل مريح جداً للمشي الطويل، يتماشى مع جميع ملابسك الكاجوال والدنيم البسيطة.",
      category: "shoes",
    },
    {
      id: 38,
      name: "حذاء كلاسيك جلد بني",
      price: 1100,
      image:
        "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80",
      description:
        "حذاء رسمي أوكسفورد من الجلد الطبيعي اللامع، قصة كلاسيكية ونعل متين ومريح للأفراح والاجتماعات الفخمة.",
      category: "shoes",
    },
    {
      id: 40,
      name: "هاف بوت شمواه هافان",
      price: 950,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
      description:
        "حذاء بوت كاحل (Chelsea Boot) مصنوع من الشمواه الفاخر، يعطي لمسة شتوية غنية وأنيقة مع الجينز.",
      category: "shoes",
    },
    {
      id: 41,
      name: "سنيكرز رمادي رياضي عصري",
      price: 699,
      image:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80",
      description:
        "كوتشي كاجوال خفيف الوزن للمشاوير والجامعة، خامة قماش شبكي يسمح بمرور الهواء وتبريد القدمين.",
      category: "shoes",
    },
    {
      id: 42,
      name: "حذاء لوفرز مريح بدون أربطة",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80",
      description:
        "حذاء لوفرز (Loafers) كاجوال سهل الارتداء والخلع سريعاً، مبطن داخلياً بفرش مساج طبي مرن ومريح.",
      category: "shoes",
    },
    {
      id: 43,
      name: "بوت جلدي شتوي متين",
      price: 1390,
      image:
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80",
      description:
        "بوت مبطن من الداخل لحماية كاملة في الشتاء والأراضي الوعرة، مظهر خشن ورجالي وقوي للغاية.",
      category: "shoes",
    },
    {
      id: 44,
      name: "سليبر جلدي منزلي مريح",
      price: 250,
      image:
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
      description:
        "سليبر مريح ومفتوح للمنزل أو الشاطئ مصنوع من خامات لينة تمنع الانزلاق وتوفر راحة مستمرة.",
      category: "shoes",
    },

    {
      id: 45,
      name: "ساعة كوارتز سوداء بسير جلدي",
      price: 1200,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      description:
        "ساعة يد كلاسيكية أنيقة تناسب الإطلالات الكلاسيكية والكاجوال، مقاومة لرذاذ الماء والخدوش البسيطة.",
      category: "accessories",
    },
    {
      id: 46,
      name: "نظارة شمسية بولارايزد كلاسيك",
      price: 450,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
      description:
        "نظارة شمسية توفر حماية 100% من الأشعة فوق البنفسجية UV400 بعدسات واضحة تمنع انعكاس الضوء المزعج.",
      category: "accessories",
    },
    {
      id: 47,
      name: "حزام جلد طبيعي 100% أسود",
      price: 299,
      image:
        "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      description:
        "حزام مصنوع من طبقات الجلد الطبيعي السميك بتصميم كلاسيكي متين وإبزيم معدني مقاوم للصدأ.",
      category: "accessories",
    },
    {
      id: 48,
      name: "كاب قطني رياضي أسود",
      price: 180,
      image:
        "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
      description:
        "كاب رياضي قطني لحمايتك من أشعة الشمس، مزود بفتحات تهوية وحزام خلفي قابل لتعديل المقاس بدقة.",
      category: "accessories",
    },
    {
      id: 49,
      name: "محفظة كروت جلدية نحيفة",
      price: 220,
      image:
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80",
      description:
        "محفظة كروت بتصميم نحيف وعصري (Slim Cardholder) تتسع لـ 6 كروت ونقود ورقية دون تضخم الجيب.",
      category: "accessories",
    },
    {
      id: 50,
      name: "برفان رجالي نايت ليميتد إيديشن",
      price: 850,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
      description:
        "عطر رجالي فواح وثابت يدوم لأكثر من 24 ساعة، برائحة الأخشاب الشرقية واللافندر الجذابة والنادرة.",
      category: "accessories",
    },
    {
      id: 51,
      name: "طقم جوارب قطنية طويلة (3 قطع)",
      price: 150,
      image:
        "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80",
      description:
        "مجموعة من ثلاثة أزواج جوارب مصنوعة من القطن الطبيعي لامتصاص العرق وتوفير راحة مثالية طوال اليوم داخل الحذاء.",
      category: "accessories",
    },
    {
      id: 52,
      name: "سوار جلدي كاجوال رجالي",
      price: 130,
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
      description:
        "حظاظة أو إسورة من الجلد المضفر الفاخر بقفل مغناطيسي قوي مصنوع من التيتانيوم، تضيف لمسة شبابية.",
      category: "accessories",
    },
    {
      id: 53,
      name: "شنطة كروس للمتعلقات الشخصية",
      price: 390,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
      description:
        "حقيبة كروس صغيرة مقاومة للمياه تتسع للمحفظة، الموبايل، النظارة والباوربانك، ومثالية للارتداء اليومي السريع.",
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
      ? `mousa elnagar طلب جديد من متجر  \n\n${cart
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

  const favoriteItems = products.filter((p) => favorites.includes(p.id)).concat(
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
          <div className="bg-gray-900/95 backdrop-blur-md text-white px-8 py-4 rounded-full shadow-2xl border border-gray-800 text-center text-sm md:text-base font-bold animate-bounce text-ellipsis overflow-hidden max-w-full">
            {toastMessage}
          </div>
        </div>
      )}

      <header
        className={`sticky top-0 z-40 border-b shadow-sm backdrop-blur-md transition-colors ${
          darkMode
            ? "bg-slate-900/90 border-slate-800"
            : "bg-white/90 border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-extrabold tracking-tight">
            3l_nagar <span className="text-green-600">Clothing</span>
          </h1>

          <nav
            className={`hidden md:flex gap-8 font-medium ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <a href="#" className="hover:text-green-500 transition">
              الرئيسية
            </a>
            <a href="#offers" className="hover:text-green-500 transition">
              العروض
            </a>
            <a href="#products" className="hover:text-green-500 transition">
              المنتجات
            </a>
            <a href="#contact" className="hover:text-green-500 transition">
              تواصل معنا
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all active:scale-90 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-yellow-400 hover:bg-slate-700"
                  : "bg-gray-100 border-gray-200 text-slate-700 hover:bg-gray-200"
              }`}
              title={darkMode ? "الوضع النهاري" : "الوضع الليلي"}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>

            <button
              onClick={() => setFavoritesOpen(true)}
              className={`p-2.5 rounded-full border relative transition-all active:scale-90 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 text-red-400"
                  : "bg-gray-100 border-gray-200 text-red-500"
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

      <section
        className={`py-20 px-6 transition-colors ${
          darkMode ? "bg-slate-900" : "bg-white"
        }`}
      >
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center perspective-3d">
          <div className="text-right">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              ارتقِ بأناقتك مع <br /> elnagar 
            </h2>

            <p
              className={`text-lg mb-8 leading-relaxed ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              اكتشف تشكيلتنا الجديدة والحصرية المكونة من أكثر من 50 قطعة من
              الملابس الرجالية الفخمة، الكاجوال، والأحذية المصممة بعناية لتناسب
              أناقتك اليومية.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full transition-all shadow-md hover:shadow-lg text-lg hover:-translate-y-1"
            >
              تواصل عبر واتساب للاستفسارات السريعة
            </a>
          </div>

          <div className="relative card-3d-effect cursor-pointer">
            <div className="absolute inset-0 bg-green-600/20 rounded-3xl transform rotate-3 scale-105 -z-10 blur-sm"></div>

            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"
              alt="3l_nagar Luxury Fashion"
              className="rounded-3xl shadow-2xl w-full object-cover h-[500px] border border-white/10"
            />
          </div>
        </div>
      </section>

      <section id="offers" className="py-20 px-6 perspective-3d">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-3xl">🔥</span>
            <h3 className="text-3xl font-extrabold">
              أقوى العروض الحالية الحصرية
            </h3>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className={`group card-3d-effect border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-white border-gray-100"
                }`}
              >
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() =>
                    setSelectedProduct({
                      ...offer,
                      category: "shirts",
                    })
                  }
                >
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                      عرض الوصف والتفاصيل
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(offer.id, offer.name);
                    }}
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md transition active:scale-95 z-20 ${
                      favorites.includes(offer.id)
                        ? "bg-red-50 text-red-500"
                        : "bg-white/80 text-gray-600 hover:text-red-500"
                    }`}
                  >
                    {favorites.includes(offer.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-xl mb-1">{offer.name}</h4>

                  <p className="text-green-600 font-extrabold text-lg mb-5">
                    {offer.price} جنيه
                  </p>

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

      <section
        id="products"
        className={`py-20 px-6 border-t rounded-t-[3rem] perspective-3d transition-colors ${
          darkMode
            ? "bg-slate-900/50 border-slate-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-extrabold mb-4 text-center">
            كل منتجات متجرنا الرجالية
          </h3>

          <p
            className={`text-center mb-12 ${
              darkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            تصفح تشكيلتنا الضخمة المكونة من أرقى الملابس، الأحذية، والإكسسوارات.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-green-600 text-white shadow-md scale-105"
                    : darkMode
                      ? "bg-slate-800 text-gray-300 hover:bg-slate-700"
                      : "bg-slate-100 text-gray-600 hover:bg-slate-200"
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
                className={`group card-3d-effect border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between ${
                  darkMode
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-50 border-gray-100"
                }`}
              >
                <div
                  className="relative cursor-pointer overflow-hidden aspect-[4/5]"
                  onClick={() => setSelectedProduct(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm text-sm">
                      تفاصيل القطعة 🔍
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id, product.name);
                    }}
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md transition active:scale-95 z-20 ${
                      favorites.includes(product.id)
                        ? "bg-red-50 text-red-500"
                        : "bg-white/80 text-gray-600 hover:text-red-500"
                    }`}
                  >
                    {favorites.includes(product.id) ? "❤️" : "🤍"}
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-lg mb-1 group-hover:text-green-600 transition-colors line-clamp-1">
                      {product.name}
                    </h4>

                    <p className="text-green-600 font-extrabold text-base mb-4">
                      {product.price} جنيه
                    </p>
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

      <section
        id="contact"
        className="py-20 px-6 text-center bg-gray-900 text-white rounded-t-[3rem] mt-10"
      >
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            هل تحتاج مساعدة بخصوص المقاسات؟
          </h3>

          <p className="text-gray-300 mb-10 text-lg">
            فريق خدمة العملاء متواجد لمساعدتك في تنسيق الملابس واختيار أنسب
            مقاس لك وشحن طلبك فوراً.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-full inline-flex items-center gap-2 transition-transform hover:scale-105 shadow-lg text-lg"
          >
            <span>💬</span>
            تحدث معنا عبر الواتساب الآن
          </a>
        </div>
      </section>

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
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

      {selectedProduct && (
        <div
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 cursor-default ${
              darkMode
                ? "bg-slate-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition z-10 font-bold"
            >
              ✕
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-80 object-cover"
            />

            <div className="p-8">
              <h3 className="text-2xl font-bold mb-2">
                {selectedProduct.name}
              </h3>

              <p className="text-green-600 font-extrabold text-xl mb-4">
                {selectedProduct.price} جنيه
              </p>

              <div
                className={`p-4 rounded-xl border mb-6 leading-relaxed text-sm md:text-base ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-gray-300"
                    : "bg-slate-50 border-gray-200 text-gray-600"
                }`}
              >
                {selectedProduct.description}
              </div>

              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-gray-900 hover:bg-black dark:bg-green-600 dark:hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-transform active:scale-95 text-lg"
              >
                أضف للسلة الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {cartOpen && (
        <div
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full md:w-[450px] max-h-[85vh] flex flex-col rounded-t-[2rem] md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 cursor-default ${
              darkMode
                ? "bg-slate-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div
              className={`flex justify-between items-center p-6 border-b ${
                darkMode ? "border-slate-800" : "border-gray-200"
              }`}
            >
              <h3 className="font-extrabold text-xl flex items-center gap-2">
                <span>🛒</span>
                سلة المشتريات
              </h3>

              <button
                onClick={() => setCartOpen(false)}
                className="text-gray-400 hover:text-red-500 bg-gray-100 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4 opacity-50">🛍</div>
                  <p className="text-gray-500 font-medium">
                    سلتك فارغة حالياً
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center p-4 rounded-2xl border ${
                        darkMode
                          ? "bg-slate-800/50 border-slate-700"
                          : "bg-slate-50 border-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover"
                        />

                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-green-600 font-semibold">
                            {item.price} جنيه
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded-lg transition"
                      >
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div
                className={`p-6 border-t rounded-b-3xl ${
                  darkMode
                    ? "bg-slate-800/80 border-slate-700"
                    : "bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">
                    الإجمالي
                  </span>

                  <span className="font-extrabold text-2xl">
                    {total} جنيه
                  </span>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all text-center"
                >
                  <span>إتمام الطلب عبر واتساب</span>
                  <span>📱</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {favoritesOpen && (
        <div
          onClick={() => setFavoritesOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full md:w-[450px] max-h-[85vh] flex flex-col rounded-t-[2rem] md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 cursor-default ${
              darkMode
                ? "bg-slate-900 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <div
              className={`flex justify-between items-center p-6 border-b ${
                darkMode ? "border-slate-800" : "border-gray-200"
              }`}
            >
              <h3 className="font-extrabold text-xl flex items-center gap-2 text-red-500">
                <span>❤️</span>
                المنتجات المفضلة
              </h3>

              <button
                onClick={() => setFavoritesOpen(false)}
                className="text-gray-400 hover:text-red-500 bg-gray-100 dark:bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center transition"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {favoriteItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4 opacity-50">❤️</div>

                  <p className="text-gray-500 font-medium">
                    لم تقم بإضافة منتجات للمفضلة بعد
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteItems.map((item) => (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center p-4 rounded-2xl border ${
                        darkMode
                          ? "bg-slate-800/50 border-slate-700"
                          : "bg-slate-50 border-gray-100"
                      }`}
                    >
                      <div
                        className="flex items-center gap-4 cursor-pointer min-w-0"
                        onClick={() => {
                          setSelectedProduct(item);
                          setFavoritesOpen(false);
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />

                        <div className="min-w-0">
                          <p className="font-bold line-clamp-1">
                            {item.name}
                          </p>

                          <p className="text-green-600 font-semibold">
                            {item.price} جنيه
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2 shrink-0">
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-600 hover:bg-green-700 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold transition"
                        >
                          + 🛒
                        </button>

                        <button
                          onClick={() =>
                            toggleFavorite(item.id, item.name)
                          }
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 p-2 rounded-lg transition text-sm"
                        >
                          حذف
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

      <footer
        className={`border-t text-center py-8 transition-colors ${
          darkMode
            ? "bg-slate-900 border-slate-800 text-gray-400"
            : "bg-white text-gray-500"
        }`}
      >
        <p className="mb-2">
          © {new Date().getFullYear()} جميع الحقوق محفوظة لمتجر elnagar 
        </p>

        <p className="text-sm font-medium">
           elnagar تم التطوير بواسطة 
        </p>
      </footer>
    </main>
  );
      }
