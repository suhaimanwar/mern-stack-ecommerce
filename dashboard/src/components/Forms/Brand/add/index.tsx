"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const brandSchema = z.object({
  brandName: z.string().min(1, "Name is required"),
  brandDesc: z.string().min(1, "Description is required"),
  attachedFile: z.any().refine(
    (value) => {
      const acceptedTypes = ACCEPTED_IMAGE_TYPES;
      if (typeof value === "string") {
        return true;
      } else if (typeof value === "object") {
        const isTypeAccepted = acceptedTypes.includes(value[0]?.type);
        return isTypeAccepted;
      }

      return false;
    },
    {
      message: "Invalid image format",
    },
  ),
});

type typeBrandSchema = z.infer<typeof brandSchema>;

const BrandAddForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<typeBrandSchema>({ resolver: zodResolver(brandSchema) });

  const onSubmit = (data: typeBrandSchema) => {
    console.log("submittedd::", data);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // will access the first image uploaded by the user.

    const imageUrl = URL.createObjectURL(file)  //Creates a temporary URL for selected image
    setImagePreview(imageUrl) //Sets the image preview to the url
  }

  const [imagePreview, setImagePreview] = useState(null) //Current state is null - Will se setImagePreview to update Image Preview

  return (
    <>
      <Breadcrumb pageName="Add Brand" />

      <div className=" ">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            {/* <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Input Fields
              </h3>
            </div> */}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5.5 p-6.5"
            >
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Name
                </label>
                <input
                  {...register("brandName")}
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />

                <p className="mt-2 text-red">{errors.brandName?.message}</p>
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Description
                </label>
                <textarea
                  {...register("brandDesc")}
                  rows={3}
                  placeholder="Description"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                ></textarea>
                <p className="mt-2 text-red">{errors.brandDesc?.message}</p>
              </div>

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Add Logo
                </label>
                <input
                  {...register("attachedFile")}
                  type="file"
                  onChange={handleImageChange} //1
                  className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-[#E2E8F0] file:px-6.5 file:py-[13px] file:text-body-sm file:font-medium file:text-dark-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />

                {imagePreview && (
                  <div className="mt-4">
                    <Image src={imagePreview} alt="Image"
                    width={128}
                    height={128}
                    className="object-cover"
                    unoptimized // allows it to be displayed. 
                    />


                  </div>
                )}

                {!!errors.attachedFile && (
                  <p className="mt-2 text-red-500">
                    Invalid Image format {!!errors.attachedFile}
                  </p>
                )}
              </div>

              <div className="flex">
                <button
                  type="reset"
                  onClick={() => setImagePreview(null)}   
                  className="mb-2 me-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-gray-700"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  
                  className="mb-2 me-2 w-full rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Add Brand
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandAddForm;
