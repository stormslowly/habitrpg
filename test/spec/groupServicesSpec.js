'use strict';

describe('groupServices', function() {
  var $httpBackend, groups,$window;

  beforeEach(module('groupServices'));
  beforeEach(module('habitrpg'));
  beforeEach(function() {
      $window = { location:
                    { replace: function(){
                          console.log("some one try to reload page");
                        },
                      pathname:'/#tasks',
                      href:'',
                      search:'?'
                    }
                  };

      module(function($provide) {
        $provide.value('$window', $window);
      });

    });


  beforeEach( inject(function(_$httpBackend_, Groups) {
      $httpBackend = _$httpBackend_;
      groups = Groups;
    }));

  it('calls party endpoint', function() {
    $httpBackend.expectGET('/api/v2/groups/party').respond({});
    groups.party();
    $httpBackend.flush();
  });

  it('calls tavern endpoint', function() {
    $httpBackend.expectGET('/api/v2/groups/habitrpg').respond({});
    groups.tavern();
    $httpBackend.flush();
  });

  it('calls public guilds endpoint', function() {
    $httpBackend.expectGET('/api/v2/groups?type=public').respond([]);
    groups.publicGuilds();
    $httpBackend.flush();
  });

  it('calls my guilds endpoint', function() {
    $httpBackend.expectGET('/api/v2/groups?type=guilds').respond([]);
    groups.myGuilds();
    $httpBackend.flush();
  });

});