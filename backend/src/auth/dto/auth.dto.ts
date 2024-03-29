import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsString()
    usuario: string;

    @ApiProperty()
    @IsString()
    password: string;
}
