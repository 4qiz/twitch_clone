import { getSelf } from "./auth-service";
import { db } from "./db";

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf();
    const otherUser = await db.user.findUnique({
      where: { id },
    });
    if (!otherUser) {
      throw new Error("User not found");
    }
    if (self.id === otherUser.id) {
      return false;
    }
    const existingBlock = await db.block.findUnique({
      where: {
        blockerId_blockedId: {
          blockerId: otherUser.id,
          blockedId: self.id,
        },
      },
    });
    return !!existingBlock;
  } catch {
    return false;
  }
};

export const blockUser = async (id: string) => {
  const self = await getSelf();

  if (self.id === id) {
    throw new Error("You cannot block yourself");
  }
  const othersUser = await db.user.findUnique({ where: { id } });
  if (!othersUser) {
    throw new Error("User not found");
  }
  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: othersUser.id,
      },
    },
  });
  if (existingBlock) {
    throw new Error("User already blocked");
  }
  const block = await db.block.create({
    data: {
      blockerId: self.id,
      blockedId: othersUser.id,
    },
    include: {
      blocked: true,
    },
  });
  return block;
};

export const unblockUser = async (id: string) => {
  const self = await getSelf();
  if (self.id === id) {
    throw new Error("You cannot unblock yourself");
  }
  const othersUser = await db.user.findUnique({ where: { id } });
  if (!othersUser) {
    throw new Error("User not found");
  }

  const existingBlock = await db.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockerId: self.id,
        blockedId: othersUser.id,
      },
    },
  });
  if (!existingBlock) {
    throw new Error("User not blocked");
  }
  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  });
  return unblock;
};
