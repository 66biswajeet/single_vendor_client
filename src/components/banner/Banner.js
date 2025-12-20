import Link from "next/link";
import React from "react";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";

const Banner = () => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue } = useUtilsFunction();

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6">
        <div className="flex-1 w-full sm:w-auto">
          <h1 className="font-serif text-lg sm:text-xl lg:text-2xl">
            <span className="text-black font-bold">
              {showingTranslateValue(
                storeCustomizationSetting?.home?.promotion_title
              )}
            </span>{" "}
          </h1>

          <p className="text-gray-700 text-sm sm:text-base mt-1 sm:mt-2 leading-relaxed">
            {showingTranslateValue(
              storeCustomizationSetting?.home?.promotion_description
            )}
          </p>
        </div>
        <Link
          href={`${storeCustomizationSetting?.home?.promotion_button_link}`}
          className="text-xs sm:text-sm font-semibold px-6 sm:px-8 py-2.5 sm:py-3 bg-yellow-400 text-center rounded-full text-black hover:bg-yellow-500 hover:shadow-lg transition-all border-2 border-yellow-500 active:scale-95 w-full sm:w-auto"
        >
          {showingTranslateValue(
            storeCustomizationSetting?.home?.promotion_button_name
          )}
        </Link>
      </div>
    </>
  );
};

export default Banner;
