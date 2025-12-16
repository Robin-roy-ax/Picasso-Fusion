
export type ProcessSection = {
  _id: string;
  _type: "processSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  heading?: string;
  headingHighlight?: string;
  subHeading?: string;
  subHeadingHighlight?: string;
  description?: string;
};

export type Process = {
  _id: string;
  _type: "process";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
};

export type FaqSection = {
  _id: string;
  _type: "faqSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  titleHighlight?: string;
  description?: string;
};

export type Faq = {
  _id: string;
  _type: "faq";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  question?: string;
  slug?: Slug;
  answer?: string;
};

export type HomepageValue = {
  _id: string;
  _type: "homepageValue";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  tag?: string;
  slug?: Slug;
  color?: Color;
  title?: string;
  description?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  isLink?: boolean;
};

export type WorkSection = {
  _id: string;
  _type: "workSection";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaUrl?: string;
};

export type Work = {
  _id: string;
  _type: "work";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  title?: string;
  slug?: Slug;
  description?: string;
  client?: string;
  timeline?: string;
  services?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "service";
  };
  tags?: Array<string>;
  route?: string;
  website?: string;
  mainImage?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
  video?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.fileAsset";
    };
    media?: unknown;
    _type: "file";
  };
  testimonial?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "testimonial";
  };
  strategies?: Array<{
    tag?: string;
    title?: string;
    _type: "strategy";
    _key: string;
  }>;
  body?: Array<{
    children?: Array<{
      marks?: Array<string>;
      text?: string;
      _type: "span";
      _key: string;
    }>;
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
    listItem?: "bullet";
    markDefs?: Array<{
      href?: string;
      _type: "link";
      _key: string;
    }>;
    level?: number;
    _type: "block";
    _key: string;
  } | {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
};

export type Testimonial = {
  _id: string;
  _type: "testimonial";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
  title?: string;
  quote?: string;
  image?: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  };
};

export type Service = {
  _id: string;
  _type: "service";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  name?: string;
  slug?: Slug;
};

export type Pricing = {
  _id: string;
  _type: "pricing";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  heading?: string;
  subtitle?: string;
  plans?: Array<{
    title?: string;
    price?: number;
    period?: string;
    description?: string;
    features?: Array<string>;
    credits?: number;
    addOns?: number;
    buttonLabel?: string;
    secondaryButton?: string;
    highlight?: boolean;
    badge?: string;
    subFeatures?: Array<{
      name?: string;
      features?: Array<{
        label?: string;
        value?: string;
        _key: string;
      }>;
      _type: "category";
      _key: string;
    }>;
    _key: string;
  }>;
};

export type AboutPage = {
  _id: string;
  _type: "aboutPage";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  hero?: {
    title?: string;
    titleHighlight?: string;
    description?: string;
    heroImage?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    };
  };
  overview?: {
    text?: string;
  };
  sections?: Array<{
    title?: string;
    description?: string;
    _key: string;
  }>;
  stats?: Array<{
    value?: number;
    suffix?: string;
    label?: string;
    _key: string;
  }>;
  team?: {
    title?: string;
    titleHighlight?: string;
    description?: string;
    members?: Array<{
      name?: string;
      role?: string;
      description?: string;
      image?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        media?: unknown;
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: "image";
      };
      _key: string;
    }>;
  };
};

export type About = {
  _id: string;
  _type: "about";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  mainText?: {
    part1?: string;
    part2?: string;
    part3?: string;
    part4?: string;
    part5?: string;
    part6?: string;
    part7?: string;
  };
  buttonText?: string;
};

export type Hero = {
  _id: string;
  _type: "hero";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  subtitle?: string;
  mainHeading?: {
    part1?: string;
    part1Italic?: string;
    part2?: string;
    part2Italic?: string;
  };
  description?: string;
  buttons?: {
    primary?: string;
    secondary?: string;
  };
  avatars?: Array<{
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }>;
  clientCount?: {
    number?: string;
    description?: string;
  };
  scrollText?: string;
};

