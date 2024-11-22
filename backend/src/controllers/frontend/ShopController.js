import { CategoryModel } from "../../models/CategoryModel.js"
import { serverError } from "../../utils/errorHandler.js"

export const getAllCategories = async (req, res, next) => {
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
                    createdAt: 1, //Descending Order, 1 is ascending
                }
            },
            // {
            //     $limit: 2
            // }

            {
                $project: {
                 
                    name: 1,
                    description: 1,
                    image: 1,
                    slug: 1

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
