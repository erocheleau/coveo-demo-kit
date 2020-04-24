import { LightningElement, wire, track } from 'lwc';
import getUserProfilingInfos from '@salesforce/apex/CommunityUserProfilingInfos.getUserProfilingInfos';

const columns = [
  {
    label: 'Information',
    fieldName: 'field'
  },
  {
    label: 'Value',
    fieldName: 'value'
  }
];

export default class UserInfos extends LightningElement {
  // TODO: Make the userInfos customizable
  @track data = [];
  @track columns = columns;

  @wire(getUserProfilingInfos) 
  wiredUserInfos({error, data}) {
    if(data) {
      this.parseUserData(data);
    } else if(error) {
      console.error(error);
      this.data = [];
    }
  }

  parseUserData(data) {
    try {
      const parsedData = JSON.parse(data);
      if(parsedData instanceof Array) {
        this.data = parsedData.map(function(elem){
          return {
            value: elem.value.split(';').join(', '),
            field: elem.field
          }
        });
      }
    } catch (ex) {
      this.data = [];
    }
  }
}