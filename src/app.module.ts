import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseConfigService } from './config/MongooseConfig.service';
import configuration from './config/configuration';
import { UserModule } from './users/users.module';
import { AutModule } from './auth/auth.module';
import { CostsModule } from './costs/costs.module';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useClass: MongooseConfigService,
    }),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    AutModule,
    CostsModule
  ],
})
export class AppModule {}
