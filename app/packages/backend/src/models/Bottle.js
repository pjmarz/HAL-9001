const db = require('../database/db');

class Bottle {
  static create(bottleData) {
    return new Promise((resolve, reject) => {
      const { name, maker, abv, msrp, image_url } = bottleData;
      
      const sql = `
        INSERT INTO bottles (name, maker, abv, msrp, image_url)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      db.run(sql, [name, maker, abv, msrp, image_url || null], function(err) {
        if (err) {
          reject(err);
        } else {
          // Return the created bottle with its ID
          Bottle.getById(this.lastID)
            .then(resolve)
            .catch(reject);
        }
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM bottles WHERE id = ?';
      
      db.get(sql, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (!row) {
          reject(new Error('Bottle not found'));
        } else {
          resolve(row);
        }
      });
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM bottles ORDER BY created_at DESC';
      
      db.all(sql, [], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows || []);
        }
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      // First check if bottle exists
      Bottle.getById(id)
        .then(() => {
          const sql = 'DELETE FROM bottles WHERE id = ?';
          
          db.run(sql, [id], function(err) {
            if (err) {
              reject(err);
            } else {
              resolve({ id, deleted: true });
            }
          });
        })
        .catch(reject);
    });
  }
}

module.exports = Bottle;

