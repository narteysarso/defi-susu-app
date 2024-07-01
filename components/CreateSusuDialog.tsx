
"use client"

import React, { useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { AlertDialogAction, AlertDialogCancel, AlertDialogFooter } from './ui/alert-dialog'
import { useWriteContract } from 'wagmi'
import { abi } from "../abi/SusuManager.json"

function CreateSusuDialog({ groupId }: { groupId: `0x${string}` }) {
    const [isLoading, setIsLoading] = useState(false);
    const [ error, setError ] = useState(null);
    const { writeContract } = useWriteContract()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Start new round</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Start Susu</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. Make sure a previous round has expired.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex justify-between sm:justify-start">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogTrigger asChild>
                        <Button onClick={() => {
                            try {
                                setIsLoading(true);
                                writeContract({
                                    abi,
                                    address: groupId,
                                    functionName: "startNewRound"
                                });

                            } catch (error) {
                                console.log(error)
                                setError(error?.message);
                            } finally {
                                setIsLoading(false)
                            }

                        }} >
                            Start new round
                        </Button>
                    </DialogTrigger>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default CreateSusuDialog
