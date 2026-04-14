import { ParamsUtils } from "../utils/params.utils";
import { inject, Injectable } from "@angular/core";
import { HttpClientApi } from "../internal/http-client/http-client-api.service";
import { UntypedFormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { PageableResponse } from "../model/pageable.model";
import { AddUserDto, UpdateProfileDto, User, UserDto } from "../model/users.model";
import { API_USERS_ENDPOINTS } from "../api/users.api";

@Injectable({ providedIn: "root" })
export class UsersService {
  private _paramsUtils: ParamsUtils = inject(ParamsUtils);
  private _httpClientApi: HttpClientApi = inject(HttpClientApi);

  getFilterUsers(
    filterTransactions: {},
    page: number,
    size: number
  ): Observable<PageableResponse<UserDto>> {
    let queryParams = this._paramsUtils.getParamsCustomer(
      page,
      size,
      filterTransactions
    );

    return this._httpClientApi.processRequest$<PageableResponse<UserDto>>(
      API_USERS_ENDPOINTS.FETCH_USERS,
      { queryParams }
    );
  }

  addNewUser(user: AddUserDto): Observable<void> {
    return this._httpClientApi.processRequest$<void>(
      API_USERS_ENDPOINTS.SAVE_USER,
      { body: user }
    );
  }


  updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Observable<User> {
    return this._httpClientApi.processRequest$<User>(API_USERS_ENDPOINTS.UPDATE_PROFILE, {
      body: updateProfileDto,
      pathParams: { userId }
    })
  }




}
