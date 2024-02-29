import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ MongooseModule.forRoot('mongodb+srv://hskim:W7NX7xefVFHVDR9f@cluster0.7gmymj2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  ),AuthModule,UsersModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
