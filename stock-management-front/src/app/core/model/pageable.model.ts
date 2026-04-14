export interface SortInfo {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface InnerPageable {
    offset: number;
    sort: SortInfo;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export class PageableResponse<T> {
    content: T[];
    pageable: InnerPageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    sort: SortInfo;
    numberOfElements: number;
    first: boolean;
    empty: boolean;

    constructor(data?: Partial<PageableResponse<T>>) {
        Object.assign(this, data);
    }
}


export interface Pageable {
    page: number;
    size: number;
    totalElements: number;
    totalPages:number
}
