function createInitRelationJob (lib, mylib) {
  'use strict';

  var AffirmativeJob = mylib.AffirmativeJob;

  function InitiateRelationJob (hotel, rwcrealm, chatrealm, myname, othername, reference, initmessage, defer) {
    AffirmativeJob.call(this, hotel, rwcrealm, chatrealm, myname, othername, reference, initmessage, defer);
  }
  lib.inherit(InitiateRelationJob, AffirmativeJob);
  InitiateRelationJob.prototype.RWCMethodName = function () {
    return this.methodNameOnRWC('initiateRelation');
  }
  InitiateRelationJob.prototype.RWCMethodParams = function () {
    return [this.myname, this.othername, this.reference];
  };

  mylib.InitiateRelationJob = InitiateRelationJob;
}
module.exports = createInitRelationJob;
