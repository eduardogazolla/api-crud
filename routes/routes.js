const express = require('express');
const bodyParser = require('body-parser');
const Pessoa = require('../models/Pessoa'); 

const router = express.Router();
router.use(bodyParser.json());

// Criar Pessoa
router.post('/pessoas', async (req, res) => {
  try {
    const pessoa = await Pessoa.create(req.body);
    res.json(pessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obter todas as Pessoas
router.get('/', async (req, res) => {
  try {
    const pessoas = await Pessoa.findAll();
    res.json(pessoas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obter Pessoa por CPF
router.get('/pessoas/:cpf', async (req, res) => {
  try {
    
    const pessoa = await Pessoa.findOne({ where: { cpf: req.params.cpf } });
    if (pessoa) {
      res.json(pessoa);
    } else {
      res.status(404).json({ error: 'Pessoa not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;