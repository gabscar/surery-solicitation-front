import styled, { css } from "styled-components";
import media from "styled-media-query";

export const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70vw;
`;

export const HeaderWrapper = styled.div`
    ${() => css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        .buttonContainer {
            display: flex;
            gap: 10px;
        }

        ${media.lessThan("medium")`
            flex-wrap:wrap;
            margin-bottom:10px;

        `}
    `}
`;

export const TitlePage = styled.h1`
    font-size: 20px;
`;
