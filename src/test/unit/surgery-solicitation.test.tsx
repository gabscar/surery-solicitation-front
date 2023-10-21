import { describe, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SurgeryListPage } from "../../modules/surgery-solicitation/list/list";
import { SurgerySolicitationForm } from "@src/modules/surgery-solicitation/components/form";
import { ICreateSurgerySolicitationParams } from "@src/lib/services/surgery-solicitation/interfaces";
import { CreateSolicitation } from "@src/modules/surgery-solicitation/create";
import { ModalContext } from "@src/lib/context/modal/modal-provider";

vi.mock("./MyContext", () => ({
    MyContext: {
        selectedChild: {
            form: <CreateSolicitation />,
            modalTitle: "Criar Solicitação",
        },
        isOpen: true,
        changeSelectedChild: () => {},
        changeOpenStatus: () => {},
    },
}));

describe("App", () => {
    it("Renders home page", () => {
        // ARRANGE
        render(<SurgeryListPage />);
        // ACT
        // EXPECT
        expect(screen.getByText(/Criar Solicitação/i)).toBeInTheDocument();
        expect(screen.getByText(/Code/i)).toBeInTheDocument();
        expect(screen.getByText(/Sala/i)).toBeInTheDocument();
        expect(screen.getByText(/Médico/i)).toBeInTheDocument();
        expect(screen.getByText(/Hospital/i)).toBeInTheDocument();
    });

    test("Check form fields", async () => {
        // const { getByTestId, getByText } = render(<SurgeryListPage />);

        const { getByTestId } = render(
            <SurgerySolicitationForm
                onSubmit={async (value: ICreateSurgerySolicitationParams) => {
                    console.log(value);
                }}
                submitFormText="Create"
                loading={false}
            />
        );
        expect(getByTestId("solicitation-form")).toBeInTheDocument();
    });

    it("should render the value from context", () => {
        const { getByText, getByTestId } = render(
            <ModalContext.Provider
                value={{
                    selectedChild: {
                        form: <CreateSolicitation />,
                        modalTitle: "Criar Solicitação",
                    },
                    isOpen: true,
                    changeSelectedChild: () => {},
                    changeOpenStatus: () => {},
                }}
            >
                <CreateSolicitation />
            </ModalContext.Provider>
        );

        expect(getByText("Criar")).toBeInTheDocument();
        expect(getByTestId("solicitation-form")).toBeInTheDocument();
    });
});
