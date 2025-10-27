import { Injectable } from '@angular/core';
import { FilterState } from '../models/filter.model';

@Injectable({ providedIn: 'root' })
export class FilterDependencyService {
  private states: { [key: string]: FilterState } = {};

  constructor() {
    this.states['country'] = { value: '', enabled: true };
    this.states['state'] = { value: '', enabled: false };
    this.states['city'] = { value: '', enabled: false };
  }

  setFilterValue(id: string, value: string) {
    this.states[id].value = value;
    if (id === 'country') {
      this.states['state'].enabled = !!value;
      this.states['state'].value = undefined;
      this.states['city'].enabled = false;
      this.states['city'].value = undefined;
    }
    if (id === 'state') {
      this.states['city'].enabled = !!value;
      this.states['city'].value = undefined;
    }
    if (id === 'city') {
    }
  }

  getFilterState(id: string): FilterState {
    return this.states[id];
  }
}
