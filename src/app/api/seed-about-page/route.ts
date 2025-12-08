import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

const token = process.env.SANITY_API_WRITE_TOKEN;

const ABOUT_US_DATA = {
    hero: {
        title: "Innovate,",
        titleHighlight: "Elevate & Design.",
        description: "Unlock your creative potential with us, offering limitless possibilities to transform your concepts into stunning realities.",
        imageUrl: "https://framerusercontent.com/images/IjRP7RIug6UNzqeHbNO5WxD3FDk.jpg"
    },
    overview: {
        text: "Picasso Fusion delivers high quality, personalized designs through a simple credit based system. Our team turns your ideas into impactful visuals across every design need. Fast, flexible, and seamless in elevating your brand with ease.",
    },
    mission: {
        title: "Top-Notch Equipment",
        description: "We leverage cutting-edge tools and technology to deliver exceptional quality and precision in every design. Our state-of-the-art equipment ensures that your vision is brought to life with unparalleled excellence.",
    },
    approach: {
        title: "Dedicated Team",
        description: "Our team of skilled professionals are passionate about creating designs that inspire. With expertise and commitment, we work collaboratively to bring innovative ideas to fruition.",
    },
    pioneer: {
        title: "Pioneering the Path in Design",
        description: "We are at the forefront of design trends, always pushing boundaries and exploring new possibilities. Our innovative approach ensures that we stay ahead of the curve and deliver cutting-edge solutions.",
    },
    stats: [
        { value: 100, suffix: "+", label: "Projects completed" },
        { value: 12, suffix: "", label: "Industry awards" },
        { value: 98, suffix: "%", label: "Client Satisfaction" },
        { value: 125, suffix: "K", label: "ROI achieved for clients" },
    ],
    team: {
        title: "Meet Our",
        titleHighlight: "Team",
        description: "Discover the Exceptional Talent Shaping Picasso Fusion's Innovative Solutions and Remarkable Achievements",
        members: [
            {
                name: "Karim Benzema",
                role: "Founder/Creative Director",
                imageUrl: "https://framerusercontent.com/images/EmrjuKhlE2MYwMMNxmKiVqqR4.png",
                description: "Karim is the visionary behind Picasso Fusion, leading the team with his passion for creativity and innovation.",
            },
            {
                name: "Matthew Davis",
                role: "Brand Strategist",
                imageUrl: "https://framerusercontent.com/images/EFyr6qMiyaDXQ7NXQBtz3PZUM.png",
                description: "Matthew is a master storyteller who helps our clients build strong and memorable brands.",
            },
            {
                name: "Maqsood",
                role: "Senior Product Designer",
                imageUrl: "https://framerusercontent.com/images/KvYpZpFddcRRqVruxUZfmzSh0.png",
                description: "Maqsood is a creative powerhouse who brings ideas to life with his impeccable design skills."
            },
            {
                name: "Daniel Mitchell",
                role: "Digital Marketing Manager",
                imageUrl: "https://framerusercontent.com/images/2SxzBFprM3cmjAl5NQvLmgktkY.png",
                description: "Daniel is a strategic thinker with a passion for digital marketing."
            },
            {
                name: "Ali Hassan",
                role: "Lead Web Developer",
                imageUrl: "https://framerusercontent.com/images/YfiWn0gVlP7wcJSozAnGEpbzYs.png?scale-down-to=1024",
                description: "Ali Hassan is a coding wizard with a knack for turning complex ideas into seamless digital experiences."
            },
            {
                name: "Ryan Johnson",
                role: "Motion Graphics Designer",
                imageUrl: "https://framerusercontent.com/images/w3zFIzqHBzSu5Fc9GhlQnPk1Ppc.png",
                description: "Ryan is a creative genius who brings motion to our projects with stunning animations and visuals."
            }
        ]
    }
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

       
        let heroAssetId;
        try {
            const res = await fetch(ABOUT_US_DATA.hero.imageUrl);
            if (res.ok) {
                const blob = await res.blob();
                const buffer = Buffer.from(await blob.arrayBuffer());
                const asset = await clientWithToken.assets.upload('image', buffer, { filename: 'about-hero.jpg' });
                heroAssetId = asset._id;
            }
        } catch (e) { console.warn("Hero image fetch failed", e); }

        const teamMembers = [];
        for (const member of ABOUT_US_DATA.team.members) {
            let memberAssetId;
            try {
                const res = await fetch(member.imageUrl);
                if (res.ok) {
                    const blob = await res.blob();
                    const buffer = Buffer.from(await blob.arrayBuffer());
                    const asset = await clientWithToken.assets.upload('image', buffer, { filename: member.name + '.png' });
                    memberAssetId = asset._id;
                }
            } catch (e) { console.warn(`Team member image failed for ${member.name}`, e); }

            teamMembers.push({
                _key: member.name.replace(/\s+/g, '-').toLowerCase(),
                name: member.name,
                role: member.role,
                description: member.description,
                image: memberAssetId ? {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: memberAssetId },
                    alt: member.name
                } : undefined
            });
        }


        const aboutPageDoc = {
            _type: 'aboutPage',
            hero: {
                title: ABOUT_US_DATA.hero.title,
                titleHighlight: ABOUT_US_DATA.hero.titleHighlight,
                description: ABOUT_US_DATA.hero.description,
                heroImage: heroAssetId ? {
                    _type: 'image',
                    asset: { _type: 'reference', _ref: heroAssetId },
                    alt: "About Hero Image"
                } : undefined
            },
            overview: {
                text: ABOUT_US_DATA.overview.text
            },
            sections: [
                { _key: 'mission', title: ABOUT_US_DATA.mission.title, description: ABOUT_US_DATA.mission.description },
                { _key: 'approach', title: ABOUT_US_DATA.approach.title, description: ABOUT_US_DATA.approach.description },
                { _key: 'pioneer', title: ABOUT_US_DATA.pioneer.title, description: ABOUT_US_DATA.pioneer.description },
            ],
            stats: ABOUT_US_DATA.stats.map(s => ({ ...s, _key: s.label.replace(/\s+/g, '-') })),
            team: {
                title: ABOUT_US_DATA.team.title,
                titleHighlight: ABOUT_US_DATA.team.titleHighlight,
                description: ABOUT_US_DATA.team.description,
                members: teamMembers
            }
        };

        transaction.create(aboutPageDoc);
        await transaction.commit();

        return NextResponse.json({ message: "Seeded About Page data successfully!" });
    } catch (error) {
        console.error("Seeding failed:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
