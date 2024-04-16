"use client";

import { onBlock, onUnBlock } from "@/actions/block";
import { onFollow, onUnFollow } from "@/actions/follow";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface ActionsProps {
  isFollowing: boolean;
  userId: string;
}

export const Actions = ({ isFollowing, userId }: ActionsProps) => {
  const [isPending, startTransition] = useTransition();
  const handleFollow = () => {
    startTransition(() => {
      onFollow(userId)
        .then(() => toast.success("Followed"))
        .catch(() => toast.error("Failed to follow"));
    });
  };

  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(userId)
        .then(() => toast.success("Unfollowed"))
        .catch(() => toast.error("Failed to follow"));
    });
  };

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow();
    } else {
      handleFollow();
    }
  };

  const handleBlock = () => {
    startTransition(() => {
      onBlock(userId)
        .then(() => toast.success("Blocked"))
        .catch(() => toast.error("Failed to block"));
    });
  };

  return (
    <>
      <Button variant="primary" disabled={isPending} onClick={onClick}>
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
      <Button onClick={handleBlock} disabled={isPending}>
        block
      </Button>
    </>
  );
};
