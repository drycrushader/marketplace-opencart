(function($){
    /*! Swipebox | Constantin Saguin http://bsign.co | 1.1.2 | MIT License | github.com/brutaldesign/swipebox */
    !function(i,e,t,s){t.swipebox=function(o,n){var a={useCSS:!0,hideBarsDelay:3e3},r=this,d=t(o),o=o,l=o.selector,p=t(l),c=e.createTouch!==s||"ontouchstart"in i||"onmsgesturechange"in i||navigator.msMaxTouchPoints,u=!!i.SVGSVGElement,b='<div id="swipebox-overlay">					<div id="swipebox-slider"></div>					<div id="swipebox-caption"></div>					<div id="swipebox-action">						<a id="swipebox-close"></a>						<a id="swipebox-prev"></a>						<a id="swipebox-next"></a>					</div>			</div>';r.settings={},r.init=function(){r.settings=t.extend({},a,n),p.click(function(i){i.preventDefault(),i.stopPropagation(),index=d.index(t(this)),x.target=t(i.target),x.init(index)})};var x={init:function(i){this.target.trigger("swipebox-start"),this.build(),this.openSlide(i),this.openImg(i),this.preloadImg(i+1),this.preloadImg(i-1)},build:function(){var e=this;if(t("body").append(b),e.doCssTrans()&&(t("#swipebox-slider").css({"-webkit-transition":"left 0.4s ease","-moz-transition":"left 0.4s ease","-o-transition":"left 0.4s ease","-khtml-transition":"left 0.4s ease",transition:"left 0.4s ease"}),t("#swipebox-overlay").css({"-webkit-transition":"opacity 1s ease","-moz-transition":"opacity 1s ease","-o-transition":"opacity 1s ease","-khtml-transition":"opacity 1s ease",transition:"opacity 1s ease"}),t("#swipebox-action, #swipebox-caption").css({"-webkit-transition":"0.5s","-moz-transition":"0.5s","-o-transition":"0.5s","-khtml-transition":"0.5s",transition:"0.5s"})),u){var s=t("#swipebox-action #swipebox-close").css("background-image");s=s.replace("png","svg"),t("#swipebox-action #swipebox-prev,#swipebox-action #swipebox-next,#swipebox-action #swipebox-close").css({"background-image":s})}d.each(function(){t("#swipebox-slider").append('<div class="slide"></div>')}),e.setDim(),e.actions(),e.keyboard(),e.gesture(),e.animBars(),t(i).resize(function(){e.setDim()}).resize()},setDim:function(){var e={width:t(i).width(),height:i.innerHeight?i.innerHeight:t(i).height()};t("#swipebox-overlay").css(e)},supportTransition:function(){for(var i="transition WebkitTransition MozTransition OTransition msTransition KhtmlTransition".split(" "),t=0;t<i.length;t++)if(e.createElement("div").style[i[t]]!==s)return i[t];return!1},doCssTrans:function(){return r.settings.useCSS&&this.supportTransition()?!0:void 0},gesture:function(){if(c){var i=this,e=null,s=10,o={},n={},a=t("#swipebox-caption, #swipebox-action");a.addClass("visible-bars"),i.setTimeout(),t("body").bind("touchstart",function(i){return t(this).addClass("touching"),n=i.originalEvent.targetTouches[0],o.pageX=i.originalEvent.targetTouches[0].pageX,t(".touching").bind("touchmove",function(i){i.preventDefault(),i.stopPropagation(),n=i.originalEvent.targetTouches[0]}),!1}).bind("touchend",function(r){r.preventDefault(),r.stopPropagation(),e=n.pageX-o.pageX,e>=s?i.getPrev():-s>=e?i.getNext():a.hasClass("visible-bars")?(i.clearTimeout(),i.hideBars()):(i.showBars(),i.setTimeout()),t(".touching").off("touchmove").removeClass("touching")})}},setTimeout:function(){if(r.settings.hideBarsDelay>0){var e=this;e.clearTimeout(),e.timeout=i.setTimeout(function(){e.hideBars()},r.settings.hideBarsDelay)}},clearTimeout:function(){i.clearTimeout(this.timeout),this.timeout=null},showBars:function(){var i=t("#swipebox-caption, #swipebox-action");this.doCssTrans()?i.addClass("visible-bars"):(t("#swipebox-caption").animate({top:0},500),t("#swipebox-action").animate({bottom:0},500),setTimeout(function(){i.addClass("visible-bars")},1e3))},hideBars:function(){var i=t("#swipebox-caption, #swipebox-action");this.doCssTrans()?i.removeClass("visible-bars"):(t("#swipebox-caption").animate({top:"-50px"},500),t("#swipebox-action").animate({bottom:"-50px"},500),setTimeout(function(){i.removeClass("visible-bars")},1e3))},animBars:function(){var i=this,e=t("#swipebox-caption, #swipebox-action");e.addClass("visible-bars"),i.setTimeout(),t("#swipebox-slider").click(function(t){e.hasClass("visible-bars")||(i.showBars(),i.setTimeout())}),t("#swipebox-action").hover(function(){i.showBars(),e.addClass("force-visible-bars"),i.clearTimeout()},function(){e.removeClass("force-visible-bars"),i.setTimeout()})},keyboard:function(){var e=this;t(i).bind("keyup",function(i){i.preventDefault(),i.stopPropagation(),37==i.keyCode?e.getPrev():39==i.keyCode?e.getNext():27==i.keyCode&&e.closeSlide()})},actions:function(){var i=this;d.length<2?t("#swipebox-prev, #swipebox-next").hide():(t("#swipebox-prev").bind("click touchend",function(e){e.preventDefault(),e.stopPropagation(),i.getPrev(),i.setTimeout()}),t("#swipebox-next").bind("click touchend",function(e){e.preventDefault(),e.stopPropagation(),i.getNext(),i.setTimeout()})),t("#swipebox-close").bind("click touchend",function(e){i.closeSlide(),$(".gallery-fix").delay(1).fadeOut(0)})},setSlide:function(i,e){e=e||!1;var s=t("#swipebox-slider");this.doCssTrans()?s.css({left:100*-i+"%"}):s.animate({left:100*-i+"%"}),t("#swipebox-slider .slide").removeClass("current"),t("#swipebox-slider .slide").eq(i).addClass("current"),this.setTitle(i),e&&s.fadeIn(),t("#swipebox-prev, #swipebox-next").removeClass("disabled"),0==i?t("#swipebox-prev").addClass("disabled"):i==d.length-1&&t("#swipebox-next").addClass("disabled")},openSlide:function(e){t("html").addClass("swipebox"),t(i).trigger("resize"),this.setSlide(e,!0)},preloadImg:function(i){var e=this;setTimeout(function(){e.openImg(i)},1e3)},openImg:function(i){var e=this;return 0>i||i>=d.length?!1:void e.loadImg(d.eq(i).attr("href"),function(){t("#swipebox-slider .slide").eq(i).html(this)})},setTitle:function(i,e){t("#swipebox-caption").empty(),d.eq(i).attr("title")&&t("#swipebox-caption").append(d.eq(i).attr("title"))},loadImg:function(i,e){var s=t("<img>").on("load",function(){e.call(s)});s.attr("src",i)},getNext:function(){var i=this;index=t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current")),index+1<d.length?(index++,i.setSlide(index),i.preloadImg(index+1)):(t("#swipebox-slider").addClass("rightSpring"),setTimeout(function(){t("#swipebox-slider").removeClass("rightSpring")},500))},getPrev:function(){var i=this;index=t("#swipebox-slider .slide").index(t("#swipebox-slider .slide.current")),index>0?(index--,i.setSlide(index),i.preloadImg(index-1)):(t("#swipebox-slider").addClass("leftSpring"),setTimeout(function(){t("#swipebox-slider").removeClass("leftSpring")},500))},closeSlide:function(){var e=this;t(i).trigger("resize"),t("html").removeClass("swipebox"),e.destroy()},destroy:function(){var e=this;t(i).unbind("keyup"),t("body").unbind("touchstart"),t("body").unbind("touchmove"),t("body").unbind("touchend"),t("#swipebox-slider").unbind(),t("#swipebox-overlay").remove(),d.removeData("_swipebox"),e.target.trigger("swipebox-destroy")}};r.init()},t.fn.swipebox=function(i){if(!t.data(this,"_swipebox")){var e=new t.swipebox(this,i);this.data("_swipebox",e)}}}(window,document,jQuery);	
}(jQuery));

    
(function($){
    /*! Lazy Load 1.9.5 - MIT license - Copyright 2010-2015 Mika Tuupola */
    !function(a,b,c,d){var e=a(b);a.fn.lazyload=function(f){function g(){var b=0;i.each(function(){var c=a(this);if(!j.skip_invisible||c.is(":visible"))if(a.abovethetop(this,j)||a.leftofbegin(this,j));else if(a.belowthefold(this,j)||a.rightoffold(this,j)){if(++b>j.failure_limit)return!1}else c.trigger("appear"),b=0})}var h,i=this,j={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:b,data_attribute:"original",skip_invisible:!1,appear:null,load:null,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"};return f&&(d!==f.failurelimit&&(f.failure_limit=f.failurelimit,delete f.failurelimit),d!==f.effectspeed&&(f.effect_speed=f.effectspeed,delete f.effectspeed),a.extend(j,f)),h=j.container===d||j.container===b?e:a(j.container),0===j.event.indexOf("scroll")&&h.bind(j.event,function(){return g()}),this.each(function(){var b=this,c=a(b);b.loaded=!1,(c.attr("src")===d||c.attr("src")===!1)&&c.is("img")&&c.attr("src",j.placeholder),c.one("appear",function(){if(!this.loaded){if(j.appear){var d=i.length;j.appear.call(b,d,j)}a("<img />").bind("load",function(){var d=c.attr("data-"+j.data_attribute);c.hide(),c.is("img")?c.attr("src",d):c.css("background-image","url('"+d+"')"),c[j.effect](j.effect_speed),b.loaded=!0;var e=a.grep(i,function(a){return!a.loaded});if(i=a(e),j.load){var f=i.length;j.load.call(b,f,j)}}).attr("src",c.attr("data-"+j.data_attribute))}}),0!==j.event.indexOf("scroll")&&c.bind(j.event,function(){b.loaded||c.trigger("appear")})}),e.bind("resize",function(){g()}),/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion)&&e.bind("pageshow",function(b){b.originalEvent&&b.originalEvent.persisted&&i.each(function(){a(this).trigger("appear")})}),a(c).ready(function(){g()}),this},a.belowthefold=function(c,f){var g;return g=f.container===d||f.container===b?(b.innerHeight?b.innerHeight:e.height())+e.scrollTop():a(f.container).offset().top+a(f.container).height(),g<=a(c).offset().top-f.threshold},a.rightoffold=function(c,f){var g;return g=f.container===d||f.container===b?e.width()+e.scrollLeft():a(f.container).offset().left+a(f.container).width(),g<=a(c).offset().left-f.threshold},a.abovethetop=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollTop():a(f.container).offset().top,g>=a(c).offset().top+f.threshold+a(c).height()},a.leftofbegin=function(c,f){var g;return g=f.container===d||f.container===b?e.scrollLeft():a(f.container).offset().left,g>=a(c).offset().left+f.threshold+a(c).width()},a.inviewport=function(b,c){return!(a.rightoffold(b,c)||a.leftofbegin(b,c)||a.belowthefold(b,c)||a.abovethetop(b,c))},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0})},"above-the-top":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-screen":function(b){return a.rightoffold(b,{threshold:0})},"left-of-screen":function(b){return!a.rightoffold(b,{threshold:0})},"in-viewport":function(b){return a.inviewport(b,{threshold:0})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0})}})}(jQuery,window,document);    
}(jQuery));

(function($){
    /*  http://nanobar.micronube.com/  https://github.com/jacoborus/nanobar/  MIT LICENSE */
    !function(t,i){"object"==typeof exports?i(exports):"function"==typeof define&&define.amd?define(["exports"],i):i(t)}(this,function(t){return t.Nanobar=function(){"use strict";var t,i,e,h,s,n,o={width:"100%",height:"3px",zIndex:9999,top:"60px"},l={width:0,height:"100%",clear:"both",transition:"height 250ms"};return t=function(t,i){var e;for(e in i)t.style[e]=i[e];t.style["float"]="left"},h=function(){var t=this,i=this.width-this.here;.1>i&&i>-.1?(s.call(this,this.here),this.moving=!1,100==this.width&&(this.el.style.height=0,setTimeout(function(){t.cont.el.removeChild(t.el)},300))):(s.call(this,this.width-i/4),setTimeout(function(){t.go()},16))},s=function(t){this.width=t,this.el.style.width=this.width+"%"},n=function(){var t=new i(this);this.bars.unshift(t)},i=function(i){this.el=document.createElement("div"),this.el.style.backgroundColor=i.opts.bg,this.width=0,this.here=0,this.moving=!1,this.cont=i,t(this.el,l),i.el.appendChild(this.el)},i.prototype.go=function(t){t?(this.here=t,this.moving||(this.moving=!0,h.call(this))):this.moving&&h.call(this)},e=function(i){var e,h=this.opts=i||{};h.bg=h.bg||"#000",this.bars=[],e=this.el=document.createElement("div"),t(this.el,o),h.id&&(e.id=h.id),e.style.position=h.target?"relative":"fixed",h.target?h.target.insertBefore(e,h.target.firstChild):document.getElementsByTagName("body")[0].appendChild(e),n.call(this)},e.prototype.go=function(t){this.bars[0].go(t),100==t&&n.call(this)},e}(),t.Nanobar});
}(jQuery));

    
(function($){
    /*License MIT & GPL 3.0 Licenses | https://github.com/rendro/countdown */ 
    !function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Countdown=t()}}(function(){return function t(e,i,n){function s(r,a){if(!i[r]){if(!e[r]){var d="function"==typeof require&&require;if(!a&&d)return d(r,!0);if(o)return o(r,!0);var f=new Error("Cannot find module '"+r+"'");throw f.code="MODULE_NOT_FOUND",f}var h=i[r]={exports:{}};e[r][0].call(h.exports,function(t){var i=e[r][1][t];return s(i?i:t)},h,h.exports,t,e,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r]);return s}({1:[function(t,e){var i={date:"June 7, 2087 15:03:25",refresh:1e3,offset:0,onEnd:function(){},render:function(t){this.el.innerHTML="<div class='date-years'>"+t.years+"<em>years</em> </div><div class='date-days'>"+t.days+"<em>days</em> </div><div class='date-hours'>"+this.leadingZeros(t.hours)+"<em>hours</em> </div><div class='date-minutes'>"+this.leadingZeros(t.min)+"<em>minutes</em> </div><div class='date-seconds'>"+this.leadingZeros(t.sec)+"<em>seconds</em> </div>"}},n=function(t,e){this.el=t,this.options={},this.interval=!1;for(var n in i)i.hasOwnProperty(n)&&(this.options[n]="undefined"!=typeof e[n]?e[n]:i[n],"date"===n&&"object"!=typeof this.options.date&&(this.options.date=new Date(this.options.date)),"function"==typeof this.options[n]&&(this.options[n]=this.options[n].bind(this)));this.getDiffDate=function(){var t=(this.options.date.getTime()-Date.now()+this.options.offset)/1e3,e={years:0,days:0,hours:0,min:0,sec:0,millisec:0};return 0>=t?(this.interval&&(this.stop(),this.options.onEnd()),e):(t>=31557600&&(e.years=Math.floor(t/31557600),t-=365.25*e.years*86400),t>=86400&&(e.days=Math.floor(t/86400),t-=86400*e.days),t>=3600&&(e.hours=Math.floor(t/3600),t-=3600*e.hours),t>=60&&(e.min=Math.floor(t/60),t-=60*e.min),e.sec=Math.round(t),e.millisec=t%1*1e3,e)}.bind(this),this.leadingZeros=function(t,e){return e=e||2,t=String(t),t.length>e?t:(Array(e+1).join("0")+t).substr(-e)},this.update=function(t){return"object"!=typeof t&&(t=new Date(t)),this.options.date=t,this.render(),this}.bind(this),this.stop=function(){return this.interval&&(clearInterval(this.interval),this.interval=!1),this}.bind(this),this.render=function(){return this.options.render(this.getDiffDate()),this}.bind(this),this.start=function(){return this.interval?void 0:(this.render(),this.options.refresh&&(this.interval=setInterval(this.render,this.options.refresh)),this)}.bind(this),this.updateOffset=function(t){return this.options.offset=t,this}.bind(this),this.start()};e.exports=n},{}],2:[function(t,e){var i=t("./countdown.js"),n="countdown",s="date";jQuery.fn.countdown=function(t){return $.each(this,function(e,o){var r=$(o);r.data(n)||(r.data(s)&&(t.date=r.data(s)),r.data(n,new i(o,t)))})},e.exports=i},{"./countdown.js":1}]},{},[2])(2)}); 
}(jQuery));

(function($){
    /* Justified Gallery - v3.6.1 | http://miromannino.github.io/Justified-Gallery/ | Copyright (c) 2015 Miro Mannino  | Licensed under the MIT license.*/
    !function(a){var b=function(b,c){this.settings=c,this.checkSettings(),this.imgAnalyzerTimeout=null,this.entries=null,this.buildingRow={entriesBuff:[],width:0,height:0,aspectRatio:0},this.lastAnalyzedIndex=-1,this.yield={every:2,flushed:0},this.border=c.border>=0?c.border:c.margins,this.maxRowHeight=this.retrieveMaxRowHeight(),this.suffixRanges=this.retrieveSuffixRanges(),this.offY=this.border,this.spinner={phase:0,timeSlot:150,$el:a('<div class="spinner"><span></span><span></span><span></span></div>'),intervalId:null},this.checkWidthIntervalId=null,this.galleryWidth=b.width(),this.$gallery=b};b.prototype.getSuffix=function(a,b){var c,d;for(c=a>b?a:b,d=0;d<this.suffixRanges.length;d++)if(c<=this.suffixRanges[d])return this.settings.sizeRangeSuffixes[this.suffixRanges[d]];return this.settings.sizeRangeSuffixes[this.suffixRanges[d-1]]},b.prototype.removeSuffix=function(a,b){return a.substring(0,a.length-b.length)},b.prototype.endsWith=function(a,b){return-1!==a.indexOf(b,a.length-b.length)},b.prototype.getUsedSuffix=function(a){for(var b in this.settings.sizeRangeSuffixes)if(this.settings.sizeRangeSuffixes.hasOwnProperty(b)){if(0===this.settings.sizeRangeSuffixes[b].length)continue;if(this.endsWith(a,this.settings.sizeRangeSuffixes[b]))return this.settings.sizeRangeSuffixes[b]}return""},b.prototype.newSrc=function(a,b,c){var d;if(this.settings.thumbnailPath)d=this.settings.thumbnailPath(a,b,c);else{var e=a.match(this.settings.extension),f=null!==e?e[0]:"";d=a.replace(this.settings.extension,""),d=this.removeSuffix(d,this.getUsedSuffix(d)),d+=this.getSuffix(b,c)+f}return d},b.prototype.showImg=function(a,b){this.settings.cssAnimation?(a.addClass("entry-visible"),b&&b()):a.stop().fadeTo(this.settings.imagesAnimationDuration,1,b)},b.prototype.extractImgSrcFromImage=function(a){var b="undefined"!=typeof a.data("safe-src")?a.data("safe-src"):a.attr("src");return a.data("jg.originalSrc",b),b},b.prototype.imgFromEntry=function(a){var b=a.find("> img");return 0===b.length&&(b=a.find("> a > img")),0===b.length?null:b},b.prototype.captionFromEntry=function(a){var b=a.find("> .caption");return 0===b.length?null:b},b.prototype.displayEntry=function(b,c,d,e,f,g){b.width(e),b.height(g),b.css("top",d),b.css("left",c);var h=this.imgFromEntry(b);if(null!==h){h.css("width",e),h.css("height",f),h.css("margin-left",-e/2),h.css("margin-top",-f/2);var i=h.attr("src"),j=this.newSrc(i,e,f);h.one("error",function(){h.attr("src",h.data("jg.originalSrc"))});var k=function(){i!==j&&h.attr("src",j)};"skipped"===b.data("jg.loaded")?this.onImageEvent(i,a.proxy(function(){this.showImg(b,k),b.data("jg.loaded",!0)},this)):this.showImg(b,k)}else this.showImg(b);this.displayEntryCaption(b)},b.prototype.displayEntryCaption=function(b){var c=this.imgFromEntry(b);if(null!==c&&this.settings.captions){var d=this.captionFromEntry(b);if(null===d){var e=c.attr("alt");this.isValidCaption(e)||(e=b.attr("title")),this.isValidCaption(e)&&(d=a('<div class="caption">'+e+"</div>"),b.append(d),b.data("jg.createdCaption",!0))}null!==d&&(this.settings.cssAnimation||d.stop().fadeTo(0,this.settings.captionSettings.nonVisibleOpacity),this.addCaptionEventsHandlers(b))}else this.removeCaptionEventsHandlers(b)},b.prototype.isValidCaption=function(a){return"undefined"!=typeof a&&a.length>0},b.prototype.onEntryMouseEnterForCaption=function(b){var c=this.captionFromEntry(a(b.currentTarget));this.settings.cssAnimation?c.addClass("caption-visible").removeClass("caption-hidden"):c.stop().fadeTo(this.settings.captionSettings.animationDuration,this.settings.captionSettings.visibleOpacity)},b.prototype.onEntryMouseLeaveForCaption=function(b){var c=this.captionFromEntry(a(b.currentTarget));this.settings.cssAnimation?c.removeClass("caption-visible").removeClass("caption-hidden"):c.stop().fadeTo(this.settings.captionSettings.animationDuration,this.settings.captionSettings.nonVisibleOpacity)},b.prototype.addCaptionEventsHandlers=function(b){var c=b.data("jg.captionMouseEvents");"undefined"==typeof c&&(c={mouseenter:a.proxy(this.onEntryMouseEnterForCaption,this),mouseleave:a.proxy(this.onEntryMouseLeaveForCaption,this)},b.on("mouseenter",void 0,void 0,c.mouseenter),b.on("mouseleave",void 0,void 0,c.mouseleave),b.data("jg.captionMouseEvents",c))},b.prototype.removeCaptionEventsHandlers=function(a){var b=a.data("jg.captionMouseEvents");"undefined"!=typeof b&&(a.off("mouseenter",void 0,b.mouseenter),a.off("mouseleave",void 0,b.mouseleave),a.removeData("jg.captionMouseEvents"))},b.prototype.prepareBuildingRow=function(a){var b,c,d,e,f,g=!0,h=0,i=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*this.settings.margins,j=i/this.buildingRow.aspectRatio,k=this.buildingRow.width/i>this.settings.justifyThreshold;if(a&&"hide"===this.settings.lastRow&&!k){for(b=0;b<this.buildingRow.entriesBuff.length;b++)c=this.buildingRow.entriesBuff[b],this.settings.cssAnimation?c.removeClass("entry-visible"):c.stop().fadeTo(0,0);return-1}for(a&&!k&&"justify"!==this.settings.lastRow&&"hide"!==this.settings.lastRow&&(g=!1),b=0;b<this.buildingRow.entriesBuff.length;b++)c=this.buildingRow.entriesBuff[b],d=c.data("jg.width")/c.data("jg.height"),g?(e=b===this.buildingRow.entriesBuff.length-1?i:j*d,f=j):(e=this.settings.rowHeight*d,f=this.settings.rowHeight),i-=Math.round(e),c.data("jg.jwidth",Math.round(e)),c.data("jg.jheight",Math.ceil(f)),(0===b||h>f)&&(h=f);return this.settings.fixedHeight&&h>this.settings.rowHeight&&(h=this.settings.rowHeight),this.buildingRow.height=h,g},b.prototype.clearBuildingRow=function(){this.buildingRow.entriesBuff=[],this.buildingRow.aspectRatio=0,this.buildingRow.width=0},b.prototype.flushRow=function(a){var b,c,d,e=this.settings,f=this.border;if(c=this.prepareBuildingRow(a),a&&"hide"===e.lastRow&&-1===this.buildingRow.height)return void this.clearBuildingRow();if(this.maxRowHeight.isPercentage?this.maxRowHeight.value*e.rowHeight<this.buildingRow.height&&(this.buildingRow.height=this.maxRowHeight.value*e.rowHeight):this.maxRowHeight.value>0&&this.maxRowHeight.value<this.buildingRow.height&&(this.buildingRow.height=this.maxRowHeight.value),"center"===e.lastRow||"right"===e.lastRow){var g=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*e.margins;for(d=0;d<this.buildingRow.entriesBuff.length;d++)b=this.buildingRow.entriesBuff[d],g-=b.data("jg.jwidth");"center"===e.lastRow?f+=g/2:"right"===e.lastRow&&(f+=g)}for(d=0;d<this.buildingRow.entriesBuff.length;d++)b=this.buildingRow.entriesBuff[d],this.displayEntry(b,f,this.offY,b.data("jg.jwidth"),b.data("jg.jheight"),this.buildingRow.height),f+=b.data("jg.jwidth")+e.margins;this.$gallery.height(this.offY+this.buildingRow.height+this.border+(this.isSpinnerActive()?this.getSpinnerHeight():0)),(!a||this.buildingRow.height<=e.rowHeight&&c)&&(this.offY+=this.buildingRow.height+e.margins,this.clearBuildingRow(),this.$gallery.trigger("jg.rowflush"))},b.prototype.checkWidth=function(){this.checkWidthIntervalId=setInterval(a.proxy(function(){var a=parseFloat(this.$gallery.width());Math.abs(a-this.galleryWidth)>this.settings.refreshSensitivity&&(this.galleryWidth=a,this.rewind(),this.startImgAnalyzer(!0))},this),this.settings.refreshTime)},b.prototype.isSpinnerActive=function(){return null!==this.spinner.intervalId},b.prototype.getSpinnerHeight=function(){return this.spinner.$el.innerHeight()},b.prototype.stopLoadingSpinnerAnimation=function(){clearInterval(this.spinner.intervalId),this.spinner.intervalId=null,this.$gallery.height(this.$gallery.height()-this.getSpinnerHeight()),this.spinner.$el.detach()},b.prototype.startLoadingSpinnerAnimation=function(){var a=this.spinner,b=a.$el.find("span");clearInterval(a.intervalId),this.$gallery.append(a.$el),this.$gallery.height(this.offY+this.buildingRow.height+this.getSpinnerHeight()),a.intervalId=setInterval(function(){a.phase<b.length?b.eq(a.phase).fadeTo(a.timeSlot,1):b.eq(a.phase-b.length).fadeTo(a.timeSlot,0),a.phase=(a.phase+1)%(2*b.length)},a.timeSlot)},b.prototype.rewind=function(){this.lastAnalyzedIndex=-1,this.offY=this.border,this.clearBuildingRow()},b.prototype.updateEntries=function(b){return this.entries=this.$gallery.find(this.settings.selector).toArray(),0===this.entries.length?!1:(this.settings.filter?this.modifyEntries(this.filterArray,b):this.modifyEntries(this.resetFilters,b),a.isFunction(this.settings.sort)?this.modifyEntries(this.sortArray,b):this.settings.randomize&&this.modifyEntries(this.shuffleArray,b),!0)},b.prototype.insertToGallery=function(b){var c=this;a.each(b,function(){a(this).appendTo(c.$gallery)})},b.prototype.shuffleArray=function(a){var b,c,d;for(b=a.length-1;b>0;b--)c=Math.floor(Math.random()*(b+1)),d=a[b],a[b]=a[c],a[c]=d;return this.insertToGallery(a),a},b.prototype.sortArray=function(a){return a.sort(this.settings.sort),this.insertToGallery(a),a},b.prototype.resetFilters=function(b){for(var c=0;c<b.length;c++)a(b[c]).removeClass("jg-filtered");return b},b.prototype.filterArray=function(b){var c=this.settings;return"string"===a.type(c.filter)?b.filter(function(b){var d=a(b);return d.is(c.filter)?(d.removeClass("jg-filtered"),!0):(d.addClass("jg-filtered"),!1)}):a.isFunction(c.filter)?b.filter(c.filter):void 0},b.prototype.modifyEntries=function(a,b){var c=b?this.entries.splice(this.lastAnalyzedIndex+1,this.entries.length-this.lastAnalyzedIndex-1):this.entries;c=a.call(this,c),this.entries=b?this.entries.concat(c):c},b.prototype.destroy=function(){clearInterval(this.checkWidthIntervalId),a.each(this.entries,a.proxy(function(b,c){var d=a(c);d.css("width",""),d.css("height",""),d.css("top",""),d.css("left",""),d.data("jg.loaded",void 0),d.removeClass("jg-entry");var e=this.imgFromEntry(d);e.css("width",""),e.css("height",""),e.css("margin-left",""),e.css("margin-top",""),e.attr("src",e.data("jg.originalSrc")),e.data("jg.originalSrc",void 0),this.removeCaptionEventsHandlers(d);var f=this.captionFromEntry(d);d.data("jg.createdCaption")?(d.data("jg.createdCaption",void 0),null!==f&&f.remove()):null!==f&&f.fadeTo(0,1)},this)),this.$gallery.css("height",""),this.$gallery.removeClass("justified-gallery"),this.$gallery.data("jg.controller",void 0)},b.prototype.analyzeImages=function(b){for(var c=this.lastAnalyzedIndex+1;c<this.entries.length;c++){var d=a(this.entries[c]);if(d.data("jg.loaded")===!0||"skipped"===d.data("jg.loaded")){var e=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*this.settings.margins,f=d.data("jg.width")/d.data("jg.height");if(e/(this.buildingRow.aspectRatio+f)<this.settings.rowHeight&&(this.flushRow(!1),++this.yield.flushed>=this.yield.every))return void this.startImgAnalyzer(b);this.buildingRow.entriesBuff.push(d),this.buildingRow.aspectRatio+=f,this.buildingRow.width+=f*this.settings.rowHeight,this.lastAnalyzedIndex=c}else if("error"!==d.data("jg.loaded"))return}this.buildingRow.entriesBuff.length>0&&this.flushRow(!0),this.isSpinnerActive()&&this.stopLoadingSpinnerAnimation(),this.stopImgAnalyzerStarter(),this.$gallery.trigger(b?"jg.resize":"jg.complete")},b.prototype.stopImgAnalyzerStarter=function(){this.yield.flushed=0,null!==this.imgAnalyzerTimeout&&clearTimeout(this.imgAnalyzerTimeout)},b.prototype.startImgAnalyzer=function(a){var b=this;this.stopImgAnalyzerStarter(),this.imgAnalyzerTimeout=setTimeout(function(){b.analyzeImages(a)},.001)},b.prototype.onImageEvent=function(b,c,d){if(c||d){var e=new Image,f=a(e);c&&f.one("load",function(){f.off("load error"),c(e)}),d&&f.one("error",function(){f.off("load error"),d(e)}),e.src=b}},b.prototype.init=function(){var b=!1,c=!1,d=this;a.each(this.entries,function(e,f){var g=a(f),h=d.imgFromEntry(g);if(g.addClass("jg-entry"),g.data("jg.loaded")!==!0&&"skipped"!==g.data("jg.loaded"))if(null!==d.settings.rel&&g.attr("rel",d.settings.rel),null!==d.settings.target&&g.attr("target",d.settings.target),null!==h){var i=d.extractImgSrcFromImage(h);if(h.attr("src",i),d.settings.waitThumbnailsLoad===!1){var j=parseFloat(h.attr("width")),k=parseFloat(h.attr("height"));if(!isNaN(j)&&!isNaN(k))return g.data("jg.width",j),g.data("jg.height",k),g.data("jg.loaded","skipped"),c=!0,d.startImgAnalyzer(!1),!0}g.data("jg.loaded",!1),b=!0,d.isSpinnerActive()||d.startLoadingSpinnerAnimation(),d.onImageEvent(i,function(a){g.data("jg.width",a.width),g.data("jg.height",a.height),g.data("jg.loaded",!0),d.startImgAnalyzer(!1)},function(){g.data("jg.loaded","error"),d.startImgAnalyzer(!1)})}else g.data("jg.loaded",!0),g.data("jg.width",g.width()|parseFloat(g.css("width"))|1),g.data("jg.height",g.height()|parseFloat(g.css("height"))|1)}),b||c||this.startImgAnalyzer(!1),this.checkWidth()},b.prototype.checkOrConvertNumber=function(b,c){if("string"===a.type(b[c])&&(b[c]=parseFloat(b[c])),"number"!==a.type(b[c]))throw c+" must be a number";if(isNaN(b[c]))throw"invalid number for "+c},b.prototype.checkSizeRangesSuffixes=function(){if("object"!==a.type(this.settings.sizeRangeSuffixes))throw"sizeRangeSuffixes must be defined and must be an object";var b=[];for(var c in this.settings.sizeRangeSuffixes)this.settings.sizeRangeSuffixes.hasOwnProperty(c)&&b.push(c);for(var d={0:""},e=0;e<b.length;e++)if("string"===a.type(b[e]))try{var f=parseInt(b[e].replace(/^[a-z]+/,""),10);d[f]=this.settings.sizeRangeSuffixes[b[e]]}catch(g){throw"sizeRangeSuffixes keys must contains correct numbers ("+g+")"}else d[b[e]]=this.settings.sizeRangeSuffixes[b[e]];this.settings.sizeRangeSuffixes=d},b.prototype.retrieveMaxRowHeight=function(){var b={};if("string"===a.type(this.settings.maxRowHeight))this.settings.maxRowHeight.match(/^[0-9]+%$/)?(b.value=parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1])/100,b.isPercentage=!1):(b.value=parseFloat(this.settings.maxRowHeight),b.isPercentage=!0);else{if("number"!==a.type(this.settings.maxRowHeight))throw"maxRowHeight must be a number or a percentage";b.value=this.settings.maxRowHeight,b.isPercentage=!1}if(isNaN(b.value))throw"invalid number for maxRowHeight";return b.isPercentage?b.value<100&&(b.value=100):b.value>0&&b.value<this.settings.rowHeight&&(b.value=this.settings.rowHeight),b},b.prototype.checkSettings=function(){if(this.checkSizeRangesSuffixes(),this.checkOrConvertNumber(this.settings,"rowHeight"),this.checkOrConvertNumber(this.settings,"margins"),this.checkOrConvertNumber(this.settings,"border"),"justify"!==this.settings.lastRow&&"nojustify"!==this.settings.lastRow&&"left"!==this.settings.lastRow&&"center"!==this.settings.lastRow&&"right"!==this.settings.lastRow&&"hide"!==this.settings.lastRow)throw'lastRow must be "justify", "nojustify", "left", "center", "right" or "hide"';if(this.checkOrConvertNumber(this.settings,"justifyThreshold"),this.settings.justifyThreshold<0||this.settings.justifyThreshold>1)throw"justifyThreshold must be in the interval [0,1]";if("boolean"!==a.type(this.settings.cssAnimation))throw"cssAnimation must be a boolean";if("boolean"!==a.type(this.settings.captions))throw"captions must be a boolean";if(this.checkOrConvertNumber(this.settings.captionSettings,"animationDuration"),this.checkOrConvertNumber(this.settings.captionSettings,"visibleOpacity"),this.settings.captionSettings.visibleOpacity<0||this.settings.captionSettings.visibleOpacity>1)throw"captionSettings.visibleOpacity must be in the interval [0, 1]";if(this.checkOrConvertNumber(this.settings.captionSettings,"nonVisibleOpacity"),this.settings.captionSettings.nonVisibleOpacity<0||this.settings.captionSettings.nonVisibleOpacity>1)throw"captionSettings.nonVisibleOpacity must be in the interval [0, 1]";if("boolean"!==a.type(this.settings.fixedHeight))throw"fixedHeight must be a boolean";if(this.checkOrConvertNumber(this.settings,"imagesAnimationDuration"),this.checkOrConvertNumber(this.settings,"refreshTime"),this.checkOrConvertNumber(this.settings,"refreshSensitivity"),"boolean"!==a.type(this.settings.randomize))throw"randomize must be a boolean";if("string"!==a.type(this.settings.selector))throw"selector must be a string";if(this.settings.sort!==!1&&!a.isFunction(this.settings.sort))throw"sort must be false or a comparison function";if(this.settings.filter!==!1&&!a.isFunction(this.settings.filter)&&"string"!==a.type(this.settings.filter))throw"filter must be false, a string or a filter function"},b.prototype.retrieveSuffixRanges=function(){var a=[];for(var b in this.settings.sizeRangeSuffixes)this.settings.sizeRangeSuffixes.hasOwnProperty(b)&&a.push(parseInt(b,10));return a.sort(function(a,b){return a>b?1:b>a?-1:0}),a},b.prototype.updateSettings=function(b){this.settings=a.extend({},this.settings,b),this.checkSettings(),this.border=this.settings.border>=0?this.settings.border:this.settings.margins,this.maxRowHeight=this.retrieveMaxRowHeight(),this.suffixRanges=this.retrieveSuffixRanges()},a.fn.justifiedGallery=function(c){return this.each(function(d,e){var f=a(e);f.addClass("justified-gallery");var g=f.data("jg.controller");if("undefined"==typeof g){if("undefined"!=typeof c&&null!==c&&"object"!==a.type(c)){if("destroy"===c)return;throw"The argument must be an object"}g=new b(f,a.extend({},a.fn.justifiedGallery.defaults,c)),f.data("jg.controller",g)}else if("norewind"===c);else{if("destroy"===c)return void g.destroy();g.updateSettings(c),g.rewind()}g.updateEntries("norewind"===c)&&g.init()})},a.fn.justifiedGallery.defaults={sizeRangeSuffixes:{},thumbnailPath:void 0,rowHeight:120,maxRowHeight:-1,margins:1,border:-1,lastRow:"nojustify",justifyThreshold:.75,fixedHeight:!1,waitThumbnailsLoad:!0,captions:!0,cssAnimation:!1,imagesAnimationDuration:500,captionSettings:{animationDuration:500,visibleOpacity:.7,nonVisibleOpacity:0},rel:null,target:null,extension:/\.[^.\\/]+$/,refreshTime:200,refreshSensitivity:0,randomize:!1,sort:!1,filter:!1,selector:"> a, > div:not(.spinner)"}}(jQuery);
}(jQuery));

