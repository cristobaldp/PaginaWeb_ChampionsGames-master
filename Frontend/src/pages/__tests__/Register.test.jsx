import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../Register";

describe("Register.jsx - validación de formulario", () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ok: true }),
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("muestra error cuando las contraseñas no coinciden", () => {
    render(<Register onRegister={jest.fn()} goLogin={jest.fn()} />);

    const inputs = document.querySelectorAll("input");

    fireEvent.change(inputs[0], { target: { value: "usuarioTest" } });
    fireEvent.change(inputs[1], { target: { value: "correo@test.com" } });
    fireEvent.change(inputs[2], { target: { value: "1234" } });
    fireEvent.change(inputs[3], { target: { value: "9999" } });

    fireEvent.click(screen.getByText("Registrarme"));

    expect(
      screen.getByText("Las contraseñas no coinciden")
    ).toBeInTheDocument();
  });

  test("muestra mensaje de éxito cuando el registro es correcto", async () => {
    render(<Register onRegister={jest.fn()} goLogin={jest.fn()} />);

    const inputs = document.querySelectorAll("input");

    fireEvent.change(inputs[0], { target: { value: "usuarioTest" } });
    fireEvent.change(inputs[1], { target: { value: "correo@test.com" } });
    fireEvent.change(inputs[2], { target: { value: "1234" } });
    fireEvent.change(inputs[3], { target: { value: "1234" } });

    fireEvent.click(screen.getByText("Registrarme"));

    await waitFor(() => {
      expect(
        screen.getByText("Usuario registrado correctamente")
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByText("Las contraseñas no coinciden")
    ).not.toBeInTheDocument();
  });
});
