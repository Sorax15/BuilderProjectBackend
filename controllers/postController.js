module.exports.getAllPosts = (req, res) => {
    res.status(200).json({
        page: 'All Posts',
    });
};

module.exports.getPostById = (req, res) => {
    res.status(200).json({
        page: 'One Post'
    });
};

module.exports.updatePost = (req, res) => {
    res.status(200).json({
        page: 'Update Post'
    });
};

module.exports.createPost = (req, res) => {
    res.status(200).json({
        page: 'Create Post'
    });
};

module.exports.deletePost = (req, res) => {
    res.status(200).json({
        page: 'Delete Post'
    });
};