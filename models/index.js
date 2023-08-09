const Post = require("./post");
const Comment = require("./comment");
const User = require("./user");

//user can make many posts (one to many) p
User.hasMany(Post, {
  foreignKey: "user_id",
});
//user can make many comments (one to many)
User.hasMany(Comment, {
  foreignKey: "user_id",
});

//post belongs to user (many to one)
Post.belongsTo(User, {
  foriegnKey: "user_id",
});

//post can have many comments (many to one)
Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

//comment belongs to user (many to one)
Comment.belongsTo(User, {
  foreignKey: "user_id",
}),
  //comments under a post (many to one)
  Comment.belongsTo(Post, {
    foreignKey: "post_id",
  });

module.exports = { User, Post, Comment };
