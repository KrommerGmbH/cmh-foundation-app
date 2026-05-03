import type { Entity, SearchResult } from './types.js';
import type { Criteria } from './criteria.js';

export interface DataAdapter {
  search<T extends Entity>(entityName: string, criteria: Criteria): Promise<SearchResult<T>>;
  save<T extends Entity>(entityName: string, entity: T): Promise<T>;
  get<T extends Entity>(entityName: string, id: string): Promise<T | null>;
  delete(entityName: string, id: string): Promise<boolean>;
}
