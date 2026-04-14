import {inject, Injectable} from "@angular/core";
import {ParamsUtils} from "../utils/params.utils";
import {HttpClientApi} from "../internal/http-client/http-client-api.service";
import {UntypedFormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {PageableResponse} from "../model/pageable.model";
import {RoleDto} from "../model/role.model";
import {API_ROLES_ENDPOINTS} from "../api/role.api";

@Injectable({ providedIn: 'root' })
export class RoleService {
    private _paramsUtils:ParamsUtils=inject(ParamsUtils);
    private _httpClientApi:HttpClientApi=inject(HttpClientApi);

    getFilterRoles(filterTransactions: UntypedFormGroup,page: number,size: number): Observable<PageableResponse<RoleDto>> {
        let queryParams  = this._paramsUtils.params(page,size,filterTransactions);
        return this._httpClientApi.processRequest$<PageableResponse<RoleDto>>(API_ROLES_ENDPOINTS.FETCH_ROLES,{queryParams});
    }

}