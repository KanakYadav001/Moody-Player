const mongo = require('mongoose');

function ConnectToDB(){
  mongo.connect(process.env.MONGODB_URL)
  .then(()=>{
    console.log('Connect to MongoDB');
  })
  .catch((err)=>{
    console.log("Failed to connect",err);
  })
}

module.exports =ConnectToDB ;