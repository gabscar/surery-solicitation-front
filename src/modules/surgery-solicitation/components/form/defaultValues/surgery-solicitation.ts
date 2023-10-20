import { ICreateSurgerySolicitationParams } from "@lib/services/surgery-solicitation/interfaces";

export const getSurgerySolicitationsDefaultValue = (
    value?: ICreateSurgerySolicitationParams
): ICreateSurgerySolicitationParams => {
    if (value) {
        return {
            code: value.code,
            room: value.room,
            procedures: value.procedures,
            doctor: value.doctor,
            hospital: value.hospital,
            surgery_date: value.surgery_date,
            general_observations: value.general_observations,
            patient: value.patient,
        };
    }

    return {
        code: "",
        room: "",
        procedures: "",
        doctor: "",
        hospital: "",
        surgery_date: null,
        general_observations: "",
        patient: "",
    };
};
