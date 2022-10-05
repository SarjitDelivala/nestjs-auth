import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { CreateUserDto } from "./dto/create-user.dto";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { JwtPayload } from "./jwt-payload.interface";
import { UserCreatedResponseDto } from "./dto/user-created-response.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {
  }

  async signUp(createUserDto: CreateUserDto): Promise<UserCreatedResponseDto> {
    const { name, email, password } = createUserDto;

    const user = new User();
    user.name = name;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      return new UserCreatedResponseDto();
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") { // duplicate username
        throw new ConflictException("Email already exists");
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      }
    }
    // return this.userRepository.signUp(createUserDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<AuthResponseDto> {
    const { email, password } = authCredentialsDto;

    const user = await this.userRepository.findOne({
      where: {
        email: email
      }
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email };
      const accessToken: string = this.jwtService.sign(payload);

      const response = new AuthResponseDto();
      response.accessToken = accessToken;
      return response;
    } else {
      throw new UnauthorizedException("Email and Password does not match");
    }
  }


  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
