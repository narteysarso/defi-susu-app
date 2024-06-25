"use client";

import React from 'react'
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
import CreateGroupForm from './CreateGroupForm';

function CreateGroupDialog() {
    
    return (
        <Dialog>
            <DialogTrigger>
                <Button>
                    <PlusCircledIcon className="mr-2 h-4 w-4" />
                    Create Group
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create A Group</DialogTitle>
                    <DialogDescription>
                        Create a new susu group and invite your friends to join
                    </DialogDescription>
                </DialogHeader>
                <CreateGroupForm />
            </DialogContent>
        </Dialog>

    )
}

export default CreateGroupDialog