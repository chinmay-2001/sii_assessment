import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PermissionGuard } from 'src/permission/permission.guard';
import { Permission } from 'src/permission/permission.decorator';

@Controller('user')
@UseGuards(PermissionGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Permission('CREATE')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('CreateUserDto:', createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  @Permission('VIEW')
  findAll() {
    return this.userService.findAll();
  }

  @Patch(':id')
  @Permission('EDIT')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Permission('DELETE')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Get('managed/:id')
  @Permission('VIEW')
  managesUser(@Param('id') id: string) {
    return this.userService.findManagedUsers(+id);
  }
}
