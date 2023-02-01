import { Column, Model, Table } from 'sequelize-typescript';

export interface ListAttributes {
  id: number;
  name: string;
}

@Table
export class ListModel extends Model<ListAttributes> {
  @Column
  name: string;
}
