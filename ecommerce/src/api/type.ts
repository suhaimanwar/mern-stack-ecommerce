export type THomeCategory = {
    categories: THomeCategoryData[]
}
export type THomeCategoryData = {
    _id: string,
    name: string,
    image: string
}

export type TShopCategory = {
    categories: TCategory[]
}
export type TCategory = {
    _id: string,
    name: string,
    description: string,
    image: string   
}