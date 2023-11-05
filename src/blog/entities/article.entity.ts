import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Category, (category) => category.articles, { eager: true })
  @JoinColumn({ name: 'categoryId' })
  public category: Category;

  @Column()
  public title: string;

  @Column('jsonb') // ou 'json' selon vos préférences
  public content: any; // Ce champ contiendra vos blocs de texte, images, etc.

  // Autres propriétés et méthodes...
}
