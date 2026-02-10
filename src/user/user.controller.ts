import { Body, Controller, Post } from '@nestjs/common';
import { User as UserModel} from '../generated/prisma/client'
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post('signup')
    async signupUser(
        @Body() userData: {email: string, name: string,  password: string}
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }
}
