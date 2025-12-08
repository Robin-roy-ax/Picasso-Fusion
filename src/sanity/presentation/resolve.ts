import {
    defineLocations,
    PresentationPluginOptions,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
    locations: {
        process: defineLocations({
            select: {
                title: "title",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        processSection: defineLocations({
            select: {
                title: "heading",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        homepageValue: defineLocations({
            select: {
                title: "title",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        hero: defineLocations({
            select: {
                title: "subtitle",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        about: defineLocations({
            select: {
                title: "mainText.part1",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        aboutPage: defineLocations({
            select: {
                title: "hero.title",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "About Us", href: `/about` },
                ],
            }),
        }),
        workSection: defineLocations({
            select: {
                title: "heading",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        pricing: defineLocations({
            select: {
                title: "heading",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        faq: defineLocations({
            select: {
                title: "question",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        faqSection: defineLocations({
            select: {
                title: "title",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        footer: defineLocations({
            select: {
                title: "copyright",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        work: defineLocations({
            select: {
                title: "title",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        testimonial: defineLocations({
            select: {
                title: "name",
            },
            resolve: (doc) => ({
                locations: [
                    { title: "Home", href: `/` },
                ],
            }),
        }),
        post: defineLocations({
            select: {
                title: "title",
                slug: "slug.current",
            },
            resolve: (doc) => ({
                locations: [
                    {
                        title: doc?.title || "Untitled",
                        href: `/blog/${doc?.slug}`,
                    },
                    { title: "Home", href: `/` },
                ],
            }),
        }),
    },
};