import type { Entity, DataEntityDefinition, EntityFieldDefinition } from './types.js';
import { FieldCollection } from './field.collection.js';

export abstract class EntityDefinition<T extends Entity = Entity> {
  abstract getEntityName(): string;
  abstract defineFields(): FieldCollection;

  getLabel(): string {
    return this.getEntityName();
  }

  getModuleName(): string | undefined {
    return undefined;
  }

  getDefaults(): Partial<T> {
    return {};
  }

  create(initial: Partial<T> = {}): T {
    return {
      id: crypto.randomUUID(),
      ...this.getDefaults(),
      ...initial,
    } as T;
  }

  toDataDefinition(): DataEntityDefinition {
    const fields = this.defineFields().toArray();

    return {
      entity: this.getEntityName(),
      label: this.getLabel(),
      module: this.getModuleName(),
      fields: fields.map(
        (f): EntityFieldDefinition => ({
          name: f.name,
          type: f.type,
          required: f.flags?.required,
          primary: f.flags?.primaryKey,
          nullable: f.flags?.nullable,
          defaultValue: f.defaultValue != null ? String(f.defaultValue) : undefined,
          reference: f.reference,
        }),
      ),
    };
  }
}

export { FieldCollection };
