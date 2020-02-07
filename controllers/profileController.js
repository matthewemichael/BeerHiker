const db = require("../models/User");

module.exports = {
  updateSearches: function(req, res) {
    db
      .findOneAndUpdate({ _id: req.params.id }, {search: req.body})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findUserSearch: function(req, res) {
    db
      .findOne({_id: req.params.id})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateMaps: function(req, res) {
    db
      .findOneAndUpdate({ _id: req.params.id }, {mapBreweries: req.body})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateSaved: function(req, res) {
    db
      .findOneAndUpdate({ _id: req.params.id }, {savedBreweries: req.body})
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db
      .update({ _id: req.params.id }, {$pull: {savedBreweries: {id: req.body.id}}})
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  
};
