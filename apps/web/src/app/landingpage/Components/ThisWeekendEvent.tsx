import React from 'react';
import CardEvent from './CardEvent';
import CardEventLanding from './CardEventLanding';

const ThisWeekendEvent = () => {
  return (
    <section>
      <div className="container bg-lightbrown pb-10">
        <div className="px-44">
          <h1 className="text-5xl py-10 font-mono font-semibold">
            THINGS TO DO THIS WEEKEND
          </h1>
          <div className=" grid grid-cols-3 gap-2 ">
            <div className=" col-span-2">
              <CardEventLanding />
            </div>
            <div className=" ">
              <CardEvent />
            </div>
            <div className=" ">
              <CardEvent />
            </div>
            <div className=" ">
              <CardEvent />
            </div>
            <div className=" ">
              <CardEvent />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThisWeekendEvent;
