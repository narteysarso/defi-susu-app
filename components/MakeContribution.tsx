import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAccount, useReadContract, useWriteContract } from "wagmi"
import { abi } from "../abi/SusuManager.json";
import { useState } from "react"
import { parseAmount } from "@/lib/utils"
import RoundSelector from "./RoundSelector"

export default function MakeContribution({ groupId, roundId}: { groupId: `0x${string}` }) {
    const [isLoading, setIsLoading] = useState(false);
    const {address: walletAddress}= useAccount();
    const [error, setError] = useState(null);
    const [contributionRound, setContributorRound] = useState();
    const [amount, setAmount] = useState(0);
    const { writeContract } = useWriteContract();
    

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Make Contribution</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Make Contribution</DialogTitle>
                    <DialogDescription>
                        Contribution to Current Round
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <RoundSelector defaultValue={roundId} roundId={roundId} onValueChange={async (_roundId) => {
                              setContributorRound(_roundId)
                            }}/>
                    <div className="grid flex-1 gap-2">
                        
                        <Input type="number" min={0} step={0.0001} placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    
                </div>
                <DialogFooter className="flex justify-between">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            const amountInEth = parseAmount(amount.toString());

                            if(!contributionRound || amountInEth) return;
                            
                            try {
                                setIsLoading(true);
                                writeContract({
                                    abi,
                                    address: groupId,
                                    functionName: "makeContribution",
                                    args: [
                                        contributionRound,
                                        walletAddress,
                                        amountInEth
                                    ]
                                });

                            } catch (error) {
                                console.log(error)
                                setError(error?.message);
                            } finally {
                                setIsLoading(false)
                            }

                        }} >
                            Make Contribution
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
