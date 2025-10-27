import { Injectable } from '@angular/core';
import { ExclusivityRule } from '../models/exclusivity.model';

@Injectable({ providedIn: 'root' })
export class MutualExclusivityService {
  private rules: ExclusivityRule[] = [];
  private selection: Set<string> = new Set();

  setRules(rules: ExclusivityRule[]) {
    this.rules = rules;
  }

  selectFilter(id: string) {
    this.selection.delete(id);
    const rule = this.rules.find(r => r.filterId === id);
    if (rule) {
      rule.exclusiveWith.forEach(exId => this.selection.delete(exId));
    }
    this.selection.add(id);
  }

  isDisabled(id: string): boolean {
    for (const selectedId of this.selection) {
      const rule = this.rules.find(r => r.filterId === selectedId);
      if (rule && rule.exclusiveWith.includes(id)) return true;
    }
    return false;
  }

  isSelected(id: string): boolean {
    return this.selection.has(id);
  }

  deselectFilter(id: string) {
    this.selection.delete(id);
  }
}
