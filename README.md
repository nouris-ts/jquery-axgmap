#AxGmap
AxGmap is a simple jQuery plugin that allows you to easily create Google Map, add marker and info window.

##Installation
Here is a simple FitText setup:
```html
<script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false"></script>
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2/jquery.min.js"></script>
<script type="text/javascript" src="path/jquery.axgmap2.js"></script>
```

##Example Usage

Simple use:
```html
<div class="axgmap" data-latlng="48.873942, 2.334646" data-zoom="12"></div>
```

Adding the marker and info window:
```html
<div class="axgmap" data-latlng="48.873942, 2.334646" data-zoom="12">
  <p data-latlng="48.860617, 2.337650" data-title="Louvre Museum">Louvre Museum</p>
  <p data-latlng="48.865491, 2.321137" data-title="Place de la Concorde">Place de la Concorde</p>
  <p data-latlng="48.871977, 2.331612" data-title="Palais Garnier">Palais Garnier</p>
</div>
```

Customize the marker image:
```html
<div class="axgmap" data-latlng="48.873942, 2.334646" data-zoom="12">
  <p data-marker-type="blue" data-latlng="48.860617, 2.337650" data-title="Louvre Museum">Louvre Museum</p>
  <p data-marker-image="http://maps.google.co.jp/mapfiles/ms/icons/restaurant.png" data-latlng="48.865491, 2.321137" data-title="Place de la Concorde">Place de la Concorde</p>
</div>
```


##Configuration

###Map
<table>
<tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
<tr><td>data-latlng</td><td>lat, lng</td><td>The initial Map center.</td></tr>
<tr><td>data-zoom</td><td>number</td><td>The initial Map zoom level.</td></tr>
<tr><td>data-max-zoom</td><td>number</td><td>The maximum zoom level .</td></tr>
<tr><td>data-min-zoom</td><td>number</td><td>The minimum zoom level.</td></tr>
<tr><td>data-map-type</td><td>HYBRID | ROADMAP | SATELLITE | TERRAIN</td><td>The initial Map mapType. Defaults to ROADMAP.</td></tr>
<tr><td>data-draggable</td><td>boolean</td><td>If false, prevents the map from being dragged.</td></tr>
<tr><td>data-scrollwheel</td><td>boolean</td><td>If false, disables scrollwheel zooming on the map.</td></tr>
<tr><td>data-map-status</td><td>boolean</td><td>If true, show map status.</td></tr>
<tr><td>data-map-type-control</td><td>boolean</td><td>The initial enabled/disabled state of the Map type control.</td></tr>
<tr><td>data-overview-map-control</td><td>boolean</td><td>The enabled/disabled state of the Overview Map control.</td></tr>
<tr><td>data-pan-control</td><td>boolean</td><td>The enabled/disabled state of the Pan control.</td></tr>
<tr><td>data-rotate-control</td><td>boolean</td><td>The enabled/disabled state of the Rotate control.</td></tr>
<tr><td>data-scale-control</td><td>boolean</td><td>The initial enabled/disabled state of the Scale control.</td></tr>
<tr><td>data-street-view-control</td><td>boolean</td><td>The initial enabled/disabled state of the Street View Pegman control.</td></tr>
<tr><td>data-zoom-control</td><td>boolean</td><td>The enabled/disabled state of the Zoom control.</td></tr>
</table>


###Marker
<table>
<tr><th>Attribute</th><th>Type</th><th>Description</th></tr>
<tr><td>data-latlng</td><td>lat, lng</td><td>Marker position. Defaults to Map center.</td></tr>
<tr><td>data-title</td><td>String</td><td>Rollover text.</td></tr>
<tr><td>data-window-open</td><td>Boolean</td><td>If true, initial opened the info window.</td></tr>
<tr><td>data-marker-image</td><td>URL</td><td>The URL of the marker image</td></tr>
</table>


##License

This plugin is available under [the MIT license](http://mths.be/mit).



