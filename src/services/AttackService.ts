import { genericRequest, genericRequestAutheticated } from '../utils/genericRequest'

const base_url = import.meta.env.VITE_ENDPOINT_API ?? 'http://localhost:3000'

const headers = {
  'Content-Type': 'application/json',
  Authorization: 'Bearer ' + localStorage.getItem('token'),
}

export const sqlService = async (newItem: string) => {
  return await genericRequest(base_url + '/items', 'POST', newItem)
}

export const getCommentService = async () => {
    return await genericRequestAutheticated(headers,base_url + '/attack/xss', 'GET')
}

export const addCommentService = async (user_id: number, comment: string) => {
    return await genericRequestAutheticated(headers,base_url + '/attack/xss', 'POST', {user_id, comment})
}

export const deleteCommentService = async (user_id: number) => {
    return await genericRequestAutheticated(headers,base_url + '/attack/xss', 'POST', {user_id})
}