import { type SchemaTypeDefinition } from 'sanity'
import hero from './hero'
import howItWorks from './howItWorks'
import differentiators from './differentiators'
import globalConfig from './globalConfig'
import contactMessage from './contactMessage'
import aboutPage from './aboutPage'
import coveragesPage from './coveragesPage'
import { servicesPage } from './servicesPage'
import { testimonialsPage } from './testimonialsPage'
import { pqrsPage } from './pqrsPage'
import { legalPage } from './legalPage'
import insurerLogo from './insurerLogo'
import termAcceptance from './termAcceptance'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    hero,
    howItWorks,
    differentiators,
    globalConfig,
    contactMessage,
    aboutPage,
    coveragesPage,
    servicesPage,
    testimonialsPage,
    pqrsPage,
    legalPage,
    insurerLogo,
    termAcceptance
  ],
}
