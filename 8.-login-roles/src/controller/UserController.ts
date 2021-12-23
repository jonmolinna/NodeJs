import {getRepository} from "typeorm";
import { Request, Response} from "express";
import {User} from "../entity/User";
import { validate } from 'class-validator';

export class UserController {
    static getAll = async (req: Request, res: Response) => {
        const userRepository = getRepository(User);
        let users;

        try {
            users = await userRepository.find();
        } catch (error) {
            res.status(404).json({ message: 'Somenthing goes wrong!' });
        }
        
        if (users.length > 0) {
            res.send(users);
        } else {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static getById = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);

        try {
            const user = await userRepository.findOneOrFail(id);
            res.send(user);
        } catch (error) {
            res.status(404).json({ message: 'Not result' });
        }
    };

    static newUser = async (req: Request, res: Response) => {
        const { username, password, role } = req.body;
        const user = new User();

        user.username = username;
        user.password = password;
        user.role = role;

        // Validate
        const validationOpt = {validationError: { target: false, value: false }}
        const errors = await validate(user, validationOpt);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        }

        const userRepository = getRepository(User);
        try {
            user.hashPassword();
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({ message: 'Username already exist' });
        }

        // all ok
        res.send('User created');

    };

    static editUser = async (req: Request, res: Response) => {
        let user;
        const { id } = req.params;
        const { username, role } = req.body;

        const userRepository = getRepository(User);

        try {
            user = await userRepository.findOneOrFail(id);

            user.username = username;
            user.role = role;
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }

        // const errors = await validate(user, { validationError: { target: false, value: false } });
        const validationOpt = {validationError: { target: false, value: false }}
        const errors = await validate(user, validationOpt);
        // console.log('ERR ->', errors);
        if (errors.length > 0) {
            return res.status(400).json(errors);
        };

        try {
            await userRepository.save(user);
        } catch (error) {
            return res.status(409).json({ message: 'Username already in use' });
        }

        res.status(201).json({ message: 'User update' });
    };

    static deleteUser = async (req: Request, res: Response) => {
        const { id } = req.params;
        const userRepository = getRepository(User);
        let user: User;

        try {
            user = await userRepository.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Remove user
        userRepository.delete(id);
        res.status(201).json({ message: 'User deleted' });
    };

};

export default UserController;