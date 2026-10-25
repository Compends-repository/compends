'use client'

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IconPencil } from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";


type Session = typeof auth.$Infer.Session;

type Props = {
  session: Session | null;
};

export default function EditBio_OnPerfil({ session }: Props) {
    const router = useRouter()
    const [ open, setOpen] = useState(false)
    const [bio, setBio] = useState(session?.user.bio ?? '')
    const [saving, setSaving] = useState(false)

    function handleOpenChange(next: boolean) {
        setOpen(next)
        if (!next) setBio(session?.user.bio ?? '')
    }

    async function handleSave(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setSaving(true)

        const { error } = await authClient.updateUser({ bio })

        setSaving(false)
        if ( error ) {
            console.log(error)
            return
        }

        setOpen(false)
        router.refresh()
    }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <Tooltip>
        <TooltipTrigger
          render={
            <DialogTrigger
              render={
                <Button
                  variant="ghost"
                  className="absolute left-full ml-2 top-1/8 -translate-y-1/2 w-[35] h-[35] cursor-pointer"
                >
                  <IconPencil className="w-[20]! h-[20]!" stroke={2} />
                </Button>
              }
            />
          }
        />
        <TooltipContent>
          <p>Edit bio</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSave} className="grid gap-4">
          <DialogHeader>
            <DialogTitle>Edit Bio</DialogTitle>
            <DialogDescription>
              Make changes to your bio here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Field>
              <Label htmlFor="bio-1">Bio</Label>
              <Textarea
                className="max-h-[240]"
                id="bio-1"
                name="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose
              className="cursor-pointer"
              render={<Button type="button" variant="outline">Cancel</Button>}
            />
            <Button className="cursor-pointer" type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}