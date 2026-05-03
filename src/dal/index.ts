export type {
  Entity,
  ProviderType,
  ModelType,
  SupportedLocale,
  TranslationEntity,
  EntityFieldType,
  EntityFieldDefinition,
  EntityIndexDefinition,
  DataEntityDefinition,
  SearchResult,
} from './types.js'

export { SUPPORTED_LOCALES } from './types.js'

export { Criteria } from './criteria.js'
export type { CriteriaFilter, CriteriaSorting } from './criteria.js'

export type { DataAdapter } from './data-adapter.js'
export { FieldCollection } from './field.collection.js'
export type { FieldFlags, FieldEntry } from './field.collection.js'

export { EntityDefinition } from './entity.definition.js'
export { Repository } from './repository.js'

export {
  registerEntityDefinition,
  registerEntityDefinitionWithEvent,
  getEntityDefinition,
  getAllEntityDefinitions,
  unregisterEntityDefinition,
  replaceAllEntityDefinitions,
  subscribeEntityRegistry,
  getEntityRegistryRevision,
  EntityRegistry,
} from './entity-registry.js'

export { RepositoryFactory } from './repository-factory.js'
