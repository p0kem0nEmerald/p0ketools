_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[21],{"6fQO":function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tools/poke-english",function(){return n("bbTE")}])},"V+Ef":function(e,t,n){"use strict";var o=n("rePB"),r=n("jfJP");function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){Object(o.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var a={defaultFontStyle:c(c({},r.h),{},{fontSize:"14px"}),defaultHeaderMargins:{marginTop:"20px",marginBottom:"10px"},quote:{padding:"10px 20px",margin:"0 0 20px",fontSize:"17.5px",borderLeft:"5px solid "+r.j[10]},quoteText:{margin:"0 0 10px",fontStyle:"italic"},quoteAuthor:{display:"block",fontSize:"80%",lineHeight:"1.42857143",color:r.j[1]},mutedText:{color:r.j[1]},primaryText:{color:r.p[0]},infoText:{color:r.m[0]},successText:{color:r.t[0]},warningText:{color:r.x[0]},dangerText:{color:r.e[0]}};t.a=a},bbTE:function(e,t,n){"use strict";n.r(t),n.d(t,"__N_SSG",(function(){return y}));var o=n("nKUr"),r=n("ODXe"),i=n("q1tI"),c=n.n(i),a=n("R/WZ"),s=n("i6E2"),l=n("i4t8"),p=n("mtPR"),j=n("um8N"),m=n("Y8cl"),d=n("A2So"),x=n("2zww"),b=n("UsYt"),u=n("V+Ef");function f(e){var t=Object(a.a)(u.a)(),n=e.children;return Object(o.jsx)("div",{className:t.defaultFontStyle+" "+t.dangerText,children:n})}var h=n("ofer"),O={cardCategoryWhite:{"&,& a,& a:hover,& a:focus":{color:"rgba(255,255,255,.62)",margin:"0",fontSize:"14px",marginTop:"0",marginBottom:"0"},"& a,& a:hover,& a:focus":{color:"#FFFFFF"}},cardTitleWhite:{color:"#FFFFFF",marginTop:"0px",minHeight:"auto",fontWeight:"300",fontFamily:"'Roboto', 'Helvetica', 'Arial', sans-serif",marginBottom:"3px",textDecoration:"none","& small":{color:"#777",fontSize:"65%",fontWeight:"400",lineHeight:"1"}}};function g(e){var t=e.data,n=Object(a.a)(O)(),i=c.a.useState({no:1,name:"",img:{sprite_front:Array(2).fill(""),sprite_back:Array(2).fill(""),icon:Array(1).fill("")},etymology:"",description:""}),s=Object(r.a)(i,2),u=s[0],g=s[1],y=c.a.useState([]),k=Object(r.a)(y,2),P=k[0],S=k[1],v=function(e){if(e in p0ke.data.pokemon){var n=p0ke.data.pokemon[e],o=n.no;p0ke.utils.canonicalizePokeName(e)in t&&g({no:o,name:e,img:{sprite_front:[!1,!0].map((function(t){return p0ke.img.getImgSrcPokemonSprites(e,"front",t)})),sprite_back:[!1,!0].map((function(t){return p0ke.img.getImgSrcPokemonSprites(e,"back",t)})),icon:[p0ke.img.getImgSrcPokemonIcon(e)]},en:n.en,etymology:t[e].etymology,description:t[e].description})}};return c.a.useEffect((function(){var e=Object.keys(p0ke.data.pokemon);S(e),v(p0ke.utils.randomSelect(e))}),[]),Object(o.jsxs)(o.Fragment,{children:[Object(o.jsx)(f,{children:Object(o.jsxs)(h.a,{children:["\u203b \u3053\u306e\u30da\u30fc\u30b8\u306b\u66f8\u304b\u308c\u3066\u3044\u308b\u5185\u5bb9\u306f\u3001",Object(o.jsx)("a",{href:"https://pokemon-english-dictionary.com/",children:"\u300c\u30dd\u30b1\u30e2\u30f3\u82f1\u8a9e\u8a9e\u6e90\u8f9e\u5178\u300d"}),"\u3055\u3093\u306e\u30b5\u30a4\u30c8\u304b\u3089\u53d6\u5f97\u3057\u3066\u3044\u307e\u3059\u3002"]})}),Object(o.jsxs)(p.a,{children:[Object(o.jsx)(l.a,{xs:12,lg:5,children:Object(o.jsxs)(d.a,{children:[Object(o.jsx)(x.a,{color:"dark",children:Object(o.jsx)("h4",{className:n.cardTitleWhite,children:"Pok\xe9mon"})}),Object(o.jsx)(b.a,{children:Object(o.jsxs)(p.a,{children:[Object(o.jsx)(l.a,{xs:2,children:Object(o.jsx)(j.a,{labelText:"No",formControlProps:{fullWidth:!0},inputProps:{type:"number",value:u.no,onChange:function(e){v(p0ke.data.no2poke[Math.max(1,Math.min(e.target.value,386))])},inputProps:{min:1,max:386}}})}),Object(o.jsx)(l.a,{xs:4,children:Object(o.jsx)(m.a,{labelText:"PokeName",formControlProps:{fullWidth:!0},optionData:P,autocompleteProps:{onChange:function(e,t){v(t)},value:u.name}})}),Object.keys(u.img).map((function(e){return Object(o.jsx)(l.a,{xs:2,children:Object(o.jsx)(p.a,{xs:2,children:u.img[e].map((function(e){return Object(o.jsx)(l.a,{xs:2,children:Object(o.jsx)("img",{src:e,width:"50px",height:"50px"})})}))})})}))]})})]})}),Object(o.jsx)(l.a,{xs:12,lg:7,children:Object(o.jsxs)(d.a,{children:[Object(o.jsx)(x.a,{color:"dark",children:Object(o.jsxs)("h4",{className:n.cardTitleWhite,children:[u.en," = ",u.etymology]})}),Object(o.jsx)(b.a,{children:Object(o.jsxs)(p.a,{xs:12,children:[Object(o.jsx)(l.a,{xs:1}),Object(o.jsx)(l.a,{xs:10,children:Object(o.jsxs)(p.a,{xs:12,children:[u.description," \uff08\u5f15\u7528\uff1a",Object(o.jsx)("a",{href:"https://pokemon-english-dictionary.com/",children:"\u300c\u30dd\u30b1\u30e2\u30f3\u82f1\u8a9e\u8a9e\u6e90\u8f9e\u5178\u300d"}),"\uff09"]})})]})})]})})]})]})}g.layout=s.a;var y=!0;t.default=g}},[["6fQO",0,2,8,9,6,7,10,1,3,5,11,4]]]);