import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import { TablePaginationConfig } from "antd/es/table";
import { usePagination } from "../../../lib/hooks/use-pagination";

import { getColumns } from "./table-data";
import { SurgerySolicitationEntity } from "@lib/interfaces/surgery-solicitation";
import { getWindowDimensions } from "../../../utils/functions";
import * as S from "./styles";
import { CollapseComponent } from "../components/collapse-list";
import { useModal } from "@src/lib/context/modal/modal-provider";
import { CreateSolicitation } from "../create";
import useSurgerySolicitationsRequests from "@src/lib/services/surgery-solicitation";
import toast from "react-hot-toast";
import { useStatus } from "@src/lib/context/status/status-provider";

export const SurgeryListPage = () => {
    const hookPagination = usePagination();
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    const { findAll, loading, deleteSurgerySolicitation } =
        useSurgerySolicitationsRequests();
    const modalContext = useModal();
    const statusContext = useStatus();
    const [solicitationList, setSolicitationList] = useState<
        SurgerySolicitationEntity[]
    >([]);
    const getAllSolicitation = async () => {
        await findAll({
            requestParams: {
                code: "",
                page: hookPagination.pagination.currentPage,
                take: hookPagination.pagination.take,
            },
            successCallback: (value) => {
                if (value) {
                    setSolicitationList(value?.data);
                    hookPagination.setTotalPage(value?.meta.max);
                }
            },
            errorCallback: () => {
                toast.error("Erro ao buscar solicitações");
            },
        });
    };
    useEffect(() => {
        getAllSolicitation();
    }, [modalContext.isOpen, hookPagination.pagination.currentPage]);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleChange = (pagination: TablePaginationConfig) => {
        hookPagination.setCurrentPage(pagination.current || 1);
    };

    const handleMobileChange = (page: number) => {
        hookPagination.setCurrentPage(page || 1);
    };

    const handleOpenCreateForm = () => {
        modalContext.changeSelectedChild({
            modalTitle: "Criar Solicitação",
            form: <CreateSolicitation />,
        });
        modalContext.changeOpenStatus(true);
    };

    const onDeleteData = async (id: string) => {
        await deleteSurgerySolicitation({ requestParams: { id } });

        await getAllSolicitation();
    };

    const handleChangeStatus = () => {
        const currStatus = statusContext.status?.status;
        statusContext.changeStatus(
            currStatus === "Active" ? "Inactive" : "Active"
        );
    };
    return (
        <S.ListWrapper>
            <S.HeaderWrapper>
                <S.TitlePage>Listagem de Solicitações</S.TitlePage>
                <div className="buttonContainer">
                    <Button
                        data-testid="changeStatus"
                        onClick={() => handleChangeStatus()}
                    >
                        Mudar status
                    </Button>
                    <Button
                        data-testid="showCreateModal"
                        onClick={() => handleOpenCreateForm()}
                    >
                        Criar Solicitação
                    </Button>
                </div>
            </S.HeaderWrapper>
            {windowDimensions.width > 700 ? (
                <Table
                    columns={getColumns({
                        onDeleteData,
                        loadDelete: loading.delete,
                    })}
                    dataSource={solicitationList}
                    onChange={handleChange}
                    loading={loading.get}
                    pagination={{
                        current: hookPagination.pagination.currentPage,
                        total: hookPagination.pagination.totalItems,
                        pageSize: hookPagination.pagination.take,
                    }}
                />
            ) : (
                <CollapseComponent
                    handleMobileChange={handleMobileChange}
                    data={solicitationList}
                    hookPagination={hookPagination}
                    loading={loading.get}
                    onDeleteData={onDeleteData}
                    loadDelete={loading.delete}
                />
            )}
        </S.ListWrapper>
    );
};
