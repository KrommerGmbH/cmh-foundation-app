import type { Entity } from './types.js';
import type { DataAdapter } from './data-adapter.js';
import { getEntityDefinition } from './entity-registry.js';
import { Repository } from './repository.js';

export class RepositoryFactory {
  constructor(private readonly adapter: DataAdapter) {}

  create<T extends Entity>(entityName: string): Repository<T> {
    const definition = getEntityDefinition(entityName);
    if (!definition) {
      throw new Error(
        `[cmh-foundation-app:RepositoryFactory] Entity "${entityName}" is not registered. ` +
        `Call EntityRegistry.register() or import entity definitions first.`,
      );
    }
    return new Repository<T>(entityName, this.adapter);
  }

  get dataAdapter(): DataAdapter {
    return this.adapter;
  }
}
