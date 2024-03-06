import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dtos/createNote.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';

import { InjectRepository } from '@nestjs/typeorm';
import Note from './entities/note.entity';
import { Repository } from 'typeorm';
import NoteEntity from './entities/note.entity';
import { NoteNotFoundException } from './exception/noteNotFound.exception';

@Injectable()
export default class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<NoteEntity>,
  ) {}

  getAllNotes() {
    return this.notesRepository.find();
  }

  async getNoteById(id: number) {
    const note = await this.notesRepository.findOne({ where: { id } });
    if (note) {
      return note;
    }
    throw new NoteNotFoundException(id);
  }

  async updateNote(id: number, note: UpdateNoteDto) {
    await this.notesRepository.update(id, note);
    const updatedNote = await this.notesRepository.findOne({ where: { id } });
    if (updatedNote) {
      return updatedNote;
    }
    throw new NoteNotFoundException(id);
  }

  async createNote(note: CreateNoteDto) {
    const newNote = await this.notesRepository.create(note);
    await this.notesRepository.save(newNote);
    return newNote;
  }

  async deleteNote(id: number) {
    const deleteResponse = await this.notesRepository.delete(id);
    if (!deleteResponse.affected) {
        throw new NoteNotFoundException(id);
    }
  }
}
