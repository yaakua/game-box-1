import { type NextRequest, NextResponse } from "next/server"

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"

export type NextApiRouter = {
	GET: (
		request: NextRequest,
		ctx?: Record<string, any>,
	) => Promise<NextResponse> | NextResponse
	POST: (
		request: NextRequest,
		ctx?: Record<string, any>,
	) => Promise<NextResponse> | NextResponse
	PUT: (
		request: NextRequest,
		ctx?: Record<string, any>,
	) => Promise<NextResponse> | NextResponse
	DELETE: (
		request: NextRequest,
		ctx?: Record<string, any>,
	) => Promise<NextResponse> | NextResponse
}

export type ARouteContext = {
	params: { slug: string[] } & Record<string, any>
	searchParams?: Record<string, any>
} & Record<string, any>

export type ARouteHandler = (
	request: NextRequest,
	ctx: ARouteContext,
) => Promise<NextResponse> | NextResponse

export class ARouter {
	prefix: string
	routeMapper: Map<HttpMethod, [string, ARouteHandler][]> = new Map()
	handlers: NextApiRouter = {} as NextApiRouter

	constructor(prefix: string) {
		this.prefix = prefix
	}

	end(): NextApiRouter {
		const createHandler = (method: HttpMethod) => {
			return (req: NextRequest, ctx: ARouteContext) => {
				const entry = this.routeMapper.get(method)
				return this.doRoute(entry, req, {} as any)
			}
		}

		this.handlers = {
			GET: createHandler("GET"),
			POST: createHandler("POST"),
			PUT: createHandler("PUT"),
			DELETE: createHandler("DELETE"),
		} as const as NextApiRouter
		return this.handlers
	}

	get(pattern: string, handler: ARouteHandler): void {
		this.addRoute("GET", pattern, handler)
	}

	post(pattern: string, handler: ARouteHandler): void {
		this.addRoute("POST", pattern, handler)
	}

	put(pattern: string, handler: ARouteHandler): void {
		this.addRoute("PUT", pattern, handler)
	}

	delete(pattern: string, handler: ARouteHandler): void {
		this.addRoute("DELETE", pattern, handler)
	}

	private doRoute(
		entries: [string, ARouteHandler][] | undefined,
		req: NextRequest,
		ctx: ARouteContext,
	): any {
		if (entries) {
			const url = req.nextUrl.pathname ?? ""
			for (const entry of entries) {
				const [pattern, handler] = entry
				const regex = new RegExp(
					`^${this.prefix + pattern.replace("*", ".*")}$`,
				)
				if (regex.test(url)) {
					return handler(req, ctx)
				}
			}
		}
		return NextResponse.json(
			{ message: "未知路由" },
			{
				status: 404,
			},
		)
	}

	private addRoute(
		method: HttpMethod,
		pattern: string,
		handler: ARouteHandler,
	) {
		const routes = this.routeMapper.get(method)
		this.routeMapper.set(method, [...(routes ?? []), [pattern, handler]])
	}
}

export class R {
	static raw<T = {}>(data: T, init?: ResponseInit) {
		return NextResponse.json(data, init)
	}

	static notFound(message = "请求路径有误", init?: ResponseInit) {
		return NextResponse.json(
			{
				code: 404,
				message,
			},
			init ?? {
				status: 404,
			},
		)
	}

	static ok<T>(data?: T, init?: ResponseInit) {
		return this.raw(
			{
				code: 200,
				message: "Ok",
				data,
			},
			init,
		)
	}

	static bad(message = "请求参数有误", init?: ResponseInit) {
		return this.raw(
			{
				code: 400,
				message,
			},
			init,
		)
	}

	static error(message = "服务内部错误", init?: ResponseInit) {
		return this.raw(
			{
				code: 500,
				message,
			},
			init,
		)
	}
}
