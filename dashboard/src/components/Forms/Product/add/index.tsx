//aistudio.google.com -
//Get Gemini API Key and https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}

//Added loadingDescription state to track when Gemini is working / while waiting for response
//Added debouncedName to wait until user stops typing before making API call

//Added useEffect to call fetchDescription when debouncedName changes

//Added fetchDescription function to call Gemini API and set the description field in the form
//Added button to regenerate description manually

//https://platform.stability.ai/account/keys - Get Stable Diffusion API Key
//https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image - Stable Diffusion API endpoint

"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectGroupOne from "@/components/FormElements/SelectGroup/SelectGroupOne";
import BrandSelect from "@/components/FormElements/SelectGroup/BrandSelect";
import CategorySelect from "@/components/FormElements/SelectGroup/CategorySelect";
import DropzoneWrapper from "@/components/FileUpload/Dropzone";
import { Typography } from "@mui/material";
import FileUploaderSingle from "@/components/FileUpload/SingleFileUpload";
import { productApi } from "@/api/productApi";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useState, useEffect } from "react";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const productSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  price: z.string().nonempty({ message: "Price is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  attachedFile: z.any().refine(
    (value) => {
      const acceptedTypes = ACCEPTED_IMAGE_TYPES;
      if (typeof value === "string") {
        return true;
      } else if (typeof value === "object") {
        const isTypeAccepted = acceptedTypes.includes(value?.type);
        return isTypeAccepted;
      }
      return false;
    },
    {
      message: "Invalid image format",
    },
  ),
  brand: z.string().refine((value) => value !== "", "Please select a Brand."),
  category: z
    .string()
    .refine((value) => value !== "", "Please select a Category."),
});

type typeProductShema = z.infer<typeof productSchema>;

type Props = {
  dropdownData: {
    brandResponse: any;
    categoryResponse: any;
  };
};

