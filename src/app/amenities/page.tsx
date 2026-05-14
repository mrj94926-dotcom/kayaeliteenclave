import Amenities from "@/components/home/Amenities";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Amenities | Kaya Elite Enclave",
  description: "Experience the community life and premium amenities at Kaya Elite Enclave, from infinity pools to gated security.",
};

export default function AmenitiesPage() {
  return (
    <main>
      <Amenities />
    </main>
  );
}
