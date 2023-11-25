import{a as y,i as n,S as h}from"./assets/vendor-6c622a3d.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();async function b(s,t,r){const i="https://pixabay.com/api/",e="40892819-7576baf715197fa05f261aab0";return(await y.get(`${i}`,{params:{key:`${e}`,q:`${s}`,image_type:"photo",orientation:"horizontal",safesearch:"true",page:`${t}`,per_page:`${r}`}})).data}n.settings({position:"bottomCenter",timeout:2500});const f=40,$=document.querySelector(".search-form"),m=document.querySelector(".gallery"),v=document.querySelector(".js-observer"),w=new h(".gallery a"),c=new IntersectionObserver(E,{rootMargin:"1000px"});$.addEventListener("submit",L);let l,u;function L(s){s.preventDefault();const t=s.currentTarget.elements.searchQuery.value.trim().replace(/\s+/g,"+");if(!t){n.info({message:"Please enter your search query."});return}if(t===u){n.info({message:"For a new search, please enter another search query."});return}l=0,u=t,m.innerHTML="",c.observe(v)}async function E(s){s.forEach(async t=>{if(t.isIntersecting){l+=1;const r=await S(u,l);r&&(m.insertAdjacentHTML("beforeend",r),w.refresh())}})}async function S(s,t=1){try{const r=await b(s,t,f);return r.totalHits?(t===1&&n.success({message:`Hooray! We found ${r.totalHits} images.`}),r.totalHits<=t*f&&(n.info({message:"All found images are displayed."}),c.disconnect()),r.hits.map(({webformatURL:i,largeImageURL:e,tags:o,likes:a,views:d,comments:p,downloads:g})=>`
                <a
                    class="photo-card"
                    href="${e}"
    
                >
                    <img src="${i}" alt="${o}" loading="lazy" width="300" height="200" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b> ${a}
                        </p>
                        <p class="info-item">
                            <b>Views</b> ${d}
                        </p>
                        <p class="info-item">
                            <b>Comments</b> ${p}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b> ${g}
                        </p>
                    </div>
                </a>`).join("")):(n.error({message:"Sorry, there are no images matching your search query. Please try again.",timeout:5e3}),c.disconnect(),"")}catch(r){console.dir(r),n.error({message:r.message}),c.disconnect()}}
//# sourceMappingURL=commonHelpers.js.map
