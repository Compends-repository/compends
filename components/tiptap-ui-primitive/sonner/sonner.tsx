"use client"

import { Toaster as Sonner, type ToasterProps } from "sonner"

import { BanIcon } from "@/components/tiptap-icons/ban-icon"
import { CircleCheckIcon } from "@/components/tiptap-icons/circle-check-icon"
import { CircleHelpIcon } from "@/components/tiptap-icons/circle-help-icon"
import { RefreshCcwIcon } from "@/components/tiptap-icons/refresh-ccw-icon"
import { SquareXIcon } from "@/components/tiptap-icons/square-x-icon"
import { cn } from "@/lib/tiptap-utils"

import "./sonner.scss"

const Toaster = ({
  className,
  icons,
  style,
  toastOptions,
  ...props
}: ToasterProps) => {
  return (
    <Sonner
      data-slot="tiptap-toaster"
      className={cn("tiptap-toaster", className)}
      icons={{
        success: <CircleCheckIcon className="tiptap-toast-icon" />,
        info: <CircleHelpIcon className="tiptap-toast-icon" />,
        warning: <BanIcon className="tiptap-toast-icon" />,
        error: <SquareXIcon className="tiptap-toast-icon" />,
        loading: (
          <RefreshCcwIcon className="tiptap-toast-icon tiptap-toast-icon-loading" />
        ),
        ...icons,
      }}
      style={
        {
          "--normal-bg": "var(--tt-toaster-bg-color)",
          "--normal-text": "var(--tt-toaster-text-color)",
          "--normal-border": "var(--tt-toaster-border-color)",
          "--border-radius": "var(--tt-radius-md)",
          ...style,
        } as React.CSSProperties
      }
      toastOptions={{
        ...toastOptions,
        classNames: {
          ...toastOptions?.classNames,
          toast: cn("tiptap-toast", toastOptions?.classNames?.toast),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
