(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{2554:(e,t,s)=>{Promise.resolve().then(s.bind(s,6308))},6308:(e,t,s)=>{"use strict";s.d(t,{default:()=>F});var a=s(5155),r=s(2115),l=s(5695),n=s(1024),c=s(7072),i=s(8207),o=s(2936),d=s(9053),x=s(3261),m=s(6609),h=s(1476),g=s(790),p=s(994),u=s(1734),j=s(2970),y=s(7694),b=s(8283),f=s(6462),N=s(1626),v=s(4999),w=s(6148),k=s(9271),A=s(4081),S=s(7725),C=s(2104),L=s(2651),P=s(1649),D=s(6889),I=s(1902),M=s(1719);let E=e=>{let{isDarkMode:t}=e,[s,l]=(0,r.useState)([]),[n,c]=(0,r.useState)(!0),[i,o]=(0,r.useState)(null),[d,x]=(0,r.useState)(!1),[m,h]=(0,r.useState)(3);if((0,r.useEffect)(()=>{(async()=>{try{var e,t;let s;let a=JSON.parse(localStorage.getItem("visitorLog")||"[]");try{let e=await L.A.get("https://ipwho.is/",{timeout:8e3,headers:{Accept:"application/json"}});if(e.data.success)s=e.data;else throw Error("IP API request failed")}catch(e){if(console.error("Error fetching IP data:",e),a.length>0){l(a),c(!1);return}throw e}let r=[{ip:s.ip,country:s.country,city:s.city,region:s.region,timezone:(null===(e=s.timezone)||void 0===e?void 0:e.utc)||(null===(t=s.timezone)||void 0===t?void 0:t.id)||"Unknown",os:navigator.userAgent.match(/Windows|Mac OS X|Linux|Android|iOS/)[0],browser:navigator.userAgent.match(/Chrome|Firefox|Safari|Edge|Opera/)[0],timestamp:Date.now()},...a].slice(0,100);localStorage.setItem("visitorLog",JSON.stringify(r)),l(r),c(!1)}catch(e){console.error("Error in visitor logging:",e);try{let e=JSON.parse(localStorage.getItem("visitorLog")||"[]");e.length>0?l(e):o("Unable to load visitor data")}catch(e){o("Unable to load visitor data")}c(!1)}})()},[]),n)return(0,a.jsx)("div",{className:"h-[400px] bg-gray-800 rounded-lg flex items-center justify-center",children:(0,a.jsx)("div",{className:"text-yellow-500",children:"Loading visitor data..."})});if(i)return(0,a.jsx)("div",{className:"h-[400px] bg-gray-800 rounded-lg flex items-center justify-center",children:(0,a.jsx)("div",{className:"text-red-500",children:i})});let g=d?s.slice(0,m):s.slice(0,3);return(0,a.jsxs)("div",{className:"space-y-2 ".concat(t?"text-gray-300":"text-gray-700"),children:[(0,a.jsxs)("div",{className:"hidden sm:grid sm:grid-cols-7 gap-4 text-sm text-gray-500 px-4 py-2",children:[(0,a.jsx)("div",{children:"IP"}),(0,a.jsx)("div",{children:"Country"}),(0,a.jsx)("div",{children:"City"}),(0,a.jsx)("div",{children:"OS"}),(0,a.jsx)("div",{children:"Browser"}),(0,a.jsx)("div",{children:"Region"}),(0,a.jsx)("div",{children:"Last Visit"})]}),g.map((e,s)=>(0,a.jsxs)("div",{className:"".concat(t?"bg-gray-800/50":"bg-gray-300/50"," rounded-lg overflow-hidden"),children:[(0,a.jsxs)("div",{className:"sm:hidden p-4 space-y-2 text-sm ".concat(t?"text-gray-300":"text-gray-700"),children:[(0,a.jsxs)("div",{className:"flex justify-between items-center ".concat(t?"text-gray-400":"text-gray-600"),children:[(0,a.jsx)("div",{className:"font-medium",children:e.country}),(0,a.jsxs)("div",{className:"flex items-center space-x-1 text-xs",children:[(0,a.jsx)(D.A,{className:"w-3 h-3 flex-shrink-0"}),(0,a.jsxs)("span",{children:[(0,P.m)(e.timestamp)," ago"]})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-2 gap-2 text-xs",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("span",{className:"".concat(t?"text-gray-500":"text-gray-600"),children:"IP: "}),(0,a.jsx)("span",{className:"".concat(t?"text-gray-400":"text-gray-700"),children:e.ip})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("span",{className:"".concat(t?"text-gray-500":"text-gray-600"),children:"City: "}),(0,a.jsx)("span",{className:"".concat(t?"text-gray-400":"text-gray-700"),children:e.city})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("span",{className:"".concat(t?"text-gray-500":"text-gray-600"),children:"OS: "}),(0,a.jsx)("span",{className:"".concat(t?"text-gray-400":"text-gray-700"),children:e.os||"Unknown"})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("span",{className:"".concat(t?"text-gray-500":"text-gray-600"),children:"Browser: "}),(0,a.jsx)("span",{className:"".concat(t?"text-gray-400":"text-gray-700"),children:e.browser||"Unknown"})]}),(0,a.jsxs)("div",{className:"col-span-2",children:[(0,a.jsx)("span",{className:"".concat(t?"text-gray-500":"text-gray-600"),children:"Region: "}),(0,a.jsx)("span",{className:"".concat(t?"text-gray-400":"text-gray-700"),children:e.region})]})]})]}),(0,a.jsxs)("div",{className:"hidden sm:grid sm:grid-cols-7 gap-4 px-4 py-2 text-sm ".concat(t?"text-gray-400 hover:bg-gray-800/70":"text-gray-600 hover:bg-gray-200/70"),children:[(0,a.jsx)("div",{className:"truncate",children:e.ip}),(0,a.jsx)("div",{className:"truncate",children:e.country}),(0,a.jsx)("div",{className:"truncate",children:e.city}),(0,a.jsx)("div",{className:"truncate",children:e.os||"Unknown"}),(0,a.jsx)("div",{className:"truncate",children:e.browser||"Unknown"}),(0,a.jsx)("div",{className:"truncate",children:e.region}),(0,a.jsxs)("div",{className:"flex items-center space-x-1",children:[(0,a.jsx)(D.A,{className:"w-3 h-3 flex-shrink-0"}),(0,a.jsxs)("span",{children:[(0,P.m)(e.timestamp)," ago"]})]})]})]},s)),s.length>3&&(0,a.jsxs)("div",{className:"flex flex-col items-center space-y-2 mt-4",children:[(0,a.jsx)("button",{onClick:()=>{d?(x(!1),h(3)):(x(!0),h(10))},className:"flex items-center space-x-1 ".concat(t?"text-yellow-500 hover:text-yellow-400":"text-blue-700 hover:text-blue-600"),children:d?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(I.A,{className:"w-4 h-4"}),(0,a.jsx)("span",{children:"Show less"})]}):(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(M.A,{className:"w-4 h-4"}),(0,a.jsx)("span",{children:"Show more"})]})}),d&&m<s.length&&(0,a.jsxs)("button",{onClick:()=>{h(e=>Math.min(e+10,s.length))},className:"flex items-center space-x-1 text-sm ".concat(t?"text-gray-400 hover:text-gray-300":"text-gray-600 hover:text-gray-700"),children:[(0,a.jsx)(M.A,{className:"w-4 h-4"}),(0,a.jsxs)("span",{children:["Load more entries (",s.length-m," remaining)"]})]})]})]})};function _(e){let{size:t="md"}=e;return(0,a.jsx)("div",{className:"".concat({sm:"w-4 h-4",md:"w-6 h-6",lg:"w-8 h-8"}[t]," animate-spin"),children:(0,a.jsx)("div",{className:"h-full w-full border-4 border-t-yellow-500 border-r-yellow-500 border-b-yellow-500/20 border-l-yellow-500/20 rounded-full"})})}let z=(0,s(7711).default)(()=>Promise.all([s.e(484),s.e(706),s.e(761),s.e(976)]).then(s.bind(s,1976)).then(e=>({default:e.ClientMap})),{loadableGenerated:{webpack:()=>[1976]},ssr:!1,loading:()=>(0,a.jsx)("div",{className:"h-[500px] md:h-[600px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg",children:(0,a.jsxs)("div",{className:"flex flex-col items-center space-y-4",children:[(0,a.jsx)(_,{size:"lg"}),(0,a.jsx)("span",{className:"text-yellow-500 text-lg font-medium",children:"Loading map..."})]})})}),T=e=>{let{isDarkMode:t}=e,[s,l]=(0,r.useState)([]),[n,c]=(0,r.useState)(!0),[i,o]=(0,r.useState)(null);return((0,r.useEffect)(()=>{(async()=>{try{let e,t,s=[];try{let e=localStorage.getItem("visitorLocations");e&&(s=JSON.parse(e).filter(e=>"number"==typeof e.lat&&!isNaN(e.lat)&&"number"==typeof e.lon&&!isNaN(e.lon)&&"string"==typeof e.country&&"number"==typeof e.count))}catch(e){s=[]}try{let t=await L.A.get("https://ipwho.is/",{timeout:8e3,headers:{Accept:"application/json"}});if(!t.data||"number"!=typeof t.data.latitude||isNaN(t.data.latitude)||"number"!=typeof t.data.longitude||isNaN(t.data.longitude)||"string"!=typeof t.data.country)throw console.warn("Invalid API response:",t.data),Error("Invalid location data received");e={country:t.data.country,latitude:t.data.latitude,longitude:t.data.longitude}}catch(e){if(console.error("Error fetching location data:",e),s.length>0){l(s),c(!1);return}throw e}let a=s.findIndex(t=>.01>Math.abs(t.lat-e.latitude)&&.01>Math.abs(t.lon-e.longitude));if(a>=0)(t=[...s])[a]={...t[a],count:t[a].count+1};else{let a={country:e.country,lat:e.latitude,lon:e.longitude,count:1};t=[...s,a]}try{localStorage.setItem("visitorLocations",JSON.stringify(t))}catch(e){console.error("Error saving to localStorage:",e)}l(t),c(!1)}catch(e){console.error("Error in visitor tracking:",e),o("Unable to load visitor data"),c(!1)}})()},[]),n)?(0,a.jsx)("div",{className:"container mx-auto px-4 max-w-5xl",children:(0,a.jsx)("div",{className:"h-[500px] md:h-[600px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg",children:(0,a.jsxs)("div",{className:"flex flex-col items-center space-y-4",children:[(0,a.jsx)(_,{size:"lg"}),(0,a.jsx)("span",{className:"text-yellow-500 text-lg font-medium",children:"Loading visitor data..."})]})})}):i?(0,a.jsx)("div",{className:"container mx-auto px-4 max-w-5xl",children:(0,a.jsx)("div",{className:"h-[500px] md:h-[600px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg",children:(0,a.jsx)("div",{className:"flex flex-col items-center space-y-4",children:(0,a.jsx)("div",{className:"text-red-500 text-lg",children:i})})})}):(0,a.jsx)("div",{className:"container mx-auto px-4 max-w-5xl",children:(0,a.jsx)("div",{className:"h-[500px] md:h-[600px] bg-gray-800 rounded-lg overflow-hidden shadow-lg",children:(0,a.jsx)(z,{locations:s,isDarkMode:t})})})};var O=s(7396),R=s(3821),W=s.n(R);function F(){let{isDarkMode:e,toggleTheme:t}=(0,l.D)(),[s,L]=(0,r.useState)(!1),[P,D]=(0,r.useState)(!1),I=(0,r.useRef)(null);return n.A,c.A,i.A,o.A,(0,r.useEffect)(()=>{L(!0);let t=I.current;if(!t)return;let s=t.getContext("2d");if(!s)return;t.width=window.innerWidth,t.height=window.innerHeight;let a=[];for(let e=0;e<200;e++)a.push({x:Math.random()*t.width,y:Math.random()*t.height,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3,radius:1.2*Math.random()+.3});let r=()=>{s.clearRect(0,0,t.width,t.height),s.fillStyle=e?"rgba(17, 24, 39, 0.9)":"rgba(243, 244, 246, 0.95)",s.fillRect(0,0,t.width,t.height),a.forEach(a=>{a.x+=a.vx,a.y+=a.vy,(a.x<0||a.x>t.width)&&(a.vx*=-1),(a.y<0||a.y>t.height)&&(a.vy*=-1),s.beginPath(),s.arc(a.x,a.y,a.radius,0,2*Math.PI),s.fillStyle=e?"rgba(255, 255, 255, 0.8)":"rgba(0, 0, 0, 0.85)",s.fill()}),s.strokeStyle=e?"rgba(255, 255, 255, 0.15)":"rgba(0, 0, 0, 0.6)",s.lineWidth=.5;for(let t=0;t<a.length;t++)for(let r=t+1;r<a.length;r++){let l=a[t].x-a[r].x,n=a[t].y-a[r].y,c=Math.sqrt(l*l+n*n);if(c<125*(window.innerWidth<768?.8:1)){let l=(1-c/125)*(e?.5:.7);s.strokeStyle=e?"rgba(255, 255, 255, ".concat(l,")"):"rgba(0, 0, 0, ".concat(l,")"),s.beginPath(),s.moveTo(a[t].x,a[t].y),s.lineTo(a[r].x,a[r].y),s.stroke()}}requestAnimationFrame(r)};r();let l=()=>{t.width=window.innerWidth,t.height=window.innerHeight};return window.addEventListener("resize",l),()=>window.removeEventListener("resize",l)},[e,s]),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("div",{className:"fixed inset-0 w-full h-full",children:(0,a.jsx)("canvas",{ref:I,className:"w-full h-full"})}),(0,a.jsx)("header",{className:"fixed top-0 left-0 right-0 z-50 ".concat(e?"bg-gray-900/90 text-gray-100":"bg-white/90 text-gray-900"," backdrop-blur-sm border-b ").concat(e?"border-gray-800":"border-gray-300"," transition-colors duration-500 header-pattern ").concat(e?"dark-pattern":"light-pattern"),children:(0,a.jsxs)("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",children:[(0,a.jsxs)("div",{className:"flex items-center justify-between gap-4 h-16",children:[(0,a.jsx)("h1",{className:"flex-shrink-0 ml-8",children:(0,a.jsx)("a",{href:"#",className:"text-sm sm:text-lg md:text-xl font-bold font-mono ".concat(e?"text-yellow-500 hover:text-yellow-400":"text-blue-700 hover:text-blue-600"," transition-colors duration-200"),onClick:e=>{e.preventDefault(),window.scrollTo({top:0,behavior:"smooth"})},children:"sajal"})}),(0,a.jsx)("nav",{className:"hidden sm:flex items-center space-x-6 flex-grow justify-center",children:[{name:"about",path:"#about"},{name:"projects",path:"#projects"},{name:"experience",path:"#experience"},{name:"skills",path:"#skills"},{name:"analytics",path:"#analytics"},{name:"contact",path:"#contact"}].map(t=>{let{name:s,path:r}=t;return(0,a.jsx)("a",{href:r,className:"text-sm ".concat(e?"text-gray-300 hover:text-yellow-500":"text-gray-600 hover:text-blue-700"," transition-colors"),children:s.charAt(0).toUpperCase()+s.slice(1)},s)})}),(0,a.jsxs)("div",{className:"flex items-center space-x-2 sm:space-x-4",children:[(0,a.jsxs)("a",{href:"/sajal_resume.pdf#view=FitPage",target:"_blank",rel:"noopener noreferrer",className:"flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors duration-200 ".concat(e?"bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20":"bg-blue-700/10 text-blue-700 hover:bg-blue-700/20"),onClick:e=>{e.preventDefault(),window.open("/sajal_resume.pdf#view=FitPage","_blank","noopener,noreferrer")},children:[(0,a.jsx)(A.A,{className:"w-4 h-4"}),(0,a.jsx)("span",{className:"text-sm font-medium",children:"Resume"})]}),(0,a.jsx)("button",{onClick:()=>t(),className:"p-2 rounded-lg transition-colors duration-200 ".concat(e?"bg-gray-800 hover:bg-gray-700":"bg-gray-200 hover:bg-gray-300"),children:e?(0,a.jsx)(S.A,{className:"w-4 h-4 text-yellow-500"}):(0,a.jsx)(C.A,{className:"w-4 h-4 text-blue-700"})}),(0,a.jsx)("button",{onClick:()=>D(!P),className:"sm:hidden p-2 rounded-lg ".concat(e?"hover:bg-gray-800/20":"hover:bg-gray-200/50"),"aria-label":"Toggle menu",children:P?(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M6 18L18 6M6 6l12 12"})}):(0,a.jsx)("svg",{className:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M4 6h16M4 12h16m-7 6h7"})})})]})]}),P&&(0,a.jsx)("nav",{className:"sm:hidden py-4 border-t ".concat(e?"border-gray-800":"border-gray-200"),children:(0,a.jsx)("div",{className:"flex flex-col space-y-2",children:[{name:"about",path:"#about"},{name:"projects",path:"/projects"},{name:"experience",path:"#experience"},{name:"skills",path:"#skills"},{name:"analytics",path:"#analytics"},{name:"contact",path:"#contact"}].map(t=>{let{name:s,path:r}=t;return(0,a.jsx)("a",{href:r,className:"text-sm px-3 py-2 rounded-lg ".concat(e?"hover:bg-gray-800/50 text-gray-300 hover:text-yellow-500":"hover:bg-gray-200/50 text-gray-600 hover:text-blue-700"," transition-colors"),onClick:()=>D(!1),children:s.charAt(0).toUpperCase()+s.slice(1)},s)})})})]})}),(0,a.jsx)("div",{className:"min-h-screen ".concat(e?"bg-gray-900/80 text-gray-100":"bg-gray-100/80 text-gray-900"," pt-28 sm:pt-32 px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 font-mono relative transition-colors duration-500"),children:(0,a.jsx)("div",{className:"relative z-10 max-w-5xl mx-auto",children:(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("section",{id:"about",className:"min-h-screen flex items-center justify-center pt-0.1 md:pt-0 md:-mt-24 relative z-0",children:(0,a.jsx)("div",{className:"max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full",children:(0,a.jsxs)("div",{className:"flex flex-col md:flex-row items-center gap-2 sm:gap-3 md:gap-8",children:[(0,a.jsx)("div",{className:"w-full md:w-1/2 flex justify-center md:justify-start -mt-40 md:mt-0",children:(0,a.jsx)("div",{className:"aspect-square relative rounded-full overflow-hidden border-4 border-gray-200 dark:border-gray-800 w-48 h-48 md:w-64 md:h-64",children:(0,a.jsx)(W(),{src:"/profile.png",alt:"Sajal Kumar",layout:"fill",objectFit:"cover",className:"rounded-full",priority:!0})})}),(0,a.jsxs)("div",{className:"w-full md:w-1/2 text-center md:text-left mt-2 sm:mt-4 md:mt-0",children:[(0,a.jsxs)("div",{className:"mb-1",children:[(0,a.jsx)("h1",{className:"text-3xl md:text-5xl lg:text-6xl font-bold font-mono ".concat(e?"text-gray-100":"text-gray-900"),children:"Sajal Kumar"}),(0,a.jsxs)("p",{className:"text-base md:text-xl mt-1 ".concat(e?"text-yellow-500":"text-blue-700"),children:["Developer in Progress",(0,a.jsx)("br",{}),(0,a.jsx)("br",{})]}),(0,a.jsx)("p",{className:"text-xs md:text-base mt-1 ".concat(e?"text-gray-400":"text-gray-600"),children:"Bengaluru, India"})]}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{className:"".concat(e?"text-gray-400":"text-gray-600"," text-sm md:text-base space-y-4"),children:[(0,a.jsx)("p",{children:"\uD83D\uDC4B Hi there! I’m a third-year Information Science Engineering student who’s passionate about distributed systems, cybersecurity, and, of course, sharing the perfect meme at just the right time.."}),(0,a.jsx)("p",{}),(0,a.jsx)("p",{children:"On the lookout for exciting projects & internships. let’s connect! \uD83D\uDE80"})]}),(0,a.jsx)("div",{className:"flex items-center justify-center md:justify-start gap-4",children:(0,a.jsxs)("a",{href:"https://t.me/sajalkmr",target:"_blank",rel:"noopener noreferrer",className:"".concat(e?"bg-yellow-500 hover:bg-yellow-400 text-gray-900":"bg-blue-700 hover:bg-blue-600 text-white"," px-4 py-1 rounded-md text-sm transition-colors duration-200 flex items-center gap-2"),children:[(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:"w-4 h-4",children:(0,a.jsx)("path",{d:"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"})}),"Contact Me"]})})]})]})]})})}),(0,a.jsxs)("section",{id:"projects",className:"mb-12 md:mb-20 pt-16",children:[(0,a.jsx)("h2",{className:"text-lg md:text-2xl font-bold mb-4 ".concat(e?"text-yellow-500":"text-blue-700"),children:"Projects"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsx)("div",{children:(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[{name:"ordo",description:"A distributed container orchestration system built with Go, featuring custom PVM scheduler and RESTful APIs for cluster management.",tech:["Go","Docker SDK","BoltDB"]},{name:"raftly",description:"Implementation of Raft Consensus Algorithm in Java with monitoring using Prometheus and Grafana.",tech:["Java","Maven","Prometheus","Grafana"]}].map(t=>(0,a.jsxs)("div",{className:"".concat(e?"bg-gray-800/50":"bg-gray-200/50"," rounded-lg p-4 space-y-3"),children:[(0,a.jsx)("h3",{className:"text-base md:text-lg font-semibold",children:t.name}),(0,a.jsx)("p",{className:"text-sm md:text-base ".concat(e?"text-gray-400":"text-gray-600"),children:t.description}),(0,a.jsx)("div",{className:"flex flex-wrap gap-2",children:t.tech.map(t=>(0,a.jsx)("span",{className:"text-xs px-2 py-1 rounded ".concat(e?"bg-gray-700":"bg-gray-300"),children:t},t))})]},t.name))})}),(0,a.jsx)("div",{className:"flex justify-end mt-6",children:(0,a.jsxs)(O.default,{href:"/projects",className:"flex items-center space-x-2 px-3 py-1.5 rounded-lg transition-colors duration-200 ".concat(e?"bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20":"bg-blue-700/10 text-blue-700 hover:bg-blue-700/20"),children:[(0,a.jsx)("span",{className:"text-sm font-medium",children:"View All"}),(0,a.jsx)(d.A,{className:"w-4 h-4"})]})})]})]}),(0,a.jsxs)("section",{id:"experience",className:"mb-12 md:mb-20 pt-16",children:[(0,a.jsx)("h2",{className:"text-lg md:text-2xl font-bold mb-4 ".concat(e?"text-yellow-500":"text-blue-700"),children:"Experience"}),(0,a.jsxs)("div",{className:"space-y-8",children:[(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)(x.A,{className:"w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ".concat(e?"text-yellow-500":"text-blue-700")}),(0,a.jsx)("span",{className:"text-sm md:text-base font-medium ".concat(e?"text-yellow-500":"text-blue-700"),children:"May 2024 - Present"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex flex-wrap items-center gap-2 text-sm md:text-base",children:[(0,a.jsx)("span",{className:"font-semibold",children:"Student Developer"}),(0,a.jsx)("span",{className:"text-gray-400",children:"•"}),(0,a.jsx)("span",{children:"CMR Institute of Technology"})]}),(0,a.jsxs)("ul",{className:"list-disc list-inside text-sm md:text-base ".concat(e?"text-gray-400":"text-gray-600"," space-y-1"),children:[(0,a.jsx)("li",{children:"Developed STRbook to digitize student transformation records, reducing manual data entry by 80%"}),(0,a.jsx)("li",{children:"Implemented JWT authentication system ensuring secure access for students and teachers"}),(0,a.jsx)("li",{children:"Designed RESTful APIs for CRUD operations and integrated PostgreSQL database"}),(0,a.jsx)("li",{children:"Automated CI/CD pipelines using Jenkins for smooth deployment"})]})]})]}),(0,a.jsxs)("div",{className:"grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-2",children:[(0,a.jsxs)("div",{className:"flex items-center space-x-2",children:[(0,a.jsx)(x.A,{className:"w-4 h-4 md:w-5 md:h-5 flex-shrink-0 ".concat(e?"text-yellow-500":"text-blue-700")}),(0,a.jsx)("span",{className:"text-sm md:text-base font-medium ".concat(e?"text-yellow-500":"text-blue-700"),children:"Aug 2023 - Nov 2024"})]}),(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsxs)("div",{className:"flex flex-wrap items-center gap-2 text-sm md:text-base",children:[(0,a.jsx)("span",{className:"font-semibold",children:"Core Technical Team"}),(0,a.jsx)("span",{className:"text-gray-400",children:"•"}),(0,a.jsx)("span",{children:"Google Developer Student Club"})]}),(0,a.jsxs)("ul",{className:"list-disc list-inside text-sm md:text-base ".concat(e?"text-gray-400":"text-gray-600"," space-y-1"),children:[(0,a.jsx)("li",{children:"Contributed to club website development using React, Golang, and Firebase"}),(0,a.jsx)("li",{children:"Improved uptime and reliability of web services in club's technical projects"}),(0,a.jsx)("li",{children:"Conducted technical events on Golang and Web Security"})]})]})]})]})]}),(0,a.jsxs)("section",{id:"skills",className:"mb-12 md:mb-20 pt-16",children:[(0,a.jsx)("h2",{className:"text-lg md:text-2xl font-bold mb-4 ".concat(e?"text-yellow-500":"text-blue-700"),children:"Skills"}),(0,a.jsxs)("div",{className:"space-y-6",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-base md:text-lg font-semibold mb-3 ".concat(e?"text-gray-300":"text-gray-700"),children:"Languages"}),(0,a.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4",children:[{name:"C/C++",icon:(0,a.jsx)(n.A,{className:"w-4 h-4"})},{name:"Java",icon:(0,a.jsx)(n.A,{className:"w-4 h-4"})},{name:"Go",icon:(0,a.jsx)(n.A,{className:"w-4 h-4"})},{name:"Python",icon:(0,a.jsx)(n.A,{className:"w-4 h-4"})},{name:"PowerShell",icon:(0,a.jsx)(m.A,{className:"w-4 h-4"})},{name:"Bash",icon:(0,a.jsx)(m.A,{className:"w-4 h-4"})},{name:"JavaScript",icon:(0,a.jsx)(n.A,{className:"w-4 h-4"})},{name:"HTML/CSS",icon:(0,a.jsx)(n.A,{className:"w-4 h-4"})},{name:"SQL",icon:(0,a.jsx)(h.A,{className:"w-4 h-4"})},{name:"LATEX",icon:(0,a.jsx)(n.A,{className:"w-4 h-4"})}].map(t=>(0,a.jsxs)("div",{className:"flex items-center space-x-2 p-2 rounded-lg ".concat(e?"bg-gray-800/50":"bg-gray-200/50"," ").concat(e?"text-gray-300 hover:text-yellow-500":"text-gray-600 hover:text-blue-700"," transition-colors duration-200"),children:[t.icon,(0,a.jsx)("span",{className:"text-sm md:text-base",children:t.name})]},t.name))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-base md:text-lg font-semibold mb-3 ".concat(e?"text-gray-300":"text-gray-700"),children:"Frameworks & Libraries"}),(0,a.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4",children:[{name:"React",icon:(0,a.jsx)(g.A,{className:"w-4 h-4"})},{name:"Node.js",icon:(0,a.jsx)(p.A,{className:"w-4 h-4"})},{name:"Express",icon:(0,a.jsx)(p.A,{className:"w-4 h-4"})}].map(t=>(0,a.jsxs)("div",{className:"flex items-center space-x-2 p-2 rounded-lg ".concat(e?"bg-gray-800/50":"bg-gray-200/50"," ").concat(e?"text-gray-300 hover:text-yellow-500":"text-gray-600 hover:text-blue-700"," transition-colors duration-200"),children:[t.icon,(0,a.jsx)("span",{className:"text-sm md:text-base",children:t.name})]},t.name))})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{className:"text-base md:text-lg font-semibold mb-3 ".concat(e?"text-gray-300":"text-gray-700"),children:"Developer Tools"}),(0,a.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4",children:[{name:"Unix",icon:(0,a.jsx)(m.A,{className:"w-4 h-4"})},{name:"Linux/WSL",icon:(0,a.jsx)(m.A,{className:"w-4 h-4"})},{name:"Windows",icon:(0,a.jsx)(g.A,{className:"w-4 h-4"})},{name:"Docker",icon:(0,a.jsx)(u.A,{className:"w-4 h-4"})},{name:"Kubernetes",icon:(0,a.jsx)(u.A,{className:"w-4 h-4"})},{name:"Terraform",icon:(0,a.jsx)(j.A,{className:"w-4 h-4"})},{name:"Git/GitHub",icon:(0,a.jsx)(y.A,{className:"w-4 h-4"})},{name:"Firebase",icon:(0,a.jsx)(h.A,{className:"w-4 h-4"})},{name:"Jenkins",icon:(0,a.jsx)(p.A,{className:"w-4 h-4"})},{name:"Postman",icon:(0,a.jsx)(b.A,{className:"w-4 h-4"})}].map(t=>(0,a.jsxs)("div",{className:"flex items-center space-x-2 p-2 rounded-lg ".concat(e?"bg-gray-800/50":"bg-gray-200/50"," ").concat(e?"text-gray-300 hover:text-yellow-500":"text-gray-600 hover:text-blue-700"," transition-colors duration-200"),children:[t.icon,(0,a.jsx)("span",{className:"text-sm md:text-base",children:t.name})]},t.name))})]})]})]}),(0,a.jsxs)("section",{id:"certifications",className:"mb-12 md:mb-20 pt-16",children:[(0,a.jsx)("h2",{className:"text-lg md:text-2xl font-bold mb-4 ".concat(e?"text-yellow-500":"text-blue-700"),children:"Certifications"}),(0,a.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",children:[{name:"AWS Cloud Practitioner Essentials",logo:"https://download.logo.wine/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.png",issuer:"Coursera",date:"2024",link:"https://www.credly.com/"},{name:"Network Automation Professional Certificate",logo:"https://miro.co.za/img/m/46-large_brand.webp",issuer:"Arista Networks",date:"2024",link:"https://www.linkedin.com/learning/certificates/9bdc6a9f2e00ace906b135ba38534b9f93c5c18790e10206ac7092795a2529b7?trk=share_certificate"},{name:"DevOps Professional Certificate",logo:"https://cdn.icon-icons.com/icons2/2699/PNG/512/pagerduty_logo_icon_169875.png",issuer:"Pagerduty",date:"2023",link:"https://www.linkedin.com/learning/certificates/e3c205c516875f02ab58b3f06b9dd501360f1526036b0936c2dd195c7353c3c5?trk=share_certificate"}].map((t,s)=>(0,a.jsxs)("div",{className:"p-4 rounded-lg ".concat(e?"bg-gray-800 hover:bg-gray-700":"bg-gray-100 hover:bg-gray-200"," transition-colors duration-200"),children:[(0,a.jsxs)("div",{className:"flex items-center gap-3 mb-2",children:[(0,a.jsx)("img",{src:t.logo,alt:t.name,width:24,height:24,className:"rounded-sm"}),(0,a.jsx)("h3",{className:"font-semibold",children:t.name})]}),(0,a.jsx)("p",{className:"text-sm ".concat(e?"text-gray-400":"text-gray-600"),children:t.issuer}),(0,a.jsx)("p",{className:"text-xs ".concat("text-gray-500"),children:t.date}),t.link&&(0,a.jsx)("a",{href:t.link,target:"_blank",rel:"noopener noreferrer",className:"inline-block mt-2 text-sm ".concat(e?"text-yellow-500 hover:text-yellow-400":"text-blue-700 hover:text-blue-600"),children:"View Certificate →"})]},s))})]}),(0,a.jsxs)("section",{id:"analytics",className:"mb-12 md:mb-20 pt-16",children:[(0,a.jsx)("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold mb-4 ".concat(e?"text-yellow-500":"text-blue-700"),children:"Visitor Analytics"}),(0,a.jsxs)("div",{className:"space-y-8 sm:space-y-12",children:[(0,a.jsxs)("div",{className:"".concat(e?"bg-gray-800/50":"bg-gray-200/50"," p-4 sm:p-6 rounded"),children:[(0,a.jsx)("h3",{className:"text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4",children:"Visitor Map"}),(0,a.jsx)(T,{isDarkMode:e})]}),(0,a.jsxs)("div",{className:"".concat(e?"bg-gray-800/50":"bg-gray-200/50"," p-4 sm:p-6 rounded"),children:[(0,a.jsx)("h3",{className:"text-base sm:text-lg md:text-xl font-semibold mb-3 sm:mb-4",children:"Visitor Log"}),(0,a.jsx)(E,{isDarkMode:e})]})]})]}),(0,a.jsxs)("footer",{id:"contact",className:"".concat(e?"border-gray-800":"border-gray-200"," mt-12 md:mt-20 pt-16"),children:[(0,a.jsxs)("div",{className:"mb-12 md:mb-16",children:[(0,a.jsx)("h2",{className:"text-lg sm:text-xl md:text-2xl font-bold mb-4 ".concat(e?"text-yellow-500":"text-blue-700"),children:"Contact"}),(0,a.jsx)("div",{className:"grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3",children:[{href:"mailto:sajalkmr@proton.me",icon:(0,a.jsx)(f.A,{className:"w-4 h-4"}),label:"Email",color:e?"hover:text-yellow-500":"hover:text-blue-700"},{href:"https://github.com/sajalkmr",icon:(0,a.jsx)(N.A,{className:"w-4 h-4"}),label:"GitHub",color:e?"hover:text-gray-100":"hover:text-gray-900"},{href:"https://linkedin.com/in/sajalkmr",icon:(0,a.jsx)(v.A,{className:"w-4 h-4"}),label:"LinkedIn",color:"hover:text-blue-500"},{href:"https://twitter.com/sajalkmrx",icon:(0,a.jsx)(w.A,{className:"w-4 h-4"}),label:"Twitter",color:"hover:text-blue-400"},{href:"https://t.me/sajalkmr",icon:(0,a.jsx)("svg",{viewBox:"0 0 24 24",fill:"currentColor",className:"w-4 h-4",children:(0,a.jsx)("path",{d:"M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"})}),label:"Telegram",color:"hover:text-sky-500"},{href:"https://www.discordapp.com/users/785875026007294022",icon:(0,a.jsx)(k.A,{className:"w-4 h-4"}),label:"Discord",color:"hover:text-indigo-400"}].map(t=>{let{href:s,icon:r,label:l,color:n}=t;return(0,a.jsxs)("a",{href:s,target:"_blank",rel:"noopener noreferrer",className:"flex items-center gap-2 p-2 rounded-lg ".concat(e?"bg-gray-800/50":"bg-gray-200/50"," ").concat(e?"text-gray-300":"text-gray-600"," ").concat(n," transition-all duration-200 hover:scale-[1.02]"),children:[(0,a.jsx)("div",{className:"".concat(e?"bg-gray-700/50":"bg-gray-300/50"," p-1.5 rounded-lg"),children:r}),(0,a.jsx)("span",{className:"text-sm font-medium",children:l})]},l)})})]}),(0,a.jsx)("div",{className:"border-t ".concat(e?"border-gray-800":"border-gray-200"," mt-12 md:mt-16 pt-8 md:pt-12 pb-12 md:pb-16"),children:(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row justify-between items-center gap-4",children:[(0,a.jsxs)("div",{className:"flex flex-col sm:flex-row items-center gap-2 sm:gap-4",children:[(0,a.jsxs)("span",{className:"text-sm ".concat(e?"text-gray-400":"text-gray-600"),children:[new Date().getFullYear()," sajal kumar"]}),(0,a.jsx)("span",{className:"hidden sm:inline-block ".concat(e?"text-gray-600":"text-gray-400"),children:"•"}),(0,a.jsxs)("span",{className:"text-sm ".concat(e?"text-gray-400":"text-gray-600"),children:["source code"," ",(0,a.jsx)("a",{href:"https://github.com/sajalkmr/sajalkmr.github.io",target:"_blank",rel:"noopener noreferrer",className:"hover:".concat(e?"text-yellow-500":"text-blue-700"),children:"github.com/sajalkmr"})]})]}),(0,a.jsx)("div",{className:"text-xs ".concat(e?"text-gray-500":"text-gray-400"),children:(0,a.jsx)("span",{children:"Last updated: 27/11/2024"})})]})})]})]})})})]})}},5695:(e,t,s)=>{"use strict";s.d(t,{D:()=>r});var a=s(2115);let r=()=>{let[e,t]=(0,a.useState)(!0);return(0,a.useEffect)(()=>{let e=localStorage.getItem("theme");t(!e||"dark"===e)},[]),{isDarkMode:e,toggleTheme:()=>{let s=!e;t(s),localStorage.setItem("theme",s?"dark":"light")}}}}},e=>{var t=t=>e(e.s=t);e.O(0,[266,839,441,517,358],()=>t(2554)),_N_E=e.O()}]);