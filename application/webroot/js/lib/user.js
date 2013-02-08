var User = function() {
	this.login = function(email, password, callback) {
		var input_data = {email:email, password:password};

		$.ajax({
			type:'POST',
			url:service.url + '/login/do', 
			data:input_data,
			dataType:'json',
			success:function(data) {
				callback(data);
			}
		});
		
	},
	this.join = function(email, password, username, callback) {
		var input_data = {email:email, password:password, username:username};

		$.ajax({
			type:'POST',
			url:service.url + '/join/do', 
			data:input_data,
			dataType:'json',
			success:function(data) {
				callback(data);
			}
		});
	},
    this.facebook_login = function(redirect_uri) {
    	if(typeof(redirect_uri) == 'undefined') redirect_uri = window.location;

		FB.login(function(response) {
		  if (response.status == 'connected') {
		  /*	if (response.scope == null) {
		     	FB.logout();
		    } else {*/
		    	if(typeof(humanMsg) != 'undefined') {
		    		humanMsg.displayMsg('로그인중입니다. 잠시만 기다려주세요.');
		    	}

				window.location = service.url + 'login/facebook/?redirect_uri=' + encodeURIComponent(redirect_uri);
		  //  }
		  } else {
			// user cancelled login
		  }
		},{scope:'email'});
	}
}

var user = new User();