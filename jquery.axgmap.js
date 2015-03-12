/*
 * AxGmap  version 1.2.1
 * (jQuery plugin) 
 * 
 * URL       : https://github.com/Nouris-Inc/jquery-axgmap/
 * Author    : tsaeki (http://nouris.jp/)
 * Copyright : copyright (c) 2015 Nouris Inc.
 * License   : licensed under the MIT licenses.
 */

;(function($, window, document, undefined) {

	var AxGmap = function (element){
		this.element = $(element);
		this.gmap;
		this.markers = [];
		this.infoWindows = [];
		this.init();
	}

	AxGmap.prototype = {
		init: function (){
			this.createGmap();
			this.fin();
		},
		createGmap: function(){
			var options = this.createGmapOption();
			var children = this.element.children();
			this.gmap = new google.maps.Map(this.element[0], options);
			this.createMarker(children);
			this.showMapStatus();
		},
		createMarker: function(elements){
			var self = this;
			var openWindowSet = null;
			elements.each(function(index){
				var element = $(this);
				var windowOpen = false;
				var options = self.createMarkerOption(element);
				if (options.windowOpen) {
					windowOpen = true;
					delete options.windowOpen;
				}
				var marker = new google.maps.Marker(options);
				self.markers.push(marker);
				var content = element.html().trim();
				if (content.length) {
					var infoWindowSet = self.createInfoWindowSet(content, marker);
					self.infoWindows.push(infoWindowSet);
					if (windowOpen) {
						openWindowSet = infoWindowSet;
					};
				}
			});
			if (openWindowSet) {
				self.openInfoWindow(openWindowSet);
			};
		},
		createInfoWindowSet: function(content, marker){
			var self = this;
			var infoWindow = new google.maps.InfoWindow({content: content});
			google.maps.event.addListener(marker, 'click', function(){
				self.openInfoWindow({'infoWindow':infoWindow, 'marker':marker});
			});
			return {'infoWindow':infoWindow, 'marker':marker};
		},
		createLatLng: function(element){
			var lat = 0;
			var lng = 0;
			var latlng = element.data('latlng') ? element.data('latlng') : this.element.data('latlng');
			if (latlng) {
				var split = latlng.split(',');
				lat = this.parseNum(split[0].trim());
				lng = this.parseNum(split[1].trim());
			};
			return new google.maps.LatLng(lat, lng);
		},
		createGmapOption: function(){
			var self = this;
			var options = {
				center: this.createLatLng(this.element),
				zoom: 9
			};
			if (this.element.data("mapType")) {
				var mapType = this.element.data("mapType").toUpperCase();
				$.extend(options, {'mapTypeId': google.maps.MapTypeId[mapType]});
			};
			if (this.element.data("mapWidth") != null) {
				this.element.width(this.element.data("mapWidth"));
			};
			if (this.element.data("mapHeight") != null) {
				this.element.height(this.element.data("mapHeight"));
			};
			var properties = ["zoom", "draggable", "scrollwheel", "maxZoom", "minZoom", "mapTypeControl", "overviewMapControl", "panControl", "rotateControl", "scaleControl", "streetViewControl", "zoomControl"];
			$.each(properties, function(index, property){
				if (self.element.data(property) != null) {
					options[property] = self.element.data(property);
				}
			});
			return options;
		},
		createMarkerOption: function(element){
			var options = {
				map: this.gmap,
				position: this.createLatLng(element)
			};
			if (element.data('title') != null) {
				options['title'] = element.data('title');
			}
			if (element.data('markerImage') != null) {
				options['icon'] = element.data('markerImage');
			}
			if (element.data('windowOpen')) {
				options['windowOpen'] = true;
			}
			return options;
		},
		openInfoWindow: function(infoWindowSet){
			var self = this;
			infoWindowSet.infoWindow.open(self.gmap, infoWindowSet.marker);
			$.each(self.infoWindows, function(index, val){
				if(val.infoWindow != infoWindowSet.infoWindow){
					val.infoWindow.close();
				}
			});
		},
		parseNum: function(val){
			return (typeof val == null) ? 0.0 : parseFloat(val);
		},
		showMapStatus: function(){
			var self = this;
			if (!this.element.data("mapStatus")) {
				return;
			};
			var status = $('<div style="color:#000; background-color:#fff; border:solid 1px #ccc; width:' + self.element.width() + 'px"><dl style="margin:1em;"><dt>Center LatLng</dt><dd class="axgmap-status-latlng"></dd><dt>Zoom</dt><dd class="axgmap-status-zoom"></dd><dt>Right Click LatLng</dt><dd class="axgmap-status-rightclick">none</dd></dl></div>');
			status.insertAfter(this.element);
			google.maps.event.addListener(this.gmap, 'idle', function(){
				$('.axgmap-status-latlng', status).empty().append(self.gmap.getCenter().lat().toFixed(6) + ', ' + self.gmap.getCenter().lng().toFixed(6));
				$('.axgmap-status-zoom', status).empty().append(self.gmap.getZoom());
			});
			google.maps.event.addListener(this.gmap, 'rightclick', function(event){
				$('.axgmap-status-rightclick', status).empty().append(event.latLng.lat().toFixed(6) + ', ' + event.latLng.lng().toFixed(6));
			});
		},
		fin: function(){
			if (!AxGmap.didCreated) {
				AxGmap.didCreated = true;
				$('<style>.gm-style img{max-width:inherit;}</style>').appendTo('head');
			};
		}
	};

	$.fn.axgmap = function(){
		return this.each(function(){
			if(!$.data(this, 'AxGmap')){
				$.data(this, 'AxGmap', new AxGmap(this));
			}
		});
	};

	$(function() {
		$('.axgmap').axgmap();
	});

})(jQuery, window, document);
