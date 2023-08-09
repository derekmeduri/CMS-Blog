const Post = require("./post");
const Comment = require("./comment");
const User = require("./user");

User.hasMany(Post, {
    foreignKey: 
});

User.hasMany(Comment, {
    foreignKey:
});

Post.belongsTo(User, {

});

Post.hasMany(Comment, {
    foreignKey:
    onDelete:
});

Comment.belongsTo(User, {
    foreignKey:
}),

Comment.belongsTo(Post, {
    foreignKey: 
});

module.exports = { User, Post, Comment };