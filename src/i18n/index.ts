export const FOUNDATION_SUPPORTED_LOCALES = [
  'ko-KR',
  'en-GB',
  'de-DE',
  'zh-CN',
  'ja-JP',
] as const

export type FoundationLocale = typeof FOUNDATION_SUPPORTED_LOCALES[number]

export { mergeMessages, withLocaleAliases, createAppI18n } from './helpers.js'
