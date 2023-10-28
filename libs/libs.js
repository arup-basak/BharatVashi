import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const checkUser = async (userId) => {
  try {
    const user = await prisma.User.findMany({
      where: {
        userId: userId,
      },
    });
    if (user.length == 0) {
      return false;
    }
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
};

export const checkPost = async (postId) => {
  try {
    const post = await prisma.Post.findFirst({
        where: {
            id: parseInt(postId)
        }
    })
    if(post) {
        return true;
    }
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
