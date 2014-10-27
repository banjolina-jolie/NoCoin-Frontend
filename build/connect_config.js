module.exports = {
    mountFolder: function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    },

    pushStateHook: function (url) {
      var path = require('path');
      var request = require('request'); // Need to be added into package.json
      return function (req, res, next) {
        var ext = path.extname(req.url);
        if ((ext == "" || ext === ".html") && req.url != "/") {
          req.pipe(request(url)).pipe(res);
        } else {
          next();
        }
      };
    }

};