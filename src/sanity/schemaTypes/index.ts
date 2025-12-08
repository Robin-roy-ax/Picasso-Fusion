import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { workType } from './works/workType'
import { serviceType } from './works/services'
import { testimonialType } from './works/testimonials'
import { workSectionType } from './works/workSectionType'
import { homepageValueType } from './homepage/valuesTypes'
import { pricingType } from './homepage/pricingType'
import { faqType } from './faqType'
import { faqSectionType } from './faqSectionType'
import { heroType } from './homepage/heroType'
import { aboutType } from './homepage/aboutType'
import { aboutPageType } from './homepage/aboutPageType'
import { footerType } from './shared/footerType'
import { navigationType } from './shared/navigationType'

import { processType } from './process/processType'
import { processSectionType } from './process/processSectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType, navigationType, footerType,
    heroType, aboutType, aboutPageType, pricingType,
    serviceType, testimonialType, workType, workSectionType,
    homepageValueType,
    faqType, faqSectionType,
    
    processType, processSectionType,
  ],
}
