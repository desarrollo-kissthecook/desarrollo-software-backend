const { createWriteStream, unlinkSync } = require('fs');
const { sync } = require('mkdirp');
const aws = require('aws-sdk');
const { generate } = require('shortid');
const amazonConfig = require('../config/amazon');

aws.config.update(amazonConfig);

const s3 = new aws.S3();

const uploadDir = '.';

sync(uploadDir);
const storeFS = ({ stream, filename }) => {
  const id = generate();
  const path = `${uploadDir}/${id}-${filename}`;

  return new Promise((resolve, reject) =>
    stream
      .on('error', error => {
        if (stream.truncated) unlinkSync(path);
        reject(error);
      })
      .pipe(createWriteStream(path))
      .on('error', error => reject(error))
      .on('finish', () => resolve({ id, path }))
  );
};
const processUpload = async upload => {
  const { createReadStream, filename } = await upload;
  const stream = createReadStream();
  const { id, path } = await storeFS({ stream, filename });
  return { id, path };
};

module.exports = { processUpload, s3 };
