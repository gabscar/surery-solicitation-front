import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Control, Controller } from "react-hook-form";
import * as S from "./styles";
interface RHFDatePickerFieldProps {
    control: Control<any>;
    name: string;
    placeholder?: string;
    label: string;
}
export const DatePickerField = (props: RHFDatePickerFieldProps) => {
    return (
        <S.TextFieldWrapper>
            <label>{props.label}:</label>
            <Controller
                control={props.control}
                name={props.name}
                render={({ field, fieldState }) => {
                    return (
                        <>
                            <DatePicker
                                placeholder={props.placeholder}
                                status={fieldState.error ? "error" : undefined}
                                ref={field.ref}
                                name={field.name}
                                onBlur={field.onBlur}
                                value={field.value ? dayjs(field.value) : null}
                                onChange={(date) => {
                                    field.onChange(date ? date : null);
                                }}
                                style={{ width: "100%" }}
                            />
                            {fieldState.error ? (
                                <span style={{ color: "red" }}>
                                    {fieldState.error?.message}
                                </span>
                            ) : null}
                        </>
                    );
                }}
            />
        </S.TextFieldWrapper>
    );
};
