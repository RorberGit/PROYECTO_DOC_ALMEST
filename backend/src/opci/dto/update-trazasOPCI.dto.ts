import { PartialType } from '@nestjs/mapped-types';
import { CreateTrazasOPCIDto } from './create-trazasOPCI.dto';

export class UpdateTrazasOPCIDto extends PartialType(CreateTrazasOPCIDto) {}
