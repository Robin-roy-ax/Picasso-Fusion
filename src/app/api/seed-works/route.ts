import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import fs from 'fs';
import path from 'path';
const token = process.env.SANITY_API_WRITE_TOKEN;

const WORKS_DATA = [
    {
      type: "image",
      src: "public/videos/1.jpg",
      title: "lorel ipsum dolor sit amet",
      description: "lorel ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    },
    {
      type: "video",
      src: "public/videos/28.mp4",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/3.jpg",
      title: "Covers",
      description: "We delivered over 250 editorial designs this year",
    },
    {
      type: "video",
      src: "public/videos/27.mp4",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/5.jpg",
      title: "Visual Identity Lab",
      description: "Material-driven identity systems—palette, type, textures, and signature.",
    },
    {
      type: "video",
      src: "public/videos/26.mp4",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/7.jpg",
      title: "Promotional creative for luxury perfume brand",
      description: "An immersive luxury scene showcasing product sophistication with nature",
    },
    {
      type: "video",
      src: "public/videos/22.mp4",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/9.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "video",
      src: "public/videos/21.mp4",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/11.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "video",
      src: "public/videos/18.mp4",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/13.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/14.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/15.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/16.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/17.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/24.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/12.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/10.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/8.jpg",
      title: "Modular Framer Websites",
      description: "Component-driven builds with responsive grids and subtle motion.",
    },
    {
      type: "image",
      src: "public/videos/6.jpg",
      title: "Seafood Concept Creative",
      description: "A visually rich concept that elevates a simple dish into an expressive narrative.",
    },
    {
      type: "image",
      src: "public/videos/4.jpg",
      title: "Foam Serum Launch",
      description: "Bubbly physics + product CGI used across hero, ads, and socials.",
    },
    {
      type: "image",
      src: "public/videos/2.jpg",
      title: "Visual Identity Lab",
      description: "Material-driven identity systems—palette, type, textures, and signature.",
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

        for (const work of WORKS_DATA) {
            const filePath = path.join(process.cwd(), work.src);
            let assetId = null;

            if (fs.existsSync(filePath)) {
                try {
                    const fileBuffer = fs.readFileSync(filePath);
                    const assetType = work.type === 'video' ? 'file' : 'image';
                    const asset = await clientWithToken.assets.upload(assetType, fileBuffer, {
                        filename: path.basename(work.src)
                    });
                    assetId = asset._id;
                } catch (err) {
                    console.warn(`Failed to upload asset for ${work.title}:`, err);
                }
            } else {
                 console.warn(`File not found: ${filePath}`);
            }

            const doc: any = {
                _type: "work",
                title: work.title,
                description: work.description,
                slug: {
                    _type: 'slug',
                    current: `${work.title}-${Math.random().toString(36).substring(7)}`.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
                },
            };

            if (assetId) {
                if (work.type === 'image') {
                    doc.mainImage = {
                        _type: 'image',
                        asset: { _type: "reference", _ref: assetId },
                        alt: work.title
                    };
                } else {
                     doc.video = {
                        _type: 'file',
                        asset: { _type: "reference", _ref: assetId }
                    };
                }
            }

            transaction.create(doc);
        }

        const sectionDoc = {
            _type: 'workSection',
            heading: "Our Creative Showcase",
            description: "See how we transform imagination into visuals through design and creativity.",
            ctaText: "Explore Visuals",
            ctaUrl: "https://dribbble.com/PicassoFusion"
        };
        transaction.createOrReplace({ _id: 'workSection', ...sectionDoc });

        await transaction.commit();

        return NextResponse.json({ message: "Seeded Works (Dribbble) data successfully!" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
