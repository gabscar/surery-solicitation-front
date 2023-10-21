export interface ISolicitationStateManager {
    color: string;
    status: "Active" | "Inactive";
}
export interface StatusContextData {
    status: ISolicitationStateManager | undefined;

    changeStatus: (value: "Active" | "Inactive") => void;
}
