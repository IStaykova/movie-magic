const mongoose = require('mongoose');

const castSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        max: 120,
        min: 14
    },
    born: {
        type: String,
        required: true,
    },
    nameInMovie: {
        type: String,
        required: true,
    },
    castImage: {
        type: String,
        required: true,
        validate: {
     
            validator(value) {
                return /^https?:\/\//.test(value)
            },
            message: (props) => `${props.value} is invalid URL for the cast image`
        }
    },
    // movie
    // : {
    //     type: String,
    //     required: true,
       
    // },

});

const Cast = mongoose.model('Cast', castSchema);
module.exports = Cast;