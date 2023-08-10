import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { TQuestionBody, TEditQuestion, TEditAnswer, TVotes, TAcceptedAnswer } from '@/types/types';

export const API_BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL!
export const axiosRequestConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
}


// questions
export async function getQuestion(qid: string) {
    const response = await axios.get(
        API_BASE_URL + `/api/question?qid=${qid}`,
        axiosRequestConfig
    )
    return response
}

export async function postQuestion({ question, description }: TQuestionBody) {
    const response = await axios.post(
        API_BASE_URL + "/api/question",
        {
            "question": question,
            "description": description
        },
        axiosRequestConfig
    )
    return response
}

export async function updateQuestion({ qid, question, description }: TEditQuestion) {
    const response = await axios.put(
        API_BASE_URL + `/api/question`,
        {
            "qid": qid,
            "question": question,
            "description": description
        },
        axiosRequestConfig
    )
    return response
}

export async function deleteQuestion(id: string) {
    const response = await axios.delete(
        API_BASE_URL + `/api/question?id=${id}`,
        axiosRequestConfig
    )
    return response
}

export async function getQuestions(limit: number = 10, pageNumber: number = 1, sort: string = "desc", search: string = "") {
    const response = await axios.get(
        API_BASE_URL + `/api/question?limit=${limit}&pageNumber=${pageNumber}&sortBy=${sort}&search=${search}`,
        axiosRequestConfig
    )
    return response
}

export async function getUserAskedQuestions(limit: number = 10, pageNumber: number = 1, sort: string = "desc", email: string) {
    const response = await axios.get(
        API_BASE_URL + `/api/question?limit=${limit}&pageNumber=${pageNumber}&sortBy=${sort}&email=${email}`,
        axiosRequestConfig
    )
    return response
}

export async function getUserAnsweredQuestions(limit: number = 10, pageNumber: number = 1, sort: string = "desc", email: string) {
    const response = await axios.get(
        API_BASE_URL + `/api/question?limit=${limit}&pageNumber=${pageNumber}&sortBy=${sort}&email=${email}&answered=${true}`,
        axiosRequestConfig
    )
    return response
}

// answers
export async function postAnswer({ question: questionId, description: answer }: TQuestionBody) {
    const response = await axios.post(
        API_BASE_URL + "/api/answer",
        {
            "question": questionId,
            "description": answer
        },
        axiosRequestConfig
    )
    return response
}

export async function updateAnswer({ qid, description: answer }: TEditAnswer) {
    const response = await axios.put(
        API_BASE_URL + `/api/answer`,
        {
            "qid": qid,
            "description": answer
        },
        axiosRequestConfig
    )
    return response
}

export async function deleteAnswer(id: string) {
    const response = await axios.delete(
        API_BASE_URL + `/api/answer?id=${id}`,
        axiosRequestConfig
    )
    return response
}

export async function updateAcceptedAnswer({ id, acceptedAnswer }: TAcceptedAnswer) {
    const response = await axios.put(
        API_BASE_URL + `/api/answer/accepted`,
        {
            "id": id,
            "acceptedAnswer": acceptedAnswer
        },
        axiosRequestConfig
    )
    return response
}

// votes
export async function updateQuestionVote({ id, upvotes, downvotes }: TVotes) {
    const response = await axios.post(
        API_BASE_URL + `/api/question/votes`,
        {
            id,
            upvotes,
            downvotes,
        },
        axiosRequestConfig
    )
    return response
}

export async function updateAnswerVote({ id, upvotes, downvotes }: TVotes) {
    const response = await axios.post(
        API_BASE_URL + `/api/answer/votes`,
        {
            "id": id,
            "upvotes": upvotes,
            "downvotes": downvotes,
        },
        axiosRequestConfig
    )
    return response
}
