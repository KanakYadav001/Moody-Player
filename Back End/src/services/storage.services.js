var ImageKit = require("imagekit");
var mongoo = require('mongoose');
var imagekit = new ImageKit({
   publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
   privateKey :process.env.IMAGEKIT_PRIVATE_KEY,
   urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT

});

function uplodeFile(file) {
    return new Promise((resolve,reject)=>{
        imagekit.upload({
            file : file.buffer,
            fileName : (new  mongoo.Types.ObjectId()).toString(),
            folder : 'cohort-audio'
        },(error,result)=>{
            if(error){
                reject(error);
            }
            else {
    resolve(result);
            }
        })
    })
}

module.exports = uplodeFile ;