(function($){
    /* @fileOverview TouchSwipe - jQuery Plugin | @version 1.6.15 | author Matt Bryson http://www.github.com/mattbryson | see https://github.com/mattbryson/TouchSwipe-Jquery-Plugin | see http://labs.rampinteractive.co.uk/touchSwipe/ | see http://plugins.jquery.com/project/touchSwipe | Copyright (c) 2010-2015 Matt Bryson | Dual licensed under the MIT or GPL Version 2 licenses. */   
    (function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{if(typeof module!=="undefined"&&module.exports){a(require("jquery"))}else{a(jQuery)}}}(function(f){var y="1.6.15",p="left",o="right",e="up",x="down",c="in",A="out",m="none",s="auto",l="swipe",t="pinch",B="tap",j="doubletap",b="longtap",z="hold",E="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled&&!a,d=(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&!a,C="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe, .swiper-wrapper",preventDefaultEvents:false};f.fn.swipe=function(H){var G=f(this),F=G.data(C);if(F&&typeof H==="string"){if(F[H]){return F[H].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+H+" does not exist on jQuery.swipe")}}else{if(F&&typeof H==="object"){F.option.apply(this,arguments)}else{if(!F&&(typeof H==="object"||!H)){return w.apply(this,arguments)}}}return G};f.fn.swipe.version=y;f.fn.swipe.defaults=n;f.fn.swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:A};f.fn.swipe.pageScroll={NONE:m,HORIZONTAL:E,VERTICAL:u,AUTO:s};f.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,FOUR:4,FIVE:5,ALL:i};function w(F){if(F&&(F.allowPageScroll===undefined&&(F.swipe!==undefined||F.swipeStatus!==undefined))){F.allowPageScroll=m}if(F.click!==undefined&&F.tap===undefined){F.tap=F.click}if(!F){F={}}F=f.extend({},f.fn.swipe.defaults,F);return this.each(function(){var H=f(this);var G=H.data(C);if(!G){G=new D(this,F);H.data(C,G)}})}function D(a5,au){var au=f.extend({},au);var az=(a||d||!au.fallbackToMouseEvents),K=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ax=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",V=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",T=az?(d?"mouseleave":null):"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,a2=null,ac=0,a1=0,aZ=0,H=1,ap=0,aJ=0,N=null;var aR=f(a5);var aa="start";var X=0;var aQ={};var U=0,a3=0,a6=0,ay=0,O=0;var aW=null,af=null;try{aR.bind(K,aN);aR.bind(aD,ba)}catch(aj){f.error("events not supported "+K+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(K,aN);aR.bind(aD,ba);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(C,null);aR=null};this.option=function(bd,bc){if(typeof bd==="object"){au=f.extend(au,bd)}else{if(au[bd]!==undefined){if(bc===undefined){return au[bd]}else{au[bd]=bc}}else{if(!bd){return au}else{f.error("Option "+bd+" does not exist on jQuery.swipe.options")}}}return null};function aN(be){if(aB()){return}if(f(be.target).closest(au.excludedElements,aR).length>0){return}var bf=be.originalEvent?be.originalEvent:be;var bd,bg=bf.touches,bc=bg?bg[0]:bf;aa=g;if(bg){X=bg.length}else{if(au.preventDefaultEvents!==false){be.preventDefault()}}ag=0;aP=null;a2=null;aJ=null;ac=0;a1=0;aZ=0;H=1;ap=0;N=ab();S();ai(0,bc);if(!bg||(X===au.fingers||au.fingers===i)||aX()){U=ar();if(X==2){ai(1,bg[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}if(au.swipeStatus||au.pinchStatus){bd=P(bf,aa)}}else{bd=false}if(bd===false){aa=q;P(bf,aa);return bd}else{if(au.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[bf.target]);if(au.hold){bd=au.hold.call(aR,bf,bf.target)}},this),au.longTapThreshold)}an(true)}return null}function a4(bf){var bi=bf.originalEvent?bf.originalEvent:bf;if(aa===h||aa===q||al()){return}var be,bj=bi.touches,bd=bj?bj[0]:bi;var bg=aH(bd);a3=ar();if(bj){X=bj.length}if(au.hold){clearTimeout(af)}aa=k;if(X==2){if(a1==0){ai(1,bj[1]);a1=aZ=at(aQ[0].start,aQ[1].start)}else{aH(bj[1]);aZ=at(aQ[0].end,aQ[1].end);aJ=aq(aQ[0].end,aQ[1].end)}H=a8(a1,aZ);ap=Math.abs(a1-aZ)}if((X===au.fingers||au.fingers===i)||!bj||aX()){aP=aL(bg.start,bg.end);a2=aL(bg.last,bg.end);ak(bf,a2);ag=aS(bg.start,bg.end);ac=aM();aI(aP,ag);be=P(bi,aa);if(!au.triggerOnTouchEnd||au.triggerOnTouchLeave){var bc=true;if(au.triggerOnTouchLeave){var bh=aY(this);bc=F(bg.end,bh)}if(!au.triggerOnTouchEnd&&bc){aa=aC(k)}else{if(au.triggerOnTouchLeave&&!bc){aa=aC(h)}}if(aa==q||aa==h){P(bi,aa)}}}else{aa=q;P(bi,aa)}if(be===false){aa=q;P(bi,aa)}}function M(bc){var bd=bc.originalEvent?bc.originalEvent:bc,be=bd.touches;if(be){if(be.length&&!al()){G(bd);return true}else{if(be.length&&al()){return true}}}if(al()){X=ay}a3=ar();ac=aM();if(bb()||!am()){aa=q;P(bd,aa)}else{if(au.triggerOnTouchEnd||(au.triggerOnTouchEnd==false&&aa===k)){if(au.preventDefaultEvents!==false){bc.preventDefault()}aa=h;P(bd,aa)}else{if(!au.triggerOnTouchEnd&&a7()){aa=h;aF(bd,aa,B)}else{if(aa===k){aa=q;P(bd,aa)}}}}an(false);return null}function ba(){X=0;a3=0;U=0;a1=0;aZ=0;H=1;S();an(false)}function L(bc){var bd=bc.originalEvent?bc.originalEvent:bc;if(au.triggerOnTouchLeave){aa=aC(h);P(bd,aa)}}function aK(){aR.unbind(K,aN);aR.unbind(aD,ba);aR.unbind(ax,a4);aR.unbind(V,M);if(T){aR.unbind(T,L)}an(false)}function aC(bg){var bf=bg;var be=aA();var bd=am();var bc=bb();if(!be||bc){bf=q}else{if(bd&&bg==k&&(!au.triggerOnTouchEnd||au.triggerOnTouchLeave)){bf=h}else{if(!bd&&bg==h&&au.triggerOnTouchLeave){bf=q}}}return bf}function P(be,bc){var bd,bf=be.touches;if(J()||W()){bd=aF(be,bc,l)}if((Q()||aX())&&bd!==false){bd=aF(be,bc,t)}if(aG()&&bd!==false){bd=aF(be,bc,j)}else{if(ao()&&bd!==false){bd=aF(be,bc,b)}else{if(ah()&&bd!==false){bd=aF(be,bc,B)}}}if(bc===q){if(W()){bd=aF(be,bc,l)}if(aX()){bd=aF(be,bc,t)}ba(be)}if(bc===h){if(bf){if(!bf.length){ba(be)}}else{ba(be)}}return bd}function aF(bf,bc,be){var bd;if(be==l){aR.trigger("swipeStatus",[bc,aP||null,ag||0,ac||0,X,aQ,a2]);if(au.swipeStatus){bd=au.swipeStatus.call(aR,bf,bc,aP||null,ag||0,ac||0,X,aQ,a2);if(bd===false){return false}}if(bc==h&&aV()){clearTimeout(aW);clearTimeout(af);aR.trigger("swipe",[aP,ag,ac,X,aQ,a2]);if(au.swipe){bd=au.swipe.call(aR,bf,aP,ag,ac,X,aQ,a2);if(bd===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ac,X,aQ,a2]);if(au.swipeLeft){bd=au.swipeLeft.call(aR,bf,aP,ag,ac,X,aQ,a2)}break;case o:aR.trigger("swipeRight",[aP,ag,ac,X,aQ,a2]);if(au.swipeRight){bd=au.swipeRight.call(aR,bf,aP,ag,ac,X,aQ,a2)}break;case e:aR.trigger("swipeUp",[aP,ag,ac,X,aQ,a2]);if(au.swipeUp){bd=au.swipeUp.call(aR,bf,aP,ag,ac,X,aQ,a2)}break;case x:aR.trigger("swipeDown",[aP,ag,ac,X,aQ,a2]);if(au.swipeDown){bd=au.swipeDown.call(aR,bf,aP,ag,ac,X,aQ,a2)}break}}}if(be==t){aR.trigger("pinchStatus",[bc,aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchStatus){bd=au.pinchStatus.call(aR,bf,bc,aJ||null,ap||0,ac||0,X,H,aQ);if(bd===false){return false}}if(bc==h&&a9()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchIn){bd=au.pinchIn.call(aR,bf,aJ||null,ap||0,ac||0,X,H,aQ)}break;case A:aR.trigger("pinchOut",[aJ||null,ap||0,ac||0,X,H,aQ]);if(au.pinchOut){bd=au.pinchOut.call(aR,bf,aJ||null,ap||0,ac||0,X,H,aQ)}break}}}if(be==B){if(bc===q||bc===h){clearTimeout(aW);clearTimeout(af);if(Z()&&!I()){O=ar();aW=setTimeout(f.proxy(function(){O=null;aR.trigger("tap",[bf.target]);if(au.tap){bd=au.tap.call(aR,bf,bf.target)}},this),au.doubleTapThreshold)}else{O=null;aR.trigger("tap",[bf.target]);if(au.tap){bd=au.tap.call(aR,bf,bf.target)}}}}else{if(be==j){if(bc===q||bc===h){clearTimeout(aW);clearTimeout(af);O=null;aR.trigger("doubletap",[bf.target]);if(au.doubleTap){bd=au.doubleTap.call(aR,bf,bf.target)}}}else{if(be==b){if(bc===q||bc===h){clearTimeout(aW);O=null;aR.trigger("longtap",[bf.target]);if(au.longTap){bd=au.longTap.call(aR,bf,bf.target)}}}}}return bd}function am(){var bc=true;if(au.threshold!==null){bc=ag>=au.threshold}return bc}function bb(){var bc=false;if(au.cancelThreshold!==null&&aP!==null){bc=(aT(aP)-ag)>=au.cancelThreshold}return bc}function ae(){if(au.pinchThreshold!==null){return ap>=au.pinchThreshold}return true}function aA(){var bc;if(au.maxTimeThreshold){if(ac>=au.maxTimeThreshold){bc=false}else{bc=true}}else{bc=true}return bc}function ak(bc,bd){if(au.preventDefaultEvents===false){return}if(au.allowPageScroll===m){bc.preventDefault()}else{var be=au.allowPageScroll===s;switch(bd){case p:if((au.swipeLeft&&be)||(!be&&au.allowPageScroll!=E)){bc.preventDefault()}break;case o:if((au.swipeRight&&be)||(!be&&au.allowPageScroll!=E)){bc.preventDefault()}break;case e:if((au.swipeUp&&be)||(!be&&au.allowPageScroll!=u)){bc.preventDefault()}break;case x:if((au.swipeDown&&be)||(!be&&au.allowPageScroll!=u)){bc.preventDefault()}break}}}function a9(){var bd=aO();var bc=Y();var be=ae();return bd&&bc&&be}function aX(){return !!(au.pinchStatus||au.pinchIn||au.pinchOut)}function Q(){return !!(a9()&&aX())}function aV(){var bf=aA();var bh=am();var be=aO();var bc=Y();var bd=bb();var bg=!bd&&bc&&be&&bh&&bf;return bg}function W(){return !!(au.swipe||au.swipeStatus||au.swipeLeft||au.swipeRight||au.swipeUp||au.swipeDown)}function J(){return !!(aV()&&W())}function aO(){return((X===au.fingers||au.fingers===i)||!a)}function Y(){return aQ[0].end.x!==0}function a7(){return !!(au.tap)}function Z(){return !!(au.doubleTap)}function aU(){return !!(au.longTap)}function R(){if(O==null){return false}var bc=ar();return(Z()&&((bc-O)<=au.doubleTapThreshold))}function I(){return R()}function aw(){return((X===1||!a)&&(isNaN(ag)||ag<au.threshold))}function a0(){return((ac>au.longTapThreshold)&&(ag<r))}function ah(){return !!(aw()&&a7())}function aG(){return !!(R()&&Z())}function ao(){return !!(a0()&&aU())}function G(bc){a6=ar();ay=bc.touches.length+1}function S(){a6=0;ay=0}function al(){var bc=false;if(a6){var bd=ar()-a6;if(bd<=au.fingerReleaseThreshold){bc=true}}return bc}function aB(){return !!(aR.data(C+"_intouch")===true)}function an(bc){if(!aR){return}if(bc===true){aR.bind(ax,a4);aR.bind(V,M);if(T){aR.bind(T,L)}}else{aR.unbind(ax,a4,false);aR.unbind(V,M,false);if(T){aR.unbind(T,L,false)}}aR.data(C+"_intouch",bc===true)}function ai(be,bc){var bd={start:{x:0,y:0},last:{x:0,y:0},end:{x:0,y:0}};bd.start.x=bd.last.x=bd.end.x=bc.pageX||bc.clientX;bd.start.y=bd.last.y=bd.end.y=bc.pageY||bc.clientY;aQ[be]=bd;return bd}function aH(bc){var be=bc.identifier!==undefined?bc.identifier:0;var bd=ad(be);if(bd===null){bd=ai(be,bc)}bd.last.x=bd.end.x;bd.last.y=bd.end.y;bd.end.x=bc.pageX||bc.clientX;bd.end.y=bc.pageY||bc.clientY;return bd}function ad(bc){return aQ[bc]||null}function aI(bc,bd){bd=Math.max(bd,aT(bc));N[bc].distance=bd}function aT(bc){if(N[bc]){return N[bc].distance}return undefined}function ab(){var bc={};bc[p]=av(p);bc[o]=av(o);bc[e]=av(e);bc[x]=av(x);return bc}function av(bc){return{direction:bc,distance:0}}function aM(){return a3-U}function at(bf,be){var bd=Math.abs(bf.x-be.x);var bc=Math.abs(bf.y-be.y);return Math.round(Math.sqrt(bd*bd+bc*bc))}function a8(bc,bd){var be=(bd/bc)*1;return be.toFixed(2)}function aq(){if(H<1){return A}else{return c}}function aS(bd,bc){return Math.round(Math.sqrt(Math.pow(bc.x-bd.x,2)+Math.pow(bc.y-bd.y,2)))}function aE(bf,bd){var bc=bf.x-bd.x;var bh=bd.y-bf.y;var be=Math.atan2(bh,bc);var bg=Math.round(be*180/Math.PI);if(bg<0){bg=360-Math.abs(bg)}return bg}function aL(bd,bc){var be=aE(bd,bc);if((be<=45)&&(be>=0)){return p}else{if((be<=360)&&(be>=315)){return p}else{if((be>=135)&&(be<=225)){return o}else{if((be>45)&&(be<135)){return x}else{return e}}}}}function ar(){var bc=new Date();return bc.getTime()}function aY(bc){bc=f(bc);var be=bc.offset();var bd={left:be.left,right:be.left+bc.outerWidth(),top:be.top,bottom:be.top+bc.outerHeight()};return bd}function F(bc,bd){return(bc.x>bd.left&&bc.x<bd.right&&bc.y>bd.top&&bc.y<bd.bottom)}}}));
}(jQuery));

