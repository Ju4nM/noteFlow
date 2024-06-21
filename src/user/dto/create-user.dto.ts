import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

  @IsEmail({}, { message: "El email no tiene el formato correcto" })
  email: string;

  @MinLength(8, { message: "La contraseña debe tener al menos 8 caracteres" })
  @MaxLength(255, { message: "La contraseña puede tener un maximo de 255 caracteres" })
  password: string;
}
