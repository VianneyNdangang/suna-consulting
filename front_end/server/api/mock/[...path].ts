import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const DB_PATH = join(process.cwd(), 'db.json');

export default defineEventHandler(async (event) => {
  const url = event.node.req.url || '';
  const after = url.split('/api/mock/')[1] ?? '';
  const parts = after.split('/').filter(Boolean);
  const resource = parts[0];
  const id = parts[1];

  const method = event.node.req.method || 'GET';

  try {
    const raw = await readFile(DB_PATH, 'utf-8');
    const db = JSON.parse(raw);

    if (!resource) return db;
    const collection = db[resource];
    if (!collection) return createError({ statusCode: 404, statusMessage: 'Resource not found' });

    if (method === 'GET') {
      if (id) {
        const item = collection.find((x: any) => String(x.id) === String(id));
        return item ?? createError({ statusCode: 404, statusMessage: 'Not found' });
      }
      return collection;
    }

    if (method === 'POST') {
      const body = await readBody(event);
      const newItem = { ...(body || {}), id: Date.now().toString() };
      db[resource] = Array.isArray(db[resource]) ? [...db[resource], newItem] : [newItem];
      await writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
      return newItem;
    }

    if (method === 'PATCH' || method === 'PUT') {
      const body = await readBody(event);
      if (!id) return createError({ statusCode: 400, statusMessage: 'Missing id' });
      const idx = db[resource].findIndex((x: any) => String(x.id) === String(id));
      if (idx === -1) return createError({ statusCode: 404, statusMessage: 'Not found' });
      db[resource][idx] = { ...db[resource][idx], ...(body || {}) };
      await writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
      return db[resource][idx];
    }

    if (method === 'DELETE') {
      if (!id) return createError({ statusCode: 400, statusMessage: 'Missing id' });
      db[resource] = db[resource].filter((x: any) => String(x.id) !== String(id));
      await writeFile(DB_PATH, JSON.stringify(db, null, 2), 'utf-8');
      return { success: true };
    }

    return createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
  } catch (err) {
    return createError({ statusCode: 500, statusMessage: String(err) });
  }
});
