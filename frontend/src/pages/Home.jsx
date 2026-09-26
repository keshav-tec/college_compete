import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import About from "../components/About.jsx";
import Testimonials from "../components/Testimonials.jsx";
import ContactFooter from "../components/ContactFooter.jsx";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <About />
      <Testimonials />
      <ContactFooter />
    </main>
  );
}