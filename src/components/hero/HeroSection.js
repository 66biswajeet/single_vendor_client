import React from "react";
import Link from "next/link";
import Image from "next/image";

//internal import
import useGetSetting from "@hooks/useGetSetting";
import useUtilsFunction from "@hooks/useUtilsFunction";
import cloudinaryLoader from "@lib/cloudinaryLoader";

const HeroSection = ({ serverHeroImage = null }) => {
  const { storeCustomizationSetting } = useGetSetting();
  const { showingTranslateValue, showingUrl, showingImage } =
    useUtilsFunction();

  const heroData = {
    mainTitle: showingTranslateValue(
      storeCustomizationSetting?.hero?.main_title,
    ),
    description: showingTranslateValue(
      storeCustomizationSetting?.hero?.description,
    ),
    button1Text: showingTranslateValue(
      storeCustomizationSetting?.hero?.button1_text,
    ),
    button1Link: showingUrl(storeCustomizationSetting?.hero?.button1_link),
    button2Text: showingTranslateValue(
      storeCustomizationSetting?.hero?.button2_text,
    ),
    button2Link: showingUrl(storeCustomizationSetting?.hero?.button2_link),
    image: showingImage(storeCustomizationSetting?.hero?.image),
  };

  // Ensure Cloudinary URL is safe for use. If it appears malformed (contains 'undefined' segments)
  // return null so we can fall back to a local placeholder. Avoid hardcoding large widths
  // here; the custom Cloudinary loader will inject width-specific transforms.
  const normalizeCloudinary = (url) => {
    if (!url || typeof url !== "string") return null;
    try {
      if (!url.includes("res.cloudinary.com")) return url;
      // If URL appears malformed (contains 'undefined' or 'unnamed'), bail out
      if (
        url.includes("/undefined/") ||
        url.includes("/undefined") ||
        url.includes("unnamed")
      )
        return null;
      const parts = url.split("/upload/");
      if (parts.length < 2) return url;
      const [prefix, rest] = parts;
      // if transformation already present, leave as-is
      if (rest.match(/^(f_|q_|c_|w_|h_|f_auto|q_auto)/)) return url;
      // return base cloudinary url without width so loader can add width-specific transforms
      const transform = "f_auto,q_auto,c_fill";
      return `${prefix}/upload/${transform}/${rest}`;
    } catch (e) {
      return null;
    }
  };

  const imageSrc =
    serverHeroImage ||
    normalizeCloudinary(heroData.image) ||
    (typeof heroData.image === "string" ? heroData.image : null);

  const renderWithBoldMarkers = (text) => {
    if (!text) return null;
    // split text by markers like [bold text]
    const parts = text.split(/(\[.+?\])/g);
    return parts.map((part, idx) => {
      const m = part.match(/^\[(.+)\]$/);
      if (m)
        return (
          <strong key={idx} className="font-extrabold">
            {m[1]}
          </strong>
        );
      return <span key={idx}>{part}</span>;
    });
  };

  return (
    <div
      className="relative w-full bg-gradient-to-r from-leather-white-50 to-gray-100
     rounded-lg overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 items-center min-h-[400px] md:min-h-[500px]">
          {/* Left Side - Text Content */}
          <div className="px-4 sm:px-6 md:px-10 lg:px-12 py-6 sm:py-8 md:py-12 order-2 lg:order-1">
            <h1 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              {renderWithBoldMarkers(
                heroData.mainTitle ||
                  "Create Custom Stickers, Labels, Decals & More",
              )}
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8 leading-relaxed">
              {heroData.description ||
                "Easily create & print custom products for your business, brand, and beyond. Order in any size, die-cut shape, and quantity."}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link
                href={heroData.button1Link || "#"}
                className="inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black bg-yellow-400 rounded-full hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl active:scale-95 border-2 border-yellow-500"
              >
                {heroData.button1Text || "Create Now"} →
              </Link>
              <Link
                href={heroData.button2Link || "#"}
                className="inline-flex items-center justify-center px-5 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-black bg-white border-2 border-yellow-400 rounded-full hover:bg-yellow-50 transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                {heroData.button2Text || "Get A Quote"}
              </Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px] order-1 lg:order-2">
            <div className="relative w-full h-full">
              <Image
                loader={cloudinaryLoader}
                src={imageSrc || "/logo/logo-color.png"}
                alt={heroData.mainTitle || "Hero Image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 960px"
                quality={85}
                className="object-contain object-center"
                loading="eager"
                priority
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
