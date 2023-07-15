import {
    AiFillSetting
} from "react-icons/ai"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider
} from "@/components/ui/tooltip"
import { Button } from "./ui/button"

export default function SettingsModal() {

    return (
        <Dialog>
            <DialogTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="p-2.5 border border-slate-500 rounded-full cursor-pointer bg-transparent hover:bg-slate-200">
                                <AiFillSetting size={"1.25rem"} className="text-slate-600" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <span>Setting</span>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-normal">
                        <h2 className="text-center text-xl font-semibold leading-tight text-slate-800">
                            Settings
                        </h2>
                    </DialogTitle>
                    <DialogDescription>
                        Settings
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
