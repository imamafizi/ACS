'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const EventShowcase = () => {
  const slides = [
    {
      image: '/exhibition.jpeg',
      title: 'PERFORMING & VISUAL ARTS',
      description: 'More than 20,000 events',
      description2: 'Finally, all your events in one place.',
    },
    {
      image: '/exhibition2.jpeg',
      title: 'CINEMA & THEATRES',
      description: 'More than 72,000 events',
      description2: 'Finally, all your events in one place.',
    },
    {
      image: '/exhibition3.jpeg',
      title: 'FESTIVALS',
      description:
        'Discover the best Indo Festivals in 2024! From Music, Food, Arts & Comedy, Festival Finder offers tickets for music festivals.',
      description2: 'Finally, all your events in one place.',
    },
  ];

  return (
    <div
      className="w-1/2 relative  "
      style={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={false}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative">
              <Image
                src={slide.image}
                alt={slide.title}
                width={1000}
                height={200}
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <div className="absolute inset-0 flex flex-col text-white p-10">
                <h1 className="text-5xl font-bold mt-32 mb-4">{slide.title}</h1>
                <p className="text-xl mt-2 mb-96">{slide.description}</p>
                <p className="text-lg">{slide.description2}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EventShowcase;
