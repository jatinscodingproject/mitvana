import "@assets/scss/bootstrap.scss";
import "../assets/scss/app.scss";
import "@assets/icons/font-icon.css";
import "../styles/globals.css";
import { Afacad, Work_Sans } from "next/font/google";
import { ProductProvider } from "@src/context/ProductContext";
import WhatsappButton from "@src/components/WhatsappButton";
import { CartWishlistProvider } from "@src/context/CartWishlistContext";
import { useEffect } from "react";
import { useCartStore } from "@src/store/cartStore";
import { getItem } from "@src/api/localStorage";

export const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const afacad = Afacad({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function App({ Component, pageProps }) {
  const { setCartItem } = useCartStore();

  useEffect(() => {
    setCartItem( getItem("cartItem"));
  }, []);

  return (
    <main className={`${workSans.className}`}>
      <CartWishlistProvider>
        <ProductProvider>
          <Component {...pageProps} />
          <WhatsappButton />
        </ProductProvider>
      </CartWishlistProvider>
    </main>
  );
}