export type Footer = {
  _id: string;
  _type: "footer";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  ctaSection?: {
    heading?: string;
    subHeading?: string;
    description?: string;
    buttonText?: string;
  };
  newsletterHeading?: string;
  socialLinks?: Array<{
    label?: string;
    href?: string;
    _key: string;
  }>;
  menuLinks?: Array<{
    label?: string;
    href?: string;
    id?: string;
    _key: string;
  }>;
  copyright?: string;
  tagline?: string;
};

export type Navigation = {
  _id: string;
  _type: "navigation";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  items?: Array<{
    label?: string;
    href?: string;
    id?: string;
    _key: string;
  }>;
  logo?: {
    text?: string;
    symbol?: string;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
  };
  ctaText?: string;
};

export type BlockContent = Array<{
  children?: Array<{
    marks?: Array<string>;
    text?: string;
    _type: "span";
    _key: string;
  }>;
  style?: "normal" | "h1" | "h2" | "h3" | "h4" | "blockquote";
  listItem?: "bullet";
  markDefs?: Array<{
    href?: string;
    _type: "link";
    _key: string;
  }>;
  level?: number;
  _type: "block";
  _key: string;
} | {
  asset?: {
    _ref: string;
    _type: "reference";
    _weak?: boolean;
    [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
  };
  media?: unknown;
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
  alt?: string;
  _type: "image";
  _key: string;
}>;

export type Color = {
  _type: "color";
  hex?: string;
  alpha?: number;
  hsl?: HslaColor;
  hsv?: HsvaColor;
  rgb?: RgbaColor;
};

export type RgbaColor = {
  _type: "rgbaColor";
  r?: number;
  g?: number;
  b?: number;
  a?: number;
};

export type HsvaColor = {
  _type: "hsvaColor";
  h?: number;
  s?: number;
  v?: number;
  a?: number;
};

export type HslaColor = {
  _type: "hslaColor";
  h?: number;
  s?: number;
  l?: number;
  a?: number;
};

export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch";
  background?: string;
  foreground?: string;
  population?: number;
  title?: string;
};

export type SanityImagePalette = {
  _type: "sanity.imagePalette";
  darkMuted?: SanityImagePaletteSwatch;
  lightVibrant?: SanityImagePaletteSwatch;
  darkVibrant?: SanityImagePaletteSwatch;
  vibrant?: SanityImagePaletteSwatch;
  dominant?: SanityImagePaletteSwatch;
  lightMuted?: SanityImagePaletteSwatch;
  muted?: SanityImagePaletteSwatch;
};

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions";
  height?: number;
  width?: number;
  aspectRatio?: number;
};

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot";
  x?: number;
  y?: number;
  height?: number;
  width?: number;
};

export type SanityImageCrop = {
  _type: "sanity.imageCrop";
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
};

export type SanityFileAsset = {
  _id: string;
  _type: "sanity.fileAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  source?: SanityAssetSourceData;
};

export type SanityImageAsset = {
  _id: string;
  _type: "sanity.imageAsset";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  originalFilename?: string;
  label?: string;
  title?: string;
  description?: string;
  altText?: string;
  sha1hash?: string;
  extension?: string;
  mimeType?: string;
  size?: number;
  assetId?: string;
  uploadId?: string;
  path?: string;
  url?: string;
  metadata?: SanityImageMetadata;
  source?: SanityAssetSourceData;
};

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata";
  location?: Geopoint;
  dimensions?: SanityImageDimensions;
  palette?: SanityImagePalette;
  lqip?: string;
  blurHash?: string;
  hasAlpha?: boolean;
  isOpaque?: boolean;
};

export type Geopoint = {
  _type: "geopoint";
  lat?: number;
  lng?: number;
  alt?: number;
};

export type Slug = {
  _type: "slug";
  current?: string;
  source?: string;
};

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData";
  name?: string;
  id?: string;
  url?: string;
};

