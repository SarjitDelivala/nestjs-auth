import { IsString, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {

  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}