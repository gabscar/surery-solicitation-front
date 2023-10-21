import { SurgerySolicitationEntity } from "@lib/interfaces/surgery-solicitation";
import { formatDate } from "@src/utils/functions";
import { Button, Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { useModal } from "@src/lib/context/modal/modal-provider";
import { UpdateSolicitation } from "../update";
import { ModalContextData } from "@src/lib/context/modal/modal-context";

export const handleOpenUpdateSurgerySolicitationForm = (
    id: string,
    modalContext: ModalContextData
) => {
    modalContext.changeSelectedChild({
        modalTitle: "Atualizar Solicitação",
        form: <UpdateSolicitation id={id} />,
    });
    modalContext.changeOpenStatus(true);
};

interface IGetColumns {
    onDeleteData: (id: string) => Promise<void>;
    loadDelete: boolean;
}
export const getColumns = (
    params: IGetColumns
): ColumnsType<SurgerySolicitationEntity> => {
    const modalContext = useModal();

    return [
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
        },
        {
            title: "Sala",
            dataIndex: "room",
            key: "room",
        },
        {
            title: "Médico",
            dataIndex: "doctor",
            key: "doctor",
        },
        {
            title: "Hospital",
            dataIndex: "hospital",
            key: "hospital",
        },
        {
            title: "Data",
            dataIndex: "surgery_date",
            key: "surgery_date",
            render: (text) => <span>{formatDate(text)}</span>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        onClick={() =>
                            handleOpenUpdateSurgerySolicitationForm(
                                record.id,
                                modalContext
                            )
                        }
                    >
                        Editar
                    </Button>
                    <Button
                        onClick={() => params.onDeleteData(record.id)}
                        block={params.loadDelete}
                    >
                        Deletar
                    </Button>
                </Space>
            ),
        },
    ];
};
