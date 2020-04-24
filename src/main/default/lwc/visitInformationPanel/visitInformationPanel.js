import { LightningElement, track, api } from 'lwc';
import { registerListener, unregisterAllListeners } from 'c/pubsub';

const MAX_ACTIONS_HISTORY = 10;
const LOCAL_STORAGE_PROPS_NAME = 'coveoActionsData';

export default class VisitInformationPanel extends LightningElement {
  @api topics = "";
  @track isOpen = false;

  hidePanel() {
    this.isOpen = false;
  }

  showPanel() {
    this.isOpen = true;
  }

  resetVisit() {
    window.localStorage.setItem(LOCAL_STORAGE_PROPS_NAME, "[]");
    this.template.querySelector('c-visit-history').updateInformations();
  }

  handleHistoryChange(newAction) {
    const actionsData = window.localStorage.getItem('coveoActionsData');
    const currentActionsData = (actionsData) ? JSON.parse(actionsData) : [];
    // Set the new actions history with the title of the current page, and keep no more than the 20 last actions.
    window.localStorage.setItem('coveoActionsData', JSON.stringify([newAction].concat(currentActionsData).slice(0,MAX_ACTIONS_HISTORY)));
    this.template.querySelector('c-visit-history').updateInformations();
  }

  connectedCallback() {
    registerListener('historyChange', this.handleHistoryChange, this);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }
}