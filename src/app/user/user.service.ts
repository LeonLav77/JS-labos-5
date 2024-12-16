import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://angular-lkardas.europe-west1.firebasedatabase.app/users.json';

  constructor() {}
  
  // Koristim fetch API za dohvacanje, zato sto je Angular-ov HttpClient modul deprecated
    async getUsers() {
        return fetch(this.apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const users = [];
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    users.push({ ...data[key], id: key });
                }
            }

            return users;
        });
    }

    async saveUsers(user: any) {
        return fetch(this.apiUrl, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json());
    }


}
