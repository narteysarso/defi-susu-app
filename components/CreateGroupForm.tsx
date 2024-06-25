import React, { useRef, useState } from 'react'
import CustomInput from './CustomInput'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from './ui/form'
import { Button } from './ui/button'
import { useForm } from 'react-hook-form';
import { groupFormSchema } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import TokenSelectInput from './TokenSelectInput'
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

function CreateGroupForm() {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const submitButtonRef = useRef();

    const formSchema = groupFormSchema();

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            groupName: "",
            amountPerHead: 0,
            tokenAddress: '',
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <section>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <CustomInput control={form.control} name='groupName' label='Group name' placeholder='Enter name of your group' />
                    <div className='flex gap-1 items-center'>
                        <CustomInput className='flex-2' control={form.control} name='tokenAddress' label='Token Address' placeholder='Enter token address' />
                        <TokenSelectInput onSelect={(token) => form.setValue("tokenAddress", token?.address)} />
                    </div>
                    <CustomInput control={form.control} name='amountPerHead' label='Amount per head' placeholder='Enter amount per person' inputType='number' step={0.01} min={1} />

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
                                        ) : <>Create Group</>
                                    }
                                </Button>


                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action will create a new Susu Group
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel  onClick={() => { setDialogOpen(false) }} disabled={isLoading}>
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
        </section>
    )
}

export default CreateGroupForm