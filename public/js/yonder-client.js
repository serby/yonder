(function($) {
  window.yonder = function(options) {

    var log = function() { console.log(arguments); }
      , $el = $('body')
      , yindow
      , socket = window.io.connect(document.location.origin);

    socket.emit('register', { name: options.name });

    function setup(data) {
      log('Setup', data);
      $el.html('');
      update(data);
      setPanesContent(data.container);
    }

    function update(data) {
      log('Update', data);
      yindow = data;
      setupPanes(yindow.container);
    }

    function addPane(pane) {
      var $pane = $('#pane-' + pane.index);
      if ($pane.length === 0) {
        $el.append('<div id="pane-' + pane.index + '" class="pane"><div style="display: none"></div><iframe style="display: none"></iframe></div>');
        setPane(pane);
      }
    }

    function setupPanes(container) {
      container.items.forEach(function(item) {
        if (item.orientation) {
          setupPanes(item);
        } else {
          addPane(item);
        }
      });
      redraw();
    }

    function setPanesContent(container) {
      container.items.forEach(function(item) {
        if (item.orientation) {
          setPanesContent(item);
        } else {
          setPane(item);
        }
      });
    }

    function redrawContainer(container, top, left, width, height) {
      var paneWidth = width
        , paneHeight = height
        , paneTop = top
        , paneLeft = left;

      console.log('Redraw container', arguments);

      if (container.orientation === 'h') {
        paneHeight = Math.round(height / container.items.length);
      } else if (container.orientation === 'v') {
        paneWidth = Math.round(width / container.items.length);
      }

      container.items.forEach(function(item) {
        if (item.orientation) {
          redrawContainer(item, paneTop, paneLeft, paneWidth, paneHeight);
        } else {
          var $pane = $('#pane-' + item.index);
          $pane.css({ top: paneTop, left: paneLeft, width: paneWidth, height: paneHeight, });
        }
        paneTop += (container.orientation === 'h' ? paneHeight : 0);
        paneLeft += (container.orientation === 'v' ? paneWidth : 0);
      });
    }

    function redraw() {
      console.log('Redraw');
      redrawContainer(yindow.container, 0, 0, $(window).width(), $(window).height());
    }

    function setPane(data) {
      console.log('Setting panel ' + data.index  + ' to ' + data.url);
      var setThisPane = function() {
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
    socket.on('update', update);

    $(window).on('resize', redraw);

  };
})(jQuery);