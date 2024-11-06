import { Api } from "@/api/Api";
import { TFeaturedProducts, THomeCategory } from "@/api/type";
import Carousel from "@/components/Carousel";
import Category from "@/components/Category";
import FeaturedProducts from "@/components/FeaturedProducts";

const getHomeCategories = async ():Promise<THomeCategory> => { //We are importing the type from type.ts
 const homeCategories = await Api.getHomeCategories();
 return homeCategories
};


const getFeaturedProducts = async():Promise<TFeaturedProducts> =>{
  const featuredProducts = await Api.getFeaturedProducts()
  return featuredProducts
}

export default async function Home() {

  const homeCategoryData = await getHomeCategories()
  // console.log('dataaaaaaaa::::',homeCategoryData)

  const featuredProductsData = await getFeaturedProducts()
  // console.log('FEATTT::::::',featuredProductsData)


  return (
    <>

      <Carousel />

      <Category 
      homeCategoryData={homeCategoryData}  
      
      />

      <FeaturedProducts 
      featuredProductsData={featuredProductsData}
       />
    </>
  );
}
