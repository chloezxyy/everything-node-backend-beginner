const { people } = require("../data");

const getPeople = (req, res) => {
  res.status(200).json({
    success: true,
    data: people,
  });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: "Please provide name" });
  }
  res.status(201).json({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ success: false, msg: "Please provide name" });
  }
  res.status(201).json({ success: true, person: [...people, name] });
};

const updatePerson = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((p) => p.id === Number(id));

  if (!person) {
    return res.status(400).json({
      success: false,
      msg: `no person with id ${id}`,
    });
  }

  let peopleUpdate = people.map((p) => {
    if (p.id === Number(id)) {
      p.name = name;
    }
    return p;
  });

  res.status(201).json({
    success: true,
    data: peopleUpdate,
  });
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const person = people.find((person) => person.id === Number(id));

  if (!person) {
    return res.status(400).json({
      success: false,
      msg: `no person with id ${id}`,
    });
  }
  const updatedPeople = people.filter((person) => person.id !== Number(id));

  res.status(201).json({
    success: true,
    data: updatedPeople,
  });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
};
