import { Answers } from "../../generated/prisma/client";
import { Question } from "../../questions/entities/question.entity";
import { User } from "../../user/entities/user.entity";

export class Answer implements Answers{
    id: number;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    questionId: number;
    user: User;
    question: Question
}
