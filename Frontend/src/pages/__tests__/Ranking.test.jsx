import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ranking from "../Ranking";

describe("Ranking.jsx - renderizado condicional", () => {

  test("muestra mensaje cuando ranking está vacío", () => {
    render(<Ranking ranking={[]} onRestart={jest.fn()} />);

    // comprobar que aparece el texto
    expect(
      screen.getByText("No hay ranking disponible")
    ).toBeInTheDocument();
  });

});
