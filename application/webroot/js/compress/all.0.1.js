
// @fileRef basic.js 

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


// @fileRef pickadate.js 

/*!
 * pickadate.js v2.1.2 - 31 January, 2013
 * By Amsul (http://amsul.ca)
 * Hosted on https://github.com/amsul/pickadate.js
 * Licensed under MIT ("expat" flavour) license.
 */

/*jshint
   debug: true,
   devel: true,
   browser: true,
   asi: true,
   unused: true,
   eqnull: true
 */



;(function( $, document, undefined ) {

    'use strict';



    var

        // Globals & constants
        DAYS_IN_WEEK = 7,
        WEEKS_IN_CALENDAR = 6,
        DAYS_IN_CALENDAR = WEEKS_IN_CALENDAR * DAYS_IN_WEEK,

        STRING_DIV = 'div',
        STRING_PREFIX_DATEPICKER = 'pickadate__',

        isIE = navigator.userAgent.match( /MSIE/ ),

        $document = $( document ),

        $body = $( document.body ),


        /**
         * The picker constructor that acceps the
         * jQuery element and the merged settings
         */
        Picker = function( $ELEMENT, SETTINGS ) {

            var
                // Pseudo picker constructor
                Picker = function() {},


                // The picker prototype
                P = Picker.prototype = {

                    constructor: Picker,

                    $node: $ELEMENT,

                    /**
                     * Initialize everything
                     */
                    init: function() {


                        // Bind all the events to the element,
                        // and then insert everything after it
                        $ELEMENT.on({
                            'focus click': function() {

                                // If it's not IE or it is IE and the calendar is not
                                // being force closed, then open the calendar
                                if ( !isIE || ( isIE && !CALENDAR._IE ) ) {
                                    P.open()
                                }

                                // Add the focused state to the holder
                                $HOLDER.addClass( CLASSES.focused )

                                // Then flip the IE force close to false
                                CALENDAR._IE = 0
                            },
                            blur: function() {
                                $HOLDER.removeClass( CLASSES.focused )
                            },
                            keydown: function( event ) {

                                var
                                    // Grab the keycode
                                    keycode = event.keyCode,

                                    // Check if one of the delete keys was pressed
                                    isKeycodeDelete = keycode == 8 || keycode == 46

                                // If backspace was pressed or the calendar
                                // is closed and the keycode warrants a date change,
                                // prevent it from going any further.
                                if ( isKeycodeDelete || !CALENDAR.isOpen && KEYCODE_TO_DATE[ keycode ] ) {

                                    // Prevent it from moving the page
                                    event.preventDefault()

                                    // Prevent it from propagating to document
                                    event.stopPropagation()

                                    // If backspace was pressed, clear the values
                                    // and then close the picker
                                    if ( isKeycodeDelete ) {
                                        P.clear().close()
                                    }

                                    // Otherwise open the calendar
                                    else {
                                        P.open()
                                    }
                                }
                            }
                        }).after( [ $HOLDER, ELEMENT_HIDDEN ] )


                        // If the element has autofocus, open the calendar
                        if ( ELEMENT.autofocus ) {
                            P.open()
                        }


                        // Do stuff after rendering the calendar
                        postRender()


                        // Trigger the onStart method within scope of the picker
                        triggerFunction( SETTINGS.onStart, P )


                        return P
                    }, //init


                    /**
                     * Open the calendar
                     */
                    open: function() {

                        // If it's already open, do nothing
                        if ( CALENDAR.isOpen ) return P


                        // Set calendar as open
                        CALENDAR.isOpen = true


                        // Toggle the tabindex of "focusable" calendar items
                        toggleCalendarElements( 0 )


                        // Make sure the element has focus and then
                        // add the "active" class to the element
                        $ELEMENT.focus().addClass( CLASSES.inputActive )

                        // Add the "opened" class to the calendar holder
                        $HOLDER.addClass( CLASSES.opened )

                        // added ncloud
                        var $frame = $HOLDER.find('.' + CLASSES.frame)
                        var to_y = Math.round(($HOLDER.height() - $frame.outerHeight()) / 2);
                        if(to_y < 0) to_y = 0;
                        $frame.css('top', to_y + 'px')

                        // Add the "active" class to the body
                        $body.addClass( CLASSES.bodyActive )


                        // Bind all the events to the document
                        // while namespacing it with the calendar ID
                        $document.on( 'focusin.P' + CALENDAR.id, function( event ) {

                            // If the target is not within the holder,
                            // and is not the element, then close the picker
                            if ( !$HOLDER.find( event.target ).length && event.target != ELEMENT ) P.close()

                        }).on( 'click.P' + CALENDAR.id, function( event ) {

                            // If the target of the click is not the element,
                            // then close the calendar picker
                            // * We don't worry about clicks on the holder
                            //   because those are stopped from bubbling to the doc
                            if ( event.target != ELEMENT ) P.close()

                        }).on( 'keydown.P' + CALENDAR.id, function( event ) {

                            var
                                // Get the keycode
                                keycode = event.keyCode,

                                // Translate that to a date change
                                keycodeToDate = KEYCODE_TO_DATE[ keycode ]


                            // On escape
                            if ( keycode == 27 ) {

                                // Focus back onto the element
                                ELEMENT.focus()

                                // Then close the picker
                                P.close()
                            }


                            // If the target is the element and there's
                            // a keycode to date translation or the
                            // enter key was pressed
                            else if ( event.target == ELEMENT && ( keycodeToDate || keycode == 13 ) ) {

                                // Prevent the default action to stop
                                // it from moving the page
                                event.preventDefault()

                                // If the keycode translates to a date change
                                if ( keycodeToDate ) {

                                    // Set the selected date by creating new validated
                                    // dates - incrementing by the date change.
                                    // And make this just a superficial selection.
                                    // * Truthy second argument makes it a superficial selection
                                    setDateSelected( createValidatedDate( [ MONTH_FOCUSED.YEAR, MONTH_FOCUSED.MONTH, DATE_HIGHLIGHTED.DATE + keycodeToDate ], keycodeToDate ), 1 )
                                }

                                // On enter
                                else {

                                    // Set the element value as the highlighted date
                                    setElementsValue( DATE_HIGHLIGHTED )

                                    // Render a new calendar
                                    calendarRender()

                                    // And then close it
                                    P.close()
                                }

                            } //if ELEMENT
                        })


                        // Trigger the onOpen method within scope of the picker
                        triggerFunction( SETTINGS.onOpen, P )

                        return P
                    }, //open


                    /**
                     * Close the calendar
                     */
                    close: function() {

                        // If it's already closed, do nothing
                        if ( !CALENDAR.isOpen ) return P


                        // Set calendar as closed
                        CALENDAR.isOpen = false


                        // Toggle the tabindex of "focusable" calendar items
                        toggleCalendarElements( -1 )


                        // Remove the "active" class from the element
                        $ELEMENT.removeClass( CLASSES.inputActive )

                        // Remove the "opened" class from the calendar holder
                        $HOLDER.removeClass( CLASSES.opened )

                        // Remove the "active" class from the body
                        $body.removeClass( CLASSES.bodyActive )


                        // Unbind the Picker events from the document
                        $document.off( '.P' + CALENDAR.id )


                        // Trigger the onClose method within scope of the picker
                        triggerFunction( SETTINGS.onClose, P )

                        return P
                    }, //close


                    /**
                     * Show a month in focus with 0index compensation
                     */
                    show: function( month, year ) {
                        showMonth( --month, year )
                        return P
                    }, //show


                    /**
                     * Clear the value of the input elements
                     */
                    clear: function() {

                        // Clear the elements value
                        setElementsValue( 0 )

                        // Render a new calendar
                        calendarRender()

                        return P
                    }, //clear


                    /**
                     * Get a date in any format.
                     * Defaults to getting the selected date
                     */
                    getDate: function( format ) {

                        // If the element has no value,
                        // just return an empty string
                        if ( !ELEMENT.value ) {
                            return ''
                        }

                        // If the format is a literal true,
                        // return the underlying JS Date object
                        if ( format === true ) {
                            return DATE_SELECTED.OBJ
                        }

                        // Otherwise return the formatted date
                        return getDateFormatted( format )
                    }, //getDate


                    /**
                     * Set the date with month 0index compensation
                     * and an option to do a superficial selection
                     */
                    setDate: function( year, month, date, isSuperficial ) {

                        // Compensate for month 0index and create a validated date.
                        // Then set it as the date selected
                        setDateSelected( createValidatedDate([ year, --month, date ]), isSuperficial )

                        return P
                    }, //setDate


                    /**
                     * Get the min or max date based on
                     * the argument being truthy or falsey
                     */
                    getDateLimit: function( upper, format ) {

                        // Get the max or min date depending on the `upper` flag
                        return getDateFormatted( format, upper ? DATE_MAX : DATE_MIN )
                    }, //getDateLimit


                    /**
                     * Set the min or max date based on second
                     * argument being truthy or falsey.
                     */
                    setDateLimit: function( limit, upper ) {

                        // If it's the upper limit
                        if ( upper ) {

                            // Set the max date
                            DATE_MAX = createBoundaryDate( limit, upper )

                            // If focused month is more than max date set it to max date
                            if ( MONTH_FOCUSED.TIME > DATE_MAX.TIME ) {
                                MONTH_FOCUSED = DATE_MAX
                            }
                        }

                        // Otherwise it's the lower limit
                        else {

                            // So set the min date
                            DATE_MIN = createBoundaryDate( limit )

                            // If focused month is less than min date set it to min date
                            if ( MONTH_FOCUSED.TIME < DATE_MIN.TIME ) {
                                MONTH_FOCUSED = DATE_MIN
                            }
                        }

                        // Render a new calendar
                        calendarRender()

                        return P
                    } //setDateLimit
                }, //Picker.prototype


                // The element node
                ELEMENT = (function( element ) {

                    // Confirm the focus state, convert the element into
                    // a regular text input to remove user-agent stylings,
                    // and then set it as readonly to prevent keyboard popup
                    element.autofocus = ( element == document.activeElement )
                    element.type = 'text'
                    element.readOnly = true
                    return element
                })( $ELEMENT[ 0 ] ), //ELEMENT


                // The calendar object
                CALENDAR = {
                    id: ~~( Math.random() * 1e9 )
                }, //CALENDAR


                // The classes
                CLASSES = SETTINGS.klass,


                // The date in various formats
                DATE_FORMATS = (function() {

                    // Get the length of the first word
                    function getFirstWordLength( string ) {
                        return string.match( /\w+/ )[ 0 ].length
                    }

                    // If the second character is a digit, length is 2 otherwise 1.
                    function getDigitsLength( string ) {
                        return ( /\d/ ).test( string[ 1 ] ) ? 2 : 1
                    }

                    // Get the length of the month from a string
                    function getMonthLength( string, dateObj, collection ) {

                        // Grab the first word
                        var word = string.match( /\w+/ )[ 0 ]

                        // If there's no index for the date object's month,
                        // find it in the relevant months collection and add 1
                        // because we subtract 1 when we create the date object
                        if ( !dateObj.mm && !dateObj.m ) {
                            dateObj.m = collection.indexOf( word ) + 1
                        }

                        // Return the length of the word
                        return word.length
                    }


                    // Return the date formats object
                    return {
                        d: function( string ) {

                            // If there's string, then get the digits length.
                            // Otherwise return the selected date.
                            return string ? getDigitsLength( string ) : this.DATE
                        },
                        dd: function( string ) {

                            // If there's a string, then the length is always 2.
                            // Otherwise return the selected date with a leading zero.
                            return string ? 2 : leadZero( this.DATE )
                        },
                        ddd: function( string ) {

                            // If there's a string, then get the length of the first word.
                            // Otherwise return the short selected weekday.
                            return string ? getFirstWordLength( string ) : SETTINGS.weekdaysShort[ this.DAY ]
                        },
                        dddd: function( string ) {

                            // If there's a string, then get the length of the first word.
                            // Otherwise return the full selected weekday.
                            return string ? getFirstWordLength( string ) : SETTINGS.weekdaysFull[ this.DAY ]
                        },
                        m: function( string ) {

                            // If there's a string, then get the length of the digits
                            // Otherwise return the selected month with 0index compensation.
                            return string ? getDigitsLength( string ) : this.MONTH + 1
                        },
                        mm: function( string ) {

                            // If there's a string, then the length is always 2.
                            // Otherwise return the selected month with 0index and leading zero.
                            return string ? 2 : leadZero( this.MONTH + 1 )
                        },
                        mmm: function( string, dateObject ) {

                            var collection = SETTINGS.monthsShort

                            // If there's a string, get length of the relevant month string
                            // from the short months collection. Otherwise return the
                            // selected month from that collection.
                            return string ? getMonthLength( string, dateObject, collection ) : collection[ this.MONTH ]
                        },
                        mmmm: function( string, dateObject ) {

                            var collection = SETTINGS.monthsFull

                            // If there's a string, get length of the relevant month string
                            // from the full months collection. Otherwise return the
                            // selected month from that collection.
                            return string ? getMonthLength( string, dateObject, collection ) : collection[ this.MONTH ]
                        },
                        yy: function( string ) {

                            // If there's a string, then the length is always 2.
                            // Otherwise return the selected year by slicing out the first 2 digits.
                            return string ? 2 : ( '' + this.YEAR ).slice( 2 )
                        },
                        yyyy: function( string ) {

                            // If there's a string, then the length is always 4.
                            // Otherwise return the selected year.
                            return string ? 4 : this.YEAR
                        },

                        // Create an array by splitting the format passed
                        toArray: function( format ) { return format.split( /(?=\b)(d{1,4}|m{1,4}|y{4}|yy)+(\b)/g ) }

                    } //endreturn
                })(), //DATE_FORMATS


                // Create calendar object for today
                DATE_TODAY = createDate(),


                // Create the min date
                DATE_MIN = createBoundaryDate( SETTINGS.dateMin ),


                // Create the max date
                // * A truthy second argument creates max date
                DATE_MAX = createBoundaryDate( SETTINGS.dateMax, 1 ),


                // Create a pseudo min and max date for disabled
                // calendars as the respective opposite limit
                PSEUDO_DATE_MIN = DATE_MAX,
                PSEUDO_DATE_MAX = DATE_MIN,


                // Create a collection of dates to disable
                DATES_TO_DISABLE = (function( datesCollection ) {

                    // If a collection was passed
                    // we need to create a calendar date object
                    if ( Array.isArray( datesCollection ) ) {

                        // If the "all" flag is true,
                        // remove the flag from the collection and
                        // flip the condition of which dates to disable
                        if ( datesCollection[ 0 ] === true ) {
                            CALENDAR.disabled = datesCollection.shift()
                        }

                        // Map through the dates passed
                        // and return the collection
                        return datesCollection.map( function( date ) {

                            // If the date is a number, flip the weekdays boolean
                            // and return the date minus 1 for weekday 0index
                            // plus the first day of the week
                            if ( !isNaN( date ) ) {
                                CALENDAR.weekdays = 1
                                return --date + SETTINGS.firstDay
                            }

                            // Otherwise assume it's an array and fix the month 0index
                            --date[ 1 ]

                            // Then create and return the date,
                            // replacing it in the collection
                            return createDate( date )
                        })
                    }
                })( SETTINGS.datesDisabled ), //DATES_TO_DISABLE


                // Create a function that will filter through the dates
                // and return true if looped date is to be disabled
                DISABLED_DATES = (function() {

                    // Check if the looped date should be disabled
                    // based on the time being the same as a disabled date
                    // or the day index being within the collection
                    var isDisabledDate = function( date ) {
                        return this.TIME == date.TIME || DATES_TO_DISABLE.indexOf( this.DAY ) > -1
                    }


                    // If all calendar dates should be disabled
                    if ( CALENDAR.disabled ) {

                        // Map through all the dates to disable
                        DATES_TO_DISABLE.map( function( loopDate ) {

                            // If the looped date is less than the latest lowest date
                            // and greater than the minimum date, then set it as the lowest date
                            if ( loopDate.TIME < PSEUDO_DATE_MIN.TIME && loopDate.TIME > DATE_MIN.TIME ) {
                                PSEUDO_DATE_MIN = loopDate
                            }

                            // If the looped date is more than the latest highest date
                            // and less than the maximum date, then set it as the highest date
                            if ( loopDate.TIME > PSEUDO_DATE_MAX.TIME && loopDate.TIME < DATE_MAX.TIME ) {
                                PSEUDO_DATE_MAX = loopDate
                            }
                        })

                        // Finally, return a function that maps each date
                        // in the collection of dates to not disable.
                        return function( date, i, collection ) {

                            // Map the array of disabled dates and check if this is not one
                            return ( collection.map( isDisabledDate, this ).indexOf( true ) < 0 )
                        }
                    }


                    // Otherwise just return the function that checks if a date is disabled
                    return isDisabledDate
                })(), //DISABLED_DATES


                // Create calendar object for the highlighted day
                DATE_HIGHLIGHTED = (function( dateDataValue, dateEntered ) {

                    // If there a date `data-value`
                    if ( dateDataValue ) {

                        // Set the date entered to an empty object
                        dateEntered = {}

                        // Map through the submit format array
                        DATE_FORMATS.toArray( SETTINGS.formatSubmit ).map( function( formatItem ) {

                            // If the formatting length function exists, invoke it
                            // with the `data-value` and the date we are creating.
                            // Otherwise it's the length of the formatting item being mapped
                            var formattingLength = DATE_FORMATS[ formatItem ] ? DATE_FORMATS[ formatItem ]( dateDataValue, dateEntered ) : formatItem.length

                            // If the formatting length function exists, slice up
                            // the value and pass it into the date we're creating.
                            if ( DATE_FORMATS[ formatItem ] ) {
                                dateEntered[ formatItem ] = dateDataValue.slice( 0, formattingLength )
                            }

                            // Update the remainder of the string by slicing away the format length
                            dateDataValue = dateDataValue.slice( formattingLength )
                        })

                        // Finally, create an array with the date entered while
                        // parsing each item as an integer and compensating for 0index
                        dateEntered = [ +(dateEntered.yyyy || dateEntered.yy), +(dateEntered.mm || dateEntered.m) - 1, +(dateEntered.dd || dateEntered.d) ]
                    }


                    // Otherwise, try to natively parse the date in the input
                    else {
                        dateEntered = Date.parse( dateEntered )
                    }


                    // If there's a valid date in the input or the dateEntered
                    // is now an array, create a validated date with it.
                    // Otherwise set the highlighted date to today after validating.
                    return createValidatedDate( dateEntered && ( !isNaN( dateEntered ) || Array.isArray( dateEntered ) ) ? dateEntered : DATE_TODAY )
                })( ELEMENT.getAttribute( 'data-value' ), ELEMENT.value ),


                // The date selected is initially the date highlighted
                DATE_SELECTED = DATE_HIGHLIGHTED,


                // Month focused is based on highlighted date
                MONTH_FOCUSED = DATE_HIGHLIGHTED,


                // If there's a format for the hidden input element, create the element
                // using the name of the original input plus suffix and update the value
                // with whatever is entered in the input on load. Otherwise set it to null.
                ELEMENT_HIDDEN = SETTINGS.formatSubmit ? $( '<input type=hidden name=' + ELEMENT.name + SETTINGS.hiddenSuffix + '>' ).val( ELEMENT.value ? getDateFormatted( SETTINGS.formatSubmit ) : '' )[ 0 ] : null,


                // Create the calendar table head with weekday labels
                // by "copying" the weekdays collection based on the settings.
                // * We do a copy so we don't mutate the original array.
                TABLE_HEAD = (function( weekdaysCollection ) {

                    // If the first day should be Monday
                    if ( SETTINGS.firstDay ) {

                        // Grab Sunday and push it to the end of the collection
                        weekdaysCollection.push( weekdaysCollection.splice( 0, 1 )[ 0 ] )
                    }

                    // Go through each day of the week
                    // and return a wrapped header row.
                    // Take the result and apply another
                    // table head wrapper to group it all.
                    return createNode( 'thead',
                        createNode( 'tr',
                            weekdaysCollection.map( function( weekday ) {
                                return createNode( 'th', weekday, CLASSES.weekdays )
                            })
                        )
                    )
                })( ( SETTINGS.showWeekdaysShort ? SETTINGS.weekdaysShort : SETTINGS.weekdaysFull ).slice( 0 ) ), //TABLE_HEAD


                // Create the calendar holder with a new wrapped calendar and bind the events
                $HOLDER = $( createNode( STRING_DIV, createCalendarWrapped(), CLASSES.holder ) ).on( 'mousedown', function( event ) {

                    // If the target of the event is not one of the calendar items,
                    // prevent default action to keep focus on the input element
                    if ( getCalendarItems().indexOf( event.target ) < 0 ) {
                        event.preventDefault()
                    }

                }).on( 'click', function( event ) {

                    // If the calendar is closed and there appears to be no click, do nothing
                    // * This is done to prevent the "enter" key propagating as a click.
                    //   On all browsers (except old IEs) the client click x & y are 0.
                    if ( !CALENDAR.isOpen && !event.clientX && !event.clientY ) {
                        return
                    }

                    var
                        dateToSelect,

                        // Get the jQuery target
                        $target = $( event.target ),

                        // Get the target data
                        targetData = $target.data()


                    // Stop the event from bubbling to the document
                    event.stopPropagation()


                    // Put focus back onto the element
                    ELEMENT.focus()

                    // For IE, set the calendar to force close
                    // * This needs to be after `ELEMENT.focus()`
                    CALENDAR._IE = 1


                    // If a navigator button was clicked,
                    // show the month in the relative direction
                    if ( targetData.nav ) {
                        showMonth( MONTH_FOCUSED.MONTH + targetData.nav )
                    }

                    // If a clear button was clicked,
                    // clear the elements value and then close it
                    else if ( targetData.clear ) {
                        P.clear().close()
                    }

                    // If a date was clicked
                    else if ( targetData.date ) {

                        // Split the target data into an array
                        dateToSelect = targetData.date.split( '/' )

                        // Set the date and then close the calendar
                        P.setDate( +dateToSelect[ 0 ], +dateToSelect[ 1 ], +dateToSelect[ 2 ] ).close()
                    }

                    // If the target is the holder, close the picker
                    else if ( $target[ 0 ] == $HOLDER[ 0 ] ) {
                        P.close()
                    }
                }), // $HOLDER


                // Translate a keycode to a relative change in date
                KEYCODE_TO_DATE = {

                    // Down
                    40: 7,

                    // Up
                    38: -7,

                    // Right
                    39: 1,

                    // Left
                    37: -1
                } //KEYCODE_TO_DATE



            /**
             * Create a bounding date allowed on the calendar
             * * A truthy second argument creates the upper boundary
             */
            function createBoundaryDate( limit, upper ) {

                // If the limit is set to true, just return today
                if ( limit === true ) {
                    return DATE_TODAY
                }

                // If the limit is an array, construct the date
                // while fixing month 0index
                if ( Array.isArray( limit ) ) {
                    --limit[ 1 ]
                    return createDate( limit )
                }

                // If there is a limit and its a number, create a
                // calendar date relative to today by adding the limit
                if ( limit && !isNaN( limit ) ) {
                    return createDate([ DATE_TODAY.YEAR, DATE_TODAY.MONTH, DATE_TODAY.DATE + limit ])
                }

                // Otherwise create an infinite date
                return createDate( 0, upper ? Infinity : -Infinity )
            } //createBoundaryDate


            /**
             * Create a validated date
             */
            function createValidatedDate( datePassed, direction, skipMonthCheck ) {


                // If the date passed isn't a date, create one
                datePassed = !datePassed.TIME ? createDate( datePassed ) : datePassed


                // If there are disabled dates
                if ( DATES_TO_DISABLE ) {

                    // Create a reference to the original date passed
                    var originalDate = datePassed

                    // Check if this date is disabled. If it is,
                    // then keep adding the direction (or 1) to the date
                    // until we get to a date that's enabled.
                    while ( DATES_TO_DISABLE.filter( DISABLED_DATES, datePassed ).length ) {

                        // If the calendar "disabled" flag is truthy and the weekdays are also disabled
                        if ( CALENDAR.disabled && !CALENDAR.weekdays ) {

                            // If the date is less than the pseudo min date or greater than pseudo max date,
                            // set it as the pseudo date limit. Otherwise keep it the same.
                            datePassed = datePassed.TIME < PSEUDO_DATE_MIN.TIME ? PSEUDO_DATE_MIN : datePassed.TIME > PSEUDO_DATE_MAX.TIME ? PSEUDO_DATE_MAX : datePassed

                            // Break out to avoid infinite loop
                            break
                        }

                        // Otherwise create the next date based on the direction
                        datePassed = createDate([ datePassed.YEAR, datePassed.MONTH, datePassed.DATE + ( direction || 1 ) ])

                        // Check if the month check should be skipped to avoid extra loops.
                        // Otherwise if we've gone through to another month, create a new
                        // date based on the direction being less than zero (rather than more).
                        // Then set this new date as the original and looped date.
                        if ( !skipMonthCheck && datePassed.MONTH != originalDate.MONTH ) {
                            originalDate = datePassed = createDate([ originalDate.YEAR, originalDate.MONTH, direction < 0 ? --originalDate.DATE : ++originalDate.DATE ])
                        }
                    }
                }


                // If it's less that min date, set it to min date
                // by creating a validated date by adding one
                // until we find an enabled date
                // * A truthy third argument skips the month check
                if ( datePassed.TIME < DATE_MIN.TIME ) {
                    datePassed = createValidatedDate( DATE_MIN, 1, 1 )
                }


                // If it's more than max date, set it to max date
                // by creating a validated date by subtracting one
                // until we find an enabled date
                // * A truthy third argument skips the month check
                else if ( datePassed.TIME > DATE_MAX.TIME ) {
                    datePassed = createValidatedDate( DATE_MAX, -1, 1 )
                }


                // Finally, return the date
                return datePassed
            } //createValidatedDate


            /**
             * Create the nav for next/prev month
             */
            function createMonthNav( next ) {

                // If the focused month is outside the range
                // return an empty string
                if ( ( next && MONTH_FOCUSED.YEAR >= DATE_MAX.YEAR && MONTH_FOCUSED.MONTH >= DATE_MAX.MONTH ) || ( !next && MONTH_FOCUSED.YEAR <= DATE_MIN.YEAR && MONTH_FOCUSED.MONTH <= DATE_MIN.MONTH ) ) {
                    return ''
                }

                var monthTag = 'month' + ( next ? 'Next' : 'Prev' )

                // Otherwise, return the created tag
                return createNode( STRING_DIV,
                    SETTINGS[ monthTag ],
                    CLASSES[ monthTag ],
                    'data-nav=' + ( next || -1 )
                ) //endreturn
            } //createMonthNav


            /**
             * Create the month label
             */
            function createMonthLabel( monthsCollection ) {


                // If there's a need for a month selector
                return SETTINGS.monthSelector ?

                    // Create the dom string node for a select element
                    createNode( 'select',

                        // Map through the months collection
                        monthsCollection.map( function( month, monthIndex ) {

                            // Create a dom string node for each option
                            return createNode( 'option',

                                // With the month and no classes
                                month, 0,

                                // Set the value and selected index
                                'value=' + monthIndex + ( MONTH_FOCUSED.MONTH == monthIndex ? ' selected' : '' ) +

                                // Plus the disabled attribute if it's outside the range
                                getMonthInRange( monthIndex, MONTH_FOCUSED.YEAR, ' disabled', '' )
                            )
                        }),

                        // The month selector class
                        CLASSES.selectMonth,

                        // And some tabindex
                        getTabindexState()

                    // Otherwise just return the month focused
                    ) : createNode( STRING_DIV, monthsCollection[ MONTH_FOCUSED.MONTH ], CLASSES.month )
            } //createMonthLabel


            /**
             * Create the year label
             */
            function createYearLabel() {

                var
                    yearFocused = MONTH_FOCUSED.YEAR,
                    yearsInSelector = SETTINGS.yearSelector


                // If there is a need for a years selector
                // then create a dropdown within the valid range
                if ( yearsInSelector ) {

                    // If year selector setting is true, default to 5.
                    // Otherwise divide the years in selector in half
                    // to get half before and half after
                    yearsInSelector = yearsInSelector === true ? 5 : ~~( yearsInSelector / 2 )

                    var
                        // Create a collection to hold the years
                        yearsCollection = [],

                        // The lowest year possible is the difference between
                        // the focused year and the number of years in the selector
                        lowestYear = yearFocused - yearsInSelector,

                        // The first year is the lower of the two numbers:
                        // the lowest year or the minimum year.
                        firstYear = getNumberInRange( lowestYear, DATE_MIN.YEAR ),

                        // The highest year is the sum of the focused year
                        // and the years in selector plus the left over years.
                        highestYear = yearFocused + yearsInSelector + ( firstYear - lowestYear ),

                        // The last year is the higher of the two numbers:
                        // the highest year or the maximum year.
                        lastYear = getNumberInRange( highestYear, DATE_MAX.YEAR, 1 )


                    // In case there are leftover years to put in the selector,
                    // we need to get the lower of the two numbers:
                    // the lowest year minus leftovers, or the minimum year
                    firstYear = getNumberInRange( lowestYear - ( highestYear - lastYear ), DATE_MIN.YEAR )


                    // Add the years to the collection by looping through the range
                    for ( var index = 0; index <= lastYear - firstYear; index += 1 ) {
                        yearsCollection.push( firstYear + index )
                    }


                    // Create the dom string node for a select element
                    return createNode( 'select',

                        // Map through the years collection
                        yearsCollection.map( function( year ) {

                            // Create a dom string node for each option
                            return createNode( 'option',

                                // With the year and no classes
                                year, 0,

                                // Set the value and selected index
                                'value=' + year + ( yearFocused == year ? ' selected' : '' )
                            )
                        }),

                        // The year selector class
                        CLASSES.selectYear,

                        // And some tabindex
                        getTabindexState()
                    )
                }


                // Otherwise just return the year focused
                return createNode( STRING_DIV, yearFocused, CLASSES.year )
            } //createYearLabel


            /**
             * Create the calendar table body
             */
            function createTableBody() {

                var
                    // The loop date object
                    loopDate,

                    // A pseudo index will be the divider between
                    // the previous month and the focused month
                    pseudoIndex,

                    // An array that will hold the classes
                    // and binding for each looped date
                    classAndBinding,

                    // Collection of the dates visible on the calendar
                    // * This gets discarded at the end
                    calendarDates = [],

                    // Weeks visible on the calendar
                    calendarWeeks = '',

                    // Count the number of days in the focused month
                    // by getting the 0-th date of the next month
                    countMonthDays = createDate([ MONTH_FOCUSED.YEAR, MONTH_FOCUSED.MONTH + 1, 0 ]).DATE,

                    // Count the days to shift the start of the month
                    // by getting the day the first of the month falls on
                    // and subtracting 1 to compensate for day 1index
                    // or 2 if "Monday" should be the first day.
                    countShiftby = createDate([ MONTH_FOCUSED.YEAR, MONTH_FOCUSED.MONTH, 1 ]).DAY + ( SETTINGS.firstDay ? -2 : -1 ),


                    // Set the class and binding for each looped date.
                    // Returns an array with 2 items:
                    // 1) The classes string
                    // 2) The data binding string
                    createDateClassAndBinding = function( loopDate, isMonthFocused ) {

                        var
                            // State check for date
                            isDateDisabled,

                            // Create a collection for the classes
                            // with the default classes already included
                            klassCollection = [

                                // The generic day class
                                CLASSES.day,

                                // The class for in or out of focus
                                ( isMonthFocused ? CLASSES.dayInfocus : CLASSES.dayOutfocus )
                            ]


                        // If it's less than the minimum date
                        // or greater than the maximum date
                        // or if there are dates to disable
                        // and this looped date is one of them
                        if ( loopDate.TIME < DATE_MIN.TIME || loopDate.TIME > DATE_MAX.TIME || ( DATES_TO_DISABLE && DATES_TO_DISABLE.filter( DISABLED_DATES, loopDate ).length ) ) {

                            // Make the state truthy
                            isDateDisabled = 1

                            // Add the disabled class
                            klassCollection.push( CLASSES.dayDisabled )
                        }


                        // If it's today, add the class
                        if ( loopDate.TIME == DATE_TODAY.TIME ) {
                            klassCollection.push( CLASSES.dayToday )
                        }


                        // If it's the highlighted date, add the class
                        if ( loopDate.TIME == DATE_HIGHLIGHTED.TIME ) {
                            klassCollection.push( CLASSES.dayHighlighted )
                        }


                        // If it's the selected date, add the class
                        if ( loopDate.TIME == DATE_SELECTED.TIME ) {
                            klassCollection.push( CLASSES.daySelected )
                        }


                        // Return an array with the classes and data binding
                        return [

                            // Return the classes joined
                            // by a single whitespace
                            klassCollection.join( ' ' ),

                            // Create the data binding object
                            // with the value as a string
                            'data-' + ( isDateDisabled ? 'disabled' : 'date' ) + '=' + [
                                loopDate.YEAR,
                                loopDate.MONTH + 1, // add 1 to display an accurate date
                                loopDate.DATE
                            ].join( '/' )
                        ]
                    } //createDateClassAndBinding


                // If the count to shift by is less than the first day
                // of the month, then add a week.
                countShiftby += countShiftby < -1 ? 7 : 0


                // Go through all the days in the calendar
                // and map a calendar date
                for ( var index = 0; index < DAYS_IN_CALENDAR; index += 1 ) {

                    // Get the distance between the index and the count
                    // to shift by. This will serve as the separator
                    // between the previous, current, and next months.
                    pseudoIndex = index - countShiftby


                    // Create a calendar date with a negative or positive pseudoIndex
                    loopDate = createDate([ MONTH_FOCUSED.YEAR, MONTH_FOCUSED.MONTH, pseudoIndex ])


                    // Set the date class and bindings on the looped date.
                    // If the pseudoIndex is greater than zero,
                    // and less or equal to the days in the month,
                    // we need dates from the focused month.
                    classAndBinding = createDateClassAndBinding( loopDate, ( pseudoIndex > 0 && pseudoIndex <= countMonthDays ) )


                    // Create the looped date wrapper,
                    // and then create the table cell wrapper
                    // and finally pass it to the calendar array
                    calendarDates.push( createNode( 'td', createNode( STRING_DIV, loopDate.DATE, classAndBinding[ 0 ], classAndBinding[ 1 ] ) ) )


                    // Check if it's the end of a week.
                    // * We add 1 for 0index compensation
                    if ( ( index % DAYS_IN_WEEK ) + 1 == DAYS_IN_WEEK ) {

                        // Wrap the week and append it into the calendar weeks
                        calendarWeeks += createNode( 'tr', calendarDates.splice( 0, DAYS_IN_WEEK ) )
                    }

                } //endfor



                // Join the dates and wrap the calendar body
                return createNode( 'tbody', calendarWeeks, CLASSES.body )
            } //createTableBody


            /**
             * Create the "today" and "clear" buttons
             */
            function createTodayAndClear() {

                // Create and return the button nodes
                return createNode( 'button', SETTINGS.today, CLASSES.buttonToday, 'data-date=' + getDateFormatted( 'yyyy/mm/dd', DATE_TODAY ) + ' ' + getTabindexState() ) + createNode( 'button', SETTINGS.clear, CLASSES.buttonClear, 'data-clear=1 ' + getTabindexState() )
            } //createTodayAndClear


            /**
             * Create the wrapped calendar
             * using the collection of calendar items
             * and creating a new table body
             */
            function createCalendarWrapped() {

                // Create a calendar wrapper node
                return createNode( STRING_DIV,

                    // Create a calendar frame
                    createNode( STRING_DIV,

                        // Create a calendar box node
                        createNode( STRING_DIV,

                            // The calendar header
                            createNode( STRING_DIV,

                                // The prev/next month tags
                                // * Truthy argument creates "next" tag
                                createMonthNav() + createMonthNav( 1 ) +

                                // Create the month label
                                createMonthLabel( SETTINGS.showMonthsFull ? SETTINGS.monthsFull : SETTINGS.monthsShort ) +

                                // Create the year label
                                createYearLabel(),

                                // The header class
                                CLASSES.header
                             ) +

                            // The calendar table with table head
                            // and a new calendar table body
                            createNode( 'table', [ TABLE_HEAD, createTableBody() ], CLASSES.table ) +

                            // Create the "today" and "clear" buttons
                            createNode( STRING_DIV, createTodayAndClear(), CLASSES.footer ),

                            // Calendar class
                            CLASSES.calendar
                        ),

                        // Calendar wrap class
                        CLASSES.wrap
                    ),

                    // Calendar frame class
                    CLASSES.frame
                ) //endreturn
            } //calendarWrapped


            /**
             * Get the number that's allowed within an
             * upper or lower limit. A truthy third argument
             * tests against the upper limit.
             */
            function getNumberInRange( number, limit, upper ) {

                // If we need to test against the upper limit
                // and number is less than the limit,
                // or we need to test against the lower limit
                // and number is more than the limit,
                // return the number. Otherwise return the limit.
                return ( upper && number < limit ) || ( !upper && number > limit ) ? number : limit
            } //getNumberInRange


            /**
             * Return a month by comparing with the date range.
             * If outside the range, returns the value passed.
             * Otherwise returns the "in range" value or the month itself.
             */
            function getMonthInRange( month, year, alternateValue, inRangeValue ) {

                // If the month is less than the min month,
                // then return the alternate value or min month.
                if ( year <= DATE_MIN.YEAR && month < DATE_MIN.MONTH ) {
                    return alternateValue || DATE_MIN.MONTH
                }

                // If the month is more than the max month,
                // then return the alternate value or max month.
                if ( year >= DATE_MAX.YEAR && month > DATE_MAX.MONTH ) {
                    return alternateValue || DATE_MAX.MONTH
                }

                // Otherwise return the "in range" value
                // or the month itself.
                // * We test `inRangeValue` against null
                //   because we need to test against null
                //   and undefined. 0 should be allowed.
                return inRangeValue != null ? inRangeValue : month
            } //getMonthInRange


            /**
             * Get the tabindex based on the calendar open/closed state
             */
            function getTabindexState() {
                return 'tabindex=' + ( CALENDAR.isOpen ? 0 : -1 )
            }


            /**
             * Get any date in any format. Defaults to getting
             * the superficially selected date.
             */
            function getDateFormatted( format, date ) {

                // Otherwise go through the date formats array and
                // convert the format passed into an array to map
                // which we join into a string at the end.
                return DATE_FORMATS.toArray( format || SETTINGS.format ).map( function( value ) {

                    // Trigger the date formats function
                    // or just return value itself.
                    return triggerFunction( DATE_FORMATS[ value ], date || DATE_SELECTED ) || value
                }).join( '' )
            } //getDateFormatted


            /**
             * Set a date as selected or superficially selected
             */
            function setDateSelected( dateTargeted, isSuperficial ) {

                // Set the target as the highlight
                DATE_HIGHLIGHTED = dateTargeted

                // Set the target as the focus
                MONTH_FOCUSED = dateTargeted

                // If it's not just a superficial selection,
                // update the input elements values
                if ( !isSuperficial ) {
                    setElementsValue( dateTargeted )
                }

                // Then render a new calendar
                calendarRender()
            } //setDateSelected


            /**
             * Set the date in the input element and hidden input
             */
            function setElementsValue( dateTargeted ) {

                // If there's a date targeted, update the selected date
                DATE_SELECTED = dateTargeted || DATE_SELECTED

                // Set the element value as the formatted date
                // if there was a date targeted. Otherwise clear it.
                // And then broadcast a change event.
                $ELEMENT.val( dateTargeted ? getDateFormatted() : '' ).trigger( 'change' )

                // If there's a hidden input, set the value with the submit format
                // if there's a date targeted. Otherwise clear it.
                if ( ELEMENT_HIDDEN ) {
                    ELEMENT_HIDDEN.value = dateTargeted ? getDateFormatted( SETTINGS.formatSubmit ) : ''
                }

                // Trigger the onSelect method within scope of the picker
                triggerFunction( SETTINGS.onSelect, P )
            } //setElementsValue


            /**
             * Find something within the calendar holder
             */
            function $findInHolder( klass ) {
                return $HOLDER.find( '.' + klass )
            } //$findInHolder


            /**
             * Show the month visible on the calendar
             */
            function showMonth( month, year ) {

                // Ensure we have a year to work with
                year = year || MONTH_FOCUSED.YEAR

                // Get the month to be within
                // the minimum and maximum date limits
                month = getMonthInRange( month, year )

                // Set the month to show in focus
                // * We set the date to 1st of the month
                //   because date doesn't matter here
                MONTH_FOCUSED = createDate([ year, month, 1 ])

                // Then render a new calendar
                calendarRender()
            } //showMonth


            /**
             * Toggle the calendar elements as "tab-able"
             */
            function toggleCalendarElements( tabindex ) {

                // Create a collection of calendar items and
                // set each items tabindex
                getCalendarItems().map( function( item ) {
                    if ( item ) item.tabIndex = tabindex
                })
            } //toggleCalendarElements


            /**
             * Return a collection of all the calendar items
             */
            function getCalendarItems() {
                return [
                    CALENDAR.selectMonth,
                    CALENDAR.selectYear,
                    $findInHolder( CLASSES.buttonToday )[ 0 ],
                    $findInHolder( CLASSES.buttonClear )[ 0 ]
                ]
            } //getCalendarItems


            /**
             * Render a new calendar
             */
            function calendarRender() {

                // Create a new wrapped calendar
                // and place it within the holder
                $HOLDER.html( createCalendarWrapped() )

                // Do stuff after rendering the calendar
                postRender()

                // added ncloud
                var $frame = $HOLDER.find('.' + CLASSES.frame)
                var to_y = Math.round(($HOLDER.height() - $frame.outerHeight()) / 2);
                if(to_y < 0) to_y = 0;
                $frame.css('top', to_y + 'px')
                
            } //calendarRender


            /**
             * Stuff to do after a calendar has been rendered
             */
            function postRender() {

                // Find and store the month selector
                CALENDAR.selectMonth = $findInHolder( CLASSES.selectMonth ).on({

                    // *** For iOS ***
                    click: function( event ) { event.stopPropagation() },

                    // Bind the change event
                    change: function() {

                        // Show the month based on the option selected
                        // while parsing as a float
                        showMonth( +this.value )

                        // Find the new month selector and focus back on it
                        $findInHolder( CLASSES.selectMonth ).focus()
                    }
                })[ 0 ]

                // Find and store the year selector
                CALENDAR.selectYear = $findInHolder( CLASSES.selectYear ).on({

                    // *** For iOS ***
                    click: function( event ) { event.stopPropagation() },

                    // Bind the change event
                    change: function() {

                        // Show the year based on the option selected
                        // and month currently in focus while parsing as a float
                        showMonth( MONTH_FOCUSED.MONTH, +this.value )

                        // Find the new year selector and focus back on it
                        $findInHolder( CLASSES.selectYear ).focus()
                    }
                })[ 0 ]
            } //postRender


            // Return a new initialized picker
            return new P.init()
        } //Picker





    /**
     * Helper functions
     */

    // Check if a value is a function and trigger it, if that
    function triggerFunction( callback, scope ) {
        if ( typeof callback == 'function' ) {
            return callback.call( scope )
        }
    }

    // Return numbers below 10 with a leading zero
    function leadZero( number ) {
        return ( number < 10 ? '0': '' ) + number
    }

    // Create a dom node string
    function createNode( wrapper, item, klass, attribute ) {

        // If the item is false-y, just return an empty string
        if ( !item ) return ''

        // If the item is an array, do a join
        item = Array.isArray( item ) ? item.join( '' ) : item

        // Check for the class
        klass = klass ? ' class="' + klass + '"' : ''

        // Check for any attributes
        attribute = attribute ? ' ' + attribute : ''

        // Return the wrapped item
        return '<' + wrapper + klass + attribute + '>' + item + '</' + wrapper + '>'
    } //createNode

    // Create a calendar date
    function createDate( datePassed, unlimited ) {

        // If the date passed is an array
        if ( Array.isArray( datePassed ) ) {

            // Create the date
            datePassed = new Date( datePassed[ 0 ], datePassed[ 1 ], datePassed[ 2 ] )
        }

        // If the date passed is a number
        else if ( !isNaN( datePassed ) ) {

            // Create the date
            datePassed = new Date( datePassed )
        }


        // Otherwise if it's not unlimited
        else if ( !unlimited ) {

            // Set the date to today
            datePassed = new Date()

            // Set the time to midnight (for comparison purposes)
            datePassed.setHours( 0, 0, 0, 0 )
        }


        // Return the calendar date object
        return {
            YEAR: unlimited || datePassed.getFullYear(),
            MONTH: unlimited || datePassed.getMonth(),
            DATE: unlimited || datePassed.getDate(),
            DAY: unlimited || datePassed.getDay(),
            TIME: unlimited || datePassed.getTime(),
            OBJ: unlimited || datePassed
        }
    } //createDate




    /**
     * Extend jQuery
     */
    $.fn.pickadate = function( options ) {

        var pickadate = 'pickadate'

        // Merge the options with a deep copy
        options = $.extend( true, {}, $.fn.pickadate.defaults, options )

        // Check if it should be disabled
        // for browsers that natively support `type=date`
        if ( options.disablePicker ) { return this }

        return this.each( function() {
            var $this = $( this )
            if ( this.nodeName == 'INPUT' && !$this.data( pickadate ) ) {
                $this.data( pickadate, new Picker( $this, options ) )
            }
        })
    } //$.fn.pickadate



    /**
     * Default options for the picker
     */
    $.fn.pickadate.defaults = {

        monthsFull: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
        monthsShort: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],

        weekdaysFull: [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ],
        weekdaysShort: [ '일', '월', '화', '수', '목', '금', '토' ],

        // Display strings
        monthPrev: '&#9664;',
        monthNext: '&#9654;',
        showMonthsFull: 1,
        showWeekdaysShort: 1,

        // Today and clear
        today: 'Today',
        clear: 'Clear',

        // Date format to show on the input element
        format: 'yyyy-mm-dd',

        // Date format to send to the server
        formatSubmit: 'yyyy-mm-dd',

        // Hidden element name suffix
        hiddenSuffix: '_submit',

        // First day of the week: 0 = Sunday, 1 = Monday
        firstDay: 0,

        // Month & year dropdown selectors
        monthSelector: 0,
        yearSelector: 0,

        // Date ranges
        dateMin: 0,
        dateMax: 0,

        // Dates to disable
        datesDisabled: 0,

        // Disable for browsers with native date support
        disablePicker: 0,

        // Events
        onOpen: 0,
        onClose: 0,
        onSelect: 0,
        onStart: 0,


        // Classes
        klass: {

            bodyActive: STRING_PREFIX_DATEPICKER + 'active',

            inputActive: STRING_PREFIX_DATEPICKER + 'input--active',

            holder: STRING_PREFIX_DATEPICKER + 'holder',
            opened: STRING_PREFIX_DATEPICKER + 'holder--opened',
            focused: STRING_PREFIX_DATEPICKER + 'holder--focused',

            frame: STRING_PREFIX_DATEPICKER + 'frame',
            wrap: STRING_PREFIX_DATEPICKER + 'wrap',

            calendar: STRING_PREFIX_DATEPICKER + 'calendar',

            table: STRING_PREFIX_DATEPICKER + 'table',

            header: STRING_PREFIX_DATEPICKER + 'header',

            monthPrev: STRING_PREFIX_DATEPICKER + 'nav--prev',
            monthNext: STRING_PREFIX_DATEPICKER + 'nav--next',

            month: STRING_PREFIX_DATEPICKER + 'month',
            year: STRING_PREFIX_DATEPICKER + 'year',

            selectMonth: STRING_PREFIX_DATEPICKER + 'select--month',
            selectYear: STRING_PREFIX_DATEPICKER + 'select--year',

            weekdays: STRING_PREFIX_DATEPICKER + 'weekday',

            body: STRING_PREFIX_DATEPICKER + 'body',

            day: STRING_PREFIX_DATEPICKER + 'day',
            dayDisabled: STRING_PREFIX_DATEPICKER + 'day--disabled',
            daySelected: STRING_PREFIX_DATEPICKER + 'day--selected',
            dayHighlighted: STRING_PREFIX_DATEPICKER + 'day--highlighted',
            dayToday: STRING_PREFIX_DATEPICKER + 'day--today',
            dayInfocus: STRING_PREFIX_DATEPICKER + 'day--infocus',
            dayOutfocus: STRING_PREFIX_DATEPICKER + 'day--outfocus',

            footer: STRING_PREFIX_DATEPICKER + 'footer',

            buttonClear: STRING_PREFIX_DATEPICKER + 'button--clear',
            buttonToday: STRING_PREFIX_DATEPICKER + 'button--today'
        }
    } //$.fn.pickadate.defaults



})( jQuery, document );


