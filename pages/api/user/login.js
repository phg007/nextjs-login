import { login } from "../../../services/user";

export default function handler(reg, res) {
 
  try {
    const user = login(reg.body);
    res.status(200).json(user);
  } catch (err) {
    res.status(300).json(err.message);
    
  }
}
