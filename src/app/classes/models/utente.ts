export class Utente {
  username: string;
  password: string;
  email: string;
  squadra: string;


  constructor(
    username: string,
    password: string,
    email: string,
    squadra: string
  ) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.squadra = squadra;
  }
}
