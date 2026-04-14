import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { CustomInputFieldComponent } from "../../../shared/components/form/input/custom-input-field.component";
import { DrawerComponent } from "../../../shared/components/ui/drawer/drawer.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { SHARED_IMPORTS } from "../../../core/utils/shared.imports";
import { UsersSignalStore } from "./users.store";
import { FormBuilder } from "@angular/forms";
import { mapRolesToOptions } from "../../../core/utils/mappers.utils";
import { SelectComponent } from "../../../shared/components/form/select/select.component";
import { CustomSelectComponent } from "../../../shared/components/form/input/custom-select-field.component";

@Component({
  selector: "app-users-filter",
  template: `
    <app-drawer [isOpen]="drawerOpen" (closed)="closeDrawer()">
      <div drawer-header>
        <div>
          <h2 style="margin: 0; font-size: 18px; color: #111827">Users</h2>
          <p style="margin: 4px 0 0; font-size: 14px; color: #6b7280">
            Filter Users By Fields
          </p>
        </div>
      </div>

      <div drawer-body class="flex flex-col gap-4" [formGroup]="filterForm">
        <div>
          <app-custom-input-field
            type="text"
            id="fullname"
            name="fullname"
            label="Full Name"
            placeholder="Enter full name"
            formControlName="fullName"
            [control]="filterForm.get('fullName')"
          >
          </app-custom-input-field>
        </div>
        <div>
          <app-custom-input-field
            type="text"
            id="username"
            name="username"
            label="User Name"
            placeholder="Enter user name"
            formControlName="username"
            [control]="filterForm.get('username')"
          >
          </app-custom-input-field>
        </div>
        <div>
          <app-custom-input-field
            type="email"
            id="email"
            name="email"
            label="Email"
            placeholder="Enter email"
            formControlName="email"
            [control]="filterForm.get('email')"
          >
          </app-custom-input-field>
        </div>
        <div>
          <app-custom-input-field
            type="text"
            id="phone"
            name="phone"
            label="Phone"
            placeholder="Enter user phone"
            formControlName="phone"
            [control]="filterForm.get('phone')"
          >
          </app-custom-input-field>
        </div>
        <div>
          <app-custom-select
            id="role"
            name="role"
            label="Role"
            [options]="rolesOptions()"
            placeholder="Select a role"
            formControlName="roleId"
            [control]="filterForm.get('roleId')"
          >
          </app-custom-select>
        </div>
      </div>

      <div class="flex items-center justify-end gap-3" drawer-footer>
        <app-button size="sm" variant="outline" (btnClick)="onReset()">
          Reset
        </app-button>

        <app-button size="sm" (btnClick)="onFilter()"> Filter </app-button>
      </div>
    </app-drawer>
  `,

  standalone: true,
  imports: [
    SHARED_IMPORTS,
    ButtonComponent,
    DrawerComponent,
    CustomInputFieldComponent,
    CustomSelectComponent,
  ],
  providers: [UsersSignalStore],
})
export class FilterUsersComponent implements OnInit {
  @Input() drawerOpen: boolean = false;
  @Output() drawerOpenChange = new EventEmitter<boolean>();
  @Output() setFilter = new EventEmitter<any>();
  protected usersSignalStore = inject(UsersSignalStore);
  readonly rolesOptions = computed(() =>
    mapRolesToOptions(this.usersSignalStore.roles())
  );

  ngOnInit(): void {
    if (this.usersSignalStore.roles().length < 1) {
      this.usersSignalStore.loadRoles();
    }
  }

  closeDrawer(): void {
    this.drawerOpenChange.emit(true);
  }

  onFilter() {
    this.setFilter.emit(this.filterForm.getRawValue());
    this.closeDrawer();
  }
  onReset() {
    this.filterForm.reset();
    this.setFilter.emit();
  }
  private fb = inject(FormBuilder);
  protected filterForm = this.fb.group({
    email: [""],
    fullName: [""],
    username: [""],
    phone: [""],
    roleId: [""],
  });
}
