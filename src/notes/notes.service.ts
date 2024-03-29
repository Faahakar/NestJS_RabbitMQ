import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dtos/createNote.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';

import { InjectRepository } from '@nestjs/typeorm';
import Note from './entities/note.entity';
import { Repository } from 'typeorm';
import NoteEntity from './entities/note.entity';
import { NoteNotFoundException } from './exception/noteNotFound.exception';
import User from 'src/users/user.entity';

@Injectable()
export default class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<NoteEntity>,
  ) {}

  getAllNotes() {
    return this.notesRepository.find({ relations:['categories']});
  }

  async getNoteById(id: string) {
    const note = await this.notesRepository.findOne({ where: { id }, relations: ['author'] });
    if (note) {
      return note;
    }
    throw new NoteNotFoundException(id);
  }

  async updateNote(id: string, note: UpdateNoteDto) {
    await this.notesRepository.save(note);
    const updatedNote = await this.notesRepository.findOne({ where: { id }, relations: ['author'] });
    if (updatedNote) {
      return updatedNote;
    }
    throw new NoteNotFoundException(id);
  }

  async createNote(note: CreateNoteDto, user: User) {
    const newNote = await this.notesRepository.create({
        ... note,
        author: user
    })
    await this.notesRepository.save(newNote);
    return newNote;
  }

  async deleteNote(id: string) {
    const deleteResponse = await this.notesRepository.delete(id);
    if (!deleteResponse.affected) {
        throw new NoteNotFoundException(id);
    }
  }
}
