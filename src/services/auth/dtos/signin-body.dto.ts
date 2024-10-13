import { isEmail } from 'class-validator';

export class LoginInBodyDTO {
  email: string;
  password: string;

  constructor(prev?: Partial<LoginInBodyDTO>) {
    this.email = prev?.email ?? '';
    this.password = prev?.password ?? '';
  }

  public validate(): string | null {
    if (this.email === '') {
      return '이메일을 입력하세요.';
    }

    if (isEmail(this.email) === false) {
      return '이메일 형식에 맞지 않습니다.';
    }

    if (this.password === '') {
      return '비밀번호를 입력하세요.';
    }

    return null;
  }
}
