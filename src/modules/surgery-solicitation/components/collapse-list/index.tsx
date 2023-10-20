import { usePaginationType } from "@src/lib/hooks/use-pagination";
import { SurgerySolicitationEntity } from "@src/lib/interfaces/surgery-solicitation";
import { formatDate } from "@src/utils/functions";
import { Button, Collapse, Pagination, Space } from "antd";
import * as S from "./styles";
import { handleOpenUpdateSurgerySolicitationForm } from "../../list/table-data";
import { useModal } from "@src/lib/context/modal/modal-provider";
const { Panel } = Collapse;

export interface ICollapseComponent {
    handleMobileChange: (page: number) => void;
    hookPagination: usePaginationType;
    data: SurgerySolicitationEntity[];
}
export const CollapseComponent = ({
    handleMobileChange,
    hookPagination,
    data,
}: ICollapseComponent) => {
    const modalContext = useModal();
    return (
        <S.CollapseWrapper>
            <Collapse accordion>
                {data.map((item) => (
                    <Panel
                        header={
                            <S.ContainerAccordionItem>
                                <span>code: {item.code}</span>
                            </S.ContainerAccordionItem>
                        }
                        key={item.id}
                    >
                        <S.ContainerAccordionContent>
                            <div>
                                <b>Sala:</b> <span>{item.room}</span>
                            </div>
                            <div>
                                <b>Médico:</b> <span>{item.doctor}</span>
                            </div>
                            <div>
                                <b>Hospital:</b> <span>{item.hospital}</span>
                            </div>
                            <div>
                                <b>Data:</b>
                                <span>{formatDate(item.surgery_date)}</span>
                            </div>
                        </S.ContainerAccordionContent>
                        <Space size="middle">
                            <Button
                                onClick={() =>
                                    handleOpenUpdateSurgerySolicitationForm(
                                        item.id,
                                        modalContext
                                    )
                                }
                            >
                                Editar
                            </Button>
                            <Button>Deletar</Button>
                        </Space>
                    </Panel>
                ))}
            </Collapse>
            <Pagination
                defaultCurrent={hookPagination.pagination.currentPage}
                total={hookPagination.pagination.totalItems}
                onChange={handleMobileChange}
            />
        </S.CollapseWrapper>
    );
};
