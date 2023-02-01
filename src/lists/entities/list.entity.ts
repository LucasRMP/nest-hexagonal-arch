export class List {
  id: number;
  name: string;

  constructor({ id, name }: { id?: number; name: string }) {
    this.id = id;
    this.name = name;
  }
}
