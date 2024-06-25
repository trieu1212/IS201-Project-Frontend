import Axios from '../Axios'
import { CreateOrder } from '../types/CreateOrder'

export const OrderApis = {
    createOrder: async (data: CreateOrder) => Axios({
        url: '/order/create',
        method: 'POST',
        data
    }),
    getAll: async () => Axios({
        url: '/order',
        method: 'GET'
    }),
}