import React from 'react';
import Hero from '../components/home/Hero';
import About from '../components/home/About';
import FeaturedProjects from '../components/home/FeaturedProjects';
import CuriosityMap from '../components/curiosity-map/CuriosityMap';
import Skills from '../components/home/Skills';
import EducationAchievements from '../components/home/EducationAchievements';
import Contact from '../components/home/Contact';
import './HomePage.css';

export default function HomePage() {
  return (
    <main className="home-page" id="top">
      {/* Hero Section */}
      <Hero />

      {/* 01 / About Section */}
      <About />

      {/* 02 / Featured Projects */}
      <FeaturedProjects />

      {/* 03 / Signature Feature: Interactive Curiosity Map */}
      <CuriosityMap />

      {/* 04 / Skills Section */}
      <Skills />

      {/* 05 / Education & Academic History */}
      <EducationAchievements />

      {/* 06 / Contact Section */}
      <Contact />
    </main>
  );
}
