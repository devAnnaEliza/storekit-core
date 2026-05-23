import { themeConfig } from '../theme/theme.config'
import { ecosystemConfig } from '../ecosystem/ecosystem.config'

export const storeConfig = {
  brand: {
    name: 'StoreKit Core',
    tagline: 'E-commerce modular para marcas digitais',
    description:
      'Uma base reutilizável para lojas online com catálogo, carrinho e checkout via WhatsApp.',
    logo: null,
  },

  contact: {
    whatsapp: '5521997277443',
    email: '',
    instagram: '',
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
