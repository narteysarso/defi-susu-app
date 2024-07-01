'use client';

import AdminTabs from "@/components/AdminTabs"
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi"

export default function MusicPage() {
    const {address} = useAccount();
    

    if(!address) useRouter().push("/");

    return (
        <section className="md:border-l">
            <div className="h-full px-4 py-6 lg:px-8 ">
               <AdminTabs />
            </div>
        </section>
    )
}