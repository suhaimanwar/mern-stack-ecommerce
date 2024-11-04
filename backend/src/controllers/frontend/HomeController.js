import { CategoryModel } from "../../models/CategoryModel.js"
import { ProductModel } from "../../models/ProductModel.js"
import { serverError } from "../../utils/errorHandler.js"

export const getHomeCategories = async (req, res, next) => {
    try {
        // const categories = await CategoryModel.find({deletedAt: null}).select(['name','description','image'])//Array Bracket

        const categories = await CategoryModel.aggregate([ //pipeline - array bracket
            {
                $match: {
                    // _id: new mongoose.Types.ObjectId(categoryId), // - Get by ID
                    deletedAt: null, //Matches the deletedAt: null datas.
                }
            },
            {
                $sort: {
                    createdAt: -1, //Descending Order, 1 is ascending
                }
            },
            {
                $limit: 4
            },

            {
                $project: {
                    _id: 1, 
                    name: 1,
                    image: 1,
                }
            }
        ])

        return res.status(200).json({
            success:true,
            message: "Categories Fetched Successfully",
            data: {categories : categories}
        })
    } catch (error) {
        return next(serverError(error))
    }
}

export const getFeaturedProducts = async (req, res, next) => {
    try {
        const product = await ProductModel.aggregate([ //pipeline - array bracket
            {
                $match: {
                    // _id: new mongoose.Types.ObjectId(categoryId), // - Get by ID
                    featured: true,
                    deletedAt: null, //Matches the deletedAt: null datas.
                }
            },
            {
                $sort: {
                    createdAt: -1, //Descending Order, 1 is ascending
                }
            },
            {
                $limit: 8
            },
            {
                $project: {
                    // _id: 0, 
                    name: 1,
                    description: 1,
                    image: 1,
                }
            }
        ])

        return res.status(200).json({
            success:true,
            message: "Products Fetched Successfully",
            data: {product : product}
        })
    } catch (error) {
        return next(serverError(error))
    }
}


