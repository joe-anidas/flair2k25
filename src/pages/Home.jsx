import React from 'react';
import Hero from '../components/Hero';
import Events from '../components/Events';
import About from '../components/About';
import Contact from '../components/Contact';
import Navbar from '../components/Navbar';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Events />
      <About />
      <Contact />
    </div>
   );
 };
 

export default Home;
