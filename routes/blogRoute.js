const {
  fetchBlog,
  createBlog,
  fetchSingleBlog,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogController");
const { isAuthenticated } = require("../middlewares/isAuthenticated");
const catchError = require("../utils/catchError");

const router = require("express").Router();

router.route("/blogs").get(fetchBlog).post(isAuthenticated, catchError());
router
  .route("/blogs/:id")
  .get(catchError(fetchSingleBlog))
  .delete(isAuthenticated, catchError(deleteBlog))
  .patch(isAuthenticated, catchError(updateBlog));

module.exports = router;
