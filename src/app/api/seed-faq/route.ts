import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

const faqs = [
    {
    question: "What programs do you design in?",
    answer:
      `We use industry-standard software and tools to deliver high-quality designs tailored to your needs. Here are the main programs we work with:

  1. Graphic Design & Print:
      • Adobe Illustrator: For vector-based designs, including logos, illustrations, and scalable graphics.
      • Adobe Photoshop: For photo editing, retouching, and creative compositions.
      • Adobe InDesign: For layouts such as brochures, multipage invitations, and magazines.

  2. Web & UI/UX Design:
      • Figma: For collaborative interface designs and prototyping.
      • Adobe XD: For user experience and interface design of websites and apps.

  3. Video Creation & Editing:
      • Adobe Premiere Pro: For professional video editing.
      • Adobe After Effects: For animations and motion graphics.
      • Final Cut Pro: For high-quality video editing and cinematic effects.

  4. Social Media & Quick Designs:
      • Canva: For fast, visually appealing social media graphics and presentations.
      • Procreate: For digital illustrations and creative concepts.

  5. Open-Source Options (if required):
      • Inkscape: For vector graphics.
      • GIMP: For raster-based designs and image manipulation.

We adapt to your project requirements and select the most suitable tools to ensure exceptional results. If you have specific preferences, feel free to let us know!`,
  },
  {
    question: "Who are the designers?",
    answer:
      "Our designers are a team of experienced professionals with expertise in various design disciplines, including graphic design, web design, branding, and more. They bring creativity, innovation, and attention to detail to every project, ensuring high-quality results tailored to meet your unique needs. Each designer is carefully vetted to ensure they align with our commitment to excellence and customer satisfaction.",
  },
  {
    question: "How do i request designs?",
    answer:
      "To request designs, start by selecting a subscription plan. Once your plan is set up, you can create projects by providing all the necessary details through the “Create Project” button. After that, you’ll access your personalized Workboard, where you can create tasks and move them to the “Start Designing” phase. From this point, our manager will take over and begin working on your project. You can track the progress of your project at any time directly from the Workboard.",
  },
  {
    question: "What if I have only a single request?",
    answer:
      "Our service operates on a subscription-based model, which means all requests, including single ones, must be made through an active subscription plan.",
  },
  {
    question: "Who can benefit from Picassofusion?",
    answer:
      `
  1. Small Businesses and Startups:
      • Affordable alternative to hiring a full-time designer or agency.

  2. Marketing Teams:
      • Quick turnaround for campaign assets like social media posts, flyers, or ads.

  3. Agencies:
      • Scalable design support for clients without increasing overhead costs.`,
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

        faqs.forEach((faq, index) => {
            const doc = {
                _type: 'faq',
                question: faq.question,
                answer: faq.answer,
                slug: {
                    _type: 'slug',
                    current: faq.question.toLowerCase().replace(/\s+/g, '-').replace(/[?]/g, '').slice(0, 200)
                }
            };
            transaction.create(doc);
        });

        const sectionDoc = {
            _type: 'faqSection',
            title: 'Your Questions,',
            titleHighlight: 'Simplified',
            description: 'Explore our FAQ section for clear answers to common questions about how Picasso Fusion works, its features, and how to get the most out of our design platform.'
        };
        transaction.createOrReplace({ _id: 'faqSection', ...sectionDoc });

        await transaction.commit();

        return NextResponse.json({ message: "Seeded FAQ data successfully!" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
