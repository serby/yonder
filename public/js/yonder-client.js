(function($) {
  window.yonder = function(options) {

    var $el = $('body')
      , yindow
      , pane = 0
      , socket = io.connect(document.location.origin);

    socket.emit('register', { name: options.name });

    function setup(data) {
      yindow = data;
      yindow.panes.forEach(function(pane, index) {
        var src = pane.src || '';
        $el.html('<iframe id="pane-' + index + '"></iframe>');
        setPane(pane);
      });
      redraw();
    }

    function redraw() {
      console.log('Redraw');
      yindow.panes.forEach(function(pane, index) {
        $('#pane-' + index)
          .width($(window).width())
          .height($(window).height());
      });
    }

    function setPane(data) {
      var setThisPane = function() {
        console.log(data, $('#pane-' + data.index));
        $('#pane-' + data.index).attr('src', data.url);
      };

      if ((data.refresh) && (data.refresh !== 0)) {
        setTimeout(setThisPane, data.refresh);
      } else {
        setThisPane();
      }
    }

    socket.on('setup', setup);
    socket.on('setPane', setPane);

    $(window).on('resize', redraw);

  };
})(jQuery);