const ProductAddForm = ({ dropdownData }: Props) => {
  // State for showing loading spinner when generating description
  const [loadingDescription, setLoadingDescription] = useState(false);
  // State for showing loading spinner when generating image
  const [loadingImage, setLoadingImage] = useState(false);

  // State for storing the product name after user stops typing (debounced)
  const [debouncedName, setDebouncedName] = useState("");

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<typeProductShema>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand: "",
      category: "",
    },
  });

  const router = useRouter();

  // Watching the product name field for changes
  const productName = watch("name");

  // This effect waits for user to stop typing (1 second pause)
  // before updating the debouncedName value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(productName);
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [productName]);

  // This effect automatically calls Gemini API when debouncedName changes
  // (when user stops typing for 1 second)
  useEffect(() => {
    if (debouncedName && debouncedName.length > 3) {
      fetchDescription();
      generateProductImage();
    }
  }, [debouncedName]);

  // THE MAIN GEMINI API INTEGRATION FUNCTION
  const fetchDescription = async () => {
    // Don't do anything if product name is empty
    if (!productName) {
      toast.error("Please enter a product name first.");
      return;
    }

    // Show loading state
    setLoadingDescription(true);
    try {
      // Gemini API configuration
      const API_KEY = "AIzaSyCW1p6uwX_qBLp9-ncUyqHHA_S4B5-Rz-w"; // Your Gemini API key

      // Making the API call to Gemini
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, // aistudio.google.com -
        {
          // The prompt we send to Gemini
          contents: [
            {
              parts: [
                //   {
                //     text: `Generate a detailed product description for ${productName}.
                // The description should be 10-15 words in length, highlight key features,
                // and be written in a professional tone for an e-commerce website , avoid options feature- choose the best suitable option for website.`,
                //   },

                {
                  text: `Generate a concise and professional product description for "${productName}" in 150 words. Focus on key benefits or standout features. Use a tone suitable for an e-commerce website. Do not include multiple options—generate only the most suitable description. Do not use the product name in the description.`,
                },
              ],
            },
          ],
        },

        //This is the headers we need to send with the request
        // to let Gemini know that we are sending JSON data
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      // Extracting the generated text from Gemini's response
      // The response structure comes from Gemini's API documentation
      const generatedDescription =
        response.data.candidates[0].content.parts[0].text;

      // Updating the form's description field with Gemini's response
      setValue("description", generatedDescription);

      toast.success("Description generated successfully!");
    } catch (error) {
      console.error("Error generating description:", error);
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          toast.error("API limit exceeded. Please try again later.");
        } else if (error.response?.status && error.response.status >= 500) {
          toast.error("Internal Server Error. Please try again later.");
        } else {
          toast.error("Failed to generate description. Please try again.");
        }
      } else {
        toast.error("Failed to generate description. Please try again.");
      }
    } finally {
      setLoadingDescription(false);
    }
  };

  // Function to generate product image using Gemini's API
  // const generateProductImage = async () => {
  //   // Don't do anything if product name is empty
  //   if (!productName) {
  //     return;
  //   }

  //   // Show loading state
  //   setLoadingImage(true);
  //   try {
  //     // Gemini API configuration
  //     const API_KEY = "AIzaSyCW1p6uwX_qBLp9-ncUyqHHA_S4B5-Rz-w"; // Your Gemini API key

  //     // Making the API call to Gemini
  //     const response = await axios.post(
  //       `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-vision:generateContent?key=${API_KEY}`,
  //       {
  //         contents: [
  //           {
  //             parts: [
  //               {
  //                 text: `Generate a professional product image for "${productName}". The image should be suitable for an e-commerce website, with a clean background and clear focus on the product. Generate this as a realistic, high-quality image.`,
  //               },
  //             ],
  //           },
  //         ],
  //         generation_config: {
  //           response_mime_type: "image/png",
  //         },
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // Extract the base64 image data from response
  //     const imageData = response.data.candidates[0].content.parts[0].inlineData.data;

  //     // Convert base64 to Blob
  //     const byteCharacters = atob(imageData);
  //     const byteNumbers = new Array(byteCharacters.length);
  //     for (let i = 0; i < byteCharacters.length; i++) {
  //       byteNumbers[i] = byteCharacters.charCodeAt(i);
  //     }
  //     const byteArray = new Uint8Array(byteNumbers);
  //     const blob = new Blob([byteArray], { type: 'image/png' });

  //     // Create a File object from the Blob
  //     const imageFile = new File([blob], `${productName.replace(/\s+/g, '-')}.png`, {
  //       type: 'image/png',
  //       lastModified: new Date().getTime(),
  //     });

  //     // Set the image file in the form
  //     setValue("attachedFile", imageFile);
  //     toast.success("Product image generated successfully!");
  //   } catch (error) {
  //     console.error("Error generating image:", error);
  //     if (axios.isAxiosError(error)) {
  //       if (error.response?.status === 400) {
  //         toast.error("API limit exceeded or invalid request.");
  //       } else if ((error.response?.status ?? 0) >= 500) {
  //         toast.error("Internal Server Error. Please try again later.");
  //       } else {
  //         toast.error("Failed to generate image. Please try again.");
  //       }
  //     } else {
  //       toast.error("Failed to generate image. Please try again.");
  //     }
  //   } finally {
  //     setLoadingImage(false);
  //   }
  // };

  // Function to generate product image using Stable Diffusion API
  const generateProductImage = async () => {
    // Don't do anything if product name is empty
    if (!productName) {
      return;
    }

    // Show loading state
    setLoadingImage(true);
    try {
      // Use Stable Diffusion API
      const response = await fetch(
        "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer sk-Ij78e3mIs5tRog5mUVIDXGjzo8ex8iLwbhTEDDPdVY9ZozIq", // Replace with your API key
            Accept: "application/json",
          },
          body: JSON.stringify({
            text_prompts: [
              {
                text: `Professional product photo of ${productName} on white background, e-commerce style, high quality`,
                weight: 1, // Weight of the text prompt (higher = more influence)
              },
            ],
            cfg_scale: 7, // Controls how closely the image follows the prompt
            height: 1024, // Image dimensions
            width: 1024,
            steps: 30, // Number of diffusion steps (more steps = higher quality) - Higher tokens as well
            samples: 1, // Number of images to generate
          }),
        },
      );

      // Check if the API call was successful

      if (!response.ok) {
        throw new Error(`Stable Diffusion API error: ${response.statusText}`);
      }

      // Parse the response data
      const data = await response.json();

      // The API returns base64 encoded images - base64 - IF YOU WANT TO DISPLAY THE IMAGE, THIS IS ENOUGH.
      const base64Image = data.artifacts[0].base64;

      // Convert base64 to binary data (Blob) - BECAUSE WE ARE USING A FILE UPLOADER. - IT Needs to be in a speciific file format (Blob).
      const binaryString = atob(base64Image); // Convert base64 to  Binary Data (Blob)


      //Convert into bytes - small data that computers can work with.
     
      // Create a new Uint8Array (typed array) with the same length as the binary string
      // This will store our raw image data as bytes (8-bit unsigned integers)

       const bytes = new Uint8Array(binaryString.length); 

       // Loop through each character in the binary string one by one
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }


      const imageBlob = new Blob([bytes], { type: "image/png" }); //Package them as blob. Binary Large Object. And tell them this is a PNG

      // Create a File object from the Blob with proper filename and metadata
      const imageFile = new File(
        [imageBlob],
        `${productName.replace(/\s+/g, "-")}.png`,
        // Takes the product name (like "Blue Widget")
        // Replaces spaces with hyphens ("Blue-Widget")
        // Adds ".png" at the end ("Blue-Widget.png")
        {
          type: "image/png",
          lastModified: new Date().getTime(),
          // Sets the last modified time to now
        },
      );

      // Set the image file in the form
      setValue("attachedFile", imageFile);
      toast.success("Product image generated successfully!");
    } catch (error) {
      console.error("Error generating image:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setLoadingImage(false);
    }
  };
  // Button to manually trigger image generation
  const handleGenerateImage = () => {
    if (!productName) {
      toast.error("Please enter a product name first.");
      return;
    }
    generateProductImage();
  };

  const onSubmit = async (data: typeProductShema) => {
    await productApi.createProduct(data);
    router.push("/product");
    router.refresh();
  };

  const handleReset = () => {
    reset();
    setValue("attachedFile", null);
  };

  return (
    <>
      <div className=" ">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-5.5 p-6.5"
            >
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="Name"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                {errors.name && (
                  <p className="mt-2 text-red">Product name is required.</p>
                )}
              </div>

              {/* Description Field with Gemini Integration */}

              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  rows={3}
                  placeholder="Description"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                ></textarea>
                {errors.description && (
                  <p className="mt-1 text-red">Description is required.</p>
                )}

                {/* Button to manually trigger Gemini description generation */}

                <button
                  type="button"
                  onClick={fetchDescription}
                  disabled={loadingDescription} // Disables when loading to prevent multiple calls
                  className="mt-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  {loadingDescription
                    ? "Generating..."
                    : "Regenerate Description"}
                </button>
              </div>

              {/* Rest of your form remains the same */}
              <div>
                <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                  Price
                </label>
                <input
                  {...register("price")}
                  type="number"
                  placeholder="Price"
                  className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                />
                {errors.price && (
                  <p className="mt-2 text-red">Price is required.</p>
                )}
              </div>

              <div className="flex gap-3">
                <BrandSelect
                  brandDrop={dropdownData.brandResponse}
                  register={register("brand")}
                  error={errors.brand}
                />
                <CategorySelect
                  categoryDrop={dropdownData.categoryResponse}
                  register={register("category")}
                  error={errors.category}
                />
              </div>

              <div>
                <DropzoneWrapper>
                  <Typography variant="h6" sx={{ mb: 2.5 }}>
                    Image:
                    {!!errors.attachedFile && (
                      <span className="ml-3 text-red">
                        Invalid Image format {!!errors.attachedFile}
                      </span>
                    )}
                  </Typography>
                  <Controller
                    name="attachedFile"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <FileUploaderSingle
                          file={field.value}
                          setFile={field.onChange}
                          error={errors.attachedFile}
                        />
                      </div>
                    )}
                  />
                  {/* Button to manually trigger Gemini image generation */}
                  <button
                    type="button"
                    onClick={handleGenerateImage}
                    disabled={loadingImage}
                    className="mt-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    {loadingImage ? "Generating Image..." : "Regenerate Image"}
                  </button>
                </DropzoneWrapper>
              </div>

              <div className="flex">
                <button
                  type="button"
                  onClick={handleReset}
                  className="mb-2 me-2 rounded-full bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-red-500 dark:hover:bg-red-700 dark:focus:ring-gray-700"
                >
                  Reset
                </button>

                <button
                  type="submit"
                  className="mb-2 me-2 w-full rounded-full bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAddForm;
