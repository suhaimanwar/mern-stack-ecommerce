import { BrandModel } from "../../models/BrandModel.js";
import { serverError, validationError } from "../../utils/errorHandler.js";
import { getFilePath } from "../../utils/filePath.js";

export const createBrand = async (req, res, next) => {
  try {
    const { name, description } = req.body; //Destructuring name and description from req.body (aka from the frontend)

    // console.log('reqbodyy',req.body)
    // console.log('reqfileee', req.file)
    const brandLogo = getFilePath(req.file) 

    // console.log('brandLogo::::',brandLogo)

    await BrandModel.create({
      name: name, //Placing the input name Here
      description: description, //Placing the nput description here.
      // image: req.file.filename,
      image: brandLogo,
      deletedAt: null,
    });

    return res.status(200).json({
      // If the data is send as a response successfully, this message should be displayed.
      success: true,
      message: "Brand Created Successfully",
    });
  } catch (error) {
    return next(serverError(error)); //The error will be logged here. serverError is from errorHandler.
  }
};

export const getAllBrands = async (req, res, next) => {
  try {
    const brands = await BrandModel.find({deletedAt: null}); //If getAllBrands is called
    return res.status(200).json({
      success: true,
      message: "Brands Fetched Succesfully",
      data: { brands: brands }, //All the Brands are given as a response. - Here the key value is "brands" given to brands.
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const getBrandById = async (req, res, next) => {
  try {
    const brandId = req.params.id; //Fetching the brandId from params
    const brandData = await BrandModel.findOne({
      _id: brandId,
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

    console.log('brandIIIDDD:::::',brandId)

    // await BrandModel.deleteOne({ _id: brandId }); //Hard Delete

    const brandToDelete = await BrandModel.findOne({_id: brandId})

    brandToDelete.deletedAt = new Date() //Soft Delete -- It will add the deleted date to the deletedAt property. 

    await brandToDelete.save()

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

    const {name, description} = req.body

    // console.log('""""""',req.body)

    const brand = await BrandModel.findOne({_id:brandId, deletedAt:null})

    console.log('req::',req.file)

    

    // console.log('logo',brandLogo)

    brand.name = name;
    brand.description = description;

    if (req.file !=null) {
      const brandLogo = getFilePath(req.file)
      brand.image = brandLogo
    }

    

    await brand.save()

    return res.status(200).json({
      success: true,
      message: "Brand Updated Successfully",
    });


  } catch (error) {
    next(serverError(error))
  }
}