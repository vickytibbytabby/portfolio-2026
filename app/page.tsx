import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import TopNav from "@/components/TopNav";
import Works from "@/components/Works";

export default function Home() {
  return (
    <>
      {/* floating pill, centred at the top of the window */}
      <TopNav />
      <main>
        <Hero />
        <Works />
      </main>
      <Contact />
    </>
  );
}
