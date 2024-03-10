import { Transform } from 'class-transformer';
import { UUID } from 'crypto';
import Category from 'src/categories/category.entity';
import User from 'src/users/user.entity';
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
class NoteEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public title: string;

    @Column()
    public note: string;

    @ManyToOne(() => User, (author: User) => author.notes)
    public author: User;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updated_at: Date;

    
    @ManyToMany(() => Category, (category: Category) => category.notes,{
        cascade: true,
    })
    @JoinTable()
    public categories: Category[];
}

export default NoteEntity;
