import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import BannerTable from "@/components/Tables/BannerTable";
import { bannerApi } from "@/api/bannerApi";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const getAllBanners = async () => {
  const res = await bannerApi.getAllBanners();

  // console.log("res::", res.data.data.banners)
  return res.data.data.banners;
};

const TablesPage = async () => {
  const data = await getAllBanners();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Banners" />

      <div className="flex flex-col gap-10">
        <BannerTable data={data} />
      </div>
    </DefaultLayout>
  );
};

export default TablesPage;
