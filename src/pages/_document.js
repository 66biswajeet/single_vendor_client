import SettingServices from "@services/SettingServices";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    // Fetch general metadata from backend API
    // During build/export, the API might not be available, so we catch errors
    let setting = null;
    try {
      setting = await SettingServices.getStoreSeoSetting();
    } catch (error) {
      // Silently fail during build - the render method has fallback values
      if (process.env.NODE_ENV === "development") {
        console.warn("Failed to fetch store settings:", error.message);
      }
    }

    return { ...initialProps, setting };
  }

  render() {
    const setting = this.props.setting;
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preconnect"
            href="https://res.cloudinary.com"
            crossOrigin=""
          />
          <link rel="icon" href={setting?.favicon || "/favicon.png"} />
          <meta
            property="og:title"
            content={
              setting?.meta_title ||
              "StickersRhino - Custom Stickers, Labels, Decals & More Online Store"
            }
          />
          <meta property="og:type" content="eCommerce Website" />
          <meta
            property="og:description"
            content={
              setting?.meta_description ||
              "StickersRhino - Custom Stickers, Labels, Decals & More Online Store"
            }
          />
          <meta
            name="keywords"
            content={setting?.meta_keywords || "ecommenrce online store"}
          />
          <meta
            property="og:url"
            content={setting?.meta_url || "https://stickersrhino.com/"}
          />
          <meta
            property="og:image"
            content={
              setting?.meta_img ||
              "https://res.cloudinary.com/de4q84ga3/image/upload/v1769362173/undefined/hro.jpg"
            }
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
