const fs = require('fs');
const path = require('path');
const debug = require('debug')('metalsmith-assets');
const readdir = require('recursive-readdir');
const statMode = require('stat-mode');
const {each} = require('async');

/**
 * Expose `assets`.
 */

module.exports = assets;

/**
 * Default plugin options
 */
const defaults = {
  source: './public',
  destination: '.'
};

/**
 * Metalsmith plugin to include static assets.
 *
 * @param {Object} options (optional)
 *   @property {String} source Path to copy static assets from (relative to working directory). Defaults to './public'
 *   @property {String} destination Path to copy static assets to (relative to destination directory). Defaults to '.'
 * @return {Function} A callback for metalsmith.
 */
function assets(options) {
  options = {
    ...defaults,
    ...(options ? options : {})
  };

  return function (files, metalsmith, done) {
    const src = metalsmith.path(options.source);
    const dest = options.destination;

    debug('pulling files from ' + src);
    debug('and putting in ' + dest);

    // Copied almost line for line from https://github.com/segmentio/metalsmith/blob/master/lib/index.js
    readdir(src, (err, arr) => {
      if (err) {
        return done(err);
      }

      debug(arr.length + ' files found.');

      each(arr, read, err => {
        debug(arr.length + ' files copied.');
        done(err, files);
      });
    });

    function read(file, done) {
      const name = path.join(dest, path.relative(src, file));
      fs.stat(file, (err, stats) => {
        if (err) {
          return done(err);
        }

        fs.readFile(file, (err, buffer) => {
          if (err) {
            return done(err);
          }

          files[name] = {
            contents: buffer,
            mode: statMode(stats).toOctal()
          };
          done();
        });
      });
    }
  };
}
