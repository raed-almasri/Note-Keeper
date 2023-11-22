 
import { author } from '../models/index.js';
import { enumGender } from './enums.js';

 
export default async () => {
     // //! create admin account
    await author.create({
        name: 'admin',
        gender: enumGender.MALE,
        email: 'raed.almasri.it@gmail.com',
        phoneNumber: '0988720553',
        username: 'admin',
        password: 'qwe123QWE!@#',
    
       });


}