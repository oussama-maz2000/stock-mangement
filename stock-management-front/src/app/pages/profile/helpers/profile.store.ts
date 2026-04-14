import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { UpdateProfileDto, User } from "../../../core/model/users.model";
import { inject } from "@angular/core";
import { Store } from "@ngrx/store";
import { State } from "../../../core/data-access/store";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, EMPTY, exhaustMap, finalize, pipe, switchMap, take, tap, withLatestFrom } from "rxjs";
import { UsersService } from "../../../core/services/users.service";
import { UserActions } from "../../../core/data-access/user/user.actions";

export const ProfileSignalStore = signalStore(
    { providedIn: "root" },
    withState({
        user: {} as User,
        isUpdateModalOpen: false,
        updatingLesson: false,
    }),
    withMethods(
        (
            store,
            userService = inject(UsersService),
            _storeNgrx = inject(Store<State>)
        ) => {
            const loadUser = rxMethod<void>(
                pipe(
                    switchMap(() =>
                        _storeNgrx.select(state => state.USER_STORE).pipe(
                            take(1)
                        )
                    ),
                    tap((user: User) => {
                        console.log("Loaded user:", user);
                        patchState(store, {
                            user: user,
                        });
                    })
                )
            );

            const updateProfile = rxMethod<UpdateProfileDto>(
                pipe(
                    tap(() =>
                        patchState(store, {
                            updatingLesson: false,

                        })
                    ),
                    exhaustMap((updateProfileDto) =>
                        userService.updateProfile(store.user().id!, updateProfileDto).pipe(
                            tap((user) => {
                                _storeNgrx.dispatch(
                                    UserActions.updateUser({
                                        user: { ...store.user(), ...user },
                                    })
                                );
                                patchState(store, { updatingLesson: false });
                            }),
                            catchError((err) => {
                                patchState(store, {
                                    updatingLesson: false,
                                });
                                return EMPTY;
                            }),
                            finalize(() => {
                                patchState(store, { updatingLesson: false });
                            })
                        )
                    )
                )
            );

            return {
                loadUser,
                updateProfile: (updateProfileDto: UpdateProfileDto) => updateProfile(updateProfileDto)
            };
        }
    )
);