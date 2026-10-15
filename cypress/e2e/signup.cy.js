describe("StudyHub Signup Page", () => {

  beforeEach(() => {
    cy.visit("/signup");
  });

  it("displays the signup form", () => {
    cy.contains("h1", "Welcome to StudyHub").should("be.visible");

    cy.get('input[name="fullname"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");
    cy.get('input[name="confirmPassword"]').should("be.visible");

    cy.contains("button", "Create Account").should("be.visible");

    cy.screenshot("Signup_Test");
  });

  it("requires mandatory fields", () => {
    cy.get('input[name="fullname"]').should("have.attr", "required");
    cy.get('input[name="email"]').should("have.attr", "required");
    cy.get('input[name="password"]').should("have.attr", "required");
    cy.get('input[name="confirmPassword"]').should("have.attr", "required");
  });

  it("rejects an invalid email address", () => {
    cy.get('input[name="fullname"]').type("Cypress Test User");
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("StudyHubTest123!");
    cy.get('input[name="confirmPassword"]').type("StudyHubTest123!");

    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.equal(false);
    });
  });

  it("shows an error when passwords do not match", () => {
    cy.get('input[name="fullname"]').type("Cypress Test User");
    cy.get('input[name="email"]').type("mismatch@example.com");
    cy.get('input[name="password"]').type("StudyHubTest123!");
    cy.get('input[name="confirmPassword"]').type("DifferentTest123!");

    cy.contains("button", "Create Account").click();

    cy.contains("Passwords do not match").should("be.visible");
  });

  it("allows the user to select Buyer or Seller", () => {
    cy.contains("button", "Seller").click();
    cy.contains("button", "Seller").should("have.class", "active");

    cy.contains("button", "Buyer").click();
    cy.contains("button", "Buyer").should("have.class", "active");
  });

it("navigates to login using the login link", () => {
  cy.get(".login-link a")
    .should("be.visible")
    .click();

  cy.location("pathname").should("eq", "/signin");
});  

});
