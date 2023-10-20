import { Input, InputProps } from "antd";

import {
    Control,
    Controller,
    FieldError,
    FieldPath,
    FieldValues,
} from "react-hook-form";
import * as S from "./styles";
export interface CustomInputProps<T extends FieldValues> {
    label: string;
    control: Control<T, unknown>;
    name: string;
    placeholder: string;
    type?: string;
    errorText?: FieldError;
}
interface IBaseTextFieldUniqueProps<T extends FieldValues> {
    control: Control<T, unknown>;
    name: FieldPath<T>;
    label: string;
    errorText?: string;
    mask?: string;
    useExternalLabel?: boolean;
    informationIconSrc?: string;
    informationMessage?: string;
}

type IBaseTextFieldProps<T extends FieldValues> = IBaseTextFieldUniqueProps<T> &
    InputProps;

export type ICustomTextField = <T extends FieldValues = FieldValues>(
    _props: IBaseTextFieldProps<T>
) => JSX.Element;
export const TextFieldInput: ICustomTextField = (props) => {
    return (
        <S.TextFieldWrapper>
            <label>{props.label}:</label>
            <Controller
                render={({ field, fieldState }) => {
                    return (
                        <Input
                            {...field}
                            type={props.type || "text"}
                            placeholder={props.placeholder}
                            className={
                                fieldState.invalid
                                    ? "custom-input error"
                                    : "custom-input"
                            }
                            defaultValue={field.value}
                            style={{
                                borderColor: props.errorText
                                    ? "red"
                                    : undefined,
                            }}
                            value={field.value}
                        />
                    );
                }}
                name={props.name}
                control={props.control}
            />
            {props.errorText && (
                <S.ErrorLabel className="error">{props.errorText}</S.ErrorLabel>
            )}
        </S.TextFieldWrapper>
    );
};
