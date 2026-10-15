describe("StudyHub Products Page", () => {

  beforeEach(() => {
  cy.visit("/signin");

  cy.window().then((win) => {
    win.localStorage.setItem("token", "cypress-test-token");
  });

  cy.visit("/products");
});

  it("displays the products page", () => {
    cy.contains("h1", "StudyHub Products").should("be.visible");

    cy.get(".product-card").should("have.length", 6);

    cy.contains("Computer Science Textbook").should("be.visible");
    cy.contains("Student Laptop").should("be.visible");
    cy.contains("Scientific Calculator").should("be.visible");

    cy.screenshot("Products_Test");
  });

  it("searches for a product by name", () => {
    cy.get('input[placeholder="Search for a product..."]')
      .type("Student Laptop");

    cy.get(".product-card").should("have.length", 1);
    cy.contains("Student Laptop").should("be.visible");
    cy.contains("Computer Science Textbook").should("not.exist");
  });

  it("filters products by category", () => {
    cy.contains(".category-buttons button", "Textbooks").click();

    cy.get(".product-card").should("have.length", 2);

    cy.contains("Computer Science Textbook").should("be.visible");
    cy.contains("Programming Textbook").should("be.visible");
    cy.contains("Student Laptop").should("not.exist");
  });

  it("shows a message when no products match the search", () => {
    cy.get('input[placeholder="Search for a product..."]')
      .type("ProductThatDoesNotExist");

    cy.contains("No products found").should("be.visible");
    cy.get(".product-card").should("have.length", 0);
  });

  it("shows the correct product count", () => {
    cy.contains("Showing").should("be.visible");
    cy.get(".product-count").should("contain.text", "6");
  });

});
