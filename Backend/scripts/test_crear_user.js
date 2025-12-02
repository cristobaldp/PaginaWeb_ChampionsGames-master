// backend/scripts/test-crud.js
import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import UserDAO from '../dao/user.dao.js';
import bcrypt from 'bcrypt';

const testCRUD = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log('✅ Conectado a MongoDB\n');

    const userDAO = new UserDAO();

    // CREATE
    console.log('📝 Creando usuarios...');
    const user1 = await userDAO.create({
      username: 'jugador1',
      email: 'jugador1@test.com',
      password: await bcrypt.hash('pass123', 10)
    });
    console.log('✅ Usuario 1 creado:', user1.toJSON());

    const user2 = await userDAO.create({
      username: 'jugador2',
      email: 'jugador2@test.com',
      password: await bcrypt.hash('pass456', 10)
    });
    console.log('✅ Usuario 2 creado:', user2.toJSON());

    // READ
    console.log('\n📖 Leyendo usuario por ID...');
    const foundUser = await userDAO.findById(user1._id);
    console.log('✅ Usuario encontrado:', foundUser.toJSON());

    // UPDATE
    console.log('\n✏️ Actualizando usuario...');
    const updated = await userDAO.updatePartial(user1._id, {
      username: 'jugador1_pro'
    });
    console.log('✅ Usuario actualizado:', updated.toJSON());

    // LIST ALL
    console.log('\n📋 Listando todos los usuarios...');
    const allUsers = await userDAO.findAll();
    console.log(`✅ Total: ${allUsers.length} usuarios`);
    allUsers.forEach((user, index) => {
      console.log(`  ${index + 1}.`, user.toJSON());
    });

    // DELETE
    console.log('\n🗑️ Eliminando usuario 2...');
    const deleted = await userDAO.delete(user2._id);
    console.log('✅ Usuario eliminado:', deleted);

    await mongoose.connection.close();
    console.log('\n✅ Conexión cerrada');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

testCRUD();