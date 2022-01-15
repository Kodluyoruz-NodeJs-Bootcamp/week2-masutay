import { PrimaryGeneratedColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, Entity, Admin } from "typeorm";
import { Length, IsEmail, IsDate } from "class-validator";


@Entity({ name: "users" })
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50 })
    firstName: string;

    @Column({ type: "varchar", length: 50 })
    lastName: string;

    @Column({ type: "varchar", length: 50 })
    userName: string;

    @Column()
    @IsEmail()
    email: string

    @Column({ type: "varchar" })
    @Length(20)
    password: string;


    @CreateDateColumn()
    created_at: Date;

}

