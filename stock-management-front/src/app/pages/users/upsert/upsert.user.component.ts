import {
  Component,
  computed,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import { FormBuilder, Validators } from "@angular/forms";
import { filter, skip } from "rxjs";
import { AddUserDto } from "../../../core/model/users.model";
import { mapRolesToOptions } from "../../../core/utils/mappers.utils";
import { SHARED_IMPORTS } from "../../../core/utils/shared.imports";
import { CustomInputFieldComponent } from "../../../shared/components/form/input/custom-input-field.component";
import { CustomSelectComponent } from "../../../shared/components/form/input/custom-select-field.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { UsersSignalStore } from "../helpers/users.store";
@Component({
  selector: "app-upsert-user",
  templateUrl: "./upsert.user.component.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    CustomInputFieldComponent,
    ButtonComponent,
    CustomSelectComponent,
  ],
  providers: [UsersSignalStore],
})
export class UpsertUserComponent implements OnInit {
  showPassword = false;
  protected usersSignalStore = inject(UsersSignalStore);
  readonly rolesOptions = computed(() =>
    mapRolesToOptions(this.usersSignalStore.roles())
  );
  private fb = inject(FormBuilder);
  @Output() modalClose = new EventEmitter<void>();
  private destroyRef = inject(DestroyRef);
  protected addUserForm = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    fullName: ["", [Validators.required]],
    username: ["", [Validators.required]],
    phone: ["", [Validators.required]],
    roleId: ["", [Validators.required]],
    password: [
      "",
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/),
      ],
    ],
  });

  constructor() {
    this.watchSavingUser();
  }

  ngOnInit() {
    this.usersSignalStore.loadRoles();
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    this.usersSignalStore.saveUser(
      this.addUserForm.getRawValue() as AddUserDto
    );
    this.addUserForm.reset();
  }

  onClose() {
    this.modalClose.emit();
  }

  watchSavingUser() {
    toObservable(this.usersSignalStore.savingUser)
      .pipe(
        skip(1),
        filter((saving) => !saving),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        if (!this.usersSignalStore.error()) {
          this.modalClose.emit();
        }
      });
  }
}
