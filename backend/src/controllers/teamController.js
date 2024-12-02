const Team = require("../models/Teams")

const AddTeam = async(req, res) =>{
    try{
        const team = new Team(req.body);
        const savedTeam = await team.save();
        res.status(201).json(savedTeam);

    }catch (error) {
        res.status(500).send({ message: "Error creating Team" });
        console.log(error);
      }
}


module.exports = { AddTeam };