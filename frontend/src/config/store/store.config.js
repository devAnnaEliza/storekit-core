import { themeConfig } from '../theme/theme.config'
import { ecosystemConfig } from '../ecosystem/ecosystem.config'
import logoRoccart from '../../assets/roccart/logo-colorida.PNG'

export const storeConfig = {
  brand: {
    name: 'Roccart',
    tagline: '',
    description:
      'Camisetas autorais criadas para expressar fé, arte e identidade com elegância.',
    logo: logoRoccart,
  },

  contact: {
    whatsapp: '5521997277443',
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
