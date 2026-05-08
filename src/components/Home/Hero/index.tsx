
import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";

const Hero = () => {
  return (
     <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-57.5 sm:pt-45 lg:pt-30 xl:pt-50.5 bg-[#E5EAF4]">

      {/* FULL WIDTH CONTAINER */}
      <div className="w-full">

        <div className="flex flex-wrap">

          {/* HERO CAROUSEL (FULL WIDTH BLOCK) */}
          <div className="w-full">
            <div className="relative z-10 bg-white overflow-hidden">

              {/* background shapes */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-10"
                width={534}
                height={520}
              />

              <HeroCarousel />
            </div>
          </div>

        </div>
      </div>

      {/* Hero features stays centered if needed */}
      <div className="w-full">
        <HeroFeature />
      </div>

    </section>
  );
};

export default Hero;

