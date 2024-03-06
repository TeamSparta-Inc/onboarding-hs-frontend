import { render, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "@/app/signup";

describe("SignUp 페이지", () => {
  it("폼 제출 시 fetchSignup 함수가 호출되는지 확인", async () => {
    const mockFetchSignup = jest.fn();

    render(<SignUp />);

    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const submitButton = screen.getByText("회원가입");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    expect(mockFetchSignup).toHaveBeenCalledWith({
      username: "test@example.com",
      password: "password123",
    });
  });
});
