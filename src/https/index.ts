import { TQuestionBody } from '@/types/types';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const API_BASE_URL: string = process.env.NEXT_PUBLIC_BASE_URL!
export const axiosRequestConfig: AxiosRequestConfig = {
    withCredentials: true,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
}


// questions
export async function postQuestion({ question, discription }: TQuestionBody) {
    const response = await axios.post(
        API_BASE_URL + "/api/question",
        {
            "question": question,
            "discription": discription
        },
        axiosRequestConfig
    )
    return response
}

export async function getQuestion(qid: string) {
    const response = await axios.get(
        API_BASE_URL + `/api/question?qid=${qid}`,
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
export async function postAnswer({ question: questionId, discription: answer }: TQuestionBody) {
    console.log(questionId, answer)
    const response = await axios.post(
        API_BASE_URL + "/api/answer",
        {
            "question": questionId,
            "discription": answer
        },
        axiosRequestConfig
    )
    return response
}
