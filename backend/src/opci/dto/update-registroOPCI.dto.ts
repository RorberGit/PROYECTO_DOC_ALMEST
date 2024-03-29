import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroOPCIDto } from './create-registroOPCI.dto';

export class UpdateRegistroOPCIDto extends PartialType(CreateRegistroOPCIDto) {}
