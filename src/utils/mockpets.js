import { faker } from '@faker-js/faker';
const generateMockPets = (count = 100) => {
    const mockPets = [];
    const species = ['Cat', 'Dog', 'Bird', 'Fish', 'Reptile'];
    for (let i = 0; i < count; i++) {
        const specie = species[Math.floor(Math.random() * species.length)];
        const birthDate = new Date();
        birthDate.setFullYear(birthDate.getFullYear() - Math.floor(Math.random() * 15));
        mockPets.push({
            name: faker.person.firstName(),
            specie: specie,
            birthDate: birthDate,
            adopted: false,
            owner: null
        });
    }
    return mockPets;
};

export default generateMockPets;