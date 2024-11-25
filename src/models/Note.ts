import { Tag } from "./Tag"

export type Note = {
    id: number,
    description: string,
    tags?: Tag[]
}