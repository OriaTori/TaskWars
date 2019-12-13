const express = require('express');
const router = express.Router();
const { validateCharacter } = require('../models/character');

//Creating new character [working]
router.post('/', async (req, res) => {
  const Character = res.locals.models.character;

  const { error } = validateCharacter(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let character = new Character(req.body);
  await character.save();
  res.send(character);
});

//Searching character by ID [working]
router.get('/:id', async (req, res) => {
  const Character = res.locals.models.character;
  
  const character = await Character.findById(req.params.id);
  if (!character) res.status(404).send(`Character with id ${req.params.id} not found`);
  res.send(character);
});

//Level update [working]
router.put('/:id/level', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id)
  .then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else { 
      Character.findByIdAndUpdate(req.params.id,
        {
          level: req.body.level,
        },{ new: true })
        .then(r => {
          res.send("Level updated!");
        },
        err => {
          res.status(403).send("Bad request!");
        },
      );
    }
  });
});

//[working]
router.put('/:id/health', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id)
  .then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else { 
      Character.findByIdAndUpdate(req.params.id,
        {
          health: req.body.health,
        },{ new: true })
        .then(r => {
          res.send("Health updated!");
        },
        err => {
          res.status(403).send("Bad request!");
        },
      );
    }
  });
});

//[working]
router.put('/:id/exp_points', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id)
  .then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else { 
      Character.findByIdAndUpdate(req.params.id,
        {
          exp_points: req.body.exp_points,
        },{ new: true })
        .then(r => {
          res.send("Experience points updated!");
        },
        err => {
          res.status(403).send("Bad request!");
        },
      );
    }
  });
});

//[working]
router.put('/:id/physical_power', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id)
  .then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else { 
      Character.findByIdAndUpdate(req.params.id,
        {
          physical_power: req.body.physical_power,
        },{ new: true })
        .then(r => {
          res.send("Physical power updated!");
        },
        err => {
          res.status(403).send("Bad request!");
        },
      );
    }
  });
});

//[working]
router.put('/:id/magical_power', (req, res) => {
  const Character = res.locals.models.character;
  getCharacters(Character, req.params.id)
  .then(result => {
    if (!result) {
      res.status(404).send(`Character with this id: ${req.params.id} not found`);
    } else { 
      Character.findByIdAndUpdate(req.params.id,
        {
          magical_power: req.body.magical_power,
        },{ new: true })
        .then(r => {
          res.send("Magical power updated!");
        },
        err => {
          res.status(403).send("Bad request!");
        },
      );
    }
  });
});


async function getCharacters(Character, id) {
  if (id) {
    return await Character.find({ _id: id })
    .then(result => {
      return result[0];
    },
    err => console.log('Error', err)
    );
  } else {
    return await Character.find()
    .then(result => {
      return result;
    },
    err => console.log('Error', err),
    );
  }
}

// router.put('/:id/level', async (req, res) => {
//     const Character = res.locals.models.character;

//     const { error } = validateCharacter(req.body);
//     console.log(req.body.level);
//     console.log(typeof(req.body.level));
//     if (error) return res.status(400).send(error.details[0].message);
//     console.log(error);
//     const character = await Character.findByIdAndUpdate(req.params.id, {level : req.body.level}, {new: true});
//     if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
//     res.send(character);
// });

// router.put('/:id/health', async (req, res) => {
//     const Character = res.locals.models.character;

//     const { error } = validateCharacter(req.body.health);
//     if (error) return res.status(400).send(error.details[0].message);

//     const character = await Character.findByIdAndUpdate(req.params.id, {health: req.body.health}, {new: true});
//     if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
//     res.send(character);
// });

// router.put('/:id/exp_points', async (req, res) => {
//     const Character = res.locals.models.character;

//     const { error } = validateCharacter(req.body.exp_points);
//     if (error) return res.status(400).send(error.details[0].message);

//     const character = await Character.findByIdAndUpdate(req.params.id, {exp_points: req.body.exp_points}, {new: true});
//     if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
//     res.send(character);
// });

// router.put('/:id/physical_power', async (req, res) => {
//     const Character = res.locals.models.character;

//     const { error } = validateCharacter(req.body.physical_power);
//     if (error) return res.status(400).send(error.details[0].message);

//     const character = await Character.findByIdAndUpdate(req.params.id, {physical_power: req.body.physical_power}, {new: true});
//     if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
//     res.send(character);
// });

// router.put('/:id/magical_power', async (req, res) => {
//     const Character = res.locals.models.character;

//     const { error } = validateCharacter(req.body.magical_power);
//     if (error) return res.status(400).send(error.details[0].message);

//     const character = await Character.findByIdAndUpdate(req.params.id, {magical_power: req.body.magical_power}, {new: true});
//     if(!character) return res.status(404).send(`Character with id ${req.params.id} not found`);
//     res.send(character);
// });

module.exports = router;