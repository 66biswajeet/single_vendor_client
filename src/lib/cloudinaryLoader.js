// Cloudinary loader for Next.js Image
// Builds a Cloudinary delivery URL with a width and quality-aware transformation
export default function cloudinaryLoader({ src, width, quality }) {
  if (!src) return "";
  try {
    // Only handle Cloudinary upload URLs
    const uploadToken = "/upload/";
    if (!src.includes(uploadToken)) return src;

    // Avoid injecting transforms into malformed urls
    const parts = src.split(uploadToken);
    if (parts.length < 2) return src;

    const prefix = parts[0];
    const rest = parts.slice(1).join(uploadToken);

    // Sanitize width and quality
    const w = Number(width) || 800;
    const q = Number(quality) || 75;

    // Use f_auto and q_auto where possible; fall back to explicit q
    // Using c_fill to maintain aspect, but callers can override by providing a different src
    return `${prefix}${uploadToken}f_auto,q_${q},c_fill,w_${w}/${rest}`;
  } catch (e) {
    return src;
  }
}
