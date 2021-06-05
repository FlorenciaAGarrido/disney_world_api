const AWS = require("aws-sdk");
const config = require("../config/config");
const AppError = require("../handlers/AppError");
const logger = require("../loaders/logger/logger");

class ImageRepository {
  constructor() {
    this.s3 = new AWS.S3({
      accessKeyID: config.aws.accessKeyID,
      secretAccessKey: config.aws.privateAccessKey,
    });
  }

  uploadImg = (name, image, type) => {
    const Key = `${name}.${type.split("/")[1]}`; //name of the new object e.g ironman.png

    //the aws sd uses callbacks
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: config.aws.s3BucketName,
        Key,
        Body: image,
        ContentType: type, //file extension
        ACL: "public-read",
      };

      this.s3.upload(params, (err, data) => {
        err && reject(new AppError(err.message, 502));

        // logger.info(`Image location: ${data.location}`);

        resolve(`https://${config.aws.s3BucketName}.s3.amazonaws.com/${Key}`);
      });
    });
  };

  deleteImg(Key) {
    Key = Key.split("/")[3];

    return new Promise((res, rej) => {
      const params = {
        Bucket: config.aws.s3BucketName,
        Key,
      };
      logger.info(params);

      this.s3.deleteObject(params, (err, data) => {
        err && rej(new AppError(err.message, 502));

        logger.info(data);
        res(true);
      });
    });
  }
}

module.exports = ImageRepository;
