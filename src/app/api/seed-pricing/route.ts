import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_WRITE_TOKEN;


const DEFAULT_PLANS = [
    {
        name: "Flexible",
        price: { price: 299900, period_unit: "mo" },
        metadata: {
            credits: 1,
            add_ons: 0,
            target_audience: "Best for immediate design needs.",
            features: ["2-3 days turnaround", "Unlimited brands", "Unlimited users", "Stock photos", "Source files"],
            "sub-features": {}
        }
    },
    {
        name: "Standard",
        price: { price: 499900, period_unit: "mo" },
        metadata: {
            credits: 2,
            add_ons: 1,
            target_audience: "Ideal for scaling startups.",
            features: ["1-2 days turnaround", "Everything in Flexible", "Priority support", "Native source files"],
            "sub-features": {}
        }
    },
    {
        name: "Pro",
        price: { price: 899900, period_unit: "mo" },
        metadata: {
            credits: 4,
            add_ons: 2,
            target_audience: "Perfect for larger agencies.",
            features: ["Same day turnaround option", "Dedicated account manager", "Everything in Standard"],
            "sub-features": {}
        }
    }
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

        let plansData = DEFAULT_PLANS;
        try {
            const apiRes = await fetch('https://app.picassofusion.com/backend/api/credit-payments/plans');
            if (apiRes.ok) {
                plansData = await apiRes.json();
            }
        } catch (e) {
            console.warn("Using default plans for seed due to API error or unreachable.");
        }

        const sanityPlans = plansData.map((plan: any, index) => {
            const subFeaturesObj = plan.metadata["sub-features"] || {};
            const subFeaturesArray = Object.entries(subFeaturesObj).map(([configCategory, featuresMap]: [string, any]) => ({
                _key: configCategory.replace(/\s+/g, '-'),
                name: configCategory,
                features: Object.entries(featuresMap).map(([label, val]) => ({
                    _key: label.replace(/\s+/g, '-'),
                    label: label,
                    value: String(val)
                }))
            }));

            return {
                _key: `plan-${index}`,
                title: plan.name,
                price: plan.price.price / 100,
                period: `/${plan.price.period_unit}`,
                description: plan.metadata.target_audience,
                features: plan.metadata.features || [],
                subFeatures: subFeaturesArray,
                credits: plan.metadata.credits,
                addOns: plan.metadata.add_ons,
                buttonLabel: "Get Started",
                secondaryButton: "Book a call",
                highlight: index === 1,
                badge: index === 1 ? "Most Popular" : undefined
            };
        });

        const pricingDoc = {
            _type: 'pricing',
            heading: "Flexible Plans Tailored to Your Needs",
            subtitle: "Find the plan that fits your needs best with no surprises and No hidden fees.",
            plans: sanityPlans
        };

        transaction.createOrReplace({ _id: 'pricing', ...pricingDoc });

        await transaction.commit();

        return NextResponse.json({ message: "Seeded Pricing data successfully!" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
