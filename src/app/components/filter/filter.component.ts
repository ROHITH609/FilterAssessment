import { Component, Input } from '@angular/core';
import { FilterDependencyService } from '../../services/filter-dependency.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="filter" [class.filter-enabled]="state.enabled" [class.filter-has-value]="state.value">
      <div class="filter-header">
        <label class="filter-label">
          {{ label }}
          <span class="filter-icon" [innerHTML]="getIcon()"></span>
        </label>
        <div class="filter-badge" *ngIf="state.value">Selected!</div>
      </div>
      
      <div class="filter-wrapper">
        <select 
          class="filter-select" 
          [ngModel]="state.value" 
          (ngModelChange)="onChange($event)" 
          [disabled]="!state.enabled"
          [attr.aria-label]="label">
          <option value="">✨ Select {{ label }}</option>
          <option *ngFor="let option of options" [value]="option">{{ option }}</option>
        </select>
        <span class="filter-arrow"></span>
      </div>

      <div class="filter-footer">
        <div class="filter-hint" *ngIf="!state.enabled">
          <span class="hint-icon">🔒</span>
          Choose parent to enable
        </div>
        <div class="filter-hint" *ngIf="state.enabled && !state.value">
          <span class="hint-icon">💫</span>
          Choose a {{ label.toLowerCase() }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .filter {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 16px;
      padding: 1rem;
      transition: all 0.3s ease;
      border: 2px solid var(--border);
      position: relative;
      overflow: hidden;
    }

    .filter::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #FFB6C1, #87CEEB);
      transform: translateY(-100%);
      transition: transform 0.3s ease;
    }

    .filter-enabled::before {
      transform: translateY(0);
    }

    .filter-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .filter-label {
      font-weight: 600;
      color: var(--primary);
      font-size: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .filter-icon {
      display: inline-flex;
      align-items: center;
      opacity: 0.7;
    }

    .filter-badge {
      background: var(--success);
      color: var(--text);
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      animation: fadeIn 0.3s ease;
    }

    .filter-wrapper {
      position: relative;
      margin-bottom: 0.5rem;
    }

    .filter-select {
      width: 100%;
      padding: 12px 16px;
      border-radius: 12px;
      border: 2px solid var(--border);
      background: white;
      color: var(--text);
      font-size: 0.95rem;
      transition: all 0.2s ease;
      cursor: pointer;
      appearance: none;
      padding-right: 40px;
    }

    .filter-select:not(:disabled):hover {
      border-color: var(--primary);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255,105,180,0.1);
    }

    .filter-select:disabled {
      background: var(--bg);
      cursor: not-allowed;
      opacity: 0.7;
    }

    .filter-arrow {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-right: 2px solid var(--primary);
      border-bottom: 2px solid var(--primary);
      transform: translateY(-50%) rotate(45deg);
      transition: transform 0.2s ease;
      pointer-events: none;
    }

    .filter-select:focus + .filter-arrow {
      transform: translateY(-50%) rotate(-135deg);
    }

    .filter-footer {
      min-height: 24px;
    }

    .filter-hint {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--muted);
      font-size: 0.85rem;
      animation: slideIn 0.3s ease;
    }

    .hint-icon {
      font-size: 1rem;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(5px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .filter-has-value {
      border-color: var(--success);
      box-shadow: 0 4px 12px rgba(152,251,152,0.1);
    }
  `]
})
export class FilterComponent {
  @Input() label!: string;
  @Input() options: string[] = [];
  @Input() id!: string;

  constructor(private service: FilterDependencyService) {}

  get state() {
    return this.service.getFilterState(this.id);
  }

  onChange(val: string) {
    this.service.setFilterValue(this.id, val);
  }

  getIcon(): string {
    switch(this.id) {
      case 'country':
        return '🌎';
      case 'state':
        return '📍';
      case 'city':
        return '🏙️';
      default:
        return '✨';
    }
  }
}
