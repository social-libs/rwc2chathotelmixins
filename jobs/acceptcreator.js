function createAcceptRelationJob (lib, mylib) {
  'use strict';

  var AffirmativeJob = mylib.AffirmativeJob;

  function AcceptRelationJob (hotel, rwcrealm, chatrealm, myname, othername, reference, initmessage, defer) {
    AffirmativeJob.call(this, hotel, rwcrealm, chatrealm, myname, othername, reference, initmessage, defer);
  }
  lib.inherit(AcceptRelationJob, AffirmativeJob);
  AcceptRelationJob.prototype.RWCMethodName = function () {
    return this.methodNameOnRWC('acceptRelation');
  }
  AcceptRelationJob.prototype.RWCMethodParams = function () {
    return [this.myname, this.othername, this.reference];
  };

  mylib.AcceptRelationJob = AcceptRelationJob;
}
module.exports = createAcceptRelationJob;
