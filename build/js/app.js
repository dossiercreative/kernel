var app={};app.loading=function(o){"use strict";o(window).on("load",function(){localStorage.getItem("loading-flag")?(o(".overlay.overlay--loading").addClass("is-invisible"),setTimeout(function(){o(".overlay.overlay--loading").addClass("is-hidden")},1e3)):(localStorage.setItem("loading-flag","true"),setTimeout(function(){o(".overlay.overlay--loading").addClass("is-invisible")},1800),setTimeout(function(){o(".overlay.overlay--loading").addClass("is-hidden")},3e3))})}(jQuery),app.template=function(o){"use strict";console.log("This is a test to confirm javascript is working"),o(document).ready(function(){console.log("This is a test to confirm jquery is working")})}(jQuery);