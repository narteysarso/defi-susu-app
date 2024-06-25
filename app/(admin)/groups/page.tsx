
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

export default function Page() {
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
            <AddMemberDialog groupId={"1"} />
            <CreateSusuDialog groupId={"1"} />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <GroupTotalContributions groupId={"1"} />

          <GroupContributors groupId={"1"} />

          <GroupSusuRounds groupId={"1"} />

          <GroupVault groupId={"1"} />

        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <GroupContributions groupId={"1"} />
          <GroupDisbursments groupId={"1"} />
        </div>
      </main>
    </div>
  )
}
