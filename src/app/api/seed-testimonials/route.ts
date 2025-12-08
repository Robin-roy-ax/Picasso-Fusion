import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

const testimonials = [
  {
    quote:
      "The new UI is a game changer, streamlining our processes and improving data insights. Since implementation, efficiency and cost-effectiveness have increased significantly.",
    name: "Rafael",
    title: "Director of IT Industry",
    image:
      "https://framerusercontent.com/images/iBem3bM7DskP1qLkV8JoHMLH68.jpg?scale-down-to=512",
  },
  {
    quote:
      "The digital ads designed for Saree Boutique are impactful, showcasing the sarees’ elegance while telling a story of tradition and craftsmanship. Thanks to engaging content and campaigns",
    name: "Michael Johnson",
    title: "Founder of Boutique",
    image:
      "https://framerusercontent.com/images/9nYExwEqKiZOxikoZuzMhPzlIX8.jpg?scale-down-to=512",
  },
  {
    quote:
      "The mobile design for Protein Pantry is exceptional. Its intuitive, sleek interface captures our brand and delivers a seamless user experience. We’re thrilled with how it elevated our brand.",
    name: "David Brown",
    title: "Co-Founder of Food Industry",
    image:
      "https://framerusercontent.com/images/xcVsFcFg7M5SkoOkJX5lUfdBUN4.jpg",
  },
  {
    quote:
      "The Picasso Fusion team's skills and creativity helped us build a visually stunning Instagram presence that has increased brand awareness and sales for our beauty brand.",
    name: "Leandro",
    title: "Co-Founder of Medical Industry",
    image:
      "https://framerusercontent.com/images/mKwxopbnEeNzwo0LzcvyHC5RdMM.jpg",
  },
  {
    quote:
      "Picasso Fusion’s design services surpassed our expectations. Their team delivered compelling visuals and messaging that aligned perfectly with our brand, and the credit based system made the entire process effortless and efficient.",
    name: "Matthew Miller",
    title: "Co-founder of Construction Company",
    image:
      "https://framerusercontent.com/images/a5SO6bWYO9JGc90jHykGK0g78.jpg",
  },
  {
    quote:
      "We were truly impressed by Picasso Fusion’s creativity and vision. Their environmental graphics transformed our office into a vibrant and inspiring space that elevated the entire atmosphere.",
    name: "Christopher Harris",
    title: "HR Manager at Cafe",
    image:
      "https://framerusercontent.com/images/lyyanOkQwdFqEmTN9vhLsdsi0.jpg",
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
    
    for (const testimonial of testimonials) {
        let imageAssetId = null;
        if (testimonial.image) {
            try {
                const response = await fetch(testimonial.image);
                if (response.ok) {
                    const blob = await response.blob();
                    const arrayBuffer = await blob.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    
                    const asset = await clientWithToken.assets.upload('image', buffer, {
                        filename: testimonial.name + '.jpg'
                    });
                    imageAssetId = asset._id;
                }
            } catch (err) {
                console.warn(`Failed to fetch image for ${testimonial.name}:`, err);
            }
        }

        const doc = {
            _type: "testimonial",
            name: testimonial.name,
            title: testimonial.title,
            quote: testimonial.quote,
            slug: {
                _type: 'slug',
                current: testimonial.name.toLowerCase().replace(/\s+/g, '-').slice(0, 200)
            },
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

    return NextResponse.json({ message: "Seeded Testimonials data successfully!" });
  } catch (error) {
    console.error("Seeding failed:", error);
    return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
  }
}
