import { ICreateSurgerySolicitationParams } from "@src/lib/services/surgery-solicitation/interfaces";
import { SurgerySolicitationForm } from "../components/form";
import { useSurgerySolicitationsRequests } from "@src/lib/services/surgery-solicitation";
import { useModal } from "@src/lib/context/modal/modal-provider";

export const CreateSolicitation = () => {
    const modalContext = useModal();
    const { createSurgerySolicitation } = useSurgerySolicitationsRequests();
    const createSolicitation = async (
        value: ICreateSurgerySolicitationParams
    ) => {
        await createSurgerySolicitation({
            requestParams: { ...value },
            successCallback: () => {
                modalContext.changeOpenStatus(false);
            },
        });
    };
    return (
        <SurgerySolicitationForm
            onSubmit={createSolicitation}
            submitFormText="Criar"
            data={undefined}
        />
    );
};