// @fileRef jquery.datetime.js 

/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
/*!
 * jQuery MobiScroll v2.3
 * http://mobiscroll.com
 *
 * Copyright 2010-2011, Acid Media
 * Licensed under the MIT license.
 *
 */
(function ($) {

    function Scroller(elem, settings) {
        var that = this,
            ms = $.mobiscroll,
            e = elem,
            elm = $(e),
            theme,
            lang,
            s = extend({}, defaults),
            pres = {},
            m,
            hi,
            v,
            dw,
            warr = [],
            iv = {},
            input = elm.is('input'),
            visible = false;

        // Private functions

        function isReadOnly(wh) {
            if ($.isArray(s.readonly)) {
                var i = $('.dwwl', dw).index(wh);
                return s.readonly[i];
            }
            return s.readonly;
        }

        function generateWheelItems(i) {
            var html = '<div class="dw-bf">',
                l = 1,
                j;

            for (j in warr[i]) {
                if (l % 20 == 0) {
                    html += '</div><div class="dw-bf">';
                }
                html += '<div class="dw-li dw-v" data-val="' + j + '" style="height:' + hi + 'px;line-height:' + hi + 'px;"><div class="dw-i">' + warr[i][j] + '</div></div>';
                l++;
            }
            html += '</div>';
            return html;
        }

        function getDocHeight() {
            var body = document.body,
                html = document.documentElement;
            return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        }

        function setGlobals(t) {
            min = $('.dw-li', t).index($('.dw-v', t).eq(0)),//$('.dw-v', t).eq(0).index(),
            max = $('.dw-li', t).index($('.dw-v', t).eq(-1)),//$('.dw-v', t).eq(-1).index(),
            index = $('.dw-ul', dw).index(t);
            h = hi;
            inst = that;
        }

        function formatHeader(v) {
            var t = s.headerText;
            return t ? (typeof (t) == 'function' ? t.call(e, v) : t.replace(/\{value\}/i, v)) : '';
        }

        function read() {
            that.temp = ((input && (that.val !== null && that.val != elm.val() || !elm.val().length)) || that.values === null) ? s.parseValue(elm.val() || '', that) : that.values.slice(0);
            that.setValue(true);
        }

        function scrollToPos(time, index, manual, dir) {
            // Call validation event
            if (event('validate', [dw, index]) !== false) {

                // Set scrollers to position
                $('.dw-ul', dw).each(function (i) {
                    var t = $(this),
                        cell = $('.dw-li[data-val="' + that.temp[i] + '"]', t),
                        v = $('.dw-li', t).index(cell),
                        sc = i == index || index === undefined;

                    // Scroll to a valid cell
                    if (!cell.hasClass('dw-v')) {
                        var cell1 = cell,
                            cell2 = cell,
                            dist1 = 0,
                            dist2 = 0;
                        while (cell1.prev().length && !cell1.hasClass('dw-v')) {
                            cell1 = cell1.prev();
                            dist1++;
                        }
                        while (cell2.next().length && !cell2.hasClass('dw-v')) {
                            cell2 = cell2.next();
                            dist2++;
                        }
                        // If we have direction (+/- or mouse wheel), the distance does not count
                        if (((dist2 < dist1 && dist2 && dir !== 2) || !dist1 || !(cell1.hasClass('dw-v')) || dir == 1) && cell2.hasClass('dw-v')) {
                            cell = cell2;
                            v = v + dist2;
                        } else {
                            cell = cell1;
                            v = v - dist1;
                        }
                    }

                    if (!(cell.hasClass('dw-sel')) || sc) {
                        // Set valid value
                        that.temp[i] = cell.attr('data-val');

                        // Add selected class to cell
                        $('.dw-sel', t).removeClass('dw-sel');
                        cell.addClass('dw-sel');

                        // Scroll to position
                        that.scroll(t, i, v, time);
                    }
                });
            }
            
            // Reformat value if validation changed something
            that.change(manual);
        }

        function position() {

            if (s.display == 'inline') {
                return;
            }

            function countWidth() {
                $('.dwc', dw).each(function () {
                    //if ($(this).css('display') != 'none') {
                        w = $(this).outerWidth(true);
                        totalw += w;
                        minw = (w > minw) ? w : minw;
                    //}
                });
                w = totalw > ww ? minw : totalw;
                w = $('.dwwr', dw).width(w + 1).outerWidth();
                h = d.outerHeight();
            }

            var totalw = 0,
                minw = 0,
                ww = $(window).width(),
                wh = window.innerHeight,
                st = $(window).scrollTop(),
                d = $('.dw', dw),
                w,
                t,
                l,
                h,
                ew,
                css = {},
                needScroll,
                elma = s.anchor === undefined ? elm : s.anchor;

            wh = wh || $(window).height();

            if (s.display == 'modal') {
                countWidth();
                l = (ww - w) / 2;
                t = st + (wh - h) / 2;
            } else if (s.display == 'bubble') {
                countWidth();
                var p = elma.offset(),
                    poc = $('.dw-arr', dw),
                    pocw = $('.dw-arrw-i', dw),
                    wd = d.outerWidth();

                // horizontal positioning
                ew = elma.outerWidth();
                l = p.left - (d.outerWidth(true) - ew) / 2;
                l = l > (ww - wd) ? (ww - (wd + 20)) : l;
                l = l >= 0 ? l : 20;

                // vertical positioning
                t = p.top - (d.outerHeight() + 3); // above the input
                if ((t < st) || (p.top > st + wh)) { // if doesn't fit above or the input is out of the screen
                    d.removeClass('dw-bubble-top').addClass('dw-bubble-bottom');
                    t = p.top + elma.outerHeight() + 3; // below the input
                    needScroll = ((t + d.outerHeight(true) > st + wh) || (p.top > st + wh));
                } else {
                    d.removeClass('dw-bubble-bottom').addClass('dw-bubble-top');
                }

                t = t >= st ? t : st;

                // Calculate Arrow position
                var pl = p.left + ew / 2 - (l + (wd - pocw.outerWidth()) / 2);

                // Limit Arrow position to [0, pocw.width] intervall
                if (pl > pocw.outerWidth()) {
                    pl = pocw.outerWidth();
                }

                poc.css({ left: pl });
            } else {
                css.width = '100%';
                if (s.display == 'top') {
                    t = st;
                } else if (s.display == 'bottom') {
                    t = st + wh - d.outerHeight();
                    t = t >= 0 ? t : 0;
                }
            }
            css.top = t;
            css.left = l;
            d.css(css);

            $('.dwo, .dw-persp', dw).height(0).height(getDocHeight());

            if (needScroll) {
                $(window).scrollTop(t + d.outerHeight(true) - wh);
            }
        }

        function event(name, args) {
            var ret;
            args.push(that);
            $.each([pres, settings], function (i, v) {
                if (v[name]) { // Call preset event
                    ret = v[name].apply(e, args)
                }
            });
            return ret;
        }

        function plus(t) {
            var p = +t.data('pos'),
                val = p + 1;
            calc(t, val > max ? min : val, 1);
        }

        function minus(t) {
            var p = +t.data('pos'),
                val = p - 1;
            calc(t, val < min ? max : val, 2);
        }

        // Public functions

        /**
        * Enables the scroller and the associated input.
        */
        that.enable = function () {
            s.disabled = false;
            if (input) {
                elm.prop('disabled', false);
            }
        };

        /**
        * Disables the scroller and the associated input.
        */
        that.disable = function () {
            s.disabled = true;
            if (input) {
                elm.prop('disabled', true);
            }
        };

        /**
        * Scrolls target to the specified position
        * @param {Object} t - Target wheel jQuery object.
        * @param {Number} index - Index of the changed wheel.
        * @param {Number} val - Value.
        * @param {Number} time - Duration of the animation, optional.
        * @param {Number} orig - Original value.
        */
        that.scroll = function (t, index, val, time, orig, callback) {

            function getVal(t, b, c, d) {
                return c * Math.sin(t / d * (Math.PI / 2)) + b;
            }

            function ready() {
                clearInterval(iv[index]);
                iv[index] = undefined;
                t.data('pos', val).closest('.dwwl').removeClass('dwa');
            }

            var px = (m - val) * hi,
                i;

            callback = callback || empty;

            t.attr('style', (time ? (prefix + '-transition:all ' + time.toFixed(1) + 's ease-out;') : '') + (has3d ? (prefix + '-transform:translate3d(0,' + px + 'px,0);') : ('top:' + px + 'px;')));

            if (iv[index]) {
                ready();
            }

            if (time && orig !== undefined) {
                i = 0;
                t.closest('.dwwl').addClass('dwa');
                iv[index] = setInterval(function () {
                    i += 0.1;
                    t.data('pos', Math.round(getVal(i, orig, val - orig, time)));
                    if (i >= time) {
                        ready();
                        callback();
                    }
                }, 100);
                // Trigger animation start event
                event('onAnimStart', [index, time]);
            } else {
                t.data('pos', val);
                callback();
            }
        };

        /**
        * Gets the selected wheel values, formats it, and set the value of the scroller instance.
        * If input parameter is true, populates the associated input element.
        * @param {Boolean} sc - Scroll the wheel in position.
        * @param {Boolean} fill - Also set the value of the associated input element. Default is true.
        * @param {Number} time - Animation time
        * @param {Boolean} temp - If true, then only set the temporary value.(only scroll there but not set the value)
        */
        that.setValue = function (sc, fill, time, temp) {
            if (!temp) {
                that.values = that.temp.slice(0);
            }

            if (visible && sc) {
                scrollToPos(time);
            }

            if (fill) {
                v = s.formatResult(that.temp);
                that.val = v;
                if (input) {
                    elm.val(v).trigger('change');
                }
            }
        };

        /**
        * Checks if the current selected values are valid together.
        * In case of date presets it checks the number of days in a month.
        * @param {Number} time - Animation time
        * @param {Number} orig - Original value
        * @param {Number} i - Currently changed wheel index, -1 if initial validation.
        * @param {Number} dir - Scroll direction
        */
        that.validate = function (i, dir) {
            scrollToPos(0.2, i, true, dir);
        };

        /**
        *
        */
        that.change = function (manual) {
            v = s.formatResult(that.temp);
            if (s.display == 'inline') {
                that.setValue(false, manual);
            } else {
                $('.dwv', dw).html(formatHeader(v));
            }

            if (manual) {
                event('onChange', [v]);
            }
        };

        /**
        * Hides the scroller instance.
        */
        that.hide = function (prevAnim, btn) {
            // If onClose handler returns false, prevent hide
            if (event('onClose', [v, btn]) === false) {
                return false;
            }

            // Re-enable temporary disabled fields
            $('.dwtd').prop('disabled', false).removeClass('dwtd');
            elm.blur();

            // Hide wheels and overlay
            if (dw) {
                if (s.display != 'inline' && s.animate && !prevAnim) {
                    $('.dw', dw).addClass('dw-' + s.animate + ' dw-out');
                    setTimeout(function () {
                        dw.remove();
                        dw = null;
                    }, 350);
                } else {
                    dw.remove();
                    dw = null;
                }
                visible = false;
                // Stop positioning on window resize
                $(window).unbind('.dw');
            }
        };

        /**
        * Cancel and hide the scroller instance.
        */
        that.cancel = function() {
        	$(document).off('.dwo');

            if (that.hide(false, 'cancel') !== false) {
                event('onCancel', [that.val]);
            }
        };

        /**
        * Changes the values of a wheel, and scrolls to the correct position
        */
        that.changeWheel = function (idx, time) {
            if (dw) {
                var i = 0,
                    j,
                    k,
                    nr = idx.length;

                for (j in s.wheels) {
                    for (k in s.wheels[j]) {
                        if ($.inArray(i, idx) > -1) {
                            warr[i] = s.wheels[j][k];
                            $('.dw-ul', dw).eq(i).html(generateWheelItems(i));
                            nr--;
                            if (!nr) {
                                position();
                                scrollToPos(time);
                                return;
                            }
                        }
                        i++;
                    }
                }
            }
        };

        /**
        * Shows the scroller instance.
        * @param {Boolean} prevAnim - Prevent animation if true
        */
        that.show = function (prevAnim) {
            if (s.disabled || visible) {
                return false;
            }

            if (s.display == 'top') {
                s.animate = 'slidedown';
            }

            if (s.display == 'bottom') {
                s.animate = 'slideup';
            }

            // Parse value from input
            read();

            event('onBeforeShow', [dw]);

            // Create wheels
            var l = 0,
                i,
                label,
                mAnim = '',
                persPS = '',
                persPE = '';

            if (s.animate && !prevAnim) {
                persPS = '<div class="dw-persp">';
                persPE = '</div>';
                mAnim = 'dw-' + s.animate + ' dw-in';
            }
            // Create wheels containers
            var html = '<div class="' + s.theme + ' dw-' + s.display + '">' + (s.display == 'inline' ? '<div class="dw dwbg dwi"><div class="dwwr">' : persPS + '<div class="dwo"></div><div class="dw dwbg ' + mAnim + '"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">' + (s.headerText ? '<div class="dwv"></div>' : ''));

            for (i = 0; i < s.wheels.length; i++) {
                html += '<div class="dwc' + (s.mode != 'scroller' ? ' dwpm' : ' dwsc') + (s.showLabel ? '' : ' dwhl') + '"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';
                // Create wheels
                for (label in s.wheels[i]) {
                    warr[l] = s.wheels[i][label];
                    html += '<td><div class="dwwl dwrc dwwl' + l + '">' + (s.mode != 'scroller' ? '<div class="dwwb dwwbp" style="height:' + hi + 'px;line-height:' + hi + 'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:' + hi + 'px;line-height:' + hi + 'px;"><span>&ndash;</span></div>' : '') + '<div class="dwl">' + label + '</div><div class="dww dwrc" style="height:' + (s.rows * hi) + 'px;min-width:' + s.width + 'px;"><div class="dw-ul">';
                    // Create wheel values
                    html += generateWheelItems(l);
                    html += '</div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>';
                    l++;
                }
                html += '</tr></table></div></div>';
            }
            html += (s.display != 'inline' ? '<div class="dwbc' + (s.button3 ? ' dwbc-p' : '') + '"><span class="dwbw dwb-s"><span class="dwb">' + s.setText + '</span></span>' + (s.button3 ? '<span class="dwbw dwb-n"><span class="dwb">' + s.button3Text + '</span></span>' : '') + '<span class="dwbw dwb-c"><span class="dwb">' + s.cancelText + '</span></span></div>' + persPE : '<div class="dwcc"></div>') + '</div></div></div>';
            dw = $(html);

            scrollToPos();

            // Show
            if (s.display != 'inline') {
                dw.appendTo('body');
            } else if (elm.is('div')) {
                elm.html(dw);
            } else {
                dw.insertAfter(elm);
            }
            visible = true;

            if (s.display != 'inline') {
            	// ncloud added
            	$('.dwo').click(function() {
            		that.cancel();
            	});

            	$(document).on( 'keydown.dwo', function( event ) {
                    var keycode = event.keyCode;

                    // On escape
                    if ( keycode == 27 ) {
                        that.cancel();
                    }
                });
                // ncloud added end

                // Init buttons
                $('.dwb-s span', dw).click(function () {
                    if (that.hide(false, 'set') !== false) {
                        that.setValue(false, true);
                        event('onSelect', [that.val]);
                    }
                });

                $('.dwb-c span', dw).click(function () {
                    that.cancel();
                });

                if (s.button3) {
                    $('.dwb-n span', dw).click(s.button3);
                }

                // prevent scrolling if not specified otherwise
                if (s.scrollLock) {
                    dw.bind('touchmove', function (e) {
                        e.preventDefault();
                    });
                }

                // Disable inputs to prevent bleed through (Android bug)
                $('input,select,button').each(function () {
                    if (!$(this).prop('disabled')) {
                        $(this).addClass('dwtd');
                    }
                });
                $('input,select').prop('disabled', true);

                // Set position
                position();
                $(window).bind('resize.dw', position);

            }

            // Events
            dw.delegate('.dwwl', 'DOMMouseScroll mousewheel', function (e) {
                if (!isReadOnly(this)) {
                    e.preventDefault();
                    e = e.originalEvent;
                    var delta = e.wheelDelta ? (e.wheelDelta / 120) : (e.detail ? (-e.detail / 3) : 0),
                        t = $('.dw-ul', this),
                        p = +t.data('pos'),
                        val = Math.round(p - delta);
                    setGlobals(t);
                    calc(t, val, delta < 0 ? 1 : 2);
                }
            }).delegate('.dwb, .dwwb', START_EVENT, function (e) {
                // Active button
                $(this).addClass('dwb-a');
            }).delegate('.dwwb', START_EVENT, function (e) {
                var w = $(this).closest('.dwwl');
                if (!isReadOnly(w) && !w.hasClass('dwa')) {
                    // + Button
                    e.preventDefault();
                    e.stopPropagation();
                    var t = w.find('.dw-ul'),
                        func = $(this).hasClass('dwwbp') ? plus : minus;
                    click = true;
                    setGlobals(t);
                    clearInterval(timer);
                    timer = setInterval(function () { func(t); }, s.delay);
                    func(t);
                }
            }).delegate('.dwwl', START_EVENT, function (e) {
                // Prevent scroll
                e.preventDefault();
                // Scroll start
                if (!move && !isReadOnly(this) && !click && s.mode != 'clickpick') {
                    move = true;
                    target = $('.dw-ul', this);
                    target.closest('.dwwl').addClass('dwa');
                    pos = +target.data('pos');
                    setGlobals(target);
                    moved = iv[index] !== undefined; // Don't allow tap, if still moving
                    start = getY(e);
                    startTime = new Date();
                    stop = start;
                    that.scroll(target, index, pos);
                }
            });

            event('onShow', [dw, v]);

            // Theme init
            theme.init(dw, that);
        };

        /**
        * Scroller initialization.
        */
        that.init = function (ss) {
            // Get theme defaults
            theme = extend({ defaults: {}, init: empty }, ms.themes[ss.theme || s.theme]);

            // Get language defaults
            lang = ms.i18n[ss.lang || s.lang];

            extend(settings, ss); // Update original user settings
            extend(s, theme.defaults, lang, settings);

            that.settings = s;

            // Unbind all events (if re-init)
            elm.unbind('.dw');

            var preset = ms.presets[s.preset];

            if (preset) {
                pres = preset.call(e, that);
                extend(s, pres, settings); // Load preset settings
                extend(methods, pres.methods); // Extend core methods
            }

            // Set private members
            m = Math.floor(s.rows / 2);
            hi = s.height;

            if (elm.data('dwro') !== undefined) {
                e.readOnly = bool(elm.data('dwro'));
            }

            if (visible) {
                that.hide();
            }

            if (s.display == 'inline') {
                that.show();
            } else {
                read();
                if (input && s.showOnFocus) {
                    // Set element readonly, save original state
                    elm.data('dwro', e.readOnly);
                    e.readOnly = true;
                    // Init show datewheel
                    elm.bind('focus.dw', function () { that.show(); });
                }
            }
        };

        that.values = null;
        that.val = null;
        that.temp = null;

        that.init(settings);
    }

    function testProps(props) {
        var i;
        for (i in props) {
            if (mod[props[i]] !== undefined) {
                return true;
            }
        }
        return false;
    }

    function testPrefix() {
        var prefixes = ['Webkit', 'Moz', 'O', 'ms'],
            p;

        for (p in prefixes) {
            if (testProps([prefixes[p] + 'Transform'])) {
                return '-' + prefixes[p].toLowerCase();
            }
        }
        return '';
    }

    function getInst(e) {
        return scrollers[e.id];
    }

    function getY(e) {
        var org = e.originalEvent,
            ct = e.changedTouches;
        return ct || (org && org.changedTouches) ? (org ? org.changedTouches[0].pageY : ct[0].pageY) : e.pageY;

    }

    function bool(v) {
        return (v === true || v == 'true');
    }

    function constrain(val, min, max) {
        val = val > max ? max : val;
        val = val < min ? min : val;
        return val;
    }

    function calc(t, val, dir, anim, orig) {
        val = constrain(val, min, max);

        var cell = $('.dw-li', t).eq(val),
            idx = index,
            time = anim ? (val == orig ? 0.1 : Math.abs((val - orig) * 0.1)) : 0;

        inst.scroll(t, idx, val, time, orig, function() {
            // Set selected scroller value
            inst.temp[idx] = cell.attr('data-val');
            // Validate on animation end
            inst.validate(idx, dir);
        });
    }

    function init(that, method, args) {
        if (methods[method]) {
            return methods[method].apply(that, Array.prototype.slice.call(args, 1));
        }
        if (typeof method === 'object') {
            return methods.init.call(that, method);
        }
        return that;
    }

    var scrollers = {},
        timer,
        empty = function () { },
        h,
        min,
        max,
        inst, // Current instance
        date = new Date(),
        uuid = date.getTime(),
        move,
        click,
        target,
        index,
        start,
        stop,
        startTime,
        pos,
        moved,
        mod = document.createElement('modernizr').style,
        has3d = testProps(['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective']),
        prefix = testPrefix(),
        extend = $.extend,
        START_EVENT = 'touchstart mousedown',
        MOVE_EVENT = 'touchmove mousemove',
        END_EVENT = 'touchend mouseup',
        defaults = {
            // Options
            width: 70,
            height: 40,
            rows: 3,
            delay: 300,
            disabled: false,
            readonly: false,
            showOnFocus: true,
            showLabel: true,
            wheels: [],
            theme: '',
            headerText: '{value}',
            display: 'modal',
            mode: 'scroller',
            preset: '',
            lang: 'en-US',
            setText: '설정',
            cancelText: '취소',
            scrollLock: true,
            formatResult: function (d) {
                return d.join(' ');
            },
            parseValue: function (value, inst) {
                var w = inst.settings.wheels,
                    val = value.split(' '),
                    ret = [],
                    j = 0,
                    i,
                    l,
                    v;

                for (i = 0; i < w.length; i++) {
                    for (l in w[i]) {
                        if (w[i][l][val[j]] !== undefined) {
                            ret.push(val[j]);
                        } else {
                            for (v in w[i][l]) { // Select first value from wheel
                                ret.push(v);
                                break;
                            }
                        }
                        j++;
                    }
                }
                return ret;
            }
        },

        methods = {
            init: function (options) {
                if (options === undefined) {
                    options = {};
                }

                return this.each(function () {
                    if (!this.id) {
                        uuid += 1;
                        this.id = 'scoller' + uuid;
                    }
                    scrollers[this.id] = new Scroller(this, options);
                });
            },
            enable: function () {
                return this.each(function () {
                    var inst = getInst(this);
                    if (inst) {
                        inst.enable();
                    }
                });
            },
            disable: function () {
                return this.each(function () {
                    var inst = getInst(this);
                    if (inst) {
                        inst.disable();
                    }
                });
            },
            isDisabled: function () {
                var inst = getInst(this[0]);
                if (inst) {
                    return inst.settings.disabled;
                }
            },
            option: function (option, value) {
                return this.each(function () {
                    var inst = getInst(this);
                    if (inst) {
                        var obj = {};
                        if (typeof option === 'object') {
                            obj = option;
                        } else {
                            obj[option] = value;
                        }
                        inst.init(obj);
                    }
                });
            },
            setValue: function (d, fill, time, temp) {
                return this.each(function () {
                    var inst = getInst(this);
                    if (inst) {
                        inst.temp = d;
                        inst.setValue(true, fill, time, temp);
                    }
                });
            },
            getInst: function () {
                return getInst(this[0]);
            },
            getValue: function () {
                var inst = getInst(this[0]);
                if (inst) {
                    return inst.values;
                }
            },
            show: function () {
                var inst = getInst(this[0]);
                if (inst) {
                    return inst.show();
                }
            },
            hide: function () {
                return this.each(function () {
                    var inst = getInst(this);
                    if (inst) {
                        inst.hide();
                    }
                });
            },
            destroy: function () {
                return this.each(function () {
                    var inst = getInst(this);
                    if (inst) {
                        inst.hide();
                        $(this).unbind('.dw');
                        delete scrollers[this.id];
                        if ($(this).is('input')) {
                            this.readOnly = bool($(this).data('dwro'));
                        }
                    }
                });
            }
        };

    $(document).bind(MOVE_EVENT, function (e) {
        if (move) {
            e.preventDefault();
            stop = getY(e);
            inst.scroll(target, index, constrain(pos + (start - stop) / h, min - 1, max + 1));
            moved = true;
        }
    });

    $(document).bind(END_EVENT, function (e) {
        if (move) {
            e.preventDefault();

            var time = new Date() - startTime,
                val = constrain(pos + (start - stop) / h, min - 1, max + 1),
                speed,
                dist,
                tindex,
                ttop = target.offset().top;

            if (time < 300) {
                speed = (stop - start) / time;
                dist = (speed * speed) / (2 * 0.0006);
                if (stop - start < 0) {
                    dist = -dist;
                }
            } else {
                dist = stop - start;
            }

            if (!dist && !moved) { // this is a "tap"
                tindex = Math.floor((stop - ttop) / h);
                var li = $('.dw-li', target).eq(tindex)
                li.addClass('dw-hl'); // Highlight
                setTimeout(function() {
                    li.removeClass('dw-hl');
                }, 200);
            } else {
                tindex = Math.round(pos - dist / h);
            }

            calc(target, tindex, 0, true, Math.round(val));
            move = false;
            target = null;
        }
        if (click) {
            clearInterval(timer);
            click = false;
        }
        $('.dwb-a').removeClass('dwb-a');
    });

    $.fn.mobiscroll = function (method) {
        extend(this, $.mobiscroll.shorts);
        return init(this, method, arguments);
    };

    $.mobiscroll = $.mobiscroll || {
        /**
        * Set settings for all instances.
        * @param {Object} o - New default settings.
        */
        setDefaults: function (o) {
            extend(defaults, o);
        },
        presetShort: function(name) {
            this.shorts[name] = function(method) {
                return init(this, extend(method, { preset: name }), arguments);
            };
        },
        shorts: {},
        presets: {},
        themes: {},
        i18n: {}
    };

    $.scroller = $.scroller || $.mobiscroll;
    $.fn.scroller = $.fn.scroller || $.fn.mobiscroll;

})(jQuery);

