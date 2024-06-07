import Axios from '../Axios'
import { QueryGetPost } from '../types/QueryGetPosts'

export const PostApis = {
    getAll : async (query:QueryGetPost) => Axios({
        url:`/posts?${query.address?'address='+query.address:''}&${query.itemPerPage?'itemPerPage='+query.itemPerPage:''}&${query.page?'page='+query.page:'page=1'}&${query.roomType?'roomType='+query.roomType:''}&${query.search?'search='+query.search:''}`,
        method:'GET'
    })
}