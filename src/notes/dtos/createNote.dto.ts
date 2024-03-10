import Category from "src/categories/category.entity";

export class CreateNoteDto {
    note: string;
    title: string;
    categories: Category[];
}
  