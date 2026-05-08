"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// import "swiper/css";
// import "swiper/css/pagination";

import Image from "next/image";

const HeroCarousal = () => {
  return (
    <Swiper
      spaceBetween={0}
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="w-full hero-carousel"
    >

      {/* SLIDE 1 */}
      <SwiperSlide>
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">

          <Image
            src="/images/hero/2 (1).jpg"
            alt="banner 1"
            fill
            className="object-cover"
            priority
          />

        </div>
      </SwiperSlide>

      {/* SLIDE 2 */}
      <SwiperSlide>
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">

          <Image
            src="/images/hero/1 (2).jpg"
            alt="banner 2"
            fill
            className="object-cover"
          />

        </div>
      </SwiperSlide>
      {/* SLIDE 3 */}
      <SwiperSlide>
        <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] relative">

          <Image
            src="/images/hero/2 (2).jpg"
            alt="banner 2"
            fill
            className="object-cover"
          />

        </div>
      </SwiperSlide>

    </Swiper>
  );
};

export default HeroCarousal;