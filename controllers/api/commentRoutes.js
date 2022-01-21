const router = require('express').Router();
const { Comment } = require('../../models');
const isAuth = require('../../utils/auth');

router.post('/', isAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      comment_body: req.body.comment_body,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });
    console.log(newComment)
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// router.delete('/:id', async (req, res) => {
//   try {
//     const commentData = await Comment.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!commentData) {
//       res.status(404).json({ message: 'No comment found with this id!' });
//       return;
//     }

//     res.status(200).json(commentData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;