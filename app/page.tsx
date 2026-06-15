"use client";

import { useState, useEffect } from "react";

// --- التعريفات ---
type Category = "shirts" | "hoodies" | "jackets" | "pants" | "shoes" | "accessories";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: Category;
};

type CartItem = Product & { quantity: number };

// --- قائمة المنتجات كاملة ---
const products: Product[] = [
  // Shirts (100s)
  { id: 101, name: "قميص أبيض أوكسفورد", price: 499, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c", description: "قميص كلاسيكي أبيض", category: "shirts" },
  { id: 102, name: "تيشرت بيزك قطن", price: 249, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518", description: "تيشرت قطني 100%", category: "shirts" },
  { id: 103, name: "قميص جينز كاجوال", price: 599, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10", description: "قميص دنيم عصري", category: "shirts" },
  { id: 104, name: "قميص كتان بيج", price: 520, image: "https://images.unsplash.com/photo-1603252109303-2751441dd157", description: "كتان طبيعي صيفي", category: "shirts" },
  { id: 105, name: "تيشرت بولو أسود", price: 380, image: "https://images.unsplash.com/photo-1626497764746-6dc36546b388", description: "بولو بياقة مقواة", category: "shirts" },
  { id: 106, name: "قميص مقلم كاجوال", price: 480, image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf", description: "مقلم بخطوط طولية", category: "shirts" },
  { id: 107, name: "تيشرت جرافيك", price: 299, image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c", description: "طباعة ديجيتال", category: "shirts" },
  { id: 108, name: "قميص زيتي سليم", price: 460, image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99", description: "قصة مجسمة", category: "shirts" },
  { id: 109, name: "تيشرت أوفرسايز", price: 340, image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a", description: "تصميم فضفاض", category: "shirts" },
  { id: 110, name: "قميص كاروهات", price: 499, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f", description: "كاروهات كلاسيكي", category: "shirts" },

  // Hoodies (200s)
  { id: 201, name: "هودي أوفرسايز", price: 799, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7", description: "بطانة ناعمة", category: "hoodies" },
  { id: 202, name: "سويت شيرت نيفي", price: 499, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633", description: "كلاسيكي كحلي", category: "hoodies" },
  { id: 203, name: "هودي بسحاب", price: 850, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27", description: "بسحاب وجيوب", category: "hoodies" },
  { id: 204, name: "بلوفر تريكو", price: 690, image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c", description: "صوف ناعم", category: "hoodies" },
  { id: 205, name: "سويت شيرت مطبوع", price: 550, image: "https://images.unsplash.com/photo-1519985176271-adb1088fa94c", description: "تصميم شبابي", category: "hoodies" },
  { id: 206, name: "هودي باستيل", price: 749, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990", description: "ألوان مريحة", category: "hoodies" },
  { id: 207, name: "سويت شيرت رياضي", price: 480, image: "https://images.unsplash.com/photo-1517462964-21fdcec3f25b", description: "خفيف الوزن", category: "hoodies" },

  // Jackets (300s)
  { id: 301, name: "جاكيت جلد", price: 1499, image: "https://images.unsplash.com/photo-1551028719-00167b16eac5", description: "جلد بريميوم", category: "jackets" },
  { id: 302, name: "جاكيت جينز ممزق", price: 799, image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4", description: "دنيم أزرق", category: "jackets" },
  { id: 303, name: "بالطو صوف", price: 2400, image: "https://images.unsplash.com/photo-1544441893-675973e31985", description: "شتوي فاخر", category: "jackets" },
  { id: 304, name: "جاكيت بامب", price: 1100, image: "https://images.unsplash.com/photo-1548883354-7622d03aca27", description: "عازل للمياه", category: "jackets" },
  { id: 305, name: "جاكيت بومبر", price: 899, image: "https://images.unsplash.com/photo-1617137968427-85924c800a22", description: "أطراف مطاطية", category: "jackets" },
  { id: 306, name: "جاكيت وندبريكر", price: 650, image: "https://images.unsplash.com/photo-1483985988355-763728e1935b", description: "رياضي خفيف", category: "jackets" },
  { id: 307, name: "جاكيت جباردين", price: 950, image: "https://images.unsplash.com/photo-1578932750294-f5075e85f44a", description: "سفاري متين", category: "jackets" },
  { id: 308, name: "بليزر كاجوال", price: 1350, image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf", description: "تفصيلة ناعمة", category: "jackets" },

  // Pants (400s)
  { id: 401, name: "بنطلون تشينو", price: 549, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80", description: "خامة قطنية", category: "pants" },
  { id: 402, name: "جينز أزرق غامق", price: 499, image: "https://images.unsplash.com/photo-1542272604-787c3835535d", description: "قصة مريحة", category: "pants" },
  { id: 403, name: "جينز أسود ليكرا", price: 520, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246", description: "خامة مرنة", category: "pants" },
  { id: 404, name: "بنطلون كارغو", price: 599, image: "https://images.unsplash.com/photo-1517423568366-8b83523034fd", description: "جيوب جانبية", category: "pants" },
  { id: 405, name: "جوجر قطن", price: 399, image: "https://images.unsplash.com/photo-1551854838-212c50b4c184", description: "رياضي", category: "pants" },
  { id: 406, name: "شورت صيفي", price: 299, image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b", description: "خفيف الوزن", category: "pants" },
  { id: 407, name: "بنطلون رسمي", price: 580, image: "https://images.unsplash.com/photo-1604176354204-9268737828e4", description: "للمناسبات", category: "pants" },
  { id: 408, name: "جينز ثلجي", price: 540, image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901", description: "لون فاتح", category: "pants" },

  // Shoes (500s)
  { id: 501, name: "سنيكرز أبيض", price: 899, image: "https://images.unsplash.com/photo-1549298916-b41d501d3772", description: "مريح للمشي", category: "shoes" },
  { id: 502, name: "حذاء كلاسيك", price: 1100, image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509", description: "أوكسفورد", category: "shoes" },
  { id: 503, name: "هاف بوت", price: 950, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2", description: "شمواه هافان", category: "shoes" },
  { id: 504, name: "سنيكرز رمادي", price: 699, image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2", description: "كوتشي كاجوال", category: "shoes" },
  { id: 505, name: "حذاء لوفرز", price: 850, image: "https://images.unsplash.com/photo-1539185441755-769473a23570", description: "سهل الارتداء", category: "shoes" },
  { id: 506, name: "بوت جلدي", price: 1390, image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0", description: "مبطن للشتاء", category: "shoes" },
  { id: 507, name: "سليبر منزلي", price: 250, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2", description: "مريح للمنزل", category: "shoes" },

  // Accessories (600s)
  { id: 601, name: "ساعة كوارتز", price: 1200, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", description: "كلاسيكية", category: "accessories" },
  { id: 602, name: "نظارة شمسية", price: 450, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083", description: "حماية", category: "accessories" },
  { id: 603, name: "حزام جلد", price: 299, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80", description: "جلد طبيعي", category: "accessories" },
  { id: 604, name: "كاب رياضي", price: 180, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b", description: "قطني", category: "accessories" },
  { id: 605, name: "محفظة كروت", price: 220, image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3", description: "نحيفة", category: "accessories" },
  { id: 606, name: "برفان رجالي", price: 850, image: "https://images.unsplash.com/photo-1541643600914-78b084683601", description: "عطر فواح", category: "accessories" },
  { id: 607, name: "طقم جوارب", price: 150, image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990", description: "قطنية", category: "accessories" },
  { id: 608, name: "سوار جلدي", price: 130, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338", description: "شبابي", category: "accessories" },
  { id: 609, name: "شنطة كروس", price: 390, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62", description: "للمتعلقات", category: "accessories" },
  { id: 610, name: "ساعة رقمية", price: 550, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", description: "رياضية", category: "accessories" }
];

// --- المكون ---
export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="p-8" dir="rtl">
      <h1 className="text-2xl font-bold mb-6">متجر نجار</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <div key={p.id} className="border p-4 rounded-xl shadow-sm">
            <img src={p.image} alt={p.name} className="w-full h-40 object-cover rounded mb-2" />
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{p.description}</p>
            <p className="font-bold text-green-600 mb-2">{p.price} ج.م</p>
            <button className="w-full bg-black text-white py-2 rounded">أضف للسلة</button>
          </div>
        ))}
      </div>
    </div>
  );
}
