import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsArray,
  ArrayMinSize,
  ArrayNotEmpty,
  ArrayUnique,
  IsIn,
} from 'class-validator';
import { ROLES, GROUPS } from '../../data';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsIn(ROLES, { each: true })
  roles: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsIn(GROUPS, { each: true })
  groups: string[];
}
