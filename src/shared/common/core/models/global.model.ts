/* eslint-disable @typescript-eslint/no-explicit-any */
export type DataModel<T, P> = {
    data?: any;
    response: T;
    request: P;
    isLoading: boolean;
    error: any | string;
    initialRequest?: any;
};

export type Pagination = {
    page: number;
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export type Status = {
    code:      number;
    success:   boolean;
    message:   string | null;
    errorCode: string | null;
}