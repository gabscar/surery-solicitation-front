import { useForm } from "react-hook-form";
import { surgerySolicitation } from "./schema/surgerySolicitationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row } from "antd";
import { ICreateSurgerySolicitationParams } from "@lib/services/surgery-solicitation/interfaces";
import { getSurgerySolicitationsDefaultValue } from "./defaultValues/surgery-solicitation";
import * as S from "./styles";
import { TextFieldInput } from "@src/components/inputs/text-field";
import { DatePickerField } from "@src/components/inputs/date-picker";

export interface ISurgerySolicitationForm {
    data?: ICreateSurgerySolicitationParams;
    onSubmit: (value: ICreateSurgerySolicitationParams) => Promise<void>;
    submitFormText: string;
}
export const SurgerySolicitationForm = (params: ISurgerySolicitationForm) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm<ICreateSurgerySolicitationParams>({
        defaultValues: getSurgerySolicitationsDefaultValue(params.data),
        resolver: yupResolver(surgerySolicitation),
    });
    const onSubmit = async (data: ICreateSurgerySolicitationParams) => {
        await params.onSubmit(data);
        reset();
    };

    return (
        <S.FormWrapper>
            <form onSubmit={handleSubmit(onSubmit)}>
                <S.FormInputsWrapper>
                    <Row gutter={30}>
                        <Col lg={18} xl={11}>
                            <TextFieldInput
                                control={control}
                                name="code"
                                placeholder="Código"
                                label="Código"
                                errorText={errors.code?.message}
                            />
                        </Col>
                        <Col lg={18} xl={11}>
                            <TextFieldInput
                                control={control}
                                name="room"
                                placeholder="Sala"
                                label="Sala"
                                errorText={errors.room?.message}
                            />
                        </Col>

                        <Col lg={18} xl={11}>
                            <TextFieldInput
                                control={control}
                                name="procedures"
                                placeholder="Procedimentos"
                                label="Procedimentos"
                                errorText={errors.procedures?.message}
                            />
                        </Col>

                        <Col lg={18} xl={11}>
                            <TextFieldInput
                                control={control}
                                name="doctor"
                                placeholder="Nome do Médico"
                                label="Nome do Médico"
                                errorText={errors.doctor?.message}
                            />
                        </Col>

                        <Col lg={18} xl={11}>
                            <TextFieldInput
                                control={control}
                                name="hospital"
                                placeholder="Hospital"
                                label="Hospital"
                                errorText={errors.hospital?.message}
                            />
                        </Col>

                        <Col lg={18} xl={11}>
                            <DatePickerField
                                name="surgery_date"
                                label="Data da cirurgia"
                                control={control}
                            />
                        </Col>

                        <Col lg={18} xl={11}>
                            <TextFieldInput
                                control={control}
                                name="patient"
                                placeholder="Paciente"
                                label="Paciente"
                                errorText={errors.patient?.message}
                            />
                        </Col>

                        <Col lg={18} xl={11}>
                            <TextFieldInput
                                control={control}
                                name="general_observations"
                                placeholder="Observações Gerais"
                                label="Observações Gerais"
                                errorText={errors.general_observations?.message}
                            />
                        </Col>
                    </Row>
                </S.FormInputsWrapper>
                <S.ButtonsWrapper>
                    <Button type="primary" htmlType="submit">
                        {params.submitFormText}
                    </Button>
                </S.ButtonsWrapper>
            </form>
        </S.FormWrapper>
    );
};
