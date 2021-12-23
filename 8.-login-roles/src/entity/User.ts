import {
Entity,
PrimaryGeneratedColumn,
Column,
Unique,
CreateDateColumn,
UpdateDateColumn,
} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @MinLength(6)
    @IsEmail()
    username: string;

    @Column()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    updateAt: Date;

    hashPassword(): void {
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password, salt);
    };

    checkPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    };

}
