// ─── Shopware DAL-compatible base types ─────────────────

export interface Entity {
  id: string;
  [key: string]: unknown;
}

export type ProviderType = 'cloud-api' | 'local-gguf' | 'self-hosted';
export type ModelType = 'chat' | 'embedding' | 'image' | 'tts' | 'stt' | 'code' | 'multimodal' | 'vision';

export type SupportedLocale = 'ko-KR' | 'en-GB' | 'de-DE' | 'zh-CN' | 'ja-JP';

export const SUPPORTED_LOCALES: SupportedLocale[] = ['ko-KR', 'en-GB', 'de-DE', 'zh-CN', 'ja-JP'];

export interface TranslationEntity extends Entity {
  entityId: string;
  locale: SupportedLocale;
  [key: string]: unknown;
}

export type EntityFieldType =
  | 'uuid'
  | 'string'
  | 'text'
  | 'boolean'
  | 'integer'
  | 'float'
  | 'datetime'
  | 'json';

export interface EntityFieldDefinition {
  name: string;
  type: EntityFieldType;
  required?: boolean;
  primary?: boolean;
  nullable?: boolean;
  defaultValue?: string;
  reference?: string;
}

export interface EntityIndexDefinition {
  name: string;
  fields: string[];
  unique?: boolean;
}

export interface DataEntityDefinition {
  entity: string;
  label: string;
  collection?: string;
  module?: string;
  fields: EntityFieldDefinition[];
  indexes?: EntityIndexDefinition[];
}

export interface SearchResult<T> {
  data: T[];
  total: number;
}
