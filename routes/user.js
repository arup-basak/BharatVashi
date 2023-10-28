import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const router = Router();

// Code is currently working on total req.body it neeed to be improvement
router.post("/create", async (req, res) => {
  const data = req.body;
  try {
    const user = await prisma.User.create({
      data: data,
    });
    res.json({ response: true, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to create user" });
  }
});

// // Delete a user
// router.delete("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await prisma.user.delete({
//       where: {
//         id: parseInt(id),
//       },
//     });
//     res.json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Unable to delete user" });
//   }
// });

export default router;
