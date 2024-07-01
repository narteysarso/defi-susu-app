
'use client';

import GroupTotalContributions from "@/components/GroupTotalContributions"
import GroupContributors from "@/components/GroupContributors"
import GroupSusuRounds from "@/components/GroupSusuRounds"
import GroupVault from "@/components/GroupVault"
import GroupContributions from "@/components/GroupContributions"
import GroupDisbursments from "@/components/GroupDisbursments"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import AddMemberDialog from "@/components/AddMemberDialog"
import CreateSusuDialog from "@/components/CreateSusuDialog"
import { useParams } from "next/navigation"
import {abi as groupAbi} from "../../../../abi/SusuManager.json";
import { useReadContracts } from "wagmi";
import MakeContribution from "@/components/MakeContribution";

export default function Page() {
  const {groupId} = useParams();
  const groupContract = {
    abi: groupAbi,
    address: groupId
    

}
  const { data: groupData,
    error, isLoading, status, } = useReadContracts({

        contracts: [
            {
                ...groupContract,
                functionName: "roundID",
                
            },
            {
                ...groupContract,
                functionName: "getRoundLength"
            },
            {
                ...groupContract,
                functionName: "amountPerHead"
            },
            // {
            //     ...groupContract,
            //     functionName: "susuWalletAddress"
            // },
            // {
            //     ...groupContract,
            //     functionName: "getContributors"
            // },
        ]
    });

  // useEffect(() => console.log(groupId),[])

  if(isLoading) return "loading ...";

  if(error) return error.message;

  console.log(groupData);

  // return <>{status}</>

  return (
    <div className="flex min-h-screen w-full flex-col">

      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center gap-4">
          
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            Group Details
          </h1>
          <Badge variant="outline" className="hidden md:flex ml-auto sm:ml-0">
            In stock
          </Badge>
          <div className="flex items-center gap-2 md:ml-auto md:flex">
            <AddMemberDialog groupId={groupId} />
            <CreateSusuDialog groupId={groupId} />
            <MakeContribution groupId={groupId} roundId={(groupData?.length) ? groupData[0]?.result : 0} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <GroupTotalContributions groupId={groupId} data={(groupData?.length) ? groupData[2]?.result : 0}/>

          <GroupContributors groupId={groupId} />

          <GroupSusuRounds groupId={groupId} data={(groupData?.length) ? groupData[0]?.result : 0} />

          <GroupVault groupId={groupId} />

        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <GroupContributions groupId={groupId} roundId={(groupData?.length) ? groupData[0]?.result : 0}/>

          {/* <GroupDisbursments groupId={groupId} /> */}
        </div>
      </main>
    </div>
  )
}
