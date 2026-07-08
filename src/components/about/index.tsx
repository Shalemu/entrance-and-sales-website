"use client";
import React from "react";
import Breadcrumb from "../Common/Breadcrumb";
import {
  ShieldCheck,
  Users,
  CalendarCheck,
  Sparkles,
  Target,
  HeartHandshake,
} from "lucide-react";

const About = () => {
  return (
    <>
      <Breadcrumb title={"About Us"} pages={["about"]} />

      <section className="overflow-hidden bg-gray-2">
        <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">

          {/* HERO */}
          <div className="
            rounded-3xl
            bg-white
            shadow-1
            p-8
            sm:p-12
            mb-10
          ">
            <div className="max-w-3xl">

              <span className="
                inline-flex
             
                bg-blue-50
                px-4
                py-2
                text-sm
                font-medium
                text-blue-600
              ">
                About Us
              </span>
              <h1 className="
                mt-5
                text-3xl
                sm:text-4xl
                font-bold
                leading-tight
                text-dark
              ">
                Making Booking Simple, Fast and Reliable
              </h1>
              <p className="
                mt-5
                text-gray-600
                leading-relaxed
                text-base
                sm:text-lg
              ">
                We provide a seamless booking experience that connects
                customers with amazing services, packages and experiences.
                Our platform helps users discover, book and manage their
                reservations with confidence.
              </p>

            </div>
          </div>
          {/* STORY + MISSION */}
          <div className="
            grid
            gap-7
            lg:grid-cols-2
            mb-10
          ">
            <div className="
              rounded-2xl
              bg-white
              shadow-1
              p-7
            ">
              <div className="
                mb-5
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-blue-600
                text-white
              ">
                <Sparkles size={22}/>
              </div>

              <h2 className="
                text-xl
                font-semibold
                text-dark
                mb-3
              ">
                Our Story
              </h2>
              <p className="
                text-gray-600
                leading-relaxed
              ">
                We started with a vision to simplify the way people
                access and book services. Through technology and
                innovation, we create solutions that save time and
                provide better experiences for every customer.
              </p>

            </div>
            <div className="
              rounded-2xl
              bg-white
              shadow-1
              p-7
            ">

              <div className="
                mb-5
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-green-600
                text-white
              ">
                <Target size={22}/>
              </div>
              <h2 className="
                text-xl
                font-semibold
                text-dark
                mb-3
              ">
                Our Mission
              </h2>
              <p className="
                text-gray-600
                leading-relaxed
              ">
                To deliver a trusted booking platform that makes
                finding and managing services effortless while
                helping businesses grow digitally.
              </p>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="
            rounded-3xl
            bg-white
            shadow-1
            p-8
            sm:p-10
          ">
            <div className="text-center mb-8">

              <h2 className="
                text-2xl
                sm:text-3xl
                font-bold
                text-dark
              ">
                Why Choose Us?
              </h2>
              <p className="
                mt-3
                text-gray-600
              ">
                Built to provide a smooth, secure and reliable booking experience.
              </p>

            </div>
            <div className="
              grid
              gap-6
              md:grid-cols-3
            ">
              <FeatureCard
                icon={<ShieldCheck size={22}/>}
                title="Trusted Platform"
                text="Secure and reliable booking experience designed for customers."
              />
              <FeatureCard
                icon={<Users size={22}/>}
                title="Customer Focused"
                text="We put customer satisfaction at the center of everything we do."
              />
              <FeatureCard
                icon={<CalendarCheck size={22}/>}
                title="Easy Booking"
                text="Find services, select packages and complete bookings easily."
              />
            </div>

          </div>

          {/* CTA */}
          <div className="
            mt-10
            mb-10
            rounded-3xl
            bg-blue-600
            p-8
            text-center
            text-white
          ">
            <HeartHandshake
              className="mx-auto mb-4"
              size={40}
            />
            <h2 className="
              text-2xl
              font-bold
            ">
              Ready to Experience Better Booking?
            </h2>
            <p className="
              mt-3
              text-blue-100
            ">
              Discover our services and book your next experience today.
            </p>

          </div>
        </div>
      </section>
    </>
  );
};

function FeatureCard({
  icon,
  title,
  text,
}:{
  icon:React.ReactNode;
  title:string;
  text:string;
}){

return (

<div className="
rounded-2xl
border
border-gray-100
p-6
">

<div className="
mb-4
flex
h-10
w-10
items-center
justify-center
rounded-lg
bg-blue-50
text-blue-600
">
{icon}
</div>

<h3 className="
font-semibold
text-dark
mb-2
">
{title}
</h3>

<p className="
text-sm
leading-relaxed
text-gray-600
">
{text}
</p>

</div>
);
}
export default About;