"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
import SingleItem from "./SingleItem";
import serviceImages from "./serviceImages";
import { useServices } from "@/components/Booking/ServicePackage/hooks/useServices";


const Categories = () => {

  const swiperRef = useRef<any>(null);


  const {
    services,
    loading,
    error
  } = useServices();



  if (loading) {
    return (
      <section className="py-20 text-center">
        Loading services...
      </section>
    );
  }



  if (error) {
    return (
      <section className="py-20 text-center text-red-500">
        {error}
      </section>
    );
  }



  const serviceList = services.map((item:any)=>{


    const image = serviceImages.find(
      img => img.slug === item.service.slug
    );



    return {

      id: item.id,

      title: item.service.name,


      img:
        image?.img ??
        "/images/services/default.jpg",


      service: item.service,


      prices: item.prices,

      participants_per_resource:
        item.participants_per_resource,


      service_type:
        item.service.service_type,


      access_control_type:
        item.service.access_control_type,


      description:
        item.service.description,


    };

  });




  return (
    <section className="overflow-hidden py-20">

      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-20 border-b">



        <div className="mb-10 flex items-center justify-between">


          <div>

            <span className="flex items-center gap-2.5 font-medium text-dark">

              Our Services

            </span>


          </div>




          <div className="flex gap-3">


            <button
              onClick={() =>
                swiperRef.current?.slidePrev()
              }
              className="w-10 h-10 rounded-full border"
            >
              ←
            </button>



            <button
              onClick={() =>
                swiperRef.current?.slideNext()
              }
              className="w-10 h-10 rounded-full border"
            >
              →
            </button>


          </div>


        </div>





        <Swiper

          onSwiper={(swiper)=>{
            swiperRef.current = swiper;
          }}


          spaceBetween={16}


          breakpoints={{

            0:{
              slidesPerView:2,
            },


            640:{
              slidesPerView:3,
            },


            1000:{
              slidesPerView:4,
            },


            1200:{
              slidesPerView:6,
            }

          }}

        >


          {
            serviceList.map((item)=>(

              <SwiperSlide key={item.id}>

                <SingleItem item={item}/>

              </SwiperSlide>

            ))
          }


        </Swiper>



      </div>


    </section>
  );
};


export default Categories;