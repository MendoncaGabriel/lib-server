import $ from"node:http";var w=class{routes;constructor(){this.routes=[]}add(t,e,s){let r=s.pop();this.routes.push({method:t,path:e,middlewares:s,middleware:r})}find(t){let{method:e,url:s,params:r}=t;if(!s)return;let i=this.routes.find(n=>{let p=new RegExp("^"+n.path.replace(/\/:([^\/]+)/g,"/([^/]+)")+"$");return e===n.method&&p.test(s.split("?")[0])});if(i){let n=s.split("?")[0].match(new RegExp(i.path.replace(/\/:([^\/]+)/g,"/([^/]+)")));if(n){let p=(i.path.match(/\/:([^\/]+)/g)||[]).map(d=>d.replace("/:",""));t.params=t.params||{},p.forEach((d,u)=>{t.params[d]=n[u+1]})}}return i}get(t,...e){this.add("GET",t,e)}post(t,...e){this.add("POST",t,e)}put(t,...e){this.add("PUT",t,e)}patch(t,...e){this.add("PATCH",t,e)}delete(t,...e){this.add("DELETE",t,e)}},S=w;var c=class{parse(t){let e=t.secure?"https":t.headers["x-forwarded-proto"]||"http",s=t.url?new URL(t.url,`${e}://${t.headers.host}`):new URL(`${e}://${t.headers.host}`);return Object.fromEntries(s.searchParams.entries())}};var f=class{async process(t,e,s){let r=s.find(t);if(!r){e.statusCode=404,e.end("Not Found");return}try{for(let i of r.middlewares)await new Promise((n,p)=>{i(t,e,d=>d?p(d):n())});r.middleware?r.middleware(t,e,()=>{}):(e.statusCode=500,e.end("Internal Server Error: No controller provided"))}catch(i){let n=i instanceof Error?i.message:"Unknown Error";e.statusCode=500,e.end(`Internal Server Error: ${n}`)}}};var v=class{constructor(t,e,s=new c,r=new f){this.middlewares=t;this.router=e;this.queryParams=s;this.processRouter=r}async handleRequest(t,e){t.params={},t.query=this.queryParams.parse(t);for(let s of this.middlewares)await new Promise((r,i)=>{s(t,e,n=>n?i(n):r())});await this.processRouter.process(t,e,this.router)}},E=v;var N=async(o,t,e)=>{if((o.method==="POST"||o.method==="PUT"||o.method==="PATCH")&&o.headers["content-type"]?.startsWith("application/json"))try{o.body=await new Promise((s,r)=>{let i="";o.on("data",n=>{i+=n.toString()}),o.on("end",()=>{try{s(JSON.parse(i))}catch(n){r(n)}}),o.on("error",n=>{r(n)})})}catch(s){s instanceof Error?(t.statusCode=400,t.end(`Erro no parse do JSON: ${s.message}`)):(t.statusCode=400,t.end("Erro desconhecido no parse do JSON"));return}e()},P=N;import x from"fs";import b from"path";var U=o=>{let t=b.resolve(o.path);return x.existsSync(t)||x.mkdirSync(t,{recursive:!0}),(e,s,r)=>{if(s.locals||(s.locals={}),e.method==="POST"&&e.headers["content-type"]&&e.headers["content-type"].startsWith("multipart/form-data")){let n=e.headers["content-type"]?.split("; ")[1]?.replace("boundary=","");if(!n)return s.statusCode=400,s.end("Boundary ausente no content-type");let p=[],d=0,u=o.maxFileSize||50*1024*1024;e.on("data",a=>{if(d+=a.length,d>u)return s.statusCode=413,s.end("Arquivo muito grande");p.push(a)}),e.on("end",()=>{try{let a=Buffer.concat(p),h=Buffer.from(`--${n}`),l=0,I=[];for(;(l=a.indexOf(h,l))!==-1;){l+=h.length;let g=a.indexOf(h,l),R=a.slice(l,g!==-1?g:a.length),y=R.indexOf(`\r
\r
`);if(y===-1)break;let O=R.slice(0,y).toString("utf8"),B=R.slice(y+4),C=O.match(/filename="([^"]+)"/);if(C){let H=C[1],z=o.format||b.extname(H),M=H;M+=z;let k=b.join(t,M);x.writeFileSync(k,B),I.push(k)}if(g===-1)break}e.files=I,s.locals.uploadedFilePaths=I,r()}catch(a){console.error("Erro no upload:",a),s.statusCode=500,s.end("Erro no upload")}}),e.on("error",a=>{console.error("Erro no upload:",a),s.statusCode=500,s.end("Erro no upload")})}else r()}},W=U;function m(o,t){switch(t){case"json":o.setHeader("Content-Type","application/json");break;case"html":o.setHeader("Content-Type","text/html");break;case"text":o.setHeader("Content-Type","text/plain");break;case"binary":o.setHeader("Content-Type","application/octet-stream");break;case"css":o.setHeader("Content-Type","text/css");break;case"js":o.setHeader("Content-Type","application/javascript");break;case"xml":o.setHeader("Content-Type","application/xml");break;case"svg":o.setHeader("Content-Type","image/svg+xml");break;case"pdf":o.setHeader("Content-Type","application/pdf");break;case"ico":o.setHeader("Content-Type","image/x-icon");break;case"jpg":case"jpeg":o.setHeader("Content-Type","image/jpeg");break;case"png":o.setHeader("Content-Type","image/png");break;case"gif":o.setHeader("Content-Type","image/gif");break;case"mp3":o.setHeader("Content-Type","audio/mpeg");break;case"wav":o.setHeader("Content-Type","audio/wav");break;case"mp4":o.setHeader("Content-Type","video/mp4");break;case"webm":o.setHeader("Content-Type","video/webm");break;case"zip":o.setHeader("Content-Type","application/zip");break;case"7z":o.setHeader("Content-Type","application/x-7z-compressed");break;default:o.setHeader("Content-Type","text/plain")}}function j(o){let t=o;return t.send=function(e,s){let r;switch(!0){case typeof e=="object":r="json",m(t,r),t.end(JSON.stringify(e),s);break;case typeof e=="string":e.trim().startsWith("<")&&e.trim().endsWith(">")?r="html":e.endsWith(".css")?r="css":e.endsWith(".js")?r="js":e.endsWith(".xml")?r="xml":e.endsWith(".svg")?r="svg":e.endsWith(".pdf")?r="pdf":e.endsWith(".ico")?r="ico":e.endsWith(".jpg")||e.endsWith(".jpeg")?r="jpg":e.endsWith(".png")?r="png":e.endsWith(".gif")?r="gif":e.endsWith(".mp3")?r="mp3":e.endsWith(".wav")?r="wav":e.endsWith(".mp4")?r="mp4":e.endsWith(".webm")?r="webm":e.endsWith(".zip")?r="zip":e.endsWith(".7z")?r="7z":r="text",m(t,r),t.end(e,s);break;case Buffer.isBuffer(e):r="binary",m(t,r),t.end(e,s);break;default:r="text",m(t,r),t.end(String(e),s);break}return t},t.locals={},t}var T=class{middlewares;router;requestHandler;server;constructor(){this.middlewares=[],this.router=new S,this.requestHandler=new E(this.middlewares,this.router),this.server=$.createServer((t,e)=>{let s=t,r=j(e);this.requestHandler.handleRequest(s,r)})}use(t){this.middlewares.push(t)}json(){return P}upload(t){return W(t)}get(t,...e){this.router.get(t,...e)}post(t,...e){this.router.post(t,...e)}put(t,...e){this.router.put(t,...e)}patch(t,...e){this.router.patch(t,...e)}delete(t,...e){this.router.delete(t,...e)}listen(t,e){this.server.listen(t,e)}},ae=T;export{ae as default};
