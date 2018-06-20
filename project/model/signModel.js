'use strict';

module.exports = function(db) {
  var collection = db.collection('signrecords');

  return {
    insertSignRecord: function(username, date, content, classmsg) {
      return collection.insert({ teacher: username, date: date, content: content, classmsg : classmsg})
        .then(function(result) {
          return Promise.resolve();
        });
    },

    findAllSignRecords: function(username) {
      return collection.find({teacher:username}).toArray().then(function(docs) {
        return Promise.resolve(docs);
      });
    }
  };
};