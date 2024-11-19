import User from "../src/dao/Users.dao.js";
import Pet from "../src/dao/Pets.dao.js";
import Adoption from "../src/dao/Adoption.js";
import assert from "assert";
import { database, mongoose } from '../src/utils/database.js';

before(async function () {
    await database();
});

/* TESTING DAO ADOPTIONS */
describe('Testing de Dao Adoptions', function () {
    before(async function () {
        this.adoptionsDao = new Adoption();
        this.usersDao = new User();
        this.petsDao = new Pet();

        this.user = await this.usersDao.save({
            first_name: "John",
            last_name: "Doe",
            email: "john.doe-testing@example.com",
            password: "1234567"
        });

        this.pet = await this.petsDao.save({
            name: "Luna-testing",
            specie: "Perro",
            birthDate: new Date("2022-01-01"),
            adopted: false,
            owner: this.user._id
        });
    });

    this.beforeEach(async function () {
        const collections = mongoose.connection.collections;
        if (collections.adoptions) {
            await collections.adoptions.drop();
        }
    })

    it('Se espera que GET devuelva un array con todas las adopciones', async function () {
        const result = await this.adoptionsDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it('Se espera que el DAO cree una nueva adopción', async function () {
        const adoption = {
            owner: this.user._id,
            pet: this.pet._id
        };

        const result = await this.adoptionsDao.save(adoption);
        assert.ok(result._id);
        assert.strictEqual(result.owner.toString(), adoption.owner.toString());
        assert.strictEqual(result.pet.toString(), adoption.pet.toString());
    });

    it('Se espera que el DAO obtenga una adopción por su ID', async function () {
        const adoption = await this.adoptionsDao.save({
            owner: this.user._id,
            pet: this.pet._id
        });

        const result = await this.adoptionsDao.getBy({ _id: adoption._id });
        assert.strictEqual(result._id.toString(), adoption._id.toString());
    });

    after(async function () {
        await this.usersDao.delete(this.user._id);
        await this.petsDao.delete(this.pet._id);
    });

});

/* TESTING DAO USERS */
describe('Testing de Dao Users', function () {
    before(function () {
        this.usersDao = new User();
        this.createdUsers = [];
    });

    it('Se espera que el GET de usuarios devuelva un array con todos los usuarios', async function () {
        const result = await this.usersDao.get();
        assert.strictEqual(Array.isArray(result), true);
    });

    it('Se espera que el DAO agregue un nuevo usuario a la base de datos', async function () {
        let user = {
            first_name: "Pepe",
            last_name: "Argento",
            email: "pepe.argento@example.com",
            password: "123456"
        };
        const result = await this.usersDao.save(user);
        assert.ok(result._id);
        this.createdUsers.push(result._id); 
    });

    it('Se espera que el nuevo usuario tenga un array de mascotas vacío', async function () {
        let user = {
            first_name: "Moni",
            last_name: "Argento",
            email: "moni.argento@example.com",
            password: "1234567"
        };

        const result = await this.usersDao.save(user);
        assert.deepStrictEqual(result.pets, []);
        this.createdUsers.push(result._id);
    });

    it('Se espera que el DAO obtenga un usuario por su email', async function () {
        let user = {
            first_name: "Paola",
            last_name: "Argento",
            email: "paola.argento@example.com",
            password: "123456"
        };

        const savedUser = await this.usersDao.save(user);
        this.createdUsers.push(savedUser._id); 

        const result = await this.usersDao.getBy({ email: user.email });
        assert.strictEqual(typeof result, "object");
        assert.strictEqual(result.email, user.email);
    });

    after(async function () {
        for (const userId of this.createdUsers) {
            await this.usersDao.delete(userId);
        }
    });
});

after(async function () {
    await mongoose.disconnect();
});