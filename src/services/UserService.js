const UserRepository = require('../repository/UserRepository');

class UserService {
    async createUser(userData) {

        if (!userData.email || userData.email === '') {
            throw new Error('Email is required');
        }

        if (!userData.password || userData.password === '') {
            throw new Error('Password is required');
        }

        if (!userData.name || userData.name === '') {
            throw new Error('Name is required');
        }

        if (!userData.last_name || userData.last_name === '') {
            throw new Error('Surname is required');
        }

        userData.last_login = new Date();

        if (userData.isSuperAdmin) userData.roles = {
            user: true,
            admin: true,
            super_admin: true,
        };

        const userRegistered = await UserRepository.findByEmail(userData.email);
        if (userRegistered) {
            throw new Error('User already registered');
        }

        const user = await UserRepository.create(userData);
        return user;
    }
}

module.exports = new UserService();