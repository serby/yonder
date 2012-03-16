var _ = require('underscore')
  , createPane = require('./pane').createPane;

module.exports.createYindow = function(options) {

  options = _.extend({}, options);

  var panes = []
    , self = {
      panes: panes,
      name: options.name
    };

  function addPane(pane) {
    pane.index = panes.length;
    panes.push(pane);
  }

  addPane(createPane());

  return self;
};