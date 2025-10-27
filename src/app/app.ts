import { Component, signal } from '@angular/core';
import { FilterDependencyService } from './services/filter-dependency.service';
import { FilterComponent } from './components/filter/filter.component';
import { COUNTRIES, STATES, CITIES } from './mock-location-data';
import { OnInit } from '@angular/core';
import { FilterConfig } from './models/filter.model';
import { ExclusivityRule } from './models/exclusivity.model';
import { MutualExclusivityService } from './services/mutual-exclusivity.service';
import { ExclusivityFilterComponent } from './components/exclusivity-filter/exclusivity-filter.component'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FilterComponent, ExclusivityFilterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit {
  public readonly title = signal('filter-assessment');
  constructor(public filterService: FilterDependencyService, public exService: MutualExclusivityService) {}

  reset() {
    // clear selections by setting empty string (service uses truthiness)
    this.filterService.setFilterValue('country', '');
    this.filterService.setFilterValue('state', '');
    this.filterService.setFilterValue('city', '');
  }

  get countryOptions() {
    return COUNTRIES;
  }

  get stateOptions() {
    const country = this.filterService.getFilterState('country').value;
    return country ? STATES[country] : [];
  }

  get cityOptions() {
    const state = this.filterService.getFilterState('state').value;
    return state ? CITIES[state] : [];
  }
  exclusivityRules: ExclusivityRule[] = [
    { filterId: 'promoA', exclusiveWith: ['promoB', 'promoC'] },
    { filterId: 'promoB', exclusiveWith: ['promoA', 'promoC'] },
    { filterId: 'promoC', exclusiveWith: ['promoA', 'promoB'] }
  ];
  ngOnInit() {
    this.exService.setRules(this.exclusivityRules);
  }
}



