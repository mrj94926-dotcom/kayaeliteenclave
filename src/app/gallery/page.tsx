import GallerySection from "@/components/home/GallerySection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Kaya Elite Enclave",
  description: "A cinematic visual collection of architecture, community life, and aerial views of Kaya Elite Enclave.",
};

export default function GalleryPage() {
  return (
    <main className="pt-20">
      <GallerySection />
    </main>
  );
}
