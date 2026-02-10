import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Prisma, User } from 'src/generated/prisma/client';

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
        console.log(data)
        return this.prisma.user.create({data});
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
