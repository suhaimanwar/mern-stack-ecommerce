import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BrandAddForm from "@/components/Forms/Brand/add";
import CategoryAddForm from "@/components/Forms/Category/add";
import ProductAddForm from "@/components/Forms/Product/add";
import ProductEditForm from "@/components/Forms/Product/edit/page";
import { brandApi } from "@/api/brandApi";
import { categoryApi } from "@/api/categoryApi";
import { productApi } from "@/api/productApi";

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

type Props = {
  params: {id: string}
}
const FormElementsPage = async({params}: Props) => {

  // console.log('paraaaaaaaaams',params)

  const res = await productApi.getProductbyId(params.id)

  const productData = res.data.data.product

  // console.log('prooooooooo',productData)

  const dropdownData = await getDropdown()
  return (
    <DefaultLayout>
      <ProductEditForm  dropdownData={dropdownData} singleProductData={productData}  />
    </DefaultLayout>
  );
};

export default FormElementsPage;
