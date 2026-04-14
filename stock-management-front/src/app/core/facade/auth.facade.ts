import {inject, Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {StorageCoreService} from "../internal/storage/storage-core.service";
import {State} from "../data-access/store";
import {User} from "../model/users.model";
import {STORAGE_KEYS} from "../internal/storage/storage-keys";
import {AuthService} from "../services/auth.service";
import {RequestLogin, ResponseLogin} from "../model/auth.model";
import {Observable} from "rxjs";

@Injectable({ providedIn: 'root' })
export class AuthFacade {

    private jwtHelp = new JwtHelperService();
    private storageCoreService: StorageCoreService = inject(StorageCoreService);
    private store = inject(Store<State>)
    private router: Router = inject(Router)
    private authService: AuthService = inject(AuthService)

    decodeAndStoreToken(token: string): User {
        this.storageCoreService.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
        const user: User = this.jwtHelp.decodeToken(token).user;
        return user
    }

    init(): { token: string | null; valid: boolean } {
        const token:string = this.storageCoreService.getItem(STORAGE_KEYS.ACCESS_TOKEN)!;

        if (token && !this.jwtHelp.isTokenExpired(token)) {
            return { token, valid: true };
        }

        return { token: null, valid: false };
    }


    login(payload: RequestLogin): Observable<ResponseLogin> {
        return this.authService.login$(payload);

    }


    signOut() {
        this.storageCoreService.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        this.router.navigateByUrl("/signin");
    }

}
