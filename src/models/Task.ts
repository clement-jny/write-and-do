import { Tag } from "./Tag";

export type Task = {
  uid: string;
  title: string;
  startDate: Date;
  endDate: Date;
  status: "open" | "close";
  tags?: Tag[];
  userUid: string;
};
