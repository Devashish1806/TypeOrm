import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('user')
export class User {
  @ObjectIdColumn({ type: 'varchar' })
  _id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
