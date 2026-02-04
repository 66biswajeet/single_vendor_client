import React from "react";
import { DefaultSeo as NextSeo } from "next-seo";

//internal import
import useGetSetting from "@hooks/useGetSetting";

const DefaultSeo = () => {
  const { globalSetting, storeCustomizationSetting } = useGetSetting();

  const seo = storeCustomizationSetting?.seo || globalSetting || {};

  return (
    <NextSeo
      title={
        seo?.meta_title ||
        globalSetting?.meta_title ||
        "StickersRhino - Custom Stickers & Decals Online"
      }
      description={seo?.meta_description || globalSetting?.meta_description}
      canonical={seo?.meta_url || globalSetting?.meta_url}
      openGraph={{
        type: "website",
        locale: "en_IE",
        url:
          seo?.meta_url ||
          globalSetting?.meta_url ||
          "https://stickersrhino.com/",
        site_name:
          seo?.meta_title ||
          globalSetting?.meta_title ||
          "StickersRhino - Custom Stickers & Decals Online",
        images: seo?.meta_img ? [{ url: seo.meta_img }] : [],
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "viewport",
          content:
            "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
        },
        {
          name: "mobile-web-app-capable",
          content: "yes",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        },
      ]}
      additionalLinkTags={[
        {
          rel: "apple-touch-icon",
          href: "/icon-192x192.png",
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
        // favicon handled in Layout head as well, keep defaults here
      ]}
    />
  );
};

export default DefaultSeo;
