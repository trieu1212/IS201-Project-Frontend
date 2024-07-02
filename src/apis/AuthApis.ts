import Axios from '../Axios'
import { LoginUser } from '../types/LoginUser'
import { RegisterUser } from '../types/RegisterUser'
export const authApis = {
    register: async (data:RegisterUser)=> Axios({
        url:'/auth/register',
        method:'POST',
        data
    }),
    login: async (data:LoginUser) => Axios({
        url:'/auth/login',
        method:'POST',
        data
    }),
    logout: async () => Axios({
        url:'/auth/logout',
        method:'POST',
    }),
    forgotPass: async (email:string) => Axios({
        url:'/auth/forgot-password',
        method:'POST',
        data:{email}
    }),
}