import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { LangService } from './../../../core/services/lang/lang.service';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input({ required: true }) control: any;
  @Input({ required: true }) idInput!: string;
  @Input() typeInput!: string;
  public readonly langService = inject(LangService);
  @Input({ required: true }) label!: string;
  flag: boolean = true;
  @Input() readonly: boolean = false;
}
