export type Note = {
  uid: string;
  description: string;
  creationDate: Date;
  taskUid?: string;
  userUid: string;
};
