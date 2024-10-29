import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BrandAddForm from "@/components/Forms/Brand/add";
import CategoryAddForm from "@/components/Forms/Category/add";
import CategoryEditForm from "@/components/Forms/Category/edit";
import { categoryApi } from "@/api/categoryApi";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

type Props = {
  params: {id : string}
}

const FormElementsPage = async({params}: Props) => {

  // console.log("paraams::",params)

  const res = await categoryApi.getCategorybyId(params.id)

  const categoryData = res.data.data.category

  // console.log('caaaaaattt:::::',categoryData)


  return (
    <DefaultLayout>
      <CategoryEditForm categoryData={categoryData} /> 
    </DefaultLayout>
  );
};

export default FormElementsPage;
