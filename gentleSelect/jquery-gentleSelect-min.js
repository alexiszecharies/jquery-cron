(function(d){var c={minWidth:100,itemWidth:undefined,columns:undefined,rows:undefined,title:undefined,prompt:"Make A Selection",maxDisplay:0,openSpeed:400,closeSpeed:400,openEffect:"slide",closeEffect:"slide",disallowEmpty:false,hideOnMouseOut:true};function b(j){if(typeof j=="undefined"){return false}else{return true}}function g(k,j){if(b(j.columns)&&b(j.rows)){d.error("gentleSelect: You cannot supply both 'rows' and 'columns'");return true}if(b(j.columns)&&!b(j.itemWidth)){d.error("gentleSelect: itemWidth must be supplied if 'columns' is specified");return true}if(b(j.rows)&&!b(j.itemWidth)){d.error("gentleSelect: itemWidth must be supplied if 'rows' is specified");return true}if(!b(j.openSpeed)||typeof j.openSpeed!="number"&&(typeof j.openSpeed=="string"&&(j.openSpeed!="slow"&&j.openSpeed!="fast"))){d.error('gentleSelect: openSpeed must be an integer or "slow" or "fast"');return true}if(!b(j.closeSpeed)||typeof j.closeSpeed!="number"&&(typeof j.closeSpeed=="string"&&(j.closeSpeed!="slow"&&j.closeSpeed!="fast"))){d.error('gentleSelect: closeSpeed must be an integer or "slow" or "fast"');return true}if(!b(j.openEffect)||(j.openEffect!="fade"&&j.openEffect!="slide")){d.error("gentleSelect: openEffect must be either 'fade' or 'slide'!");return true}if(!b(j.closeEffect)||(j.closeEffect!="fade"&&j.closeEffect!="slide")){d.error("gentleSelect: closeEffect must be either 'fade' or 'slide'!");return true}if(!b(j.hideOnMouseOut)||(typeof j.hideOnMouseOut!="boolean")){d.error('gentleSelect: hideOnMouseOut must be supplied and either "true" or "false"!');return true}return false}function h(k,j){if(k.attr("multiple")){j.hideOnMouseOut=true}}function f(k,l){if(k.length<1){return l.prompt}if(l.maxDisplay!=0&&k.length>l.maxDisplay){var j=k.slice(0,l.maxDisplay).map(function(){return d(this).text()});j.push("...")}else{var j=k.map(function(){return d(this).text()})}return j.get().join(", ")}function i(m,l){var m=d(m);if(m.attr("multiple")&&l.disallowEmpty){var k=m.data("dialog").find("li"),j=k.filter(".selected");k.removeClass("sole-selected");if(j.length==1){j.addClass("sole-selected")}}}var a={init:function(x){var l=d.extend({},c,x),n=this.find("option");if(g(this,l)){return this}h(this,l);this.hide();if(this.attr("multiple")&&l.disallowEmpty){if(n.length==0){d.error("gentleSelect: disallowEmpty conflicts with empty <select>")}if(this[0].selectedIndex<0){this[0].selectedIndex=0}}label_text=f(this.find(":selected"),l);var u=d("<span class='gentleselect-label'>"+label_text+"</span>").insertBefore(this).bind("mouseenter.gentleselect",e.labelHoverIn).bind("mouseleave.gentleselect",e.labelHoverOut).bind("click.gentleselect",e.labelClick).data("root",this);this.data("label",u).data("options",l);var q=d("<ul></ul>");n.each(function(){var o=d("<li>"+d(this).text()+"</li>").data("value",d(this).attr("value")).data("name",d(this).text()).appendTo(q);if(d(this).attr("selected")){o.addClass("selected")}});var r=d("<div class='gentleselect-dialog'></div>").append(q).insertAfter(u).bind("click.gentleselect",e.dialogClick).bind("mouseleave.gentleselect",e.dialogHoverOut).data("label",u).data("root",this);this.data("dialog",r);if(b(l.columns)||b(l.rows)){q.css("float","left").find("li").width(l.itemWidth).css("float","left");var p=q.find("li:first");var k=l.itemWidth+parseInt(p.css("padding-left"))+parseInt(p.css("padding-right"));var t=q.find("li").length;if(b(l.columns)){var s=parseInt(l.columns);var w=Math.ceil(t/s)}else{var w=parseInt(l.rows);var s=Math.ceil(t/w)}r.width(k*s);for(var m=0;m<(w*s)-t;m++){d("<li style='float:left' class='gentleselect-dummy'><span>&nbsp;</span></li>").appendTo(q)}var j=[];var v=0;q.find("li").each(function(){if(v<w){j[v]=d(this)}else{var o=v%w;d(this).insertAfter(j[o]);j[o]=d(this)}v++})}else{if(typeof l.minWidth=="number"){r.css("min-width",l.minWidth)}}if(b(l.title)){d("<div class='gentleselect-title'>"+l.title+"</div>").prependTo(r)}d(document).bind("keyup.gentleselect",e.keyUp);i(this,l);return this},update:function(){var l=this.data("options");var j=(this.attr("multiple"))?this.val():[this.val()];d("li",this.data("dialog")).each(function(){var n=d(this);var m=(d.inArray(n.data("value"),j)!=-1);n.toggleClass("selected",m)});var k=f(this.find(":selected"),l);this.data("label").text(k);i(this,l);return this}};var e={labelHoverIn:function(){d(this).addClass("gentleselect-label-highlight")},labelHoverOut:function(){d(this).removeClass("gentleselect-label-highlight")},labelClick:function(){var m=d(this);var n=m.position();var j=m.data("root");var l=j.data("options");var k=j.data("dialog").css("top",n.top+m.height()).css("left",n.left+1);if(l.openEffect=="fade"){k.fadeIn(l.openSpeed)}else{k.slideDown(l.openSpeed)}},dialogHoverOut:function(){var j=d(this);if(j.data("root").data("options").hideOnMouseOut){j.hide()}},dialogClick:function(l){var n=d(l.target);var m=d(this);var o=m.data("root");var j=o.data("options");if(!o.attr("multiple")){if(j.closeEffect=="fade"){m.fadeOut(j.closeSpeed)}else{m.slideUp(j.closeSpeed)}}if(n.is("li")&&!n.hasClass("gentleselect-dummy")){var q=n.data("value");var k=n.data("name");var p=m.data("label");if(m.data("root").attr("multiple")){if(j.disallowEmpty&&n.hasClass("selected")&&(o.find(":selected").length==1)){return}n.toggleClass("selected");var t=m.find("li.selected");p.text(f(t,j));var r=t.map(function(){return d(this).data("value")});o.val(r.get()).trigger("change");i(o,j)}else{m.find("li.selected").removeClass("selected");n.addClass("selected");p.text(n.data("name"));o.val(q).trigger("change")}}},keyUp:function(j){if(j.keyCode==27){d(".gentleselect-dialog").hide()}}};d.fn.gentleSelect=function(j){if(a[j]){return a[j].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof j==="object"||!j){return a.init.apply(this,arguments)}else{d.error("Method "+j+" does not exist on jQuery.gentleSelect")}}}})(jQuery);