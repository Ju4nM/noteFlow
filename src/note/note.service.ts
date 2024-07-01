import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class NoteService {
  
  constructor (
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    private userService: UserService
  ) {}

  async create(createNoteDto: CreateNoteDto, userId: string): Promise<Note> {
    const user: User = await this.userService.findOne(userId);
    const newNote: Note = this.noteRepository.create({ ...createNoteDto, user });

    const noteCreated: Note = await this.noteRepository.save(newNote);
    delete noteCreated.user;
    return noteCreated;
  }

  async findAll(userId: string): Promise<Note[]> {
    const notes: Note[] = await this.noteRepository.find({
      where: {
        user: {
          id: userId
        }
      }
    });

    return notes;
  }

  async findOne(noteId: string, userId: string): Promise<Note> {
    const note: Note = await this.noteRepository.findOne({
      where: {
        id: noteId,
        user: {
          id: userId
        }
      }
    })

    if (!note) throw new HttpException("No se encontro la nota", HttpStatus.NOT_FOUND);

    return note;
  }

  async update(noteId: string, updateNoteDto: UpdateNoteDto, userId: string): Promise<Note> {
    const target: Note = await this.findOne(noteId, userId);
    const noteUpdated = this.noteRepository.merge(target, updateNoteDto);

    return await this.noteRepository.save(noteUpdated);
  }

  async remove(noteId: string, userId: string): Promise<Note> {
    const target: Note = await this.findOne(noteId, userId);
    await this.noteRepository.remove(target);

    return target;
  }
}
