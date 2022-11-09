const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


router.post('/', async (req, res) => {
    try {
      const {text, id} = req.body;
      const todo = await new Todo({
        owner: id,
        text: text
      });
      await todo.save()
      res.status(201).send(todo)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
  });

router.get('/', async (req, res) => {
    try{
      const { id } = req.query
      const data = await Todo.find({owner: id});
      res.send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  });

router.patch('/done/:id', async (req, res) => {
    try{
      const id = req.params.id;
      const ownerId = req.body.id;
      const new_value = req.body.done;
      const todo = await Todo.findByIdAndUpdate(id, {done: new_value, owner: ownerId});
      res.status(200).send(todo);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
  })

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const ownerId = req.params.ownerId;
        const todo = await Todo.findByIdAndDelete(id, {owner: ownerId});
        res.send(`${todo.text} has been deleted..`);
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.patch('/update/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const new_value = req.body.value;
        const ownerId = req.body.id;
        const todo = await Todo.findByIdAndUpdate(id, {text: new_value, owner: ownerId});
        res.status(200).send(`Updated ${todo.text}`);
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

module.exports = router;