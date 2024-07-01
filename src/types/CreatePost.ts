export interface CreatePost {
    name: string,
    description: string,
    arcreage: string,
    roomType: string,
    imageUrls: string[],
    address: string,
    serviceId: number,
    price: number | null
}