(function($){
     /*Toggle Classes Licensed to be used by Enabled only, only in items purcahsed from ThemeForest.net */
    $.fn.toggle2classes=function(s,a){return s&&a?this.each(function(){var t=$(this);t.hasClass(s)||t.hasClass(a)?t.toggleClass(s+" "+a):t.addClass(s)}):this};
}(jQuery));
           
(function($){
    /*  jQuery Contact form developed by CosminCotor & Enabled	*Licensed to be used ONLY by CosminCotor & Enabled on the Envato Marketplaces 	*DO NOT use in commercial projects outside Regular or Extended licenses for the marketplaces.*/
    var formSubmitted="false";jQuery(document).ready(function(e){function t(t,n){formSubmitted="true";var r=e("#"+t).serialize();e.post(e("#"+t).attr("action"),r,function(n){e("#"+t).hide();e("#formSuccessMessageWrap").fadeIn(500)})}function n(n,r){e(".formValidationError").hide();e(".fieldHasError").removeClass("fieldHasError");e("#"+n+" .requiredField").each(function(i){if(e(this).val()==""||e(this).val()==e(this).attr("data-dummy")){e(this).val(e(this).attr("data-dummy"));e(this).focus();e(this).addClass("fieldHasError");e("#"+e(this).attr("id")+"Error").fadeIn(300);return false}if(e(this).hasClass("requiredEmailField")){var s=/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;var o="#"+e(this).attr("id");if(!s.test(e(o).val())){e(o).focus();e(o).addClass("fieldHasError");e(o+"Error2").fadeIn(300);return false}}if(formSubmitted=="false"&&i==e("#"+n+" .requiredField").length-1){t(n,r)}})}e("#formSuccessMessageWrap").hide(0);e(".formValidationError").fadeOut(0);e('input[type="text"], input[type="password"], textarea').focus(function(){if(e(this).val()==e(this).attr("data-dummy")){e(this).val("")}});e("input, textarea").blur(function(){if(e(this).val()==""){e(this).val(e(this).attr("data-dummy"))}});e("#contactSubmitButton").click(function(){n(e(this).attr("data-formId"));return false})})
}(jQuery));

