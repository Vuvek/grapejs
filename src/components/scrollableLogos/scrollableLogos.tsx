import Link from "next/link";
import React from "react";
import { Grid, Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/grid";

interface scrollableLogo {
  slides: any[];
}
const SrollableLogos = ({ slides }: scrollableLogo) => {
  const slidesToShow = slides.length <= 5 ? slides.length : 6;

  return (
    <div className="max-w-sm sm:max-w-xl lg:max-w-6xl mx-auto text-center">
      <Swiper
        slidesPerView={slidesToShow}
        slidesPerGroup={slidesToShow}
        modules={[Navigation, Pagination, Grid]}
        pagination={{ clickable: true }}
        grid={{
          fill: "row",
          rows: 2,
        }}
        className="mySwiper"
      >
        {slides.map((data, index) => {
          return (
            <SwiperSlide
              className="border border-collapse border-gray-border hover:border-secondary"
              key={index}
            >
              <Link href={data.link}>
                <img alt={data.alt} src={data.image} />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default SrollableLogos;
