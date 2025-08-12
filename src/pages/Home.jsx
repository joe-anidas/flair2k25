import React from 'react';
import Hero from '../components/Hero';
import Events from '../components/Events';
import Sponsors from '../components/Sponsors';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar3';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Events />
      {/* <Sponsors /> */}
      <Contact />
    </div>
   );
 };
 

export default Home;
