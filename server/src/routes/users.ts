import express from 'express';
import mysql from '../mysql';
import jwt from 'jsonwebtoken';

const router = express.Router();

interface DecodedJWT {
  id: number;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

router.get('/', (req, res) => {
  const token = req.body.token;
  const query = `SELECT * FROM users`;

  if (token) {
    const verify = jwt.verify(token, 'cafezal', {}, (err, decoded) => {
      if (err) {
        return res.status(401).send({ error: 'Authentication failed' });
      } else {
        const parsedDecoded = decoded as DecodedJWT;
        if (parsedDecoded.role === 'admin') {
          mysql.getConnection((error, conn) => {
            conn.query(query, (err, rows) => {
              conn.release();

              if (err) {
                return res
                  .status(500)
                  .send({ error: 'Someting Wrong! ' + error });
              }
              return res.status(200).send(rows);
            });
          });
        } else {
          return res.status(403).send({ error: 'Permision denied!' });
        }
      }
      return decoded;
    });

    return verify;
  } else {
    return res.status(500).send({ error: 'Someting Wrong!' });
  }
});

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  mysql.getConnection((error, conn) => {
    const query = `SELECT * FROM users WHERE email = ?`;

    if (error) {
      return res.status(500).send({ error: 'Failed to acess' + error });
    } else {
      conn.query(query, [email], (err, result) => {
        conn.release();

        if (err || result.length < 1) {
          return res.status(401).send({ error: 'Authentication failed' });
        } else if (password === result[0].password) {
          const token = jwt.sign(
            {
              id: result[0].id,
              email: result[0].email,
              role: result[0].role,
            },
            'cafezal',
            {
              expiresIn: '1h',
            },
          );
          return res
            .status(200)
            .send({ message: 'Authenticated successfully', token: token });
        } else {
          return res.status(401).send({ error: 'Authentication failed' });
        }
      });
      return conn;
    }
  });
});

router.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  mysql.getConnection((error, conn) => {
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    if (error) {
      return res.status(500).send({ error: 'Failed to acess' + error });
    } else {
      conn.query(query, [name, `${email}@cafezal.com`, password], (err) => {
        conn.release();

        if (err) {
          return res.status(500).send({ error: 'Someting Wrong! ' + error });
        }
        return res
          .status(200)
          .send({ message: 'User registered successfully' });
      });

      return conn;
    }
  });
});

export default router;