/**
 * OpenFB is a micro-library that lets you integrate your JavaScript application with Facebook.
 * OpenFB works for both BROWSER-BASED apps and CORDOVA/PHONEGAP apps.
 * This library has no dependency: You don't need (and shouldn't use) the Facebook SDK with this library. Whe running in
 * Cordova, you also don't need the Facebook Cordova plugin. There is also no dependency on jQuery.
 * OpenFB allows you to login to Facebook and execute any Facebook Graph API request.
 * @author Christophe Coenraets @ccoenraets
 * @version 0.5
 */
var openFB = (function () {

    var loginURL = 'https://www.facebook.com/dialog/oauth',

        logoutURL = 'https://www.facebook.com/logout.php',

    // By default we store fbtoken in sessionStorage. This can be overridden in init()
        tokenStore = window.sessionStorage,

    // The Facebook App Id. Required. Set using init().
        fbAppId,

        context = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")),

        baseURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + context,

    // Default OAuth redirect URL. Can be overriden in init()
        oauthRedirectURL = baseURL + '/oauthcallback.html',

    // Default Cordova OAuth redirect URL. Can be overriden in init()
        cordovaOAuthRedirectURL = "https://www.facebook.com/connect/login_success.html",

    // Default Logout redirect URL. Can be overriden in init()
        logoutRedirectURL = baseURL + '/logoutcallback.html',

    // Because the OAuth login spans multiple processes, we need to keep the login callback function as a variable
    // inside the module instead of keeping it local within the login function.
        loginCallback,

    // Indicates if the app is running inside Cordova
        runningInCordova,

    // Used in the exit event handler to identify if the login has already been processed elsewhere (in the oauthCallback function)
        loginProcessed;

    // MAKE SURE YOU INCLUDE <script src="cordova.js"></script> IN YOUR index.html, OTHERWISE runningInCordova will always by false.
    // You don't need to (and should not) add the actual cordova.js file to your file system: it will be added automatically
    // by the Cordova build process
    document.addEventListener("deviceready", function () {
        runningInCordova = true;
    }, false);

    /**
     * Initialize the OpenFB module. You must use this function and initialize the module with an appId before you can
     * use any other function.
     * @param params - init paramters
     *  appId: (Required) The id of the Facebook app,
     *  tokenStore: (optional) The store used to save the Facebook token. If not provided, we use sessionStorage.
     *  loginURL: (optional) The OAuth login URL. Defaults to https://www.facebook.com/dialog/oauth.
     *  logoutURL: (optional) The logout URL. Defaults to https://www.facebook.com/logout.php.
     *  oauthRedirectURL: (optional) The OAuth redirect URL. Defaults to [baseURL]/oauthcallback.html.
     *  cordovaOAuthRedirectURL: (optional) The OAuth redirect URL. Defaults to https://www.facebook.com/connect/login_success.html.
     *  logoutRedirectURL: (optional) The logout redirect URL. Defaults to [baseURL]/logoutcallback.html.
     *  accessToken: (optional) An already authenticated access token.
     */
    function init(params) {

        if (params.appId) {
            fbAppId = params.appId;
        } else {
            throw 'appId parameter not set in init()';
        }

        if (params.tokenStore) {
            tokenStore = params.tokenStore;
        }

        if (params.accessToken) {
            tokenStore.fbAccessToken = params.accessToken;
        }

        loginURL = params.loginURL || loginURL;
        logoutURL = params.logoutURL || logoutURL;
        oauthRedirectURL = params.oauthRedirectURL || oauthRedirectURL;
        cordovaOAuthRedirectURL = params.cordovaOAuthRedirectURL || cordovaOAuthRedirectURL;
        logoutRedirectURL = params.logoutRedirectURL || logoutRedirectURL;

    }

    /**
     * Checks if the user has logged in with openFB and currently has a session api token.
     * @param callback the function that receives the loginstatus
     */
    function getLoginStatus(callback) {
        var token = tokenStore.fbAccessToken,
            loginStatus = {};
        if (token) {
            loginStatus.status = 'connected';
            loginStatus.authResponse = {accessToken: token};
        } else {
            loginStatus.status = 'unknown';
        }
        if (callback) callback(loginStatus);
    }

    /**
     * Login to Facebook using OAuth. If running in a Browser, the OAuth workflow happens in a a popup window.
     * If running in Cordova container, it happens using the In-App Browser. Don't forget to install the In-App Browser
     * plugin in your Cordova project: cordova plugins add org.apache.cordova.inappbrowser.
     *
     * @param callback - Callback function to invoke when the login process succeeds
     * @param options - options.scope: The set of Facebook permissions requested
     * @returns {*}
     */
    function login(callback, options) {

        var loginWindow,
            startTime,
            scope = '',
            redirectURL = runningInCordova ? cordovaOAuthRedirectURL : oauthRedirectURL;

        if (!fbAppId) {
            return callback({status: 'unknown', error: 'Facebook App Id not set.'});
        }

        // Inappbrowser load start handler: Used when running in Cordova only
        function loginWindow_loadStartHandler(event) {
            var url = event.url;
            if (url.indexOf("access_token=") > 0 || url.indexOf("error=") > 0) {
                // When we get the access token fast, the login window (inappbrowser) is still opening with animation
                // in the Cordova app, and trying to close it while it's animating generates an exception. Wait a little...
                var timeout = 600 - (new Date().getTime() - startTime);
                setTimeout(function () {
                    loginWindow.close();
                }, timeout > 0 ? timeout : 0);
                oauthCallback(url);
            }
        }

        // Inappbrowser exit handler: Used when running in Cordova only
        function loginWindow_exitHandler() {
            console.log('exit and remove listeners');
            // Handle the situation where the user closes the login window manually before completing the login process
            if (loginCallback && !loginProcessed) loginCallback({status: 'user_cancelled'});
            loginWindow.removeEventListener('loadstop', loginWindow_loadStopHandler);
            loginWindow.removeEventListener('exit', loginWindow_exitHandler);
            loginWindow = null;
            console.log('done removing listeners');
        }

        if (options && options.scope) {
            scope = options.scope;
        }

        loginCallback = callback;
        loginProcessed = false;

        startTime = new Date().getTime();
        loginWindow = window.open(loginURL + '?client_id=' + fbAppId + '&redirect_uri=' + redirectURL +
            '&response_type=token&scope=' + scope, '_blank', 'location=no,clearcache=yes');

        // If the app is running in Cordova, listen to URL changes in the InAppBrowser until we get a URL with an access_token or an error
        if (runningInCordova) {
            loginWindow.addEventListener('loadstart', loginWindow_loadStartHandler);
            loginWindow.addEventListener('exit', loginWindow_exitHandler);
        }
        // Note: if the app is running in the browser the loginWindow dialog will call back by invoking the
        // oauthCallback() function. See oauthcallback.html for details.

    }

    /**
     * Called either by oauthcallback.html (when the app is running the browser) or by the loginWindow loadstart event
     * handler defined in the login() function (when the app is running in the Cordova/PhoneGap container).
     * @param url - The oautchRedictURL called by Facebook with the access_token in the querystring at the ned of the
     * OAuth workflow.
     */
    function oauthCallback(url) {
        // Parse the OAuth data received from Facebook
        var queryString,
            obj;

        loginProcessed = true;
        if (url.indexOf("access_token=") > 0) {
            queryString = url.substr(url.indexOf('#') + 1);
            obj = parseQueryString(queryString);
            tokenStore.fbAccessToken = obj['access_token'];
            if (loginCallback) loginCallback({status: 'connected', authResponse: {accessToken: obj['access_token']}});
        } else if (url.indexOf("error=") > 0) {
            queryString = url.substring(url.indexOf('?') + 1, url.indexOf('#'));
            obj = parseQueryString(queryString);
            if (loginCallback) loginCallback({status: 'not_authorized', error: obj.error});
        } else {
            if (loginCallback) loginCallback({status: 'not_authorized'});
        }
    }

    /**
     * Logout from Facebook, and remove the token.
     * IMPORTANT: For the Facebook logout to work, the logoutRedirectURL must be on the domain specified in "Site URL" in your Facebook App Settings
     *
     */
    function logout(callback) {
        var logoutWindow,
            token = tokenStore.fbAccessToken;

        /* Remove token. Will fail silently if does not exist */
        tokenStore.removeItem('fbtoken');

        if (token) {
            logoutWindow = window.open(logoutURL + '?access_token=' + token + '&next=' + logoutRedirectURL, '_blank', 'location=no,clearcache=yes');
            if (runningInCordova) {
                setTimeout(function() {
                    logoutWindow.close();
                }, 700);
            }
        }

        if (callback) {
            callback();
        }

    }

    /**
     * Lets you make any Facebook Graph API request.
     * @param obj - Request configuration object. Can include:
     *  method:  HTTP method: GET, POST, etc. Optional - Default is 'GET'
     *  path:    path in the Facebook graph: /me, /me.friends, etc. - Required
     *  params:  queryString parameters as a map - Optional
     *  success: callback function when operation succeeds - Optional
     *  error:   callback function when operation fails - Optional
     */
    function api(obj) {

        var method = obj.method || 'GET',
            params = obj.params || {},
            xhr = new XMLHttpRequest(),
            url;

        params['access_token'] = tokenStore.fbAccessToken;

        url = 'https://graph.facebook.com' + obj.path + '?' + toQueryString(params);

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (obj.success) obj.success(JSON.parse(xhr.responseText));
                } else {
                    var error = xhr.responseText ? JSON.parse(xhr.responseText).error : {message: 'An error has occurred'};
                    if (obj.error) obj.error(error);
                }
            }
        };

        xhr.open(method, url, true);
        xhr.send();
    }

    /**
     * Helper function to de-authorize the app
     * @param success
     * @param error
     * @returns {*}
     */
    function revokePermissions(success, error) {
        return api({method: 'DELETE',
            path: '/me/permissions',
            success: function () {
                success();
            },
            error: error});
    }

    function parseQueryString(queryString) {
        var qs = decodeURIComponent(queryString),
            obj = {},
            params = qs.split('&');
        params.forEach(function (param) {
            var splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    }

    function toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    }

    // The public API
    return {
        init: init,
        login: login,
        logout: logout,
        revokePermissions: revokePermissions,
        api: api,
        oauthCallback: oauthCallback,
        getLoginStatus: getLoginStatus
    }

}());

