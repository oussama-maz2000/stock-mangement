import { Component, inject, input, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { LabelComponent } from '../../form/label/label.component';
import { ModalComponent } from '../../ui/modal/modal.component';
import { User } from '../../../../core/model/users.model';
import { FormBuilder, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { CustomInputFieldComponent } from "../../form/input/custom-input-field.component";

@Component({
  selector: 'app-user-info-card',
  imports: [
    CommonModule,
    ButtonComponent,
    LabelComponent,
    ModalComponent,
    FormsModule,
    ReactiveFormsModule,
    CustomInputFieldComponent
  ],
  templateUrl: './user-info-card.component.html',
  styles: ``
})
export class UserInfoCardComponent implements OnInit {
  user = input.required<User>();
  public modal = inject(ModalService);
  private fb = inject(FormBuilder);
  isOpen = false;
  formUser = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
  });


  ngOnInit(): void {
    this.formUser.patchValue({
      fullName: this.user().fullName,
      email: this.user().email,
      phone: this.user().phone
    })
  }


  openModal() {
    this.isOpen = true;
  }
  closeModal() { this.isOpen = false; }



  handleSave() {
    // Handle save logic here
    console.log('Saving changes...');
    this.modal.closeModal();
  }
}
