import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { checkPost, checkUser } from "../libs/libs.js";

const router = Router();
const prisma = new PrismaClient();
router.get("/", async (req, res) => {
  try {
    const posts = await Comment.find();
    res.json(posts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching all comments" });
  }
});

router.post("/create", async (req, res) => {
  const { authorId, postId } = req.body;

  try {
    const postExists = await checkPost(postId);

    if (postExists) {
      const userExists = await checkUser(authorId);

      if (userExists) {
        const comment = await prisma.Comment.create({
          data: req.body
        });

        res.status(200).json({ response: true, data: comment });
      } else {
        res.json({ response: false, error: "Author Not Found" });
      }
    } else {
      res.json({ response: false, error: "Post Not Found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      response: false,
      error: "Failed to write Comment",
    });
  }
});

router.delete("/delete/:commentId", async (req, res) => {
  try {
    const commentId = req.params.commentId;

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    await comment.remove();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the comment" });
  }
});

export default router;
