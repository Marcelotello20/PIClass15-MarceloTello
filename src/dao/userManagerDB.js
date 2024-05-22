import userModel from "./models/userModel.js";
import { isValidPassword } from "../utils/cryptoUtil.js";

class userManagerDB {
    // Función para obtener todos los mensajes
    async getAllUsers() {
        try {
            return await userModel.find().lean();
        } catch (error) {
            console.error("Error al obtener los usuarios:", error);
            throw new Error("Error al obtener los usuarios");
        }
    }

    async getUser(uid) {
        try {
            return await userModel.findOne({_id: uid}).lean();
        } catch (error) {
            console.error(error.message);
            throw new Error(`Error al consular el usuario con id ${uid}`)
        }
    }

    async register(user) {
        const { first_name, last_name, email, age, password } = user;

        if (!first_name || !last_name || !email || !age || !password) {
            throw new Error('Error al registrar usuario');
        }

        try {
            await userModel.create({ first_name, last_name, email, age, password });
            return "Usuario registrado correctamente"
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async login(email, password) {
        const errorMessage = 'Credenciales inválidas'

        if (!email || !password ) {
            throw new Error(errorMessage);
        }

        try {
            const user = await userModel.findOne({ email });
            
            if (!user) throw new Error(errorMessage);
            
            if (isValidPassword(user, password)) {
                return user;
            }

            return "Usuario logeado correctamente"
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

}

export default userManagerDB;