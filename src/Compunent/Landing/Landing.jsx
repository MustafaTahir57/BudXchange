import React from "react";
import Navbar from '../Navbar/Navbar'
import Budcoin from '../Budcoin/Budcoin'
import About from '../About/About'
import Holder from '../Holder/Holder'
import Marketplace from '../Marketplace/Marketplace'
import Work from '../Work/Work'
import FAQ from '../FAQ/FAQ'
import Footer from '../Footer/Footer'
function Landing() {
  return (
    <div>
      <Navbar/>
      <Budcoin />
      <Work />
      <Holder />
      <Marketplace />
      <FAQ />
      <About />
      <Footer />
      
    </div>
  );
}

export default Landing;
