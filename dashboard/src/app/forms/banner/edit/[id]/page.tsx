import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BrandAddForm from "@/components/Forms/Brand/add";
import BrandEditForm from "@/components/Forms/Brand/edit";
import { brandApi } from "@/api/brandApi";
import { bannerApi } from "@/api/bannerApi";
import BannerEditForm from "@/components/Forms/Banner/edit";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

type Props = {
  params: { id: string };
};

const FormElementsPage = async ({ params }: Props) => {
  console.log("paraaaams:::::", params);
//   const res = await brandApi.getBrandbyId(params.id);



const res = await bannerApi.getBannerbyId(params.id)

//   console.log('responseeeeee::::::',res.data)
  
  const bannerData = res.data.data.banner

  

  // console.log('braaaaaand',brandData)
  
  return (
    <DefaultLayout> 
      {/* <BrandEditForm brandData={brandData} /> */}

      <BannerEditForm bannerData={bannerData}/>
    </DefaultLayout>
  );
};

export default FormElementsPage;
