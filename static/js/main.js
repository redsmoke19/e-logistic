"use strict";!function(){var t=document.querySelector("body"),a=!0,e={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return e.Android()||e.BlackBerry()||e.iOS()||e.Opera()||e.Windows()}};function i(e){(document.querySelector("body").classList.contains("_lock")?function(e){var t=document.querySelector("body");{var i;a&&(i=document.querySelectorAll("._lp"),setTimeout(function(){for(var e=0;e<i.length;e++)i[e].style.paddingRight="0px";t.style.paddingRight="0px",t.classList.remove("_lock")},e),a=!1,setTimeout(function(){a=!0},e))}}:function(e){var t=document.querySelector("body");if(a){for(var i=document.querySelectorAll("._lp"),n=0;n<i.length;n++)i[n].style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px";t.style.paddingRight=window.innerWidth-document.querySelector(".wrapper").offsetWidth+"px",t.classList.add("_lock"),a=!1,setTimeout(function(){a=!0},e)}})(e)}function n(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))}var r,s,o,l,c,d,u,p,f,v,m,y,h,g,b,_,w,A,k,L;function S(e){this.type=e}function q(){var e;e=e||setTimeout(function(){!(e=null)===w.matches?(void 0!==b&&b.destroy(!0,!0),void 0!==_&&_.destroy(!0,!0)):!1===w.matches&&L()},100)}S.prototype.init=function(){var a=this,r=this;this.оbjects=[],this.daClassname="_dynamic_adapt_",this.nodes=document.querySelectorAll("[data-da]");for(var e=0;e<this.nodes.length;e++){var t=this.nodes[e],i=t.dataset.da.trim().split(","),n={};n.element=t,n.parent=t.parentNode,n.destination=document.querySelector(i[0].trim()),n.breakpoint=i[1]?i[1].trim():"767",n.place=i[2]?i[2].trim():"last",n.index=this.indexInParent(n.parent,n.element),this.оbjects.push(n)}this.arraySort(this.оbjects),this.mediaQueries=Array.prototype.map.call(this.оbjects,function(e){return"("+this.type+"-width: "+e.breakpoint+"px),"+e.breakpoint},this),this.mediaQueries=Array.prototype.filter.call(this.mediaQueries,function(e,t,i){return Array.prototype.indexOf.call(i,e)===t});for(var s=0;s<this.mediaQueries.length;s++)!function(e){var e=a.mediaQueries[e],e=String.prototype.split.call(e,","),t=window.matchMedia(e[0]),i=e[1],n=Array.prototype.filter.call(a.оbjects,function(e){return e.breakpoint===i});t.addListener(function(){r.mediaHandler(t,n)}),a.mediaHandler(t,n)}(s)},S.prototype.mediaHandler=function(e,t){if(e.matches)for(var i=0;i<t.length;i++){var n=t[i];n.index=this.indexInParent(n.parent,n.element),this.moveTo(n.place,n.element,n.destination)}else for(var a=0;a<t.length;a++){var r=t[a];r.element.classList.contains(this.daClassname)&&this.moveBack(r.parent,r.element,r.index)}},S.prototype.moveTo=function(e,t,i){t.classList.add(this.daClassname),"last"===e||e>=i.children.length?i.insertAdjacentElement("beforeend",t):"first"!==e?i.children[e].insertAdjacentElement("beforebegin",t):i.insertAdjacentElement("afterbegin",t)},S.prototype.moveBack=function(e,t,i){t.classList.remove(this.daClassname),void 0!==e.children[i]?e.children[i].insertAdjacentElement("beforebegin",t):e.insertAdjacentElement("beforeend",t)},S.prototype.indexInParent=function(e,t){e=Array.prototype.slice.call(e.children);return Array.prototype.indexOf.call(e,t)},S.prototype.arraySort=function(e){"max"===this.type?Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?-1:"last"===e.place||"first"===t.place?1:e.place-t.place:e.breakpoint-t.breakpoint}):Array.prototype.sort.call(e,function(e,t){return e.breakpoint===t.breakpoint?e.place===t.place?0:"first"===e.place||"last"===t.place?1:"last"===e.place||"first"===t.place?-1:t.place-e.place:t.breakpoint-e.breakpoint})},new S("max").init(),n(),s=window.matchMedia("(min-width: 1280px)"),o=window.matchMedia("(min-width: 768px)"),l=document.querySelector(".nav"),c=document.querySelector(".sandwich"),d=document.querySelectorAll(".nav__sub-list"),s.matches,o.matches,window.addEventListener("resize",function(){r=r||setTimeout(function(){r=null,function(){n(),l.classList.contains("_active")&&(l.classList.remove("_active"),c.classList.remove("_active"),t.classList.remove("_overlay"));0<d.length&&d.forEach(function(e){e.classList.remove("_active")});s.matches}()},88)},!1),e.any()?(t.classList.add("touch"),u=document.querySelectorAll(".nav__arrow"),p=document.querySelectorAll(".nav__sub-list"),u.forEach(function(e){var t=e.parentElement.nextElementSibling;e.addEventListener("click",function(){t.classList.contains("_active")||p.forEach(function(e){e.classList.contains("_active")&&e.classList.remove("_active")}),t.classList.toggle("_active")})})):t.classList.add("mouse"),f=document.querySelector(".sandwich"),v=document.querySelector(".nav"),m=document.querySelectorAll(".nav__sub-list"),null!=f&&(f.addEventListener("click",function(e){a&&(i(500),f.classList.toggle("_active"),v.classList.toggle("_active"),t.classList.toggle("_overlay"))}),document.addEventListener("click",function(e){v.classList.contains("_active")&&(e.target.closest("._active")||(i(500),v.classList.remove("_active"),f.classList.remove("_active"),t.classList.remove("_overlay"),m.forEach(function(e){e.classList.remove("_active")})))})),y=document.querySelectorAll(".need-validate"),Array.prototype.slice.call(y).forEach(function(t){t.addEventListener("submit",function(e){t.checkValidity()||(e.preventDefault(),e.stopPropagation()),t.classList.add("was-validated")},!1)}),h=document.querySelector(".header-top"),g=document.querySelector(".header__placeholder"),h&&document.addEventListener("scroll",function(e){0<window.pageYOffset?(h.style.position="fixed",g.style.display="block"):(h.style.position="relative",g.style.display="none")}),w=window.matchMedia("(min-width: 1280px)"),A=document.querySelector(".certificates__slider"),k=document.querySelector(".delivery-russia-advantages__slider"),L=function(){A&&(b=new Swiper(".certificates__slider",{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,breakpoints:{768:{slidesPerView:2,spaceBetween:30,slidesOffsetBefore:0,slidesOffsetAfter:0}},pagination:{el:".certificates-pagination",type:"bullets",bulletClass:"certificates-pagination__bullet",bulletActiveClass:"certificates-pagination__bullet--active",clickable:!0}})),k&&(_=new Swiper(".delivery-russia-advantages__slider",{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,breakpoints:{768:{slidesPerView:2,spaceBetween:30,slidesOffsetBefore:0,slidesOffsetAfter:0}},pagination:{el:".delivery-russia-advantages-pagination",type:"bullets",bulletClass:"delivery-russia-advantages-pagination__bullet",bulletActiveClass:"delivery-russia-advantages-pagination__bullet--active",clickable:!0}}))},document.querySelector(".reviews-slider")&&new Swiper(".reviews-slider",{direction:"horizontal",grabCursor:!0,preventClicks:!0,preventClicksPropagation:!0,slidesPerView:1,spaceBetween:20,slidesOffsetBefore:0,slidesOffsetAfter:0,navigation:{nextEl:".reviews-slider__button--next",prevEl:".reviews-slider__button--prev"},pagination:{el:".reviews-pagination",type:"bullets",bulletClass:"reviews-pagination__bullet",bulletActiveClass:"reviews-pagination__bullet--active",clickable:!0},breakpoints:{768:{slidesPerView:2},1280:{slidesPerView:"auto",spaceBetween:40,slidesOffsetBefore:0,slidesOffsetAfter:0}}}),w.addListener(q),q()}();