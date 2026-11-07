"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, MotionConfig } from "motion/react";

import { cn } from "@/lib/utils";

const TRANSITION = {
  type: "spring" as const,
  bounce: 0.05,
  duration: 0.3,
};

export type PopoverAnimation =
  | "morph"
  | "fade"
  | "scale"
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right"
  | "blur"
  | "flip"
  | "bounce";

const ANIMATIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  "slide-up": {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 16 },
  },
  "slide-down": {
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
  },
  "slide-left": {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 16 },
  },
  "slide-right": {
    initial: { opacity: 0, x: -16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
    animate: { opacity: 1, filter: "blur(0px)", scale: 1 },
    exit: { opacity: 0, filter: "blur(8px)", scale: 0.95 },
  },
  flip: {
    initial: { opacity: 0, rotateX: -90, transformPerspective: 600 },
    animate: { opacity: 1, rotateX: 0, transformPerspective: 600 },
    exit: { opacity: 0, rotateX: -90, transformPerspective: 600 },
  },
  bounce: {
    initial: { opacity: 0, scale: 0.5 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.5 },
    transition: { type: "spring" as const, bounce: 0.5, duration: 0.5 },
  },
};

function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  handler: () => void,
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
}

interface PopoverContextType {
  isOpen: boolean;
  openPopover: () => void;
  closePopover: () => void;
  uniqueId: string;
  note: string;
  setNote: (note: string) => void;
  animation: PopoverAnimation;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

function usePopover() {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("usePopover must be used within a PopoverProvider");
  }
  return context;
}

function usePopoverLogic(animation: PopoverAnimation) {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [note, setNote] = useState("");

  const openPopover = () => setIsOpen(true);
  const closePopover = () => {
    setIsOpen(false);
    setNote("");
  };

  return {
    isOpen,
    openPopover,
    closePopover,
    uniqueId,
    note,
    setNote,
    animation,
  };
}

interface PopoverRootProps {
  children: React.ReactNode;
  className?: string;
  animation?: PopoverAnimation;
}

export function PopoverRoot({
  children,
  className,
  animation = "morph",
}: PopoverRootProps) {
  const popoverLogic = usePopoverLogic(animation);

  return (
    <PopoverContext.Provider value={popoverLogic}>
      <MotionConfig transition={TRANSITION}>
        <div
          className={cn(
            "relative isolate flex items-center justify-center",
            className,
          )}
        >
          {children}
        </div>
      </MotionConfig>
    </PopoverContext.Provider>
  );
}

interface PopoverTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverTrigger({ children, className }: PopoverTriggerProps) {
  const { openPopover, uniqueId, animation, isOpen } = usePopover();
  const isMorph = animation === "morph";
  const hidden = isOpen && !isMorph;

  return (
    <motion.button
      key="button"
      layoutId={isMorph ? `popover-${uniqueId}` : undefined}
      className={cn(
        "flex h-9 items-center border border-zinc-950/10 bg-white px-3 text-zinc-950 dark:border-zinc-50/10 dark:bg-zinc-700 dark:text-zinc-50",
        className,
      )}
      style={{
        borderRadius: 8,
        pointerEvents: hidden ? "none" : "auto",
      }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{ duration: 0.15 }}
      onClick={openPopover}
    >
      <motion.span
        layoutId={isMorph ? `popover-label-${uniqueId}` : undefined}
        className="text-sm"
      >
        {children}
      </motion.span>
    </motion.button>
  );
}

interface PopoverContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverContent({ children, className }: PopoverContentProps) {
  const { isOpen, closePopover, uniqueId, animation } = usePopover();
  const isMorph = animation === "morph";
  const formContainerRef = useRef<HTMLDivElement>(null);

  useClickOutside(formContainerRef, closePopover);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closePopover();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closePopover]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={formContainerRef}
          {...(isMorph ? { layoutId: `popover-${uniqueId}` } : ANIMATIONS.fade)}
          className={cn(
            "absolute z-50 h-[200px] w-[364px] overflow-hidden border border-zinc-950/10 outline-none",
            className,
          )}
          style={{
            borderRadius: 12,
            top: "auto",
            left: "auto",
            ...(isMorph ? { transform: "none" } : {}),
          }}
        >
          <motion.div
            className="h-full w-full"
            {...(isMorph ? {} : ANIMATIONS[animation])}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface PopoverFormProps {
  children: React.ReactNode;
  onSubmit?: (note: string) => void;
  className?: string;
}

export function PopoverForm({
  children,
  onSubmit,
  className,
}: PopoverFormProps) {
  const { note, closePopover } = usePopover();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(note);
    closePopover();
  };

  return (
    <form
      className={cn("flex h-full flex-col", className)}
      onSubmit={handleSubmit}
    >
      {children}
    </form>
  );
}

interface PopoverLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverLabel({ children, className }: PopoverLabelProps) {
  const { uniqueId, note, animation } = usePopover();

  return (
    <motion.span
      layoutId={animation === "morph" ? `popover-label-${uniqueId}` : undefined}
      aria-hidden="true"
      style={{
        opacity: note ? 0 : 1,
      }}
      className={cn(
        "absolute top-3 left-4 text-sm text-zinc-500 select-none dark:text-zinc-400",
        className,
      )}
    >
      {children}
    </motion.span>
  );
}

interface PopoverTextareaProps {
  className?: string;
}

export function PopoverTextarea({ className }: PopoverTextareaProps) {
  const { note, setNote } = usePopover();

  return (
    <textarea
      className={cn(
        "h-full w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm outline-none",
        className,
      )}
      autoFocus
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />
  );
}

interface PopoverFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function PopoverFooter({ children, className }: PopoverFooterProps) {
  return (
    <div
      key="close"
      className={cn("flex justify-between px-4 py-3", className)}
    >
      {children}
    </div>
  );
}

interface PopoverCloseButtonProps {
  className?: string;
}

export function PopoverCloseButton({ className }: PopoverCloseButtonProps) {
  const { closePopover } = usePopover();

  return (
    <button
      type="button"
      className={cn("flex items-center", className)}
      onClick={closePopover}
      aria-label="Close popover"
    >
      <X size={16} className="text-zinc-900 dark:text-zinc-100" />
    </button>
  );
}

interface PopoverSubmitButtonProps {
  className?: string;
}

export function PopoverSubmitButton({ className }: PopoverSubmitButtonProps) {
  return (
    <button
      className={cn(
        "relative ml-1 flex h-8 shrink-0 scale-100 appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors select-none hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800",
        className,
      )}
      type="submit"
      aria-label="Submit note"
    >
      Submit
    </button>
  );
}

export function PopoverHeader({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "px-4 py-2 font-semibold text-zinc-900 dark:text-zinc-100",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PopoverBody({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("p-4", className)}>{children}</div>;
}

// New component: PopoverButton
export function PopoverButton({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "flex w-full items-center gap-2 rounded-md px-4 py-2 text-left text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
