"use client"
import {Skeleton} from "@nextui-org/skeleton";


export const ArticleSkeleton = ({isLoaded = false}: { isLoaded?: boolean }) => (
    <>
        <Skeleton isLoaded={isLoaded} className="w-1/5 rounded-lg mb-4">
            <div className="h-3 w-full rounded-lg bg-skeleton"></div>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="w-4/5 rounded-lg mb-4">
            <div className="h-3 w-full rounded-lg bg-skeleton-light"></div>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="w-2/5 rounded-lg mb-4">
            <div className="h-3 w-full rounded-lg bg-skeleton-lighter"></div>
        </Skeleton>
        <Skeleton isLoaded={isLoaded} className="w-3/5 rounded-lg mb-4">
            <div className="h-3 w-full rounded-lg bg-skeleton-lighter"></div>
        </Skeleton>
    </>
)