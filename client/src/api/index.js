import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/wedding/api',
})

export const insertGuest = payload => api.post(`/guest`, payload)
export const getAllGuests = () => api.get(`/guest`)
export const updateGuestById = (id, payload) => api.put(`/guest/${id}`, payload)
export const deleteGuestById = id => api.delete(`/guest/${id}`)
export const getGuestById = id => api.get(`/guest/${id}`)

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