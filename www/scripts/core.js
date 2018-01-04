var appname = "";
var host = "http://mobi.5-degree.com/";  // Live Server
var host_parent = "http://opencart.5-degree.com/";
var currentOrientation = "";
var overlay = false;
var n = "";
var json_user = [];
var json_language = [];
var lang = "";
var currentScale = null;
var currentDeltaX = null;
var currentDeltaY = null;

// Wait for device API libraries to load
//
function onLoad() {
	document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {
	document.addEventListener("pause", onPause, false);
	document.addEventListener("resume", onResume, false);
	document.addEventListener("menubutton", onMenuKeyDown, false);
	document.addEventListener("backbutton", onBackKeyDown, false);
	window.addEventListener("orientationchange", orientationChange, true);
	
	window.open = cordova.InAppBrowser.open;
	appInit();
	orientationChange();
}

function onPause() {
	// Handle the pause event
}

function onResume() {
	// Handle the resume event
}

function onMenuKeyDown() {
	// Handle the menubutton event
}

function onBackKeyDown() {
    // Handle the back button
	
	if(overlay == true)
	{
		$(".overlay-app").hide();
		$('#alertModal').modal('hide');
		$('#thumbModal').modal('hide');
		overlay = false;
	}else{
		if($("#search-form input").is(":focus"))
		{
			$("#search-form input").blur();
		}else{
			if($("body.home").length) {
				navigator.app.exitApp();
			}else if($("#page-content").hasClass("login")){
				location.href = "index.html";
			}else{
				navigator.app.backHistory();
			}
		}
	}
}

function orientationChange(e) {

	if (window.orientation == 0) {
		currentOrientation = "portrait";
	} else if (window.orientation == 90) {
		currentOrientation = "landscape";
	} else if (window.orientation == -90) {
		currentOrientation = "landscape";
	} else if (window.orientation == 180) {
		currentOrientation = "portrait";
	}
	renderLayout(currentOrientation);
}

function renderLayout(orient)
{
	// if($(window).width() >= 768)
	if(orient == "landscape")
	{
		// $(".full-height").css("height", ($(window).height() - 60) + "px");
		if($("ul.breadcrumbs li").length == 0)
		{
			$("ul.breadcrumbs").remove();
		}
	}
}

function renderContent(url, dom, page, limit, scrollposition)
{
	$.get(url + "&page=" + page, function(data){
		dom.append(data);
		if(page <= limit)
		{
			renderContent(url, dom, (page + 1), limit, scrollposition);
		}else{
			gotoScroll(scrollposition);
			return false;
		}
	});
}

function saveScroll()
{	
	if (typeof(Storage) !== "undefined") {
		localStorage.setItem(window.location.href, parseInt($("#page-content-scroll").scrollTop()));
	}
}

function gotoScroll(position = false)
{
	if(position == false)
	{
		if (typeof(Storage) !== "undefined") {
			setTimeout(function(){
				$("#page-content-scroll").scrollTop(localStorage.getItem(window.location.href));
				$("#page-content-scroll").scroll(function(){
					saveScroll();
				});
			}, 100);
		}		
	}else{
		$("#page-content-scroll").scrollTop(position);
	}
}

function refreshCart()
{
	$.ajax({
		method: "GET",
		url: host + "index.php?route=common/cart/mobi_index",
		dataType: "text",
		xhrFields: {
			withCredentials: true
		}
	}).done(function(data) {
		$(".header-icon-4 span").html(data);
		$(".menu-shopping-cart span").html(data);
	});
}

function accountLogout()
{
	$.ajax({
		method: "GET",
		url: host + "index.php?route=account/logout",
		dataType: "text",
		xhrFields: {
			withCredentials: true
		}
	}).done(function(data) {
		localStorage.removeItem("json_user");
		localStorage.removeItem("json_language");
		
		$.ajax({
			method: "GET",
			url: "_sidebar_header_guest_" + lang + ".html",
			cache: true
		}).done(function(data) {
			$(".sidebar-left .sidebar-header").html(data);
			
			$.ajax({
				method: "GET",
				url: "_menu_guest_" + lang + ".html",
				cache: true
			}).done(function(data) {
				$(".sidebar-left .sidebar-menu").html(data);
			});
		});

		$(".drag-target").click();
		$("#container").html(data);
		afterInit();
	});
}

function appInit()
{
	if(navigator.onLine) // If internet connection established
	{
		if (typeof(Storage) !== "undefined") {
			var timestamp_date = new Date();
			var timestamp_time = timestamp_date.getTime();
			
			if(localStorage.getItem("timestamp") == null)
			{
				localStorage.setItem("timestamp", timestamp_time);
			}else{
				if(timestamp_time - localStorage.getItem("timestamp") > 7200000) // Last 2 hours
				{
					localStorage.removeItem("json_user");
					localStorage.removeItem("json_language");
					localStorage.setItem("timestamp", timestamp_time);
				}
			}
			
			if(localStorage.getItem("json_user") == null)
			{
				$.ajax({
					method: "GET",
					url: host + "index.php?route=json/login_check",
					async: false,
					xhrFields: {
						withCredentials: true
					}
				}).done(function(data) {
					json_user = JSON.parse(data);
					localStorage.setItem("json_user", data);
				});
			}else{
				json_user = JSON.parse(localStorage.getItem("json_user"));
			}
			
			if(localStorage.getItem("json_language") === null)
			{
				$.ajax({
					method: "GET",
					url: host + "index.php?route=json/language_check",
					async: false,
					xhrFields: {
						withCredentials: true
					}
				}).done(function(data) {
					json_language = JSON.parse(data);
					lang = json_language.language;
					localStorage.setItem("json_language", data);
				});
			}else{
				json_language = JSON.parse(localStorage.getItem("json_language"));
				lang = json_language.language;
			}
		}
		
		if(json_user.length != 0)
		{
			$.ajax({
				method: "GET",
				url: "_sidebar_header.html",
				async: false,
				cache: true
			}).done(function(data) {
				$(".sidebar-left .sidebar-header").html(data);
				
				$("#username").html(json_user.firstname + ' ' + json_user.lastname);
				$("#useremail").html(json_user.email);
				
				$.ajax({
					method: "GET",
					url: "_menu_" + lang + ".html",
					cache: true
				}).done(function(data) {
					$(".sidebar-left .sidebar-menu").html(data);
					$(".menu-item").each(function(){
						if(location.href.indexOf($(this).attr("href")) >= 0)
						{
							$(this).addClass("active-item");
						}
					});
				});
			});
		}else{
			$.ajax({
				method: "GET",
				url: "_sidebar_header_guest_" + lang + ".html",
				async: false,
				cache: true
			}).done(function(data) {
				$(".sidebar-left .sidebar-header").html(data);
				
				$.ajax({
					method: "GET",
					url: "_menu_guest_" + lang + ".html",
					cache: true
				}).done(function(data) {
					$(".sidebar-left .sidebar-menu").html(data);
					$(".menu-item").each(function(){
						if(location.href.indexOf($(this).attr("href")) >= 0)
						{
							$(this).addClass("active-item");
						}
					});
				});
			});
		}
		
		// Load the rest
		if($("body.common-external").length)
		{
			header_url = "_header_default.html";
		}else if($("body.product-single").length){
			header_url = "_header_default.html";
		}else{
			header_url = "_header_" + json_language.language + ".html";
		}
		
		$.get(header_url, function(data){
			$(".header-fixed").html(data);
			$.get("_footer.html", function(data){
				$("#page-footer").html(data);
				appRender();
				try
				{
					navigator.splashscreen.hide();
				}
				catch(e)
				{
				}
				
				// Individual Page
				
				// External Url
				if($("body.common-external").length) {
					if(getUrlParameter('url') !== undefined)
					{
						$.ajax({
							method: "GET",
							url: atob(getUrlParameter('url')),
							xhrFields: {
								withCredentials: true
							}
						}).done(function(data) {
							$("body").find("#container").html(data);
							afterInit();
						});
					}
					
					afterInit();
				}
				
				// Default
				if($("body.default").length) {
					if(getUrlParameter('url') !== undefined)
					{
						$.ajax({
							method: "GET",
							url: atob(getUrlParameter('url')),
							xhrFields: {
								withCredentials: true
							}
						}).done(function(data) {
							$("body").find("#container").html(data);
							afterInit();
						});
					}
					
					if(getUrlParameter('page') !== undefined)
					{
						$.ajax({
							method: "GET",
							url: host + "index.php?route=" + getUrlParameter('page'),
							xhrFields: {
								withCredentials: true
							}
						}).done(function(data) {
							$("body").find("#container").html(data);
							afterInit();
						});
					}
					
					afterInit();
				}


				// Home
				if($("body.home").length) {
					$.ajax({
						method: "GET",
						url: host + "index.php?route=common/home",
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						afterInit();
					});
				}
					
				// Product Single
				if($("body.product-single").length) {
					$.ajax({
						method: "GET",
						url: host + "index.php?route=product/product&product_id=" + getUrlParameter('product_id'),
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						$("#search-form input").attr('placeholder', $("body").find("#container").find("h4").eq(0).html());
						afterInit();
					});
				}
				
				// Product Category
				if($("body.product-category").length) {
					var query = "";
					
					if(getUrlParameter('filter') !== undefined)
					{
						query += "&filter=" + getUrlParameter('filter');
					}
					
					if(getUrlParameter('sort') !== undefined)
					{
						query += "&sort=" + getUrlParameter('sort');
					}
					
					if(getUrlParameter('order') !== undefined)
					{
						query += "&order=" + getUrlParameter('order');
					}
					
					if(getUrlParameter('limit') !== undefined)
					{
						query += "&limit=" + getUrlParameter('limit');
					}
					
					
					$.ajax({
						method: "GET",
						url: host + "index.php?route=product/category&path=" + getUrlParameter('category_id') + query,
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						if($('#container ul.breadcrumb li').length == 2)
						{
							$('ul.breadcrumb li').remove();
							$('ul.breadcrumb').removeClass("breadcrumb").addClass("breadcrumbs");
						}
						
						var page = 2;
						var output = [];
						var loading = false;
						
						if (typeof(Storage) !== "undefined") {
							if(localStorage.getItem(window.location.href + "-page") >= page)
							{
								loading = true;
								loading = renderContent(host + "index.php?route=product/category&path=" + getUrlParameter('category_id') + query, $(".product_grid"), page, localStorage.getItem(window.location.href + "-page"), localStorage.getItem(window.location.href));
								page = parseInt(localStorage.getItem(window.location.href + "-page")) + 2;
							}
						}
						
						$('#page-content-scroll').on('scroll', function () {
							var total_scroll_height = $('#page-content-scroll')[0].scrollHeight
							var inside_header = ($(this).scrollTop() <= 150);
							var passed_header = ($(this).scrollTop() >= 0); //250
							var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 1000 )));
							var footer_reached2 = ($(this).scrollTop() >= ($(".footer-clear-disabled").position().top - 1000 ));
							
							if (footer_reached2 == true){            
								if(loading == false)
								{
									// alert(footer_reached2);
									loading = true;
									$.ajax({
										method: "GET",
										url: host + "index.php?route=product/category&path=" + getUrlParameter('category_id') + "&page=" + page + query,
										xhrFields: {
											withCredentials: true
										}
									}).done(function(data) {
										if(data != "")
										{
											if (typeof(Storage) !== "undefined") {
												localStorage.setItem(window.location.href + "-page", page);
											}
											$(".product_grid").append(data);
											page++;
											loading = false;
										}else{
											$('#page-content-scroll').unbind('scrollstop');
										}
									});
								}
							}
						});
						
						afterInit();
					});
				}
				
				// Product Manufacturer
				if($("body.product-manufacturer").length) {
					var query = "";
					
					if(getUrlParameter('sort') !== undefined)
					{
						query += "&sort=" + getUrlParameter('sort');
					}
					
					if(getUrlParameter('order') !== undefined)
					{
						query += "&order=" + getUrlParameter('order');
					}
					
					if(getUrlParameter('limit') !== undefined)
					{
						query += "&limit=" + getUrlParameter('limit');
					}
					
					
					$.ajax({
						method: "GET",
						url: host + "index.php?route=product/manufacturer/info&manufacturer_id=" + getUrlParameter('manufacturer_id') + query,
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						if($('#container ul.breadcrumb li').length == 2)
						{
							$('ul.breadcrumb li').remove();
							$('ul.breadcrumb').removeClass("breadcrumb").addClass("breadcrumbs");
						}
						
						var page = 2;
						var output = [];
						var loading = false;
						
						if (typeof(Storage) !== "undefined") {
							if(localStorage.getItem(window.location.href + "-page") >= page)
							{
								loading = true;
								loading = renderContent(host + "index.php?route=product/manufacturer/info&manufacturer_id=" + getUrlParameter('manufacturer_id') + query, $(".product_grid"), page, localStorage.getItem(window.location.href + "-page"), localStorage.getItem(window.location.href));
								page = parseInt(localStorage.getItem(window.location.href + "-page")) + 2;
							}
						}
						
						$('#page-content-scroll').on('scroll', function () {
							var total_scroll_height = $('#page-content-scroll')[0].scrollHeight
							var inside_header = ($(this).scrollTop() <= 150);
							var passed_header = ($(this).scrollTop() >= 0); //250
							var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 1000 )));
							var footer_reached2 = ($(this).scrollTop() >= ($(".footer-clear-disabled").position().top - 1000 ));
							
							if (footer_reached2 == true){            
								if(loading == false)
								{
									loading = true;
									$.ajax({
										method: "GET",
										url: host + "index.php?route=product/manufacturer/info&manufacturer_id=" + getUrlParameter('manufacturer_id') + "&page=" + page + query,
										xhrFields: {
											withCredentials: true
										}
									}).done(function(data) {
										if(data != "")
										{
											if (typeof(Storage) !== "undefined") {
												localStorage.setItem(window.location.href + "-page", page);
											}
											$(".product_grid").append(data);
											page++;
											loading = false;
										}else{
											$('#page-content-scroll').unbind('scrollstop');
										}
									});
								}
							}
						});
						
						afterInit();
					});
				}
				
				// Product Search
				if($("body.product-search").length) {
					var query = "";
					
					if(getUrlParameter('sort') !== undefined)
					{
						query += "&sort=" + getUrlParameter('sort');
					}
					
					if(getUrlParameter('order') !== undefined)
					{
						query += "&order=" + getUrlParameter('order');
					}
					
					if(getUrlParameter('limit') !== undefined)
					{
						query += "&limit=" + getUrlParameter('limit');
					}
					
					if(getUrlParameter('category_id') !== undefined)
					{
						query += "&category_id=" + getUrlParameter('category_id');
					}
					
					if(getUrlParameter('sub_category') !== undefined)
					{
						query += "&sub_category=" + getUrlParameter('sub_category');
					}
					
					if(getUrlParameter('description') !== undefined)
					{
						query += "&description=" + getUrlParameter('description');
					}						
					
					$.ajax({
						method: "GET",
						url: host + "index.php?route=product/search&search=" + getUrlParameter('search') + query,
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						
						var page = 2;
						var output = [];
						var loading = false;
						
						if (typeof(Storage) !== "undefined") {
							if(localStorage.getItem(window.location.href + "-page") >= page)
							{
								loading = true;
								loading = renderContent(host + "index.php?route=product/search&search=" + getUrlParameter('search') + query, $(".product_grid"), page, localStorage.getItem(window.location.href + "-page"), localStorage.getItem(window.location.href));
								page = parseInt(localStorage.getItem(window.location.href + "-page")) + 2;
							}
						}
						
						$('#page-content-scroll').on('scroll', function () {
							var total_scroll_height = $('#page-content-scroll')[0].scrollHeight
							var inside_header = ($(this).scrollTop() <= 150);
							var passed_header = ($(this).scrollTop() >= 0); //250
							var footer_reached = ($(this).scrollTop() >= (total_scroll_height - ($(window).height() + 1000 )));
							var footer_reached2 = ($(this).scrollTop() >= ($(".footer-clear-disabled").position().top - 1000 ));
							
							if (footer_reached2 == true){            
								if(loading == false)
								{
									loading = true;
									$.ajax({
										method: "GET",
										url: host + "index.php?route=product/search&search=" + getUrlParameter('search') + "&page=" + page + query,
										xhrFields: {
											withCredentials: true
										}
									}).done(function(data) {
										if(data != "")
										{
											if (typeof(Storage) !== "undefined") {
												localStorage.setItem(window.location.href + "-page", page);
											}
											$(".product_grid").append(data);
											page++;
											loading = false;
										}else{
											$('#page-content-scroll').unbind('scrollstop');
										}
									});
								}
							}
						});
						
						afterInit();
					});
				}
				
				// Login
				if($("body.common-login").length) {
					$.ajax({
						method: "GET",
						url: host + "index.php?route=account/login",
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						afterInit();
					});
				}
				
				// Account
				if($("body.account").length) {
					$.ajax({
						method: "GET",
						url: host + "index.php?route=account/account",
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						afterInit();
					});
				}
				
				// Cart
				if($("body.common-cart").length) {
					$.ajax({
						method: "GET",
						url: host + "index.php?route=checkout/cart",
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						afterInit();
					});
				}
				
				// Checkout
				if($("body.common-checkout").length) {
					$.ajax({
						method: "GET",
						url: host + "index.php?route=checkout/checkout",
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						afterInit();
					});
				}
				
				// Checkout - Success
				if($("body.common-checkout-success").length) {
					$.ajax({
						method: "GET",
						url: host + "index.php?route=checkout/success",
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						afterInit();
					});
				}
				
				// Setting
				if($("body.common-setting").length) {
					$.ajax({
						method: "GET",
						url: host + "index.php?route=page/setting",
						xhrFields: {
							withCredentials: true
						}
					}).done(function(data) {
						$("body").find("#container").html(data);
						afterInit();
					});
				}
			});
		});
	}else{
		// Offline Mode
	}
}

