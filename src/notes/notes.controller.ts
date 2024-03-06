import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import NotesService from './notes.service';
  import { CreateNoteDto } from './dtos/createNote.dto';
  import { UpdateNoteDto } from './dtos/updateNote.dto';
  import JwtAuthenticationGuard from 'src/authentication/jwtAuthentication.guard';
import RequestWithUser from 'src/authentication/requestWithUser.interface';
  
  @Controller('notes')
  export default class NotesController {
    constructor(private readonly notesService: NotesService) {}
  
    @Get()
    @UseGuards(JwtAuthenticationGuard)
    getAllNotes() {
      return this.notesService.getAllNotes();
    }
  
    @Get(':id')
    getNoteById(@Param('id') id: string) {
      return this.notesService.getNoteById(Number(id));
    }
  
    @Post()
    @UseGuards(JwtAuthenticationGuard)
    async createNote(@Body() note: CreateNoteDto, @Req() req: RequestWithUser) {
      return this.notesService.createNote(note,req.user);
    }
  
    @Put(':id')
    async replaceNote(@Body() note: UpdateNoteDto, @Param('id') id: string) {
      return this.notesService.updateNote(Number(id), note);
    }
  
    @Delete(':id')
    async deleteNote(@Param('id') id: string) {
      this.notesService.deleteNote(Number(id));
    }
  }
  