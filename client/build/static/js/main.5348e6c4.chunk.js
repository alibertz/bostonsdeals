(this.webpackJsonpbostonsdeals=this.webpackJsonpbostonsdeals||[]).push([[0],{34:function(e,t,a){e.exports=a(61)},40:function(e,t,a){},61:function(e,t,a){"use strict";a.r(t);var n=a(2),o=a.n(n),s=a(22),i=a.n(s),r=a(5),l=a(32),c=(a(39),a(11)),d=a(12),u=a(14),h=a(13),m=a(15),p=a(26),g=a(17),y=a.n(g),f=a(62),v=(a(40),a(31));function E(){var e=Object(p.a)(["\n  query GET_POSTS($location: String, $dayOfWeek: String){\n    posts(location: $location dayOfWeek: $dayOfWeek) {\n      id\n      location\n      description\n      companyName\n    }\n  }\n"]);return E=function(){return e},e}var k=y()(E()),C=function(e){return o.a.createElement(f.a,{query:k,variables:{location:e.location,dayOfWeek:e.dayOfWeek}},(function(t){var a=t.loading,n=t.data;return!a&&o.a.createElement(o.a.Fragment,null,n.posts.length>0?o.a.createElement("h4",{id:"tagline"},e.location.length>0?n.posts.length+" d":"D","eal",n.posts.length>1&&"s"," ",e.location.length>0&&"in ",o.a.createElement("span",{className:"location"},e.location)," for ",e.dayOfWeek):o.a.createElement("h4",{id:"tagline"},"No results for '",e.location,"'. Try again?"),o.a.createElement("div",{id:"card-wrapper"},n.posts.map((function(e){return o.a.createElement(v.Spring,{from:{opacity:0,marginTop:-15},to:{opacity:1,marginTop:0}},(function(t){return o.a.createElement("div",{id:"card",style:t,key:e.id},o.a.createElement("div",{className:"info"},o.a.createElement("h2",{className:"description"},e.description),o.a.createElement("h3",{className:"companyName"},e.companyName),o.a.createElement("h4",{className:"location"},o.a.createElement("i",{className:"fas fa-map-marker-alt",style:{paddingRight:".5rem"}}),e.location),o.a.createElement("h4",{className:"address"},e.address)),o.a.createElement("div",{className:"directions"},o.a.createElement("i",{className:"fas fa-directions"})))}))}))))}))},S=a(18),O=a(21),b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).onTextChanged=function(e){var t=e.target.value,n=[];if(t.length>0){var o=new RegExp("^".concat(t),"i");n=a.items.sort().filter((function(e){return o.test(e)}))}a.props.onTextChanged(n,t),a.setState((function(){return{suggestions:n,text:t}}))},a.handleLocationSelect=function(e){a.setState((function(){return{text:e,suggestions:[]}}));a.props.onTextChanged([],e),a.props.handleSelect(e)},a.items=["North End","Cambridge","South End","Back Bay","Copley Square","Harvard Square","Financial District","Fenway/Kenmore","Somerville","Brighton","Davis Square","Allston","Beacon Hill","Chinatown","Bay Village","Downtown","West End","Roxbury","Dorchester","Roslindale","Mattapan","Hyde Park","West Roxbury","Jamaica Plain","Mission Hill","South Boston","Charlestown","East Boston","Mid Dorchester"],a.state={suggestions:[""],text:""},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"renderSuggestions",value:function(){var e=this,t=this.props.suggestions;return 0===t.length?null:o.a.createElement("ul",null,t.map((function(t){return o.a.createElement("li",{onClick:function(){return e.handleLocationSelect(t)}},o.a.createElement("i",{className:"fas fa-search"}),t)})))}},{key:"render",value:function(){var e,t=this.props.value;return o.a.createElement("div",{id:"locationSelector"},o.a.createElement("input",(e={type:"text",name:"location",onKeyPress:this.props.handleChange},Object(O.a)(e,"type","text"),Object(O.a)(e,"onChange",this.onTextChanged),Object(O.a)(e,"value",t),e)),this.renderSuggestions())}}]),t}(o.a.Component),w=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(h.a)(t).call(this,e))).state={value:"",predictions:[]},a.onChange=a.onChange.bind(Object(S.a)(a)),a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"getPredictions",value:function(e){return["Fenway/Kenmore","Back Bay","Brighton","North End","South End","Cambridge","Somerville","Financial District","Harvard Square","Copley Square"].filter((function(t){return-1!==t.toLowerCase().indexOf(e.toLowerCase())}))}},{key:"onChange",value:function(e){var t=this;clearTimeout(this.timeout);var a=e.target.value;this.setState({value:a}),a.length>0?this.timeout=setTimeout((function(){var e=t.getPredictions(a);t.setState({predictions:e})}),250):this.setState({predictions:[]})}},{key:"render",value:function(){return o.a.createElement("div",{id:"filterDeals"},o.a.createElement(b,{handleSelect:this.props.handleSelect,handleChange:this.props.handleChange,suggestions:this.props.suggestions,onTextChanged:this.props.onTextChanged,value:this.props.value}),o.a.createElement("div",{id:"dayOfWeekSelector",className:"dropdown show"},o.a.createElement("a",{className:"btn btn-secondary dropdown-toggle",role:"button",id:"dropdownMenuLink","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",onKeyPress:this.props.setPosts},this.props.dayOfWeek),o.a.createElement("div",{name:"dayOfWeek",className:"dropdown-menu","aria-labelledby":"dropdownMenuLink"},o.a.createElement("option",{className:"dropdown-item",onClick:this.props.handleDayChange,name:"dayOfWeek",value:"Sunday"},"Sunday"),o.a.createElement("option",{className:"dropdown-item",onClick:this.props.handleDayChange,name:"dayOfWeek",value:"Monday"},"Monday"),o.a.createElement("option",{className:"dropdown-item",onClick:this.props.handleDayChange,name:"dayOfWeek",value:"Tuesday"},"Tuesday"),o.a.createElement("option",{className:"dropdown-item",onClick:this.props.handleDayChange,name:"dayOfWeek",value:"Wednesday"},"Wednesday"),o.a.createElement("option",{className:"dropdown-item",onClick:this.props.handleDayChange,name:"dayOfWeek",value:"Thursday"},"Thursday"),o.a.createElement("option",{className:"dropdown-item",onClick:this.props.handleDayChange,name:"dayOfWeek",value:"Friday"},"Friday"),o.a.createElement("option",{className:"dropdown-item",onClick:this.props.handleDayChange,name:"dayOfWeek",value:"Saturday"},"Saturday"))))}}]),t}(n.Component),N=function(){return o.a.createElement("footer",null,o.a.createElement("div",{className:"footer"},o.a.createElement("h5",null,"BOSTONS DEALS")))},W=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][(new Date).getDay()],T=function(e){function t(){var e,a;Object(c.a)(this,t);for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return(a=Object(u.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={location:"",dayOfWeek:W,posts:[],suggestions:[],value:""},a.posts=[],a.handleChange=function(e){if("Enter"===e.key){var t=a.state.suggestions[0];void 0===t&&(t=e.target.value),a.setState({value:t,location:t}),a.setState({suggestions:[]}),void 0===t&&(t=e.target.value),a.setState({value:a.state.suggestions[0],location:t}),a.setState({suggestions:[]},console.log(t))}},a.handleSelect=function(e){a.setState({location:e})},a}return Object(m.a)(t,e),Object(d.a)(t,[{key:"handleDayChange",value:function(e){this.setState({dayOfWeek:e.target.value})}},{key:"onTextChanged",value:function(e,t,a){this.setState({suggestions:e,value:t})}},{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement("main",{className:"bg-img"},o.a.createElement("h1",{className:"header",id:"header"},"Boston's Deals"),o.a.createElement(w,{handleDayChange:this.handleDayChange.bind(this),handleChange:this.handleChange.bind(this),dayOfWeek:this.state.dayOfWeek,location:this.state.location,posts:this.posts,handleSelect:this.handleSelect.bind(this),suggestions:this.state.suggestions,onTextChanged:this.onTextChanged.bind(this),value:this.state.value}),o.a.createElement(C,{dayOfWeek:this.state.dayOfWeek,location:this.state.location,posts:this.state.posts})),o.a.createElement(N,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D=new l.a({uri:"http://localhost:4000/graphql"});i.a.render(o.a.createElement(r.a,{client:D},o.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[34,1,2]]]);
//# sourceMappingURL=main.5348e6c4.chunk.js.map