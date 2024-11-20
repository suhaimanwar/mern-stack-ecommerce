
import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

import BannerAddForm from "@/components/Forms/Banner/add";
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
    name: " / Banner",
    link: "/banner"
  },
  {
    name: " / Add",
    link: "/banner/add"
  },

]

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Banner" navigation={navigationData} />
      <BannerAddForm />
    </DefaultLayout>
  );
};

export default FormElementsPage;
