import { LightningElement, track, api } from 'lwc';

const columns = [
  {
    label: 'Topic',
    fieldName: 'topic'
  }
];

export default class TopicInfos extends LightningElement {
  @track data = [];
  @track columns = columns;

  @api
  get topics() {
    return this.data.map((val) => val.topic).join(';');
  }

  set topics(topics) {
    this.data = topics.split(';').map(topic => { return { "topic": topic.trim() } });
  }
}