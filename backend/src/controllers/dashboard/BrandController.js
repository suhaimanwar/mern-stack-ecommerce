import { BrandModel } from "../../models/BrandModel.js";
import { serverError, validationError } from "../../utils/errorHandler.js";
import { getFilePath } from "../../utils/filePath.js";
import { singleFileRemover } from "../../utils/fileRemover.js";
import { createSlug } from "../../utils/slug.js";

export const createBrand = async (req, res, next) => {
  try {
    const { name, description } = req.body; //Destructuring name and description from req.body (aka from the frontend)

    // console.log('reqbodyy',req.body)
    // console.log('reqfileee', req.file)
    const brandLogo = getFilePath(req.file);

    // console.log('brandLogo::::',brandLogo)

    // const slug = createSlug(name, BrandModel)

    // console.log("slugg::", slug)

    await BrandModel.create({
      name: name, //Placing the input name Here
      description: description, //Placing the nput description here.
      // image: req.file.filename,
      image: brandLogo,
      deletedAt: null,
      slug: await createSlug(name,BrandModel)
    });

    // console.log("slugg:::",slug)

    return res.status(200).json({
      // If the data is send as a response successfully, this message should be displayed.
      success: true,
      message: "Brand Created Successfully",
    });
  } catch (error) {
    console.log("errrrrrrrrrrrrr")
    return next(serverError(error)); //The error will be logged here. serverError is from errorHandler.
  }
};



export const getAllBrands = async (req, res, next) => {
  try {
    // console.log(req.query)
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 5; // parseInt - In order to save the output as an integer, and not a string.
    // console.log("page::",req.query.page)
    // console.log("pageSize::",req.query.pageSize)

    const searchTerm = req.query.q;
    // console.log("searchTTTT", searchTerm);

    const aggregationPipeline = [
      {
        $match: {
          deletedAt: null,
        },
      },

      // {
      //   $skip: (page - 1) * pageSize,
      // },
      // {
      //   $limit: pageSize,
      // },
      {
        $project: {
          // _id: 0,
          name: 1,
          description: 1,
          image: 1,
          slug: 1
        },
      },

      {
        $facet: {
          totalCount: [
            {
              $count: "count",
            },
          ],
          paginatedResults: [
            {
              $skip: (page - 1) * pageSize,
            },
            {
              $limit: pageSize,
            },
          ],
        },
      },
    ];

    // .includes("/"== false)

    if (searchTerm) {
      aggregationPipeline.unshift({
        //unshift - If a key is clicked,
        $match: {
          $and: [
            { deletedAt: null },
            { name: { $regex: searchTerm, $options: "i" } },
          ],
        },
      });
    }
    const brands = (await BrandModel.aggregate(aggregationPipeline)).at(0);

    if (!brands || brands.paginatedResults.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Brands Fetched Succesfully",
        data: {}, //All the Brands are given as a response. - Here the key value is "brands" given to brands.
      });
    }

    // console.log("brands::::",brands[0].totalCount[0].count)
    return res.status(200).json({
      success: true,
      message: "Brands Fetched Succesfully",
      data: {
        paginatedResults: brands.paginatedResults,
        totalCount: brands.totalCount[0].count,
      }, //All the Brands are given as a response. - Here the key value is "brands" given to brands.
    });
  } catch (error) {
    return next(serverError(error));
  }
};


export const getBrandsDropdown = async (req, res, next) => {
  try {
    const brands = await BrandModel.aggregate([
      {
        $match: {
          deletedAt: null,
        },
      },
      {
        $project: {
     
          name: 1,
         
        },
      },

    ]); //If getAllBrands is called
    return res.status(200).json({
      success: true,
      message: "Brands Fetched Succesfully",
      data: { brands: brands }, //All the Brands are given as a response. - Here the key value is "brands" given to brands.
    });
  } catch (error) {
    return next(serverError(error));
  }
};

// export const getBrandById = async (req, res, next) => {
//   try {
//     const brandId = req.params.id; //Fetching the brandId from params
//     const brandData = await BrandModel.findOne({
//       _id: brandId,
//       deletedAt: null,
//     }); //Returns Object //

//     if (!brandData) {
//       return next(validationError("Brand not found!"));
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Brand Fetched Successfully",
//       data: { brand: brandData },
//     });
//   } catch (error) {
//     return next(serverError(error));
//   }
// };

export const getBrandById = async (req, res, next) => {
  try {
    // const brandId = req.params.id; 
    const brandSlug = req.params.id; 
    //Fetching the brandId from params
    const brandData = await BrandModel.findOne({
      slug: brandSlug,
      deletedAt: null,
    }); //Returns Object //

    if (!brandData) {
      return next(validationError("Brand not found!"));
    }

    return res.status(200).json({
      success: true,
      message: "Brand Fetched Successfully",
      data: { brand: brandData },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const deleteBrand = async (req, res, next) => {
  try {
    const brandId = req.params.id;

    console.log("brandIIIDDD:::::", brandId);

    // await BrandModel.deleteOne({ _id: brandId }); //Hard Delete

    const brandToDelete = await BrandModel.findOne({ _id: brandId });

    brandToDelete.deletedAt = new Date(); //Soft Delete -- It will add the deleted date to the deletedAt property.

    const brand = await BrandModel.findOne({ _id: brandId, deletedAt: null });
    singleFileRemover(brandToDelete.image);

    await brandToDelete.save();

    return res.status(200).json({
      success: true,
      message: "Brand Deleted Successfully",
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const updateBrand = async (req, res, next) => {
  try {
    const brandId = req.params.id;
    // const name = req.body.name;
    // const description = req.body.description;

    const { name, description } = req.body;

    // console.log('""""""',req.body)

    const brand = await BrandModel.findOne({ _id: brandId, deletedAt: null });
    // console.log('req::',req.file)

    // console.log('logo',brandLogo)

    brand.name = name;
    brand.description = description;
    brand.slug = await createSlug(name, BrandModel)


    if (req.file != null) {
      singleFileRemover(brand.image);
      const brandLogo = getFilePath(req.file);
      brand.image = brandLogo;
    }

    await brand.save();

    return res.status(200).json({
      success: true,
      message: "Brand Updated Successfully",
    });
  } catch (error) {
    next(serverError(error));
  }
};
