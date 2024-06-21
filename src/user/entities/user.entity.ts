import { Note } from "src/note/entities/note.entity";
import { Task } from "src/task/entities/task.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(type => Note, note => note.user)
  notes: Note[];

  @OneToMany(type => Task, note => note.user)
  tasks: Task[];
}
