import { createContext, useContext, useState } from "react";

import { ISolicitationStateManager, StatusContextData } from "./status-context";

type ControlModalProviderProps = {
    children: React.ReactNode;
};

export const StatusContext = createContext<StatusContextData>(
    {} as StatusContextData
);

export const StatusProvider = ({ children }: ControlModalProviderProps) => {
    const [modalState, setModalState] = useState<ISolicitationStateManager>({
        status: "Active",
        color: "green",
    });

    const changeStatus = (value: "Active" | "Inactive") => {
        setModalState({
            status: value,
            color: value === "Active" ? "green" : "red",
        });
    };

    return (
        <StatusContext.Provider
            value={{
                status: modalState,
                changeStatus,
            }}
        >
            {children}
        </StatusContext.Provider>
    );
};

export function useStatus() {
    return useContext(StatusContext);
}
