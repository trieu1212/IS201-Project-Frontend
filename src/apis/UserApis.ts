import Axios from '../Axios'
import { QueryUser } from '../types/QueryUser'
import { RegisterUser } from '../types/RegisterUser'
import { UpdateUser } from '../types/UpdateUser'

export const userApis = {
    getUser: async (id:string | null)=>Axios({
        url:`/user/${id}`,
        method:'GET'
    }),
    getAll: async(query:QueryUser) => Axios({
        url:`/user?${query.itemPerPage?'itemPerPage='+query.itemPerPage:''}&${query.page?'page='+query.page:'page=1'}&${query.search?'search='+query.search:''}`,
        method:'GET'
    }),
    update:async(id:string,data:UpdateUser)=>Axios({
        url:`/user/update/${id}`,
        method:'PUT',
        data
    }),
    create: async(data:RegisterUser)=>Axios({
        url:'/user/create',
        method:'POST',
        data
    })
}