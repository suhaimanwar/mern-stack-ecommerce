import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BrandAddForm from "@/components/Forms/Brand/add";
import CategoryAddForm from "@/components/Forms/Category/add";
import ProductAddForm from "@/components/Forms/Product/add";
import ProductEditForm from "@/components/Forms/Product/edit/page";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <ProductEditForm />
    </DefaultLayout>
  );
};

export default FormElementsPage;
