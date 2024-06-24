import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { NoteService } from './note.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Request } from 'express';

@Controller('note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @Req() req: Request): Promise<Note> {
    const { userId } = req.user as any;
    return await this.noteService.create(createNoteDto, userId);
  }

  @Get()
  async findAll(@Req() req: Request): Promise<Note[]> {
    const { userId } = req.user as any;
    return await this.noteService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: Request): Promise<Note> {
    const { userId } = req.user as any;
    return await this.noteService.findOne(id, userId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @Req() req: Request): Promise<Note> {
  const { userId } = req.user as any;
    return await this.noteService.update(id, updateNoteDto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request): Promise<Note> {
    const { userId } = req.user as any;
    return await this.noteService.remove(id, userId);
  }
}
