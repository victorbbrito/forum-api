import "dotenv/config";
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'src/generated/prisma/client';
// import { PrismaPg } from '@prisma/adapter-pg'

const connectionString = `${process.env.DATABASE_URL}`

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
  constructor(){
    console.log(`------- DB:${connectionString} -------`);
    const adapter = new PrismaPg({connectionString    });
    super({ adapter });
  }
  
  async onModuleInit() {
    await this.$connect();
  }
}
