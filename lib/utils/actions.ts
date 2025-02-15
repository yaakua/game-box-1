import { revalidatePath } from "next/cache"
import type { RedirectType } from "next/navigation"
import { redirect } from "next/navigation"

/**
 *  特别注意：redirect不可以使用 try catch 包裹，否则无法工作
 * @param path
 * @param type
 */
export function redirectWithValidate(path: string, type?: RedirectType) {
	revalidatePath(path)
	redirect(path, type)
}
