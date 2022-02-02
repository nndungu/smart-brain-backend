const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "91f3bc00b33746838d872b637c7d799f",
});

const handleApiCall = (req, res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => { 
        res.json(data);
    })
    .catch(() => res.status(400).json('unable to work with api'))
}


const handleImage = (req, res, db) => { 
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(() => res.status(400).json('Unable to get entries'))
}

module.exports = {
    handleImage,
    handleApiCall
}