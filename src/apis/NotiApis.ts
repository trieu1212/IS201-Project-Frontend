import Axios from '../Axios'

export const NotiApis = {
    createNoti: async (data: any) => Axios({
        url: '/notify/create',
        method: 'POST',
        data
    }),
    getNotiByUser: async (userId: string) => Axios({
        url: `/notify/${userId}`,
        method: 'GET'
    })
}