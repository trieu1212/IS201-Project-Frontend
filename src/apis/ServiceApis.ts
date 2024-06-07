import Axios from '../Axios'
import { QueryGetService } from '../types/QueryGetServices'

export const serviceApis = {
    getAll: async (query:QueryGetService)=>Axios({
        url:`/service?`,
        method:'GET',
    }),
}