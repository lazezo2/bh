// Page Post js -->

		  // 1. share build function

share_build_status = false;  
function share_build() {
  if(share_build_status) return;
  var container = document.querySelector(".share-container");
  if (!container) return;

//this css removed from template with the below div		
var style_share = document.createElement("style");
style_share.textContent = `.share-container{display:flex;align-items:center;gap:8px;flex-wrap:wrap;position:relative}.share-container .shbtn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:50%;color:#fff;transition:all .3s ease;opacity:0;transform:scale(.5);pointer-events:none;margin-left:-48px;font-size:0}.share-container .shbtn svg{width:20px;height:20px}.share-container .btn-more,.share-container .shbtn.facebook,.share-container .shbtn.twitter,.share-container .shbtn.whatsapp{margin-left:0;opacity:1;transform:scale(1);pointer-events:auto}.share-container .shbtn.visible{margin-left:0;opacity:1;transform:scale(1);pointer-events:auto}.share-container .btn-more{background:#555;color:#fff;cursor:pointer;width:40px;height:40px;border-radius:50%;border:none;font-size:22px;line-height:1;display:flex;align-items:center;justify-content:center;transition:transform .3s ease}.share-container .btn-more.active{transform:rotate(180deg)}.shbtn.facebook{background:#1877f2}.shbtn.whatsapp{background:#25d366}.shbtn.twitter{background:#1da1f2}.shbtn.telegram{background:#08c}.shbtn.youtube{background:red}.shbtn.pinterest{background:#e60023}.shbtn.linkedin{background:#0077b5}.shbtn.line{background:#00b900}.shbtn.email{background:#888}.shbtn.reddit{background:#ff4500}.shbtn.print{background:#555}@media (max-width:640px){.share-container{gap:6px}.share-container .shbtn{width:36px;height:36px;margin-left:-42px}.share-container .shbtn svg{width:18px;height:18px}.share-container .btn-more{width:36px;height:36px;font-size:20px}}@media (max-width:320px){.share-container{gap:4px}.share-container .shbtn{width:32px;height:32px;margin-left:-38px}.share-container .shbtn svg{width:16px;height:16px}.share-container .btn-more{width:32px;height:32px;font-size:18px}}`;
document.head.appendChild(style_share);

  // رابط الصفحة والعنوان
  var pageUrl = encodeURIComponent(window.location.href);
  var pageTitle = encodeURIComponent(document.title);

  // الأزرار
  var buttonsHTML = `
    <a aria-label="Facebook" class="shbtn facebook" target="_blank"
       href="https://www.facebook.com/sharer/sharer.php?u=${pageUrl}">
       <svg><use href="#svg-facebook"></use></svg>
    </a>
    <a aria-label="Whatsapp" class="shbtn whatsapp" target="_blank"
       href="https://api.whatsapp.com/send?text=${pageTitle}%20${pageUrl}">
       <svg><use href="#svg-whatsapp"></use></svg>
    </a>
    <a aria-label="Twitter" class="shbtn twitter" target="_blank"
       href="https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}">
       <svg><use href="#svg-twitter"></use></svg>
    </a>
    <a aria-label="Telegram" class="shbtn telegram" target="_blank"
       href="https://t.me/share/url?url=${pageUrl}&text=${pageTitle}">
       <svg><use href="#svg-telegram"></use></svg>
    </a>
    <a aria-label="YouTube" class="shbtn youtube" target="_blank"
       href="https://www.youtube.com/">
       <svg><use href="#svg-youtube"></use></svg>
    </a>
    <a aria-label="Pinterest" class="shbtn pinterest" target="_blank"
       href="https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${pageTitle}">
       <svg><use href="#svg-pinterest"></use></svg>
    </a>
    <a aria-label="LinkedIn" class="shbtn linkedin" target="_blank"
       href="https://www.linkedin.com/shareArticle?mini=true&url=${pageUrl}&title=${pageTitle}">
       <svg><use href="#svg-linkedin"></use></svg>
    </a>
    <a aria-label="Line" class="shbtn line" target="_blank"
       href="https://social-plugins.line.me/lineit/share?url=${pageUrl}">
       <svg><use href="#svg-line"></use></svg>
    </a>
    <a aria-label="Email" class="shbtn email" target="_blank"
       href="mailto:?subject=${pageTitle}&body=${pageUrl}">
       <svg><use href="#svg-email"></use></svg>
    </a>
    <a aria-label="Reddit" class="shbtn reddit" target="_blank"
       href="https://www.reddit.com/submit?url=${pageUrl}&title=${pageTitle}">
       <svg><use href="#svg-reddit"></use></svg>
    </a>
    <a aria-label="Print" class="shbtn print" href="javascript:window.print()">
       <svg><use href="#svg-print"></use></svg>
    </a>
    <button aria-label = 'المزيد من مواقع المشاركة' class="btn-more">+</button>
  `;
  
  container.innerHTML = buttonsHTML;
  share_build_status = true;

  var btnMore = container.querySelector(".btn-more");
  var hiddenBtns = Array.from(container.querySelectorAll(".shbtn")).slice(3); // فيسبوك + 2 أزرار ظاهرين

  let expanded = false;

  btnMore.addEventListener("click", () => {
    expanded = !expanded;
    btnMore.classList.toggle("active");
    btnMore.textContent = expanded ? "−" : "+";

    if (expanded) {
      hiddenBtns.forEach((btn, i) => {
        setTimeout(() => btn.classList.add("visible"), i * 100);
      });
    } else {
      hiddenBtns.reverse().forEach((btn, i) => {
        setTimeout(() => btn.classList.remove("visible"), i * 100);
      });
      hiddenBtns.reverse();
    }
  });
  
  
 } 
 
 
 
        // 2. post setting build
		setting_build_status = false;
		function setting_build(){
		if (setting_build_status) return;
		var postBody = document.querySelector(".article-body");

  // Reset styles
  function resetStyles() {
    document.querySelectorAll(".article-body *").forEach(el => el.removeAttribute("style"));
  }

  // ---- Font Size ----
  let fntBox = document.querySelector(".cs-font"),
      fntNum = fntBox.querySelector(".cs-current span"),
      fntSize = parseInt(fntNum.innerText),
      fntAdd = fntBox.querySelector(".cs-add"),
      fntMin = fntBox.querySelector(".cs-min");

  fntAdd.addEventListener("click", () => {
    resetStyles();
    if (fntSize < 29) {
      fntSize++;
      postBody.style.fontSize = fntSize + "px";
      fntNum.innerText = fntSize;
      localStorage.setItem("postFontSize", fntSize);
      fntMin.classList.remove("enf");
    } else fntAdd.classList.add("enf");
  });

  fntMin.addEventListener("click", () => {
    resetStyles();
    if (fntSize > 14) {
      fntSize--;
      postBody.style.fontSize = fntSize + "px";
      fntNum.innerText = fntSize;
      localStorage.setItem("postFontSize", fntSize);
      fntAdd.classList.remove("enf");
    } else fntMin.classList.add("enf");
  });

  // ---- Line Height ----
  let lnBox = document.querySelector(".cs-line"),
      lnNum = lnBox.querySelector(".cs-current span"),
      lnSize = parseFloat(lnNum.innerText),
      lnAdd = lnBox.querySelector(".cs-add"),
      lnMin = lnBox.querySelector(".cs-min");

  lnAdd.addEventListener("click", () => {
    if (lnSize < 4) {
      lnSize++;
      postBody.style.lineHeight = lnSize + "em";
      lnNum.innerText = lnSize;
      localStorage.setItem("postLineHeight", lnSize);
      lnMin.classList.remove("enf");
    } else lnAdd.classList.add("enf");
  });

  lnMin.addEventListener("click", () => {
    if (lnSize > 2) {
      lnSize--;
      postBody.style.lineHeight = lnSize + "em";
      lnNum.innerText = lnSize;
      localStorage.setItem("postLineHeight", lnSize);
      lnAdd.classList.remove("enf");
    } else lnMin.classList.add("enf");
  });
	setting_build_status = true;	
		}
 
 
       // 3. areacode
       codebox_build_status = false;
       function codebox_build(){
          if (codebox_build_status) return;
          if (document.querySelector(".article-body .areacode, .article-body pre, .article-body code")) {
          if (codebox =="3px")
          //loadPrism
          {
          function loadPrism(){const e=document.createElement("link");e.rel="stylesheet",e.href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css",document.head.appendChild(e);const o=document.createElement("script");o.src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js",o.onload=function(){const e=document.createElement("script");e.src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js",document.head.appendChild(e)},document.head.appendChild(o);var t=document.createElement("style");t.textContent='.areacode{direction:ltr;text-align:left}.areacode{background:#272822;color:#f8f8f2;padding:10px;border-radius:8px;font-family:monospace;font-size:14px;overflow-x:auto;cursor:pointer}pre{background:#2d2d2d;color:#ccc;padding:15px;border-radius:8px;overflow-x:auto;font-size:14px;line-height:1.5;margin:15px 0;width:100%;box-sizing:border-box}pre code{display:block;width:100%;white-space:pre;font-family:"Fira Code",monospace}pre,pre code{direction:ltr;text-align:left}',document.head.appendChild(t)}
          loadPrism();
          //fix background
          var style_share = document.createElement("style");
          style_share.textContent = `code[class*=language-],pre[class*=language-]{color:#f8f8f2;background:#000;text-shadow:none;font-family:Consolas,Monaco,'Andale Mono','Ubuntu Mono',monospace;font-size:.9em}.token.cdata,.token.comment,.token.doctype,.token.prolog{color:#6272a4}.token.punctuation{color:#f8f8f2}.token.constant,.token.deleted,.token.property,.token.symbol,.token.tag{color:#ff79c6}.token.boolean,.token.number{color:#bd93f9}.token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string{color:#50fa7b}.token.entity,.token.operator,.token.url{color:#f8f8f2}.token.keyword{color:#ff79c6}.token.function{color:#50fa7b}.token.variable{color:#f8f8f2}`;
          document.head.appendChild(style_share);
          }

          if (codebox !="1px")
          {
          //codebox =2 or 3
          //copy code box
          //
          !function () {
              function copyText(e) {
                  return e
                      ? navigator.clipboard && navigator.clipboard.writeText
                          ? navigator.clipboard.writeText(e)
                          : (function (e) {
                              return new Promise(((t, n) => {
                                  try {
                                      const o = document.createElement("textarea");
                                      o.value = e;
                                      o.setAttribute("readonly", "");
                                      o.style.position = "absolute";
                                      o.style.left = "-9999px";
                                      document.body.appendChild(o);
                                      o.select();
                                      const c = document.execCommand("copy");
                                      document.body.removeChild(o);
                                      c ? t() : n(new Error("execCommand returned false"));
                                  } catch (e) {
                                      n(e);
                                  }
                              }))
                          })(e)
                      : Promise.reject(new Error("لا يوجد نص لنسخه"));
              }

              let timer = null;

              function showNotice(msg = "✅ تم النسخ", delay = 2000) {
                  const o = (function () {
                      let e = document.getElementById("copyNotice");
                      if (e) return e;
                      e = document.createElement("div");
                      e.id = "copyNotice";
                      e.setAttribute("aria-live", "polite");
                      e.textContent = "✅ تم النسخ";
                      document.body.appendChild(e);

                      if (!document.getElementById("copyNoticeStyle")) {
                          const style = document.createElement("style");
                          style.id = "copyNoticeStyle";
                          style.textContent = `
                  #copyNotice {
                    position: fixed;
                    top: 20px;
                    right: -220px;
                    background: rgba(0,0,0,0.85);
                    color: #fff;
                    padding: 10px 14px;
                    border-radius: 8px;
                    font-size: 14px;
                    box-shadow: 0 6px 18px rgba(0,0,0,0.35);
                    transition: right 0.33s ease, opacity 0.33s ease;
                    opacity: 0;
                    z-index: 99999;
                    pointer-events: none;
                  }
                  #copyNotice.show {
                    right: 20px;
                    opacity: 1;
                  }
                  .areacode, pre, code { cursor: pointer; }
                `;
                          document.head.appendChild(style);
                      }
                      return e;
                  })();
                  o.textContent = msg;
                  o.classList.add("show");
                  timer && clearTimeout(timer);
                  timer = setTimeout(() => {
                      o.classList.remove("show");
                      timer = null;
                  }, delay);
              }

              document.addEventListener("click", function (t) {
                  const target =
                      t.target.closest(".areacode, pre, code");

                  if (!target) return;
                  codebox_build_status = true;
                  // استبعاد اللي جوّه areacode أو pre أو code تاني
                  if (
                      target.closest(".areacode") && !target.classList.contains("areacode") ||
                      target.closest("pre") && target.tagName.toLowerCase() !== "pre" ||
                      target.closest("code") && target.tagName.toLowerCase() !== "code"
                  ) {
                      return;
                  }

                  t.preventDefault();
                  const content = target.innerText.trim();
                  console.log("[debug] copy target:", target.tagName, "len:", content.length);

                  copyText(content)
                      .then(() => {
                          console.log("[debug] copy ok");
                          showNotice("✅ تم النسخ");
                      })
                      .catch(err => {
                          console.error("[debug] copy failed:", err);
                          showNotice("⚠️ فشل النسخ — افتح الكونسول للمزيد");
                      });
              });

              navigator.clipboard && navigator.clipboard.writeText ||
                  console.info("معلومة: متصفحك لا يدعم navigator.clipboard.writeText؛ fallback (execCommand) هيشتغل.");
          }();
          //
          }
          }
          }

          
		   // 4. table of content
		   buildTOC_status = false;
		   function buildTOC() {
  		   if(buildTOC_status) return;
  		   const post = document.querySelector(".float-holder");
  		   var temptoc = document.querySelector(".toc-box");
		   if (post && !temptoc) {
		   // create table div!
 		    const tocwrapper = document.createElement("div");
 		    tocwrapper.innerHTML = `
   		    <div class="toc-box">
     		    <div class="toc-header tno closed">الفهرس <span class="toc-icon">▼</span></div>
    		     <ul style="display: none;"></ul>
    		   </div>`;
  
  		   post.insertBefore(tocwrapper.firstElementChild, post.firstChild);
		   }

  		   if (!post) return;

 		    //const headings = post.querySelectorAll("h2:not(.post-title), h3:not(.post-title), h4:not(.post-title)");
 		    //const headings = post.querySelectorAll("h2:not(.post-title):not(.areacode):not(pre *), h3:not(.post-title):not(.areacode):not(pre *), h4:not(.post-title):not(.areacode):not(pre *)");
 		    const headings = post.querySelectorAll("h2:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *), h3:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *), h4:not(.HTML *):not(.areacode *):not(code *):not(pre code *):not(.randomposts *)");
 		    if (headings.length === 0) return;

 		    const listRoot = document.querySelector(".toc-box ul");
 		    listRoot.innerHTML = "";

  
 		    // Counters
 		    let h2Count = 0, h3Count = 0, h4Count = 0;

 		    let currentUl2 = null; // for H3
 		    let currentUl3 = null; // for H4

 		    headings.forEach((h, i) => {
  		     const tag = h.tagName.toLowerCase();
  		     const id = "toc-point-" + i;
			 //remove digits and dot in begain of title
			 const htext = h.textContent
             .replace(/\n/g, '')             // يشيل السطر الجديد
             .replace(/^[\d.\-/*_ ]+/, '');  // يشيل الأرقام والنقط والرموز لو فى أول الجملة
  		     
			 h.setAttribute("id", id);

   		    if (tag === "h2") {
   		      h2Count++;
    		     h3Count = 0;
    		     h4Count = 0;

    		     const li = document.createElement("li");
    		     li.textContent = h2Count + " ";
    		     li.innerHTML += `<a class='tno' href="#${id}">${htext}</a>`;
    		     listRoot.appendChild(li);

    		     currentUl2 = document.createElement("ul");
    		     li.appendChild(currentUl2);

   		    } else if (tag === "h3" && currentUl2) {
   		      h3Count++;
    		     h4Count = 0;

   		      const li = document.createElement("li");
   		      li.textContent = h2Count + "." + h3Count + " ";
   		      li.innerHTML += `<a class='tno' href="#${id}">${htext}</a>`;
   		      currentUl2.appendChild(li);

   		      currentUl3 = document.createElement("ul");
   		      li.appendChild(currentUl3);

 		      } else if (tag === "h4" && currentUl3) {
  		       h4Count++;

   		      const li = document.createElement("li");
   		      li.textContent = h2Count + "." + h3Count + "." + h4Count + " ";
   		      li.innerHTML += `<a class='tno' href="#${id}">${htext}</a>`;
    		     currentUl3.appendChild(li);
  		     }
		   	buildTOC_status = true;
 		    });
		   }
		   
		   
		   // 5. comment function
		   function com(){
	 if (isPost || isPage){
	 var iframe = document.getElementById('comment-editor1');
     if (iframe){
     
         // غيّر الـ id بعد تحميل الـ iframe
         iframe.id = 'comment-editor';
         //console.log("ID changed to comment-editor");
	     //to return iframe to top again, because if press replay on certain comment ifframe move there!
		 document.querySelectorAll('.comment-reply').forEach(function(el) {el.addEventListener('click', function() {
		 
         var iframe = document.getElementById('comment-editor');
         if(iframe) { 
			 // نحذف iframe من مكانه الحالي
             iframe.parentNode.removeChild(iframe);
             // نضيفه بعد العنصر اللي ضغط عليه المستخدم
             this.insertAdjacentElement('afterend', iframe);
             console.log("Iframe moved after comment-post-message");
			 
			 //scroll and focus
			 var iframe = document.getElementById('comment-editor');
			 if(iframe){
			 console.log("iframe focus");
 			 iframe.scrollIntoView({
			    behavior: "smooth", // يخليها ناعمة
 			   block: "center"     // يخلي الـ iframe في منتصف الشاشة (ممكن تخليها start أو end)
 			 });
  			iframe.focus(); // يحط الفوكس عليه كعنصر
			}
			 //end of scroll and focus
         }
       });
	 });
	 
     
     //load native js
	 
      (function() {
         console.log("adding 1167892209-comment_from_post_iframe.js");
		 var s = document.createElement("script");
         s.src = "https://www.blogger.com/static/v1/jsbin/1167892209-comment_from_post_iframe.js";
         s.async = true;
         document.head.appendChild(s);
       })();
	   
	   
	   console.log("iframe loadded, adding 1167892209-comment_from_post_iframe.js");
	   
	   //fix native js not work probably after remove of blogger js
	   //add sub comment numper
//click toggle expanded / collapsed class for sub comments

  //var commentHolder = document.getElementById('comment-holder');
  const replyLinks = document.querySelectorAll(
    'div.comment-thread.inline-thread:not(.hidden) span.thread-count a'
  );

  replyLinks.forEach(link => {
    const parentDiv = link.closest('div.comment-thread.inline-thread');
    const replies = parentDiv.querySelectorAll('.comment');
    link.textContent = `الردود (${replies.length})`; // ← حساب العدد

    link.addEventListener('click', e => {
      e.preventDefault();

      const toggle = parentDiv.querySelector('span.thread-toggle');
      if (toggle) {
        toggle.classList.toggle('thread-collapsed');
        toggle.classList.toggle('thread-expanded');
      }

      const replySection = parentDiv.querySelector('.thread-chrome');
      if (replySection) replySection.classList.toggle('hidden');
    });
  });



//show remove button only if comment id in url
  var url = window.location.href;

  // نتحقق إن الرابط فيه ?sc= و #
  if ((url.includes('?sc=') || url.includes('?showComment=')) && url.includes('#')) {
    // ناخد القيمة بعد الشباك
    var commentId = url.split('#')[1];
    var commentHolder = document.getElementById('comment-holder');

    if (commentHolder && commentId) {
      // نبحث داخل comment-holder فقط
      var commentEl = commentHolder.querySelector(`#${commentId}`);

      if (commentEl) {  
          commentEl.classList.add('highlight-comment');
        
      }
    }
  }
  
  //in sub comment li it have div that cause err in pagespeed
 
  
	   //end fix
       
	   }
	   }
	   }
// Page Post js -->	   