"use client";

import React, { useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {abi } from "../abi/SusuManager.json"

import {
    Form,
} from "@/components/ui/form"
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
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import CustomInput from "./CustomInput"
import { Loader2 } from 'lucide-react';
import { useWriteContract } from 'wagmi';

const FormSchema = z.object({
    address: z.string().length(42).startsWith('0x')
})

export function AddMemberForm({groupId}:{groupId: `0x${string}`}) {

    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const submitButtonRef = useRef();
    const { writeContract } = useWriteContract();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            address: "",
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        alert('jhh')
        try{
            setIsLoading(true);
            console.log(data)

            writeContract({
                abi,
                address: groupId,
                functionName: 'addContributor',
                args: [data.address],
            })
    
            toast({
                title: "You the address below has been added to the Group",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                    </pre>
                ),
            })
        }catch(e){
            console.log(e)
        }finally{
            setIsLoading(false);
        }
       
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <CustomInput control={form.control} name="address" label="Address" placeholder="Enter member wallet address" />

                <div className='flex justify-between gap-4'>
                    <Button ref={submitButtonRef} type="submit"
                        className='form-btn hidden'>
                        Submit
                    </Button>
                    <Button onClick={() => form.reset()} variant="destructive" className='form-btn' disabled={isLoading}>
                        Cancel
                    </Button>
                    <AlertDialog open={dialogOpen}>
                        <AlertDialogTrigger>
                            <Button onClick={(e) => {
                                e.persist();
                                e.preventDefault()
                                e.stopPropagation();
                                form.trigger().then(() => {
                                    if (form.formState.isValid) setDialogOpen(true);
                                })
                            }}>
                                {
                                    isLoading ? (
                                        <>
                                            <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
                                        </>
                                    ) : <>Add Member(s)</>
                                }
                            </Button>


                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action will add a new member to this group
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => { setDialogOpen(false) }} disabled={isLoading}>
                                    Back
                                </AlertDialogCancel>
                                <AlertDialogAction onClick={() => { setDialogOpen(false); submitButtonRef?.current?.click() }} disabled={isLoading}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>

                </div>


            </form>
        </Form>
    )
}


function AddMemberDialog() {

    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Add Member
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Member</DialogTitle>
                    <DialogDescription>
                        Add a person to this group
                    </DialogDescription>
                </DialogHeader>
                <AddMemberForm />
            </DialogContent>
        </Dialog>

    )
}

export default AddMemberDialog