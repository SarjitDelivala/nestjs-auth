import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;
}