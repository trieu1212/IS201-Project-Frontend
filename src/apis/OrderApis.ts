import Axios from 'axios'
import { CreateOrder } from '../types/CreateOrder'

export const OrderApis = {
    createOrder: async (data: CreateOrder) => Axios({
        url: '/order/create',
        method: 'POST',
        data
    })
}