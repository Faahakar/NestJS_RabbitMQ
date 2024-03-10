import Category from "src/categories/category.entity";

export class UpdateNoteDto {
    id: string;
    note: string;
    title: string;
    categories: Category[];
  }
  