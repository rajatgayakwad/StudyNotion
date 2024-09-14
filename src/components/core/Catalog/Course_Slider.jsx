import React from "react";

import Course_Card from "./Course_Card";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const Course_Slider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={100}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false
            }}
            navigation={true}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="mySwiper "
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[200px]"} />
            </SwiperSlide>
          ))}
          
        </Swiper>
      ) : (
        <p className="text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  );
};

export default Course_Slider;
