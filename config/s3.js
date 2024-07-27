const { S3Client, ListBucketsCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client();
const BUCKET = process.env.BUCKET;
