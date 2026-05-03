// ─── Shopware DAL-compatible Criteria ────────────────────

export interface CriteriaFilter {
  type: string;
  field?: string;
  value?: unknown;
  operator?: 'AND' | 'OR' | 'and' | 'or';
  queries?: CriteriaFilter[];
  parameters?: Record<string, unknown>;
}

export interface CriteriaSorting {
  field: string;
  order: 'ASC' | 'DESC';
}

export class Criteria {
  page = 1;
  limit = 25;
  filters: CriteriaFilter[] = [];
  sortings: CriteriaSorting[] = [];

  constructor(page?: number, limit?: number) {
    if (typeof page === 'number') this.page = page;
    if (typeof limit === 'number') this.limit = limit;
  }

  addFilter(filter: CriteriaFilter): this {
    this.filters.push(filter);
    return this;
  }

  addSorting(sorting: CriteriaSorting): this {
    this.sortings.push(sorting);
    return this;
  }

  setPage(page: number): this {
    this.page = page;
    return this;
  }

  setLimit(limit: number): this {
    this.limit = limit;
    return this;
  }

  static equals(field: string, value: unknown): CriteriaFilter {
    return { type: 'equals', field, value };
  }

  static equalsAny(field: string, value: unknown[]): CriteriaFilter {
    return { type: 'equalsAny', field, value };
  }

  static range(field: string, parameters: Record<string, unknown>): CriteriaFilter {
    return { type: 'range', field, parameters };
  }

  static not(operator: 'AND' | 'OR' | 'and' | 'or', queries: CriteriaFilter[]): CriteriaFilter {
    return { type: 'not', operator, queries };
  }

  static multi(operator: 'AND' | 'OR' | 'and' | 'or', queries: CriteriaFilter[]): CriteriaFilter {
    return { type: 'multi', operator, queries };
  }

  static contains(field: string, value: string): CriteriaFilter {
    return { type: 'contains', field, value };
  }

  static sort(field: string, order: 'ASC' | 'DESC' = 'ASC'): CriteriaSorting {
    return { field, order };
  }
}
