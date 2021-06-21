import axios from 'axios'
import { getAccessToken } from '../accessToken';

const accessToken = getAccessToken()
const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
}
const api = axios.create({
    baseURL: 'http://localhost:3000/wedding/api',
})

export const insertGuest = payload => api.post(`/guest`, payload, config)
export const getAllGuests = () => api.get(`/guest`, config)
export const updateGuestById = (id, payload) => api.put(`/guest/${id}`, payload, config)
export const deleteGuestById = id => api.delete(`/guest/${id}`, config)
export const getGuestById = id => api.get(`/guest/${id}`, config)

export const getEncCredentials = (payload) => api.post(`/getEncCredentials`, payload)

const apis = {
    insertGuest,
    getAllGuests,
    updateGuestById,
    deleteGuestById,
    getGuestById,
    getEncCredentials
}

export default apis