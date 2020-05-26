const Category = require('../models/category')
const { errorHandler } = require("../helpers/dbErrorHandlers"); 

exports.create = async (req, res) => {
    const category = new Category(req.body)

    try{
        const savedCategory = await category.save()
        res.status(201).send(savedCategory)
    } catch (err) {
        res.status(409).json({
                error: errorHandler(err)
            });
    }
}

exports.getCategoryById = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).send()
        }
        res.send(category)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}

exports.updateCategory = async (req, res) => {
    try{
        const category = await Category.findById(req.params.id)

        if (!category) {
            return res.status(404).send()
        }
        category.name = req.body.name
        await category.save()
        res.send(category)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}

exports.deleteCategory = async (req, res) => {
    try{
        const category = await Category.findOneAndDelete({ _id: req.params.id })

        if (!category) {
            return res.status(404).send()
        }

        res.status(200).send(category)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({})

        if (!categories) return res.status(404).send()

        res.send(categories)
    } catch (err) {
        res.status(500).json({
                error: errorHandler(err)
            });
    }
}