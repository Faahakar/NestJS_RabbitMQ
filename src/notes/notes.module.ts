import { Module } from '@nestjs/common';
import NotesController from './notes.controller';
import Note from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import NotesService from './notes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Note])],
  controllers: [NotesController],
  providers: [NotesService],
})
export class NotesModule {}
