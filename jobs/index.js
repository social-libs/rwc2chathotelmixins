function createJobs (lib) {
  'use strict';

  var ret = {};

  require('./basecreator')(lib, ret);
  require('./affirmativecreator')(lib, ret);
  require('./initcreator')(lib, ret);
  require('./acceptcreator')(lib, ret);

  return ret;
}
module.exports = createJobs;
