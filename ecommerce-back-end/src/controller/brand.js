const Brand = require("../models/brand");
const slugify = require("slugify");
const { removeOldImage } = require('../helpers');

//add brand
exports.addBrand = async (req, res) => {
    const brandObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
        active: req.body.active,
    };

    if (req.file) {
        brandObj.brandImage = process.env.API + '/public/' + req.file.filename;
    }

    const Bnd = new Brand(brandObj);

    await Bnd.save((error, brand) => {
        if (error) return res.status(400).json({ error });

        if (brand) {
            return res.status(201).json({ brand });
        }
    })
}

//fetch brand
exports.getBrands = (req, res) => {
    Brand.find({}).exec((error, brands) => {
        if (error) return res.status(400).json({ error });

        if (brands) {
            return res.status(200).json({ brands });
        }
    });
};

//Update brand
exports.updateBrand = async (req, res) => {
    const { _id, name, active } = req.body;
    const brandObject = {
        name,
        active,
        slug: slugify(name),
    };

    if (req.file) {
        brandObject.brandImage = process.env.API + '/public/' + req.file.filename;
    }

    await Brand.findOneAndUpdate({ _id }, brandObject, (error, brand) => {
        if (error) return res.status(400).json({ error });

        if (brand) {

            if (brand.brandImage) {
                if (req.file) {
                    const oldImage = brand.brandImage.replace(/^.*(\\|\/|\:)/, '');
                    removeOldImage(oldImage);
                }
            }

            return res.status(201).json({ message: 'Brand successfully updated!' });
        }
    });
}

exports.deleteBrandById = async (req, res) => {

    const { brandId } = req.body.payload;
    await Brand.findOneAndDelete({ _id: brandId }, (error, result) => {
        if (error) return res.status(400).json({ error });
        if (result) {
            if (result.brandImage) {
                const oldImage = result.brandImage.replace(/^.*(\\|\/|\:)/, '');
                removeOldImage(oldImage);
            }
            res.status(202).json({ message: 'Brand successfully Deleted!' });
        }
    });
}