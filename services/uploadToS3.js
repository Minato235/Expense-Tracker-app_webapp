var aws = require("aws-sdk");
const  uploadToS3=(data,filename)=>{
    const BUCKET_NAME = "expensetrackerdownload";
    const IAM_SECRET_KEY = "HIs6zEpBVB8Z1TRT3IiEQl3KLYfgX2D5lFrCu4tG";
    const IAM_USER_KEY = "AKIAV3OI63XNUNY6AO55";
  
    let s3Bucket = new aws.S3({
      accessKeyId: IAM_USER_KEY,
      secretAccessKey: IAM_SECRET_KEY,
      Bucket: BUCKET_NAME
    })
    
      var params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: data,
        ACL:"public-read"
      }
      return new Promise((resolve,reject)=>{
        s3Bucket.upload(params, (err, s3Resonce) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("success", s3Resonce)
            resolve(s3Resonce.Location)
          }
        })
      })
      
    
  }
  module.exports={
    uploadToS3
  }