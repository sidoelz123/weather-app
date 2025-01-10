import { Fira_Mono } from "next/font/google";
import "./globals.css";

const firaMono = Fira_Mono({
  weight: ['400', '500', '700'],
  subsets: ["latin"],
  variable: '--font-fira-mono',
});

export const metadata = {
  title: "Weather App",
  description: "Weather App by nextjs ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${firaMono.variable} font-firamono`}
      >
        {children}
      </body>
    </html>
  );
}
