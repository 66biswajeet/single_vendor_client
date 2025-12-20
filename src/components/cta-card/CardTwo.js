import React from "react";
import Image from "next/image";
import Link from "next/link";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import CMSkeleton from "@components/preloader/CMSkeleton";
import useUtilsFunction from "@hooks/useUtilsFunction";

const CardTwo = () => {
  const { storeCustomizationSetting, error, loading } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <div className="w-full bg-white shadow-sm px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6 rounded-lg">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
          <div className="w-full lg:w-3/5">
            <span className="text-sm sm:text-base lg:text-lg">
              <CMSkeleton
                count={1}
                height={20}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.quick_delivery_subtitle}
              />
            </span>
            <h2 className="font-serif text-base sm:text-lg lg:text-2xl font-bold mb-1 mt-1">
              <CMSkeleton
                count={1}
                height={30}
                error={error}
                loading={loading}
                data={storeCustomizationSetting?.home?.quick_delivery_title}
              />
            </h2>
            <p className="text-xs sm:text-sm font-sans leading-5 sm:leading-6 mb-3 lg:mb-0">
              <CMSkeleton
                count={4}
                height={20}
                error={error}
                loading={loading}
                data={
                  storeCustomizationSetting?.home?.quick_delivery_description
                }
              />
            </p>
            <Link
              href={`${storeCustomizationSetting?.home?.quick_delivery_link}`}
              className="text-xs font-serif font-medium inline-block mt-3 sm:mt-5 px-6 sm:px-8 py-2.5 sm:py-3 bg-emerald-500 text-center text-white rounded-full hover:text-white contact-btn w-full sm:w-auto"
              target="_blank"
            >
              {showingTranslateValue(
                storeCustomizationSetting?.home?.quick_delivery_button
              )}
            </Link>
          </div>
          <div className="w-full lg:w-1/5 flex-grow flex justify-center lg:justify-end mt-4 lg:mt-0">
            <Image
              width={373}
              height={250}
              alt="Quick Delivery to Your Home"
              className="block w-48 sm:w-56 lg:w-auto h-auto object-contain"
              src={
                storeCustomizationSetting?.home?.quick_delivery_img ||
                "/cta/delivery-boy.png"
              }
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CardTwo;
