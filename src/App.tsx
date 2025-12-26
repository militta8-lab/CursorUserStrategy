import { Header } from './components/Header/Header';
import { Hero } from './components/Hero/Hero';
import { About } from './components/About/About';
import { HowItWorks } from './components/HowItWorks/HowItWorks';
import { Tokenomics } from './components/Tokenomics/Tokenomics';
import { Features } from './components/Features/Features';
import { NFTShowcase } from './components/NFTShowcase/NFTShowcase';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <HowItWorks />
      <Tokenomics />
      <Features />
      <NFTShowcase />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
