import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BrandAddForm from "@/components/Forms/Brand/add";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
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
    name: " / Add",
    link: "/brand/add"
  },

]


const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Brand" navigation={navigationData} />
      <BrandAddForm />
    </DefaultLayout>
  );
};

export default FormElementsPage;
