import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

const quicksand = Quicksand({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "KarlJoke - Free Dad Jokes API | Open Source Joke API",
  description: "A free and open-source API to fetch dad jokes. Get random jokes, filter by category (general, knock-knock, programming). Perfect for your next project.",
  keywords: ["dad jokes", "jokes API", "free API", "open source API", "humor API", "programming jokes", "knock knock jokes"],
  authors: [{ name: "Eklavya Chandra", url: "https://github.com/eklavyadev" }],
  openGraph: {
    title: "KarlJoke - Free Dad Jokes API",
    description: "A free and open-source API to fetch dad jokes. Perfect for your next project.",
    url: "https://karljoke.vercel.app",
    siteName: "KarlJoke",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KarlJoke - Free Dad Jokes API",
    description: "A free and open-source API to fetch dad jokes. Perfect for your next project.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
