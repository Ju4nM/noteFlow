import { Task } from "src/task/entities/task.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(type => Task, task => task.notes, { nullable: true})
  task?: Task;

  @ManyToOne(type => User, user => user.notes)
  user: User;
}
