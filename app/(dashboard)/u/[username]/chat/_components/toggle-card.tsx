"use client";

import { updateStream } from "@/actions/stream";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useTransition } from "react";
import { toast } from "sonner";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly";

interface ToggleCardProps {
  field: FieldTypes;

  label: string;
  value: boolean;
}

export const ToggleCard = ({ field, label, value }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();
  const onChange = () => {
    startTransition(() => {
      updateStream({ [field]: !value })
        .then(() => toast.success("Chat setting updated"))
        .catch(() => toast.error("Error updating chat setting"));
    });
  };
  return (
    <div className="rounded-xl bg-muted p-6">
      <div className="flex items-center justify-between">
        <p className="font-semibold shrink-0">{label}</p>
        <div className="space-y-2">
          <Switch
            checked={value}
            onCheckedChange={onChange}
            disabled={isPending}
          >
            {value ? "On" : "Off"}
          </Switch>
        </div>
      </div>
    </div>
  );
};

export const ToggleCardSkeleton = () => {
  return <Skeleton className="rounded-xl p-10 w-full" />;
};
