import { HttpErrorResponse } from '@angular/common/http';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ApplicationActions = createActionGroup({
    source: 'APPLICATION',
    events: {
        handleError: props<{ message: string }>(),
        handleSuccessWithRouting: props<{ message: string; navigateTo: string; }>(),
        handleSuccess: props<{ message: string }>(),
        loading: props<{ loading: boolean }>(),
        init: emptyProps(),
        initUnauthenticated: emptyProps(),
    },
});
