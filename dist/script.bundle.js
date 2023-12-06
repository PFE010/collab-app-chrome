(()=>{function t(){console.log("on click");const t=document.querySelector("main"),e=document.getElementById("collab-app");document.querySelector(".UnderlineNav-body.list-style-none").querySelectorAll("li").forEach((t=>{const e=t.querySelector("a");e.removeAttribute("aria-current"),e&&e.classList.contains("selected")&&e.classList.remove("selected")})),e.classList.add("selected"),function(t){if(t){const e=document.getElementById("repository-container-header"),n=document.createElement("div");n.id="repository-container-header",n.setAttribute("data-turbo-replace",""),n.setAttribute("hidden",""),e.replaceWith(n);const a=document.createElement("turbo-frame");a.id="repo-content-turbo-frame",a.setAttribute("target","_top"),a.setAttribute("data-turbo-action","advance"),a.setAttribute("src","https://github.com/Souchy/Log721-Lab1"),a.setAttribute("complete","");let o=document.createElement("div");o.setAttribute("class","clearfix container-xl px-md-4 px-lg-5 px-3 mt-4");const r=function(){const t=document.createElement("div");t.classList.add("container","mt-3");const e=document.createElement("h2");e.classList.add("text-center"),e.textContent="All prs";const n=document.createElement("table");n.classList.add("table","table-bordered");const a=document.createElement("thead"),o=document.createElement("tr");["id_pull_request","url","description","titre","date_creation","date_merge","date_last_updated","status","labels"].forEach((t=>{const e=document.createElement("th");e.textContent=t,o.appendChild(e)})),a.appendChild(o);const r=document.createElement("tbody");return r.id="tableBody",n.appendChild(a),n.appendChild(r),t.appendChild(e),t.appendChild(n),t}();o.appendChild(r),a.appendChild(o),t.replaceChild(a,t.querySelector("turbo-frame")),window.location.href=window.location.href+"#collab-app",document.title="Collaboration overview"}else console.error("Target element not found")}(t),async function(){try{console.log("test");const t=await async function(){try{const t=await fetch("http://localhost:3000/collab-app/pullRequests");if(!t.ok)throw new Error("Network response was not ok");return await t.json()}catch(t){return console.error("There was a problem with the fetch operation:",t),[]}}();console.log(t);const e=document.createElement("div");e.classList.add("Collab-app-content");const n=document.createElement("ul");n.classList.add("team"),t.forEach((t=>{console.log("test1");const e=document.createElement("li");e.classList.add("member");const a=document.createElement("div");a.classList.add("thumb");const o=document.createElement("img");o.src=t.thumbnailUrl,a.appendChild(o);const r=document.createElement("div");r.classList.add("Collab-app-description");const i=document.createElement("h3");i.classList.add("Collab-app-h3"),console.log("test2");const l=document.createElement("a");l.href=function(t){const e=t.split("/"),n=`https://github.com/${e[4]}/${e[5]}/pull/${e[7]}`;return console.log(n),n}(t.url),l.textContent=t.titre,i.appendChild(l);const d=document.createElement("p");d.textContent=t.description,d.classList.add("Collab-app-p");const c=document.createElement("a");c.href=t.profileLink,c.username=t.username,c.classList.add("Collab-app-profile-a"),console.log("test3"),d.appendChild(c),r.appendChild(l),r.appendChild(d),e.appendChild(a),e.appendChild(r),n.appendChild(e)})),e.appendChild(n),document.body.appendChild(e);const a=document.createElement("link");a.rel="stylesheet",a.href="index.css",document.head.appendChild(a)}catch(t){console.error("Error while populating table:",t)}}()}!function(){const t=document.head,e=document.createElement("style");e.textContent='\n  @import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400&display=swap");\n\nbody *,\nbody *:before,\nbody *:after {\n\tbox-sizing: border-box;\n}\n\n.Collab-app-content {\n    margin: 0;\n\tpadding: 0;\n\toverflow-x: hidden;\n\tdisplay: flex;\n\tjustify-content: center;\n\tfont-family: "Lato", Arial, Helvetica, serif;\n\tfont-size: 1em;\n\twidth: 90vmin;\n}\n\nh2 {\n\ttext-align: center;\n}\n\n.team {\n\tpadding: 2em 0 2em 2.5em;\n\tmargin: 0;\n}\n\n.member {\n\tmargin: 1.5em 0 0.5em;\n\tpadding: 0.73em;\n\tbackground: linear-gradient(\n\t\t83deg,\n\t\tvar(--yellow) 0 97%,\n\t\t#fff0 calc(97% + 1px) 100%\n\t);\n\tposition: relative;\n\tlist-style: none;\n\tdisplay: inline-block;\n\ttransform: scale(0.85);\n\ttransition: var(--trans);\n}\n\n.member:nth-of-type(even) {\n\ttext-align: right;\n\tbackground: linear-gradient(\n\t\t-83deg,\n\t\tvar(--yellow) 0 97%,\n\t\t#fff0 calc(97% + 1px) 100%\n\t);\n}\n\n.thumb {\n\twidth: 13vmin;\n\theight: 13vmin;\n\tfloat: left;\n\tmargin-right: 1.25em;\n\tbackground: linear-gradient(\n\t\tvar(--deg),\n\t\tvar(--dark) 0 70%,\n\t\tvar(--yellow) 0% 100%\n\t);\n\ttransform: rotate(-4deg);\n\ttransition: var(--trans);\n\tborder-radius: 0.25em;\n\toverflow: hidden;\n\tmargin-left: -3em;\n\tpadding: 0.5em;\n}\n\n.member:nth-of-type(even) .thumb {\n\t--deg: 86deg;\n\tfloat: right;\n\tmargin-left: 2em;\n\tmargin-right: -3em;\n\ttransform: rotate(4deg);\n}\n\n.thumb img {\n\twidth: 100%;\n\theight: 100%;\n\tborder-radius: 0.25em;\n\tfilter: grayscale(1);\n\tbackground: var(--dark);\n}\n\n.member:hover {\n\ttransform: scale(1);\n\ttransition: var(--trans);\n\tfilter: drop-shadow(0px 20px 10px #0008);\n}\n\n.member:hover .thumb {\n\tpadding: 0.1em;\n\ttransition: var(--trans);\n\ttransform: rotate(-1deg);\n\t--deg: -89deg;\n}\n\n.member:nth-of-type(even):hover .thumb {\n\t--deg: 91deg;\n}\n\n.member:hover .thumb img {\n\tfilter: none;\n\ttransition: var(--trans);\n}\n\n.Collab-app-description {\n\tpadding-top: 1vmin;\n}\n\n.Collab-app-description p {\n\tpadding: 0 2em;\n\tmargin-bottom: 1em;\n}\n\n.Collab-app-h3 {\n\tbackground: linear-gradient(182deg, #fff0 60%, var(--dark) 0 100%);\n\tdisplay: inline;\n\ttransform: rotate(-2deg);\n\tposition: absolute;\n\tmargin: 0;\n\tmargin-top: -2.25em;\n\tleft: 9vmin;\n\tpadding: 0.5em 0.75em;\n\tcolor: var(--yellow);\n\tborder-radius: 0.25em;\n\tfont-size: 1.35em;\n\ttransform-origin: left bottom;\n}\n\n.member:nth-of-type(even) h3 {\n\tleft: inherit;\n\tright: 9vmin;\n\ttransform: rotate(2deg);\n\ttransform-origin: right bottom;\n\tbackground: linear-gradient(-182deg, #fff0 60%, var(--dark) 0 100%);\n}\n\n.member:hover h3 {\n\ttransition: var(--trans);\n\ttransform: rotate(0deg);\n\tbackground: linear-gradient(180deg, #fff0 59%, var(--dark) 0 100%);\n}\n\n.co-funder:after {\n\tcontent: "CO-FUNDER";\n\tfont-size: 0.75em;\n\tposition: absolute;\n\ttop: -1.5em;\n\tbackground: var(--yellow);\n\tright: 4em;\n\ttransform: rotate(3deg);\n\tpadding: 0.35em 0.75em 0.5em;\n\tborder-radius: 0.25em;\n\tcolor: var(--dark);\n\tfont-weight: bold;\n}\n\n.co-funder:nth-of-type(even):after {\n\tright: inherit;\n\tleft: 4em;\n\ttransform: rotate(-3deg);\n}\n\n.Collab-app-description p a {\n\tdisplay: inline-block;\n\tmargin: 0.5em 0 0 0;\n\tbackground: var(--dark);\n\tcolor: var(--yellow);\n\tpadding: 0.1em 0.5em 0.35em;\n\tborder-radius: 0.5em;\n\ttext-decoration: none;\n\ttransition: var(--trans);\n}\n.Collab-app-description p a:hover {\n\ttransition: var(--trans);\n\tcolor: var(--dark);\n\tbackground: var(--yellow);\n\tfont-weight: bold;\n}\n\n.Collab-app-description p a img {\n\tfloat: left;\n\twidth: 22px;\n\tfilter: invert(1);\n\tborder-radius: 0.15em;\n\tpadding: 2px;\n\tbackground: #fff;\n\tmargin-right: 2px;\n}\n\n  ',t.appendChild(e)}(),function(){console.log("add item");const e=document.querySelector(".UnderlineNav-body.list-style-none"),n=document.getElementById("collab-app");if(e&&!n){const n=document.createElement("li");n.setAttribute("data-view-component","true"),n.className="d-inline-flex";const a=["UnderlineNav-item","no-wrap","js-responsive-underlinenav-item","js-selected-navigation-item","selected"],o=document.createElement("a");o.id="collab-app",o.href="/collab-app",o.textContent="Collaboration Overview",a.forEach((t=>{o.classList.add(t)})),o.addEventListener("click",(function(e){e.preventDefault(),t()})),n.appendChild(o),e.appendChild(n)}else console.error("Target <ul> element not found")}()})();