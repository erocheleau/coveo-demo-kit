({
  getSearchUIRoot: function (component) {
    const coveoSearch = component.find('coveoSearch');
    const searchUIRoot = coveoSearch.get('v.searchUI');
    return searchUIRoot;
  },

  bindEvents: function (component) {

    const searchUIRoot = this.getSearchUIRoot(component);

    // Send click events to the pubsub event tracker. 
    // Used to track clicks in the custom actionsHistory for the Visit History widget.
    searchUIRoot.proxyAddEventListener('changeAnalyticsCustomData', function (e, args) {
      if (args && args.type === 'ClickEvent') {
        const newAction = {
          timestamp: new Date(),
          icon: 'utility:touch_action',
          type: 'Click',
          value: args.resultData.title
        };
        const pubsub = component.find('pubsub');
        pubsub.fireEvent('historyChange', newAction);
      }
    });

    // Send search events to the pubsub event tracker. 
    // Used to track queries in the custom actionsHistory for the Visit History widget.
    searchUIRoot.proxyAddEventListener('doneBuildingQuery', function (e, args) {
      const qb = args.queryBuilder;
      if (qb && qb.expression) {
        const userQuery = qb.expression.build();
        const newAction = {
          timestamp: new Date(),
          icon: 'utility:search',
          type: 'Query',
          value: userQuery
        };
        const pubsub = component.find('pubsub');
        pubsub.fireEvent('historyChange', newAction);
        const actionsHistory = localStorage.getItem('coveoActionsData');
        qb.addContextValue('actions', actionsHistory);
      }
    });

  }
})