function afterInit()
{
	orientationChange();
	appRender();
	gotoScroll();	
	refreshCart();
	
	var d = new Date();
	n = d.getTime();
	$("a").each(function(){
		if($(this).attr('href') !== undefined)
		{
			if($(this).attr('href').indexOf(host) !== -1)
			{
				if($(this).attr('href') == host + "index.php?route=common/home")
				{
					$(this).attr('href', $(this).attr('href').replace(host + "index.php?route=common/home", "index.html#" + n));
				}else{
					$(this).attr('href', "default.html?url=" + btoa($(this).attr('href')) + "#" + n);
				}
			}else{
				if($(this).attr('href').indexOf('#') === -1)
				{
					$(this).attr('href', $(this).attr('href') + "#" + n);
				}
			}
		}
	});
	
	$(document).on('click', 'a', function(){ // Open internal url from host to host_parent
		if($(this).attr('href') !== undefined)
		{
			if($(this).attr('href').indexOf(host) !== -1)
			{
				$(this).attr('href', "default.html?url=" + btoa($(this).attr('href')) + "#" + n);
			}
		}
	});
	
	$('#alertModal').on('hidden.bs.modal', function (e) {
		overlay = false;
	})
	
	
	FastClick.attach(document.body);
	// new FastClick(document.body);
}

