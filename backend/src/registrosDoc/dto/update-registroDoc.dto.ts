import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroDocDto } from './create-registroDoc.dto';

export class UpdateRegistroDocDto extends PartialType(CreateRegistroDocDto) {}
