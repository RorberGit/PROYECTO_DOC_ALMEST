import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateDestinoDto {
    @ApiProperty()
    @IsString()
    nombre: string
}
