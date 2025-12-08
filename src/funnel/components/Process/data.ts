import { StaticImageData } from "next/image";
import TimilyDelivery from "./Timely delivery.png";
import Iterate from "./Iterate & Improve.png"
import Define from "./Describe your needs 2.png";
import DesignCollaborate from "./Design & Collaborate.png"
import Credit from "./Credit Points.png"

export interface Benefit {
  title: string;
  description: string;
  image: string | StaticImageData;
}

export const benefits: Benefit[] = [
  {
    title: "Earn Design Credits",
    description:
      "Subscribe to a plan & request as many designs as you'd like with the design credits acquired.",
    image: Credit,
  },
  {
    title: "Define Your Needs",
    description:
      "Share your ideas, goals, and specific requirements to set the project direction clearly.",
    image: Define,
  },
  {
    title: "Design & Collaborate",
    description:
      "Our creative team brings your vision to life while working closely with you.",
    image: DesignCollaborate,
  },
  {
    title: "Iterate & Improve",
    description:
      "Take control as you track your design's progress and provide feedback.",
    image: Iterate,
  },
  {
    title: "Timely Delivery",
    description:
      "Count on us for timely project delivery, keeping your deadlines on track.",
    image: TimilyDelivery,
  },
];
