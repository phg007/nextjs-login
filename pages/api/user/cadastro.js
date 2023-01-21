import { cadastro } from "../../../services/user";

export default function handler (reg, res ){
    try{

        const newUser  = cadastro(reg.body);
        res.status(201).json(newUser)
    } catch (err){
        res.status(400).json(err.message)
    }
}