import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

export const faqs = [
    {
        question: "What programs do you design in?",
        answer: "The duration varies depending on the scope and complexity of the project. We strive to deliver high-quality work within a reasonable timeframe, ensuring both efficiency and excellence.",
    },
    {
        question: "What is your design process like?",
        answer: "Our design process is collaborative and transparent. It typically involves initial consultation, concept development, feedback iterations, and finalization. We prioritize client input and strive to exceed expectations at every stage.",
    },
    {
        question: "Can I request revisions to the design?",
        answer: "Absolutely! We welcome your feedback and offer unlimited revisions to ensure your complete satisfaction with the final design. Your input is invaluable in achieving the desired outcome for your project.",
    },
    {
        question: "Do you provide support after project completion?",
        answer: "Yes, we believe in building long-term relationships with our clients. We offer post-project support to address any questions or issues that may arise, ensuring a seamless experience even after project completion.",
    },
    {
        question: "Can I see examples of your previous work?",
        answer: "Certainly! We have a Dribble showcasing our past projects and client testimonials. Feel free to explore our Dribble to see the quality of our work and the level of satisfaction among our clients.",
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
