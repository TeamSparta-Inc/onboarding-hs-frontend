import { render, screen } from "@testing-library/react";
import GNB from "@/app/common/components/GNB";

describe("GNB 컴포넌트", () => {
  it("로고 이미지가 올바르게 렌더링되는지 확인", () => {
    render(<GNB />);

    const logoImageElement = screen.getByAltText("team_sparta_logo");
    expect(logoImageElement).toBeInTheDocument();
  });

  it("로고 이미지에 올바른 경로가 설정되어 있는지 확인", () => {
    render(<GNB />);

    const logoImageElement = screen.getByAltText("team_sparta_logo");
    expect(logoImageElement).toHaveAttribute("src", "/teamspartainc_logo.jpeg");
  });

  it("로고 이미지에 올바른 크기가 설정되어 있는지 확인", () => {
    render(<GNB />);

    const logoImageElement = screen.getByAltText("team_sparta_logo");
    expect(logoImageElement).toHaveAttribute("width", "80");
    expect(logoImageElement).toHaveAttribute("height", "40");
  });

  it("타이틀이 올바르게 렌더링되는지 확인", () => {
    render(<GNB />);

    const titleElement = screen.getByText("김혜성 온보딩 페이지 헤헤");
    expect(titleElement).toBeInTheDocument();
  });
});
