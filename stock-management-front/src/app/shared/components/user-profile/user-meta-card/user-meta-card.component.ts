import { Component, input } from '@angular/core';
import { InputFieldComponent } from './../../form/input/input-field.component';
import { ModalService } from '../../../services/modal.service';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../ui/modal/modal.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { User } from '../../../../core/model/users.model';
import { BadgeComponent } from "../../ui/badge/badge.component";

@Component({
  selector: 'app-user-meta-card',
  imports: [
    CommonModule,
    BadgeComponent
  ],
  templateUrl: './user-meta-card.component.html',
  styles: ``
})
export class UserMetaCardComponent {
  user = input.required<User>();
}