export type AllSanitySchemaTypes = ProcessSection | Process | FaqSection | Faq | HomepageValue | WorkSection | Work | Testimonial | Service | Pricing | AboutPage | About | Hero | Footer | Navigation | BlockContent | Color | RgbaColor | HsvaColor | HslaColor | SanityImagePaletteSwatch | SanityImagePalette | SanityImageDimensions | SanityImageHotspot | SanityImageCrop | SanityFileAsset | SanityImageAsset | SanityImageMetadata | Geopoint | Slug | SanityAssetSourceData;
export declare const internalGroqTypeReferenceTo: unique symbol;
// Source: ./src/sanity/lib/queries.ts
// Variable: HERO_QUERY
// Query: *[_type == "hero"][0]{    subtitle,    mainHeading,    description,    buttons,    avatars[]{      ...,      asset->    },    clientCount,    scrollText}
export type HERO_QUERYResult = {
  subtitle: string | null;
  mainHeading: {
    part1?: string;
    part1Italic?: string;
    part2?: string;
    part2Italic?: string;
  } | null;
  description: string | null;
  buttons: {
    primary?: string;
    secondary?: string;
  } | null;
  avatars: Array<{
    asset: {
      _id: string;
      _type: "sanity.imageAsset";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      originalFilename?: string;
      label?: string;
      title?: string;
      description?: string;
      altText?: string;
      sha1hash?: string;
      extension?: string;
      mimeType?: string;
      size?: number;
      assetId?: string;
      uploadId?: string;
      path?: string;
      url?: string;
      metadata?: SanityImageMetadata;
      source?: SanityAssetSourceData;
    } | null;
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
    _key: string;
  }> | null;
  clientCount: {
    number?: string;
    description?: string;
  } | null;
  scrollText: string | null;
} | null;
// Variable: PRICING_QUERY
// Query: *[_type == "pricing"][0]{    heading,    subtitle,    plans[]{        ...,        subFeatures[]{            name,            features[]{                label,                value            }        }    }}
export type PRICING_QUERYResult = {
  heading: string | null;
  subtitle: string | null;
  plans: Array<{
    title?: string;
    price?: number;
    period?: string;
    description?: string;
    features?: Array<string>;
    credits?: number;
    addOns?: number;
    buttonLabel?: string;
    secondaryButton?: string;
    highlight?: boolean;
    badge?: string;
    subFeatures: Array<{
      name: string | null;
      features: Array<{
        label: string | null;
        value: string | null;
      }> | null;
    }> | null;
    _key: string;
  }> | null;
} | null;
// Variable: ABOUT_QUERY
// Query: *[_type == "about"][0]{    mainText,    buttonText}
export type ABOUT_QUERYResult = {
  mainText: {
    part1?: string;
    part2?: string;
    part3?: string;
    part4?: string;
    part5?: string;
    part6?: string;
    part7?: string;
  } | null;
  buttonText: string | null;
} | null;
// Variable: NAVBAR_QUERY
// Query: *[_type == "navigation"][0]{    items,    logo,    ctaText}
export type NAVBAR_QUERYResult = {
  items: Array<{
    label?: string;
    href?: string;
    id?: string;
    _key: string;
  }> | null;
  logo: {
    text?: string;
    symbol?: string;
    image?: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
  } | null;
  ctaText: string | null;
} | null;
// Variable: FOOTER_QUERY
// Query: *[_type == "footer"][0]{    ctaSection,    newsletterHeading,    socialLinks,    menuLinks,    copyright,    tagline}
export type FOOTER_QUERYResult = {
  ctaSection: {
    heading?: string;
    subHeading?: string;
    description?: string;
    buttonText?: string;
  } | null;
  newsletterHeading: string | null;
  socialLinks: Array<{
    label?: string;
    href?: string;
    _key: string;
  }> | null;
  menuLinks: Array<{
    label?: string;
    href?: string;
    id?: string;
    _key: string;
  }> | null;
  copyright: string | null;
  tagline: string | null;
} | null;
// Variable: BENEFITS_QUERY
// Query: *[_type == "homepageValue"]{    _id,    tag,    slug,    title,    color,    description,    image,    isLink}
export type BENEFITS_QUERYResult = Array<{
  _id: string;
  tag: string | null;
  slug: Slug | null;
  title: string | null;
  color: Color | null;
  description: string | null;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
  isLink: boolean | null;
}>;
// Variable: PROCESS_QUERY
// Query: {    "section": *[_type == "processSection"][0]{        heading,        headingHighlight,        subHeading,        subHeadingHighlight,        description    },    "items": *[_type == "process"]{        _id,        title,        description,        image    }  }
export type PROCESS_QUERYResult = {
  section: {
    heading: string | null;
    headingHighlight: string | null;
    subHeading: string | null;
    subHeadingHighlight: string | null;
    description: string | null;
  } | null;
  items: Array<{
    _id: string;
    title: string | null;
    description: string | null;
    image: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
  }>;
};
// Variable: WORKS_QUERY
// Query: {    "section": *[_type == "workSection"][0]{      heading,      description,      ctaText,      ctaUrl    },    "items": *[_type == "work"]{      _id,      title,      slug,      description,      tags,      route,      client,      timeline,      services->{name},      website,      mainImage,      video{asset->{url}},      testimonial->,      strategies,      body    }  }
export type WORKS_QUERYResult = {
  section: {
    heading: string | null;
    description: string | null;
    ctaText: string | null;
    ctaUrl: string | null;
  } | null;
  items: Array<{
    _id: string;
    title: string | null;
    slug: Slug | null;
    description: string | null;
    tags: Array<string> | null;
    route: string | null;
    client: string | null;
    timeline: string | null;
    services: {
      name: string | null;
    } | null;
    website: string | null;
    mainImage: {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
    video: {
      asset: {
        url: string | null;
      } | null;
    } | null;
    testimonial: {
      _id: string;
      _type: "testimonial";
      _createdAt: string;
      _updatedAt: string;
      _rev: string;
      name?: string;
      slug?: Slug;
      title?: string;
      quote?: string;
      image?: {
        asset?: {
          _ref: string;
          _type: "reference";
          _weak?: boolean;
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
        };
        media?: unknown;
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: "image";
      };
    } | null;
    strategies: Array<{
      tag?: string;
      title?: string;
      _type: "strategy";
      _key: string;
    }> | null;
    body: Array<{
      children?: Array<{
        marks?: Array<string>;
        text?: string;
        _type: "span";
        _key: string;
      }>;
      style?: "blockquote" | "h1" | "h2" | "h3" | "h4" | "normal";
      listItem?: "bullet";
      markDefs?: Array<{
        href?: string;
        _type: "link";
        _key: string;
      }>;
      level?: number;
      _type: "block";
      _key: string;
    } | {
      asset?: {
        _ref: string;
        _type: "reference";
        _weak?: boolean;
        [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
      };
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
      _key: string;
    }> | null;
  }>;
};
// Variable: TESTIMONIALS_QUERY
// Query: *[_type == "testimonial"]{    _id,    name,    slug,    title,    quote,    image}
export type TESTIMONIALS_QUERYResult = Array<{
  _id: string;
  name: string | null;
  slug: Slug | null;
  title: string | null;
  quote: string | null;
  image: {
    asset?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    media?: unknown;
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    alt?: string;
    _type: "image";
  } | null;
}>;
// Variable: FAQ_LIST_QUERY
// Query: {    "section": *[_type == "faqSection"][0]{        title,        titleHighlight,        description    },    "items": *[_type == "faq"]{        _id,        question,        slug,        answer    }  }
export type FAQ_LIST_QUERYResult = {
  section: {
    title: string | null;
    titleHighlight: string | null;
    description: string | null;
  } | null;
  items: Array<{
    _id: string;
    question: string | null;
    slug: Slug | null;
    answer: string | null;
  }>;
};
// Variable: ABOUT_PAGE_QUERY
// Query: *[_type == "aboutPage"][0]{    hero {        ...,        heroImage {            ...,            asset->        }    },    overview,    sections,    stats,    team {        ...,        members[] {            ...,            image {                ...,                asset->            }        }    }}
export type ABOUT_PAGE_QUERYResult = {
  hero: {
    title?: string;
    titleHighlight?: string;
    description?: string;
    heroImage: {
      asset: {
        _id: string;
        _type: "sanity.imageAsset";
        _createdAt: string;
        _updatedAt: string;
        _rev: string;
        originalFilename?: string;
        label?: string;
        title?: string;
        description?: string;
        altText?: string;
        sha1hash?: string;
        extension?: string;
        mimeType?: string;
        size?: number;
        assetId?: string;
        uploadId?: string;
        path?: string;
        url?: string;
        metadata?: SanityImageMetadata;
        source?: SanityAssetSourceData;
      } | null;
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      alt?: string;
      _type: "image";
    } | null;
  } | null;
  overview: {
    text?: string;
  } | null;
  sections: Array<{
    title?: string;
    description?: string;
    _key: string;
  }> | null;
  stats: Array<{
    value?: number;
    suffix?: string;
    label?: string;
    _key: string;
  }> | null;
  team: {
    title?: string;
    titleHighlight?: string;
    description?: string;
    members: Array<{
      name?: string;
      role?: string;
      description?: string;
      image: {
        asset: {
          _id: string;
          _type: "sanity.imageAsset";
          _createdAt: string;
          _updatedAt: string;
          _rev: string;
          originalFilename?: string;
          label?: string;
          title?: string;
          description?: string;
          altText?: string;
          sha1hash?: string;
          extension?: string;
          mimeType?: string;
          size?: number;
          assetId?: string;
          uploadId?: string;
          path?: string;
          url?: string;
          metadata?: SanityImageMetadata;
          source?: SanityAssetSourceData;
        } | null;
        media?: unknown;
        hotspot?: SanityImageHotspot;
        crop?: SanityImageCrop;
        alt?: string;
        _type: "image";
      } | null;
      _key: string;
    }> | null;
  } | null;
} | null;

// Query TypeMap
import "@sanity/client";
declare module "@sanity/client" {
  interface SanityQueries {
    "*[_type == \"hero\"][0]{\n    subtitle,\n    mainHeading,\n    description,\n    buttons,\n    avatars[]{\n      ...,\n      asset->\n    },\n    clientCount,\n    scrollText\n}": HERO_QUERYResult;
    "*[_type == \"pricing\"][0]{\n    heading,\n    subtitle,\n    plans[]{\n        ...,\n        subFeatures[]{\n            name,\n            features[]{\n                label,\n                value\n            }\n        }\n    }\n}": PRICING_QUERYResult;
    "*[_type == \"about\"][0]{\n    mainText,\n    buttonText\n}": ABOUT_QUERYResult;
    "*[_type == \"navigation\"][0]{\n    items,\n    logo,\n    ctaText\n}": NAVBAR_QUERYResult;
    "*[_type == \"footer\"][0]{\n    ctaSection,\n    newsletterHeading,\n    socialLinks,\n    menuLinks,\n    copyright,\n    tagline\n}": FOOTER_QUERYResult;
    "*[_type == \"homepageValue\"]{\n    _id,\n    tag,\n    slug,\n    title,\n    color,\n    description,\n    image,\n    isLink\n}": BENEFITS_QUERYResult;
    "{\n    \"section\": *[_type == \"processSection\"][0]{\n        heading,\n        headingHighlight,\n        subHeading,\n        subHeadingHighlight,\n        description\n    },\n    \"items\": *[_type == \"process\"]{\n        _id,\n        title,\n        description,\n        image\n    }\n  }": PROCESS_QUERYResult;
    "{\n    \"section\": *[_type == \"workSection\"][0]{\n      heading,\n      description,\n      ctaText,\n      ctaUrl\n    },\n    \"items\": *[_type == \"work\"]{\n      _id,\n      title,\n      slug,\n      description,\n      tags,\n      route,\n      client,\n      timeline,\n      services->{name},\n      website,\n      mainImage,\n      video{asset->{url}},\n      testimonial->,\n      strategies,\n      body\n    }\n  }": WORKS_QUERYResult;
    "*[_type == \"testimonial\"]{\n    _id,\n    name,\n    slug,\n    title,\n    quote,\n    image\n}": TESTIMONIALS_QUERYResult;
    "{\n    \"section\": *[_type == \"faqSection\"][0]{\n        title,\n        titleHighlight,\n        description\n    },\n    \"items\": *[_type == \"faq\"]{\n        _id,\n        question,\n        slug,\n        answer\n    }\n  }": FAQ_LIST_QUERYResult;
    "*[_type == \"aboutPage\"][0]{\n    hero {\n        ...,\n        heroImage {\n            ...,\n            asset->\n        }\n    },\n    overview,\n    sections,\n    stats,\n    team {\n        ...,\n        members[] {\n            ...,\n            image {\n                ...,\n                asset->\n            }\n        }\n    }\n}": ABOUT_PAGE_QUERYResult;
  }
}
