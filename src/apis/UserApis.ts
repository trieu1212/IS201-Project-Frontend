import Axios from '../Axios'

export const userApis = {
    getUser: async (id:string | null)=>Axios({
        url:`/user/${id}`,
        method:'GET'
    })
}