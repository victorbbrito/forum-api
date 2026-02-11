import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { Prisma, User as UserModel} from '../generated/prisma/client'
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async signupUser(
        @Body() userData: {email: string, name: string,  password: string}
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserById(
        @Param('id') id: string
    ): Promise<UserModel | null> {
        return this.userService.user({id: Number(id)});
    }

    @UseGuards(AuthGuard)
    @Patch()
    async updateUser(
        @Body() userData: Prisma.UserUpdateInput,
        @Param('id')id: string
    ): Promise<UserModel> {
        return this.userService.updateUser({where: {id: Number(id)}, data: userData});
    }
    
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(
        @Param('id') id: string,
    ): Promise<UserModel> {
        return this.userService.deleteUser({id: Number(id)});
    }
}
