import type { Metadata } from "next";
import "./globals.css";
import BootLoader from "@/components/BootLoader";
import Confetti from "@/components/Confetti";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Vicky Jen — Product Designer",
  description:
    "Vicky Jen is a product designer based in Los Angeles, currently designing for collectors @ Arena Club.",
  icons: { icon: "/assets/folder.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* the cover is a sibling of the page, so the page can fade up
            underneath it as it lifts */}
        <div id="app">{children}</div>
        <BootLoader />
        <Confetti />
        <ScrollReveal />
      </body>
    </html>
  );
}
