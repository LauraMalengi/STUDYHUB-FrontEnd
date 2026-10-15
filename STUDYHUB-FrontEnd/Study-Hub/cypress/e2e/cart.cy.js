describe("StudyHub Shopping Cart", () => {

  beforeEach(() => {
    // Open the login page first
    cy.visit("/signin");

    // Set a test token to access protected pages
    cy.window().then((win) => {
      win.localStorage.setItem("token", "cypress-test-token");

      // Start each test with an empty cart
      win.localStorage.setItem("cartItems", "[]");
    });

    cy.visit("/cart");
  });

  it("displays an empty cart message", () => {
    cy.contains("h1", "Shopping Cart").should("be.visible");
    cy.contains("Your cart is empty").should("be.visible");
    cy.contains("You haven't added any products yet.").should("be.visible");

    cy.screenshot("Cart_Test");
  });

  it("allows the user to increase product quantity", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("cartItems", JSON.stringify([
        {
          id: 1,
          name: "Computer Science Textbook",
          category: "Textbooks",
          price: 350,
          image: "📚",
          quantity: 1
        }
      ]));
    });

    cy.reload();

    cy.get(".cart-item").should("have.length", 1);
    cy.get(".cart-quantity").find("span").should("have.text", "1");

    cy.get(".cart-quantity").contains("button", "+").click();

    cy.get(".cart-quantity").find("span").should("have.text", "2");
    cy.contains(".cart-item-total", "R700").should("be.visible");
  });

  it("allows the user to decrease product quantity", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("cartItems", JSON.stringify([
        {
          id: 1,
          name: "Computer Science Textbook",
          category: "Textbooks",
          price: 350,
          image: "📚",
          quantity: 2
        }
      ]));
    });

    cy.reload();

    cy.get(".cart-quantity").contains("button", "−").click();

    cy.get(".cart-quantity").find("span").should("have.text", "1");
    cy.contains(".cart-item-total", "R350").should("be.visible");
  });

  it("does not decrease quantity below one", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("cartItems", JSON.stringify([
        {
          id: 1,
          name: "Computer Science Textbook",
          category: "Textbooks",
          price: 350,
          image: "📚",
          quantity: 1
        }
      ]));
    });

    cy.reload();

    cy.get(".cart-quantity").contains("button", "−").click();

    cy.get(".cart-quantity").find("span").should("have.text", "1");
  });

  it("removes a product from the cart", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("cartItems", JSON.stringify([
        {
          id: 1,
          name: "Computer Science Textbook",
          category: "Textbooks",
          price: 350,
          image: "📚",
          quantity: 1
        }
      ]));
    });

    cy.reload();

    cy.get(".remove-button").click();

    cy.contains("Your cart is empty").should("be.visible");
    cy.get(".cart-item").should("have.length", 0);
  });

  it("calculates subtotal, delivery, and total correctly", () => {
    cy.window().then((win) => {
      win.localStorage.setItem("cartItems", JSON.stringify([
        {
          id: 1,
          name: "Computer Science Textbook",
          category: "Textbooks",
          price: 350,
          image: "📚",
          quantity: 2
        },
        {
          id: 3,
          name: "Scientific Calculator",
          category: "Calculators",
          price: 250,
          image: "🧮",
          quantity: 1
        }
      ]));
    });

    cy.reload();

    // Subtotal: R350 × 2 + R250 = R950
    // Delivery: R60
    // Total: R1,010

    cy.contains(".summary-row", "Subtotal").should("contain.text", "R950");
    cy.contains(".summary-row", "Delivery").should("contain.text", "R60");
    cy.contains(".summary-total", "Total").should("contain.text", "R1,010");
  });

});