/*jslint eqeq: true, plusplus: true, undef: true, sloppy: true, vars: true, forin: true */
(function ($) {

    var ms = $.mobiscroll,
        date = new Date(),
        defaults = {
            dateFormat: 'mm/dd/yy',
            dateOrder: 'mmddy',
            timeWheels: 'hhiiA',
            timeFormat: 'hh:ii A',
            startYear: date.getFullYear() - 100,
            endYear: date.getFullYear() + 1,
            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            shortYearCutoff: '+10',
            monthText: 'Month',
            dayText: 'Day',
            yearText: 'Year',
            hourText: 'Hours',
            minuteText: 'Minutes',
            secText: 'Seconds',
            ampmText: '&nbsp;',
            nowText: 'Now',
            showNow: false,
            stepHour: 1,
            stepMinute: 30,
            stepSecond: 1,
            separator: ' '
        },
        preset = function (inst) {
            var that = $(this),
                html5def = {},
                format;
            // Force format for html5 date inputs (experimental)
            if (that.is('input')) {
                switch (that.attr('type')) {
                case 'date':
                    format = 'yy-mm-dd';
                    break;
                case 'datetime':
                    format = 'yy-mm-ddTHH:ii:ssZ';
                    break;
                case 'datetime-local':
                    format = 'yy-mm-ddTHH:ii:ss';
                    break;
                case 'month':
                    format = 'yy-mm';
                    html5def.dateOrder = 'mmyy';
                    break;
                case 'time':
                    format = 'HH:ii:ss';
                    break;
                }
                // Check for min/max attributes
                var min = that.attr('min'),
                    max = that.attr('max');
                if (min) {
                    html5def.minDate = ms.parseDate(format, min);
                }
                if (max) {
                    html5def.maxDate = ms.parseDate(format, max);
                }
            }

            // Set year-month-day order
            var s = $.extend({}, defaults, html5def, inst.settings),
                offset = 0,
                wheels = [],
                ord = [],
                o = {},
                i,
                k,
                f = { y: 'getFullYear', m: 'getMonth', d: 'getDate', h: getHour, i: getMinute, s: getSecond, ap: getAmPm },
                p = s.preset,
                dord = s.dateOrder,
                tord = s.timeWheels,
                regen = dord.match(/D/),
                ampm = tord.match(/a/i),
                hampm = tord.match(/h/),
                hformat = p == 'datetime' ? s.dateFormat + s.separator + s.timeFormat : p == 'time' ? s.timeFormat : s.dateFormat,
                defd = new Date(),
                stepH = s.stepHour,
                stepM = s.stepMinute,
                stepS = s.stepSecond,
                mind = s.minDate || new Date(s.startYear, 0, 1),
                maxd = s.maxDate || new Date(s.endYear, 11, 31, 23, 59, 59);

            format = format || hformat;

            if (p.match(/date/i)) {

                // Determine the order of year, month, day wheels
                $.each(['y', 'm', 'd'], function (j, v) {
                    i = dord.search(new RegExp(v, 'i'));
                    if (i > -1) {
                        ord.push({ o: i, v: v });
                    }
                });
                ord.sort(function (a, b) { return a.o > b.o ? 1 : -1; });
                $.each(ord, function (i, v) {
                    o[v.v] = i;
                });

                var w = {};
                for (k = 0; k < 3; k++) {
                    if (k == o.y) {
                        offset++;
                        w[s.yearText] = {};
                        var start = mind.getFullYear(),
                            end = maxd.getFullYear();
                        for (i = start; i <= end; i++) {
                            w[s.yearText][i] = dord.match(/yy/i) ? i : (i + '').substr(2, 2);
                        }
                    } else if (k == o.m) {
                        offset++;
                        w[s.monthText] = {};
                        for (i = 0; i < 12; i++) {
                            var str = dord.replace(/[dy]/gi, '').replace(/mm/, i < 9 ? '0' + (i + 1) : i + 1).replace(/m/, i);
                            w[s.monthText][i] = str.match(/MM/) ? str.replace(/MM/, '<span class="dw-mon">' + s.monthNames[i] + '</span>') : str.replace(/M/, '<span class="dw-mon">' + s.monthNamesShort[i] + '</span>');
                        }
                    } else if (k == o.d) {
                        offset++;
                        w[s.dayText] = {};
                        for (i = 1; i < 32; i++) {
                            w[s.dayText][i] = dord.match(/dd/i) && i < 10 ? '0' + i : i;
                        }
                    }
                }
                wheels.push(w);
            }

            if (p.match(/time/i)) {

                // Determine the order of hours, minutes, seconds wheels
                ord = [];
                $.each(['h', 'i', 's'], function (i, v) {
                    i = tord.search(new RegExp(v, 'i'));
                    if (i > -1) {
                        ord.push({ o: i, v: v });
                    }
                });
                ord.sort(function (a, b) {
                    return a.o > b.o ? 1 : -1;
                });
                $.each(ord, function (i, v) {
                    o[v.v] = offset + i;
                });

                w = {};
                for (k = offset; k < offset + 3; k++) {
                    if (k == o.h) {
                        offset++;
                        w[s.hourText] = {};
                        for (i = 0; i < (hampm ? 12 : 24); i += stepH) {
                            w[s.hourText][i] = hampm && i == 0 ? 12 : tord.match(/hh/i) && i < 10 ? '0' + i : i;
                        }
                    } else if (k == o.i) {
                        offset++;
                        w[s.minuteText] = {};
                        for (i = 0; i < 60; i += stepM) {
                            w[s.minuteText][i] = tord.match(/ii/) && i < 10 ? '0' + i : i;
                        }
                    } else if (k == o.s) {
                        offset++;
                        w[s.secText] = {};
                        for (i = 0; i < 60; i += stepS) {
                            w[s.secText][i] = tord.match(/ss/) && i < 10 ? '0' + i : i;
                        }
                    }
                }

                if (ampm) {
                    o.ap = offset++; // ampm wheel order
                    var upper = tord.match(/A/);
                    w[s.ampmText] = { 0: upper ? '오전' : 'am', 1: upper ? '오후' : 'pm' };
                }
                wheels.push(w);
            }

            function get(d, i, def) {
                if (o[i] !== undefined) {
                    return +d[o[i]];
                }
                if (def !== undefined) {
                    return def;
                }
                return defd[f[i]] ? defd[f[i]]() : f[i](defd);
            }

            function step(v, st) {
                return Math.floor(v / st) * st;
            }

            function getHour(d) {
                var hour = d.getHours();
                hour = hampm && hour >= 12 ? hour - 12 : hour;
                return step(hour, stepH);
            }

            function getMinute(d) {
                return step(d.getMinutes(), stepM);
            }

            function getSecond(d) {
                return step(d.getSeconds(), stepS);
            }

            function getAmPm(d) {
                return ampm && d.getHours() > 11 ? 1 : 0;
            }

            function getDate(d) {
                var hour = get(d, 'h', 0);
                return new Date(get(d, 'y'), get(d, 'm'), get(d, 'd', 1), get(d, 'ap') ? hour + 12 : hour, get(d, 'i', 0), get(d, 's', 0));
            }

            inst.setDate = function (d, fill, time, temp) {
                var i;
                // Set wheels
                for (i in o) {
                    this.temp[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
                }
                this.setValue(true, fill, time, temp);
            };

            inst.getDate = function (d) {
                return getDate(d);
            };

            return {
                button3Text: s.showNow ? s.nowText : undefined,
                button3: s.showNow ? function () { inst.setDate(new Date(), false, 0.3, true); } : undefined,
                wheels: wheels,
                headerText: function (v) {
                    return ms.formatDate(hformat, getDate(inst.temp), s);
                },
                /**
                * Builds a date object from the wheel selections and formats it to the given date/time format
                * @param {Array} d - An array containing the selected wheel values
                * @return {String} - The formatted date string
                */
                formatResult: function (d) {
                    return ms.formatDate(format, getDate(d), s);
                },
                /**
                * Builds a date object from the input value and returns an array to set wheel values
                * @return {Array} - An array containing the wheel values to set
                */
                parseValue: function (val) {
                    var d = new Date(),
                        i,
                        result = [];
                    try {
                        d = ms.parseDate(format, val, s);
                    } catch (e) {
                    }
                    // Set wheels
                    for (i in o) {
                        result[o[i]] = d[f[i]] ? d[f[i]]() : f[i](d);
                    }
                    return result;
                },
                /**
                * Validates the selected date to be in the minDate / maxDate range and sets unselectable values to disabled
                * @param {Object} dw - jQuery object containing the generated html
                * @param {Integer} [i] - Index of the changed wheel, not set for initial validation
                */
                validate: function (dw, i) {
                    var temp = inst.temp, //.slice(0),
                        mins = { y: mind.getFullYear(), m: 0, d: 1, h: 0, i: 0, s: 0, ap: 0 },
                        maxs = { y: maxd.getFullYear(), m: 11, d: 31, h: step(hampm ? 11 : 23, stepH), i: step(59, stepM), s: step(59, stepS), ap: 1 },
                        minprop = true,
                        maxprop = true;
                    $.each(['y', 'm', 'd', 'ap', 'h', 'i', 's'], function (x, i) {
                        if (o[i] !== undefined) {
                            var min = mins[i],
                                max = maxs[i],
                                maxdays = 31,
                                val = get(temp, i),
                                t = $('.dw-ul', dw).eq(o[i]),
                                y,
                                m;
                            if (i == 'd') {
                                y = get(temp, 'y');
                                m = get(temp, 'm');
                                maxdays = 32 - new Date(y, m, 32).getDate();
                                max = maxdays;
                                if (regen) {
                                    $('.dw-li', t).each(function () {
                                        var that = $(this),
                                            d = that.data('val'),
                                            w = new Date(y, m, d).getDay(),
                                            str = dord.replace(/[my]/gi, '').replace(/dd/, d < 10 ? '0' + d : d).replace(/d/, d);
                                        $('.dw-i', that).html(str.match(/DD/) ? str.replace(/DD/, '<span class="dw-day">' + s.dayNames[w] + '</span>') : str.replace(/D/, '<span class="dw-day">' + s.dayNamesShort[w] + '</span>'));
                                    });
                                }
                            }
                            if (minprop && mind) {
                                min = mind[f[i]] ? mind[f[i]]() : f[i](mind);
                            }
                            if (maxprop && maxd) {
                                max = maxd[f[i]] ? maxd[f[i]]() : f[i](maxd);
                            }
                            if (i != 'y') {
                                var i1 = $('.dw-li', t).index($('.dw-li[data-val="' + min + '"]', t)),
                                    i2 = $('.dw-li', t).index($('.dw-li[data-val="' + max + '"]', t));
                                $('.dw-li', t).removeClass('dw-v').slice(i1, i2 + 1).addClass('dw-v');
                                if (i == 'd') { // Hide days not in month
                                    $('.dw-li', t).removeClass('dw-h').slice(maxdays).addClass('dw-h');
                                }
                            }
                            if (val < min) {
                                val = min;
                            }
                            if (val > max) {
                                val = max;
                            }
                            if (minprop) {
                                minprop = val == min;
                            }
                            if (maxprop) {
                                maxprop = val == max;
                            }
                            // Disable some days
                            if (s.invalid && i == 'd') {
                                var idx = [];
                                // Disable exact dates
                                if (s.invalid.dates) {
                                    $.each(s.invalid.dates, function (i, v) {
                                        if (v.getFullYear() == y && v.getMonth() == m) {
                                            idx.push(v.getDate() - 1);
                                        }
                                    });
                                }
                                // Disable days of week
                                if (s.invalid.daysOfWeek) {
                                    var first = new Date(y, m, 1).getDay(),
                                        j;
                                    $.each(s.invalid.daysOfWeek, function (i, v) {
                                        for (j = v - first; j < maxdays; j += 7) {
                                            if (j >= 0) {
                                                idx.push(j);
                                            }
                                        }
                                    });
                                }
                                // Disable days of month
                                if (s.invalid.daysOfMonth) {
                                    $.each(s.invalid.daysOfMonth, function (i, v) {
                                        v = (v + '').split('/');
                                        if (v[1]) {
                                            if (v[0] - 1 == m) {
                                                idx.push(v[1] - 1);
                                            }
                                        } else {
                                            idx.push(v[0] - 1);
                                        }
                                    });
                                }
                                $.each(idx, function (i, v) {
                                    $('.dw-li', t).eq(v).removeClass('dw-v');
                                });
                            }

                            // Set modified value
                            temp[o[i]] = val;
                        }
                    });
                },
                methods: {
                    /**
                    * Returns the currently selected date.
                    * @param {Boolean} temp - If true, return the currently shown date on the picker, otherwise the last selected one
                    * @return {Date}
                    */
                    getDate: function (temp) {
                        var inst = $(this).mobiscroll('getInst');
                        if (inst) {
                            return inst.getDate(temp ? inst.temp : inst.values);
                        }
                    },
                    /**
                    * Sets the selected date
                    * @param {Date} d - Date to select.
                    * @param {Boolean} [fill] - Also set the value of the associated input element. Default is true.
                    * @return {Object} - jQuery object to maintain chainability
                    */
                    setDate: function (d, fill, time, temp) {
                        if (fill == undefined) {
                            fill = false;
                        }
                        return this.each(function () {
                            var inst = $(this).mobiscroll('getInst');
                            if (inst) {
                                inst.setDate(d, fill, time, temp);
                            }
                        });
                    }
                }
            };
        };

    $.each(['date', 'time', 'datetime'], function(i, v) {
        ms.presets[v] = preset;
        ms.presetShort(v);
    });

    /**
    * Format a date into a string value with a specified format.
    * @param {String} format - Output format.
    * @param {Date} date - Date to format.
    * @param {Object} settings - Settings.
    * @return {String} - Returns the formatted date string.
    */
    ms.formatDate = function (format, date, settings) {
        if (!date) {
            return null;
        }
        var s = $.extend({}, defaults, settings),
            look = function (m) { // Check whether a format character is doubled
                var n = 0;
                while (i + 1 < format.length && format.charAt(i + 1) == m) {
                    n++;
                    i++;
                }
                return n;
            },
            f1 = function (m, val, len) { // Format a number, with leading zero if necessary
                var n = '' + val;
                if (look(m)) {
                    while (n.length < len) {
                        n = '0' + n;
                    }
                }
                return n;
            },
            f2 = function (m, val, s, l) { // Format a name, short or long as requested
                return (look(m) ? l[val] : s[val]);
            },
            i,
            output = '',
            literal = false;

        for (i = 0; i < format.length; i++) {
            if (literal) {
                if (format.charAt(i) == "'" && !look("'")) {
                    literal = false;
                } else {
                    output += format.charAt(i);
                }
            } else {
                switch (format.charAt(i)) {
                case 'd':
                    output += f1('d', date.getDate(), 2);
                    break;
                case 'D':
                    output += f2('D', date.getDay(), s.dayNamesShort, s.dayNames);
                    break;
                case 'o':
                    output += f1('o', (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000, 3);
                    break;
                case 'm':
                    output += f1('m', date.getMonth() + 1, 2);
                    break;
                case 'M':
                    output += f2('M', date.getMonth(), s.monthNamesShort, s.monthNames);
                    break;
                case 'y':
                    output += (look('y') ? date.getFullYear() : (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
                    break;
                case 'h':
                    var h = date.getHours();
                    output += f1('h', (h > 12 ? (h - 12) : (h == 0 ? 12 : h)), 2);
                    break;
                case 'H':
                    output += f1('H', date.getHours(), 2);
                    break;
                case 'i':
                    output += f1('i', date.getMinutes(), 2);
                    break;
                case 's':
                    output += f1('s', date.getSeconds(), 2);
                    break;
                case 'a':
                    output += date.getHours() > 11 ? 'pm' : 'am';
                    break;
                case 'A':
                    output += date.getHours() > 11 ? 'PM' : 'AM';
                    break;
                case "'":
                    if (look("'")) {
                        output += "'";
                    } else {
                        literal = true;
                    }
                    break;
                default:
                    output += format.charAt(i);
                }
            }
        }
        return output;
    };

    /**
    * Extract a date from a string value with a specified format.
    * @param {String} format - Input format.
    * @param {String} value - String to parse.
    * @param {Object} settings - Settings.
    * @return {Date} - Returns the extracted date.
    */
    ms.parseDate = function (format, value, settings) {
        var def = new Date();

        if (!format || !value) {
            return def;
        }

        value = (typeof value == 'object' ? value.toString() : value + '');

        var s = $.extend({}, defaults, settings),
            shortYearCutoff = s.shortYearCutoff,
            year = def.getFullYear(),
            month = def.getMonth() + 1,
            day = def.getDate(),
            doy = -1,
            hours = def.getHours(),
            minutes = def.getMinutes(),
            seconds = 0, //def.getSeconds(),
            ampm = -1,
            literal = false, // Check whether a format character is doubled
            lookAhead = function (match) {
                var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) == match);
                if (matches) {
                    iFormat++;
                }
                return matches;
            },
            getNumber = function (match) { // Extract a number from the string value
                lookAhead(match);
                var size = (match == '@' ? 14 : (match == '!' ? 20 : (match == 'y' ? 4 : (match == 'o' ? 3 : 2)))),
                    digits = new RegExp('^\\d{1,' + size + '}'),
                    num = value.substr(iValue).match(digits);

                if (!num) {
                    return 0;
                }
                //throw 'Missing number at position ' + iValue;
                iValue += num[0].length;
                return parseInt(num[0], 10);
            },
            getName = function (match, s, l) { // Extract a name from the string value and convert to an index
                var names = (lookAhead(match) ? l : s),
                    i;

                for (i = 0; i < names.length; i++) {
                    if (value.substr(iValue, names[i].length).toLowerCase() == names[i].toLowerCase()) {
                        iValue += names[i].length;
                        return i + 1;
                    }
                }
                return 0;
                //throw 'Unknown name at position ' + iValue;
            },
            checkLiteral = function () {
                //if (value.charAt(iValue) != format.charAt(iFormat))
                //throw 'Unexpected literal at position ' + iValue;
                iValue++;
            },
            iValue = 0,
            iFormat;

        for (iFormat = 0; iFormat < format.length; iFormat++) {
            if (literal) {
                if (format.charAt(iFormat) == "'" && !lookAhead("'")) {
                    literal = false;
                } else {
                    checkLiteral();
                }
            } else {
                switch (format.charAt(iFormat)) {
                case 'd':
                    day = getNumber('d');
                    break;
                case 'D':
                    getName('D', s.dayNamesShort, s.dayNames);
                    break;
                case 'o':
                    doy = getNumber('o');
                    break;
                case 'm':
                    month = getNumber('m');
                    break;
                case 'M':
                    month = getName('M', s.monthNamesShort, s.monthNames);
                    break;
                case 'y':
                    year = getNumber('y');
                    break;
                case 'H':
                    hours = getNumber('H');
                    break;
                case 'h':
                    hours = getNumber('h');
                    break;
                case 'i':
                    minutes = getNumber('i');
                    break;
                case 's':
                    seconds = getNumber('s');
                    break;
                case 'a':
                    ampm = getName('a', ['am', 'pm'], ['am', 'pm']) - 1;
                    break;
                case 'A':
                    ampm = getName('A', ['am', 'pm'], ['am', 'pm']) - 1;
                    break;
                case "'":
                    if (lookAhead("'")) {
                        checkLiteral();
                    } else {
                        literal = true;
                    }
                    break;
                default:
                    checkLiteral();
                }
            }
        }
        if (year < 100) {
            year += new Date().getFullYear() - new Date().getFullYear() % 100 +
                (year <= (typeof shortYearCutoff != 'string' ? shortYearCutoff : new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10)) ? 0 : -100);
        }
        if (doy > -1) {
            month = 1;
            day = doy;
            do {
                var dim = 32 - new Date(year, month - 1, 32).getDate();
                if (day <= dim) {
                    break;
                }
                month++;
                day -= dim;
            } while (true);
        }
        hours = (ampm == -1) ? hours : ((ampm && hours < 12) ? (hours + 12) : (!ampm && hours == 12 ? 0 : hours));
        var date = new Date(year, month - 1, day, hours, minutes, seconds);
        if (date.getFullYear() != year || date.getMonth() + 1 != month || date.getDate() != day) {
            throw 'Invalid date';
        }
        return date;
    };

})(jQuery);

(function ($) {
    var theme = {
        defaults: {
            dateOrder: 'Mddyy',
            mode: 'mixed',
            rows: 5,
            width: 70,
            height: 36,
            showLabel: false
        }
    }

    $.mobiscroll.themes['android-ics'] = theme;
    $.mobiscroll.themes['android-ics light'] = theme;

})(jQuery);


// @fileRef jquery.textchange.js 

/*!
 * jQuery TextChange Plugin
 * http://www.zurb.com/playground/jquery-text-change-custom-event
 *
 * Copyright 2010, ZURB
 * Released under the MIT License
 */
(function ($) {
	
	$.event.special.textchange = {
		
		setup: function (data, namespaces) {
		  $(this).data('lastValue', this.contentEditable === 'true' ? $(this).html() : $(this).val());
			$(this).bind('keyup.textchange', $.event.special.textchange.handler);
			$(this).bind('cut.textchange paste.textchange input.textchange', $.event.special.textchange.delayedHandler);
		},
		
		teardown: function (namespaces) {
			$(this).unbind('.textchange');
		},
		
		handler: function (event) {
			$.event.special.textchange.triggerIfChanged($(this));
		},
		
		delayedHandler: function (event) {
			var element = $(this);
			setTimeout(function () {
				$.event.special.textchange.triggerIfChanged(element);
			}, 25);
		},
		
		triggerIfChanged: function (element) {
		  var current = element[0].contentEditable === 'true' ? element.html() : element.val();
			if (current !== element.data('lastValue')) {
				element.trigger('textchange',  [element.data('lastValue')]);
				element.data('lastValue', current);
			}
		}
	};
	
	$.event.special.hastext = {
		
		setup: function (data, namespaces) {
			$(this).bind('textchange', $.event.special.hastext.handler);
		},
		
		teardown: function (namespaces) {
			$(this).unbind('textchange', $.event.special.hastext.handler);
		},
		
		handler: function (event, lastValue) {
			if ((lastValue === '') && lastValue !== $(this).val()) {
				$(this).trigger('hastext');
			}
		}
	};
	
	$.event.special.notext = {
		
		setup: function (data, namespaces) {
			$(this).bind('textchange', $.event.special.notext.handler);
		},
		
		teardown: function (namespaces) {
			$(this).unbind('textchange', $.event.special.notext.handler);
		},
		
		handler: function (event, lastValue) {
			if ($(this).val() === '' && $(this).val() !== lastValue) {
				$(this).trigger('notext');
			}
		}
	};	

})(jQuery);


// @fileRef user.js 

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
				window.location = service.url + 'login/facebook/?redirect_uri=' + encodeURIComponent(redirect_uri);
		  //  }
		  } else {
			// user cancelled login
		  }
		},{scope:'email'});
	}
}

