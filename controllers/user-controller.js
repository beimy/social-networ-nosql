const { User } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //get user by id w/ thought and friend data
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with this id found' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //post new user
    createUser({body}, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate( {_id: params.id }, body, {new: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with that id found to update' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //delete uesr by id
    deleteUser({params}, res) {
        User.deleteOne({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with that id found to delete' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    //add friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: {friends: params.friendId} },
            { new: true }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user with that id found to add a friend too' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //delete friend
    deleteFriend({params}, res) {
        User.findOneAndUpdate(
            {_id: params.userId },
            { $pull: { friends: { _id: params.friendId} } },
            {new: true}
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
}

module.exports = userController;