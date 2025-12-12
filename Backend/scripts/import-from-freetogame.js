// scripts/import-from-freetogame.js
import 'dotenv/config';
import connectDB from '../config/db.js';
import GameDAO from '../dao/GameDao.js';
import axios from 'axios';
import mongoose from 'mongoose';

const idsToImport = [452]; // pon aquí los ids que quieras

const run = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    const dao = new GameDAO();

    for (const extId of idsToImport) {
      try {
        const url = `https://www.freetogame.com/api/game?id=${encodeURIComponent(extId)}`;
        const r = await axios.get(url, { timeout: 8000 });
        const external = r.data;
        const name = (external.title || "").toString().trim();
        if (!name) {
          console.log(`${extId} -> sin título, saltando`);
          continue;
        }
        // Si external.id existe, lo guardamos en externalId
        const existing = await dao.findByName(name);
        if (existing) {
          console.log(`${extId} -> ya existe:`, existing._id.toString());
          continue;
        }
        const created = await dao.create({
          name,
          description: external.short_description || undefined,
          externalId: external.id ? String(external.id) : undefined,
          thumbnail: external.thumbnail || undefined,
          genre: external.genre || undefined,
          platform: external.platform || undefined
        });
        console.log(`${extId} -> importado:`, created._id.toString());
      } catch (e) {
        console.error(`${extId} -> error:`, e.response ? e.response.data : e.message);
      }
    }

    await mongoose.connection.close();
    console.log('Conexión cerrada');
    process.exit(0);
  } catch (err) {
    console.error('Error general:', err);
    process.exit(1);
  }
};

run();
