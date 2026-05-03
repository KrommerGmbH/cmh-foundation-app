import { createI18n } from 'vue-i18n'

export function mergeMessages(...sources: Record<string, unknown>[]): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const src of sources) {
    Object.assign(result, src)
  }
  return result
}

export function withLocaleAliases(messages: Record<string, Record<string, unknown>>): Record<string, Record<string, unknown>> {
  return {
    ...messages,
    en: messages['en-GB'],
    de: messages['de-DE'],
    ko: messages['ko-KR'],
    zh: messages['zh-CN'],
    ja: messages['ja-JP'],
  }
}

export function createAppI18n(input: {
  locale: string
  fallbackLocale: string
  messages: Record<string, Record<string, unknown>>
}) {
  return createI18n({
    legacy: false,
    locale: input.locale,
    fallbackLocale: input.fallbackLocale,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: withLocaleAliases(input.messages) as any,
  })
}
