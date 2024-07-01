'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useReadContract, useReadContracts } from "wagmi";
import { abi as groupAbi } from "../abi/SusuManager.json";

const GroupsContext = createContext({});

export function GroupProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(false);
    const [groups, setGroups] = useState();

    return (
        <GroupsContext.Provider value={
            {
                isLoading, setIsLoading,
                groups, setGroups
            }
        }>
            {children}
        </GroupsContext.Provider>
    )
}

export function useGroups({ address }: { address: `0x${string}` }) {
    const { groups, isLoading, setGroups, setIsLoading } = useContext<any>(GroupsContext);

   

   

    useEffect(() => {
        
        console.log(groupData, error);
    },[groupData, error]);




    return { groupData, loading: isLoading };
}

