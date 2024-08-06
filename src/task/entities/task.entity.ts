import { Note } from "src/note/entities/note.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string 

  @Column({ default: false })
  isCompleted: boolean;

  @CreateDateColumn()
  createdAt: Date;
  
  @OneToMany(type => Note, note => note.task, { nullable: true })
  notes?: Note[];

  @ManyToOne(type => User, user => user.tasks)
  user: User;
}
