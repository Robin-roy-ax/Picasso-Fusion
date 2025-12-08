import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import fs from "fs";
import path from "path";
const token = process.env.SANITY_API_WRITE_TOKEN;

const benefits = [
  {
    title: "Earn Design Credits",
    description: "Subscribe to a plan & request as many designs as you'd like with the design credits acquired.",
    imageFile: "Credit Points.png"
  },
  {
    title: "Define Your Needs",
    description: "Share your ideas, goals, and specific requirements to set the project direction clearly.",
    imageFile: "Describe your needs 2.png"
  },
  {
    title: "Design & Collaborate",
    description: "Our creative team brings your vision to life while working closely with you.",
    imageFile: "Design & Collaborate.png"
  },
  {
    title: "Iterate & Improve",
    description: "Take control as you track your design's progress and provide feedback.",
    imageFile: "Iterate & Improve.png"
  },
  {
    title: "Timely Delivery",
    description: "Count on us for timely project delivery, keeping your deadlines on track.",
    imageFile: "Timely delivery.png"
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

    for (const benefit of benefits) {
      const filePath = path.join(process.cwd(), 'src/funnel/components/Process', benefit.imageFile);

      let imageAssetId = null;
      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath);
        const asset = await clientWithToken.assets.upload('image', fileBuffer, {
          filename: benefit.imageFile
        });
        imageAssetId = asset._id;
      } else {
        console.warn(`Image not found: ${filePath}`);
      }

      const doc = {
        _type: "process",
        title: benefit.title,
        description: benefit.description,
        image: imageAssetId ? {
          _type: 'image',
          asset: {
            _type: "reference",
            _ref: imageAssetId
          }
        } : undefined
      };

      transaction.create(doc);
      transaction.create(doc);
    }

    const sectionDoc = {
      _type: 'processSection',
      heading: 'Smooth',
      headingHighlight: 'Process,',
      subHeading: 'Stunning',
      subHeadingHighlight: 'Outcomes',
      description: 'At Picasso Fusion, our refined process ensures efficiency, clarity, and exceptional results. From concept to final delivery, we guide you with transparency and precision, turning your vision into impactful, polished designs.'
    };
    transaction.createOrReplace({ _id: 'processSection', ...sectionDoc });

    await transaction.commit();

    return NextResponse.json({ message: "Seeded data successfully with images!" });
  } catch (error) {
    console.error("Seeding failed:", error);
    return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
  }
}
