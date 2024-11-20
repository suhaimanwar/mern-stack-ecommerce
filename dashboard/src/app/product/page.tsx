import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProductTable from "@/components/Tables/Product";
import { productApi } from "@/api/productApi";


export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const getAllProducts = async () => {
  const res = await productApi.getAllProducts()
  // console.log(':::::::',res.data.data.products)
  return res.data.data.products
}

const navigationData = [
  {
    name: "Dashboard",
    link: "/"
  },
  {
    name: " / Product",
    link: "/product"
  },

]

const TablesPage = async() => {

  const data = await getAllProducts()


  
  return ( 
    <DefaultLayout>
      <Breadcrumb pageName="Products" navigation={navigationData} />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> 
        <TableTwo /> */}
        {/* <TableThree /> */} 
 
        <ProductTable  productData={data} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;