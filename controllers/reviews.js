const Game = require('../models/game');

module.exports = {
  create
};

async function create(req, res) {
  const game = await Game.findById(req.params.id);
  game.reviews.push(req.body);
  try {
    await game.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/games/${game._id}`);
}