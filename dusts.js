(function(){dust.register("device_list",body_0);function body_0(chk,ctx){return chk.write("<ul>").section(ctx.get(["devices"], false),ctx,{"block":body_1},{}).write("</ul>");}function body_1(chk,ctx){return chk.write("<li><a href=\"/devices/").reference(ctx.getPath(true, ["id"]),ctx,"h").write("\">").reference(ctx.getPath(true, ["name"]),ctx,"h").write("</a></li>");}return body_0;})();
(function(){dust.register("edit_device",body_0);function body_0(chk,ctx){return chk.write("<div><label for=\"name\">Name</label><input id=\"name\" type=\"text\" value=\"").reference(ctx.get(["name"], false),ctx,"h").write("\"></div><div><label for=\"price\">Price</label><input id=\"price\" type=\"text\" value=\"").reference(ctx.get(["price"], false),ctx,"h").write("\"></div><button id=\"save-device\">Save Device</button>");}return body_0;})();
(function(){dust.register("friends",body_0);function body_0(chk,ctx){return chk.write("<div><input type=\"text\" id=\"searchFriends\" placeholder=\"search friends\"></div><ul>").section(ctx.get(["data"], false),ctx,{"block":body_1},{}).write("</ul>");}function body_1(chk,ctx){return chk.write("<li id=\"").reference(ctx.getPath(true, ["id"]),ctx,"h").write("\"><a href=\"/friends/").reference(ctx.getPath(true, ["id"]),ctx,"h").write("\">").reference(ctx.getPath(true, ["display_name"]),ctx,"h").write("</a></li>");}return body_0;})();
(function(){dust.register("single_device",body_0);function body_0(chk,ctx){return chk.write("<div><label for=\"name\">Name</label>").reference(ctx.get(["name"], false),ctx,"h").write("</div><div><label for=\"price\">Price</label>").reference(ctx.get(["price"], false),ctx,"h").write("</div><br><button id=\"payNow\">pay now</button>");}return body_0;})();
(function(){dust.register("single_friend",body_0);function body_0(chk,ctx){return chk.write("<div>").reference(ctx.get(["display_name"], false),ctx,"h").write("</div><ul>").section(ctx.get(["devices"], false),ctx,{"block":body_1},{}).write("</ul>");}function body_1(chk,ctx){return chk.write("<li><a href=\"/devices/").reference(ctx.getPath(true, ["_id"]),ctx,"h").write("\">").reference(ctx.getPath(true, ["name"]),ctx,"h").write("</a></li>");}return body_0;})();
(function(){dust.register("welcome",body_0);function body_0(chk,ctx){return chk.write("<div><a href=\"/devices\"><button id=\"start-devices\">Search Devices</button></a></div><div><a href=\"/friends\"><button id=\"start-friends\">Search Friends</button></a></div><div><a href=\"/devices/new\"><button>Upload Device</button></a></div>").section(ctx.get(["devices"], false),ctx,{"block":body_1},{});}function body_1(chk,ctx){return chk.write("<span>").reference(ctx.getPath(true, ["name"]),ctx,"h").write(" </span>");}return body_0;})();