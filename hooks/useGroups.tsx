'use client';

import { ReactNode, createContext, useContext, useEffect, useState } from "react";

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
    const { groups, isLoading, setGroups, setIsLoading} = useContext<any>(GroupsContext);

    useEffect(() => {
        async function fetchGroups() {
            //TODO: fetch group nft and metadata
        }

        (async () => {

            const groups = await fetchGroups();
            setGroups(groups);
        })();
    })


    return { groups, loading: isLoading };
}