/**
 * OpenGP is a micro-library that lets you integrate your JavaScript application with Facebook.
 * OpenGP works for both BROWSER-BASED apps and CORDOVA/PHONEGAP apps.
 * This library has no dependency: You don't need (and shouldn't use) the Facebook SDK with this library. Whe running in
 * Cordova, you also don't need the Facebook Cordova plugin. There is also no dependency on jQuery.
 * OpenFB allows you to login to Facebook and execute any Facebook Graph API request.
 * @author Christophe Coenraets @ccoenraets
 * @version 0.5
 */
var openGP = (function () {

    var loginURL = 'https://accounts.google.com/o/oauth2/auth',
        logoutURL = 'https://accounts.google.com/o/oauth2/revoke',
        tokenStore = window.sessionStorage,
        gpAppId,
        context = window.location.pathname.substring(0, window.location.pathname.lastIndexOf("/")),
        baseURL = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + context,
        oauthRedirectURL = baseURL + '/oauthcallback_gp.html',
        cordovaOAuthRedirectURL = host + "index.php?route=extension/module/mobi_sociallogin/GoogleLogins",
        logoutRedirectURL = baseURL + '/logoutcallback.html',
        loginCallback,
        runningInCordova,
        loginProcessed;
		
    document.addEventListener("deviceready", function () {
        runningInCordova = true;
    }, false);

    function init(params) {

        if (params.appId) {
            gpAppId = params.appId;
        } else {
            throw 'secretId parameter not set in init()';
        }

        if (params.tokenStore) {
            tokenStore = params.tokenStore;
        }

        if (params.accessToken) {
            tokenStore.gpAccessToken = params.accessToken;
        }

        loginURL = params.loginURL || loginURL;
        logoutURL = params.logoutURL || logoutURL;
        oauthRedirectURL = params.oauthRedirectURL || oauthRedirectURL;
        cordovaOAuthRedirectURL = params.cordovaOAuthRedirectURL || cordovaOAuthRedirectURL;
        logoutRedirectURL = params.logoutRedirectURL || logoutRedirectURL;

    }
	
    function getLoginStatus(callback) {
        var token = tokenStore.gpAccessToken,
            loginStatus = {};
        if (token) {
            loginStatus.status = 'connected';
            loginStatus.authResponse = {accessToken: token};
        } else {
            loginStatus.status = 'unknown';
        }
        if (callback) callback(loginStatus);
    }
	
    function login(callback, options) {

        var loginWindow,
            startTime,
            scope = '',
            redirectURL = runningInCordova ? cordovaOAuthRedirectURL : oauthRedirectURL;

        if (!gpAppId) {
            return callback({status: 'unknown', error: 'Google Secret Id not set.'});
        }

        function loginWindow_loadStartHandler(event) {
            var url = event.url;
            if (url.indexOf("access_token=") > 0 || url.indexOf("error=") > 0) {
                var timeout = 600 - (new Date().getTime() - startTime);
                setTimeout(function () {
                    loginWindow.close();
                }, timeout > 0 ? timeout : 0);
                oauthCallback(url);
            }
        }

        function loginWindow_exitHandler() {
            console.log('exit and remove listeners');
            if (loginCallback && !loginProcessed) loginCallback({status: 'user_cancelled'});
            loginWindow.removeEventListener('loadstop', loginWindow_loadStopHandler);
            loginWindow.removeEventListener('exit', loginWindow_exitHandler);
            loginWindow = null;
            console.log('done removing listeners');
        }

        if (options && options.scope) {
            scope = options.scope;
        }

        loginCallback = callback;
        loginProcessed = false;

        startTime = new Date().getTime();
        loginWindow = window.open(loginURL + '?client_id=' + gpAppId + '&redirect_uri=' + redirectURL +
            '&response_type=token&scope=' + scope, '_blank', 'location=no,clearcache=yes');

        if (runningInCordova) {
            loginWindow.addEventListener('loadstart', loginWindow_loadStartHandler);
            loginWindow.addEventListener('exit', loginWindow_exitHandler);
        }
    }

    function oauthCallback(url) {
        var queryString,
            obj;

        loginProcessed = true;
        if (url.indexOf("access_token=") > 0) {
            queryString = url.substr(url.indexOf('#') + 1);
            obj = parseQueryString(queryString);
            tokenStore.gpAccessToken = obj['access_token'];
            if (loginCallback) loginCallback({status: 'connected', authResponse: {accessToken: obj['access_token']}});
        } else if (url.indexOf("error=") > 0) {
            queryString = url.substring(url.indexOf('?') + 1, url.indexOf('#'));
            obj = parseQueryString(queryString);
            if (loginCallback) loginCallback({status: 'not_authorized', error: obj.error});
        } else {
            if (loginCallback) loginCallback({status: 'not_authorized'});
        }
    }

    function logout(callback) {
        var logoutWindow,
            token = tokenStore.gpAccessToken;

        tokenStore.removeItem('gptoken');

        if (token) {
            logoutWindow = window.open(logoutURL + '?access_token=' + token + '&next=' + logoutRedirectURL, '_blank', 'location=no,clearcache=yes');
            if (runningInCordova) {
                setTimeout(function() {
                    logoutWindow.close();
                }, 700);
            }
        }

        if (callback) {
            callback();
        }

    }

    function api(obj) {

        var method = obj.method || 'POST',
            params = obj.params || {},
            xhr = new XMLHttpRequest(),
			token = tokenStore.gpAccessToken,
            url;

        params['access_token'] = tokenStore.gpAccessToken;

        url = 'https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + token;

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    if (obj.success) obj.success(JSON.parse(xhr.responseText));
                } else {
                    var error = xhr.responseText ? JSON.parse(xhr.responseText).error : {message: 'An error has occurred'};
                    if (obj.error) obj.error(error);
                }
            }
        };

        xhr.open(method, url, true);
        xhr.send();
    }
	
    function revokePermissions(success, error) {
        return api({method: 'DELETE',
            path: '/me/permissions',
            success: function () {
                success();
            },
            error: error});
    }

    function parseQueryString(queryString) {
        var qs = decodeURIComponent(queryString),
            obj = {},
            params = qs.split('&');
        params.forEach(function (param) {
            var splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    }

    function toQueryString(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    }

    return {
        init: init,
        login: login,
        logout: logout,
        revokePermissions: revokePermissions,
        api: api,
        oauthCallback: oauthCallback,
        getLoginStatus: getLoginStatus
    }

}());