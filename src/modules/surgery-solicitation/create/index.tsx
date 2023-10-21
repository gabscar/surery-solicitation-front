import { ICreateSurgerySolicitationParams } from "@src/lib/services/surgery-solicitation/interfaces";
import { SurgerySolicitationForm } from "../components/form";
import useSurgerySolicitationsRequests from "@src/lib/services/surgery-solicitation";
import { useModal } from "@src/lib/context/modal/modal-provider";
import toast from "react-hot-toast/headless";

export const CreateSolicitation = () => {
    const modalContext = useModal();
    const { createSurgerySolicitation, loading } =
        useSurgerySolicitationsRequests();
    const createSolicitation = async (
        value: ICreateSurgerySolicitationParams
    ) => {
        await createSurgerySolicitation({
            requestParams: { ...value },
            successCallback: () => {
                modalContext.changeOpenStatus(false);
                toast.success("Solicitação criada com sucesso");
            },
            errorCallback: () => {
                toast.error("Erro ao criar solicitação");
            },
        });
    };
    return (
        <SurgerySolicitationForm
            onSubmit={createSolicitation}
            submitFormText="Criar"
            data={undefined}
            loading={loading.create}
        />
    );
};
