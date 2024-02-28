import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AppService {

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }
}
