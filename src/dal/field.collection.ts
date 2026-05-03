import type { EntityFieldType } from './types.js';

export interface FieldFlags {
  primaryKey?: boolean;
  required?: boolean;
  nullable?: boolean;
  translatable?: boolean;
}

export interface FieldEntry {
  name: string;
  type: EntityFieldType;
  flags?: FieldFlags;
  defaultValue?: unknown;
  reference?: string;
}

export class FieldCollection {
  private fields: FieldEntry[] = [];

  add(field: FieldEntry): this {
    this.fields.push(field);
    return this;
  }

  toArray(): FieldEntry[] {
    return [...this.fields];
  }

  has(name: string): boolean {
    return this.fields.some((f) => f.name === name);
  }

  get(name: string): FieldEntry | undefined {
    return this.fields.find((f) => f.name === name);
  }

  get length(): number {
    return this.fields.length;
  }
}
