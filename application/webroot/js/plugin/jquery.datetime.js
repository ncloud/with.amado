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

