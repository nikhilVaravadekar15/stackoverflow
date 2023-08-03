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


// List of all the endpoints
export function postQuestion({ question, discription }: TQuestionBody) {
    return axios.post(
        API_BASE_URL + "/api/question",
        {
            "question": question,
            "discription": discription
        },
        axiosRequestConfig
    )
}

export async function getQuestion(qid: string) {
    const response = await axios.get(
        API_BASE_URL + `/api/question?qid=${qid}`,
        axiosRequestConfig
    )
    return response.data
}

export async function getQuestions(limit: number = 10, pageNumber: number = 1, sort: string = "desc", search: string = "") {
    const response = await axios.get(
        API_BASE_URL + `/api/question?limit=${limit}&pageNumber=${pageNumber}&sortBy=${sort}&search=${search}`,
        axiosRequestConfig
    )
    return response
}
