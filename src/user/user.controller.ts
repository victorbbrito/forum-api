import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe} from '@nestjs/common';
import { User as UserModel} from '../generated/prisma/client'
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {

    constructor(private userService: UserService){}

    @Post()
    async signupUser(
        @Body(new ValidationPipe()) userData: CreateUserDto
    ): Promise<UserModel> {
        return this.userService.createUser(userData);
    }

    @Get()
    @UseGuards(AuthGuard)
    async getUsers(){
        return await this.userService.users();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getUserById(
        @Param('id', ParseIntPipe) id: number
    ): Promise<UserModel | null> {
        return this.userService.user({ id });
    }

    @UseGuards(AuthGuard)
    @Patch(':id')
    async updateUser(
        @Body(new ValidationPipe) userData: UpdateUserDto,
        @Param('id', ParseIntPipe) id: number
    ): Promise<UserModel> {
        return this.userService.updateUser({where: { id }, data: userData});
    }
    
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<UserModel> {
        return this.userService.deleteUser({ id });
    }
}
