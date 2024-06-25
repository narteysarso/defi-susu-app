import React from 'react'
import { listenNowAlbums, madeForYouAlbums } from "../app/(admin)/dashboard/data/albums"
import { AlbumArtwork } from "../app/(admin)/dashboard/components/album-network"
import { Separator } from "@/components/ui/separator"

import { Album } from "../app/(admin)/dashboard/data/albums"

function GroupTabContent() {
    return (
        <section>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Listen Now
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Top picks for you. Updated daily.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />

            <div className="flex">
                {listenNowAlbums.map((album: Album) => (
                    <AlbumArtwork
                        key={album.name}
                        album={album}
                        className="w-[250px]"
                        aspectRatio="portrait"
                        width={250}
                        height={330}
                    />
                ))}
            </div>
            <div className="mt-6 space-y-1">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Made for You
                </h2>
                <p className="text-sm text-muted-foreground">
                    Your personal playlists. Updated daily.
                </p>
            </div>
            <Separator className="my-4" />
            <div className="space-x-4 pb-4">
                {madeForYouAlbums.map((album: Album) => (
                    <AlbumArtwork
                        key={album.name}
                        album={album}
                        className="w-[150px]"
                        aspectRatio="square"
                        width={150}
                        height={150}
                    />
                ))}
            </div>
        </section>
    )
}

export default GroupTabContent