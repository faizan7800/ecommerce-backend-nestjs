import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import type { User } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers(): User[] {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    return this.userService.findOneUser(id);
  }

  @Post()
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('age') age: number,
  ): User {
    return this.userService.createUser(name, email, age);
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body('name') name?: string,
    @Body('email') email?: string,
    @Body('age') age?: number,
  ): User {
    return this.userService.updateUser(id, name, email, age);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string): void {
    const userId = parseInt(id, 10);
    this.userService.removeUser(userId);
  }
}