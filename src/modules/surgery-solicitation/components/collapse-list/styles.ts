import styled from "styled-components";

export const ContainerAccordionItem = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    border-radius: 12px;
    font-size: 12px;
`;

export const ContainerAccordionContent = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 5px;
`;

export const CollapseWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;
