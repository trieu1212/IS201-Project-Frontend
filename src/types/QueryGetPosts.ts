export interface QueryGetPost {
    itemPerPage?:string
    page:string
    search?:string
    roomType?:string
    address?:string
    setPage?:(page:number) => void 
}