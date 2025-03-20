"use client";
import PhotoSlider from "@/app/components/photoslider";

export default function Photo({ image = [] }) {
  return <PhotoSlider images={image} />;
}
