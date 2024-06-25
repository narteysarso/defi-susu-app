import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { z } from 'zod'
import { cn, groupFormSchema } from '@/lib/utils'


const formSchema = groupFormSchema();

interface CustomInput { 
    control: Control<z.infer<typeof formSchema>>, 
    label: string, 
    name: FieldPath<z.infer<typeof formSchema>>, 
    placeholder: string, 
    inputType?: string,
    className?: string
}


function CustomInput({ control, className, label, name, placeholder, inputType = "text", ...props }: CustomInput) {
    return (
        <FormField
            control={control}
            name={name}
            className={cn(className)}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel className='form-label'>
                        {label}
                    </FormLabel>
                    <div className='flex flex-col w-full'>
                        <FormControl>
                            <Input
                                placeholder={placeholder}
                                className='input-class'
                                {...field}
                                type={inputType}
                                {...props}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default CustomInput