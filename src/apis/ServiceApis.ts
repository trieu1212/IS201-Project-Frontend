import Axios from '../Axios'
import { QueryGetService } from '../types/QueryGetServices'

export const serviceApis = {
    getAll: async (query:QueryGetService)=>Axios({
        url:`/service?`,
        method:'GET',
    }),
    getOne: async (id:string | null)=>Axios({
        url:`/service/${id}`,
        method:'GET'
    })
}