var user = new User();


// @fileRef less.js 

//
// LESS - Leaner CSS v1.1.3
// http://lesscss.org
// 
// Copyright (c) 2009-2011, Alexis Sellier
// Licensed under the Apache 2.0 License.
//
//
// LESS - Leaner CSS v1.1.3
// http://lesscss.org
// 
// Copyright (c) 2009-2011, Alexis Sellier
// Licensed under the Apache 2.0 License.
//
(function(a,b){function v(a,b){var c="less-error-message:"+p(b),e=["<ul>",'<li><label>[-1]</label><pre class="ctx">{0}</pre></li>',"<li><label>[0]</label><pre>{current}</pre></li>",'<li><label>[1]</label><pre class="ctx">{2}</pre></li>',"</ul>"].join("\n"),f=document.createElement("div"),g,h;f.id=c,f.className="less-error-message",h="<h3>"+(a.message||"There is an error in your .less file")+"</h3>"+'<p><a href="'+b+'">'+b+"</a> ",a.extract&&(h+="on line "+a.line+", column "+(a.column+1)+":</p>"+e.replace(/\[(-?\d)\]/g,function(b,c){return parseInt(a.line)+parseInt(c)||""}).replace(/\{(\d)\}/g,function(b,c){return a.extract[parseInt(c)]||""}).replace(/\{current\}/,a.extract[1].slice(0,a.column)+'<span class="error">'+a.extract[1].slice(a.column)+"</span>")),f.innerHTML=h,q([".less-error-message ul, .less-error-message li {","list-style-type: none;","margin-right: 15px;","padding: 4px 0;","margin: 0;","}",".less-error-message label {","font-size: 12px;","margin-right: 15px;","padding: 4px 0;","color: #cc7777;","}",".less-error-message pre {","color: #ee4444;","padding: 4px 0;","margin: 0;","display: inline-block;","}",".less-error-message pre.ctx {","color: #dd4444;","}",".less-error-message h3 {","font-size: 20px;","font-weight: bold;","padding: 15px 0 5px 0;","margin: 0;","}",".less-error-message a {","color: #10a","}",".less-error-message .error {","color: red;","font-weight: bold;","padding-bottom: 2px;","border-bottom: 1px dashed red;","}"].join("\n"),{title:"error-message"}),f.style.cssText=["font-family: Arial, sans-serif","border: 1px solid #e00","background-color: #eee","border-radius: 5px","-webkit-border-radius: 5px","-moz-border-radius: 5px","color: #e00","padding: 15px","margin-bottom: 15px"].join(";"),d.env=="development"&&(g=setInterval(function(){document.body&&(document.getElementById(c)?document.body.replaceChild(f,document.getElementById(c)):document.body.insertBefore(f,document.body.firstChild),clearInterval(g))},10))}function u(a){d.env=="development"&&typeof console!="undefined"&&console.log("less: "+a)}function t(a){return a&&a.parentNode.removeChild(a)}function s(){if(a.XMLHttpRequest)return new XMLHttpRequest;try{return new ActiveXObject("MSXML2.XMLHTTP.3.0")}catch(b){u("browser doesn't support AJAX.");return null}}function r(a,b,c,e){function i(b,c,d){b.status>=200&&b.status<300?c(b.responseText,b.getResponseHeader("Last-Modified")):typeof d=="function"&&d(b.status,a)}var f=s(),h=g?!1:d.async;typeof f.overrideMimeType=="function"&&f.overrideMimeType("text/css"),f.open("GET",a,h),f.setRequestHeader("Accept",b||"text/x-less, text/css; q=0.9, */*; q=0.5"),f.send(null),g?f.status===0?c(f.responseText):e(f.status,a):h?f.onreadystatechange=function(){f.readyState==4&&i(f,c,e)}:i(f,c,e)}function q(a,b,c){var d,e=b.href?b.href.replace(/\?.*$/,""):"",f="less:"+(b.title||p(e));(d=document.getElementById(f))===null&&(d=document.createElement("style"),d.type="text/css",d.media=b.media||"screen",d.id=f,document.getElementsByTagName("head")[0].appendChild(d));if(d.styleSheet)try{d.styleSheet.cssText=a}catch(g){throw new Error("Couldn't reassign styleSheet.cssText.")}else(function(a){d.childNodes.length>0?d.firstChild.nodeValue!==a.nodeValue&&d.replaceChild(a,d.firstChild):d.appendChild(a)})(document.createTextNode(a));c&&h&&(u("saving "+e+" to cache."),h.setItem(e,a),h.setItem(e+":timestamp",c))}function p(a){return a.replace(/^[a-z]+:\/\/?[^\/]+/,"").replace(/^\//,"").replace(/\?.*$/,"").replace(/\.[^\.\/]+$/,"").replace(/[^\.\w-]+/g,"-").replace(/\./g,":")}function o(b,c,e,f){var g=a.location.href.replace(/[#?].*$/,""),i=b.href.replace(/\?.*$/,""),j=h&&h.getItem(i),k=h&&h.getItem(i+":timestamp"),l={css:j,timestamp:k};/^(https?|file):/.test(i)||(i.charAt(0)=="/"?i=a.location.protocol+"//"+a.location.host+i:i=g.slice(0,g.lastIndexOf("/")+1)+i),r(b.href,b.type,function(a,g){if(!e&&l&&g&&(new Date(g)).valueOf()===(new Date(l.timestamp)).valueOf())q(l.css,b),c(null,b,{local:!0,remaining:f});else try{(new d.Parser({optimization:d.optimization,paths:[i.replace(/[\w\.-]+$/,"")],mime:b.type})).parse(a,function(a,d){if(a)return v(a,i);try{c(d,b,{local:!1,lastModified:g,remaining:f}),t(document.getElementById("less-error-message:"+p(i)))}catch(a){v(a,i)}})}catch(h){v(h,i)}},function(a,b){throw new Error("Couldn't load "+b+" ("+a+")")})}function n(a,b){for(var c=0;c<d.sheets.length;c++)o(d.sheets[c],a,b,d.sheets.length-(c+1))}function m(){var a=document.getElementsByTagName("style");for(var b=0;b<a.length;b++)a[b].type.match(k)&&(new d.Parser).parse(a[b].innerHTML||"",function(c,d){a[b].type="text/css",a[b].innerHTML=d.toCSS()})}function c(b){return a.less[b.split("/")[1]]}Array.isArray||(Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"||a instanceof Array}),Array.prototype.forEach||(Array.prototype.forEach=function(a,b){var c=this.length>>>0;for(var d=0;d<c;d++)d in this&&a.call(b,this[d],d,this)}),Array.prototype.map||(Array.prototype.map=function(a){var b=this.length>>>0,c=Array(b),d=arguments[1];for(var e=0;e<b;e++)e in this&&(c[e]=a.call(d,this[e],e,this));return c}),Array.prototype.filter||(Array.prototype.filter=function(a){var b=[],c=arguments[1];for(var d=0;d<this.length;d++)a.call(c,this[d])&&b.push(this[d]);return b}),Array.prototype.reduce||(Array.prototype.reduce=function(a){var b=this.length>>>0,c=0;if(b===0&&arguments.length===1)throw new TypeError;if(arguments.length>=2)var d=arguments[1];else for(;;){if(c in this){d=this[c++];break}if(++c>=b)throw new TypeError}for(;c<b;c++)c in this&&(d=a.call(null,d,this[c],c,this));return d}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a){var b=this.length,c=arguments[1]||0;if(!b)return-1;if(c>=b)return-1;c<0&&(c+=b);for(;c<b;c++){if(!Object.prototype.hasOwnProperty.call(this,c))continue;if(a===this[c])return c}return-1}),Object.keys||(Object.keys=function(a){var b=[];for(var c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b}),String.prototype.trim||(String.prototype.trim=function(){return String(this).replace(/^\s\s*/,"").replace(/\s\s*$/,"")});var d,e;typeof a=="undefined"?(d=exports,e=c("less/tree")):(typeof a.less=="undefined"&&(a.less={}),d=a.less,e=a.less.tree={}),d.Parser=function(a){function t(a){return typeof a=="string"?b.charAt(c)===a:a.test(j[f])?!0:!1}function s(a){var d,e,g,h,i,m,n,o;if(a instanceof Function)return a.call(l.parsers);if(typeof a=="string")d=b.charAt(c)===a?a:null,g=1,r();else{r();if(d=a.exec(j[f]))g=d[0].length;else return null}if(d){o=c+=g,m=c+j[f].length-g;while(c<m){h=b.charCodeAt(c);if(h!==32&&h!==10&&h!==9)break;c++}j[f]=j[f].slice(g+(c-o)),k=c,j[f].length===0&&f<j.length-1&&f++;return typeof d=="string"?d:d.length===1?d[0]:d}}function r(){c>k&&(j[f]=j[f].slice(c-k),k=c)}function q(){j[f]=g,c=h,k=c}function p(){g=j[f],h=c,k=c}var b,c,f,g,h,i,j,k,l,m=this,n=function(){},o=this.imports={paths:a&&a.paths||[],queue:[],files:{},mime:a&&a.mime,push:function(b,c){var e=this;this.queue.push(b),d.Parser.importer(b,this.paths,function(a){e.queue.splice(e.queue.indexOf(b),1),e.files[b]=a,c(a),e.queue.length===0&&n()},a)}};this.env=a=a||{},this.optimization="optimization"in this.env?this.env.optimization:1,this.env.filename=this.env.filename||null;return l={imports:o,parse:function(d,g){var h,l,m,o,p,q,r=[],t,u=null;c=f=k=i=0,j=[],b=d.replace(/\r\n/g,"\n"),j=function(c){var d=0,e=/[^"'`\{\}\/\(\)]+/g,f=/\/\*(?:[^*]|\*+[^\/*])*\*+\/|\/\/.*/g,g=0,h,i=c[0],j,k;for(var l=0,m,n;l<b.length;l++){e.lastIndex=l,(h=e.exec(b))&&h.index===l&&(l+=h[0].length,i.push(h[0])),m=b.charAt(l),f.lastIndex=l,!k&&!j&&m==="/"&&(n=b.charAt(l+1),(n==="/"||n==="*")&&(h=f.exec(b))&&h.index===l&&(l+=h[0].length,i.push(h[0]),m=b.charAt(l)));if(m==="{"&&!k&&!j)g++,i.push(m);else if(m==="}"&&!k&&!j)g--,i.push(m),c[++d]=i=[];else if(m==="("&&!k&&!j)i.push(m),j=!0;else if(m===")"&&!k&&j)i.push(m),j=!1;else{if(m==='"'||m==="'"||m==="`")k?k=k===m?!1:k:k=m;i.push(m)}}if(g>0)throw{type:"Syntax",message:"Missing closing `}`",filename:a.filename};return c.map(function(a){return a.join("")})}([[]]),h=new e.Ruleset([],s(this.parsers.primary)),h.root=!0,h.toCSS=function(c){var d,f,g;return function(g,h){function n(a){return a?(b.slice(0,a).match(/\n/g)||"").length:null}var i=[];g=g||{},typeof h=="object"&&!Array.isArray(h)&&(h=Object.keys(h).map(function(a){var b=h[a];b instanceof e.Value||(b instanceof e.Expression||(b=new e.Expression([b])),b=new e.Value([b]));return new e.Rule("@"+a,b,!1,0)}),i=[new e.Ruleset(null,h)]);try{var j=c.call(this,{frames:i}).toCSS([],{compress:g.compress||!1})}catch(k){f=b.split("\n"),d=n(k.index);for(var l=k.index,m=-1;l>=0&&b.charAt(l)!=="\n";l--)m++;throw{type:k.type,message:k.message,filename:a.filename,index:k.index,line:typeof d=="number"?d+1:null,callLine:k.call&&n(k.call)+1,callExtract:f[n(k.call)],stack:k.stack,column:m,extract:[f[d-1],f[d],f[d+1]]}}return g.compress?j.replace(/(\s)+/g,"$1"):j}}(h.eval);if(c<b.length-1){c=i,q=b.split("\n"),p=(b.slice(0,c).match(/\n/g)||"").length+1;for(var v=c,w=-1;v>=0&&b.charAt(v)!=="\n";v--)w++;u={name:"ParseError",message:"Syntax Error on line "+p,index:c,filename:a.filename,line:p,column:w,extract:[q[p-2],q[p-1],q[p]]}}this.imports.queue.length>0?n=function(){g(u,h)}:g(u,h)},parsers:{primary:function(){var a,b=[];while((a=s(this.mixin.definition)||s(this.rule)||s(this.ruleset)||s(this.mixin.call)||s(this.comment)||s(this.directive))||s(/^[\s\n]+/))a&&b.push(a);return b},comment:function(){var a;if(b.charAt(c)==="/"){if(b.charAt(c+1)==="/")return new e.Comment(s(/^\/\/.*/),!0);if(a=s(/^\/\*(?:[^*]|\*+[^\/*])*\*+\/\n?/))return new e.Comment(a)}},entities:{quoted:function(){var a,d=c,f;b.charAt(d)==="~"&&(d++,f=!0);if(b.charAt(d)==='"'||b.charAt(d)==="'"){f&&s("~");if(a=s(/^"((?:[^"\\\r\n]|\\.)*)"|'((?:[^'\\\r\n]|\\.)*)'/))return new e.Quoted(a[0],a[1]||a[2],f)}},keyword:function(){var a;if(a=s(/^[A-Za-z-]+/))return new e.Keyword(a)},call:function(){var a,b,d=c;if(!!(a=/^([\w-]+|%)\(/.exec(j[f]))){a=a[1].toLowerCase();if(a==="url")return null;c+=a.length;if(a==="alpha")return s(this.alpha);s("("),b=s(this.entities.arguments);if(!s(")"))return;if(a)return new e.Call(a,b,d)}},arguments:function(){var a=[],b;while(b=s(this.expression)){a.push(b);if(!s(","))break}return a},literal:function(){return s(this.entities.dimension)||s(this.entities.color)||s(this.entities.quoted)},url:function(){var a;if(b.charAt(c)==="u"&&!!s(/^url\(/)){a=s(this.entities.quoted)||s(this.entities.variable)||s(this.entities.dataURI)||s(/^[-\w%@$\/.&=:;#+?~]+/)||"";if(!s(")"))throw new Error("missing closing ) for url()");return new e.URL(a.value||a.data||a instanceof e.Variable?a:new e.Anonymous(a),o.paths)}},dataURI:function(){var a;if(s(/^data:/)){a={},a.mime=s(/^[^\/]+\/[^,;)]+/)||"",a.charset=s(/^;\s*charset=[^,;)]+/)||"",a.base64=s(/^;\s*base64/)||"",a.data=s(/^,\s*[^)]+/);if(a.data)return a}},variable:function(){var a,d=c;if(b.charAt(c)==="@"&&(a=s(/^@@?[\w-]+/)))return new e.Variable(a,d)},color:function(){var a;if(b.charAt(c)==="#"&&(a=s(/^#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/)))return new e.Color(a[1])},dimension:function(){var a,d=b.charCodeAt(c);if(!(d>57||d<45||d===47))if(a=s(/^(-?\d*\.?\d+)(px|%|em|pc|ex|in|deg|s|ms|pt|cm|mm|rad|grad|turn)?/))return new e.Dimension(a[1],a[2])},javascript:function(){var a,d=c,f;b.charAt(d)==="~"&&(d++,f=!0);if(b.charAt(d)==="`"){f&&s("~");if(a=s(/^`([^`]*)`/))return new e.JavaScript(a[1],c,f)}}},variable:function(){var a;if(b.charAt(c)==="@"&&(a=s(/^(@[\w-]+)\s*:/)))return a[1]},shorthand:function(){var a,b;if(!!t(/^[@\w.%-]+\/[@\w.-]+/)&&(a=s(this.entity))&&s("/")&&(b=s(this.entity)))return new e.Shorthand(a,b)},mixin:{call:function(){var a=[],d,f,g,h=c,i=b.charAt(c);if(i==="."||i==="#"){while(d=s(/^[#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/))a.push(new e.Element(f,d)),f=s(">");s("(")&&(g=s(this.entities.arguments))&&s(")");if(a.length>0&&(s(";")||t("}")))return new e.mixin.Call(a,g,h)}},definition:function(){var a,d=[],f,g,h,i;if(!(b.charAt(c)!=="."&&b.charAt(c)!=="#"||t(/^[^{]*(;|})/)))if(f=s(/^([#.](?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+)\s*\(/)){a=f[1];while(h=s(this.entities.variable)||s(this.entities.literal)||s(this.entities.keyword)){if(h instanceof e.Variable)if(s(":"))if(i=s(this.expression))d.push({name:h.name,value:i});else throw new Error("Expected value");else d.push({name:h.name});else d.push({value:h});if(!s(","))break}if(!s(")"))throw new Error("Expected )");g=s(this.block);if(g)return new e.mixin.Definition(a,d,g)}}},entity:function(){return s(this.entities.literal)||s(this.entities.variable)||s(this.entities.url)||s(this.entities.call)||s(this.entities.keyword)||s(this.entities.javascript)||s(this.comment)},end:function(){return s(";")||t("}")},alpha:function(){var a;if(!!s(/^\(opacity=/i))if(a=s(/^\d+/)||s(this.entities.variable)){if(!s(")"))throw new Error("missing closing ) for alpha()");return new e.Alpha(a)}},element:function(){var a,b,c;c=s(this.combinator),a=s(/^(?:[.#]?|:*)(?:[\w-]|\\(?:[a-fA-F0-9]{1,6} ?|[^a-fA-F0-9]))+/)||s("*")||s(this.attribute)||s(/^\([^)@]+\)/);if(a)return new e.Element(c,a)},combinator:function(){var a,d=b.charAt(c);if(d===">"||d==="&"||d==="+"||d==="~"){c++;while(b.charAt(c)===" ")c++;return new e.Combinator(d)}if(d===":"&&b.charAt(c+1)===":"){c+=2;while(b.charAt(c)===" ")c++;return new e.Combinator("::")}return b.charAt(c-1)===" "?new e.Combinator(" "):new e.Combinator(null)},selector:function(){var a,d,f=[],g,h;while(d=s(this.element)){g=b.charAt(c),f.push(d);if(g==="{"||g==="}"||g===";"||g===",")break}if(f.length>0)return new e.Selector(f)},tag:function(){return s(/^[a-zA-Z][a-zA-Z-]*[0-9]?/)||s("*")},attribute:function(){var a="",b,c,d;if(!!s("[")){if(b=s(/^[a-zA-Z-]+/)||s(this.entities.quoted))(d=s(/^[|~*$^]?=/))&&(c=s(this.entities.quoted)||s(/^[\w-]+/))?a=[b,d,c.toCSS?c.toCSS():c].join(""):a=b;if(!s("]"))return;if(a)return"["+a+"]"}},block:function(){var a;if(s("{")&&(a=s(this.primary))&&s("}"))return a},ruleset:function(){var a=[],b,d,g;p();if(g=/^([.#: \w-]+)[\s\n]*\{/.exec(j[f]))c+=g[0].length-1,a=[new e.Selector([new e.Element(null,g[1])])];else while(b=s(this.selector)){a.push(b),s(this.comment);if(!s(","))break;s(this.comment)}if(a.length>0&&(d=s(this.block)))return new e.Ruleset(a,d);i=c,q()},rule:function(){var a,d,g=b.charAt(c),k,l;p();if(g!=="."&&g!=="#"&&g!=="&")if(a=s(this.variable)||s(this.property)){a.charAt(0)!="@"&&(l=/^([^@+\/'"*`(;{}-]*);/.exec(j[f]))?(c+=l[0].length-1,d=new e.Anonymous(l[1])):a==="font"?d=s(this.font):d=s(this.value),k=s(this.important);if(d&&s(this.end))return new e.Rule(a,d,k,h);i=c,q()}},"import":function(){var a;if(s(/^@import\s+/)&&(a=s(this.entities.quoted)||s(this.entities.url))&&s(";"))return new e.Import(a,o)},directive:function(){var a,d,f,g;if(b.charAt(c)==="@"){if(d=s(this["import"]))return d;if(a=s(/^@media|@page|@-[-a-z]+/)){g=(s(/^[^{]+/)||"").trim();if(f=s(this.block))return new e.Directive(a+" "+g,f)}else if(a=s(/^@[-a-z]+/))if(a==="@font-face"){if(f=s(this.block))return new e.Directive(a,f)}else if((d=s(this.entity))&&s(";"))return new e.Directive(a,d)}},font:function(){var a=[],b=[],c,d,f,g;while(g=s(this.shorthand)||s(this.entity))b.push(g);a.push(new e.Expression(b));if(s(","))while(g=s(this.expression)){a.push(g);if(!s(","))break}return new e.Value(a)},value:function(){var a,b=[],c;while(a=s(this.expression)){b.push(a);if(!s(","))break}if(b.length>0)return new e.Value(b)},important:function(){if(b.charAt(c)==="!")return s(/^! *important/)},sub:function(){var a;if(s("(")&&(a=s(this.expression))&&s(")"))return a},multiplication:function(){var a,b,c,d;if(a=s(this.operand)){while((c=s("/")||s("*"))&&(b=s(this.operand)))d=new e.Operation(c,[d||a,b]);return d||a}},addition:function(){var a,d,f,g;if(a=s(this.multiplication)){while((f=s(/^[-+]\s+/)||b.charAt(c-1)!=" "&&(s("+")||s("-")))&&(d=s(this.multiplication)))g=new e.Operation(f,[g||a,d]);return g||a}},operand:function(){var a,d=b.charAt(c+1);b.charAt(c)==="-"&&(d==="@"||d==="(")&&(a=s("-"));var f=s(this.sub)||s(this.entities.dimension)||s(this.entities.color)||s(this.entities.variable)||s(this.entities.call);return a?new e.Operation("*",[new e.Dimension(-1),f]):f},expression:function(){var a,b,c=[],d;while(a=s(this.addition)||s(this.entity))c.push(a);if(c.length>0)return new e.Expression(c)},property:function(){var a;if(a=s(/^(\*?-?[-a-z_0-9]+)\s*:/))return a[1]}}}},typeof a!="undefined"&&(d.Parser.importer=function(a,b,c,d){a.charAt(0)!=="/"&&b.length>0&&(a=b[0]+a),o({href:a,title:a,type:d.mime},c,!0)}),function(a){function d(a){return Math.min(1,Math.max(0,a))}function c(b){if(b instanceof a.Dimension)return parseFloat(b.unit=="%"?b.value/100:b.value);if(typeof b=="number")return b;throw{error:"RuntimeError",message:"color functions take numbers as parameters"}}function b(b){return a.functions.hsla(b.h,b.s,b.l,b.a)}a.functions={rgb:function(a,b,c){return this.rgba(a,b,c,1)},rgba:function(b,d,e,f){var g=[b,d,e].map(function(a){return c(a)}),f=c(f);return new a.Color(g,f)},hsl:function(a,b,c){return this.hsla(a,b,c,1)},hsla:function(a,b,d,e){function h(a){a=a<0?a+1:a>1?a-1:a;return a*6<1?g+(f-g)*a*6:a*2<1?f:a*3<2?g+(f-g)*(2/3-a)*6:g}a=c(a)%360/360,b=c(b),d=c(d),e=c(e);var f=d<=.5?d*(b+1):d+b-d*b,g=d*2-f;return this.rgba(h(a+1/3)*255,h(a)*255,h(a-1/3)*255,e)},hue:function(b){return new a.Dimension(Math.round(b.toHSL().h))},saturation:function(b){return new a.Dimension(Math.round(b.toHSL().s*100),"%")},lightness:function(b){return new a.Dimension(Math.round(b.toHSL().l*100),"%")},alpha:function(b){return new a.Dimension(b.toHSL().a)},saturate:function(a,c){var e=a.toHSL();e.s+=c.value/100,e.s=d(e.s);return b(e)},desaturate:function(a,c){var e=a.toHSL();e.s-=c.value/100,e.s=d(e.s);return b(e)},lighten:function(a,c){var e=a.toHSL();e.l+=c.value/100,e.l=d(e.l);return b(e)},darken:function(a,c){var e=a.toHSL();e.l-=c.value/100,e.l=d(e.l);return b(e)},fadein:function(a,c){var e=a.toHSL();e.a+=c.value/100,e.a=d(e.a);return b(e)},fadeout:function(a,c){var e=a.toHSL();e.a-=c.value/100,e.a=d(e.a);return b(e)},spin:function(a,c){var d=a.toHSL(),e=(d.h+c.value)%360;d.h=e<0?360+e:e;return b(d)},mix:function(b,c,d){var e=d.value/100,f=e*2-1,g=b.toHSL().a-c.toHSL().a,h=((f*g==-1?f:(f+g)/(1+f*g))+1)/2,i=1-h,j=[b.rgb[0]*h+c.rgb[0]*i,b.rgb[1]*h+c.rgb[1]*i,b.rgb[2]*h+c.rgb[2]*i],k=b.alpha*e+c.alpha*(1-e);return new a.Color(j,k)},greyscale:function(b){return this.desaturate(b,new a.Dimension(100))},e:function(b){return new a.Anonymous(b instanceof a.JavaScript?b.evaluated:b)},escape:function(b){return new a.Anonymous(encodeURI(b.value).replace(/=/g,"%3D").replace(/:/g,"%3A").replace(/#/g,"%23").replace(/;/g,"%3B").replace(/\(/g,"%28").replace(/\)/g,"%29"))},"%":function(b){var c=Array.prototype.slice.call(arguments,1),d=b.value;for(var e=0;e<c.length;e++)d=d.replace(/%[sda]/i,function(a){var b=a.match(/s/i)?c[e].value:c[e].toCSS();return a.match(/[A-Z]$/)?encodeURIComponent(b):b});d=d.replace(/%%/g,"%");return new a.Quoted('"'+d+'"',d)},round:function(b){if(b instanceof a.Dimension)return new a.Dimension(Math.round(c(b)),b.unit);if(typeof b=="number")return Math.round(b);throw{error:"RuntimeError",message:"math functions take numbers as parameters"}}}}(c("less/tree")),function(a){a.Alpha=function(a){this.value=a},a.Alpha.prototype={toCSS:function(){return"alpha(opacity="+(this.value.toCSS?this.value.toCSS():this.value)+")"},eval:function(a){this.value.eval&&(this.value=this.value.eval(a));return this}}}(c("less/tree")),function(a){a.Anonymous=function(a){this.value=a.value||a},a.Anonymous.prototype={toCSS:function(){return this.value},eval:function(){return this}}}(c("less/tree")),function(a){a.Call=function(a,b,c){this.name=a,this.args=b,this.index=c},a.Call.prototype={eval:function(b){var c=this.args.map(function(a){return a.eval(b)});if(!(this.name in a.functions))return new a.Anonymous(this.name+"("+c.map(function(a){return a.toCSS()}).join(", ")+")");try{return a.functions[this.name].apply(a.functions,c)}catch(d){throw{message:"error evaluating function `"+this.name+"`",index:this.index}}},toCSS:function(a){return this.eval(a).toCSS()}}}(c("less/tree")),function(a){a.Color=function(a,b){Array.isArray(a)?this.rgb=a:a.length==6?this.rgb=a.match(/.{2}/g).map(function(a){return parseInt(a,16)}):a.length==8?(this.alpha=parseInt(a.substring(0,2),16)/255,this.rgb=a.substr(2).match(/.{2}/g).map(function(a){return parseInt(a,16)})):this.rgb=a.split("").map(function(a){return parseInt(a+a,16)}),this.alpha=typeof b=="number"?b:1},a.Color.prototype={eval:function(){return this},toCSS:function(){return this.alpha<1?"rgba("+this.rgb.map(function(a){return Math.round(a)}).concat(this.alpha).join(", ")+")":"#"+this.rgb.map(function(a){a=Math.round(a),a=(a>255?255:a<0?0:a).toString(16);return a.length===1?"0"+a:a}).join("")},operate:function(b,c){var d=[];c instanceof a.Color||(c=c.toColor());for(var e=0;e<3;e++)d[e]=a.operate(b,this.rgb[e],c.rgb[e]);return new a.Color(d,this.alpha+c.alpha)},toHSL:function(){var a=this.rgb[0]/255,b=this.rgb[1]/255,c=this.rgb[2]/255,d=this.alpha,e=Math.max(a,b,c),f=Math.min(a,b,c),g,h,i=(e+f)/2,j=e-f;if(e===f)g=h=0;else{h=i>.5?j/(2-e-f):j/(e+f);switch(e){case a:g=(b-c)/j+(b<c?6:0);break;case b:g=(c-a)/j+2;break;case c:g=(a-b)/j+4}g/=6}return{h:g*360,s:h,l:i,a:d}}}}(c("less/tree")),function(a){a.Comment=function(a,b){this.value=a,this.silent=!!b},a.Comment.prototype={toCSS:function(a){return a.compress?"":this.value},eval:function(){return this}}}(c("less/tree")),function(a){a.Dimension=function(a,b){this.value=parseFloat(a),this.unit=b||null},a.Dimension.prototype={eval:function(){return this},toColor:function(){return new a.Color([this.value,this.value,this.value])},toCSS:function(){var a=this.value+this.unit;return a},operate:function(b,c){return new a.Dimension(a.operate(b,this.value,c.value),this.unit||c.unit)}}}(c("less/tree")),function(a){a.Directive=function(b,c){this.name=b,Array.isArray(c)?this.ruleset=new a.Ruleset([],c):this.value=c},a.Directive.prototype={toCSS:function(a,b){if(this.ruleset){this.ruleset.root=!0;return this.name+(b.compress?"{":" {\n  ")+this.ruleset.toCSS(a,b).trim().replace(/\n/g,"\n  ")+(b.compress?"}":"\n}\n")}return this.name+" "+this.value.toCSS()+";\n"},eval:function(a){a.frames.unshift(this),this.ruleset=this.ruleset&&this.ruleset.eval(a),a.frames.shift();return this},variable:function(b){return a.Ruleset.prototype.variable.call(this.ruleset,b)},find:function(){return a.Ruleset.prototype.find.apply(this.ruleset,arguments)},rulesets:function(){return a.Ruleset.prototype.rulesets.apply(this.ruleset)}}}(c("less/tree")),function(a){a.Element=function(b,c){this.combinator=b instanceof a.Combinator?b:new a.Combinator(b),this.value=c.trim()},a.Element.prototype.toCSS=function(a){return this.combinator.toCSS(a||{})+this.value},a.Combinator=function(a){a===" "?this.value=" ":this.value=a?a.trim():""},a.Combinator.prototype.toCSS=function(a){return{"":""," ":" ","&":"",":":" :","::":"::","+":a.compress?"+":" + ","~":a.compress?"~":" ~ ",">":a.compress?">":" > "}[this.value]}}(c("less/tree")),function(a){a.Expression=function(a){this.value=a},a.Expression.prototype={eval:function(b){return this.value.length>1?new a.Expression(this.value.map(function(a){return a.eval(b)})):this.value.length===1?this.value[0].eval(b):this},toCSS:function(a){return this.value.map(function(b){return b.toCSS(a)}).join(" ")}}}(c("less/tree")),function(a){a.Import=function(b,c){var d=this;this._path=b,b instanceof a.Quoted?this.path=/\.(le?|c)ss$/.test(b.value)?b.value:b.value+".less":this.path=b.value.value||b.value,this.css=/css$/.test(this.path),this.css||c.push(this.path,function(a){if(!a)throw new Error("Error parsing "+d.path);d.root=a})},a.Import.prototype={toCSS:function(){return this.css?"@import "+this._path.toCSS()+";\n":""},eval:function(b){var c;if(this.css)return this;c=new a.Ruleset(null,this.root.rules.slice(0));for(var d=0;d<c.rules.length;d++)c.rules[d]instanceof a.Import&&Array.prototype.splice.apply(c.rules,[d,1].concat(c.rules[d].eval(b)));return c.rules}}}(c("less/tree")),function(a){a.JavaScript=function(a,b,c){this.escaped=c,this.expression=a,this.index=b},a.JavaScript.prototype={eval:function(b){var c,d=this,e={},f=this.expression.replace(/@\{([\w-]+)\}/g,function(c,e){return a.jsify((new a.Variable("@"+e,d.index)).eval(b))});try{f=new Function("return ("+f+")")}catch(g){throw{message:"JavaScript evaluation error: `"+f+"`",index:this.index}}for(var h in b.frames[0].variables())e[h.slice(1)]={value:b.frames[0].variables()[h].value,toJS:function(){return this.value.eval(b).toCSS()}};try{c=f.call(e)}catch(g){throw{message:"JavaScript evaluation error: '"+g.name+": "+g.message+"'",index:this.index}}return typeof c=="string"?new a.Quoted('"'+c+'"',c,this.escaped,this.index):Array.isArray(c)?new a.Anonymous(c.join(", ")):new a.Anonymous(c)}}}(c("less/tree")),function(a){a.Keyword=function(a){this.value=a},a.Keyword.prototype={eval:function(){return this},toCSS:function(){return this.value}}}(c("less/tree")),function(a){a.mixin={},a.mixin.Call=function(b,c,d){this.selector=new a.Selector(b),this.arguments=c,this.index=d},a.mixin.Call.prototype={eval:function(a){var b,c,d=[],e=!1;for(var f=0;f<a.frames.length;f++)if((b=a.frames[f].find(this.selector)).length>0){c=this.arguments&&this.arguments.map(function(b){return b.eval(a)});for(var g=0;g<b.length;g++)if(b[g].match(c,a))try{Array.prototype.push.apply(d,b[g].eval(a,this.arguments).rules),e=!0}catch(h){throw{message:h.message,index:h.index,stack:h.stack,call:this.index}}if(e)return d;throw{message:"No matching definition was found for `"+this.selector.toCSS().trim()+"("+this.arguments.map(function(a){return a.toCSS()}).join(", ")+")`",index:this.index}}throw{message:this.selector.toCSS().trim()+" is undefined",index:this.index}}},a.mixin.Definition=function(b,c,d){this.name=b,this.selectors=[new a.Selector([new a.Element(null,b)])],this.params=c,this.arity=c.length,this.rules=d,this._lookups={},this.required=c.reduce(function(a,b){return!b.name||b.name&&!b.value?a+1:a},0),this.parent=a.Ruleset.prototype,this.frames=[]},a.mixin.Definition.prototype={toCSS:function(){return""},variable:function(a){return this.parent.variable.call(this,a)},variables:function(){return this.parent.variables.call(this)},find:function(){return this.parent.find.apply(this,arguments)},rulesets:function(){return this.parent.rulesets.apply(this)},eval:function(b,c){var d=new a.Ruleset(null,[]),e,f=[];for(var g=0,h;g<this.params.length;g++)if(this.params[g].name)if(h=c&&c[g]||this.params[g].value)d.rules.unshift(new a.Rule(this.params[g].name,h.eval(b)));else throw{message:"wrong number of arguments for "+this.name+" ("+c.length+" for "+this.arity+")"};for(var g=0;g<Math.max(this.params.length,c&&c.length);g++)f.push(c[g]||this.params[g].value);d.rules.unshift(new a.Rule("@arguments",(new a.Expression(f)).eval(b)));return(new a.Ruleset(null,this.rules.slice(0))).eval({frames:[this,d].concat(this.frames,b.frames)})},match:function(a,b){var c=a&&a.length||0,d;if(c<this.required)return!1;if(this.required>0&&c>this.params.length)return!1;d=Math.min(c,this.arity);for(var e=0;e<d;e++)if(!this.params[e].name&&a[e].eval(b).toCSS()!=this.params[e].value.eval(b).toCSS())return!1;return!0}}}(c("less/tree")),function(a){a.Operation=function(a,b){this.op=a.trim(),this.operands=b},a.Operation.prototype.eval=function(b){var c=this.operands[0].eval(b),d=this.operands[1].eval(b),e;if(c instanceof a.Dimension&&d instanceof a.Color)if(this.op==="*"||this.op==="+")e=d,d=c,c=e;else throw{name:"OperationError",message:"Can't substract or divide a color from a number"};return c.operate(this.op,d)},a.operate=function(a,b,c){switch(a){case"+":return b+c;case"-":return b-c;case"*":return b*c;case"/":return b/c}}}(c("less/tree")),function(a){a.Quoted=function(a,b,c,d){this.escaped=c,this.value=b||"",this.quote=a.charAt(0),this.index=d},a.Quoted.prototype={toCSS:function(){return this.escaped?this.value:this.quote+this.value+this.quote},eval:function(b){var c=this,d=this.value.replace(/`([^`]+)`/g,function(d,e){return(new a.JavaScript(e,c.index,!0)).eval(b).value}).replace(/@\{([\w-]+)\}/g,function(d,e){var f=(new a.Variable("@"+e,c.index)).eval(b);return f.value||f.toCSS()});return new a.Quoted(this.quote+d+this.quote,d,this.escaped,this.index)}}}(c("less/tree")),function(a){a.Rule=function(b,c,d,e){this.name=b,this.value=c instanceof a.Value?c:new a.Value([c]),this.important=d?" "+d.trim():"",this.index=e,b.charAt(0)==="@"?this.variable=!0:this.variable=!1},a.Rule.prototype.toCSS=function(a){return this.variable?"":this.name+(a.compress?":":": ")+this.value.toCSS(a)+this.important+";"},a.Rule.prototype.eval=function(b){return new a.Rule(this.name,this.value.eval(b),this.important,this.index)},a.Shorthand=function(a,b){this.a=a,this.b=b},a.Shorthand.prototype={toCSS:function(a){return this.a.toCSS(a)+"/"+this.b.toCSS(a)},eval:function(){return this}}}(c("less/tree")),function(a){a.Ruleset=function(a,b){this.selectors=a,this.rules=b,this._lookups={}},a.Ruleset.prototype={eval:function(b){var c=new a.Ruleset(this.selectors,this.rules.slice(0));c.root=this.root,b.frames.unshift(c);if(c.root)for(var d=0;d<c.rules.length;d++)c.rules[d]instanceof a.Import&&Array.prototype.splice.apply(c.rules,[d,1].concat(c.rules[d].eval(b)));for(var d=0;d<c.rules.length;d++)c.rules[d]instanceof a.mixin.Definition&&(c.rules[d].frames=b.frames.slice(0));for(var d=0;d<c.rules.length;d++)c.rules[d]instanceof a.mixin.Call&&Array.prototype.splice.apply(c.rules,[d,1].concat(c.rules[d].eval(b)));for(var d=0,e;d<c.rules.length;d++)e=c.rules[d],e instanceof a.mixin.Definition||(c.rules[d]=e.eval?e.eval(b):e);b.frames.shift();return c},match:function(a){return!a||a.length===0},variables:function(){return this._variables?this._variables:this._variables=this.rules.reduce(function(b,c){c instanceof a.Rule&&c.variable===!0&&(b[c.name]=c);return b},{})},variable:function(a){return this.variables()[a]},rulesets:function(){return this._rulesets?this._rulesets:this._rulesets=this.rules.filter(function(b){return b instanceof a.Ruleset||b instanceof a.mixin.Definition})},find:function(b,c){c=c||this;var d=[],e,f,g=b.toCSS();if(g in this._lookups)return this._lookups[g];this.rulesets().forEach(function(e){if(e!==c)for(var g=0;g<e.selectors.length;g++)if(f=b.match(e.selectors[g])){b.elements.length>1?Array.prototype.push.apply(d,e.find(new a.Selector(b.elements.slice(1)),c)):d.push(e);break}});return this._lookups[g]=d},toCSS:function(b,c){var d=[],e=[],f=[],g=[],h,i;if(!this.root)if(b.length===0)g=this.selectors.map(function(a){return[a]});else for(var j=0;j<this.selectors.length;j++)for(var k=0;k<b.length;k++)g.push(b[k].concat([this.selectors[j]]));for(var l=0;l<this.rules.length;l++)i=this.rules[l],i.rules||i instanceof a.Directive?f.push(i.toCSS(g,c)):i instanceof a.Comment?i.silent||(this.root?f.push(i.toCSS(c)):e.push(i.toCSS(c))):i.toCSS&&!i.variable?e.push(i.toCSS(c)):i.value&&!i.variable&&e.push(i.value.toString());f=f.join(""),this.root?d.push(e.join(c.compress?"":"\n")):e.length>0&&(h=g.map(function(a){return a.map(function(a){return a.toCSS(c)}).join("").trim()}).join(c.compress?",":g.length>3?",\n":", "),d.push(h,(c.compress?"{":" {\n  ")+e.join(c.compress?"":"\n  ")+(c.compress?"}":"\n}\n"))),d.push(f);return d.join("")+(c.compress?"\n":"")}}}(c("less/tree")),function(a){a.Selector=function(a){this.elements=a,this.elements[0].combinator.value===""&&(this.elements[0].combinator.value=" ")},a.Selector.prototype.match=function(a){return this.elements[0].value===a.elements[0].value?!0:!1},a.Selector.prototype.toCSS=function(a){if(this._css)return this._css;return this._css=this.elements.map(function(b){return typeof b=="string"?" "+b.trim():b.toCSS(a)}).join("")}}(c("less/tree")),function(b){b.URL=function(b,c){b.data?this.attrs=b:(!/^(?:https?:\/|file:\/|data:\/)?\//.test(b.value)&&c.length>0&&typeof a!="undefined"&&(b.value=c[0]+(b.value.charAt(0)==="/"?b.value.slice(1):b.value)),this.value=b,this.paths=c)},b.URL.prototype={toCSS:function(){return"url("+(this.attrs?"data:"+this.attrs.mime+this.attrs.charset+this.attrs.base64+this.attrs.data:this.value.toCSS())+")"},eval:function(a){return this.attrs?this:new b.URL(this.value.eval(a),this.paths)}}}(c("less/tree")),function(a){a.Value=function(a){this.value=a,this.is="value"},a.Value.prototype={eval:function(b){return this.value.length===1?this.value[0].eval(b):new a.Value(this.value.map(function(a){return a.eval(b)}))},toCSS:function(a){return this.value.map(function(b){return b.toCSS(a)}).join(a.compress?",":", ")}}}(c("less/tree")),function(a){a.Variable=function(a,b){this.name=a,this
.index=b},a.Variable.prototype={eval:function(b){var c,d,e=this.name;e.indexOf("@@")==0&&(e="@"+(new a.Variable(e.slice(1))).eval(b).value);if(c=a.find(b.frames,function(a){if(d=a.variable(e))return d.value.eval(b)}))return c;throw{message:"variable "+e+" is undefined",index:this.index}}}}(c("less/tree")),c("less/tree").find=function(a,b){for(var c=0,d;c<a.length;c++)if(d=b.call(a,a[c]))return d;return null},c("less/tree").jsify=function(a){return Array.isArray(a.value)&&a.value.length>1?"["+a.value.map(function(a){return a.toCSS(!1)}).join(", ")+"]":a.toCSS(!1)};var g=location.protocol==="file:"||location.protocol==="chrome:"||location.protocol==="chrome-extension:"||location.protocol==="resource:";d.env=d.env||(location.hostname=="127.0.0.1"||location.hostname=="0.0.0.0"||location.hostname=="localhost"||location.port.length>0||g?"development":"production"),d.async=!1,d.poll=d.poll||(g?1e3:1500),d.watch=function(){return this.watchMode=!0},d.unwatch=function(){return this.watchMode=!1},d.env==="development"?(d.optimization=0,/!watch/.test(location.hash)&&d.watch(),d.watchTimer=setInterval(function(){d.watchMode&&n(function(a,b,c){a&&q(a.toCSS(),b,c.lastModified)})},d.poll)):d.optimization=3;var h;try{h=typeof a.localStorage=="undefined"?null:a.localStorage}catch(i){h=null}var j=document.getElementsByTagName("link"),k=/^text\/(x-)?less$/;d.sheets=[];for(var l=0;l<j.length;l++)(j[l].rel==="stylesheet/less"||j[l].rel.match(/stylesheet/)&&j[l].type.match(k))&&d.sheets.push(j[l]);d.refresh=function(a){var b,c;b=c=new Date,n(function(a,d,e){e.local?u("loading "+d.href+" from cache."):(u("parsed "+d.href+" successfully."),q(a.toCSS(),d,e.lastModified)),u("css for "+d.href+" generated in "+(new Date-c)+"ms"),e.remaining===0&&u("css generated in "+(new Date-b)+"ms"),c=new Date},a),m()},d.refreshStyles=m,d.refresh(d.env==="development")})(window)

