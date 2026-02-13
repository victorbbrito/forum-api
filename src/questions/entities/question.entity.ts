import { Questions } from "src/generated/prisma";

export class Question implements Questions{
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
}
