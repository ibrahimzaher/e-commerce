import { Component, inject, input, InputSignal, signal, WritableSignal } from '@angular/core';
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
  private readonly langService = inject(LangService);
  readonly lang = this.langService.lang;
  control: InputSignal<any> = input.required<any>();
  idInput: InputSignal<string> = input.required<string>();
  label: InputSignal<string> = input.required<string>();
  typeInput: InputSignal<string> = input<string>('');
  readonly: InputSignal<boolean> = input<boolean>(false);
  flag: WritableSignal<boolean> = signal<boolean>(true);
}
