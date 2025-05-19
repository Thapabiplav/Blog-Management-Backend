const { blogs } = require("../database/connection");

exports.createBlog = async (req, res) => {
  const { title, description, authorName } = req.body;
  if (!title || !description || !authorName) {
    return res.status(400).json({
      message: "please provide the details",
    });
  }
  await blogs.create({
    title,
    description,
    authorName,
  });
  res.status(201).json({
    message: "blog added successfully",
  });
};

exports.fetchBlog = async (req, res) => {
  const data = await blogs.findAll();
  res.status(200).json({
    message: "blog fetched successfully",
    data,
  });
};

exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, description, authorName } = req.body;
  await blogs.update(
    {
      title,
      description,
      authorName,
    },
    {
      where: {
        id,
      },
    }
  );
  res.status(200).json({
    message: "blog updated successfully",
  });
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  await blogs.destroy({
    where: {
      id,
    },
  });
  res.status(200).json({
    message: "blogs deleted successfully",
  });
};

exports.fetchSingleBlog = async (req, res) => {
  const { id } = req.params;
  const data = await blogs.findByPk(id);
  res.status(200).json({
    message: "single book fetched successfully",
    data,
  });
};
