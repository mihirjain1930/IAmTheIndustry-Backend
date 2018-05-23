var mongoose =  require('mongoose');
var Schema = mongoose.Schema;

var  postSchema = new mongoose.Schema({
  title : {type:String},
  description:{type:String},
  genre:{type:String},
  type:{type:String},
  icon:{type:String},
  privacy:{type:Number},
  charge : {type : Boolean, default : false},
  created_date : {type : Date, default : Date.now},
  music_audio: {
  type: String
  }
});



postSchema.statics.viewAudioList1 = function(callBack) {
  this.find({
    isDeleted: false,
  }, function(err, res) {
    if (!res) return callBack(null, null);
    callBack(null, res);
  });
}


var postObj = mongoose.model('post', postSchema);
module.exports = postObj;