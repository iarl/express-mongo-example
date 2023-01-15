import { Schema, model } from "mongoose"
const beautifyUnique = require('mongoose-beautiful-unique-validation')

const schema = new Schema({
    id: {
        type: Number,
        required: [true, 'Airplane id is required'],
        unique: true
    },
    year: {
        type: Number
    },
    company: {
        type: String,
        required: [true, 'Airplane company is required']
    },
    model: {
        type: String,
        required: [true, 'Airplane model is required']
    },
    first_class_seats: {
        type: Number,
        price: Number
    },
    economy_class_seats: {
        type: Number,
        price: Number
    }
})

schema.plugin(beautifyUnique)

export default model('Airplane', schema)