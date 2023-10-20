import { IPaginatedResponse } from "../../interfaces/api-response/paginated-response";
import { SurgerySolicitationEntity } from "../../interfaces/surgery-solicitation";

export interface ISurgerySolicitationParams<Request, Response> {
    errorCallback?: (err?: unknown) => void;
    successCallback?: (value?: Response) => void;
    requestParams: Request;
}

export interface ICreateSurgerySolicitationParams {
    code: string;
    room: string;
    procedures: string;
    doctor: string;
    hospital: string;
    surgery_date: Date | null;
    general_observations: string;
    patient: string;
}

export interface IUpdateCompany
    extends Partial<ICreateSurgerySolicitationParams> {
    id: string;
}

export interface IFindAllSurgerySolicitation {
    code?: string;
    page: number;
    take: number;
}
export interface ISurgerySolicitationsRequests {
    createSurgerySolicitation: (
        _params: ISurgerySolicitationParams<
            ICreateSurgerySolicitationParams,
            SurgerySolicitationEntity
        >
    ) => Promise<SurgerySolicitationEntity>;
    getSurgerySolicitation: (
        _params: ISurgerySolicitationParams<
            { id: string },
            SurgerySolicitationEntity
        >
    ) => Promise<SurgerySolicitationEntity>;
    findAll: (
        _params: ISurgerySolicitationParams<
            IFindAllSurgerySolicitation,
            IPaginatedResponse<SurgerySolicitationEntity>
        >
    ) => Promise<IPaginatedResponse<SurgerySolicitationEntity>>;
    updateSurgerySolicitation: (
        _params: ISurgerySolicitationParams<
            IUpdateCompany,
            Partial<SurgerySolicitationEntity>
        >
    ) => Promise<Partial<SurgerySolicitationEntity>>;
    deleteSurgerySolicitation: (
        _params: ISurgerySolicitationParams<{ id: string }, void>
    ) => Promise<void>;

    loading: {
        create: boolean;
        delete: boolean;
        update: boolean;
        get: boolean;
    };
}
