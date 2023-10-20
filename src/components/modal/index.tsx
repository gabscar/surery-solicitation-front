import { ReactNode } from "react";
import { Modal } from "antd";
import * as S from "./styles";
export interface IFormDrawer {
    title: string;
    onToggle: () => void;
    isVisible: boolean;
    children: ReactNode;
}

const FormDrawer = ({ title, onToggle, isVisible, children }: IFormDrawer) => {
    return (
        <>
            <Modal
                title={title}
                width={"60vw"}
                onCancel={onToggle}
                open={isVisible}
                footer={() => <></>}
            >
                <S.FormWrapper>{children}</S.FormWrapper>
            </Modal>
        </>
    );
};

export default FormDrawer;
