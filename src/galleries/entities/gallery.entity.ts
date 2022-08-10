import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './../../users/entities/User.entity';
import { Category } from './../../categories/entities/category.entity';

@Entity()
export class Gallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.galleries)
  user: User;

  @ManyToOne(() => Category, (category) => category.photos)
  category: Category;
}
