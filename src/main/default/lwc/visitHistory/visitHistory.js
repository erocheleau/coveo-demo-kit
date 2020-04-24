import { LightningElement, track, api } from 'lwc';

const columns = [
  {
    label: 'Date Time',
    fieldName: 'timestamp',
    type: 'date',
    typeAttributes: {
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    },
    fixedWidth: 150
  },
  {
    label: 'Type',
    fieldName: 'type',
    cellAttributes: {
      iconName: { fieldName: 'icon' },
      iconPosition: 'left'
    },
    fixedWidth: 90
  },
  { label: 'Value', fieldName: 'value' }
];

const LOCAL_STORAGE_PROPS_NAME = 'coveoActionsData';

export default class VisitHistory extends LightningElement {
  @track data = [];
  @track columns = columns;

  /**
   * Update the current data on the visit by reading in the localStorage.
   */
  @api
  updateInformations() {
    const actionsDataLocalStorage = window.localStorage.getItem(LOCAL_STORAGE_PROPS_NAME);
    if (actionsDataLocalStorage !== JSON.stringify(this.data)) {
      this.data = JSON.parse(actionsDataLocalStorage) || [];
    }
  }

  connectedCallback() {
    this.updateInformations();
  }
}