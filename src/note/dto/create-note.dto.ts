import { MaxLength, MinLength } from "class-validator";

export class CreateNoteDto {


  @MinLength(1, { message: "El titulo es muy corto" })
  @MaxLength(255, { message: "El titulo muy largo" })
  title: string;

  @MinLength(1, { message: "El cuerpo de la nota es muy corto" })
  @MaxLength(500, { message: "El cuerpo de la nota es muy largo" })
  body: string;
}
