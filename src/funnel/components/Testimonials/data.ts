export interface Testimonial {
  quote: string;
  name: string;
  title: string;
  image: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    quote:
      "The Picasso Fusion team delivered a refined, scalable design experience that supports FacilGo’s AI-driven maintenance and renovations platform. Their work enhanced usability, efficiency, and overall product clarity.",
    name: "FacilGo",
    title: "Team FacilGo",
    image:"/facilGo.svg",
  },
  {
    quote:
      "Picasso Fusion delivered polished social and email creatives for Eventzilla, clearly communicating our feature-rich platform and promise of seamless, professional events.",
    name: "Eventzilla",
    title: "Marketing Team | Eventzilla",
    image:
      "/Eve.svg",
  },
  {
    quote:
      "Picasso Fusion delivered high-quality marketing assets for Callidus, including decks and social creatives, turning complex compliance-focused content into clear, credible, and brand-aligned visuals.",
    name: "Callidus",
    title: "Team Callidus",
    image:"/Callidus.jpg",
  },
  {
    quote:
      "Picasso Fusion beautifully captured the essence of Saaral — simplicity, craftsmanship, and quiet elegance. Their design approach allowed our handloom sarees to speak for themselves, highlighting texture and detail without overwhelming the aesthetic. The visuals feel refined, timeless, and perfectly aligned with our brand philosophy.",
    name: "Saaral Handloom Studio",
    title: "Founder | Textile & Craft Brand",
    image:"/Saaral.jpg",
  },
  {
    quote:
      "Picasso Fusion created eye-catching posters for Cell Point across the website and social media. The creatives were visually strong and on-brand, clearly showcasing products while enhancing the brand’s overall digital presence, consistency, and engagement across multiple customer touchpoints.",
    name: "Cellpoint",
    title: "Product Manager | Cellpoint",
    image:
      "/Cellpoint.jpg",
  },
  // {
  //   quote:
  //     "We were truly impressed by Picasso Fusion’s creativity and vision. Their environmental graphics transformed our office into a vibrant and inspiring space that elevated the entire atmosphere.",
  //   name: "Christopher Harris",
  //   title: "HR Manager at Cafe",
  //   image:
  //     "https://framerusercontent.com/images/lyyanOkQwdFqEmTN9vhLsdsi0.jpg",
  // },
];

export const TESTIMONIALS_TEXT = {
  title: {
    part1: "Client Stories That",
    part2: "Stand Out"
  },
  description: {
    text: "Hear directly from clients who have partnered with ",
    highlight: "Picasso Fusion",
    continuation: ". Their stories reflect the value, creativity, and results they’ve experienced with our work. "
  }
};

export const TESTIMONIALS_ANIMATIONS = {
  header: {
    duration: 0.8,
    initial: { opacity: 1, y: 40 },
    animate: { opacity: 1, y: 0 }
  },
  card: {
    duration: 0.6,
    initial: { opacity: 1, y: 60 },
    animate: { opacity: 1, y: 0 },
    ease: [0.16, 1, 0.3, 1] as const
  }
} as const;
