({
  doInit: function (component, event, helper) {
    const coveoSearchUI = component.find('coveoRecommendations');
    const recommendationsContext = component.get('v.recommendationsContext');
    if (recommendationsContext !== '') {
      coveoSearchUI.registerBeforeInit(function (cmp, root, Coveo) {
        coveoSearchUI.proxyAddEventListener('doneBuildingQuery', function (e, args) {
          const qb = args.queryBuilder;
          const actionsHistory = localStorage.getItem('coveoActionsData');
          qb['recommendation'] = recommendationsContext;
          qb.addContextValue('recommendationsContext', recommendationsContext);
          qb.addContextValue('actionsHistoryContext', actionsHistory);
        });
      });
    }
  }
})