import { Component, Input } from '@angular/core';
import { MutualExclusivityService } from '../../services/mutual-exclusivity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-exclusivity-filter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="exclusivity-item">
      <label class="checkbox-label">
        <input type="checkbox"
          class="checkbox-input"
          [checked]="service.isSelected(id)"
          [disabled]="service.isDisabled(id)"
          (change)="toggle()" />
        <span class="checkbox-custom"></span>
        <span class="checkbox-text">{{label}}</span>
      </label>
    </div>
  `,
  styles: [`
    .exclusivity-item {
      padding: 8px;
      border-radius: 10px;
      transition: all 0.2s ease;
    }
    
    .exclusivity-item:hover {
      background: rgba(182, 205, 255, 0.1);
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      cursor: pointer;
      user-select: none;
      color: var(--text);
      font-size: 0.95rem;
    }

    .checkbox-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkbox-custom {
      position: relative;
      display: inline-block;
      width: 20px;
      height: 20px;
      background-color: lightpink;
      border: 2px solid var(--border);
      border-radius: 6px;
      margin-right: 10px;
      transition: all 0.2s ease;
    }

    .checkbox-input:checked ~ .checkbox-custom {
      background-color: lightpink;
      border-color: var(--primary);
    }

    .checkbox-input:checked ~ .checkbox-custom::after {
      content: '';
      position: absolute;
      left: 6px;
      top: 2px;
      width: 4px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }

    .checkbox-input:disabled ~ .checkbox-custom {
      background-color: var(--bg);
      border-color: var(--border);
      cursor: not-allowed;
    }

    .checkbox-input:disabled ~ .checkbox-text {
      color: var(--muted);
      cursor: not-allowed;
    }

    .checkbox-text {
      margin-left: 4px;
    }
  `],
})
export class ExclusivityFilterComponent {
  @Input() id!: string;
  @Input() label!: string;

  constructor(public service: MutualExclusivityService) {}

  toggle() {
    if (this.service.isSelected(this.id)) {
      this.service.deselectFilter(this.id);
    } else {
      this.service.selectFilter(this.id);
    }
  }
}
