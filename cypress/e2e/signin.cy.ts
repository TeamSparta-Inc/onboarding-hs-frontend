describe("SignIn 페이지", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("로그인이 성공적으로 이루어지는지 확인", () => {
    // 이메일과 비밀번호를 입력합니다.
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="password"]').type("password123");

    // 로그인 버튼을 클릭합니다.
    cy.contains("로그인").click();

    // 로그인이 성공적으로 이루어졌는지 확인합니다.
    cy.url().should("eq", Cypress.config().baseUrl + "/signin");

    // 로그아웃 버튼이 표시되는지 확인합니다.
    // cy.contains("로그아웃").should("exist");
  });

  it("이메일 또는 비밀번호를 입력하지 않으면 오류가 발생하는지 확인", () => {
    // 로그인 버튼을 클릭합니다.
    cy.contains("로그인").click();

    // 오류가 발생했는지 확인합니다.
    cy.get('input[name="email"]').should("have.class", "text-red-500");
    cy.get('input[name="password"').should("have.class", "text-red-500");
  });

  it("잘못된 이메일 또는 비밀번호를 입력하면 오류가 발생하는지 확인", () => {
    // 잘못된 이메일과 비밀번호를 입력합니다.
    cy.get('input[name="email"]').type("wrong@naver.com");
    cy.get('input[name="password"]').type("password123");

    // 로그인 버튼을 클릭합니다.
    cy.contains("로그인").click();

    // 오류가 발생했는지 확인합니다.
    cy.get('input[name="email"]').should("have.class", "text-red-500");
    cy.get('input[name="password"]').should("have.class", "text-red-500");
  });
});
