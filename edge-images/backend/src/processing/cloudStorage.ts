import { existsSync, PathLike } from "fs";

import { Bucket, Storage } from "@google-cloud/storage";

export default class CloudStorage {
  public static getBucket(bucketName: string) {
    return new Storage({
      keyFile: process.env.GCP_KEY_FILE
    }).bucket(bucketName);
  }

  private storage: Storage;
  private readonly bucketName: string;
  private bucket: Bucket;

  constructor(bucketName: string) {
    this.storage = new Storage();
    this.bucketName = bucketName;
  }

  public async initialize() {
    if (this.bucket) {
      return;
    }

    const [buckets] = await this.storage.getBuckets();
    const bucket = buckets.find(b => b.name === this.bucketName);
    if (bucket) {
      this.bucket = bucket;
      return bucket;
    }

    const [b] = await this.storage.createBucket(this.bucketName);
    this.bucket = b;
    return b;
  }

  public uploadAudio(id: string, audioPath: string) {
    let path = audioPath;
    if (!existsSync(audioPath)) {
      if (process.env.NODE_ENV !== "production" && path) {
        const debugPath = path.replace("/data/audio", "/Volumes/Audio");
        if (existsSync(debugPath)) {
          path = debugPath;
        }
      }
    }
    return this.bucket.upload(path);
  }
}
