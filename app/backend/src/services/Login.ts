import * as bcrypt from 'bcryptjs';
import Users from '../database/models/Users';

export default class LoginService {
  public static async login(email: string, password: string) {
    const user = await Users.findOne({ where: { email } });
    if (!user) return null;

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) return null;

    const { id, username, role } = user;
    return { id, username, role, email };
  }
}