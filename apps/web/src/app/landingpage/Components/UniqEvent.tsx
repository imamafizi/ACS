import React from 'react';
import CardEventUniq from './CardEventUniq';

const UniqEvent = () => {
  return (
    <section>
      <div className="container  bg-milk pb-10">
        <div className="px-44">
          <h1 className="text-5xl py-10 font-mono font-semibold">
            RECENTLY ADDED
          </h1>
          <div className=" grid grid-cols-3 gap-2 ">
            <div className=" ">
              <CardEventUniq />
            </div>
            <div className=" ">
              <CardEventUniq />
            </div>
            <div className=" ">
              <CardEventUniq />
            </div>
            <div className=" ">
              <CardEventUniq />
            </div>
            <div className=" ">
              <CardEventUniq />
            </div>
            <div className=" ">
              <CardEventUniq />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UniqEvent;
