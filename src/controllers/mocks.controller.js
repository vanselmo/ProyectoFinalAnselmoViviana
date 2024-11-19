import { usersService } from '../services/index.js';
import { petsService } from '../services/index.js';
import generateMockUsers from '../utils/mockusers.js';
import generateMockPets from '../utils/mockpets.js';

export const mockUsers = async (req, res) => {
    const users = generateMockUsers(50);
    res.json(users);
};

export const generateData = async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.status(400).send({ status: 'error', error: 'Valores incompletos' });
    }

    const mockUsers = generateMockUsers(users);
    await Promise.all(mockUsers.map(user => usersService.create(user)));

    const mockPets = generateMockPets(pets);
    await Promise.all(mockPets.map(pet => petsService.create(pet)));

    res.send({ status: 'success', message: `${users} usuarios y ${pets} mascotas creados satisfactoriamente`});
};