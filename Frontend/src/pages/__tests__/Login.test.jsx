import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../Login";

describe("Login.jsx - manejo de errores", () => {

  beforeEach(() => {
    // mock global fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: "Credenciales incorrectas" })
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("muestra mensaje de error cuando las credenciales son incorrectas", async () => {
    render(<Login onLogin={jest.fn()} goRegister={jest.fn()} />);

    // escribir usuario y contraseña
    fireEvent.change(
      screen.getByPlaceholderText("Tu usuario...."),
      { target: { value: "usuario" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("••••••"),
      { target: { value: "1234" } }
    );

    // enviar formulario
    fireEvent.click(screen.getByText("Entrar"));

    // comprobar que aparece el error
    await waitFor(() => {
      expect(
        screen.getByText("Credenciales incorrectas")
      ).toBeInTheDocument();
    });
  });

});
