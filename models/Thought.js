const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    // reactions: {
    //     type: []
    // }
});

// add virual


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;