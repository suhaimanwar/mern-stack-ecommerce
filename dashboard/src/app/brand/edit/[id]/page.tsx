import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BrandAddForm from "@/components/Forms/Brand/add";
import BrandEditForm from "@/components/Forms/Brand/edit";
import { brandApi } from "@/api/brandApi";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

type Props = {
  params: { id: string };
};

const navigationData = [
  {
    name: "Dashboard",
    link: "/"
  },
  {
    name: " / Brand",
    link: "/brand"
  },
  {
    name: " / Edit",
    link: ""
  },
]

const FormElementsPage = async ({ params }: Props) => {
  // console.log("paraaaams:::::", params);
  const res = await brandApi.getBrandbyId(params.id);

  // console.log('responseeeeee::::::',res.data)
  
  const brandData = res.data.data.brand
  // console.log('braaaaaand',brandData)
  
  return (
    <DefaultLayout> 

<Breadcrumb pageName="Edit" navigation={navigationData} />
      <BrandEditForm brandData={brandData} />
    </DefaultLayout>
  );
};

export default FormElementsPage;
