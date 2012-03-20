var _ = require('underscore')
  , createPane = require('./pane').createPane;

module.exports.createYindow = function(options) {

  options = _.extend({}, options);

  var panes = []
    , container = {
      orientation: 'h',
      items: []
    }
    , self = {
      container: container,
      name: options.name
    };

  Object.defineProperty(self, 'panes', { value: panes });

  function addPane(container, pane) {
    Object.defineProperty(pane, 'yindow', { value: self });
    Object.defineProperty(pane, 'container', { value: container, writable: true });
    pane.index = panes.length;
    panes.push(pane);
    container.items.push(pane);
  }

  function find(container, index) {
    var i
      , item
      , foundPane;
    if (Array.isArray(container.items)) {
      for (i = 0; i < container.items.length; i++) {
        item = container.items[i];
        foundPane = false;
        if (item.hasOwnProperty('orientation')) {
          foundPane = find(item, index);
        }
        if (foundPane) {
          return foundPane;
        }
        if (item.index === index) {
          return item;
        }
      }
    }
    return false;
  }

  function split(type, index, newPane) {
      var currentIndex
      , pane = find(container, parseInt(index, 10));

    if (pane.container.items.length === 1) {
      addPane(pane.container, createPane(newPane));
      pane.container.orientation = type;
    } else {
      currentIndex = pane.container.items.indexOf(pane);

      // Remove from the container and replace with new container
      pane.container.items.splice(currentIndex, 1);

      var newContainer = {
          orientation: type,
          items: []
        };

      newContainer.items.push(pane);

      if (currentIndex === 0) {
        pane.container.items.unshift(newContainer);
      } else {
        pane.container.items.push(newContainer);
      }

      pane.container = newContainer;

      addPane(newContainer, createPane(newPane));
    }
  }

  function hsplit(index, newPane) {
    split('h', index, newPane);
  }

  function vsplit(index, newPane) {
    split('v', index, newPane);
  }

  addPane(container, createPane());

  Object.defineProperty(self, 'hsplit', { value: hsplit });
  Object.defineProperty(self, 'vsplit', { value: vsplit });
  Object.defineProperty(self, 'find', { value: find.bind(self, container) });
  return self;
};