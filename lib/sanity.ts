import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: 'qet6hsi6', // Your project ID from the dashboard
  dataset: 'production', // or 'development'
  useCdn: true, // Enable CDN for faster response times
  apiVersion: '2024-01-01', // Use current date for API version
})

// Helper function for generating image URLs
const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: any) {
  return builder.image(source)
}

// Type definitions for Sanity data
export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

// Homepage data types
export interface HeroSection {
  tagline: string
  description: string
  ctaText: string
  ctaLink: string
  heroImages: SanityImage[]
}

export interface InfoCard {
  title: string
  description: string
  icon: SanityImage
}

export interface KeyInfoSection {
  cards: InfoCard[]
}

export interface TestimonialsSection {
  heading: string
  showReviewCount: number
  ctaText: string
  ctaLink: string
}

export interface FindUsSection {
  heading: string
  address: string
  mapImage: SanityImage
  mapIllustration: SanityImage
}

export interface HomepageData {
  hero: HeroSection
  keyInfo: KeyInfoSection
  testimonials: TestimonialsSection
  findUs: FindUsSection
}

// GROQ queries
export const homepageQuery = `
  *[_type == "homepage"][0] {
    hero {
      tagline,
      description,
      ctaText,
      ctaLink,
      heroImages[] {
        ...,
        alt
      }
    },
    keyInfo {
      cards[] {
        title,
        description,
        icon {
          ...,
          alt
        }
      }
    },
    testimonials {
      heading,
      showReviewCount,
      ctaText,
      ctaLink
    },
    findUs {
      heading,
      address,
      mapImage {
        ...,
        alt
      },
      mapIllustration {
        ...,
        alt
      }
    }
  }
`

export const aboutPageQuery = `
  *[_type == "aboutPage"][0] {
    hero {
      title,
      subtitle,
      description,
      heroImage {
        ...,
        alt
      }
    },
    history {
      heading,
      content,
      images[] {
        ...,
        alt
      }
    },
    team {
      heading,
      members[] {
        name,
        role,
        bio,
        photo {
          ...,
          alt
        },
        qualifications
      }
    },
    values {
      heading,
      content,
      valuesList[] {
        title,
        description,
        icon {
          ...,
          alt
        }
      }
    },
    curriculum {
      heading,
      content,
      activities[] {
        title,
        description,
        ageGroup,
        image {
          ...,
          alt
        }
      }
    }
  }
`

export const termsPageQuery = `
  *[_type == "termsPage"][0] {
    hero {
      title,
      subtitle,
      lastUpdated
    },
    introduction {
      content
    },
    sections[] {
      heading,
      content,
      subsections[] {
        subheading,
        content
      }
    },
    admissionTerms {
      heading,
      ageRequirements,
      capacity,
      applicationProcess
    },
    feesAndPayments {
      heading,
      feeStructure,
      fundedHours,
      paymentTerms
    },
    policies {
      heading,
      safeguarding,
      healthSafety,
      behaviour,
      attendance
    },
    contact {
      heading,
      content,
      email,
      phone,
      address
    }
  }
`