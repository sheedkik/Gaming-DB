const Game = require('../models/game');
const games = require('./games');
const User = require('../models/user')

module.exports = {
  create,
  delete: deleteReview
};

async function create(req, res) {
  const game = await Game.findById(req.params.gameId);

  req.body.user = req.user._id
  req.body.userName = req.user.user
  req.body.userAvatar = req.user.avatar

  game.reviews.push(req.body);
  try {
    await game.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/games/${game._id}`);
}

async function deleteReview(req, res) {
    console.log(req)
    const game = await Game.findOne({ "reviews._id" : req.params.gameId, "reviews.user" : req.user._id})
    console.log("req params id:", req.params.gameId)
    console.log("req user id:", req.user._id)
    if (!game) return res.redirect("/games")
    game.reviews.remove(req.params.gameId)
    await game.save()
    res.redirect(`/games/${game._id}`)
}