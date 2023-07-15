import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { TUser } from "@/types/types"

export default function ProfileModal({ name, email, image }: TUser) {

    return (
        <Dialog>
            <DialogTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Avatar className="border border-slate-500 rounded-full cursor-pointer">
                                <AvatarImage src={`${image}`} alt={`${name}`} />
                                <AvatarFallback>{name?.substring(0, 2)}</AvatarFallback>
                            </Avatar>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>{email}</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-normal">
                        <h2 className="text-center text-xl font-semibold leading-tight text-slate-800">
                            Profile
                        </h2>
                    </DialogTitle>
                    <DialogDescription>
                        profile
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
