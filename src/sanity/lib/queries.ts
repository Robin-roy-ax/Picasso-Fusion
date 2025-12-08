import { defineQuery } from "next-sanity";

export const HERO_QUERY =
  defineQuery(`*[_type == "hero"][0]{
    subtitle,
    mainHeading,
    description,
    buttons,
    avatars[]{
      ...,
      asset->
    },
    clientCount,
    scrollText
}`);

export const PRICING_QUERY =
  defineQuery(`*[_type == "pricing"][0]{
    heading,
    subtitle,
    plans[]{
        ...,
        subFeatures[]{
            name,
            features[]{
                label,
                value
            }
        }
    }
}`);

export const ABOUT_QUERY =
  defineQuery(`*[_type == "about"][0]{
    mainText,
    buttonText
}`);

export const NAVBAR_QUERY =
  defineQuery(`*[_type == "navigation"][0]{
    items,
    logo,
    ctaText
}`);

export const FOOTER_QUERY =
  defineQuery(`*[_type == "footer"][0]{
    ctaSection,
    newsletterHeading,
    socialLinks,
    menuLinks,
    copyright,
    tagline
}`);

export const BENEFITS_QUERY =
  defineQuery(`*[_type == "homepageValue"]{
    _id,
    tag,
    slug,
    title,
    color,
    description,
    image,
    isLink
}`);

export const PROCESS_QUERY =
  defineQuery(`{
    "section": *[_type == "processSection"][0]{
        heading,
        headingHighlight,
        subHeading,
        subHeadingHighlight,
        description
    },
    "items": *[_type == "process"]{
        _id,
        title,
        description,
        image
    }
  }`);

export const WORKS_QUERY =
  defineQuery(`{
    "section": *[_type == "workSection"][0]{
      heading,
      description,
      ctaText,
      ctaUrl
    },
    "items": *[_type == "work"]{
      _id,
      title,
      slug,
      description,
      tags,
      route,
      client,
      timeline,
      services->{name},
      website,
      mainImage,
      video{asset->{url}},
      testimonial->,
      strategies,
      body
    }
  }`);

export const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial"]{
    _id,
    name,
    slug,
    title,
    quote,
    image
}`);

export const FAQ_LIST_QUERY =
  defineQuery(`{
    "section": *[_type == "faqSection"][0]{
        title,
        titleHighlight,
        description
    },
    "items": *[_type == "faq"]{
        _id,
        question,
        slug,
        answer
    }
  }`);

export const ABOUT_PAGE_QUERY =
  defineQuery(`*[_type == "aboutPage"][0]{
    hero {
        ...,
        heroImage {
            ...,
            asset->
        }
    },
    overview,
    sections,
    stats,
    team {
        ...,
        members[] {
            ...,
            image {
                ...,
                asset->
            }
        }
    }
}`);
