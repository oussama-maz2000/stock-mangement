import { computed, inject } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { Store } from "@ngrx/store";
import { exhaustMap, pipe, switchMap, tap } from "rxjs";
import { ApplicationActions } from "../../../core/data-access/application/application.action";
import { State } from "../../../core/data-access/store";
import { RoleDto } from "../../../core/model/role.model";
import {
  AddUserDto,
  UserDto,
  UserFilter,
} from "../../../core/model/users.model";
import { RoleService } from "../../../core/services/role.service";
import { UsersService } from "../../../core/services/users.service";

export const UsersSignalStore = signalStore(
  withState({
    users: [] as UserDto[],
    roles: [] as RoleDto[],

    pagination: {
      page: 0,
      size: 10,
      totalElements: 0,
      totalPages: 0,
    },

    loadingUsers: false,
    loadingRoles: false,
    savingUser: false,
    saveSuccess: false,

    error: null as string | null,

    filter: {} as UserFilter,
  }),

  withComputed((store) => ({
    paginationVm: computed(() => ({
      pageIndex: store.pagination().page,
      pageSize: store.pagination().size,
      totalItems: store.pagination().totalElements,
    })),
  })),

  withMethods(
    (
      store,
      usersService = inject(UsersService),
      roleService = inject(RoleService),
      _storeNgrx = inject(Store<State>)
    ) => {
      const loadUsers = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loadingUsers: true, error: null })),
          switchMap(() =>
            usersService
              .getFilterUsers(
                store.filter(),
                store.pagination().page,
                store.pagination().size
              )
              .pipe(
                tap({
                  next: (res) =>
                    patchState(store, {
                      users: res.content,
                      pagination: {
                        page: res.number,
                        size: res.size,
                        totalElements: res.totalElements,
                        totalPages: res.totalPages,
                      },
                    }),
                  error: (err) => {
                    patchState(store, { error: "Failed to load users" });
                  },
                  complete: () => {
                    patchState(store, { loadingUsers: false });
                  },
                })
              )
          )
        )
      );

      const loadRoles = rxMethod<void>(
        pipe(
          tap(() => patchState(store, { loadingRoles: true, error: null })),
          switchMap(() =>
            roleService.getFilterRoles(new FormGroup({}), 0, 20).pipe(
              tap({
                next: (res) =>
                  patchState(store, {
                    roles: res.content,
                    loadingRoles: false,
                  }),
                error: (err) => {
                  patchState(store, { error: "Failed to load roles" });
                },
                complete: () => {
                  patchState(store, { loadingRoles: false });
                },
              })
            )
          )
        )
      );

      const saveUser = rxMethod<{ user: AddUserDto }>(
        pipe(
          tap(() =>
            patchState(store, {
              savingUser: true,
              error: null,
              saveSuccess: false,
            })
          ),
          exhaustMap(({ user }) =>
            usersService.addNewUser(user).pipe(
              tap({
                next: () => {
                  _storeNgrx.dispatch(
                    ApplicationActions.handleSuccess({
                      message: "User has been added successfully",
                    })
                  );
                  loadUsers();
                  patchState(store, { savingUser: false, saveSuccess: true });
                },
                error: (err) => {
                  patchState(store, {
                    error: "Failed to store user",
                    savingUser: false,
                    saveSuccess: false,
                  });
                },
              })
            )
          )
        )
      );

      const setFilter = rxMethod<UserFilter>(
        pipe(
          tap((filter) => {
            patchState(store, {
              filter,
              pagination: { ...store.pagination(), page: 0 },
            });
            loadUsers();
          })
        )
      );

      const setPage = rxMethod<{ page: number; size: number }>(
        pipe(
          tap(({ page, size }) => {
            patchState(store, {
              pagination: { ...store.pagination(), page, size },
            });
            loadUsers();
          })
        )
      );

      return {
        loadUsers: () => loadUsers(),
        setFilter: (filter: UserFilter) => setFilter(filter),
        setPage: (page: number, size: number) => setPage({ page, size }),
        loadRoles: () => loadRoles(),
        saveUser: (user: AddUserDto) => saveUser({ user }),
      };
    }
  )
);
