import { PATHS } from "@/constants/paths";

describe("SignIn 페이지", () => {
  beforeEach(() => {
    cy.visit("/signin");
  });

  it("로그인 양식 제출", () => {
    const email = "test@example.com";
    const password = "password123";

    // 이메일과 비밀번호를 입력합니다.
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);

    // 로그인 버튼을 클릭합니다.
    cy.contains("로그인").click();

    // 로그인이 성공적으로 수행되었는지 확인합니다.
    cy.url().should("eq", Cypress.config().baseUrl + PATHS.HOME);
    // 혹은 PATHS.HOME에 정의된 값으로 변경할 수 있습니다.
  });

  it("이메일 또는 비밀번호 누락 시 오류 메시지 표시", () => {
    // 비어있는 양식으로 제출합니다.
    cy.contains("로그인").click();

    // 오류 메시지가 표시되는지 확인합니다.
    cy.contains("이메일").should("have.class", "text-red-500");
    cy.contains("비밀번호").should("have.class", "text-red-500");
  });
});
