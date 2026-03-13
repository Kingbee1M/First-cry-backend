import { 
  Entity, 
  Column, 
  PrimaryGeneratedColumn, 
  CreateDateColumn, 
  UpdateDateColumn 
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  firstName: string;

  @Column()
  lastName: string

  @Column({ unique: true })
  email: string;

  @Column()
  password: string

  @Column({nullable: true})
  age: number;

  @Column({ unique: true, nullable: true})
  phone: string

  @Column({default: 'user'})
  role: string;

  @Column({default: false})
  logInStatus: boolean

  @Column({default: true})
  newUser: boolean

  @Column({ default: false })
  isActive: boolean;

  @Column({nullable: true})
  profilePicture: string

  @UpdateDateColumn()
  updatedAt: Date;

}