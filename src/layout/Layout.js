import Head from "next/head";
import useGetSetting from "@hooks/useGetSetting";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

//internal import

const Navbar = dynamic(() => import("@layout/navbar/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@layout/footer/Footer"), { ssr: true });
const MobileFooter = dynamic(() => import("@layout/footer/MobileFooter"), {
  ssr: true,
});
const CookieBanner = dynamic(() => import("@components/common/CookieBanner"), {
  ssr: false,
});

const Layout = ({ title, description, children }) => {
  const { storeCustomizationSetting } = useGetSetting();
  return (
    <>
      <ToastContainer />

      <div className="font-sans">
        <Head>
          <title>
            {title
              ? `${storeCustomizationSetting?.seo?.meta_title ? storeCustomizationSetting.seo.meta_title + " | " : "StickersRhino | "}${title}`
              : storeCustomizationSetting?.seo?.meta_title ||
                "StickersRhino - Custom Stickers & Decals Online"}
          </title>
          <meta
            name="description"
            content={
              description ||
              storeCustomizationSetting?.seo?.meta_description ||
              ""
            }
          />
          <link
            rel="icon"
            href={storeCustomizationSetting?.seo?.favicon || "/favicon.png"}
          />
        </Head>
        {/* <NavBarTop /> */}
        <Navbar />
        <div className="bg-gray-50">{children}</div>
        <MobileFooter />
        <div className="w-full">
          <div className="border-t border-gray-100 w-full">
            <Footer />
          </div>
        </div>

        {/* Cookie Consent Banner */}
        <CookieBanner />
      </div>
    </>
  );
};

export default Layout;
