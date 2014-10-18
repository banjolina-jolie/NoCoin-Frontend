define(function(require, exports, module) {
    "use strict";

    // External dependencies.
    var Backbone = require('backbone');
    var SignIn = require('./views/SignIn');

    // Defining the application router.
    var Router = Backbone.Router.extend({
        routes: {
            '': 'index'
        },

        index: function() {
            var view = new SignIn();

            view.render();
        }
    });

  module.exports = Router;
});
