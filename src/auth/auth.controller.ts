import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { UserCreatedResponseDto } from "./dto/user-created-response.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<UserCreatedResponseDto> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(@Body() authCredentials: AuthCredentialsDto): Promise<AuthResponseDto> {
    return this.authService.signIn(authCredentials);
  }

  @Get('/test')
  testTry() {
    return { success: true }
  }
}
