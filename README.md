Underscore Log
==============

<pre>####Cross Browser advaced logging with Underscore Log and Firebug Lite</pre>

----------------------------------------------------------------------------

###Goal

<pre>Created a single and definitive cross browser tool for peaceful logging in development state and which allows with a simple replace and minification to go into production</pre>

----------------------------------------------------------------------------

###Features
<code>
#### 1.0.0 v
<ul>
<li>created a alias for a specific features to Underscore Log: _log</li>
<li>wrapped the ripetitive console.log() in _log()</li>
<li>extendend the normal features to console.time(), now _log.time() stored all the iterations of itself to provide statics through _log.timeStat()</li>
<li>the collapsed group are auto opened if they contain error or warn</li>
<li>through _log.external() you can implement a complex control code in an external file: _logExt.js</li>
<li>created a minimal ui which allows the control errors and warns even when Firebug Lite is closed</li>
</ul>
</code>

----------------------------------------------------------------------------

###Docs

####_log(v)
<code>
<ul>
<li><b>v</b>: a String that is printed in console</li>
</ul>
</code>