function getUrl(url, dom, method = "GET", append = false)
{
	var output;
	
	if(method == "GET")
	{
		$.get(url, function(data){
			if(append)
			{
				dom.append(data);
			}else{
				dom.html(data);
				history.replaceState({}, "", url);
			}
		}).fail(function() {
			if ( console && console.log ) {
				console.log("Failed to Access: " + url, method);
			}
		});
	}
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

var wishlist = {
	'add': function(product_id) {
		$.ajax({
			url: host + 'index.php?route=account/wishlist/add',
			type: 'post',
			data: 'product_id=' + product_id,
			dataType: 'json',
			xhrFields: {
				withCredentials: true
			},
			success: function(json) {
				$('.alert').remove();

				if (json['redirect']) {
					location = json['redirect'];
				}
				
				if (json['success']) {
					var container = $('#page-content-scroll');
					
					container.animate({
						scrollTop: 0
					});
					
					if(json['success_mobi'] === undefined)
					{
						var bodytext = json['success'];
					}else{
						var bodytext = json['success_mobi'];
					}
					
					$("#alertModal .modal-title").html('');
					$("#alertModal .modal-body").html(bodytext.replace("href=", "data-href="));
					$("#alertModal .modal-footer a").eq(0).html('');
					$("#alertModal .modal-footer a").eq(0).attr('href', '#');
					$("#alertModal .modal-footer a").eq(1).html('');
					$('#alertModal').modal('show');
				}

				$('html, body').animate({ scrollTop: 0 }, 'slow');
			},
			error: function(xhr, ajaxOptions, thrownError) {
				alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
			}
		});
	},
	'remove': function() {

	}
}



$(document).ready(function(){
	appInit();
});
