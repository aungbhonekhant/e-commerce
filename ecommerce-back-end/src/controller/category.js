const Category = require("../models/category");
const slugify = require("slugify");
const shortid = require("shortid");

//Create Category list
function createCategories(categories, parentId = null) {
  let category;
  if (parentId == null || parentId == "") {
    category = categories.filter((cat) => cat.parentId == undefined || cat.parentId == "");
  } else {
    category = categories.filter((cat) => cat.parentId == parentId);
  }

  const categoryList = category.map((cate) => ({
    _id: cate._id,
    name: cate.name,
    slug: cate.slug,
    parentId: cate.parentId,
    level: cate.level,
    type: cate.type,
    children: createCategories(categories, cate._id),
  }));
  return categoryList;
}

//insert Category
exports.addCategory = async (req, res) => {

  const categoryObj = {
    name: req.body.name,
    slug: slugify(req.body.name),
    type: req.body.type,
    active: true
  };

  if (req.file) {
    categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
  }

  if (req.body.parentId) {
    categoryObj.parentId = req.body.parentId;
    const category = await Category.findOne({ _id: req.body.parentId }).exec();
    categoryObj.level = category.level + 1;
  } else {
    categoryObj.level = 1;
  }

  const Cat = new Category(categoryObj);
  // const category = await Cat.save();
  // res.json(category);
  await Cat.save((error, category) => {
    if (error) return res.status(400).json({ error });

    if (category) {
      return res.status(201).json({ category });
    }
  });
};

//fetch category
exports.getCategories = (req, res) => {
  Category.find({ active: true }).exec((error, categories) => {
    if (error) return res.status(400).json({ error });

    if (categories) {
      const categoryList = createCategories(categories);
      return res.status(200).json({ categoryList });
    }
  });
};

//Update categories
exports.updateCategories = async (req, res) => {
  const { _id, name, parentId, type } = req.body;
  const updatedCategories = [];
  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        type: type[i],
        slug: slugify(name[i]),
        active: true
      };
      if (parentId[i] !== "") {
        category.parentId = parentId[i];
        const parentCat = await Category.findOne({ _id: parentId[i] }).exec();
        if(parentCat.level < 3){
          category.level = parentCat.level + 1;
        }else{
          category.level = 1;
          category.parentId = "";
        }
        
      } else {
        category.parentId = "";
        category.level = 1;
      }

      const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
      updatedCategories.push(updatedCategory);
    }
    return res.status(201).json({ updatedCategories });
  } else {
    const category = {
      name,
      type,
      slug: slugify(name),
    };
    if (parentId !== "") {
      category.parentId = parentId;
      const parentCat = await Category.findOne({ _id: parentId }).exec();
      if(parentCat.level < 3){
        category.level = parentCat.level + 1;
      }else{
        category.level = 1;
        category.parentId = "";
      }
    }else {
      category.parentId = "";
      category.level = 1;
    }

    const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
    return res.status(201).json({ updatedCategory });

  }
}

//delete categories

exports.deleteCategories = async (req, res) => {

  const { ids } = req.body.payload;
  const deletedCategories = [];
  for (let i = 0; i < ids.length; i++) {
    const deleteCategory = await Category.findOneAndRemove({ _id: ids[i]._id }, { active: false });
    deletedCategories.push(deleteCategory);
  }

  if (deletedCategories.length == ids.length) {
    res.status(201).json({ message: 'Categories removed' });
  } else {
    res.status(400).json({ message: 'Something went wrong!' });
  }


}