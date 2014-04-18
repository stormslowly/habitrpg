'use strict';

describe('Root Controller', function() {
  var scope, user, ctrl;
  var $window;

  beforeEach(module('habitrpg'));

  beforeEach(function() {
    $window = { location:
                  { replace: function(){
                        console.log("fuck");
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

  afterEach(function(){
    console.log($window.location.href);

  });

  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    scope.loginUsername = 'user';
    scope.loginPassword = 'pass';
    user = specHelper.newUser();

    ctrl = $controller('RootCtrl', {$scope: scope, User: {user: user}});
  }));


  describe('contributor Text', function(){

    var originalT =null;

    beforeEach(function(){
      originalT = env.t;
    });

    afterEach(function(){
      env.t = originalT;
    });



    it('shows contributor level text', function(){

      env.t = function(str){
          return '[translated:'+str+']';
        };

      expect(scope.contribText()).to.eql(undefined);
      expect(scope.contribText(null, {npc: 'NPC'})).to.eql('NPC');

      expect(scope.contribText({level: 0, text: 'Blacksmith'})).to.eql(undefined);
      expect(scope.contribText({level: 1, text: 'Blacksmith'})).
        to.eql( env.t('friend') + ' Blacksmith' );
      expect(scope.contribText({level: 2, text: 'Blacksmith'})).
        to.eql( env.t('friend') + ' Blacksmith' );
      expect(scope.contribText({level: 3, text: 'Blacksmith'})).
        to.eql( env.t('elite') + ' Blacksmith' );
      expect(scope.contribText({level: 4, text: 'Blacksmith'})).
        to.eql( env.t('elite') + ' Blacksmith' );
      expect(scope.contribText({level: 5, text: 'Blacksmith'})).
        to.eql( env.t('champion') + ' Blacksmith');
      expect(scope.contribText({level: 6, text: 'Blacksmith'})).
        to.eql( env.t('champion') + ' Blacksmith' );
      expect(scope.contribText({level: 7, text: 'Blacksmith'})).
        to.eql( env.t('legendary') + ' Blacksmith' );
      expect(scope.contribText({level: 8, text: 'Blacksmith'})).
        to.eql( env.t('heroic') + ' Blacksmith');
      expect(scope.contribText({level: 8, text: 'Blacksmith'}, {npc: 'NPC'})).to.eql('NPC');
    });
  });

  describe('i18n', function(){
    var t = env.t;
    beforeEach(function(){
      env.translations = {
        "text1": 'translatedText1',
        "text2": '<%= number %> eggs',
        "stringNotFound" : "String '<%= string %>' not found.",
      };
    });

    it('translates strings', function(){
      expect(t('')).to.eql("String '' not found.");
      expect(t('text1')).to.eql('translatedText1');
      expect(t(' text1 ')).to.eql("String ' text1 ' not found.");
      expect(t('text3')).to.eql("String 'text3' not found.");
    });

    it('interpolates strings', function(){
      expect(t('text2', {number: 2})).to.eql('2 eggs');
      expect(t('text2', {number: 'ten'})).to.eql('ten eggs');
      expect(t('text2', {n: 10, number: 'ten'})).to.eql('ten eggs');
      expect(t('text2')).to.eql('<%= number %> eggs');
    });
  });

});