import { LightningElement, track } from 'lwc';

const GEO_API = 'https://geoip-db.com/json/';

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

const languages = {
  "en-US": "English",
  "fr": "French",
  "en": "English",
  "es": "Spanish",
  "es-MX": "Spanish"
};

export default class BrowserInfos extends LightningElement {
  @track data = [];
  @track columns = columns;

  getTimeZone() {
    try {
      return /\((.*)\)/.exec(new Date().toString())[1];
    } catch (e) {
      return "";
    }
  }

  getMobile() {
    const regexp = new RegExp('Mobi');
    return (regexp.test(navigator.userAgent)) ? 'Yes' : 'No';
  }

  getBrowser() {
    const userAgent = navigator.userAgent;
    if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
    }
    if (userAgent.indexOf("Trident") > -1) {
      return "Microsoft Internet Explorer";
    }
    if (userAgent.indexOf("Edge") > -1) {
      return "Microsoft Edge";
    }
    if (userAgent.indexOf("Chrome") > -1) {
      return "Google Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
      return "Apple Safari";
    }
    return "Unknown Browser";
  }

  getLanguage() {
    return languages[navigator.language] || navigator.language;
  }

  async getLocation() {
    const response = await fetch(GEO_API);
    const data = await response.json();
    return data;

  }

  connectedCallback() {
    const self = this;
    let userLocation = {};
    const visitData = [
      {
        "field": "Language",
        "value": this.getLanguage()
      },
      {
        "field": "Browser",
        "value": this.getBrowser()
      },
      {
        "field": "Mobile",
        "value": this.getMobile()
      },
      {
        "field": "Timezone",
        "value": this.getTimeZone()
      }
    ];
    this.getLocation().then(function (locationData) {
      visitData.push({
        "field": "Country",
        "value": locationData.country_name || ''
      }, {
        "field": "State",
        "value": locationData.state || ''
      }, {
        "field": "City",
        "value": locationData.city || ''
      });
    }).catch(e => {
      console.log(e);
    }).finally(() => {
      self.data = visitData;
    });
  }
}