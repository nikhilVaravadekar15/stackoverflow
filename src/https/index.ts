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
        API_BASE_URL + "/api/post-question",
        {
            "question": question,
            "description": discription
        },
        axiosRequestConfig
    )
}
