import { v4 as newId } from 'uuid';

const users = [
    {
        id: '1',
        email: 'npurty2345@gmail.com',
        password: 'Kpm@l34'
    }
];

class User {
    constructor(email, password) {
        this.id = newId();
        this.email = email;
        this.password = password;
    }

    static getUser = () => {
        return users
    };

    static getUserById = (id) => {
        return users.find((user) => user.id === id)
    }
    addUser = () => {
        users.push(this)
    }


}

export default User; 
