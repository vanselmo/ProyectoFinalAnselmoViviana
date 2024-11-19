import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

const generateMockUsers = (quantity) => {
    const users = [];
    for (let i = 0; i < quantity; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email(firstName, lastName);
        const password = bcrypt.hashSync('coder123', 10); 
        const role = faker.helpers.arrayElement(['user', 'admin']); 
        const pets = []; 

        users.push({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            role,
            pets
        });
    }
    return users;
};

export default generateMockUsers;