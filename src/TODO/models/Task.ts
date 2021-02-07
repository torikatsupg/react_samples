export default class Task {
  constructor(
    public id: number,
    public title: string,
  ) {}
}

export type TaskStatus = "TODO" | "DONE";
