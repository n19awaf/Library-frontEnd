class UserModel {
    id: number;
    firstname: string;
    lastname: string;
    password: string;
    email: string;

    constructor(id: number, firstname: string, lastname: string, password: string, email: string){
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.password = password;
        this.email = email;

    }
}

export default UserModel;