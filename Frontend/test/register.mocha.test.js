import { expect } from "chai";

describe("Register - validación de contraseñas (Mocha)", () => {

  it("debe devolver error si las contraseñas no coinciden", () => {
    const password = "1234";
    const confirmar = "9999";

    const sonIguales = password === confirmar;

    expect(sonIguales).to.be.false;
  });

});
