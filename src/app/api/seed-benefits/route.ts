import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import fs from "fs";
import path from "path";
const token = process.env.SANITY_API_WRITE_TOKEN;

const services = [
    {
        title: "Design Board",
        description: "Add as many design requests as you want; we craft each with care, creativity, and stunning visuals, offering truly endless possibilities for you.",
        imageFile: "Design Board.png",
    },
    {
        title: "Fixed Monthly Rate",
        description:
            "No unexpected costs enjoy a consistent fixed monthly price that ensures transparency predictability and peace of mind for design always.",
        imageFile: "Fixed Monthly Rate.png",
    },
    {
        title: "Top-notch Quality",
        description:
            "Exceptional design quality available whenever you need it, delivering superior visuals crafted with precision, creativity, and unwavering attention to detail.",
        imageFile: "Top Notch Quality.png",
    },
    {
        title: "Speedy Creatives",
        description:
            "Receive your designs one by one, fast and seamless. Each piece reflects quality and creativity. Get stunning results without the wait.",
        imageFile: "Speedy Creatives.png",
    },
    {
        title: "Flexible and Scalable",
        description:
            "Always at your convenience you can pause or terminate the service anytime, giving you fully flexible and scalable design support whenever it suits your needs.",
        imageFile: "Flexible and Scalable.png",
    },
    {
        title: "Tailored Just for You",
        description:
            "Each design is custom crafted exclusively for you, created to match your vision perfectly, and delivered as work that belongs entirely to you.",
        imageFile: "Tailored Just for You.png",
    },
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

        for (const service of services) {
            const filePath = path.join(process.cwd(), 'src/funnel/components/Benefits', service.imageFile);

            let imageAssetId = null;
            if (fs.existsSync(filePath)) {
                const fileBuffer = fs.readFileSync(filePath);
                const asset = await clientWithToken.assets.upload('image', fileBuffer, {
                    filename: service.imageFile
                });
                imageAssetId = asset._id;
            } else {
                console.warn(`Image not found: ${filePath}`);
            }

            const doc = {
                _type: "homepageValue",
                title: service.title,
                description: service.description,
                slug: {
                    _type: 'slug',
                    current: service.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
                },
                tag: service.title,
                isLink: false,
                image: imageAssetId ? {
                    _type: 'image',
                    asset: {
                        _type: "reference",
                        _ref: imageAssetId
                    }
                } : undefined
            };

            transaction.create(doc);
        }

        await transaction.commit();

        return NextResponse.json({ message: "Seeded Benefits data successfully!" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
