"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import data from "./categoryData";
import SingleItem from "./SingleItem";


const Categories = () => {
  const swiperRef = useRef<any>(null);

  return (
   <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-20 border-b border-gray-3">

        {/* Header */}
        <div className="mb-10 flex items-center justify-between">

          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              {/* Icon */}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3.94 13.44L1.76 10.68..."
                  stroke="#3C50E0"
                  strokeWidth="1.5"
                />
              </svg>

             Our Services
            </span>

           
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">

            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
            >
              ←
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 flex items-center justify-center rounded-full border hover:bg-gray-100 transition"
            >
              →
            </button>

          </div>
        </div>

        {/* Swiper */}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          spaceBetween={16}
          breakpoints={{
            0: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 3,
            },
            1000: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 6,
            },
          }}
        >
          {data.map((item, key) => (
            <SwiperSlide key={key}>
              <SingleItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default Categories;