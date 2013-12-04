# Yonder - A remote browser management tool

[![build status](https://secure.travis-ci.org/serby/yonder.png)](http://travis-ci.org/serby/yonder)

## Installation

      npm install yonder

## Usage

      yonder start

Then goto

     http://localhost:4031/{WINDOWID}

If you don't provide an **WINDOWID** you'll be redirected to a url with a unique **WINDOWID**.

      http://localhost:4031/yonder1

By default a page will have just one ''pane'' which will have the index 0.

### Get Window Information

      GET http://localhost:4031/{WINDOWID}/info

      GET http://localhost:4031/y1/info

Would return

      {
        name: 'y1',
        panes: [
          {
            id: 0,
            url: ''
          }
        }
      }

For a window that has been split like so:

      +----------------+
      |       |        |
      |       |    1   |
      |       |        |
      |   0   |--------|
      |       |        |
      |       |    2   |
      |       |        |
      +----------------+

The response would be:

      {
        name: '',
        panes: [
          {
            v: [
              {
                id: 0,
                url: ''
              },
              {
                h: [
                  {
                    id: 1,
                    url: ''
                  },
                  {
                    id: 2,
                    url
                  }
                ]
              }
            ]
          }
        ]
      }

### Setting Pane content
      PUT http://localhost:4031/{WINDOWID}/{PANE}

#### PUT DATA
      {
        url: 'http://www.clock.co.uk',
        refresh: 60 // How often to refresh - Default to 0 ie never!
      }

#### RESPONSE DATA
      HTTP STATUS 200

There is also a browser shortcut for setting the Pane content via the browser
      GET http://localhost:4031/{WINDOWID}/{PANE}/{URL}

      GET http://localhost:4031/y1/0/?url=http://www.clock.co.uk

### Horizontal Split

You can split a pane like so:

      POST http://localhost:4031/{WINDOWID}/{PANE}/hsplit/

      POST http://localhost:4031/yonder1/0/hsplit/

#### POST DATA
      {
        url: 'http://www.clock.co.uk',
        refresh: 60
      }

#### RESPONSE DATA
      HTTP STATUS 201

### Vertical Split

      POST http://localhost:4031/yonder1/0/vsplit/

### Vertical Split and make new panel {URL}

      POST http://localhost:4031/yonder1/0/vsplit/

#### POST DATA
      {
        url: 'http://www.clock.co.uk'
      }

#### RESPONSE DATA
      HTTP STATUS 201


## Credits
[Paul Serby](https://github.com/serby/)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
