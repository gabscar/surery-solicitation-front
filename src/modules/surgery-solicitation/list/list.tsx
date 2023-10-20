import React, { useEffect, useState } from "react";
import { Button, Table } from "antd";
import type { TablePaginationConfig } from "antd/es/table";
import { usePagination } from "../../../lib/hooks/use-pagination";

import { getColumns } from "./table-data";
import { SurgerySolicitationEntity } from "@lib/interfaces/surgery-solicitation";
import { getWindowDimensions } from "../../../utils/functions";
import * as S from "./styles";
import { CollapseComponent } from "../components/collapse-list";
import { useModal } from "@src/lib/context/modal/modal-provider";
import { CreateSolicitation } from "../create";
import { useSurgerySolicitationsRequests } from "@src/lib/services/surgery-solicitation";

export const SurgeryListPage: React.FC = () => {
    const hookPagination = usePagination();
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );
    const { findAll } = useSurgerySolicitationsRequests();
    const modalContext = useModal();

    const [solicitationList, setSolicitationList] = useState<
        SurgerySolicitationEntity[]
    >([]);
    useEffect(() => {
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
            });
        };
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
    return (
        <S.ListWrapper>
            <S.HeaderWrapper>
                <S.TitlePage>Listagem de Solicitações</S.TitlePage>
                <Button onClick={() => handleOpenCreateForm()}>
                    Criar Solicitação
                </Button>
            </S.HeaderWrapper>

            {windowDimensions.width > 700 ? (
                <Table
                    columns={getColumns()}
                    dataSource={solicitationList}
                    onChange={handleChange}
                    pagination={{
                        current: hookPagination.pagination.currentPage,
                        total: hookPagination.pagination.totalItems,
                    }}
                />
            ) : (
                <CollapseComponent
                    handleMobileChange={handleMobileChange}
                    data={solicitationList}
                    hookPagination={hookPagination}
                />
            )}
        </S.ListWrapper>
    );
};
