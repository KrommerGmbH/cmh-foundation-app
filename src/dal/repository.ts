import type { DataAdapter } from './data-adapter.js';
import { getEntityDefinition } from './entity-registry.js';
import type { Entity, SearchResult } from './types.js';
import { Criteria } from './criteria.js';

export class Repository<T extends Entity> {
  constructor(
    private readonly entityName: string,
    private readonly adapter: DataAdapter,
  ) {}

  get entity(): string {
    return this.entityName;
  }

  create(initial: Partial<T> = {}): T {
    return {
      id: crypto.randomUUID(),
      ...initial,
    } as T;
  }

  async search(criteria: Criteria): Promise<SearchResult<T>> {
    const definition = getEntityDefinition(this.entityName);
    if (!definition) {
      throw new Error(`[cmh-foundation-app:Repository] Unknown entity: ${this.entityName}`);
    }
    return this.adapter.search<T>(this.entityName, criteria);
  }

  async save(entity: T): Promise<T> {
    return this.adapter.save<T>(this.entityName, entity);
  }

  async get(id: string): Promise<T | null> {
    return this.adapter.get<T>(this.entityName, id);
  }

  async delete(id: string): Promise<boolean> {
    return this.adapter.delete(this.entityName, id);
  }

  async remove(id: string): Promise<boolean> {
    return this.delete(id);
  }
}
