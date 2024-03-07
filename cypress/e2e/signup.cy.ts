describe("SignIn 페이지", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("로그인 양식 제출", () => {
    cy.get('input[name="email"]').type("4538asd@gmail.com");
    cy.get('input[name="password"]').type("12341234");

    cy.contains("로그인").click();

    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("이메일 또는 비밀번호 누락 시 오류 메시지 표시", () => {
    cy.contains("로그인").click();

    cy.get(".text-red-500").should("contain", "이메일");
    cy.get(".text-red-500").should("contain", "비밀번호");
  });

  it("잘못된 이메일 또는 비밀번호 입력 시 오류 메시지 표시", () => {
    cy.get('input[name="email"]').type("test@naver.com");
    cy.get('input[name="password"]').type("12341234");

    cy.contains("로그인").click();

    cy.get(".text-red-500").should("contain", "email");
    cy.get(".text-red-500").should("contain", "password");
  });
});
