const UserAddress = require('../models/address');

//create address
exports.addAddress = (req, res) => {

    const { payload } = req.body; //get param from request

    //insert address by user Id
    if (payload.address) {
        if (payload.address._id) {
            UserAddress.findOneAndUpdate(
                { user: req.user._id, "address._id": payload.address._id },
                {
                    $set: {
                        "address.$": payload.address,
                    },
                }
            ).exec((error, address) => {
                if (error) return res.status(400).json({ error });//if error return error
                if (address) {
                    res.status(201).json({ address });
                }
            })
        } else {
            UserAddress.findOneAndUpdate(
                { user: req.user._id }, 
                {
                    "$push": {
                        "address": payload.address
                    }
                }, 
                { new: true, upsert: true }
            ).exec((error, address) => {
                if (error) return res.status(400).json({ error });//if error return error
                if (address) {
                    res.status(201).json({ address });
                }
            });
        }

    } else {
        res.status(400).json({ error: 'Params address require' });
    }
}

//getting address
exports.getAddress = (req, res) => {

    UserAddress.findOne({ user: req.user._id })
        .exec((error, userAddress) => {
            if (error) return res.status(400).json({ error }); //if error return error
            if (userAddress) {
                res.status(200).json({ userAddress });
            }
        });
}