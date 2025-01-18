import { Api } from "@/api/Api";
import { TBanners, TFeaturedProducts, THomeCategory } from "@/api/type";
import Carousel from "@/components/Carousel";
import Category from "@/components/Category";
import FeaturedProducts from "@/components/FeaturedProducts";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/authOptions";

const getHomeCategories = async (): Promise<THomeCategory> => {
  //We are importing the type from type.ts
  const homeCategories = await Api.getHomeCategories();
  return homeCategories;
};

const getFeaturedProducts = async (): Promise<TFeaturedProducts> => {
  const featuredProducts = await Api.getFeaturedProducts();
  return featuredProducts;
};

const getAllBanners = async (): Promise<TBanners> => {
  const banners = await Api.getAllBanners();
  return banners;
};

export default async function Home() {
  // const session = await getServerSession(authOptions);

  // console.log("server-session::::::::", session!.accessToken);

  const homeCategoryData = await getHomeCategories();
  // console.log('dataaaaaaaa::::',homeCategoryData)

  const featuredProductsData = await getFeaturedProducts();
  // console.log('FEATTT::::::',featuredProductsData)

  const bannerData = await getAllBanners();
  // console.log("banner::",bannerData)

  return (
    <>
      <Carousel bannerData={bannerData} />

      <Category homeCategoryData={homeCategoryData} />

      <FeaturedProducts featuredProductsData={featuredProductsData} />
    </>
  );
}
