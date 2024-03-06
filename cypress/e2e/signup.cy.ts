describe("SignIn 페이지", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("로그인 양식 제출", () => {
    // 이메일과 비밀번호를 입력합니다.
    cy.get('input[name="email"]').type("4538asd@gmail.com");
    cy.get('input[name="password"]').type("12341234");

    // 로그인 버튼을 클릭합니다.
    cy.contains("로그인").click();

    // 로그인이 성공적으로 수행되었는지 확인합니다.
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("이메일 또는 비밀번호 누락 시 오류 메시지 표시", () => {
    // 비어있는 양식으로 제출합니다.
    cy.contains("로그인").click();

    // 오류 메시지가 표시되는지 확인합니다.
    cy.get(".text-red-500").should("contain", "이메일");
    cy.get(".text-red-500").should("contain", "비밀번호");
  });

  it("잘못된 이메일 또는 비밀번호 입력 시 오류 메시지 표시", () => {
    // 잘못된 이메일과 비밀번호를 입력합니다.
    cy.get('input[name="email"]').type("test@naver.com");
    cy.get('input[name="password"]').type("12341234");

    // 로그인 버튼을 클릭합니다.
    cy.contains("로그인").click();

    // 오류 메시지가 표시되는지 확인합니다.
    cy.get(".text-red-500").should("contain", "email");
    cy.get(".text-red-500").should("contain", "password");
  });
});
