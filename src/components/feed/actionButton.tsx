"use client";

import { cn } from "@/lib/utils";
import NumberFlow, { Format } from "@number-flow/react";
import { Repeat } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const format: Format = {
  notation: "compact",
  compactDisplay: "short",
  roundingMode: "trunc",
};

type Props = {
  reposted: boolean;
  reposts: number;
  onRepost: () => void;
};

export default function ActionButton({ reposted, reposts, onRepost }: Props) {
  return (
    <div className="flex-1">
      <div
        className={cn(
          "group flex items-center gap-1.5 pr-1.5 transition-[color] hover:text-emerald-500",
          reposted && "text-emerald-500"
        )}
        onClick={onRepost}
      >
        <div className="relative before:absolute before:-inset-2.5 before:rounded-full before:transition-[background-color] before:group-hover:bg-emerald-500/10">
          <Repeat
            absoluteStrokeWidth
            className="~size-4/5 group-active:spring-duration-[25] spring-bounce-50 spring-duration-300 transition-transform group-active:scale-[85%]"
          />
        </div>
        <NumberFlow willChange continuous value={reposts} format={format} />
      </div>
    </div>
  );
}
