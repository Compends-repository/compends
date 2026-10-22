import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export default function CancelSendAddFriend({ open, onOpenChange, onConfirm }: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-[25px] bg-black/25 backdrop-blur-[15px] backdrop-brightness-130 backdrop-contrast-125 border-t-2 border-b">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white [text-shadow:-1px_-1px_0_#1a1a2e,1px_-1px_0_#1a1a2e,-1px_1px_0_#1a1a2e,1px_1px_0_#1a1a2e,0_-1px_0_#1a1a2e,0_1px_0_#1a1a2e,-1px_0_0_#1a1a2e,1px_0_0_#1a1a2e]">
            Hold up, cancel the invite?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#ffffff]">
            No stress, you can invite them again whenever you want.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="rounded-[25px] backdrop-blur-3xl bg-white/10">
          <AlertDialogCancel className="cursor-pointer bg-white/90!">Nah, go back</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            onClickCapture={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="cursor-pointer"
          >
            Yep, cancel it
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
