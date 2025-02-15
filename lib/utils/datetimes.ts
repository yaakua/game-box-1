import dayjs from "dayjs"

import duration from "dayjs/plugin/duration"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(duration)
dayjs.extend(relativeTime)

export function startOfDate(date?: dayjs.Dayjs, unit: dayjs.UnitType = "d") {
	return dayjs(date).startOf(unit).toDate()
}

export function endOfDate(date?: dayjs.Dayjs, unit: dayjs.UnitType = "d") {
	return dayjs(date).endOf(unit).toDate()
}

/**
 * 格式化日期
 * @param date
 */
export function formatDate(date: dayjs.Dayjs | Date | null | undefined) {
	if (!date) return ""
	return dayjs(date).format("YYYY-MM-DD")
}

/**
 * 格式化日期时间
 * @param date
 */
export function formatDateTime(date: dayjs.Dayjs | Date | null | undefined) {
	if (!date) return ""
	return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

/**
 * 格式化相对时间
 * @param time
 */
export function formatRelativeTime(
	time: dayjs.Dayjs | Date | string | null | undefined,
) {
	if (!time) return "刚刚"
	const diff = dayjs().diff(time)
	const duration = dayjs.duration(diff)
	const minutes = duration.minutes()
	const hours = duration.hours()
	const days = duration.days()
	if (days > 0) {
		return `${days} 天前`
	} else if (hours > 0) {
		return `${hours} 小时前`
	} else if (minutes > 0) {
		return `${minutes} 分钟前`
	} else {
		return "刚刚"
	}
}

export function formatToMinutes(seconds: number): string {
	const duration = dayjs.duration(seconds, "second")
	return duration.format("mm:ss")
}

export function formatKBtoMB(b: number): string {
	const kb = b / 1024
	if (kb < 1024) {
		return `${kb}KB`
	}
	const mb = kb / 1024
	return `${mb.toFixed(2)}MB`
}
