import { expect } from "chai";

describe("Login - manejo de error (Mocha)", () => {

  it("debe detectar un login incorrecto cuando la respuesta no es OK", () => {
    const response = {
      ok: false,
      error: "Credenciales incorrectas"
    };

    expect(response.ok).to.be.false;
    expect(response.error).to.equal("Credenciales incorrectas");
  });

});
