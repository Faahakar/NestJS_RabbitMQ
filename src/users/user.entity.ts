
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import Note from '../notes/entities/note.entity';
 
@Entity()
class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;
 
  @Column({ unique: true })
  public email: string;
 
  @Column()
  public name: string;
 
  @Column()
  @Exclude()
  public password: string;
 
  @OneToMany(() => Note, (note: Note) => note.author)
  public notes: Note[];
}
 
export default User;