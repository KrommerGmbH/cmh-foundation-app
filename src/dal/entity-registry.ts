import type { DataEntityDefinition } from './types.js';
import { EntityDefinition } from './entity.definition.js';

const registry = new Map<string, DataEntityDefinition>();

export function registerEntityDefinition(
  definition: DataEntityDefinition | EntityDefinition,
): void {
  if (definition instanceof EntityDefinition) {
    const data = definition.toDataDefinition();
    registry.set(data.entity, data);
  } else {
    registry.set(definition.entity, definition);
  }
}

export function getEntityDefinition(entityName: string): DataEntityDefinition | undefined {
  return registry.get(entityName);
}

export function getAllEntityDefinitions(): DataEntityDefinition[] {
  return Array.from(registry.values());
}

type RegistryChange =
  | { type: 'register'; entity: string }
  | { type: 'unregister'; entity: string }
  | { type: 'replaceAll' };

let registryRevision = 0;
const registrySubscribers = new Set<(change: RegistryChange, revision: number) => void>();

function emitChange(change: RegistryChange): void {
  registryRevision += 1;
  for (const fn of registrySubscribers) {
    try {
      fn(change, registryRevision);
    } catch {
      // no-op
    }
  }
}

export function unregisterEntityDefinition(entityName: string): boolean {
  const ok = registry.delete(entityName);
  if (ok) emitChange({ type: 'unregister', entity: entityName });
  return ok;
}

export function replaceAllEntityDefinitions(
  defs: Array<DataEntityDefinition | EntityDefinition>,
): void {
  registry.clear();
  for (const d of defs) {
    if (d instanceof EntityDefinition) {
      const data = d.toDataDefinition();
      registry.set(data.entity, data);
    } else {
      registry.set(d.entity, d);
    }
  }
  emitChange({ type: 'replaceAll' });
}

export function subscribeEntityRegistry(
  fn: (change: RegistryChange, revision: number) => void,
): () => void {
  registrySubscribers.add(fn);
  return () => registrySubscribers.delete(fn);
}

export function getEntityRegistryRevision(): number {
  return registryRevision;
}

const _originalRegister = registerEntityDefinition;
export function registerEntityDefinitionWithEvent(
  definition: DataEntityDefinition | EntityDefinition,
): void {
  _originalRegister(definition);
  const entity = definition instanceof EntityDefinition
    ? definition.toDataDefinition().entity
    : definition.entity;
  emitChange({ type: 'register', entity });
}

export const EntityRegistry = {
  register: registerEntityDefinitionWithEvent,
  unregister: unregisterEntityDefinition,
  replaceAll: replaceAllEntityDefinitions,
  get: getEntityDefinition,
  getAll: getAllEntityDefinitions,
  subscribe: subscribeEntityRegistry,
  get revision(): number { return registryRevision; },
};
