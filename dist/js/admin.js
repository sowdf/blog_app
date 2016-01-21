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
/***/ function(module, exports, __webpack_require__) {

	var adminHashControl = __webpack_require__(1);
	var adminContentControl = __webpack_require__(4);

	adminHashControl.init();
	adminContentControl.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var pageCtrl = __webpack_require__(2);
	var font = __webpack_require__(3);
	var adminHashCtrl = {
	    init: function() {
	        var articles = document.getElementsByClassName('admin-articles')[0];
	        var write = document.getElementsByClassName('admin-write')[0];
	        var writeBtn = document.getElementsByClassName('admin-write-btn')[0];
	        var backArrow = document.getElementsByClassName('admin-write-back-arrow')[0];
	        var prevArrow = document.getElementsByClassName('admin-prev-btn')[0];
	        var nextArrow = document.getElementsByClassName('admin-next-btn')[0];
	        location.hash = '#articles';
	        pageCtrl._on(articles);
	        adminHashCtrl.editor();
	        window.addEventListener('hashchange', function() {
	            pageCtrl._tableClear();
	            pageCtrl._off(write);
	            pageCtrl._off(articles);
	            var thisHash = location.hash;
	            if (thisHash !== '') {
	                thisHash = thisHash.match(/^\#[^\#]+/)[0];
	            }
	            console.log(thisHash);
	            switch (thisHash) {
	                case '#articles':
	                    pageCtrl._on(articles);
	                    break;
	                case '#write':
	                    pageCtrl._on(write);
	                    break;
	                default :
	                    location.hash = '#articles';
	            }
	        });
	        font.edit(writeBtn, 0.4, '#fff');
	        font.arrow(backArrow, 'left', 0.6, '#fff');
	        font.arrow(prevArrow, 'top', 0.6, '#fff');
	        font.arrow(nextArrow, 'bottom', 0.6, '#fff');
	    },
	    editor: function() {
	        var mainEditor = document.getElementsByClassName('main-edit')[0];
	        var prevEditor = document.getElementsByClassName('main-preview')[0];
	        var switchBtn = document.getElementsByClassName('write-switch-btn')[0];
	        var writeMain = document.getElementsByClassName('write-main')[0];
	        var adminWrite = document.getElementsByClassName('admin-write')[0];
	        var fullScreenBtn = document.getElementsByClassName('write-fullscreen-btn')[0];
	        switchBtn.addEventListener('click', function() {
	            if(writeMain.className === 'write-main') {
	                writeMain.className = 'write-main preview-on';
	            } else {
	                writeMain.className = 'write-main';
	            }
	        });
	        
	        mainEditor.addEventListener('input', function() {
	            var output = markdown.toHTML(mainEditor.value);
	            var a = output.replace(/<code>/g,"<pre><code>");
	            var b = a.replace(/<\/code>/g, "<\/code><\/pre>");
	            prevEditor.innerHTML = b;
	            var codes = document.getElementsByTagName('code');
	            for( var i = 0; i < codes.length; i++) {
	                var langType = codes[i].childNodes[0]
	                !langType ? langType = 'code' : langType = langType.data;
	                var chose = langType.match(/[A-Za-z][^\s]+/);
	                if (chose !== null && document.readyState ==='complete' && chose !== ['']) {
	                    codes[i].className = chose;
	                }
	            }
	            var codes = document.getElementsByTagName('CODE');
	            for (var i = 0; i< codes.length; i++) {
	                hljs.highlightBlock(codes[i]);
	            }
	        });

	        function screenFull() {
	            if(adminWrite.className === 'admin-write admin-write-on') {
	                adminWrite.className = 'admin-write admin-write-on fullscreen-on';
	            } else {
	                adminWrite.className = 'admin-write admin-write-on';
	            }
	        }
	        fullScreenBtn.addEventListener('click', screenFull);
	        window.addEventListener('keydown', function(e) {
	            if ( adminWrite.className === 'admin-write admin-write-on' ||
	                 adminWrite.className === 'admin-write admin-write-on fullscreen-on' )
	            {
	                if(e.keyCode === 0x1B) {
	                    screenFull();
	                }
	            }
	        });
	    }
	}
	module.exports = adminHashCtrl;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var ctrl = {
	    _on : function(ele) {
	        ele.className = ele.className + ' ' + ele.className + '-on';
	    },
	    _off : function(ele) {
	        var get = ele.className.replace(/[A-Za-z-]+-on/g, '');
	        var out = get.trim();
	        ele.className = out;
	    },
	    _listClear: function() {
	        console.log('clear');
	        var list = document.getElementsByClassName('content-articles')[0];
	        var items = document.getElementsByClassName('content-articles-item');
	        var count = items.length;
	        for(var i = 0; i < count; i++) {
	            list.removeChild(items[0]);
	        }
	    },
	    _tableClear: function() {
	        var tbody = document.getElementsByTagName('TBODY')[0];
	        var tlist = document.getElementsByTagName('TR');
	        var count = tlist.length;
	        for(var i = 1; i < count; i++) {
	            tbody.removeChild(tlist[1]);
	        }
	    }
	}
	module.exports = ctrl;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var fonts = {
	    arrow : function(parent,direction,size,color) {
	        var getSize;
	        var getColor;
	        /*jshint -W030 */
	        !size ? getSize = 1 : getSize = size;
	        !color ? getColor = "#000000" : getColor = color;
	        var can = function() {
	            var div = document.createElement('DIV');
	            var setCanvas = document.createElement('canvas');
	            parent.appendChild(div);
	            div.appendChild(setCanvas);
	            div.style.textAlign = 'center';
	            div.style.position = 'absolute';
	            setCanvas.setAttribute('width', 150 * getSize);
	            setCanvas.setAttribute('height', 100 * getSize);
	            return setCanvas;
	        };
	        var canvas = can();

	        if(canvas.getContext){
	            var thisFont = canvas.getContext('2d');
	            thisFont.beginPath();
	            switch(direction){
	                case 'left' :
	                    break;
	                case 'right' :
	                    thisFont.translate(150*getSize, 100*getSize);
	                    thisFont.rotate(180*Math.PI/180);
	                    break;
	                case 'top' :
	                    thisFont.translate(125*getSize, -25*getSize);
	                    thisFont.rotate(90*Math.PI/180);
	                    break;
	                case 'bottom' :
	                    thisFont.translate(25*getSize, 125*getSize);
	                    thisFont.rotate(270*Math.PI/180);
	                    break;
	            }
	            thisFont.moveTo(50*getSize, 50*getSize);
	            thisFont.lineTo(100*getSize, 75*getSize);
	            thisFont.lineTo(70*getSize, 50*getSize);
	            thisFont.lineTo(100*getSize, 25*getSize);
	            thisFont.fillStyle = getColor;
	            thisFont.fill();
	        }
	        var top = parent.clientHeight / 2 - canvas.parentNode.clientHeight / 2;
	        canvas.parentNode.style.top = top + 'px';
	        var left = parent.clientWidth / 2 - canvas.parentNode.clientWidth / 2;
	        canvas.parentNode.style.left = left + 'px';
	    },
	    //example : fonts.arrow(body,'left',2,'red');
	    edit : function(parent,size,color) {
	        var getSize;
	        var getColor;
	        !size ? getSize = 1 : getSize = size;
	        !color ? getColor = "#000000" : getColor = color;
	        var can = function() {
	            var div = document.createElement('DIV');
	            var setCanvas = document.createElement('canvas');
	            parent.appendChild(div);
	            div.appendChild(setCanvas);
	            div.style.textAlign = 'center';
	            div.style.position = 'absolute';
	            setCanvas.setAttribute('class', 'ss-edit');
	            setCanvas.setAttribute('width', 100 * getSize);
	            setCanvas.setAttribute('height', 110 * getSize);
	            return setCanvas;
	        };
	        var canvas = can();
	        var top = parent.clientHeight / 2 - canvas.parentNode.clientHeight / 2;
	        canvas.parentNode.style.top = top + 'px';
	        var left = parent.clientWidth / 2 - canvas.parentNode.clientWidth / 2;
	        canvas.parentNode.style.left = left + 'px';

	        if(canvas.getContext){
	            var thisFont = canvas.getContext('2d');

	            var e,c;

	            function defaultFont() {
	                thisFont.beginPath();
	                thisFont.moveTo(45*getSize, 10*getSize);
	                thisFont.lineTo(55*getSize, 10*getSize);
	                thisFont.lineTo(55*getSize, 70*getSize);
	                thisFont.lineTo(50*getSize, 85*getSize);
	                thisFont.lineTo(45*getSize, 70*getSize);
	                thisFont.fillStyle = getColor;
	                thisFont.fill();
	                thisFont.save();


	                thisFont.beginPath();
	                thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*7)/4,(Math.PI*13)/4,false);
	                thisFont.strokeStyle = getColor;
	                thisFont.stroke();
	            }
	            defaultFont();

	            var i = 7;
	            function start() {
	                thisFont.clearRect(0,0,300,300);

	                thisFont.beginPath();
	                thisFont.moveTo(45*getSize, 10*getSize);
	                thisFont.lineTo(55*getSize, 10*getSize);
	                thisFont.lineTo(55*getSize, 70*getSize);
	                thisFont.lineTo(50*getSize, 85*getSize);
	                thisFont.lineTo(45*getSize, 70*getSize);
	                thisFont.fillStyle = getColor;
	                thisFont.fill();
	                thisFont.save();

	                if(i < 11) {
	                    thisFont.beginPath();
	                    thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*i)/4,(Math.PI*(i+6))/4,false);
	                    thisFont.strokeStyle = getColor;
	                    thisFont.stroke();
	                    i = i + 0.1;
	                } else {
	                    if (i < 14) {
	                        thisFont.beginPath();
	                        thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*i)/4,(Math.PI*18)/4,false);
	                        strokeStyle = getColor;
	                        thisFont.stroke();
	                        thisFont.save();

	                        thisFont.beginPath();
	                        thisFont.moveTo(50*getSize, 100*getSize);
	                        thisFont.lineTo((50-(i-11)*13.3)*getSize, 100*getSize);
	                        thisFont.stroke();
	                        i = i + 0.1;
	                    } else {
	                        clearInterval(c);
	                        i = 14;
	                        thisFont.beginPath();
	                        thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*14)/4,(Math.PI*18)/4,false);
	                        thisFont.stroke();
	                        thisFont.save();

	                        thisFont.beginPath();
	                        thisFont.moveTo(50*getSize, 100*getSize);
	                        thisFont.lineTo(10*getSize, 100*getSize);
	                        thisFont.strokeStyle = getColor;
	                        thisFont.stroke();

	                    }
	                }
	            }

	            function end() {
	                thisFont.clearRect(0,0,300,300);

	                thisFont.beginPath();
	                thisFont.moveTo(45*getSize, 10*getSize);
	                thisFont.lineTo(55*getSize, 10*getSize);
	                thisFont.lineTo(55*getSize, 70*getSize);
	                thisFont.lineTo(50*getSize, 85*getSize);
	                thisFont.lineTo(45*getSize, 70*getSize);
	                thisFont.fillStyle = getColor;
	                thisFont.fill();
	                thisFont.save();

	                if(i > 7) {
	                    if (i > 11) {
	                        thisFont.beginPath();
	                        thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*i)/4,(Math.PI*18)/4,false);
	                        strokeStyle = getColor;
	                        thisFont.stroke();
	                        thisFont.save();

	                        thisFont.beginPath();
	                        thisFont.moveTo(50*getSize, 100*getSize);
	                        thisFont.lineTo((50-(i-11)*13.3)*getSize, 100*getSize);
	                        thisFont.stroke();
	                        i = i - 0.1;
	                    } else {
	                        thisFont.beginPath();
	                        thisFont.arc(50*getSize,80*getSize,20*getSize,(Math.PI*i)/4,(Math.PI*(i+6))/4,false);
	                        thisFont.strokeStyle = getColor;
	                        thisFont.stroke();
	                        i = i - 0.1;
	                    }
	                } else {
	                    clearInterval(e);
	                    defaultFont();
	                }
	            }
	            function over(){
	                clearInterval(e);
	                c = setInterval(start, 1);
	            }
	            function out(){
	                clearInterval(c);
	                e = setInterval(end, 1);
	            }
	            function ready(){
	                if (document.readyState === 'complete') {
	                    clearInterval(r);
	                    canvas.addEventListener('mouseover', over);
	                    canvas.addEventListener('mouseout', out);
	                }
	            }
	            var r = setInterval(ready,1)
	        }
	    }
	    //fonts.edit(body,2,'red');
	};
	module.exports = fonts;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var create = __webpack_require__(5);
	var ajax = __webpack_require__(6);
	var adminContentControl = {
	    getArticleList: function() {
	        var select;
	        var currentPage;
	        var tag = undefined;
	        var itemNum = 20;
	        if (location.hash.match(/#[0-9]+/) !== null) {
	            var currentPage = parseInt(location.hash.match(/#[0-9]+/)[0].slice(1));
	        } else {
	            location.hash += '#1';
	        }
	        ajax.getArticleList(itemNum, currentPage, tag, articleListCallBack);
	    },
	    getArticle: function() {
	        var num = parseInt(location.hash.match(/#[^#]+/g)[1].slice(1));
	        var form = document.getElementsByTagName('form')[0];
	        var node = document.createElement("input");
	        var id = document.createElement("input");
	        node.name  = 'exist';
	        node.value = 'true';
	        node.style.display = 'none';
	        id.name = 'id';
	        id.value = num;
	        id.style.display = 'none';
	        form.appendChild(node.cloneNode());
	        form.appendChild(id.cloneNode());
	        console.log(node);
	        ajax.getOneArticle(num, articleCallBack);
	    },
	    init: function() {
	        window.addEventListener('hashchange', function() {
	            var thisHash = location.hash.match(/#[^#]+/g);
	            //var contentList = document.getElementsByClassName('content-articles')[0];
	            if (thisHash !== null) {
	                if (thisHash[0] === '#articles') {
	                    adminContentControl.getArticleList();
	                } else if(thisHash[0] === '#write' && thisHash.length === 2) {
	                    
	                    adminContentControl.getArticle();
	                    
	                }
	            }
	        });
	    }
	}
	module.exports = adminContentControl;
	function articleListCallBack(data) {
	    console.log(data);
	    var articleList = data.list;
	    var prevBtn = document.getElementsByClassName('admin-prev-btn')[0];
	    var nextBtn = document.getElementsByClassName('admin-next-btn')[0];
	    var currentPage = location.hash.match(/#[0-9]+/)[0].slice(1);
	    var content = document.getElementsByTagName('tbody')[0];
	    for (var i = 0; i < articleList.length; i++) {
	        var j = i;
	        var thisItem = new create.tableItem();
	        thisItem._fill(data.list[j]);
	        var doc = data.list[j].id;
	        console.log(doc);
	        thisItem._delete().addEventListener('click', function(){
	            var tbody = document.getElementsByTagName('tbody')[0];
	            var thisLine = event.target.parentElement.parentElement;
	            tbody.removeChild(thisLine);
	            ajax.deleteArt(doc);
	        });
	        thisItem._edit().setAttribute('href', '#write#' + doc)
	        content.appendChild(thisItem._item);
	    }
	    if( 20*currentPage < data.total ) {
	        var next = location.hash.replace(/#[0-9]+/, '#' + (parseInt(currentPage) + 1));
	        nextBtn.setAttribute('href', next);
	        nextBtn.className = 'admin-next-btn';
	    } else {
	        nextBtn.setAttribute('href', location.hash);
	        nextBtn.className = 'admin-next-btn prevent-btn';
	    }
	    if (parseInt(currentPage) === 1) {
	        prevBtn.setAttribute('href', location.hash);
	        prevBtn.className = 'admin-prev-btn prevent-btn';
	    } else {
	        var prev = location.hash.replace(/#[0-9]+/, '#' + (parseInt(currentPage) - 1));
	        prevBtn.setAttribute('href', prev);
	        prevBtn.className = 'admin-prev-btn';
	    }
	}

	function articleCallBack(data) {
	    console.log(data);
	    var title = document.getElementsByTagName('INPUT')[0];
	    var tag = document.getElementsByTagName('INPUT')[1];
	    var main = document.getElementsByTagName('TEXTAREA')[0];
	    title.value = data.title;
	    tag.value = data.tag;
	    main.value = data.main;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	var create = {
	    tableItem: function() {
	        var tableTr = document.createElement('TR');
	        var tableDate = document.createElement('TD');
	        var tableTitle = document.createElement('TD');
	        var tableTag = document.createElement('TD');
	        var tableEdit = document.createElement('TD');
	        var tableDelete = document.createElement('TD');
	        var editBtn = document.createElement('A'); 
	        var deleteBtn = document.createElement('A');
	        tableTr.appendChild(tableDate);
	        tableTr.appendChild(tableTitle);
	        tableTr.appendChild(tableTag);
	        tableTr.appendChild(tableEdit);
	        tableTr.appendChild(tableDelete);
	        tableEdit.appendChild(editBtn);
	        tableDelete.appendChild(deleteBtn);
	        editBtn.innerText = '修改';
	        deleteBtn.innerText = '删除';
	        this._item = tableTr;
	        this._fill = function(obj) {
	            tableDate.innerText = obj.date;
	            tableTitle.innerText = obj.title;
	            tableTag.innerText = obj.tag;
	        }
	        this._edit = function() {
	            return editBtn;
	        }
	        this._delete = function() {
	            return deleteBtn;
	        }
	    }
	}
	module.exports = create;

/***/ },
/* 6 */
/***/ function(module, exports) {

	function AJAX(method, URL, async, type, callback) {
	    console.log(URL);
	    var xml = new XMLHttpRequest();
	    xml.open(method, URL, async);
	    xml.responseType = type;
	    xml.onreadystatechange = function() {
	        if (xml.readyState==4 && xml.status==200){
	            var getRes = xml.response;
	            callback(getRes);
	        }
	    };
	    xml.send();
	}
	var ajaxReq = {
	    getArticleList: function(itemNum, page, tag, callback) {
	        var url = '/ajax?itemNum=' + itemNum;
	        console.log(url);
	        /*jshint -W030 */
	        tag ? url = url + '&&tag=' + tag + '&&page=' + page : url = url + '&&page=' + page;
	        AJAX('GET', url, true, 'json', function(data){
	            callback(data);
	        });
	    },
	    getOneArticle: function(ArtId, callback) {
	        var url = '/ajax?id=' + ArtId;
	        AJAX('GET', url, true, 'json', function(data){
	            callback(data);
	        });
	    },
	    getTags: function(callback) {
	        var url = '/ajax?tags=All';
	        AJAX('GET', url, true, 'json', function(data){
	            callback(data);
	        });
	    },
	    deleteArt: function(ArtId) {
	        var url = '/ajax?delete=true&&id=' + ArtId;
	        AJAX('GET', url, true, 'json', function(data){
	        });
	    }
	};
	module.exports = ajaxReq;


/***/ }
/******/ ]);