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
import { MODIFIED_ROLES, GROUPS } from '../../data';

const ROLE_CODES = MODIFIED_ROLES.map((r) => r.code);

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'roles must contain at least one item' })
  @ArrayUnique()
  @IsIn(ROLE_CODES, { each: true })
  roles: string[];

  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1, { message: 'groups must contain at least one item' })
  @ArrayUnique()
  @IsIn(GROUPS, { each: true })
  groups: string[];
}
