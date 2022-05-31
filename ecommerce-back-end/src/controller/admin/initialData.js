const Category = require('../../models/category');
const Product = require('../../models/product');
const Order = require('../../models/order');

function createCategories(categories, parentId = null) {

    let category;
    if (parentId == null || parentId == "") {
        category = categories.filter((cat) => cat.parentId == undefined || cat.parentId == "");
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }
    //console.log(category);
    const categoryList = category.map((cate) => ({
        _id: cate._id,
        name: cate.name,
        level: cate.level,
        slug: cate.slug,
        parentId: cate.parentId,
        type: cate.type,
        children: createCategories(categories, cate._id),
    }));

    return categoryList;
}

exports.initialData = async (req, res) => {

    const categories = await Category.find({ active: true }).exec();
    const products = await Product.find({}).select('_id name price quantity slug description productPictures category')
                                            .populate({ path: 'category', select: '_id name' }).exec();
    const orders = await Order.find({})
    .populate("items.productId", "name")
    .exec();
    res.status(200).json({
        categories: createCategories(categories),
        products,
        orders
    })

}