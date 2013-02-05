
	var delay = (function(){
	  var timer = 0;
	  return function(callback, ms){
	    clearTimeout (timer);
	    timer = setTimeout(callback, ms);
	  };
	})();
    
    var numberFormat = function(number, decimals, dec_point, thousands_sep) {
	     number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	    var n = !isFinite(+number) ? 0 : +number,
	        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	        s = '',
	        toFixedFix = function (n, prec) {
	            var k = Math.pow(10, prec);
	            return '' + Math.round(n * k) / k;
	        };
	    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	    if (s[0].length > 3) {
	        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	    }
	    if ((s[1] || '').length < prec) {
	        s[1] = s[1] || '';
	        s[1] += new Array(prec - s[1].length + 1).join('0');
	    }
	    return s.join(dec);
    }
    
    var stringToTime = function(date) {
    	return Math.round(new Date(date).getTime() / 1000);
    }
    
    var stringFromNow = function(date, full_text) {
    	if(typeof(full_text) == 'undefined') full_text = false;
    	
        var now = Math.round(new Date().getTime() / 1000);
        
        diff = now - date;
    
        day =  Math.round(diff/60/60/24);
        hour =  Math.round(diff/60/60);
        min = Math.round(diff/60);
        sec = diff;
    
        result = '';

        if(day == 0) {
            if(hour == 0) {
                if(min == 0) {
                    if(sec == 0) {
                        result = '방금';
                    } else {
                        if(sec == 1) {
                            result = sec + (full_text ? '초전' : '초');
                        } else {
                            result = sec + (full_text ? '초전' : '초');
                        }
                    }
                } else {
                    if(min == 1) {
                        result = min + (full_text ? '분전' : '분');
                    } else {
                        result = min + (full_text ? '분전' : '분');
                    }
                }
            } else {
                if(hour == 1) {
                    result = hour + (full_text ? '시간전' : '시간');
                } else {
                    result = hour + (full_text ? '시간전' : '시간');
                }
            }
        } else {
            switch(day) {
                case 1: result = '어제'; break;
                default:
                    result = day + (full_text ? '일전' : '일');
                break;
            }
        }
        
        return result;
    }
    
    var stringEnglishFromNow = function(date, full_text) {
    	if(typeof(full_text) == 'undefined') full_text = false;
    	
        var now = Math.round(new Date().getTime() / 1000);
        
        diff = now - date;
    
        day =  Math.round(diff/60/60/24);
        hour =  Math.round(diff/60/60);
        min = Math.round(diff/60);
        sec = diff;
    
        result = '';

        if(day == 0) {
            if(hour == 0) {
                if(min == 0) {
                    if(sec == 0) {
                        result = 'Now';
                    } else {
                        if(sec == 1) {
                            result = sec + (full_text ? ' sec ago' : 's');
                        } else {
                            result = sec + (full_text ? ' secs ago' : 's');
                        }
                    }
                } else {
                    if(min == 1) {
                        result = min + (full_text ? ' minute ago' : 'm');
                    } else {
                        result = min + (full_text ? ' minutes ago' : 'm');
                    }
                }
            } else {
                if(hour == 1) {
                    result = hour + (full_text ? ' hour ago' : 'h');
                } else {
                    result = hour + (full_text ? ' hours ago' : 'h');
                }
            }
        } else {
            switch(day) {
                case 1: result = 'yesterday'; break;
                default:
                    result = day + (full_text ? ' days ago' : 'd');
                break;
            }
        }
        
        return result;
    }
	
	var toTimeString = function(diffInSecs) {
	   // Math.max makes sure that you'll get '00:00' if start > end.
	   
	   var diffInMinutes = Math.max(0, Math.floor(diffInSecs / 60));
	   var diffInHours = Math.max(0, Math.floor(diffInMinutes / 60));
	   
	   diffInSecs = diffInSecs % 60;
	   diffInMinutes = diffInMinutes % 60;
	   
	   var result = [
	       ('0'+diffInHours).slice(-2),
	       ('0'+diffInMinutes).slice(-2),
	       ('0'+diffInSecs).slice(-2)
	   ].join(':');
	   
	   if(result.substr(0,3) == '00:') result = result.substr(3);
	   
	   return result;
	}	
	
	var isNumber = function(s) {
	  s += ''; // 문자열로 변환
	  s = s.replace(/^\s*|\s*$/g, ''); // 좌우 공백 제거
	  if (s == '' || isNaN(s)) return false;
	  return true;
	}
	
	var replaceAll = function(str,orgStr,repStr) {
		if(typeof(str) == 'string') {
	   	 return str.split(orgStr).join(repStr);
	   	} else {
	     return str;
	    }
	}
	
	var secondsToTime = function(secs) {
		secs = parseInt(secs);
		
	    var hours = Math.floor(secs / (60 * 60));
	   
	    var divisor_for_minutes = secs % (60 * 60);
	    var minutes = Math.floor(divisor_for_minutes / 60);
	 
	    var divisor_for_seconds = divisor_for_minutes % 60;
	    var seconds = Math.ceil(divisor_for_seconds);
	   
	    var obj = {
	        hours : hours,
	        minutes : minutes,
	        seconds : seconds
	    };
	    return obj;
	}
	
	var convertSecondsToTime = function(sec) {
		var time = secondsToTime(sec);
		 
		if(time.minutes < 10) time.minutes = "0" + time.minutes;
		if(time.seconds < 10) time.seconds = "0" + time.seconds;
		
		if(time.hours > 0) {
			if(time.hours < 10) time.hours = "0" + time.hours;
			
			return time.hours + ':' + time.minutes + ':' + time.seconds;
		} else {
			return time.minutes + ':' + time.seconds;
		}
	}
	
	var addslashes = function( str ) {  
	    return (str+'').replace(/([\\"'])/g, "\\$1").replace(/\0/g, "\\0");  
	} 
	
	var reload = function() {
		window.location.reload();
	}
	
	var go = function(url) {
		window.location.href = url;
	}