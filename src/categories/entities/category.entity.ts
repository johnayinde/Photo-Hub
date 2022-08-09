import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Gallery } from './../../galleries/entities/gallery.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Gallery, (gallery) => gallery.category, { cascade: true })
  photos: Gallery[];
}
