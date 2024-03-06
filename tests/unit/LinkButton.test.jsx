import { render, screen } from "@testing-library/react";
import LinkButton from "@/app/common/components/LinkButton";

describe("LinkButton 컴포넌트", () => {
  it("href 속성이 올바르게 전달되는지 확인", () => {
    const testHref = "/test";
    const testText = "테스트 버튼";
    render(<LinkButton href={testHref} text={testText} />);

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", testHref);
  });

  it("텍스트가 올바르게 렌더링되는지 확인", () => {
    const testHref = "/test";
    const testText = "테스트 버튼";
    render(<LinkButton href={testHref} text={testText} />);

    const textElement = screen.getByText(testText);
    expect(textElement).toBeInTheDocument();
  });

  it("올바른 클래스가 적용되는지 확인", () => {
    const testHref = "/test";
    const testText = "테스트 버튼";
    render(<LinkButton href={testHref} text={testText} />);

    const buttonElement = screen.getByText(testText);
    expect(buttonElement).toHaveClass("bg-red-500");
    expect(buttonElement).toHaveClass("hover:bg-red-600");
    expect(buttonElement).toHaveClass("text-white");
    expect(buttonElement).toHaveClass("font-bold");
    expect(buttonElement).toHaveClass("h-full");
    expect(buttonElement).toHaveClass("w-full");
    expect(buttonElement).toHaveClass("rounded");
  });
});
