import Axios from '../Axios'
import { CreatePost } from '../types/CreatePost'
import { QueryGetPost } from '../types/QueryGetPosts'
import { UpdatePost } from '../types/UpdatePost'

export const PostApis = {
    getAll : async (query:QueryGetPost) => Axios({
        url:`/posts?${query.address?'address='+query.address:''}&${query.itemPerPage?'itemPerPage='+query.itemPerPage:''}&${query.page?'page='+query.page:'page=1'}&${query.roomType?'roomType='+query.roomType:''}&${query.search?'search='+query.search:''}`,
        method:'GET'
    }),

    getOne: async (id:string) => Axios({
        url:`/posts/${id}`,
        method:'GET'
    }),

    create: async (data: CreatePost) => Axios({
        url:'/posts/create',
        method:'POST',
        data
    }),

    getByUser: async (id:string) => Axios({
        url:`/posts/user/${id}`,
        method:'GET'
    }),

    approve: async (id:number) => Axios({
        url:`/posts/approve/${id}`,
        method:'PUT'
    }),

    hide: async (id:number) => Axios({
        url:`/posts/hide/${id}`,
        method:'PUT'
    }),

    update: async (id:string, data:UpdatePost) => Axios({
        url:`/posts/update/${id}`,
        method:'PUT',
        data
    }),
}