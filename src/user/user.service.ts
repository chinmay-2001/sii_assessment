import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USERS } from '../data';

@Injectable()
export class UserService {
  private users = USERS;
  create(createUserDto: CreateUserDto) {
    const newId = Math.max(...this.users.map((u) => u.id)) + 1;
    const user = { id: newId, ...createUserDto };
    this.users.push(user);
    return user;
  }

  findAll() {
    return [...this.users];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    this.users[idx] = { ...this.users[idx], ...updateUserDto };
    return this.users[idx];
  }

  remove(id: number) {
    const idx = this.users.findIndex((u) => u.id === id);
    if (idx === -1) throw new NotFoundException('User not found');
    const removed = this.users.splice(idx, 1)[0];
    return removed;
  }
  findManagedUsers(id: number) {
    const manager = this.users.find((u) => u.id === id);
    if (!manager) throw new NotFoundException('Manager not found');
    if (!manager.roles.includes('ADMIN')) return [];
    const managerGroups = new Set(manager.groups);
    return this.users.filter(
      (u) => u.id !== id && u.groups.some((g) => managerGroups.has(g)),
    );
  }
  findOne(id: number) {
    return this.users.find((u) => u.id === id);
  }
}
