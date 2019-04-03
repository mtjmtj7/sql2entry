	layui.use(['element', 'layer'], function(){
	  var element = layui.element;
	  var layer = layui.layer;
	  var $ = layui.jquery;
	  
	  $(document).ready(function(){
	  	 function getType(str) {
	        str = str.toLowerCase();
	        if (str.indexOf("varchar") != -1) {
	            return "String";
	        } else if (str.indexOf("number") != -1 || str.indexOf("int") != -1) {
	            return "int";
	        } else if (str.indexOf("blob") != -1) {
	            return "InputStream";
	        } else if (str.indexOf("long") != -1) {
	            return "long";
	        } else if (str.indexOf("decimal") != -1 || str.indexOf("numeric") != -1) {
	            return "double";
	        } else {
	            return str;
	        }
	    }
	
	
	    function encode() {
	        var sqls = $("#input").val();
	        sql = sqls.replace(/\n/ig, "");
	        sql = sql.replace(/create table ([^\\(]+)+\((.*)\)/ig, '$1##$2');
	        sql = sql.split("##");
	        var tn = sql[0].trim();
	        sql = sql[1];
	        var strs = sql.split(",");
	        var a = new Array(strs.length);
	        var html = "";
	        $(strs).each(function (i) {
	            if (this.toString().trim() != "") {
	                var aa = this.toString().trim().split(/\s+/g)
	                field = aa[0];
	                type = aa[1];
	                if( getType(type)!='key'){
	                    html += "private " + getType(type) + " " + field + ";\r\n";
	                }
	            }
	
	        });
	        var reg = new RegExp(/`/, "g")
	        html = html.replace(reg, '');
	        $("#result").val(html);
	    }
	    function copy(){
	    	var txt = $("#result");
	    	txt.select();
	    	document.execCommand("Copy")
	    }
	    
	    
	    $("#btn").click(function(){
	    	encode();
	    	layer.msg("转换成功！");
	    });
	    $("#copy").click(function(){
	    	copy();
	    	layer.msg("复制成功！");
	    });
	  });
	  
	  
	});