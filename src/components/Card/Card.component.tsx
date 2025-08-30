import { cn } from "@/lib/utils";
import type { FC, PropsWithChildren, ReactNode } from "react";

type CardProps = PropsWithChildren & {
  cardContainerClassName?: string;
  cardInnerClassName?: string;
  captionContent?: ReactNode;
};

const Card: FC<CardProps> = ({
  children,
  cardContainerClassName,
  cardInnerClassName,
  captionContent,
}) => {
  return (
    <div
      className={cn("p-2 rounded-2xl bg-neutral-100", cardContainerClassName)}
    >
      <div
        className={cn(
          "rounded-2xl border border-neutral-200 shadow p-4 bg-white",
          cardInnerClassName,
        )}
      >
        {children}
      </div>
      <div className="px-2">{captionContent}</div>
    </div>
  );
};

export default Card;
