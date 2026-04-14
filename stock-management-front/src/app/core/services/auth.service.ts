import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_AUTH_ENDPOINTS } from "../api/auth.api";
import { HttpClientApi } from "../internal/http-client/http-client-api.service";
import { RequestLogin, ResponseLogin } from "../model/auth.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _httpClientApi: HttpClientApi = inject(HttpClientApi);

    login$(payload: RequestLogin): Observable<ResponseLogin> {
        return this._httpClientApi.processRequest$<ResponseLogin>(API_AUTH_ENDPOINTS.LOGIN, { body: payload })
    }

}
