const Tags = require("../models/tags");

//add tag
exports.addTags = async (req, res) => {
    const tagsObj = {
        name: req.body.name,
    };

    const Tag = new Tags(tagsObj);

    await Tag.save((error, tag) => {
        if (error) return res.status(400).json({ error });

        if (tag) {
            return res.status(201).json({ tag });
        }
    })
}

//fetch brand
exports.getTags = (req, res) => {
    Tags.find({}).exec((error, tags) => {
        if (error) return res.status(400).json({ error });

        if (tags) {
            return res.status(200).json({ tags });
        }
    });
};