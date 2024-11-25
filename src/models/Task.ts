import { Note } from "./Note"

export type Task = Note & {
    title: string,
    startDate: Date,
    endDate: Date,
    status: 'open' | 'close',
    notes?: Note[]
}