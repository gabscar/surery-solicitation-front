import { ReactNode } from "react";

export interface IStateManager {
    modalTitle: string;
    form: ReactNode;
}
export interface ModalContextData {
    selectedChild: IStateManager | undefined;
    isOpen: boolean;
    changeSelectedChild: (data: IStateManager | undefined) => void;
    changeOpenStatus: (value: boolean) => void;
}
