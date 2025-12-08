import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

const menuLinks = [
  { label: "Home", href: "/#hero", id: "hero" },
  { label: "Works", href: "/dribbble", id: "dribbble" },
  { label: "Testimonials", href: "/testimonials", id: "testimonials" },
  { label: "Process", href: "/process", id: "process" },
  { label: "Benefits", href: "/benefits", id: "benefits" },
  { label: "Pricing", href: "/pricing", id: "pricing" },
  { label: "About Us", href: "/about", id: "about" },
];

const socialLinks = [
  { label: "X / Twitter", href: "https://x.com/picassofusion" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/picasso-fusion-293b71342" },
  { label: "Instagram", href: "https://www.instagram.com/picassofusion/" },
  { label: "Youtube", href: "https://www.youtube.com/@PicassoFusion" },
  { label: "Dribbble", href: "https://dribbble.com/PicassoFusion" },
];

export async function GET() {
    if (!token) {
        return NextResponse.json(
            { error: "Missing SANITY_API_WRITE_TOKEN in .env.local" },
            { status: 401 }
        );
    }

    const clientWithToken = client.withConfig({ token });

    try {
        const transaction = clientWithToken.transaction();

        const footerDoc = {
            _type: 'footer',
            ctaSection: {
                heading: "Your Next Big Idea",
                subHeading: "Starts Here",
                description: "From concept to final design, we collaborate closely to bring your vision to life with clarity, creativity, and purpose.",
                buttonText: "Schedule a call"
            },
            newsletterHeading: "Subscribe to our newsletter",
            menuLinks: menuLinks,
            socialLinks: socialLinks,
            copyright: "© Picasso Fusion 2025. All rights reserved",
            tagline: "Our Design, Your Vision"
        };

        transaction.createOrReplace({ _id: 'footer', ...footerDoc });

        await transaction.commit();

        return NextResponse.json({ message: "Seeded Footer data successfully!" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
