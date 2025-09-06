import { LangService } from './../../../core/services/lang/lang.service';
import { Component, inject, input, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

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
