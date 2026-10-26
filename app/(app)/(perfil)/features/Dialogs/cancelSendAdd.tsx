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
      <AlertDialogContent className="rounded-[23px] bg-[#7a7a7aae] backdrop-blur-[10px] backdrop-brightness-130 backdrop-contrast-125 border-b">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white [text-shadow:-1px_-1px_0_#1a1a2e,1px_-1px_0_#1a1a2e,-1px_1px_0_#1a1a2e,1px_1px_0_#1a1a2e,0_-1px_0_#1a1a2e,0_1px_0_#1a1a2e,-1px_0_0_#1a1a2e,1px_0_0_#1a1a2e] font-jetBrains font-bold">
            Hold up, cancel the invite?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[#e8e8e8] font-josefin">
            No stress, you can invite them again whenever you want.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="rounded-b-[23px] border-t border-0 bg-[#4747478c]">
          <AlertDialogCancel className="cursor-pointer!">Nah, go back</AlertDialogCancel>
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
