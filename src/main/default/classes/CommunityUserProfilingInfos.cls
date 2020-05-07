global with sharing class CommunityUserProfilingInfos {

    @AuraEnabled(cacheable=true)
    global static string getUserProfilingInfos(){
        // User u = [select Id, email from User where Id = :UserInfo.getUserId()];
        // Contact c = [select Id, Email, ProductsOwned__c, RegistrationDate__c, Interests__c FROM Contact WHERE Email = :u.email LIMIT 1];

        List<Map<String,Object>> userInfos = new List<Map<String,Object>>();
        userInfos.add(new Map<String,Object>{ 'field' => 'Interests', 'value' => 'Running'});
        userInfos.add(new Map<String,Object>{ 'field' => 'Products Owned', 'value' => 'Speedbit Blaze'});
        userInfos.add(new Map<String,Object>{ 'field' => 'Registered on', 'value' => '2019-08-08'});

        return JSON.serialize(userInfos);
    }
}