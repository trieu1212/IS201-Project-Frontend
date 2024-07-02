import Axios from '../Axios'
import { QueryUser } from '../types/QueryUser'

export const userApis = {
    getUser: async (id:string | null)=>Axios({
        url:`/user/${id}`,
        method:'GET'
    }),
    getAll: async(query:QueryUser) => Axios({
        url:`/user?${query.itemPerPage?'itemPerPage='+query.itemPerPage:''}&${query.page?'page='+query.page:'page=1'}&${query.search?'search='+query.search:''}`,
        method:'GET'
    }),
}