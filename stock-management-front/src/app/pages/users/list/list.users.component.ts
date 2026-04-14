import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Signal,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { PageEvent } from "@angular/material/paginator";
import { Store } from "@ngrx/store";
import { State } from "../../../core/data-access/store";
import { UserDto } from "../../../core/model/users.model";
import { SHARED_IMPORTS } from "../../../core/utils/shared.imports";
import { StringUtils } from "../../../core/utils/string.utils";
import { PageBreadcrumbComponent } from "../../../shared/components/common/page-breadcrumb/page-breadcrumb.component";
import { PaginationComponent } from "../../../shared/components/common/pagination/pagination.component";
import { TableDropdownComponent } from "../../../shared/components/common/table-dropdown/table-dropdown.component";
import { BadgeComponent } from "../../../shared/components/ui/badge/badge.component";
import { ButtonComponent } from "../../../shared/components/ui/button/button.component";
import { ModalComponent } from "../../../shared/components/ui/modal/modal.component";
import { UsersSignalStore } from "../helpers/users.store";
import { UpsertUserComponent } from "../upsert/upsert.user.component";
import { DrawerComponent } from "../../../shared/components/ui/drawer/drawer.component";
import { LabelComponent } from "../../../shared/components/form/label/label.component";
import { InputFieldComponent } from "../../../shared/components/form/input/input-field.component";
import { CustomInputFieldComponent } from "../../../shared/components/form/input/custom-input-field.component";
import { FilterUsersComponent } from "../helpers/users-filter.filter";
import { toObservable } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-list-users",
  templateUrl: "./list.users.component.html",
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    PageBreadcrumbComponent,
    BadgeComponent,
    ButtonComponent,
    TableDropdownComponent,
    PaginationComponent,
    ModalComponent,
    UpsertUserComponent,
    FilterUsersComponent,
  ],
  providers: [UsersSignalStore],
})
export class ListUsersComponent implements OnInit {
  protected usersSignalStore = inject(UsersSignalStore);
  users: Signal<UserDto[]> = this.usersSignalStore.users;
  store = inject(Store<State>);
  private fb = inject(FormBuilder);
  protected filterForm = this.fb.group({
    email: [""],
    fullName: [""],
    username: [""],
    phone: [""],
    roleId: [""],
  });

  ngOnInit() {
    this.usersSignalStore.loadUsers();
  }

  getInitials(name: string | null | undefined): string {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
      return parts[0].substring(0, 2);
    }
    return parts[0][0] + parts[1][0];
  }

  getBadgeColor(status: boolean): "success" | "warning" | "error" {
    if (status === true) return "success";
    if (status === false) return "warning";
    return "error";
  }

  onPage(e: PageEvent): void {
    this.usersSignalStore.setPage(e.pageIndex, e.pageSize);
  }

  isModalOpen = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getRoleName(role: any): string | null {
    return StringUtils.getRoleName(role);
  }

  getBadgeRoleColor(role: any): "primary" | "warning" {
    return this.getRoleName(role) === "ADMIN" ? "primary" : "warning";
  }
  protected readonly StringUtils = StringUtils;

  drawerOpen = false;

  openDrawer(): void {
    this.drawerOpen = true;
  }

  closeDrawer(): void {
    this.drawerOpen = false;
  }

  onFilter(form: any) {
    this.usersSignalStore.setFilter(form);
  }
  onReset() {
    this.filterForm.reset();
  }
}
