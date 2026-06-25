const FALLBACK_IMAGE = "/favicon.svg";

const apiBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";
const apiOrigin = apiBaseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

const imageFields = [
  "image_url",
  "imageUrl",
  "image",
  "photo",
  "photo_url",
  "thumbnail",
  "thumbnail_url",
];

const firstPresent = (values) =>
  values.find((value) => typeof value === "string" && value.trim().length);

export const productImageUrl = (product) => {
  if (!product) {
    return FALLBACK_IMAGE;
  }

  const directValue = firstPresent(imageFields.map((field) => product[field]));
  const nestedValue =
    Array.isArray(product.images) && product.images.length
      ? firstPresent([
          product.images[0]?.url,
          product.images[0]?.image_url,
          product.images[0]?.path,
          product.images[0]?.image,
        ])
      : "";

  const value = (directValue || nestedValue || "").trim();

  if (!value) {
    return FALLBACK_IMAGE;
  }

  if (/^(https?:|data:|blob:)/i.test(value)) {
    return value;
  }

  if (value.startsWith("/")) {
    return `${apiOrigin}${value}`;
  }

  if (value.startsWith("storage/") || value.startsWith("uploads/")) {
    return `${apiOrigin}/${value}`;
  }

  return `${apiOrigin}/storage/${value}`;
};

export const fallbackProductImage = FALLBACK_IMAGE;
