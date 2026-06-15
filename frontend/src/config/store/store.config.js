import { themeConfig } from '../theme/theme.config'
import { ecosystemConfig } from '../ecosystem/ecosystem.config'
import logoRoccart from '../../assets/roccart/logo-colorida-cortada.PNG'

export const storeConfig = {
  brand: {
    name: 'Cia. Roccart',
    tagline: '',
    description:
      'Camisetas autorais criadas para expressar fé, arte e identidade com elegância.',
    logo: logoRoccart,
  },

  contact: {
    whatsapp: '5521990387622',
    email: '',
    instagram: '@cia.roccart',
  },

  locale: {
    currency: 'BRL',
    language: 'pt-BR',
  },

  checkout: {
    enabled: true,
    method: 'whatsapp',
  },

  theme: themeConfig,

  ecosystem: ecosystemConfig,
}
