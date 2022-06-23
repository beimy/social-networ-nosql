const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true
            //add validation
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
    //     friends : [
    //         {
    //             type: Schema.Types.ObjectId,
    //             ref: 'User'
    //         }
    //     ],
    // },
    // {
    //     toJSON: {
    //         virtuals: true,
    //         getters: true
    //     },
    //     id: false
    }
);

// get total number of friends
// UserSchema.virtual('friendCount').get(function() {
//     return this.friends.reduce(
//     (total, friend) => total + friend
//     )
// })

// create the Pizza model using the PizzaSchema
const User = model('User', UserSchema);

module.exports = User;