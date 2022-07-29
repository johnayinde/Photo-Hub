import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { Gallery } from './../../galleries/entities/gallery.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  username: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @OneToMany(() => Gallery, (gallery) => gallery.user, { cascade: true })
  galleries: Gallery[];

  @Column({ type: Boolean, default: false })
  isAdmin: boolean;

  @BeforeInsert()
  public async hashPassword() {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    return this.password;
  }
}
