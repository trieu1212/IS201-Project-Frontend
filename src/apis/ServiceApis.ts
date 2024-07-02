import Axios from '../Axios'
import { CreateService } from '../types/CreateService'
import { QueryGetService } from '../types/QueryGetServices'
import { UpdateService } from '../types/UpdateService'

export const serviceApis = {
    getAll: async (query:QueryGetService)=>Axios({
        url:`/service?`,
        method:'GET',
    }),
    getOne: async (id:string | null)=>Axios({
        url:`/service/${id}`,
        method:'GET'
    }),
    update: async(id:string,data:UpdateService)=>Axios({
        url:`/service/update/${id}`,
        method:'PUT',
        data
    }),
    create: async(data:CreateService)=>Axios({
        url:`/service/create`,
        method:'POST',
        data
    }), 
    delete: async(id:string)=>Axios({
        url:`/service/delete/${id}`,
        method:'DELETE'
    })
}