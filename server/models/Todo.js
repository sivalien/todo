const { mongoose, Types } = require('mongoose')

const TodoSchema = mongoose.Schema({
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = mongoose.model('Todo', TodoSchema)