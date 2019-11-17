import * as L from 'leaflet';
<% if (baseClass != "none") {%>
L.<%= baseClass %>.<%= mainClass %> = L.<%= baseClass %>.extend({
    options: {

    },
    initialize: function (options) {
        L.Util.setOptions(this, options);
        
    }
})
export default L.<%= baseClass %>.<%= mainClass %>
<% }else {%>
const <%= mainClass %> = L.Class.extend({
    options: {
    },
    initialize: function (options) {
        L.Util.setOptions(this, options);
    }
});
export default <%= mainClass %>
<% } %>