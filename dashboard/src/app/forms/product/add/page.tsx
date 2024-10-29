import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BrandAddForm from "@/components/Forms/Brand/add";
import CategoryAddForm from "@/components/Forms/Category/add";
import ProductAddForm from "@/components/Forms/Product/add";
import { categoryApi } from "@/api/categoryApi";
import { brandApi } from "@/api/brandApi";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const getDropdown = async () => {
  const brandResponse = await brandApi.getAllBrands()
  const categoryResponse = await categoryApi.getAllCategory()

  return {brandResponse: brandResponse.data.data.brands, 
    categoryResponse: categoryResponse.data.data.categories}
}

const FormElementsPage = async() => {

  const dropdownData = await getDropdown()
  // console.log('brandresss:::::',dropdownData)

  return (

    <DefaultLayout> 
      <ProductAddForm dropdownData={dropdownData} />
    </DefaultLayout> 
  );
};

export default FormElementsPage;
