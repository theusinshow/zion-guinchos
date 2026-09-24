/**
 * Fonte única dos dados operacionais da Zion Guincho.
 * Somente dados confirmados (docs/SOURCE-OF-TRUTH.md §1). Pendentes = null.
 * Nunca preencher por inferência — ver docs/OPEN-ITEMS.md.
 */
export const business = {
  name: 'Zion Guincho',
  baseCity: 'Palhoça',
  state: 'SC',
  serviceAreas: ['Palhoça', 'São José', 'Florianópolis'],
  is24Hours: true,

  // TODO(P0): telefone e WhatsApp pendentes — bloqueiam produção.
  phoneE164: null as string | null,
  phoneDisplay: null as string | null,
  whatsappE164: null as string | null,
  whatsappDisplay: null as string | null,

  // TODO(P1): nome do proprietário e uma frase dele, confirmados pelo cliente (DEC-038). null = não exibe.
  ownerName: null as string | null,
  ownerQuote: null as string | null,

  // TODO(P1): CNPJ só após confirmação de publicação.
  cnpj: null as string | null,

  // TODO(P1): URL da Política de Privacidade aprovada. null = link pendente (bloqueia release).
  privacyPolicyUrl: null as string | null,

  // TODO(P1): foto real da seção Sobre (DEC-021). null = bloco neutro.
  aboutImage: '/images/generated/zion-about-truck.webp' as string | null,
  // DEC-037: a imagem atual é placeholder de IA; enquanto true, a guarda de release continua bloqueando.
  aboutImageIsPlaceholder: true as boolean,

  whatsappMessages: {
    default: 'Olá, preciso de atendimento da Zion Guincho.',
    location: 'Olá, preciso de um guincho. Vou enviar minha localização.',
  },
} as const

export type WhatsappMessageKey = keyof typeof business.whatsappMessages
