
export type TUser = {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
}

export type TQuestionBody = {
    question: string,
    description: string
}

export type TEditAnswer = {
    qid: string
    description: string
}

export type TEditQuestion = {
    qid: string
} & TQuestionBody

export type TVotes = {
    id: string
    upvotes: number
    downvotes: number
}
