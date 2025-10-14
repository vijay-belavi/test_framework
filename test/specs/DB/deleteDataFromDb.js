const mysql = require('mysql2/promise');

async function deleteUser({ userId, email }) {
  // DB connection config
  const connection = await mysql.createConnection({
    host: 'localhost',      // your DB host
    user: 'root',           // your DB username
    password: 'password',   // your DB password
    database: 'supertokens' // your DB name
  });

  try {
    await connection.beginTransaction();

    if (userId) {
      // Delete by user_id
      await connection.execute(
        `DELETE FROM passwordless_user_to_tenant WHERE user_id = ?`, [userId]
      );
      await connection.execute(
        `DELETE FROM passwordless_users WHERE user_id = ?`, [userId]
      );
      await connection.execute(
        `DELETE FROM emailpassword_user_to_tenant WHERE user_id = ?`, [userId]
      );
      await connection.execute(
        `DELETE FROM usermetadata WHERE user_id = ?`, [userId]
      );
    }

    if (email) {
      // Delete by email
      await connection.execute(
        `DELETE FROM emailpassword_user_to_tenant WHERE email = ?`, [email]
      );
      await connection.execute(
        `DELETE FROM emailpassword_users WHERE email = ?`, [email]
      );
      await connection.execute(
        `DELETE FROM usermetadata WHERE email = ?`, [email]
      );
    }

    await connection.commit();
    console.log('User data deleted successfully!');
  } catch (err) {
    await connection.rollback();
    console.error('Error deleting user data:', err);
  } finally {
    await connection.end();
  }
}

// Example usage
deleteUser({
  userId: '7067ee53-c68a-4388-98aa-59181a41fe0a',
  email: 'vijaybelavi1432@gmail.com'
}); 