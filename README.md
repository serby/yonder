#

[![build status](https://secure.travis-ci.org/serby/###.png)](http://travis-ci.org/serby/###)

## Installation

      npm install ###

## Usage

Goto
     http://localhost:4031/{PAGEID}

If you don't provide an PAGEID you'll be redirected to a url with a random PAGEID

By default the a page will have just one pane. So if you open a new page called ''remmy1'' you will have will have a single pane which will have the index 0.

### Get Page Information

      GET http://localhost:4031/{PAGEID}/info

      GET http://localhost:4031/remmy1/info

Would return

      {
        name: 'remmy1',
        panes: [
          {
            id: 0,
            url: ''
          }
        }
      }

For a page that has been split like so:


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
            vertical: [
              {
                id: 0,
                url: ''
              },
              {
                horizontal: [
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

### Horizontal Split

      POST http://localhost:4031/{PAGEID}/{PANE}/hspliter

      POST http://localhost:4031/remmy1/0/hspliter

#### POST DATA
      {
        url: 'http://www.clock.co.uk',
        refresh: 60 // How often to refresh - Default to 0 ie never!
      }

#### RESPONSE DATA
      { success: true }

### Vertical Split

      POST http://localhost:4031/remmy1/0/vspliter

### Vertical Split and make new panel {URL}

      POST http://localhost:4031/remmy1/0/vspliter/

#### POST DATA
      {
        url: 'http://www.clock.co.uk'
      }

#### RESPONSE DATA
      { success: true }


## Credits
[Paul Serby](https://github.com/serby/)

## Licence
Licenced under the [New BSD License](http://opensource.org/licenses/bsd-license.php)
