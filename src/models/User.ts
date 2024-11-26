import { Note } from "./Note";
import { Tag } from "./Tag";
import { Task } from "./Task";

export type User = {
    uid: string;
    email: string;
    tasks: Task[];
    notes: Note[];
    tags: Tag[];
}
