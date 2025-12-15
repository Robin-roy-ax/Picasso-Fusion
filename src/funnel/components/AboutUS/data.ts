// data.ts
export interface Stat {
    value: number;
    suffix?: string;
    label: string;
  }
  
  export interface TeamMember {
    name: string;
    role: string;
    image: string;
    description: string;
  }
  
  export const stats: Stat[] = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];
  
  export const teamMembers: TeamMember[] = [
    {
      name: "Karim Benzema",
      role: "Founder/Creative Director",
      image: "https://framerusercontent.com/images/EmrjuKhlE2MYwMMNxmKiVqqR4.png",
      description:
        "Karim is the visionary behind Picasso Fusion, leading the team with his passion for creativity and innovation. With years of experience in the industry, he drives the company's mission to create exceptional brand experiences.",
    },
    {
      name: "Matthew Davis",
      role: "Brand Strategist",
      image: "https://framerusercontent.com/images/EFyr6qMiyaDXQ7NXQBtz3PZUM.png",
      description:
        "Matthew is a master storyteller who helps our clients build strong and memorable brands. His strategic insights and creative thinking set the foundation for successful brand campaigns.",
    },
    {
      name: "Maqsood",
      role: "Senior Product Designer",
      image: "https://framerusercontent.com/images/KvYpZpFddcRRqVruxUZfmzSh0.png",
      description:
        "Maqsood is a creative powerhouse who brings ideas to life with his impeccable design skills. His user-centric approach ensures that our products not only look great but also deliver exceptional experiences.",
    },
    {
      name: "Daniel Mitchell",
      role: "Digital Marketing Manager",
      image: "https://framerusercontent.com/images/2SxzBFprM3cmjAl5NQvLmgktkY.png",
      description:
        "Daniel is a strategic thinker with a passion for digital marketing. His data-driven approach helps our clients achieve their business goals through targeted campaigns and effective online strategies.",
    },
    {
      name: "Ali Hassan",
      role: "Lead Web Developer",
      image: "https://framerusercontent.com/images/YfiWn0gVlP7wcJSozAnGEpbzYs.png?scale-down-to=1024",
      description:
        "Ali Hassan is a coding wizard with a knack for turning complex ideas into seamless digital experiences. His attention to detail ensures that every website we create is pixel-perfect.",
    },
    {
      name: "Ryan Johnson",
      role: "Motion Graphics Designer",
      image: "https://framerusercontent.com/images/w3zFIzqHBzSu5Fc9GhlQnPk1Ppc.png",
      description:
        "Ryan is a creative genius who brings motion to our projects with stunning animations and visuals. His eye for detail and innovative approach make our videos come to life.",
    },
  ];
  
  export const content = {
    hero: {
      title: "Innovate,",
      titleHighlight: "Elevate & Design.",
      //subtitle: "Based on Chennai",
      description:
        "Unlock your creative potential with us, offering limitless possibilities to transform your concepts into stunning realities.",
    },
    overview: {
      text: "Picasso Fusion delivers high quality, personalized designs through a simple credit based system. Our team turns your ideas into impactful visuals across every design need. Fast, flexible, and seamless in elevating your brand with ease.",
    },
    mission: {
      title: "Top-Notch Equipment",
      description:
        "We leverage cutting-edge tools and technology to deliver exceptional quality and precision in every design. Our state-of-the-art equipment ensures that your vision is brought to life with unparalleled excellence.",
    },
    approach: {
      title: "Dedicated Team",
      description:
        "Our team of skilled professionals are passionate about creating designs that inspire. With expertise and commitment, we work collaboratively to bring innovative ideas to fruition.",
    },
    pioneer: {
      title: "Pioneering the Path in Design",
      description:
        "We are at the forefront of design trends, always pushing boundaries and exploring new possibilities. Our innovative approach ensures that we stay ahead of the curve and deliver cutting-edge solutions.",
    },
    numbers: {
      title: "In Numbers",
    },
    team: {
      title: "Meet Our",
      titleHighlight: "Team",
      description:
        "Discover the Exceptional Talent Shaping Picasso Fusion's Innovative Solutions and Remarkable Achievements",
    },
    heroImage: "https://framerusercontent.com/images/IjRP7RIug6UNzqeHbNO5WxD3FDk.jpg",
  };