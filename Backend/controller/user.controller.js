import UserDAO from "../repo/userDAO.js";
import bcrypt from "bcrypt";

const userDAO = new UserDAO();

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Faltan datos" });
        }
        if (password.length < 6) {
            return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
        }
        if (!email.includes("@")) {
            return res.status(400).json({ error: "El email debe tener al menos un @" });
        }
        if (!username.trim().length) {
            return res.status(400).json({ error: "El username debe tener al menos un caracter" });
        }
        if (!email.trim().length) {
            return res.status(400).json({ error: "El email debe tener al menos un caracter" });
        }
        if (!password.trim().length) {
            return res.status(400).json({ error: "La contraseña debe tener al menos un caracter" });
        }
        const existingUser = await userDAO.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "El email ya existe" });
        }
        const existingUsername = await userDAO.findByUsername(username);
        if (existingUsername) {
            return res.status(400).json({ error: "El username ya existe" });
        }
        const existingEmail = await userDAO.findByEmail(email);
        if (existingEmail) {
            return res.status(400).json({ error: "El email ya existe" });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userDAO.create({ username, 
                                            email, 
                                            password: hashedPassword });

        res.status(201).json({
            message: "Usuario creado correctamente",
            user
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userDAO.findAll();
        res.status(200).json(users);
        count: users.length;
        users: users.map(user => user.toJSON());
    } catch (error) {

        console.error("Error al obtener todos los usuarios:", error);
        res.status(500).json({ error: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = await userDAO.findById(id);
        if (!user) {
            
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({user: user.toJSON()});

    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        res.status(500).json({ error: error.message });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }        
        const updatedUser = await userDAO.update(id, updates);

        if (!updatedUser) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            user: updatedUser.toJSON()
        });
    } catch (error) {
        console.error("Error al actualizar el usuario:", error);
        res.status(500).json({ error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await userDAO.delete(req.params.id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.status(200).json({
            message: 'Usuario eliminado exitosamente',
            user: user.toJSON()
          });
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        res.status(500).json({ error: error.message });
    }
}
