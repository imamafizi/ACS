import React from 'react';
import Hero from './Components/Hero';
import UniqEvent from './Components/UniqEvent';
import CardEvent from './Components/CardEvent';
import ThisWeekendEvent from './Components/ThisWeekendEvent';
import CardEventLanding from './Components/CardEventLanding';

const LandingPage = () => {
  return (
    <div>
      <Hero />
      <ThisWeekendEvent />
      <UniqEvent />
    </div>
  );
};

export default LandingPage;
