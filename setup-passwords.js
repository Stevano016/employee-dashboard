const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');

async function setupPasswords() {
  // Create bcrypt hashes for test passwords
  const passwords = {
    andi: await bcrypt.hash('password123', 10),
    budi: await bcrypt.hash('password456', 10),
    citra: await bcrypt.hash('password789', 10),
    dewi: await bcrypt.hash('user123', 10),
    eko: await bcrypt.hash('user456', 10),
  };

  console.log('Generated password hashes:');
  console.log(passwords);

  // Connect to database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employee_db',
  });

  try {
    // Update passwords in database
    for (const [username, hash] of Object.entries(passwords)) {
      await connection.execute(
        'UPDATE user SET password = ? WHERE username = ?',
        [hash, username]
      );
      console.log(`Updated password for: ${username}`);
    }

    console.log('\nAll passwords updated successfully!');
    console.log('\nTest credentials:');
    console.log('  andi / password123 (admin)');
    console.log('  budi / password456 (hr)');
    console.log('  citra / password789 (karyawan)');
    console.log('  dewi / user123 (karyawan)');
    console.log('  eko / user456 (karyawan)');
  } catch (error) {
    console.error('Error updating passwords:', error);
  } finally {
    await connection.end();
  }
}

setupPasswords();
