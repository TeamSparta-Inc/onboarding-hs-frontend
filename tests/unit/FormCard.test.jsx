import { render, screen } from "@testing-library/react";
import FormCard from "@/app/common/components/FormCard";

describe("FormCard 컴포넌트", () => {
  it("제목이 올바르게 렌더링되는지 확인", () => {
    const testTitle = "테스트 제목";
    render(
      <FormCard title={testTitle}>
        <div>내용</div>
      </FormCard>
    );

    const titleElement = screen.getByText(testTitle);
    expect(titleElement).toBeInTheDocument();
  });

  it("자식 컴포넌트가 올바르게 렌더링되는지 확인", () => {
    render(
      <FormCard>
        <div>내용</div>
      </FormCard>
    );

    const childElement = screen.getByText("내용");
    expect(childElement).toBeInTheDocument();
  });
});
