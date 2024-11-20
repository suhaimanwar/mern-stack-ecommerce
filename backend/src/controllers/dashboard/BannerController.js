import { BannerModel } from "../../models/BannerModel.js";
import { serverError } from "../../utils/errorHandler.js";
import { getFilePath } from "../../utils/filePath.js";
import { singleFileRemover } from "../../utils/fileRemover.js";
import { createSlug } from "../../utils/slug.js";

export const createBanner = async (req, res, next) => {
  try {
    const { subtitle, title, description } = req.body; //Destructuring name and description from req.body (aka from the frontend)

    // console.log('reqbodyy',req.body)
    // console.log('reqfileee', req.file)
    const bannerImage = getFilePath(req.file);

    // console.log('bannerImage::::',bannerImage)

    await BannerModel.create({
      image: bannerImage,
      subtitle: subtitle,
      title: title,
      description: description,
      // image: req.file.filename,
      slug: await createSlug(title,BannerModel),
      deletedAt: null,
    });

    return res.status(200).json({
      success: true,
      message: "Banner Created Successfully",
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const getAllBanners = async (req, res, next) => {
  try {
    const banners = await BannerModel.find({ deletedAt: null }); //If getAllBanners is called
    return res.status(200).json({
      success: true,
      message: "Banners Fetched Succesfully",
      data: { banners: banners }, //All the Brands are given as a response. - Here the key value is "banners" given to banners.
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const getBannerbyId = async (req, res, next) => {
  try {
    const slug = req.params.id; //Fetching the slug from params
    const bannerData = await BannerModel.findOne({
      slug: slug,
      deletedAt: null,
    }); //Returns Object //

    if (!bannerData) {
      return next(validationError("Brand not found!"));
    }

    return res.status(200).json({
      success: true,
      message: "Banner Fetched Successfully",
      data: { banner: bannerData },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const deleteBanner = async (req, res, next) => {
  try {
    const bannerId = req.params.id;

    //   console.log('bannerID:::::',bannerId)

    // await BannerModel.deleteOne({ _id: bannerId }); //Hard Delete

    const bannerToDelete = await BannerModel.findOne({ _id: bannerId });

    bannerToDelete.deletedAt = new Date(); //Soft Delete -- It will add the deleted date to the deletedAt property.

    singleFileRemover(bannerToDelete.image);

    await bannerToDelete.save();

    return res.status(200).json({
      success: true,
      message: "Banner Deleted Successfully",
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const bannerId = req.params.id;
    // const name = req.body.name;
    // const description = req.body.description;

    const { subtitle, title, description } = req.body;

    // console.log('""""""',req.body)

    const banner = await BannerModel.findOne({
      _id: bannerId,
      deletedAt: null,
    });

    // console.log("req::", req.file);

    // console.log('logo',bannerLogo)

    banner.subtitle = subtitle;
    banner.title = title;
    banner.description = description;
    banner.slug = await createSlug(title, BannerModel)


    if (req.file != null) {
      singleFileRemover(banner.image);
      const bannerImage = getFilePath(req.file);
      banner.image = bannerImage;
    }

    await banner.save();

    return res.status(200).json({
      success: true,
      message: "Brand Updated Successfully",
    });
  } catch (error) {
    next(serverError(error));
  }
};
