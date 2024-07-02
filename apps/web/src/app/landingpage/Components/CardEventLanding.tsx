import Image from 'next/image';
import React from 'react';

const CardEventLanding = () => {
  return (
    <section>
      <div className="min-w-full min-h-full rounded-3xl overflow-hidden shadow-lg bg-milk group transform cursor-pointer  border  transition-colors duration-300 hover:border-transparent hover:bg-orangee">
        <div className="flex justify-between px-6 py-4">
          <div className="font-semibold">
            <p>20 februari</p>
            <p>price: IDR 10</p>
          </div>
          <div className=" pt-2">
            <div className=" justify-items-center font-semibold bg-black text-white rounded-full text-sm group-hover:bg-black group-hover:text-white">
              <h3 className="py-2 px-6">theater</h3>
            </div>
          </div>
        </div>
        <div className="container w-full h-[200px] relative ">
          <Image
            className="object-cover px-6 rounded-[40px] "
            src="/img1.jpg"
            alt="Sunset in the mountains"
            fill
          />
        </div>
        <div className="px-6 py-4 pt-14">
          <div className="font-bold font-mono text-4xl mb-2">
            The Coldestasdas Sunset
          </div>
          <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet,</p>
        </div>
      </div>
    </section>
  );
};

export default CardEventLanding;
