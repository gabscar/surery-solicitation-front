"use client";

import { axios } from "../http/axios";

export interface IConstructRequest<T> {
    url: string;
    constructErrors: (_err: unknown) => void;
    constructSuccess?: (_value: T) => void;
    setLoading: (_value: boolean) => void;
    type: "post" | "get" | "put" | "patch" | "delete";
    params?: unknown;
    paginated?: boolean;
}

export async function ConstructRequest<T>(props: IConstructRequest<T>) {
    try {
        props.setLoading(true);
        const response = await axios[props.type](
            props.url,
            props.params ? props.params : {}
        );
        props.constructSuccess?.(response.data);
        return response.data;
    } catch (err: unknown) {
        props.constructErrors(err);
    } finally {
        props.setLoading(false);
    }
}
