const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: 'string',
        required: true,
        unique: true
    }, disc: {
        type: 'string',
        required: true
       
       
    }, photo: {
        type: 'string'
       
        
       
    }, username: {
        type: 'string',
        required: true
    }, category: {
        type: Array,
        
    }
},{timestamps: true});

module.exports = mongoose.model("Post", PostSchema)


