import { createContext, useContext, useState } from "react";

import { ModalContextData, IStateManager } from "./modal-context";
import FormModal from "@src/components/modal";

type ControlModalProviderProps = {
    children: React.ReactNode;
};

export const ModalContext = createContext<ModalContextData>(
    {} as ModalContextData
);

export const ModalProvider = ({ children }: ControlModalProviderProps) => {
    const [modalState, setModalState] = useState<IStateManager | undefined>(
        undefined
    );
    const [open, setOpen] = useState<boolean>(false);

    const changeSelectedForm = (data: IStateManager | undefined) => {
        setModalState(data);
    };

    const changeOpenStatus = (value: boolean) => {
        setOpen(value);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <ModalContext.Provider
            value={{
                selectedChild: modalState,
                isOpen: open,
                changeSelectedChild: changeSelectedForm,
                changeOpenStatus,
            }}
        >
            {modalState && (
                <FormModal
                    isVisible={open}
                    onToggle={handleClose}
                    title={modalState?.modalTitle}
                >
                    {modalState?.form}
                </FormModal>
            )}
            {children}
        </ModalContext.Provider>
    );
};

export function useModal() {
    return useContext(ModalContext);
}
