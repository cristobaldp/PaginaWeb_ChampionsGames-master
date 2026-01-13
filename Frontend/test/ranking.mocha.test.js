import { expect } from "chai";

describe("Ranking - cálculo de porcentaje (Mocha)", () => {

  it("calcula correctamente el porcentaje de votos", () => {
    const count = 20;
    const totalVotes = 100;

    const percentage = Math.round((count / totalVotes) * 100);

    expect(percentage).to.equal(20);
  });

});
