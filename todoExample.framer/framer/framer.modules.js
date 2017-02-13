require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"TextLayer":[function(require,module,exports){
var TextLayer, convertTextLayers, convertToTextLayer,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

TextLayer = (function(superClass) {
  extend(TextLayer, superClass);

  function TextLayer(options) {
    if (options == null) {
      options = {};
    }
    this.doAutoSize = false;
    this.doAutoSizeHeight = false;
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "hsla(60, 90%, 47%, .4)" : "transparent";
    }
    if (options.color == null) {
      options.color = "red";
    }
    if (options.lineHeight == null) {
      options.lineHeight = 1.25;
    }
    if (options.fontFamily == null) {
      options.fontFamily = "Helvetica";
    }
    if (options.fontSize == null) {
      options.fontSize = 20;
    }
    if (options.text == null) {
      options.text = "Use layer.text to add text";
    }
    TextLayer.__super__.constructor.call(this, options);
    this.style.whiteSpace = "pre-line";
    this.style.outline = "none";
  }

  TextLayer.prototype.setStyle = function(property, value, pxSuffix) {
    if (pxSuffix == null) {
      pxSuffix = false;
    }
    this.style[property] = pxSuffix ? value + "px" : value;
    this.emit("change:" + property, value);
    if (this.doAutoSize) {
      return this.calcSize();
    }
  };

  TextLayer.prototype.calcSize = function() {
    var constraints, size, sizeAffectingStyles;
    sizeAffectingStyles = {
      lineHeight: this.style["line-height"],
      fontSize: this.style["font-size"],
      fontWeight: this.style["font-weight"],
      paddingTop: this.style["padding-top"],
      paddingRight: this.style["padding-right"],
      paddingBottom: this.style["padding-bottom"],
      paddingLeft: this.style["padding-left"],
      textTransform: this.style["text-transform"],
      borderWidth: this.style["border-width"],
      letterSpacing: this.style["letter-spacing"],
      fontFamily: this.style["font-family"],
      fontStyle: this.style["font-style"],
      fontVariant: this.style["font-variant"]
    };
    constraints = {};
    if (this.doAutoSizeHeight) {
      constraints.width = this.width;
    }
    size = Utils.textSize(this.text, sizeAffectingStyles, constraints);
    if (this.style.textAlign === "right") {
      this.width = size.width;
      this.x = this.x - this.width;
    } else {
      this.width = size.width;
    }
    return this.height = size.height;
  };

  TextLayer.define("autoSize", {
    get: function() {
      return this.doAutoSize;
    },
    set: function(value) {
      this.doAutoSize = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("autoSizeHeight", {
    set: function(value) {
      this.doAutoSize = value;
      this.doAutoSizeHeight = value;
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("contentEditable", {
    set: function(boolean) {
      this._element.contentEditable = boolean;
      this.ignoreEvents = !boolean;
      return this.on("input", function() {
        if (this.doAutoSize) {
          return this.calcSize();
        }
      });
    }
  });

  TextLayer.define("text", {
    get: function() {
      return this._element.textContent;
    },
    set: function(value) {
      this._element.textContent = value;
      this.emit("change:text", value);
      if (this.doAutoSize) {
        return this.calcSize();
      }
    }
  });

  TextLayer.define("fontFamily", {
    get: function() {
      return this.style.fontFamily;
    },
    set: function(value) {
      return this.setStyle("fontFamily", value);
    }
  });

  TextLayer.define("fontSize", {
    get: function() {
      return this.style.fontSize.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("fontSize", value, true);
    }
  });

  TextLayer.define("lineHeight", {
    get: function() {
      return this.style.lineHeight;
    },
    set: function(value) {
      return this.setStyle("lineHeight", value);
    }
  });

  TextLayer.define("fontWeight", {
    get: function() {
      return this.style.fontWeight;
    },
    set: function(value) {
      return this.setStyle("fontWeight", value);
    }
  });

  TextLayer.define("fontStyle", {
    get: function() {
      return this.style.fontStyle;
    },
    set: function(value) {
      return this.setStyle("fontStyle", value);
    }
  });

  TextLayer.define("fontVariant", {
    get: function() {
      return this.style.fontVariant;
    },
    set: function(value) {
      return this.setStyle("fontVariant", value);
    }
  });

  TextLayer.define("padding", {
    set: function(value) {
      this.setStyle("paddingTop", value, true);
      this.setStyle("paddingRight", value, true);
      this.setStyle("paddingBottom", value, true);
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("paddingTop", {
    get: function() {
      return this.style.paddingTop.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingTop", value, true);
    }
  });

  TextLayer.define("paddingRight", {
    get: function() {
      return this.style.paddingRight.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingRight", value, true);
    }
  });

  TextLayer.define("paddingBottom", {
    get: function() {
      return this.style.paddingBottom.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingBottom", value, true);
    }
  });

  TextLayer.define("paddingLeft", {
    get: function() {
      return this.style.paddingLeft.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("paddingLeft", value, true);
    }
  });

  TextLayer.define("textAlign", {
    set: function(value) {
      return this.setStyle("textAlign", value);
    }
  });

  TextLayer.define("textTransform", {
    get: function() {
      return this.style.textTransform;
    },
    set: function(value) {
      return this.setStyle("textTransform", value);
    }
  });

  TextLayer.define("letterSpacing", {
    get: function() {
      return this.style.letterSpacing.replace("px", "");
    },
    set: function(value) {
      return this.setStyle("letterSpacing", value, true);
    }
  });

  TextLayer.define("length", {
    get: function() {
      return this.text.length;
    }
  });

  return TextLayer;

})(Layer);

convertToTextLayer = function(layer) {
  var css, cssObj, importPath, t;
  t = new TextLayer({
    name: layer.name,
    frame: layer.frame,
    parent: layer.parent
  });
  cssObj = {};
  css = layer._info.metadata.css;
  css.forEach(function(rule) {
    var arr;
    if (_.includes(rule, '/*')) {
      return;
    }
    arr = rule.split(': ');
    return cssObj[arr[0]] = arr[1].replace(';', '');
  });
  t.style = cssObj;
  importPath = layer.__framerImportedFromPath;
  if (_.includes(importPath, '@2x')) {
    t.fontSize *= 2;
    t.lineHeight = (parseInt(t.lineHeight) * 2) + 'px';
    t.letterSpacing *= 2;
  }
  t.y -= (parseInt(t.lineHeight) - t.fontSize) / 2;
  t.y -= t.fontSize * 0.1;
  t.x -= t.fontSize * 0.08;
  t.width += t.fontSize * 0.5;
  t.text = layer._info.metadata.string;
  layer.destroy();
  return t;
};

Layer.prototype.convertToTextLayer = function() {
  return convertToTextLayer(this);
};

convertTextLayers = function(obj) {
  var layer, prop, results;
  results = [];
  for (prop in obj) {
    layer = obj[prop];
    if (layer._info.kind === "text") {
      results.push(obj[prop] = convertToTextLayer(layer));
    } else {
      results.push(void 0);
    }
  }
  return results;
};

Layer.prototype.frameAsTextLayer = function(properties) {
  var t;
  t = new TextLayer;
  t.frame = this.frame;
  t.superLayer = this.superLayer;
  _.extend(t, properties);
  this.destroy();
  return t;
};

exports.TextLayer = TextLayer;

exports.convertTextLayers = convertTextLayers;


},{}],"input":[function(require,module,exports){
var growthRatio, imageHeight,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

exports.keyboardLayer = new Layer({
  x: 0,
  y: Screen.height,
  width: Screen.width,
  height: 432,
  html: "<img style='width: 100%;' src='modules/keyboard.png'/>"
});

growthRatio = Screen.width / 732;

imageHeight = growthRatio * 432;

exports.keyboardLayer.states = {
  shown: {
    y: Screen.height - imageHeight
  }
};

exports.keyboardLayer.states.animationOptions = {
  curve: "spring(500,50,15)"
};

exports.Input = (function(superClass) {
  extend(Input, superClass);

  Input.define("style", {
    get: function() {
      return this.input.style;
    },
    set: function(value) {
      return _.extend(this.input.style, value);
    }
  });

  Input.define("value", {
    get: function() {
      return this.input.value;
    },
    set: function(value) {
      return this.input.value = value;
    }
  });

  function Input(options) {
    if (options == null) {
      options = {};
    }
    if (options.setup == null) {
      options.setup = false;
    }
    if (options.width == null) {
      options.width = Screen.width;
    }
    if (options.clip == null) {
      options.clip = false;
    }
    if (options.height == null) {
      options.height = 60;
    }
    if (options.backgroundColor == null) {
      options.backgroundColor = options.setup ? "rgba(255, 60, 47, .5)" : "transparent";
    }
    if (options.fontSize == null) {
      options.fontSize = 30;
    }
    if (options.lineHeight == null) {
      options.lineHeight = 30;
    }
    if (options.padding == null) {
      options.padding = 10;
    }
    if (options.text == null) {
      options.text = "";
    }
    if (options.placeholder == null) {
      options.placeholder = "";
    }
    if (options.virtualKeyboard == null) {
      options.virtualKeyboard = Utils.isMobile() ? false : true;
    }
    if (options.type == null) {
      options.type = "text";
    }
    if (options.goButton == null) {
      options.goButton = false;
    }
    Input.__super__.constructor.call(this, options);
    if (options.placeholderColor != null) {
      this.placeholderColor = options.placeholderColor;
    }
    this.input = document.createElement("input");
    this.input.id = "input-" + (_.now());
    this.input.style.cssText = "font-size: " + options.fontSize + "px; line-height: " + options.lineHeight + "px; padding: " + options.padding + "px; width: " + options.width + "px; height: " + options.height + "px; border: none; outline-width: 0; background-image: url(about:blank); background-color: " + options.backgroundColor + ";";
    this.input.value = options.text;
    this.input.type = options.type;
    this.input.placeholder = options.placeholder;
    this.form = document.createElement("form");
    if (options.goButton) {
      this.form.action = "#";
      this.form.addEventListener("submit", function(event) {
        return event.preventDefault();
      });
    }
    this.form.appendChild(this.input);
    this._element.appendChild(this.form);
    this.backgroundColor = "transparent";
    if (this.placeholderColor) {
      this.updatePlaceholderColor(options.placeholderColor);
    }
    if (!Utils.isMobile() && options.virtualKeyboard === true) {
      this.input.addEventListener("focus", function() {
        exports.keyboardLayer.bringToFront();
        return exports.keyboardLayer.states.next();
      });
      this.input.addEventListener("blur", function() {
        return exports.keyboardLayer.states["switch"]("default");
      });
    }
  }

  Input.prototype.updatePlaceholderColor = function(color) {
    var css;
    this.placeholderColor = color;
    if (this.pageStyle != null) {
      document.head.removeChild(this.pageStyle);
    }
    this.pageStyle = document.createElement("style");
    this.pageStyle.type = "text/css";
    css = "#" + this.input.id + "::-webkit-input-placeholder { color: " + this.placeholderColor + "; }";
    this.pageStyle.appendChild(document.createTextNode(css));
    return document.head.appendChild(this.pageStyle);
  };

  Input.prototype.focus = function() {
    return this.input.focus();
  };

  Input.prototype.onFocus = function(cb) {
    return this.input.addEventListener("focus", function() {
      return cb.apply(this);
    });
  };

  Input.prototype.onBlur = function(cb) {
    return this.input.addEventListener("blur", function() {
      return cb.apply(this);
    });
  };

  return Input;

})(Layer);


},{}],"stateMachine":[function(require,module,exports){
exports.Machine = (function() {
  function Machine(options) {
    this.options = options;
    this.render();
  }

  Machine.prototype.render = function() {
    return this.options.layers();
  };

  Machine.prototype.killLayers = function() {
    var i, layer, len, ref, results;
    ref = this.options.framer.CurrentContext._layers;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      layer = ref[i];
      results.push(layer.destroy());
    }
    return results;
  };

  Machine.prototype.setState = function(newState) {
    _.map(newState, (function(_this) {
      return function(value, key) {
        return _this.options.state = _.set(_this.options.state, key, value);
      };
    })(this));
    this.killLayers();
    return this.render();
  };

  Machine.prototype.toggleState = function(key) {
    this.value = _.get(this.options.state, key);
    this.options.state = _.set(this.options.state, key, !this.value);
    this.killLayers();
    return this.render();
  };

  Machine.prototype.debug = function() {
    return print(this.options.state);
  };

  return Machine;

})();


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJhbWVyLm1vZHVsZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2xpZWJjaGVuL0Ryb3Bib3ggKFBlcnNvbmFsKS9BbmRyZXcvRnJhbWVyL2ZyYW1lclN0YXRlTWFjaGluZS9tb2R1bGUvdG9kb0V4YW1wbGUuZnJhbWVyL21vZHVsZXMvc3RhdGVNYWNoaW5lLmNvZmZlZSIsIi4uLy4uLy4uLy4uLy4uL1VzZXJzL2xpZWJjaGVuL0Ryb3Bib3ggKFBlcnNvbmFsKS9BbmRyZXcvRnJhbWVyL2ZyYW1lclN0YXRlTWFjaGluZS9tb2R1bGUvdG9kb0V4YW1wbGUuZnJhbWVyL21vZHVsZXMvaW5wdXQuY29mZmVlIiwiLi4vLi4vLi4vLi4vLi4vVXNlcnMvbGllYmNoZW4vRHJvcGJveCAoUGVyc29uYWwpL0FuZHJldy9GcmFtZXIvZnJhbWVyU3RhdGVNYWNoaW5lL21vZHVsZS90b2RvRXhhbXBsZS5mcmFtZXIvbW9kdWxlcy9UZXh0TGF5ZXIuY29mZmVlIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBleHBvcnRzLk1hY2hpbmVcblx0Y29uc3RydWN0b3I6IChvcHRpb25zKSAtPlxuXHRcdEBvcHRpb25zID0gb3B0aW9uc1xuXG5cdFx0IyBSZW5kZXIgdGhlIGluaXRpYWwgdmlld1xuXHRcdEByZW5kZXIoKVxuXG5cdHJlbmRlcjogLT4gQG9wdGlvbnMubGF5ZXJzKClcblxuXHRraWxsTGF5ZXJzOiAoKSAtPlxuXHRcdCMgRGVzdHJveSBhbGwgbGF5ZXJzXG5cdFx0IyBJdCdkIGJlIGNvb2wgdG8gZG8gc29tZSBkaWZmaW5nIGhlcmUuLi5cblx0XHRmb3IgbGF5ZXIgaW4gQG9wdGlvbnMuZnJhbWVyLkN1cnJlbnRDb250ZXh0Ll9sYXllcnNcblx0XHRcdGxheWVyLmRlc3Ryb3koKVxuXG5cdHNldFN0YXRlOiAobmV3U3RhdGUpIC0+XG5cdFx0IyBTZXQgdGhlIHN0YXRlXG5cdFx0IyBJdGVyYXRlIHRocm91Z2ggdGhlIG9iamVjdFxuXHRcdF8ubWFwIG5ld1N0YXRlLCAodmFsdWUsIGtleSkgPT5cblx0XHRcdFx0QG9wdGlvbnMuc3RhdGUgPSBfLnNldCBAb3B0aW9ucy5zdGF0ZSwga2V5LCB2YWx1ZVxuXG5cdFx0QGtpbGxMYXllcnMoKVxuXHRcdEByZW5kZXIoKVxuXG5cdHRvZ2dsZVN0YXRlOiAoa2V5KSAtPlxuXHRcdCMgR2V0IHRoZSBjdXJyZW50IHZhbHVlXG5cdFx0QHZhbHVlID0gXy5nZXQgQG9wdGlvbnMuc3RhdGUsIGtleVxuXG5cdFx0IyBTZXQgdGhlIHZhbHVlIHRvIHRoZSBvcHBvc2l0ZVxuXHRcdEBvcHRpb25zLnN0YXRlID0gXy5zZXQgQG9wdGlvbnMuc3RhdGUsIGtleSwgIUB2YWx1ZVxuXG5cdFx0QGtpbGxMYXllcnMoKVxuXHRcdEByZW5kZXIoKVxuXG5cdGRlYnVnOiAoKSAtPlxuXHRcdHByaW50IEBvcHRpb25zLnN0YXRlXG4iLCJleHBvcnRzLmtleWJvYXJkTGF5ZXIgPSBuZXcgTGF5ZXJcblx0eDowLCB5OlNjcmVlbi5oZWlnaHQsIHdpZHRoOlNjcmVlbi53aWR0aCwgaGVpZ2h0OjQzMlxuXHRodG1sOlwiPGltZyBzdHlsZT0nd2lkdGg6IDEwMCU7JyBzcmM9J21vZHVsZXMva2V5Ym9hcmQucG5nJy8+XCJcblxuI3NjcmVlbiB3aWR0aCB2cy4gc2l6ZSBvZiBpbWFnZSB3aWR0aFxuZ3Jvd3RoUmF0aW8gPSBTY3JlZW4ud2lkdGggLyA3MzJcbmltYWdlSGVpZ2h0ID0gZ3Jvd3RoUmF0aW8gKiA0MzJcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcyA9XG5cdHNob3duOiBcblx0XHR5OiBTY3JlZW4uaGVpZ2h0IC0gaW1hZ2VIZWlnaHRcblxuZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5hbmltYXRpb25PcHRpb25zID1cblx0Y3VydmU6IFwic3ByaW5nKDUwMCw1MCwxNSlcIlxuXG5jbGFzcyBleHBvcnRzLklucHV0IGV4dGVuZHMgTGF5ZXJcblx0QGRlZmluZSBcInN0eWxlXCIsXG5cdFx0Z2V0OiAtPiBAaW5wdXQuc3R5bGVcblx0XHRzZXQ6ICh2YWx1ZSkgLT5cblx0XHRcdF8uZXh0ZW5kIEBpbnB1dC5zdHlsZSwgdmFsdWVcblxuXHRAZGVmaW5lIFwidmFsdWVcIixcblx0XHRnZXQ6IC0+IEBpbnB1dC52YWx1ZVxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QGlucHV0LnZhbHVlID0gdmFsdWVcblxuXHRjb25zdHJ1Y3RvcjogKG9wdGlvbnMgPSB7fSkgLT5cblx0XHRvcHRpb25zLnNldHVwID89IGZhbHNlXG5cdFx0b3B0aW9ucy53aWR0aCA/PSBTY3JlZW4ud2lkdGhcblx0XHRvcHRpb25zLmNsaXAgPz0gZmFsc2Vcblx0XHRvcHRpb25zLmhlaWdodCA/PSA2MFxuXHRcdG9wdGlvbnMuYmFja2dyb3VuZENvbG9yID89IGlmIG9wdGlvbnMuc2V0dXAgdGhlbiBcInJnYmEoMjU1LCA2MCwgNDcsIC41KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5mb250U2l6ZSA/PSAzMFxuXHRcdG9wdGlvbnMubGluZUhlaWdodCA/PSAzMFxuXHRcdG9wdGlvbnMucGFkZGluZyA/PSAxMFxuXHRcdG9wdGlvbnMudGV4dCA/PSBcIlwiXG5cdFx0b3B0aW9ucy5wbGFjZWhvbGRlciA/PSBcIlwiXG5cdFx0b3B0aW9ucy52aXJ0dWFsS2V5Ym9hcmQgPz0gaWYgVXRpbHMuaXNNb2JpbGUoKSB0aGVuIGZhbHNlIGVsc2UgdHJ1ZVxuXHRcdG9wdGlvbnMudHlwZSA/PSBcInRleHRcIlxuXHRcdG9wdGlvbnMuZ29CdXR0b24gPz0gZmFsc2VcblxuXHRcdHN1cGVyIG9wdGlvbnNcblxuXHRcdEBwbGFjZWhvbGRlckNvbG9yID0gb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIG9wdGlvbnMucGxhY2Vob2xkZXJDb2xvcj9cblx0XHRAaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50IFwiaW5wdXRcIlxuXHRcdEBpbnB1dC5pZCA9IFwiaW5wdXQtI3tfLm5vdygpfVwiXG5cdFx0QGlucHV0LnN0eWxlLmNzc1RleHQgPSBcImZvbnQtc2l6ZTogI3tvcHRpb25zLmZvbnRTaXplfXB4OyBsaW5lLWhlaWdodDogI3tvcHRpb25zLmxpbmVIZWlnaHR9cHg7IHBhZGRpbmc6ICN7b3B0aW9ucy5wYWRkaW5nfXB4OyB3aWR0aDogI3tvcHRpb25zLndpZHRofXB4OyBoZWlnaHQ6ICN7b3B0aW9ucy5oZWlnaHR9cHg7IGJvcmRlcjogbm9uZTsgb3V0bGluZS13aWR0aDogMDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKGFib3V0OmJsYW5rKTsgYmFja2dyb3VuZC1jb2xvcjogI3tvcHRpb25zLmJhY2tncm91bmRDb2xvcn07XCJcblx0XHRAaW5wdXQudmFsdWUgPSBvcHRpb25zLnRleHRcblx0XHRAaW5wdXQudHlwZSA9IG9wdGlvbnMudHlwZVxuXHRcdEBpbnB1dC5wbGFjZWhvbGRlciA9IG9wdGlvbnMucGxhY2Vob2xkZXJcblx0XHRAZm9ybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgXCJmb3JtXCJcblxuXHRcdGlmIG9wdGlvbnMuZ29CdXR0b25cblx0XHRcdEBmb3JtLmFjdGlvbiA9IFwiI1wiXG5cdFx0XHRAZm9ybS5hZGRFdmVudExpc3RlbmVyIFwic3VibWl0XCIsIChldmVudCkgLT5cblx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG5cdFx0QGZvcm0uYXBwZW5kQ2hpbGQgQGlucHV0XG5cdFx0QF9lbGVtZW50LmFwcGVuZENoaWxkIEBmb3JtXG5cblx0XHRAYmFja2dyb3VuZENvbG9yID0gXCJ0cmFuc3BhcmVudFwiXG5cdFx0QHVwZGF0ZVBsYWNlaG9sZGVyQ29sb3Igb3B0aW9ucy5wbGFjZWhvbGRlckNvbG9yIGlmIEBwbGFjZWhvbGRlckNvbG9yXG5cblx0XHQjb25seSBzaG93IGhvbm9yIHZpcnR1YWwga2V5Ym9hcmQgb3B0aW9uIHdoZW4gbm90IG9uIG1vYmlsZSxcblx0XHQjb3RoZXJ3aXNlIGlnbm9yZVxuXHRcdGlmICFVdGlscy5pc01vYmlsZSgpICYmIG9wdGlvbnMudmlydHVhbEtleWJvYXJkIGlzIHRydWVcblx0XHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLmJyaW5nVG9Gcm9udCgpXG5cdFx0XHRcdGV4cG9ydHMua2V5Ym9hcmRMYXllci5zdGF0ZXMubmV4dCgpXG5cdFx0XHRAaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImJsdXJcIiwgLT5cblx0XHRcdFx0ZXhwb3J0cy5rZXlib2FyZExheWVyLnN0YXRlcy5zd2l0Y2ggXCJkZWZhdWx0XCJcblxuXHR1cGRhdGVQbGFjZWhvbGRlckNvbG9yOiAoY29sb3IpIC0+XG5cdFx0QHBsYWNlaG9sZGVyQ29sb3IgPSBjb2xvclxuXHRcdGlmIEBwYWdlU3R5bGU/XG5cdFx0XHRkb2N1bWVudC5oZWFkLnJlbW92ZUNoaWxkIEBwYWdlU3R5bGVcblx0XHRAcGFnZVN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBcInN0eWxlXCJcblx0XHRAcGFnZVN0eWxlLnR5cGUgPSBcInRleHQvY3NzXCJcblx0XHRjc3MgPSBcIiMje0BpbnB1dC5pZH06Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIgeyBjb2xvcjogI3tAcGxhY2Vob2xkZXJDb2xvcn07IH1cIlxuXHRcdEBwYWdlU3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUgY3NzKVxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQgQHBhZ2VTdHlsZVxuXG5cdGZvY3VzOiAoKSAtPlxuXHRcdEBpbnB1dC5mb2N1cygpXG5cblx0b25Gb2N1czogKGNiKSAtPlxuXHRcdEBpbnB1dC5hZGRFdmVudExpc3RlbmVyIFwiZm9jdXNcIiwgLT5cblx0XHRcdGNiLmFwcGx5KEApXG5cblx0b25CbHVyOiAoY2IpIC0+XG5cdFx0QGlucHV0LmFkZEV2ZW50TGlzdGVuZXIgXCJibHVyXCIsIC0+XG5cdFx0XHRjYi5hcHBseShAKVxuIiwiY2xhc3MgVGV4dExheWVyIGV4dGVuZHMgTGF5ZXJcblx0XHRcblx0Y29uc3RydWN0b3I6IChvcHRpb25zPXt9KSAtPlxuXHRcdEBkb0F1dG9TaXplID0gZmFsc2Vcblx0XHRAZG9BdXRvU2l6ZUhlaWdodCA9IGZhbHNlXG5cdFx0b3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgPz0gaWYgb3B0aW9ucy5zZXR1cCB0aGVuIFwiaHNsYSg2MCwgOTAlLCA0NyUsIC40KVwiIGVsc2UgXCJ0cmFuc3BhcmVudFwiXG5cdFx0b3B0aW9ucy5jb2xvciA/PSBcInJlZFwiXG5cdFx0b3B0aW9ucy5saW5lSGVpZ2h0ID89IDEuMjVcblx0XHRvcHRpb25zLmZvbnRGYW1pbHkgPz0gXCJIZWx2ZXRpY2FcIlxuXHRcdG9wdGlvbnMuZm9udFNpemUgPz0gMjBcblx0XHRvcHRpb25zLnRleHQgPz0gXCJVc2UgbGF5ZXIudGV4dCB0byBhZGQgdGV4dFwiXG5cdFx0c3VwZXIgb3B0aW9uc1xuXHRcdEBzdHlsZS53aGl0ZVNwYWNlID0gXCJwcmUtbGluZVwiICMgYWxsb3cgXFxuIGluIC50ZXh0XG5cdFx0QHN0eWxlLm91dGxpbmUgPSBcIm5vbmVcIiAjIG5vIGJvcmRlciB3aGVuIHNlbGVjdGVkXG5cdFx0XG5cdHNldFN0eWxlOiAocHJvcGVydHksIHZhbHVlLCBweFN1ZmZpeCA9IGZhbHNlKSAtPlxuXHRcdEBzdHlsZVtwcm9wZXJ0eV0gPSBpZiBweFN1ZmZpeCB0aGVuIHZhbHVlK1wicHhcIiBlbHNlIHZhbHVlXG5cdFx0QGVtaXQoXCJjaGFuZ2U6I3twcm9wZXJ0eX1cIiwgdmFsdWUpXG5cdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRcdFxuXHRjYWxjU2l6ZTogLT5cblx0XHRzaXplQWZmZWN0aW5nU3R5bGVzID1cblx0XHRcdGxpbmVIZWlnaHQ6IEBzdHlsZVtcImxpbmUtaGVpZ2h0XCJdXG5cdFx0XHRmb250U2l6ZTogQHN0eWxlW1wiZm9udC1zaXplXCJdXG5cdFx0XHRmb250V2VpZ2h0OiBAc3R5bGVbXCJmb250LXdlaWdodFwiXVxuXHRcdFx0cGFkZGluZ1RvcDogQHN0eWxlW1wicGFkZGluZy10b3BcIl1cblx0XHRcdHBhZGRpbmdSaWdodDogQHN0eWxlW1wicGFkZGluZy1yaWdodFwiXVxuXHRcdFx0cGFkZGluZ0JvdHRvbTogQHN0eWxlW1wicGFkZGluZy1ib3R0b21cIl1cblx0XHRcdHBhZGRpbmdMZWZ0OiBAc3R5bGVbXCJwYWRkaW5nLWxlZnRcIl1cblx0XHRcdHRleHRUcmFuc2Zvcm06IEBzdHlsZVtcInRleHQtdHJhbnNmb3JtXCJdXG5cdFx0XHRib3JkZXJXaWR0aDogQHN0eWxlW1wiYm9yZGVyLXdpZHRoXCJdXG5cdFx0XHRsZXR0ZXJTcGFjaW5nOiBAc3R5bGVbXCJsZXR0ZXItc3BhY2luZ1wiXVxuXHRcdFx0Zm9udEZhbWlseTogQHN0eWxlW1wiZm9udC1mYW1pbHlcIl1cblx0XHRcdGZvbnRTdHlsZTogQHN0eWxlW1wiZm9udC1zdHlsZVwiXVxuXHRcdFx0Zm9udFZhcmlhbnQ6IEBzdHlsZVtcImZvbnQtdmFyaWFudFwiXVxuXHRcdGNvbnN0cmFpbnRzID0ge31cblx0XHRpZiBAZG9BdXRvU2l6ZUhlaWdodCB0aGVuIGNvbnN0cmFpbnRzLndpZHRoID0gQHdpZHRoXG5cdFx0c2l6ZSA9IFV0aWxzLnRleHRTaXplIEB0ZXh0LCBzaXplQWZmZWN0aW5nU3R5bGVzLCBjb25zdHJhaW50c1xuXHRcdGlmIEBzdHlsZS50ZXh0QWxpZ24gaXMgXCJyaWdodFwiXG5cdFx0XHRAd2lkdGggPSBzaXplLndpZHRoXG5cdFx0XHRAeCA9IEB4LUB3aWR0aFxuXHRcdGVsc2Vcblx0XHRcdEB3aWR0aCA9IHNpemUud2lkdGhcblx0XHRAaGVpZ2h0ID0gc2l6ZS5oZWlnaHRcblxuXHRAZGVmaW5lIFwiYXV0b1NpemVcIixcblx0XHRnZXQ6IC0+IEBkb0F1dG9TaXplXG5cdFx0c2V0OiAodmFsdWUpIC0+IFxuXHRcdFx0QGRvQXV0b1NpemUgPSB2YWx1ZVxuXHRcdFx0aWYgQGRvQXV0b1NpemUgdGhlbiBAY2FsY1NpemUoKVxuXHRAZGVmaW5lIFwiYXV0b1NpemVIZWlnaHRcIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAZG9BdXRvU2l6ZSA9IHZhbHVlXG5cdFx0XHRAZG9BdXRvU2l6ZUhlaWdodCA9IHZhbHVlXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJjb250ZW50RWRpdGFibGVcIixcblx0XHRzZXQ6IChib29sZWFuKSAtPlxuXHRcdFx0QF9lbGVtZW50LmNvbnRlbnRFZGl0YWJsZSA9IGJvb2xlYW5cblx0XHRcdEBpZ25vcmVFdmVudHMgPSAhYm9vbGVhblxuXHRcdFx0QG9uIFwiaW5wdXRcIiwgLT4gQGNhbGNTaXplKCkgaWYgQGRvQXV0b1NpemVcblx0QGRlZmluZSBcInRleHRcIixcblx0XHRnZXQ6IC0+IEBfZWxlbWVudC50ZXh0Q29udGVudFxuXHRcdHNldDogKHZhbHVlKSAtPlxuXHRcdFx0QF9lbGVtZW50LnRleHRDb250ZW50ID0gdmFsdWVcblx0XHRcdEBlbWl0KFwiY2hhbmdlOnRleHRcIiwgdmFsdWUpXG5cdFx0XHRpZiBAZG9BdXRvU2l6ZSB0aGVuIEBjYWxjU2l6ZSgpXG5cdEBkZWZpbmUgXCJmb250RmFtaWx5XCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRGYW1pbHlcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwiZm9udEZhbWlseVwiLCB2YWx1ZSlcblx0QGRlZmluZSBcImZvbnRTaXplXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRTaXplLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcImZvbnRTaXplXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwibGluZUhlaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5saW5lSGVpZ2h0IFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJsaW5lSGVpZ2h0XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFdlaWdodFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250V2VpZ2h0IFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250V2VpZ2h0XCIsIHZhbHVlKVxuXHRAZGVmaW5lIFwiZm9udFN0eWxlXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmZvbnRTdHlsZVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250U3R5bGVcIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJmb250VmFyaWFudFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5mb250VmFyaWFudFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJmb250VmFyaWFudFwiLCB2YWx1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdcIixcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gXG5cdFx0XHRAc2V0U3R5bGUoXCJwYWRkaW5nVG9wXCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ1JpZ2h0XCIsIHZhbHVlLCB0cnVlKVxuXHRcdFx0QHNldFN0eWxlKFwicGFkZGluZ0JvdHRvbVwiLCB2YWx1ZSwgdHJ1ZSlcblx0XHRcdEBzZXRTdHlsZShcInBhZGRpbmdMZWZ0XCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ1RvcFwiLCBcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nVG9wLnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdUb3BcIiwgdmFsdWUsIHRydWUpXG5cdEBkZWZpbmUgXCJwYWRkaW5nUmlnaHRcIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ1JpZ2h0LnJlcGxhY2UoXCJweFwiLFwiXCIpXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInBhZGRpbmdSaWdodFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInBhZGRpbmdCb3R0b21cIiwgXG5cdFx0Z2V0OiAtPiBAc3R5bGUucGFkZGluZ0JvdHRvbS5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nQm90dG9tXCIsIHZhbHVlLCB0cnVlKVxuXHRAZGVmaW5lIFwicGFkZGluZ0xlZnRcIixcblx0XHRnZXQ6IC0+IEBzdHlsZS5wYWRkaW5nTGVmdC5yZXBsYWNlKFwicHhcIixcIlwiKVxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJwYWRkaW5nTGVmdFwiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcInRleHRBbGlnblwiLFxuXHRcdHNldDogKHZhbHVlKSAtPiBAc2V0U3R5bGUoXCJ0ZXh0QWxpZ25cIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJ0ZXh0VHJhbnNmb3JtXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLnRleHRUcmFuc2Zvcm0gXG5cdFx0c2V0OiAodmFsdWUpIC0+IEBzZXRTdHlsZShcInRleHRUcmFuc2Zvcm1cIiwgdmFsdWUpXG5cdEBkZWZpbmUgXCJsZXR0ZXJTcGFjaW5nXCIsIFxuXHRcdGdldDogLT4gQHN0eWxlLmxldHRlclNwYWNpbmcucmVwbGFjZShcInB4XCIsXCJcIilcblx0XHRzZXQ6ICh2YWx1ZSkgLT4gQHNldFN0eWxlKFwibGV0dGVyU3BhY2luZ1wiLCB2YWx1ZSwgdHJ1ZSlcblx0QGRlZmluZSBcImxlbmd0aFwiLCBcblx0XHRnZXQ6IC0+IEB0ZXh0Lmxlbmd0aFxuXG5jb252ZXJ0VG9UZXh0TGF5ZXIgPSAobGF5ZXIpIC0+XG5cdHQgPSBuZXcgVGV4dExheWVyXG5cdFx0bmFtZTogbGF5ZXIubmFtZVxuXHRcdGZyYW1lOiBsYXllci5mcmFtZVxuXHRcdHBhcmVudDogbGF5ZXIucGFyZW50XG5cdFxuXHRjc3NPYmogPSB7fVxuXHRjc3MgPSBsYXllci5faW5mby5tZXRhZGF0YS5jc3Ncblx0Y3NzLmZvckVhY2ggKHJ1bGUpIC0+XG5cdFx0cmV0dXJuIGlmIF8uaW5jbHVkZXMgcnVsZSwgJy8qJ1xuXHRcdGFyciA9IHJ1bGUuc3BsaXQoJzogJylcblx0XHRjc3NPYmpbYXJyWzBdXSA9IGFyclsxXS5yZXBsYWNlKCc7JywnJylcblx0dC5zdHlsZSA9IGNzc09ialxuXHRcblx0aW1wb3J0UGF0aCA9IGxheWVyLl9fZnJhbWVySW1wb3J0ZWRGcm9tUGF0aFxuXHRpZiBfLmluY2x1ZGVzIGltcG9ydFBhdGgsICdAMngnXG5cdFx0dC5mb250U2l6ZSAqPSAyXG5cdFx0dC5saW5lSGVpZ2h0ID0gKHBhcnNlSW50KHQubGluZUhlaWdodCkqMikrJ3B4J1xuXHRcdHQubGV0dGVyU3BhY2luZyAqPSAyXG5cdFx0XHRcdFx0XG5cdHQueSAtPSAocGFyc2VJbnQodC5saW5lSGVpZ2h0KS10LmZvbnRTaXplKS8yICMgY29tcGVuc2F0ZSBmb3IgaG93IENTUyBoYW5kbGVzIGxpbmUgaGVpZ2h0XG5cdHQueSAtPSB0LmZvbnRTaXplICogMC4xICMgc2tldGNoIHBhZGRpbmdcblx0dC54IC09IHQuZm9udFNpemUgKiAwLjA4ICMgc2tldGNoIHBhZGRpbmdcblx0dC53aWR0aCArPSB0LmZvbnRTaXplICogMC41ICMgc2tldGNoIHBhZGRpbmdcblxuXHR0LnRleHQgPSBsYXllci5faW5mby5tZXRhZGF0YS5zdHJpbmdcblx0bGF5ZXIuZGVzdHJveSgpXG5cdHJldHVybiB0XG5cbkxheWVyOjpjb252ZXJ0VG9UZXh0TGF5ZXIgPSAtPiBjb252ZXJ0VG9UZXh0TGF5ZXIoQClcblxuY29udmVydFRleHRMYXllcnMgPSAob2JqKSAtPlxuXHRmb3IgcHJvcCxsYXllciBvZiBvYmpcblx0XHRpZiBsYXllci5faW5mby5raW5kIGlzIFwidGV4dFwiXG5cdFx0XHRvYmpbcHJvcF0gPSBjb252ZXJ0VG9UZXh0TGF5ZXIobGF5ZXIpXG5cbiMgQmFja3dhcmRzIGNvbXBhYmlsaXR5LiBSZXBsYWNlZCBieSBjb252ZXJ0VG9UZXh0TGF5ZXIoKVxuTGF5ZXI6OmZyYW1lQXNUZXh0TGF5ZXIgPSAocHJvcGVydGllcykgLT5cbiAgICB0ID0gbmV3IFRleHRMYXllclxuICAgIHQuZnJhbWUgPSBAZnJhbWVcbiAgICB0LnN1cGVyTGF5ZXIgPSBAc3VwZXJMYXllclxuICAgIF8uZXh0ZW5kIHQscHJvcGVydGllc1xuICAgIEBkZXN0cm95KClcbiAgICB0XG5cbmV4cG9ydHMuVGV4dExheWVyID0gVGV4dExheWVyXG5leHBvcnRzLmNvbnZlcnRUZXh0TGF5ZXJzID0gY29udmVydFRleHRMYXllcnNcbiIsIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBR0FBO0FEQUEsSUFBQSxnREFBQTtFQUFBOzs7QUFBTTs7O0VBRVEsbUJBQUMsT0FBRDs7TUFBQyxVQUFROztJQUNyQixJQUFDLENBQUEsVUFBRCxHQUFjO0lBQ2QsSUFBQyxDQUFBLGdCQUFELEdBQW9COztNQUNwQixPQUFPLENBQUMsa0JBQXNCLE9BQU8sQ0FBQyxLQUFYLEdBQXNCLHdCQUF0QixHQUFvRDs7O01BQy9FLE9BQU8sQ0FBQyxRQUFTOzs7TUFDakIs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
