import  Note  from '../notes/entities/note.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Category {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public name: string;

  
@ManyToMany(() => Note, (note: Note) => note.categories)
public notes: Note[];
}
 
export default Category;