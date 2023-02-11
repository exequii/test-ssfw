var vghelper = {
	buildList:function (array) {
		//array = [[texto,evento,opcion],[texto,evento,opcion]]	
		var listable = [];
		for (var i = 0 ; i < array.length ; i++) {									            
			listable.push({
        	 	"text":array[i][0],
        	 	"event":array[i][1],
        	 	"option":array[i][2]
        	}) ;
		}
		return listable
	}
}