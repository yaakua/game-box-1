import dayjs from "dayjs"

export function safeParse<T = any>(
	value: string | null | undefined,
	defaultValue?: T,
): T | undefined {
	if (value && value.length) {
		try {
			return JSON.parse(value)
		} catch (e) {
			// ignore
		}
	}
	return defaultValue
}

export function safeStringify(
	value: any,
	replacer?: (this: any, key: string, value: any) => any,
	space?: string | number,
) {
	if (value) {
		try {
			return JSON.stringify(value, replacer, space)
		} catch (e) {
			// ignore
		}
	}
	return ""
}

export function downloadJson(jsonStr: string, fileName?: string): void {
	// Step 1: 解析JSON字符串
	const jsonData = JSON.parse(jsonStr)

	// Step 2: 创建一个Blob对象
	const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
		type: "application/json",
	})

	// Step 3: 创建一个链接元素
	const link = document.createElement("a")
	link.href = window.URL.createObjectURL(blob)
	link.download = fileName ?? `rdx-${dayjs().format("YYYYMMDDHHmmss")}.json`

	// Step 4: 触发下载
	document.body.appendChild(link)
	link.click()

	// Step 5: 清理：移除链接并释放Blob对象
	document.body.removeChild(link)
	window.URL.revokeObjectURL(link.href)
}
