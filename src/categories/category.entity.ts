import  Note  from '../notes/entities/note.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
 
@Entity()
class Category {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
 
  @Column()
  public name: string;
  
  @Column({nullable: true, default: "#000000"})
  public cardColor: string = '#000000';
  
  @ManyToMany(() => Note, (note: Note) => note.categories)
  public notes: Note[];
}
 
export default Category;