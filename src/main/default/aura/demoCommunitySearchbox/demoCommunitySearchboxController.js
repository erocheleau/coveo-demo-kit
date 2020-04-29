({
  handleRouteChange: function (component, event, helper) {
    if (!component.isValid()) { return; }
    helper.poll(function () {
      return document.title !== 'Topic Detail'
    }, 2000, 150)
      .catch(function () {
        console.log('Polling timeout, still storing the document.title.');
      }).finally(function () {
        const newAction = {
          timestamp: new Date(),
          icon: 'utility:preview',
          type: 'View',
          value: document.title
        };
        const pubsub = component.find('pubsub');
        pubsub.fireEvent('historyChange', newAction);
      })
  }
})
