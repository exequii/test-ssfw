function NDCReceipt(receiptdata, hasGS){
	var _noPrintable = "8";
	var NL = /\n/g;

	if(hasGS){
		this.Printable = _noPrintable != receiptdata[0];
		this.Content = receiptdata.substring(1);
	}else{
		this.Printable = true;
		this.Content = receiptdata;
	}
	
	this.getLines = function(preprocess){
		return typeof preprocess === "function" ? preprocess(this.Content).split(NL) : this.Content.split(NL);
	}
	this.toString = function(){
		return this.Content;
	}
}

function NDCTicket(receiptdata){
	var GS = /\x1D/g;

	this.ReceiptGroups = new Array();
	var _hasGS = true;
	for (var _i = 0, _arr = receiptdata.split(GS); _i < _arr.length; _i++) {
		if(_arr[_i].length === 0){ 
			continue;
		}else{
			if(_i === 0){
				_hasGS = false;
			}
		}
		this.ReceiptGroups.push( new NDCReceipt(_arr[_i], _hasGS ));
		_hasGS = true;
	}

	this.getPrinteableGroups = function(){
		return this.ReceiptGroups.filter(function(receipt){ return receipt.Printable });
	}
	this.toString = function(){
		return this.getPrinteableGroups().reduce(function(strticket, receipt){
			return strticket.length === 0 ? strticket + receipt.Content : strticket + "\n" + receipt.Content;
		}, "");
	}
	this.getPrintableCleanedReceipt = function(newChar = " "){
		return this.getPrinteableGroups().reduce(function(strticket, receipt){
			return strticket.length === 0 ? strticket + NDCReceipt.convertControlSpaceTo(receipt.Content, newChar) : strticket + "\n" + NDCReceipt.convertControlSpaceTo(receipt.Content, newChar);
		}, "");
	}
	this.getPrinteableReceiptLines = function(newChar = " ", pattern = null){
		return this.getPrinteableGroups().reduce(function(lines, receipt){
			return lines.concat(receipt.getLines(function(content){
				return NDCReceipt.convertControlSpaceTo(content, newChar, pattern);
			}));
		}, []);
	}
}

function NDCTicketCollection(receiptdata){
	var _seek = 0;
	var FF = /\x0C/g;

	this.Tickets = new Array();

	for (var _i = 0, _arr = receiptdata.split(FF); _i < _arr.length; _i++) {
		if(_arr[_i].length === 0){ continue; }
		this.Tickets.push( new NDCTicket(_arr[_i]));
	}
	
	this.toVCReceiptBlocks = function(){
		return this.Tickets.map(function(ticket){ 
			return ticket.getPrintableCleanedReceipt();
		});
	}
	this.toNDCReceiptBlocks = function(){
		return this.Tickets.map(function(ticket){
			return ticket.toString();
		});
	}
}

NDCReceipt.getReceiptDataFromTReply = function(msgtreply){
	var _syntaxNDCTRply = /^4\x1C/;
	var _receiptField = 6;
	var _offsetChars = 3;
	var FS = /\x1C/g;

	if(!_syntaxNDCTRply.test(msgtreply)){
		throw new SyntaxError("The Message isn't a Transaction Reply Message syntactically acceptable.");
	}

	msgtreply = msgtreply.split(FS);
	if(msgtreply[_receiptField].trim().length !== 0){
		return msgtreply[_receiptField].substring(_offsetChars);
	}
}
NDCReceipt.NDCSpaceCChar = /\x0E(\d|(:|;|<|=|>|\?))| /g;

NDCReceipt.convertControlSpaceTo = function(receiptdata, newChar, pattern){
	var CtrolChar = pattern || NDCReceipt.NDCSpaceCChar;
	var ASCIICtrolChar = 48;

	return receiptdata.replace(CtrolChar, function(cchar){
		return cchar.length >= 2 ? (newChar).repeat(cchar[1].charCodeAt() - ASCIICtrolChar ) : newChar;
	});
}

var TicketCache = {
	Cache:null,
	BufferVarName:"BUFFER.TICKET.UMOV",
	addTicketToBuffer(receiptdata){
		var bufferTicket = Vars.get(this.BufferVarName, "");
		bufferTicket += NDCReceipt.getReceiptDataFromTReply(msg);
		Vars.set(this.BufferVarName, bufferTicket);
	},
	addTicketToCache(receiptdata){
		this.Cache = new NDCTicketCollection(receiptdata);
	},
	hasCache(){
		return this.Cache != null;
	},
	isCacheEmpty(){
		return this.Cache.Tickets.length === 0;
	},
	getCurrentTicket(){
		return this.Cache.Tickets.shift();
	},
	clear(){
		this.Cache = null;
		Vars.remove(this.BufferVarName);
	},
	parseToHTMLFormat(callback){
		return this.getCurrentTicket().getPrinteableGroups().reduce(function(lines, group){
			return lines.concat(group.getLines().map(function(line){
				var keepLine = callback(line);
				return line.length === 0 ? "&nbsp" : keepLine ? NDCReceipt.convertControlSpaceTo(line, "&nbsp") : "";
			}));
		}, []);
	}
}

States.StateTypes["XFSReceiptConfig"] = function(statedata){
	if(!TicketCache.hasCache()){
		var bufferTicket = Vars.get(TicketCache.BufferVarName, "");
		TicketCache.addTicketToCache(bufferTicket);
	}
	
	if(!TicketCache.isCacheEmpty()){
		statedata.ndcreceipt([TicketCache.Cache.Tickets[0].toString()]);
		States.handleEvent("ev_ssfw_print_receipt");
	}else{
		States.handleEvent("ev_ssfw_end_print");
	}
}