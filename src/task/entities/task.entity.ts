import { Note } from "src/note/entities/note.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string 

  @Column({ default: false })
  isCompleted: boolean;
  
  @OneToMany(type => Note, note => note.task)
  notes: Note[];

  @ManyToOne(type => User, user => user.notes)
  user: User;
}
