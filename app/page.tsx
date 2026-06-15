"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

export default function Home() {
  // تحديث رقم الواتساب الجديد بدون مسافات أو علامة + ليعمل الرابط بشكل صحيح
  const whatsappNumber = "201287254329";

  const offers: Product[] = [
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

  const products: Product[] = [
    {
      id: 4,
      name: "قميص أبيض أوكسفورد",
      price: 499,
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      description: "قميص كلاسيكي أبيض بخامة الأوكسفورد الثقيلة والمقاومة للتجعد، قطعة أساسية في دولابك.",
    },
    {
      id: 5,
      name: "هودي أوفرسايز عصري",
      price: 799,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=600&q=80",
      description: "هودي مريح جداً بقصة فضفاضة (Oversized) مبطن من الداخل ليوفر لك الدفء والراحة.",
    },
    {
      id: 6,
      name: "جاكيت جلد بريميوم",
      price: 1499,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
      description: "جاكيت جلد كاجوال بتصميم راكب الدراجات (Biker)، متين ويمنحك هيبة وأناقة لا مثيل لها.",
    },
    {
      id: 7,
      name: "تيشرت بيزك قطن صافي",
      price: 249,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      description: "تيشرت قطني 100% ناعم على البشرة، متوفر بجميع المقاسات وممتاز لتنسيقه تحت الجواكيت.",
    },
    {
      id: 8,
      name: "بنطلون تشينو كلاسيك",
      price: 549,
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=600&q=80",
      description: "بنطلون مريح بخامة قطنية متينة وقصة سليم فيت، يجمع بين راحة الكاجوال وأناقة الكلاسيك.",
    },
    {
      id: 9,
      name: "حذاء سنيكرز أبيض فاخر",
      price: 899,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
      description: "حذاء رياضي خفيف الوزن بنعل مريح جداً للمشي الطويل، يتماشى مع جينات ملابسك الكاجوال.",
    },
  ];

  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (item: Product) => {
    setCart((prev) => [...prev, item]);
    setToastMessage(`تمت إضافة "${item.name}" إلى السلة بنجاح! 🛒`);
    
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // تحديث اسم المتجر في نص رسالة الواتساب المرسلة
  const orderText = encodeURIComponent(
    cart.length
      ? `طلب جديد من متجر 3l_nagar Clothing\n\n${cart
          .map((item, i) => `${i + 1}- ${item.name} | ${item.price} جنيه`)
          .join("\n")}\n\nالإجمالي: ${total} جنيه`
      : "أرغب بالاستفسار عن المنتجات"
  );

  return (
    <main dir="rtl" className="min-h-screen bg-slate-50 text-gray-900 font-sans pb-20">
      
      {/* إشعار الإضافة للسلة */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[110] bg-green-600 text-white px-6 py-3 rounded-full shadow-lg transition-all animate-bounce text-sm md:text-base whitespace-nowrap">
          {toastMessage}
        </div>
      )}

      {/* الهيدر باسم المتجر الجديد */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-md z-40 border-b shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
            3l_nagar <span className="text-green-600">Clothing</span>
          </h1>

          <nav className="hidden md:flex gap-8 font-medium text-gray-600">
            <a href="#" className="hover:text-black transition">الرئيسية</a>
            <a href="#offers" className="hover:text-black transition">العروض</a>
            <a href="#products" className="hover:text-black transition">المنتجات</a>
            <a href="#contact" className="hover:text-black transition">تواصل معنا</a>
          </nav>
        </div>
      </header>

      {/* القسم الترحيبي (Hero Section) */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="text-right">
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              ارتقِ بأناقتك مع <br /> 3l_nagar
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              اكتشف تشكيلتنا الجديدة والحصرية من الملابس الرجالية العصرية والكلاسيكية، المصممة بأعلى جودة لتمنحك المظهر الذي تستحقه.
            </p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-full transition-colors shadow-md hover:shadow-lg"
            >
              تواصل عبر واتساب لشراء مخصص
            </a>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=800&q=80"
              alt="3l_nagar Luxury Fashion"
              className="rounded-3xl shadow-2xl w-full object-cover h-[550px]"
            />
          </div>
        </div>
      </section>

      {/* قسم العروض */}
      <section id="offers" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <span className="text-3xl">🔥</span>
            <h3 className="text-3xl font-extrabold text-gray-900">أقوى العروض الحالية</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {offers.map((offer) => (
              <div key={offer.id} className="group bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative cursor-pointer overflow-hidden" onClick={() => setSelectedProduct(offer)}>
                  <img
                    src={offer.image}
                    alt={offer.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">عرض التفاصيل والوصف</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl mb-1 text-gray-900">{offer.name}</h4>
                  <p className="text-green-600 font-extrabold text-lg mb-5">{offer.price} جنيه</p>
                  <button
                    onClick={() => addToCart(offer)}
                    className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 rounded-xl transition-all active:scale-95"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم المنتجات */}
      <section id="products" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-12 text-center md:text-right">كل المنتجات الرجالية</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-slate-50 border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative cursor-pointer overflow-hidden" onClick={() => setSelectedProduct(product)}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">عرض التفاصيل والوصف</span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl mb-1 text-gray-900">{product.name}</h4>
                  <p className="text-green-600 font-extrabold text-lg mb-5">{product.price} جنيه</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gray-900 hover:bg-black text-white font-medium py-3 rounded-xl transition-all active:scale-95"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* قسم التواصل */}
      <section id="contact" className="py-20 px-6 text-center bg-gray-900 text-white rounded-t-[3rem] mt-10">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold mb-6">هل تبحث عن ستايل مخصص؟</h3>
          <p className="text-gray-300 mb-10 text-lg">
            فريق خدمة العملاء جاهز لخدمتك ومساعدتك في اختيار مقاسك المناسب وتأكيد طلبك عبر واتساب مباشرة.
          </p>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-full inline-flex items-center gap-2 transition-transform hover:scale-105 shadow-lg"
          >
            <span>💬</span> تحدث معنا الآن
          </a>
        </div>
      </section>

      {/* زر السلة العائم */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gray-900 hover:bg-black text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center text-2xl transition-transform hover:scale-105"
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

      {/* مودال تفاصيل المنتج */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[120] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-900 w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition z-10 font-bold"
            >
              ✕
            </button>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-80 object-cover" />
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedProduct.name}</h3>
              <p className="text-green-600 font-extrabold text-xl mb-4">{selectedProduct.price} جنيه</p>
              <div className="bg-slate-50 p-4 rounded-xl border mb-6 text-gray-600 leading-relaxed text-sm md:text-base">
                {selectedProduct.description}
              </div>
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 rounded-xl transition-transform active:scale-95 text-lg"
              >
                أضف للسلة الآن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* نافذة السلة */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-end md:items-center justify-center">
          <div className="bg-white w-full md:w-[450px] max-h-[85vh] flex flex-col rounded-t-[2rem] md:rounded-3xl shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-0 md:zoom-in-95 duration-300">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="font-extrabold text-xl flex items-center gap-2">
                <span>🛒</span> سلة المشتريات
              </h3>
              <button onClick={() => setCartOpen(false)} className="text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4 opacity-50">🛍️</div>
                  <p className="text-gray-500 font-medium">سلتك فارغة حالياً</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item, index) => (
                    <div key={index} className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                        <div>
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-green-600 font-semibold">{item.price} جنيه</p>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(index)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition">
                        حذف
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t bg-slate-50 rounded-b-3xl">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-500 font-medium">الإجمالي</span>
                  <span className="font-extrabold text-2xl text-gray-900">{total} جنيه</span>
                </div>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all"
                >
                  <span>إتمام الطلب عبر واتساب</span>
                  <span>📱</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* الفوتر باسم المتجر الجديد */}
      <footer className="bg-white border-t text-center py-8 text-gray-500">
        <p className="mb-2">© {new Date().getFullYear()} جميع الحقوق محفوظة لمتجر 3l_nagar</p>
        <p className="text-sm font-medium">تم التطوير بواسطة محمد العريني</p>
      </footer>

    </main>
  );
}

