import { Module } from '@nestjs/common';
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config/typeorm.config";
import { User } from "./auth/user.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env']
    }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
            type: 'mysql',
            host: config.get('DB_HOST'),
            port: config.get('DB_PORT'),
            username: config.get('DB_USERNAME'),
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_DATABASE'),
            entities: ["dist/**/*.entity.js"],
            synchronize: true,
            logging: true,
            logger: "file",
        };
      }
    })
  ],
  controllers: [],
  providers: [],
})

export class AppModule {
}