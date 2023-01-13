import { Transform } from "class-transformer";

export function ToBoolean(): (target: any, key: string) => void {
    return Transform((obj: any) => {
        return ['true', '1'].includes(obj.value.toLowerCase())
    })
}

