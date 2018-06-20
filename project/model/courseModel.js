'use strict';

module.exports = function(db) {
  var collection = db.collection('course');
  var collsign = db.collection('signrecords');
  return {
    insertCourse: function(username, coursename) {
      return collection.insert({ teacher: username, coursename: coursename})
        .then(function(result) {
          return Promise.resolve();
        });
    },

    findAllCourses: function(username) {
      return collection.find({teacher:username}).toArray().then(function(docs) {
        return Promise.resolve(docs);
      });
    },

    deleteCourse: function(username, coursename) {
      return collection.remove({teacher: username, coursename: coursename}).then(function(result){
        return collsign.remove({teacher:username, classmsg:coursename}).then(function(r){
          Promise.resolve()
        });
        
      });
    }
  };
};