import { createActionGroup, emptyProps, props } from "@ngrx/store";
import { User } from "../../model/users.model";


export const UserActions = createActionGroup({
    source: 'USER',
    events: {
        setUser: props<{ user: User }>(),
        clearUser: emptyProps(),
        updateUser: props<{ user: User }>(),
    },
});
