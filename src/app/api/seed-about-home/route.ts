import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";


const token = process.env.SANITY_API_WRITE_TOKEN;

const ABOUT_DATA = {
    mainText: {
        part1: "Picasso Fusion",
        part2: "is a creative powerhouse, crafting meaningful visual experiences.",
        part3: "We bring ideas to life through",
        part4: "branding, digital design, motion graphics,",
        part5: "and more.",
        part6: "Step into our world where collaboration and",
        part7: "creativity elevate every project."
    },
    buttonText: "Discover more about us"
};

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

        const aboutDoc = {
            _type: 'about',
            mainText: ABOUT_DATA.mainText,
            buttonText: ABOUT_DATA.buttonText
        };

       
        transaction.create(aboutDoc);

        await transaction.commit();

        return NextResponse.json({ message: "Seeded About (Home) data successfully!" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
