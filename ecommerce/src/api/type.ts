export type THomeCategory = {
    categories: THomeCategoryData[]
}
export type THomeCategoryData = {
    _id: string,
    name: string,
    image: string,
    slug: string
}

export type TShopCategory = {
    categories: TCategory[]
}
export type TCategory = {
    slug: string
    _id: string,
    name: string,
    description: string,
    image: string   
}


export type TFeaturedProducts = {
    products: TProducts[]
}

export type TProducts ={
    slug: any
    _id: string,
    name: string,
    description: string,
    price: string,
    image: string   
}

export type TBanners = {
    at(activeImage: number): unknown
    banners: TBannerData[]
}

export type TBannerData ={
    _id: string,
    subtitle: string,
    title: string,
    description: string,
    image: string   
}


