import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from 'src/generated/prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    @Inject()
    private readonly prisma: PrismaService

    async user(UserWhereUniqueInput: Prisma.UserWhereUniqueInput) :Promise<User | null>{
        return this.prisma.user.findUnique({
            where: UserWhereUniqueInput
        });
    }

    async createUser(data: Prisma.UserCreateInput){
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        
        return this.prisma.user.create({
            data: {...data, password: hashedPassword}
        });
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<User> {
        const {where, data} = params;
        return this.prisma.user.update({data,where});
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({where});
    }
}
