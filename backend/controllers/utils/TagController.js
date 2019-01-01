let tags = [
    "Movie",
    "Music",
    "Jazz",
    "Biennieal",
    "Theater",
    "Exhibition",
    "Modern Art",
    "Art Movie",
    "Photography",
    "Travel",
    "Festival",
    "Museum",
    "Workshop",
    "Ballet",
    "Dance",
    "Classical Music",
    "Opera",
    "Blues",
    "Turkish Folk Music",
    "Concert"
];

function getTags(req,res,next) {
    res.status(200);
    res.send({tags: tags})
}

module.exports = {
    getTags
};
