const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.register = async (req, res) => {
  console.log('Register endpoint hit');
  const { pseudo, password, numero_secu } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({ pseudo, password: hashedPassword, numero_secu });
    console.log('User registered:', user);
    res.status(201).send(user);
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  const { pseudo, password } = req.body;
  console.log(`Login attempt for user: ${pseudo}`);

  try {
    const user = await User.findOne({ where: { pseudo } });
    if (!user) {
      console.log('User not found');
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    console.log(`User found: ${user.pseudo}`);

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password');
      return res.status(400).send({ message: 'Invalid credentials' });
    }
    console.log('Password is valid');

    const token = jwt.sign({ id: user.id, pseudo: user.pseudo }, process.env.JWT_SECRET);
    console.log('Login successful');
    return res.header('Authorization', `Bearer ${token}`).send({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).send({ message: 'Internal server error' });
  }
};
