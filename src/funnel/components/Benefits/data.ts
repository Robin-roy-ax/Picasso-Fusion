import { StaticImageData } from "next/image";
import DesignBoard from "./Design Board.png";
import FixedMonthlyRate from "./Fixed Monthly Rate.png";
import TopNotchQuality from "./Top Notch Quality.png";
import SpeedyCreatives from "./Speedy Creatives.png";
import FlexibleAndScalable from "./Flexible and Scalable.png";
import TailoredJustForYou from "./Tailored Just for You.png";

export interface Service {
  title: string;
  description: string;
  image: string | StaticImageData;
}

export const services: Service[] = [
  {
    title: "Design Board",
    description: "Add as many design requests as you want; we craft each with care, creativity, and stunning visuals, offering truly endless possibilities for you.",
    image: DesignBoard,
  },
  {
    title: "Fixed Monthly Rate",
    description:
      "No unexpected costs enjoy a consistent fixed monthly price that ensures transparency predictability and peace of mind for design always.",
    image: FixedMonthlyRate,
  },
  {
    title: "Top-notch Quality",
    description:
      "Exceptional design quality available whenever you need it, delivering superior visuals crafted with precision, creativity, and unwavering attention to detail.",
    image: TopNotchQuality,
  },
  {
    title: "Speedy Creatives",
    description:
      "Receive your designs one by one, fast and seamless. Each piece reflects quality and creativity. Get stunning results without the wait.",
    image: SpeedyCreatives,
  },
  {
    title: "Flexible and Scalable",
    description:
      "Always at your convenience you can pause or terminate the service anytime, giving you fully flexible and scalable design support whenever it suits your needs.",
    image: FlexibleAndScalable,
  },
  {
    title: "Tailored Just for You",
    description:
      "Each design is custom crafted exclusively for you, created to match your vision perfectly, and delivered as work that belongs entirely to you.",
    image: TailoredJustForYou,
  },
];
