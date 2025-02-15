import { pick } from "radash"
import type { Pageable } from "../types"

const ITEMS_PER_PAGE = 10

export function offsetPage({ current, size }: Pageable) {
	const offsetPage = current ? Number(current) || 1 : 1
	const offsetSize = size ? Number(size) || ITEMS_PER_PAGE : 10
	const v = (offsetPage - 1) * offsetSize
	return {
		skip: v,
		take: offsetSize ?? ITEMS_PER_PAGE,
	}
}

export function stripPage<T = {}>(
	data: Pageable<T>,
): { page: Pageable; params: T } {
	const page = pick(data, ["current", "size"]) as Pageable
	const params = (data.data ?? {}) as any
	return { page, params }
}

export function isEmptyPage(count: number) {
	return count <= 0
}

export function hasMorePage(count: number, page: number, size = 10): boolean {
	return page < Math.floor((count ?? 0) / size)
}

export function getTotalPages(totalCount: number, pageSize: number): number {
	if (!(totalCount || pageSize)) return 0
	return Math.ceil(totalCount / pageSize)
}
