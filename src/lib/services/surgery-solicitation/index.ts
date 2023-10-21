import { useState } from "react";
import { ConstructRequest } from "../utils/ConstructRequests";
import {
    ISurgerySolicitationParams,
    ISurgerySolicitationsRequests,
    ICreateSurgerySolicitationParams,
    IFindAllSurgerySolicitation,
    IUpdateCompany,
} from "./interfaces";
import { SurgerySolicitationEntity } from "../../interfaces/surgery-solicitation";
import { IPaginatedResponse } from "../../interfaces/api-response/paginated-response";

const useSurgerySolicitationsRequests = (): ISurgerySolicitationsRequests => {
    const [loading, setLoading] = useState({
        create: false,
        delete: false,
        update: false,
        get: true,
    });

    async function createSurgerySolicitation(
        params: ISurgerySolicitationParams<
            ICreateSurgerySolicitationParams,
            SurgerySolicitationEntity
        >
    ): Promise<SurgerySolicitationEntity> {
        return await ConstructRequest({
            url: "/surgery-solicitation",
            constructErrors: (err: unknown) => {
                params.errorCallback && params.errorCallback(err);
            },
            constructSuccess: (value: SurgerySolicitationEntity) => {
                params.successCallback && params?.successCallback(value);
            },
            setLoading: (value) => {
                setLoading((prev) => ({ ...prev, create: value }));
            },
            type: "post",
            params: params.requestParams,
        });
    }

    async function getSurgerySolicitation(
        params: ISurgerySolicitationParams<
            { id: string },
            SurgerySolicitationEntity
        >
    ): Promise<SurgerySolicitationEntity> {
        return await ConstructRequest({
            url: `/surgery-solicitation/find/${params.requestParams.id}`,
            constructErrors: (err: unknown) => {
                params.errorCallback && params.errorCallback(err);
            },
            constructSuccess: (value: SurgerySolicitationEntity) => {
                params.successCallback && params?.successCallback(value);
            },
            setLoading: (value) => {
                setLoading((prev) => ({ ...prev, get: value }));
            },
            type: "get",
            params: params.requestParams,
        });
    }
    async function findAll(
        params: ISurgerySolicitationParams<
            IFindAllSurgerySolicitation,
            IPaginatedResponse<SurgerySolicitationEntity>
        >
    ): Promise<IPaginatedResponse<SurgerySolicitationEntity>> {
        return await ConstructRequest({
            url: `/surgery-solicitation/find-all`,
            constructErrors: (err: unknown) => {
                params.errorCallback && params.errorCallback(err);
            },
            constructSuccess: (
                value: IPaginatedResponse<SurgerySolicitationEntity>
            ) => {
                params.successCallback && params?.successCallback(value);
            },
            setLoading: (value) => {
                setLoading((prev) => ({ ...prev, get: value }));
            },
            type: "get",
            params: { params: params.requestParams },
            paginated: true,
        });
    }
    async function updateSurgerySolicitation(
        params: ISurgerySolicitationParams<
            IUpdateCompany,
            Partial<SurgerySolicitationEntity>
        >
    ): Promise<Partial<SurgerySolicitationEntity>> {
        return await ConstructRequest({
            url: `/surgery-solicitation/${params.requestParams.id}`,
            constructErrors: (err: unknown) => {
                params.errorCallback && params.errorCallback(err);
            },
            constructSuccess: (value: Partial<SurgerySolicitationEntity>) => {
                params.successCallback && params?.successCallback(value);
            },
            setLoading: (value) => {
                setLoading((prev) => ({ ...prev, update: value }));
            },
            type: "put",
            params: params.requestParams,
        });
    }
    async function deleteSurgerySolicitation(
        params: ISurgerySolicitationParams<{ id: string }, void>
    ): Promise<void> {
        return await ConstructRequest({
            url: `/surgery-solicitation/${params.requestParams.id}`,
            constructErrors: (err: unknown) => {
                params.errorCallback && params.errorCallback(err);
            },
            constructSuccess: (value: void) => {
                params.successCallback && params?.successCallback(value);
            },
            setLoading: (value) => {
                setLoading((prev) => ({ ...prev, delete: value }));
            },
            type: "delete",
            params: params.requestParams,
        });
    }

    return {
        createSurgerySolicitation: createSurgerySolicitation,
        getSurgerySolicitation,
        updateSurgerySolicitation,
        findAll,
        deleteSurgerySolicitation,
        loading,
    };
};
export default useSurgerySolicitationsRequests;
