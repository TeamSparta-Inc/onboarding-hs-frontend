import LinkButton from "@/app/common/components/LinkButton";
import { PATHS } from "@/constants/paths";

export default function Home() {
  return (
    <main>
      <LinkButton href={PATHS.SIGN_IN} text="로그인" />
      <LinkButton href={PATHS.SIGN_UP} text="회원가입" />
    </main>
  );
}
