import { MaxLength, MinLength } from "class-validator";

export class CreateTaskDto {

  @MinLength(1, { message: "El nombre de la tarea es muy corto" })
  @MaxLength(255, { message: "El nombre de la tarea es muy largo" })
  name: string;
}
