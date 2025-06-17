"use client";

import React, { useState } from "react";
import { LandmarkCardProps } from "@/utils/types";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import OtherInfo from "./OtherInfo";

const Hero = ({ landmarks }: { landmarks: LandmarkCardProps[] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  return (
    <div className="w-full">
      {/* Main Swiper */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="w-full"
      >
        {landmarks.map((landmark, index) => (
          <SwiperSlide key={`${landmark.name}-${index}`} className="group flex flex-col">
            <div className="relative rounded-xl overflow-hidden h-full">
              <img
                src={landmark.image || "/fallback.jpg"}
                alt={landmark.name}
                className="w-full h-[400px] object-cover brightness-75 group-hover:brightness-50 transition-all duration-300"
              />
            </div>

            <div className="absolute bottom-0 left-0 z-50">
              <div
                className="col-span-4 mb-4 flex h-full flex-1
              justify-end px-5 md:mb-4 md:justify-end md:px-10
              "
              >
                <OtherInfo landmark={landmark} />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Swiper */}
      <Swiper
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="h-[100px] mt-4"
      >
        {landmarks.map((landmark, index) => (
          <SwiperSlide key={`${landmark.name}-${index}`}>
            <div>
              <img
                src={landmark.image || "/fallback.jpg"}
                alt={`thumb-${landmark.name}`}
                className="w-full h-[80px] object-cover rounded-md opacity-40 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
