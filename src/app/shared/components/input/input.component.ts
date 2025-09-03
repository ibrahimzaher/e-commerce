import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  @Input({ required: true }) control: any;
  @Input({ required: true }) idInput!: string;
  @Input() typeInput!: string;
  @Input({ required: true }) label!: string;
  flag: boolean = true;
}
