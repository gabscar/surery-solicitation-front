import styled, { css } from "styled-components";

export const FormWrapper = styled.p`
    ${() => css`
        display: flex;
        max-height: 65vh;
        overflow-y: auto;
        padding: 0px;
    `}
`;
