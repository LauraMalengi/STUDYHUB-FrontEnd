describe("StudyHub Login Page", () => {

  beforeEach(() => {
    cy.visit("/signin");
  });

  it("displays the login form", () => {
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="password"]').should("be.visible");

    cy.contains("button", "Log In").should("be.visible");

    cy.screenshot("Login_Test");
  });

  it("requires email and password", () => {
    cy.get('input[name="email"]').should("have.attr", "required");
    cy.get('input[name="password"]').should("have.attr", "required");
  });

  it("rejects an invalid email address", () => {
    cy.get('input[name="email"]').type("invalid-email");
    cy.get('input[name="password"]').type("StudyHubTest123!");

    cy.get('input[name="email"]').then(($input) => {
      expect($input[0].checkValidity()).to.equal(false);
    });
  });

  it("allows the user to navigate to signup", () => {
    cy.contains("a", "Sign Up").click();

    cy.location("pathname").should("eq", "/signup");
  });

  it("shows an error when login credentials are incorrect", () => {
    cy.intercept("POST", "**/login", {
      statusCode: 401,
      body: {
        message: "Invalid email or password"
      }
    }).as("loginRequest");

    cy.get('input[name="email"]')
      .type("wrong@example.com");

    cy.get('input[name="password"]')
      .type("WrongPassword123!");

    cy.contains("button", "Log In").click();

    cy.wait("@loginRequest");

    cy.get(".error")
      .should("be.visible")
      .and("contain.text", "Invalid email or password");

    cy.location("pathname").should("eq", "/signin");
  });

  it("logs in successfully and navigates to home", () => {
    cy.intercept("POST", "**/login", {
      statusCode: 200,
      body: {
        token: "cypress-test-token"
      }
    }).as("loginRequest");

    cy.on("window:alert", (message) => {
      expect(message).to.equal("LogIn Successful!");
    });

    cy.get('input[name="email"]')
      .type("student@example.com");

    cy.get('input[name="password"]')
      .type("TestPassword123!");

    cy.contains("button", "Log In").click();

    cy.wait("@loginRequest");

    cy.location("pathname").should("eq", "/home");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("token"))
        .to.equal("cypress-test-token");
    });
  });

});
