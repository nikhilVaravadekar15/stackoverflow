
export type TUser = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

export type TQuestionBody = {
    question: string,
    discription: string
}

export type TEditAnswer = {
    qid: string
    discription: string
}

export type TEditQuestion = {
    qid: string
} & TQuestionBody
