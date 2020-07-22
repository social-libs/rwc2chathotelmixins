function createLib (execlib) {
  'use strict';
  return {
    mixins: {
      service: require('./service')(execlib)
    }
  };
}
module.exports = createLib;
