import SEO from './components/SEO';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import Studio from './components/Studio';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Reusable Programmatic Technical SEO Engine */}
      <SEO />

      {/* Sticky Glassmorphic Navigation blur layer */}
      <Navbar />

      {/* Full-Bleed Background Video Hero Section */}
      <Hero />

      {/* Main Structural Semantic content */}
      <main>
        
        {/* Unified Segmented Staggered Portfolio Gallery */}
        <section id="gallery-container">
          <Gallery />
        </section>

        {/* Dynamic Studio View and Team Details modal */}
        <section id="studio-container">
          <Studio />
        </section>

        {/* Lead Gen contact form & WhatsApp redirect loop */}
        <section id="contact-container">
          <Contact />
        </section>

      </main>

      {/* Semantic Footer detailing business credentials */}
      <Footer />
    </>
  );
}
