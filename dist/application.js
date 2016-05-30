/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _ThumbManager = __webpack_require__(/*! ./src/ThumbManager */ 1);

	var _ThumbManager2 = _interopRequireDefault(_ThumbManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.Photos = {
	  ThumbManager: _ThumbManager2.default
	};

/***/ },
/* 1 */
/*!******************************!*\
  !*** ./src/ThumbManager.jsx ***!
  \******************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ThumbCollection = __webpack_require__(/*! ./ThumbCollection */ 2);

	var _ThumbCollection2 = _interopRequireDefault(_ThumbCollection);

	var _react = __webpack_require__(/*! react */ 4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function findSelectedCollection() {
	  var selectedCollection = this.props.selectedCollection;
	  return this.props.thumbCollections.find(function (c) {
	    return selectedCollection === c.name;
	  });
	}

	var ThumbManager = function (_React$Component) {
	  _inherits(ThumbManager, _React$Component);

	  function ThumbManager() {
	    _classCallCheck(this, ThumbManager);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ThumbManager).apply(this, arguments));
	  }

	  _createClass(ThumbManager, [{
	    key: 'render',
	    value: function render() {
	      var collection = findSelectedCollection.call(this);

	      return _react2.default.createElement(_ThumbCollection2.default, collection);
	    }
	  }]);

	  return ThumbManager;
	}(_react2.default.Component);

	ThumbManager.propTypes = {};

	ThumbManager.defaultProps = {};

	exports.default = ThumbManager;

/***/ },
/* 2 */
/*!*********************************!*\
  !*** ./src/ThumbCollection.jsx ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Thumb = __webpack_require__(/*! ./Thumb */ 3);

	var _Thumb2 = _interopRequireDefault(_Thumb);

	var _react = __webpack_require__(/*! react */ 4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ThumbCollection = function (_React$Component) {
	  _inherits(ThumbCollection, _React$Component);

	  function ThumbCollection() {
	    _classCallCheck(this, ThumbCollection);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ThumbCollection).apply(this, arguments));
	  }

	  _createClass(ThumbCollection, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'section',
	        { className: 'photo-thumb-collection', 'data-name': this.props.name },
	        _react2.default.createElement(
	          'h3',
	          null,
	          this.props.name
	        ),
	        this.props.collection.map(function (p, i) {
	          return _react2.default.createElement(_Thumb2.default, _extends({ key: i }, p));
	        })
	      );
	    }
	  }]);

	  return ThumbCollection;
	}(_react2.default.Component);

	ThumbCollection.propTypes = {
	  name: _react2.default.PropTypes.string,
	  collection: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.shape({
	    name: _react2.default.PropTypes.string,
	    backgroundUrl: _react2.default.PropTypes.string,
	    backgroundPosition: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.number)
	  }))
	};

	ThumbCollection.defaultProps = {
	  name: 'This collection has no name',
	  collection: []
	};

	exports.default = ThumbCollection;

/***/ },
/* 3 */
/*!***********************!*\
  !*** ./src/Thumb.jsx ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(/*! react */ 4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function createStyles() {
	  return {
	    backgroundImage: 'url(' + this.props.backgroundUrl + ')',
	    backgroundPosition: this.props.backgroundPosition.x + 'px ' + this.props.backgroundPosition.y + 'px'
	  };
	}

	var Thumb = function (_React$Component) {
	  _inherits(Thumb, _React$Component);

	  function Thumb() {
	    _classCallCheck(this, Thumb);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Thumb).apply(this, arguments));
	  }

	  _createClass(Thumb, [{
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement('div', {
	        className: 'photo-thumb',
	        style: createStyles.call(this),
	        'data-name': this.props.name
	      });
	    }
	  }]);

	  return Thumb;
	}(_react2.default.Component);

	Thumb.propTypes = {
	  name: _react2.default.PropTypes.string,
	  backgroundUrl: _react2.default.PropTypes.string,
	  backgroundPosition: _react2.default.PropTypes.objectOf(_react2.default.PropTypes.number)
	};

	Thumb.defaultProps = {
	  name: 'No name for photo',
	  backgroundUrl: '',
	  backgroundPosition: { x: 0, y: 0 }
	};

	exports.default = Thumb;

/***/ },
/* 4 */
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = React;

/***/ }
/******/ ]);