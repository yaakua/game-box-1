import type { NextRequest } from "next/server"

export function toQueryString(data: Record<string, any>): string {
	if (data) {
		return new URLSearchParams(data).toString()
	}
	return ""
}

export function toQueryParams(request: NextRequest): Record<string, any> {
	const params = request.nextUrl.searchParams
	return Array.from(params.entries()).reduce(
		(it, [key, val]) => {
			it[key] = val
			return it
		},
		{} as Record<string, any>,
	)
}

export async function toBody<T = unknown>(request: NextRequest) {
	return (await request.json()) as T
}

export async function request<T = unknown>(
	input: RequestInfo,
	init?: RequestInit,
): Promise<T> {
	return fetch(input, {
		headers: {
			accept: "application/json",
			"content-type": "application/json",
		},
		...init,
	}).then((res) => {
		if (res.ok) {
			return res.json()
		}
		return Promise.reject(res.statusText)
	})
}

export async function get<T = unknown>(
	url: string,
	params?: Record<string, any>,
) {
	if (params) {
		url += `?${new URLSearchParams(params).toString()}`
	}
	return request<T>(url, {
		method: "GET",
	})
}

export async function post<T = unknown>(
	url: string,
	body?: any,
	init?: RequestInit,
) {
	return request<T>(url, {
		method: "POST",
		body: body ? JSON.stringify(body) : body,
		...init,
	})
}

export async function fetchGet<T = unknown>(
	url: string,
	params?: Record<string, any>,
	init?: RequestInit,
) {
	if (params) {
		url += `?${new URLSearchParams(params).toString()}`
	}
	return request<T>(url, {
		method: "GET",
		...init,
	}).then((res: any) => {
		if (res?.code) {
			if (200 === res.code) {
				return res?.data
			}
			return Promise.reject(res?.message)
		}
		return res
	})
}

export async function fetchPost<T = unknown>(
	url: string,
	body?: any,
	init?: RequestInit,
) {
	return request<T>(url, {
		method: "POST",
		body: body ? JSON.stringify(body) : body,
		...init,
	}).then((res: any) => {
		if (200 === res?.code) {
			return res?.data
		}
		return Promise.reject(res?.message)
	})
}

export async function fetchPut<T = unknown>(
	url: string,
	params?: Record<string, any>,
) {
	if (params) {
		url += `?${new URLSearchParams(params).toString()}`
	}
	return request<T>(url, {
		method: "PUT",
	})
}

export async function fetchDelete<T = unknown>(
	url: string,
	params?: Record<string, any>,
) {
	if (params) {
		url += `?${new URLSearchParams(params).toString()}`
	}
	return request<T>(url, {
		method: "DELETE",
	})
}
