import { ICreateSurgerySolicitationParams } from "@lib/services/surgery-solicitation/interfaces";
import * as yup from "yup";

export const surgerySolicitation: yup.ObjectSchema<ICreateSurgerySolicitationParams> =
    yup.object().shape({
        code: yup.string().required("Código é obrigatório"),
        room: yup.string().required("A sala é obrigatória"),
        procedures: yup.string().required("Os procedimentos são obrigatórios"),
        doctor: yup.string().required("É necessário indicar o médico"),
        hospital: yup.string().required("o Hospital é obrigatório"),
        surgery_date: yup.date().required("A data da cirurgia é obrigatória"),
        general_observations: yup
            .string()
            .required("É necessário fornecer observações"),
        patient: yup.string().required("É necessário inserir o paciente"),
    });
