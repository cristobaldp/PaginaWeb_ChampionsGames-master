import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Register from "../Register";

describe("Register.jsx - validación de formulario", () => {

  test("muestra error cuando las contraseñas no coinciden", () => {
    render(<Register onRegister={jest.fn()} goLogin={jest.fn()} />);

    // coger TODOS los inputs del formulario
    const inputs = document.querySelectorAll("input");

    // username
    fireEvent.change(inputs[0], {
      target: { value: "usuarioTest" }
    });

    // email
    fireEvent.change(inputs[1], {
      target: { value: "correo@test.com" }
    });

    // password
    fireEvent.change(inputs[2], {
      target: { value: "1234" }
    });

    // confirmar password
    fireEvent.change(inputs[3], {
      target: { value: "9999" }
    });

    // enviar formulario
    fireEvent.click(screen.getByText("Registrarme"));

    // comprobar mensaje de error
    expect(
      screen.getByText("Las contraseñas no coinciden")
    ).toBeInTheDocument();
  });

});
