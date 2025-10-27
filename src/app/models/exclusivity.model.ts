export interface ExclusivityRule {
  filterId: string;
  exclusiveWith: string[];
  group?: string;
  priority?: number;
}
