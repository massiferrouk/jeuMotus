const bcrypt = require('bcrypt');

const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(`Original: ${password}`);
  console.log(`Hashed: ${hashedPassword}`);
};

// Remplacez 'massi123' par le mot de passe que vous souhaitez hacher
generateHash('massi123');
