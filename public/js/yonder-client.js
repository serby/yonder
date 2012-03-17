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
        $el.html('<div id="pane-' + index + '" class="pane"><div style="display: none"></div><iframe style="display: none"></iframe></div>');
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
      console.log('Setting panel ' + data.index  + ' to ' + data.url);
      var setThisPane = function() {
        console.log('data', data, $('#pane-' + data.index));
        var $iframe =  $('#pane-' + data.index + ' iframe')
          , $div = $('#pane-' + data.index + ' div');
        if (data.url) {
          $div.hide();
          $iframe.attr('src', data.url).show();
        } else if (data.html) {
          $iframe.hide();
          $div.html(data.html).show();
        }
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