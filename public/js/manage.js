$(function() {
  var _ = window._
    , log = function() { console.log(arguments); }
    , $el = $('#app')
    , $list = $('<ul id="yindow-list">')
    , socket = window.io.connect(document.location.origin)
    , yindowViews = {};

  function init() {
    $el.append($list);
  }

  init();

  socket.emit('register-manage');

  socket.on('update', function(yindows) {
    log('Update', yindows);

    _(yindows).each(function(yindow) {
      var view = yindowViews[yindow.name];
      view = createYindowView(yindow, $list);
      $list.append(view.$el);
    });

  });

  socket.on('updateYindow', function(yindow) {
    var view = yindowViews[yindow.name];
    if (!view) {
      view = createYindowView(yindow, $list);
      $list.append(view.$el);
    } else {
      view.render(yindow);
    }
  });

  function createYindowView(yindow) {
    var $el
      , tpl = $('#yindow').text();

    function render(yindow) {
      $el = $(tpl.replace(/\$name/g, yindow.name));
    }

    render(yindow);

    return {
      render: render,
      $el: $el
    };
  }

});