import { Injectable } from '@angular/core';
import { UserService } from './user/user.service';

interface User {
    id: string;
    username: string;
    password: string;
    email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private userService: UserService
  ) {}

  async login(username: string, password: string) {

      const users = await this.userService.getUsers(); 

      if (!users) {
        throw new Error('No users found'); 
      }
    
      const usersArray = Object.values(users) as User[];
    
      const user = usersArray.find(
        (user) => user.username === username && user.password === password
      );
    
      if (user) {
        return user;
      } else {
        throw new Error('Invalid username or password');
      }

  }

  async register(username: string, password: string, email: string, name: string) {
    const users = await this.userService.getUsers();

    if (!users) {
      throw new Error('No users found'); 
    }

    const usersArray = Object.values(users);

    const userExists = usersArray.some(
      (user: any) => user.username === username
    );

    if (userExists) {
      throw new Error('User already exists');
    }

    const newUser = {
      username,
      password,
      email,
      name,
      id: '',
    };

    usersArray.push(newUser);

    return this.userService.saveUsers(newUser).then((response) => {
      newUser.id = response.name;

      return newUser;
    });
  }

  logout() {
    localStorage.removeItem('user');
  }


}
