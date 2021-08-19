const router = require('express').Router();
const mongoose = require('mongoose')
const catgory = require('../models/Category')




//UPDATE POST
router.post('/', async (req, res) => {
   const newcat = new category(req.body)
   try {
       const savedcat = await newcat.save()
       res.status(200).json(savedcat)
   } catch (error) {
       res.status(400).json('sumthing wrong')
   }
})

router.get('/', async (req, res) => {
   
    try {
        const cats = await catgory.find()
        res.status(200).json(cats)
    } catch (error) {
        res.status(400).json('sumthing wrong')
    }
 })




module.exports = router