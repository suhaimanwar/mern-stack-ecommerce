import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BrandTable from "@/components/Tables/Brand";
import { brandApi } from "@/api/brandApi";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const getAllBrands = async () => {
  const res = await brandApi.getAllBrands() // calling getAllBrands from brandApi
// console.log('responsee:::', res.data.data.brands)

return res.data.data.brands
}

const TablesPage = async () => {

  const data = await getAllBrands()

  // console.log('daaaaaaata::',data)

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Brands" />

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        {/* <TableThree /> */}
 
        <BrandTable data={data} /> 
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;