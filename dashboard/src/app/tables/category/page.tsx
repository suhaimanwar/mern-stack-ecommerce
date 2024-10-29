import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import CategoryTable from "@/components/Tables/Category";
import { categoryApi } from "@/api/categoryApi";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const getAllCategory = async () => {
  const res = await categoryApi.getAllCategory()
  // console.log(':::::::',res.data.data.categories)
  return res.data.data.categories
}

const TablesPage = async() => {

  const data = await getAllCategory()


  return (
    <DefaultLayout>
      <Breadcrumb pageName="Categories" />

      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        {/* <TableThree /> */}

        <CategoryTable data={data} /> 
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;