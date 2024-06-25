'use client'

import { useState } from "react"
import { PodcastEmptyPlaceholder } from "../app/(admin)/dashboard/components/podcast-empty-placeholder"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

import CreateGroupDialog from "./CreateGroupDialog"
import CreateSusuDialog from "./CreateSusuDialog"
import WalletTabContent from "./WalletTabContent"
import GroupTabContent from "./GroupTabContent"

enum TabState {
    SUSU = "Susu",
    GROUP = "Group",
    ACTIVITY = "Activity"
}

function AdminTabs() {
    const [currentTab, setCurrentTab] = useState<TabState>(TabState.GROUP);

    return (
        <div>
            <Tabs defaultValue="groups" className="h-full space-y-6">
                <div className="space-between flex items-center">
                    <TabsList>
                        <TabsTrigger value="groups" className="relative" onClick={() => setCurrentTab(TabState.GROUP)}>
                            Groups
                        </TabsTrigger>
                        <TabsTrigger value="susu" onClick={() => setCurrentTab(TabState.SUSU)}>Susu Rounds</TabsTrigger>
                        <TabsTrigger value="live" onClick={() => setCurrentTab(TabState.ACTIVITY)}>
                            Activity History
                        </TabsTrigger>
                    </TabsList>
                    <div className="ml-auto mr-4">
                       { currentTab === TabState.GROUP && <CreateGroupDialog />}
                    </div>
                </div>
                <TabsContent
                    value="groups"
                    className="border-none p-0 outline-none"
                >
                    <GroupTabContent />

                </TabsContent>
                <TabsContent
                    value="susu"
                    className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                    <Separator className="my-4" />
                    <WalletTabContent />
                    
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default AdminTabs