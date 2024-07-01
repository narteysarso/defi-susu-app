import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function RoundSelector({defaultValue, onValueChange, roundId}) {


  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select round" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem>Select Round</SelectItem>
            {(roundId > 0n) &&
                Array(roundId)
                    .fill(0)
                    .map((i) => <SelectItem value={i} key={i}>{i}</SelectItem>)
            }

        </SelectContent>
    </Select>
  )
}

export default RoundSelector