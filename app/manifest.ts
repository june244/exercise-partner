import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "운동 루틴",
    short_name: "운동 루틴",
    description: "보통사람 운동채널 - 푸쉬업 100개 & AB슬라이드 복근 루틴",
    start_url: "/",
    display: "standalone",
    background_color: "#030712",
    theme_color: "#f97316",
    orientation: "portrait",
    categories: ["health", "fitness"],
    icons: [
      {
        src: "/icons/192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
