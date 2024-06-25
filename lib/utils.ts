import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Token } from '@coinbase/onchainkit/token';

import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const groupFormSchema = () => z.object({
  // sign up
  groupName: z.string().min(3),
  tokenAddress: z.string().length(42).startsWith('0x'),
  amountPerHead: z.string().transform(parseFloat),
  contributors: z.string().array().optional()
})