import { Caveat } from "next/font/google";

/** Handwritten accent font, used only for small notes on the Contact page. */
export const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "700"],
});
