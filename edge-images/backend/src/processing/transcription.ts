import { PubSub, Topic } from "@google-cloud/pubsub";
import log from "../log";

const projectId = process.env.GCP_PROJECT_ID;

const pubsub = new PubSub({ projectId });

export default class CloudPublish {
  protected topic: Topic;
  protected topicName: string;

  constructor(topicName: string) {
    this.topicName = topicName;
  }

  public async initialize() {
    this.topic = pubsub.topic(this.topicName);
    return this.topic;
  }

  public publish(payload: JSON) {
    log.debug(`GCP PubSub published ${JSON.stringify(payload)}`);
    return this.topic.publishJSON(payload);
  }
}
