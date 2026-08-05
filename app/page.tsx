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

  // حالات التحكم
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  
  // حالات التحكم الجديدة (البحث والترتيب)
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default"); // default, price-asc, price-desc

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

  // العروض المميزة الحالية (3 عروض)
  const offers: Omit<Product, "category">[] = [
    {
      id: 1,
      name: "عرض الصيف المتكامل",
      price: 599,
      image: "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?auto=format&fit=crop&w=600&q=80",
      description: "طقم كاجوال صيفي مريح جداً خامة قطن ليكرا ممتازة، مثالي للخروجات اليومية والمصايف.",
    },
    {
      id: 2,
      name: "طقم كلاسيك أنيق",
      price: 1299,
      image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&q=80",
      description: "بدلة شبه رسمية بتفصيل عصري وخامات تركية فاخرة تناسب مناسباتك السعيدة واجتماعات العمل.",
    },
    {
      id: 3,
      name: "الباقة الشبابية المحدودة",
      price: 899,
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
      description: "تجميعة مميزة من قطعتين بألوان متناسقة وعصرية توفر لك إطلالة جذابة ومختلفة.",
    },
  ];

  // تشكيلة المنتجات المكونة من 50 منتجاً تماماً
  const products: Product[] = [
    // --- قمصان وتيشرتات ---
    { id: 4, name: "قميص أبيض أوكسفورد", price: 499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80", description: "قميص كلاسيكي أبيض بخامة الأوكسفورد الثقيلة والمقاومة للتجعد، قطعة أساسية في دولابك.", category: "shirts" },
    { id: 5, name: "تيشرت بيزك قطن صافي", price: 249, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80", description: "تيشرت قطني 100% ناعم على البشرة، متوفر بجميع المقاسات وممتاز لتنسيقه تحت الجواكيت.", category: "shirts" },
    { id: 6, name: "قميص جينز كاجوال الأزرق", price: 599, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80", description: "قميص جينز عصري مصنوع من الدنيم الخفيف المتين، يعطيك طابعاً شبابياً وعملياً طوال اليوم.", category: "shirts" },
    { id: 7, name: "قميص كتان بيج صيفي", price: 520, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=600&q=80", description: "قميص مصنوع من الكتان الطبيعي بنسبة 100% لتوفير أقصى درجات الانتعاش والراحة في الصيف.", category: "shirts" },
    { id: 8, name: "تيشرت بولو كلاسيك أسود", price: 380, image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388?auto=format&fit=crop&w=600&q=80", description: "تيشرت بولو بياقة مقواة وأزرار أمامية أنيقة، مناسب للخروج شبه الرسمي واليومي.", category: "shirts" },
    { id: 9, name: "قميص مقلم كاجوال عصري", price: 480, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80", description: "قميص مقلم بخطوط طولية مميزة تساعد على إعطاء مظهر متناسق وجذاب ومناسب للجسم.", category: "shirts" },
    { id: 10, name: "تيشرت جرافيك هيب هوب", price: 299, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80", description: "تيشرت بطباعة ديجيتال خلفية عالية الجودة لا تتأثر بالغسيل، وقصة فضفاضة مريحة للشباب.", category: "shirts" },
    { id: 11, name: "قميص زيتي سليم فيت", price: 460, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80", description: "قميص بلون زيتي هادئ وقصة مجسمة تبرز جمال القوام، مصنوع من خليط القطن الفاخر المعالج.", category: "shirts" },
    { id: 12, name: "تيشرت أوفرسايز رمادي", price: 340, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80", description: "تيشرت رمادي بتصميم فضفاض الأكتاف (Oversized Trend)، شبابي جداً ومواكب لأحدث صيحات الموضة.", category: "shirts" },
    { id: 13, name: "قميص كاروهات أحمر", price: 499, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80", description: "قميص كاروهات كلاسيكي دافئ وخفيف، رائع للارتداء مفتوحاً فوق تيشرت بيزك أبيض.", category: "shirts" },
    // --- هوديز وسويت شيرت ---
    { id: 14, name: "هودي أوفرسايز عصري", price: 799, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80", description: "هودي مريح جداً بقصة فضفاضة (Oversized) مبطن من الداخل بالفرو الناعم ليوفر لك أقصى درجات الدفء.", category: "hoodies" },
    { id: 15, name: "سويت شيرت نيفي بيزك", price: 499, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600&q=80", description: "سويت شيرت كلاسيكي بدون زعبوط بلون كحلي فخم، خامة ثقيلة ومرنة ممتازة للشتاء الخفيف.", category: "hoodies" },
    { id: 16, name: "هودي بسحاب كامل أسود", price: 850, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80", description: "هودي عملي مزود بسحاب (Zip-up) كامل وجيوب أمامية واسعة تتسع لأغراضك اليومية كالموبايل والمفاتيح.", category: "hoodies" },
    { id: 17, name: "بلوفر تريكو صوف ناعم", price: 690, image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?auto=format&fit=crop&w=600&q=80", description: "بلوفر تريكو أنيق من خيوط الصوف عالية الجودة التي لا توبر مع الاستخدام والغسيل المتكرر.", category: "hoodies" },
    { id: 18, name: "سويت شيرت مطبوع كاجوال", price: 550, image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=600&q=80", description: "سويت شيرت شبابي بطبعة عصرية دقيقة على الصدر والظهر، يمنحك إطلالة فريدة ومتميزة.", category: "hoodies" },
    { id: 19, name: "هودي باستيل مبطن", price: 749, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80", description: "هودي بألوان الباستيل المهدئة والمريحة للعين، مصنوع من خامات قطنية معالجة وناعمة للغسيل الشاق.", category: "hoodies" },
    { id: 20, name: "سويت شيرت رياضي مريح", price: 480, image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b?auto=format&fit=crop&w=600&q=80", description: "سويت شيرت خفيف الوزن بنظام طرد الرطوبة، مناسب جداً للجيم أو لممارسة رياضة الجري في الصباح.", category: "hoodies" },
    // --- جواكيت ومعاطف ---
    { id: 21, name: "جاكيت جلد بريميوم", price: 1499, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80", description: "جاكيت جلد كاجوال بتصميم راكب الدراجات (Biker)، متين ويمنحك هيبة وأناقة لا مثيل لها.", category: "jackets" },
    { id: 22, name: "جاكيت جينز كلاسيك ممزق", price: 799, image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?auto=format&fit=crop&w=600&q=80", description: "جاكيت دنيم أزرق مع بعض اللمسات الكاجوال العصرية، يتماشى بشكل مذهل مع تيشرت أبيض سادة بنطلون أسود.", category: "jackets" },
    { id: 23, name: "بالطو صوف طويل فخم", price: 2400, image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=600&q=80", description: "معطف شتوي طويل مصنوع من الصوف الفاخر بقصة إنجليزية مستقيمة، يوفر الدفء الأمثل والأناقة الفخمة.", category: "jackets" },
    { id: 24, name: "جاكيت بامب ووتربروف", price: 1100, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80", description: "جاكيت منفوخ (Puffer) عازل تماماً للمياه والهواء، خفيف الوزن ومناسب جداً لأيام المطر الغزير والبرد القارس.", category: "jackets" },
    { id: 25, name: "جاكيت بومبر شبابي أسود", price: 899, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80", description: "جاكيت بومبر (Bomber) بأطراف مطاطية عند المعصم والخصر، مظهر عصري وخامة مقاومة للرياح.", category: "jackets" },
    { id: 26, name: "جاكيت وندبريكر خفيف", price: 650, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80", description: "جاكيت رياضي خفيف ومثالي لفصلي الخريف والربيع، يحميك من تقلبات الجو والرياح المفاجئة السريعة.", category: "jackets" },
    { id: 27, name: "جاكيت جباردين زيتي بجيوب", price: 950, image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=600&q=80", description: "جاكيت سفاري مصنوع من قماش الجباردين المتين ومزود بـ 4 جيوب أمامية كبيرة وتصميم عملي وعسكري رائع.", category: "jackets" },
    { id: 28, name: "بليزر كاجوال رمادي", price: 1350, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80", description: "بليزر بتفصيلة كاجوال ناعمة بدون بطانة ثقيلة، يمكن ارتداؤه مع الجينز للحصول على مظهر ذكي (Smart Casual).", category: "jackets" },
    // --- بنطلونات وشورتات ---
    { id: 29, name: "بنطلون تشينو كلاسيك بيج", price: 549, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80", description: "بنطلون مريح بخامة قطنية متينة وقصة سليم فيت، يجمع بين راحة الكاجوال وأناقة الكلاسيك.", category: "pants" },
    { id: 30, name: "بنطلون جينز أزرق غامق", price: 499, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80", description: "جينز متين بقصة مريحة وألوان ثابتة لا تبهت بكثرة الغسيل، مزود بـ 5 جيوب تقليدية عملية.", category: "pants" },
    { id: 31, name: "بنطلون جينز أسود سليم ليكرا", price: 520, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80", description: "جينز أسود شديد السواد بخامة مرنة ومطاطية (ليكرا) تضمن لك سهولة تامة وحرية فائقة في الحركة اليومية.", category: "pants" },
    { id: 32, name: "بنطلون كارغو زيتي بجيوب", price: 599, image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd?auto=format&fit=crop&w=600&q=80", description: "بنطلون كارغو (Cargo) بستايل هيب هوب شبابي مميز بجيوب جانبية ضخمة وأساور مطاطية من الأسفل.", category: "pants" },
    { id: 33, name: "بنطلون جوجر قطن رمادي", price: 399, image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&w=600&q=80", description: "بنطلون جوجر رياضي مريح جداً للمنزل أو المشاوير السريعة والتمارين، برباط خصر مرن وقابل للتعديل.", category: "pants" },
    { id: 34, name: "شورت كاجوال قطن كحلي", price: 299, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80", description: "شورت صيفي خفيف الوزن وطري، مناسب جداً للارتداء على الشواطئ والمصايف والتمشية الصيفية.", category: "pants" },
    { id: 35, name: "بنطلون قماش رمادي رسمي", price: 580, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=600&q=80", description: "بنطلون قماش فاخر مخصص للمناسبات والبدل والاجتماعات، خامة فاخرة باردة تمنحك الثقة والأناقة.", category: "pants" },
    { id: 36, name: "بنطلون جينز ثلجي هادي", price: 540, image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80", description: "جينز بلون ثلجي فاتح مميز ومفضل جداً في فترات الصيف والنهار، قصة عصرية جذابة وتناسب الأحذية الفاتحة.", category: "pants" },
    // --- أحذية وسنيكرز ---
    { id: 37, name: "حذاء سنيكرز أبيض فاخر", price: 899, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80", description: "حذاء رياضي خفيف الوزن بنعل مريح جداً للمشي الطويل، يتماشى مع جميع ملابسك الكاجوال والدنيم البسيطة.", category: "shoes" },
    { id: 38, name: "حذاء كلاسيك جلد بني", price: 1100, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=600&q=80", description: "حذاء رسمي أوكسفورد من الجلد الطبيعي اللامع، قصة كلاسيكية ونعل متين ومريح للأفراح والاجتماعات الفخمة.", category: "shoes" },
    { id: 40, name: "هاف بوت شمواه هافان", price: 950, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80", description: "حذاء بوت كاحل (Chelsea Boot) مصنوع من الشمواه الفاخر، يعطي لمسة شتوية غنية وأنيقة مع الجينز.", category: "shoes" },
    { id: 41, name: "سنيكرز رمادي رياضي عصري", price: 699, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=600&q=80", description: "كوتشي كاجوال خفيف الوزن للمشاوير والجامعة، خامة قماش شبكي يسمح بمرور الهواء وتبريد القدمين.", category: "shoes" },
    { id: 42, name: "حذاء لوفرز مريح بدون أربطة", price: 850, image: "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=600&q=80", description: "حذاء لوفرز (Loafers) كاجوال سهل الارتداء والخلع سريعاً، مبطن داخلياً بفرش مساج طبي مرن ومريح.", category: "shoes" },
    { id: 43, name: "بوت جلدي شتوي متين", price: 1390, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&w=600&q=80", description: "بوت مبطن من الداخل لحماية كاملة في الشتاء والأراضي الوعرة، مظهر خشن ورجالي وقوي للغاية.", category: "shoes" },
    { id: 44, name: "سليبر جلدي منزلي مريح", price: 250, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80", description: "سليبر مريح ومفتوح للمنزل أو الشاطئ مصنوع من خامات لينة تمنع الانزلاق وتوفر راحة مستمرة.", category: "shoes" },
    // --- إكسسوارات وعناية ---
    { id: 45, name: "ساعة كوارتز سوداء بسير جلدي", price: 1200, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80", description: "ساعة يد كلاسيكية أنيقة تناسب الإطلالات الكلاسيكية والكاجوال، مقاومة لرذاذ الماء والخدوش البسيطة.", category: "accessories" },
    { id: 46, name: "نظارة شمسية بولارايزد كلاسيك", price: 450, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80", description: "نظارة شمسية توفر حماية 100% من الأشعة فوق البنفسجية UV400 بعدسات واضحة تمنع انعكاس الضوء المزعج.", category: "accessories" },
    { id: 47, name: "حزام جلد طبيعي 100% أسود", price: 299, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80", description: "حزام مصنوع من طبقات الجلد الطبيعي السميك بتصميم كلاسيكي متين وإبزيم معدني مقاوم للصدأ.", category: "accessories" },
    { id: 48, name: "كاب قطني رياضي أسود", price: 180, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80", description: "كاب رياضي قطني لحمايتك من أشعة الشمس، مزود بفتحات تهوية وحزام خلفي قابل لتعديل المقاس بدقة.", category: "accessories" },
    { id: 49, name: "محفظة كروت جلدية نحيفة", price: 220, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=600&q=80", description: "محفظة كروت بتصميم نحيف وعصري (Slim Cardholder) تتسع لـ 6 كروت ونقود ورقية دون تضخم الجيب.", category: "accessories" },
    { id: 50, name: "برفان رجالي نايت ليميتد إيديشن", price: 850, image: "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80", description: "عطر رجالي فواح وثابت يدوم لأكثر من 24 ساعة، برائحة الأخشاب الشرقية واللافندر الجذابة والنادرة.", category: "accessories" },
    { id: 51, name: "طقم جوارب قطنية طويلة (3 قطع)", price: 150, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=600&q=80", description: "مجموعة من ثلاثة أزواج جوارب مصنوعة من القطن الطبيعي لامتصاص العرق وتوفير راحة مثالية طوال اليوم داخل الحذاء.", category: "accessories" },
    { id: 52, name: "سوار جلدي كاجوال رجالي", price: 130, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80", description: "حظاظة أو إسورة من الجلد المضفر الفاخر بقفل مغناطيسي قوي مصنوع من التيتانيوم، تضيف لمسة شبابية.", category: "accessories" },
    { id: 53, name: "شنطة كروس للمتعلقات الشخصية", price: 390, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80", description: "حقيبة كروس صغيرة مقاومة للمياه تتسع للمحفظة، الموبايل، النظارة والباوربانك، ومثالية للارتداء اليومي السريع.", category: "accessories" }
  ];

  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (item: Product | Omit<Product, "category">) => {
    const formattedItem = { ...item, category: (item as Product).category || "shirts" } as Product;
    setCart((prev) => [...prev, formattedItem]);
    setToastMessage(`تمت إضافة "${item.name}" للسلة بنجاح! 🛒`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const toggleFavorite = (id: number, name: string) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((favId) => favId !== id));
      setToastMessage(`تمت إزالة "${name}" من المفضلة 💔`);
    } else {
      setFavorites((prev) => [...prev, id]);
      setToastMessage(`تمت إضافة "${name}" للمفضلة ❤️`);
    }
    setTimeout(() => setToastMessage(null), 2000);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const orderText = encodeURIComponent(
    cart.length
      ? `طلب جديد من متجر 3l_nagar Clothing 🛒\n\n${cart
          .map((item, i) => `${i + 1}- ${item.name} | ${item.price} جنيه`)
          .join("\n")}\n\nالإجمالي: *${total} جنيه*\n\nيرجى تأكيد الطلب وتحديد عنوان التوصيل.`
      : "أرغب بالاستفسار عن بعض المنتجات المتاحة لديكم."
  );

  // نظام الفلترة والترتيب الذكي (Smart Filtering & Sorting)
  const filteredAndSortedProducts = useMemo(() => {
    let result = activeCategory === "all" ? [...products] : products.filter(p => p.category === activeCategory);
    
    if (searchQuery.trim() !== "") {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(lowerQuery) || p.description.toLowerCase().includes(lowerQuery));
    }

    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  }, [activeCategory, searchQuery, sortBy, products]);

  const favoriteItems = products.filter(p => favorites.includes(p.id)).concat(
    (offers.filter(o => favorites.includes(o.id)) as unknown as Product[])
  );

  return (
    <main 
      dir="rtl" 
      className={`min-h-screen font-sans pb-20 selection:bg-green-500 selection:text-white transition-colors duration-500 ${
        darkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-gray-900"
      }`}
    >
      <style jsx global>{`
        .perspective-3d { perspective: 1200px; }
        .card-3d-effect {
          transform-style: preserve-3d;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.5s;
        }
        .card-3d-effect:hover {
          transform: translateY(-8px) rotateX(4deg) rotateY(-4deg) translateZ(20px);
        }
        .glass-header {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        /* تصميم سكرول بار احترافي */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #16a34a; border-radius: 10px; }
      `}</style>
      
      {/* إشعار ذكي (Toast) */}
      {toastMessage && (
        <div className="fixed top-24 inset-x-0 flex justify-center z-[200] pointer-events-none px-4 animate-in fade-in slide-in-from-top-5">
          <div className="bg-gray-900/95 backdrop-blur-xl text-white px-8 py-3.5 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] border border-gray-700/50 text-center text-sm md:text-base font-bold flex items-center gap-3">
            {toastMessage}
          </div>
        </div>
      )}

      {/* الهيدر الاحترافي */}
      <header className={`sticky top-0 z-40 border-b glass-header transition-colors ${
        darkMode ? "bg-slate-900/80 border-slate-800" : "bg-white/80 border-gray-200"
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight cursor-pointer">
            3l_nagar <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-400 to-green-600">Clothing</span>
          </h1>

          <nav className={`hidden md:flex gap-8 font-semibold text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
            <a href="#" className="hover:text-green-500 transition-colors">الرئيسية</a>
            <a href="#offers" className="hover:text-green-500 transition-colors">العروض الحصرية</a>
            <a href="#products" className="hover:text-green-500 transition-colors">التشكيلة الجديدة</a>
            <a href="#contact" className="hover:text-green-500 transition-colors">تواصل معنا</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-full border transition-all hover:scale-110 active:scale-90 ${
                darkMode ? "bg-slate-800 border-slate-700 text-yellow-400" : "bg-slate-100 border-gray-200 text-slate-700"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
            <button
              onClick={() => setFavoritesOpen(true)}
              className={`p-2.5 rounded-full border relative transition-all hover:scale-110 active:scale-90 ${
                darkMode ? "bg-slate-800 border-slate-700 text-red-400" : "bg-slate-100 border-gray-200 text-red-500"
              }`}
            >
              ❤️
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900">
                  {favorites.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* قسم الهيرو الاستثنائي (Hero Section) */}
      <section className={`relative py-24 md:py-32 px-6 overflow-hidden transition-colors ${darkMode ? "bg-slate-900" : "bg-slate-50"}`}>
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -z-10"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center perspective-3d">
          <div className="text-right z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 font-bold text-sm mb-6 border border-green-200 dark:border-green-800">
              🌟 التشكيلة الجديدة لموسم 2024
            </span>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1]">
              ارتقِ بأناقتك مع <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-green-500 to-emerald-700">
                3l_nagar
              </span>
            </h2>
            <p className={`text-lg md:text-xl mb-10 leading-relaxed font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
              اكتشف تشكيلتنا الحصرية المكونة من أرقى الملابس الرجالية، الكاجوال، والأحذية المصممة بعناية لتبرز شخصيتك وتميزك في كل وقت.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#products"
                className="bg-gray-900 dark:bg-white dark:text-gray-900 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-xl text-lg hover:-translate-y-1 flex items-center gap-2 ring-4 ring-transparent hover:ring-gray-300 dark:hover:ring-gray-600"
              >
                تسوق الآن 🛒
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg hover:shadow-green-600/30 text-lg hover:-translate-y-1 flex items-center gap-2 ring-4 ring-transparent hover:ring-green-300"
              >
                تواصل عبر واتساب 💬
              </a>
            </div>
          </div>
          <div className="relative card-3d-effect cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-tr from-green-600/30 to-transparent rounded-[2rem] transform rotate-3 scale-105 -z-10 blur-md"></div>
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"
              alt="3l_nagar Luxury Fashion"
              className="rounded-[2rem] shadow-2xl w-full object-cover h-[550px] border-4 border-white/20 dark:border-slate-800"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* قسم أقوى العروض الحالية */}
      <section id="offers" className="py-24 px-6 perspective-3d relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h3 className="text-4xl font-extrabold flex items-center gap-3">
                <span className="text-red-500 animate-pulse">🔥</span> عروض حصرية لفترة محدودة
              </h3>
              <p className={`mt-3 text-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}>وفر أكثر مع باقاتنا المجهزة خصيصاً لك.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div 
                key={offer.id} 
                className={`group card-3d-effect border rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-300 relative ${
                  darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-gray-100"
                }`}
              >
                <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full z-20 shadow-lg">
                  عرض خاص %
                </div>
                <div className="relative cursor-pointer overflow-hidden aspect-[4/3]" onClick={() => setSelectedProduct(offer as Product)}>
                  <img src={offer.image} alt={offer.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-bold w-full text-center bg-white/20 backdrop-blur-md py-2.5 rounded-xl border border-white/30">عرض التفاصيل 🔍</span>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleFavorite(offer.id, offer.name); }}
                    className={`absolute top-4 left-4 w-11 h-11 rounded-full shadow-lg flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 active:scale-95 z-20 ${
                      favorites.includes(offer.id) ? "bg-red-50 text-red-500 border border-red-200" : "bg-white/90 text-gray-400 hover:text-red-500"
                    }`}
                  >
                    {favorites.includes(offer.id) ? "❤️" : "🤍"}
                  </button>
                </div>
                <div className="p-6 md:p-8">
                  <h4 className="font-extrabold text-2xl mb-2 line-clamp-1">{offer.name}</h4>
                  <p className="text-green-600 font-black text-2xl mb-6">{offer.price} <span className="text-sm font-bold text-gray-500">ج.م</span></p>
                  <button
                    onClick={() => addToCart(offer)}
                    className="w-full bg-gray-900 hover:bg-black text-white dark:bg-green-600 dark:hover:bg-green-700 font-bold py-3.5 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                  >
                    أضف للسلة 🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* شريط الأدوات (البحث والترتيب) */}
      <section className="px-6 -mb-10 relative z-10">
        <div className={`max-w-7xl mx-auto p-4 md:p-6 rounded-[2rem] shadow-xl border flex flex-col md:flex-row gap-4 items-center justify-between ${
          darkMode ? "bg-slate-800/80 border-slate-700 backdrop-blur-lg" : "bg-white/80 border-gray-100 backdrop-blur-lg"
        }`}>
          <div className="relative w-full md:w-1/2">
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔍</span>
            <input 
              type="text" 
              placeholder="ابحث عن قميص، بنطلون، سنيكرز..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-3.5 pr-12 pl-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500 font-medium transition-all ${
                darkMode ? "bg-slate-900 border-slate-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-900"
              }`}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className="font-bold whitespace-nowrap">ترتيب حسب:</span>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className={`w-full md:w-auto py-3.5 px-4 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-500 font-medium appearance-none cursor-pointer ${
                darkMode ? "bg-slate-900 border-slate-700 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
              }`}
            >
              <option value="default">الافتراضي (الأحدث)</option>
              <option value="price-asc">السعر: من الأقل للأعلى 📈</option>
              <option value="price-desc">السعر: من الأعلى للأقل 📉</option>
            </select>
          </div>
        </div>
      </section>

      {/* قسم الـ 50 منتج */}
      <section 
        id="products" 
        className={`py-24 px-6 perspective-3d transition-colors pt-28 ${
          darkMode ? "bg-slate-900/50" : "bg-slate-100/50"
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-extrabold mb-4">التشكيلة الكاملة</h3>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-500"}`}>تصفح أحدث صيحات الموضة من ملابس وأحذية وإكسسوارات صُممت خصيصاً لأناقتك.</p>
          </div>

          {/* أشرطة الفلترة */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? "bg-green-600 text-white shadow-lg shadow-green-500/30 scale-105" 
                    : darkMode ? "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-green-500 hover:text-green-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-40">🕵️‍♂️</div>
              <h4 className="text-2xl font-bold mb-2">لم نتمكن من العثور على نتائج!</h4>
              <p className="text-gray-500">حاول البحث بكلمات مختلفة أو إزالة الفلاتر.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredAndSortedProducts.map((product) => (
                <div 
                  key={product.id} 
                  className={`group card-3d-effect border rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col justify-between relative ${
                    darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-transparent shadow-sm"
                  }`}
                >
                  {/* شارة التميز للمنتجات الغالية */}
                  {product.price >= 1000 && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-600 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full z-20 shadow-md flex items-center gap-1">
                      <span>Premium</span> 🌟
                    </div>
                  )}

                  <div className="relative cursor-pointer overflow-hidden aspect-[4/5] bg-gray-100 dark:bg-slate-800" onClick={() => setSelectedProduct(product)}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                      <span className="text-white font-bold bg-white/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/30 text-sm">تفاصيل سريعة</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id, product.name); }}
                      className={`absolute top-4 left-4 w-10 h-10 rounded-full shadow-md flex items-center justify-center backdrop-blur-md transition-transform hover:scale-110 active:scale-95 z-20 ${
                        favorites.includes(product.id) ? "bg-red-50 text-red-500 border border-red-200" : "bg-white/80 text-gray-500 hover:text-red-500"
                      }`}
                    >
                      {favorites.includes(product.id) ? "❤️" : "🤍"}
                    </button>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-lg mb-1 group-hover:text-green-600 transition-colors line-clamp-1">{product.name}</h4>
                      <p className="text-gray-500 text-sm mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-slate-800">
                      <p className="font-black text-xl">{product.price} <span className="text-xs text-gray-400">ج.م</span></p>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-gray-100 hover:bg-green-600 text-gray-900 hover:text-white dark:bg-slate-800 dark:text-white dark:hover:bg-green-600 font-bold p-3 rounded-xl transition-all active:scale-95"
                        title="أضف للسلة"
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

      {/* قسم تواصل معنا المطور */}
      <section id="contact" className="py-24 px-6 text-center bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1920&q=80')] opacity-10 bg-cover bg-center bg-fixed"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-green-400 font-bold text-lg mb-4 block">نحن هنا لخدمتك 24/7</span>
          <h3 className="text-4xl md:text-5xl font-black mb-6 leading-tight">محتار في المقاس أو التنسيق؟</h3>
          <p className="text-gray-300 mb-10 text-lg md:text-xl leading-relaxed">
            خبراء الموضة لدينا متواجدون لمساعدتك في اختيار ما يناسبك بكل دقة. تواصل معنا الآن للحصول على استشارة مجانية أو لطلب أوردرك فوراً.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-black px-10 py-5 rounded-full inline-flex items-center gap-3 transition-all hover:scale-105 shadow-[0_0_40px_rgba(34,197,94,0.4)] text-lg md:text-xl ring-4 ring-green-500/30"
          >
            <span>💬</span> تحدث معنا عبر الواتساب
          </a>
        </div>
      </section>

      {/* الأزرار العائمة */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <button
          onClick={() => setFavoritesOpen(true)}
          className="bg-white dark:bg-slate-800 text-red-500 hover:text-red-600 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-xl transition-transform hover:scale-110 active:scale-95 border dark:border-slate-700"
        >
          <span className="relative">
            ❤️
            {favorites.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-red-500 text-white text-[11px] font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800 shadow-md">
                {favorites.length}
              </span>
            )}
          </span>
        </button>

        <button
          onClick={() => setCartOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white w-16 h-16 rounded-full shadow-[0_10px_30px_rgba(22,163,74,0.4)] flex items-center justify-center text-2xl transition-transform hover:scale-110 active:scale-95 border-4 border-white dark:border-slate-900"
        >
          <span className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-3 -right-3 bg-gray-900 text-white text-xs font-bold w-7 h-7 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-md">
                {cart.length}
              </span>
            )}
          </span>
        </button>
      </div>

      {/* المودال: تفاصيل المنتج */}
      {selectedProduct && (
        <div 
          onClick={() => setSelectedProduct(null)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[120] flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl rounded-[2rem] overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300 cursor-default flex flex-col md:flex-row ${
              darkMode ? "bg-slate-900 text-white border border-slate-800" : "bg-white text-gray-900"
            }`}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black transition z-10 font-bold backdrop-blur-md"
            >
              ✕
            </button>
            <div className="md:w-1/2 relative h-64 md:h-auto">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-8 md:w-1/2 flex flex-col justify-center">
              <span className="text-green-500 font-bold text-sm mb-2 uppercase tracking-wider">{selectedProduct.category}</span>
              <h3 className="text-3xl font-black mb-2">{selectedProduct.name}</h3>
              <p className="text-gray-900 dark:text-white font-extrabold text-2xl mb-6">{selectedProduct.price} <span className="text-sm text-gray-500">جنيه مصري</span></p>
              <div className={`p-5 rounded-2xl mb-8 leading-relaxed text-sm md:text-base ${
                darkMode ? "bg-slate-800 text-gray-300" : "bg-gray-50 text-gray-700"
              }`}>
                {selectedProduct.description}
              </div>
              <button
                onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-transform active:scale-95 text-lg shadow-lg flex items-center justify-center gap-2"
              >
                أضف للسلة الآن 🛒
              </button>
            </div>
          </div>
        </div>
      )}

      {/* المودال: السلة */}
      {cartOpen && (
        <div 
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full md:w-[480px] max-h-[85vh] flex flex-col rounded-t-[2rem] md:rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 cursor-default border ${
              darkMode ? "bg-slate-900 text-white border-slate-800" : "bg-white text-gray-900 border-gray-100"
            }`}
          >
            <div className={`flex justify-between items-center p-6 md:p-8 border-b ${darkMode ? "border-slate-800" : "border-gray-100"}`}>
              <h3 className="font-black text-2xl flex items-center gap-3">
                <span className="bg-gray-100 dark:bg-slate-800 w-12 h-12 flex items-center justify-center rounded-full">🛒</span> 
                سلة المشتريات
              </h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-red-500 bg-gray-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {cart.length === 0 ? (
                <div className="text-center text-gray-500 py-16 flex flex-col items-center">
                  <span className="text-7xl mb-6 opacity-30">🪹</span>
                  <p className="text-xl font-bold mb-2">سلتك فارغة تماماً!</p>
                  <p className="text-sm">لم تقم بإضافة أي منتجات حتى الآن.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                      darkMode ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800" : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                    }`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm" />
                      <div className="flex-1">
                        <h4 className="font-bold mb-1 line-clamp-1">{item.name}</h4>
                        <p className="text-green-600 dark:text-green-400 font-black">{item.price} ج.م</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 p-2.5 rounded-xl transition-colors"
                        title="حذف من السلة"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className={`p-6 md:p-8 border-t bg-gray-50 dark:bg-slate-800/50 rounded-b-[2rem] ${
                darkMode ? "border-slate-800" : "border-gray-200"
              }`}>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-500">الإجمالي:</span>
                  <span className="font-black text-3xl">{total} <span className="text-lg text-gray-500">ج.م</span></span>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 shadow-lg shadow-green-600/30 text-lg"
                >
                  إتمام الطلب عبر واتساب 💬
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* المودال: المفضلة */}
      {favoritesOpen && (
        <div 
          onClick={() => setFavoritesOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`w-full md:w-[480px] max-h-[85vh] flex flex-col rounded-t-[2rem] md:rounded-[2rem] shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300 cursor-default border ${
              darkMode ? "bg-slate-900 text-white border-slate-800" : "bg-white text-gray-900 border-gray-100"
            }`}
          >
            <div className={`flex justify-between items-center p-6 md:p-8 border-b ${darkMode ? "border-slate-800" : "border-gray-100"}`}>
              <h3 className="font-black text-2xl flex items-center gap-3">
                <span className="bg-red-50 text-red-500 dark:bg-slate-800 w-12 h-12 flex items-center justify-center rounded-full">❤️</span> 
                المنتجات المفضلة
              </h3>
              <button onClick={() => setFavoritesOpen(false)} className="text-gray-400 hover:text-red-500 bg-gray-50 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8">
              {favoriteItems.length === 0 ? (
                <div className="text-center text-gray-500 py-16 flex flex-col items-center">
                  <span className="text-7xl mb-6 opacity-30">💔</span>
                  <p className="text-xl font-bold mb-2">قائمة المفضلة فارغة!</p>
                  <p className="text-sm">تصفح المنتجات وأضف ما يعجبك هنا للرجوع إليه لاحقاً.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {favoriteItems.map((item, index) => (
                    <div key={index} className={`flex items-center gap-4 p-4 rounded-2xl border transition-colors ${
                      darkMode ? "bg-slate-800/50 border-slate-700 hover:bg-slate-800" : "bg-gray-50 border-gray-100 hover:bg-gray-100"
                    }`}>
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl shadow-sm cursor-pointer" onClick={() => setSelectedProduct(item as Product)} />
                      <div className="flex-1">
                        <h4 className="font-bold mb-1 line-clamp-1 cursor-pointer" onClick={() => setSelectedProduct(item as Product)}>{item.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 font-bold">{item.price} ج.م</p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-gray-900 text-white dark:bg-green-600 p-2.5 rounded-lg hover:bg-black transition-colors"
                          title="أضف للسلة"
                        >
                          🛒
                        </button>
                        <button 
                          onClick={() => toggleFavorite(item.id, item.name)}
                          className="text-red-500 bg-red-50 dark:bg-slate-700 dark:hover:bg-slate-600 p-2.5 rounded-lg hover:bg-red-100 transition-colors"
                          title="حذف من المفضلة"
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

      {/* الفوتر العالمي (Mega Footer) */}
      <footer className={`pt-20 pb-10 px-6 border-t ${darkMode ? "bg-slate-950 border-slate-800 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-600"}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* العمود الأول */}
          <div>
            <h1 className="text-2xl font-extrabold mb-6 text-gray-900 dark:
            
