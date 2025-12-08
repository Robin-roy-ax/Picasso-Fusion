import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

const HERO_DATA = {
    subtitle: "From Imagination to Reality",
    mainHeading: {
        part1: "You",
        part1Italic: "define,",
        part2: "We",
        part2Italic: "design"
    },
    description: "“Upgrade your designs with Picassofusion. Purchase our design credits and see our expert team turn your ideas into stunning visuals.”",
    buttons: {
        primary: "Schedule a call",
        secondary: "See pricing plans"
    },
    clientCount: {
        number: "1,000+",
        description: "satisfied clients"
    },
    scrollText: "Scroll down to explore",
    avatarUrls: [
        "https://framerusercontent.com/images/iBem3bM7DskP1qLkV8JoHMLH68.jpg",
        "https://framerusercontent.com/images/wKRLfgb6vJIipselilRPIp7O8k.jpg",
        "https://framerusercontent.com/images/Zm7VMv3qkNTsNCEbJUrRSLM6yKQ.jpg",
        "https://framerusercontent.com/images/9nYExwEqKiZOxikoZuzMhPzlIX8.jpg",
    ]
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

        const avatarAssetIds = [];
        let i = 0;
        for (const url of HERO_DATA.avatarUrls) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const blob = await response.blob();
                    const arrayBuffer = await blob.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    const asset = await clientWithToken.assets.upload('image', buffer, {
                        filename: url.split('/').pop() || 'avatar.jpg'
                    });
                    avatarAssetIds.push(asset._id);
                }
            } catch (err) {
                console.warn(`Failed to fetch avatar: ${url}`, err);
            }
            i++;
        }

        const heroDoc = {
            _id: 'hero',
            _type: 'hero',
            subtitle: HERO_DATA.subtitle,
            mainHeading: HERO_DATA.mainHeading,
            description: HERO_DATA.description,
            buttons: HERO_DATA.buttons,
            clientCount: HERO_DATA.clientCount,
            scrollText: HERO_DATA.scrollText,
            avatars: avatarAssetIds.map((id, idx) => ({
                _key: `avatar-${idx}`,
                _type: 'image',
                asset: {
                    _type: "reference",
                    _ref: id
                },
                alt: `Client Avatar ${idx + 1}`
            }))
        };

        transaction.createOrReplace(heroDoc);
        await transaction.commit();

        return NextResponse.json({ message: "Seeded Hero data successfully with Alt text!" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
