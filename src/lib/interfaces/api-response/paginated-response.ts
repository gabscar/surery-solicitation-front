export interface IPaginatedResponse<T> {
    data: T[];
    meta: {
        taken: number;
        page: number;
        max: number;
    };
}
export enum IOrderBy {
    DESC = "DESC",
    ASC = "ASC",
}
