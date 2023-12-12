const Game = require("../models/game")

module.exports = {
    index,
    show,
    new: newGame,
    create
}

async function index(req, res) {
    try {
        const games = await Game.find({});

        for (const game of games) {
            if (game.reviews.length > 0) {
                const totalRating = game.reviews.reduce((sum, review) => sum + review.rating, 0);
                game.rating = totalRating / game.reviews.length;
                await game.save();
            }
        }
        const sortGamesRating = games.sort((a, b) => b.rating - a.rating)
        res.render("games/index", { title: "All Games", games: sortGamesRating });
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

async function show(req, res) {
    const game = await Game.findById(req.params.id)
    res.render("games/show", { title: "Game Details" , game })
}

function newGame(req, res) {
    res.render("games/new",  { title: "Add New Game", errorMsg: " " })
}

async function create(req, res) {
   for ( let key in req.body) {
    if (req.body[key] === "") delete req.body[key]
   }
   try {

    const duplicateGame = await Game.findOne({title: req.body.title })

    if(duplicateGame) {
        return res.render("games/new", {
            title: "Add New Game",
            errorMsg: "This game already exists!"
        })
    }
    const game = await Game.create(req.body)
    
    res.redirect(`games/${game._id}`)
   } catch (err) {
    console.log(err)
    res.render("/games/new", { errorMsg: err.message })
   }
}