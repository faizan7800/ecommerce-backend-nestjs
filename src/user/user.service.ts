import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  ];
  private nextId = 3;

  createUser(name: string, email: string, age: number): User {
    const newUser: User = {
      id: this.nextId++,
      name,
      email,
      age,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAllUsers(): User[] {
    return this.users;
  }

  findOneUser(id: number): User {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  updateUser(id: number, name?: string, email?: string, age?: number): User {
    const user = this.findOneUser(id);
    
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (age !== undefined) user.age = age;
    
    return user;
  }

  removeUser(id: number): void {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users.splice(index, 1);
  }
}