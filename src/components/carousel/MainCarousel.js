import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Controller, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

//internal import

import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const MainCarousel = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue, showingUrl, showingImage } =
    useUtilsFunction();

  const sliderData = [
    {
      id: 1,

      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.first_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.first_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.first_img) ||
        "/slider/slider-1.jpg",
    },
    {
      id: 2,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.second_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.second_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.second_img) ||
        "/slider/slider-2.jpg",
    },
    {
      id: 3,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.third_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.third_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.third_img) ||
        "/slider/slider-3.jpg",
    },
    {
      id: 4,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.four_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.four_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.four_img) ||
        "/slider/slider-1.jpg",
    },
    {
      id: 5,
      title: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_title
      ),
      info: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_description
      ),
      buttonName: showingTranslateValue(
        storeCustomizationSetting?.slider?.five_button
      ),
      url: showingUrl(storeCustomizationSetting?.slider?.five_link),
      image:
        showingImage(storeCustomizationSetting?.slider?.five_img) ||
        "/slider/slider-2.jpg",
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={
          (storeCustomizationSetting?.slider?.bottom_dots ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
          }
        }
        navigation={
          (storeCustomizationSetting?.slider?.left_right_arrow ||
            storeCustomizationSetting?.slider?.both_slider) && {
            clickable: true,
          }
        }
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderData?.map((item, i) => {
          return (
            <SwiperSlide
              className="h-full w-full relative rounded-lg overflow-hidden"
              key={i + 1}
            >
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72">
                <Image
                  src={item.image || "/slider/slider-1.jpg"}
                  alt={item.title}
                  width={1200}
                  height={400}
                  className="object-cover w-full h-full"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
              </div>
              <div className="absolute top-0 left-0 z-10 flex-col flex w-full h-full place-items-start justify-center">
                <div className="pl-4 pr-8 sm:pl-6 sm:pr-12 md:pl-8 md:pr-16 lg:pl-12 w-full sm:w-9/12 md:w-8/12 lg:w-7/12">
                  <h1 className="mb-2 sm:mb-3 font-serif text-base sm:text-lg md:text-xl lg:text-3xl xl:text-4xl font-bold text-white drop-shadow-lg line-clamp-2">
                    {item.title}
                  </h1>
                  <Link
                    href={item.url}
                    className="inline-block text-xs sm:text-sm font-semibold mt-2 sm:mt-3 md:mt-4 px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 bg-yellow-400 text-center rounded-full text-black hover:bg-yellow-500 hover:shadow-lg transition-all border-2 border-yellow-500 active:scale-95"
                  >
                    {item.buttonName}
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default MainCarousel;
