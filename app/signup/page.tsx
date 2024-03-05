import Button from "@/app/common/components/Button";
import Input from "@/app/common/components/Input";

export default function SignUp() {
  return (
    <div>
      <Input type="email" placeholder="이메일" />
      <Input type="password" placeholder="비밀번호" />
      <Button>회원가입</Button>
    </div>
  );
}
