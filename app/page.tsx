"use client";

import { useState } from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Home() {
  const whatsappNumber = "201229466261";

  const offers: Product[] = [
    {
      id: 1,
      name: "عرض الصيف",
      price: 299,
      image: "https://files.catbox.moe/65eo50.jpg",
    },
    {
      id: 2,
      name: "خصم خاص",
      price: 399,
      image: "https://files.catbox.moe/65eo50.jpg",
    },
    {
      id: 3,
      name: "عرض محدود",
      price: 499,
      image: "https://files.catbox.moe/65eo50.jpg",
    },
  ];

  const products: Product[] = [
    {
      id: 4,
      name: "قميص أبيض",
      price: 499,
      image: "https://files.catbox.moe/65eo50.jpg",
    },
    {
      id: 5,
      name: "هودي عصري",
      price: 799,
      image: "https://files.catbox.moe/6fk2qs.jpg",
    },
    {
      id: 6,
      name: "جاكيت كاجوال",
      price: 999,
      image: "https://files.catbox.moe/xypusl.jpg",
    },
  ];

  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: Product) => {
    setCart((prev) => [...prev, item]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const orderText = encodeURIComponent(
    cart.length
      ? `طلب جديد من متجر Al-Areeni Clothing\n\n${cart
          .map(
            (item, i) =>
              `${i + 1}- ${item.name} | ${item.price} جنيه`
          )
          .join("\n")}\n\nالإجمالي: ${total} جنيه`
      : "أرغب بالاستفسار عن المنتجات"
  );

  return (
    <main className="min-h-screen bg-white text-gray-900">

      <header className="sticky top-0 bg-white z-50 border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl md:text-2xl font-bold">
            Al-Areeni Clothing
          </h1>

          <nav className="hidden md:flex gap-6">
            <a href="#">الرئيسية</a>
            <a href="#offers">العروض</a>
            <a href="#products">المنتجات</a>
            <a href="#contact">تواصل</a>
          </nav>
        </div>
      </header>

      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div className="text-center md:text-right">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              ارتقِ بأناقتك مع Al-Areeni
            </h2>

            <p className="text-gray-600 mb-8">
              متجر متخصص في الملابس الرجالية العصرية والكلاسيكية
              بأفضل جودة وأسعار مميزة.
            </p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl"
            >
              تواصل عبر واتساب
            </a>
          </div>

          <div>
            <img
              src="https://files.catbox.moe/yoyi7i.jpg"
              alt="Al Areeni"
              className="rounded-3xl shadow-lg w-full"
            />
          </div>

        </div>
      </section>

      {/* العروض */}
      <section id="offers" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            🔥 العروض الحالية
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <div
                key={offer.id}
                className="border rounded-2xl overflow-hidden bg-white hover:shadow-lg transition"
              >
                <img
                  src={offer.image}
                  alt={offer.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-4 text-center">
                  <h4 className="font-bold text-lg mb-2">
                    {offer.name}
                  </h4>

                  <p className="text-green-600 font-bold mb-4">
                    {offer.price} جنيه
                  </p>

                  <button
                    onClick={() => addToCart(offer)}
                    className="w-full bg-black text-white py-2 rounded-xl transition-transform active:scale-95"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* المنتجات */}
      <section id="products" className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            المنتجات الرجالية
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-2xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />

                <div className="p-4 text-center">
                  <h4 className="font-bold text-lg mb-2">
                    {product.name}
                  </h4>

                  <p className="text-green-600 font-bold mb-4">
                    {product.price} جنيه
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white py-2 rounded-xl transition-transform active:scale-95"
                  >
                    أضف للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* التواصل */}
      <section id="contact" className="py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-4">
          تواصل معنا
        </h3>

        <p className="text-gray-600 mb-8">
          لأي استفسار أو طلب خاص تواصل معنا عبر واتساب
        </p>

        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-8 py-3 rounded-xl inline-block"
        >
          فتح واتساب
        </a>
      </section>

      {/* زر السلة */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-black text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl"
      >
        🛒
      </button>

      {/* نافذة السلة */}
      {cartOpen && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-end md:items-center justify-center">

          <div className="bg-white w-full md:w-[450px] max-h-[85vh] overflow-auto rounded-t-3xl md:rounded-3xl p-5 shadow-2xl">

            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">🛒 سلة المشتريات</h3>

              <button
                onClick={() => setCartOpen(false)}
                className="text-red-500 text-2xl"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                لا توجد منتجات في السلة
              </p>
            ) : (
              <>
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b py-3"
                  >
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-green-600">{item.price} جنيه</p>
                    </div>

                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500"
                    >
                      حذف
                    </button>
                  </div>
                ))}

                <div className="mt-5">
                  <p className="font-bold text-lg mb-4">
                    الإجمالي: {total} جنيه
                  </p>

                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${orderText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center bg-green-600 text-white py-3 rounded-xl"
                  >
                    إتمام الطلب عبر واتساب
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <footer className="border-t text-center py-6 text-gray-500">
        © {new Date().getFullYear()} جميع الحقوق محفوظة
        <br />
        محمد العريني
      </footer>

    </main>
  );
}
