describe("Tic-Tac-Toe App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173"); // change to your app URL
  });
  
  it("UI renders: title, , initial scores", () => {
    cy.contains("Tic-Tac-Toe").should("be.visible");
    cy.contains("X: 0").should("be.visible");
    cy.contains("Draws: 0").should("be.visible");
    cy.contains("O: 0").should("be.visible");
  });

  it("UI renders: Restart Round, Reset All Buttons", () => {
    cy.contains("button", "Restart Round").should("be.visible");
    cy.contains("button", "Reset All").should("be.visible");
  });
});

