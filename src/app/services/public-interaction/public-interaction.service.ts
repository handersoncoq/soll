import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicInteractionService {

  private email: string | null = null;

  constructor() { }

  setEmail(email: string) {
    this.email = email;
  }

  getEmail(): string | null {
    return this.email;
  }

  clearEmail(){
    this.email = null;
  }
}
