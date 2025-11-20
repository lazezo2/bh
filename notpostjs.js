// Home / search / label js -->

		 // 1. load more func

function LMore() {
  //لو olderLink ما اتحدّثش (أو ما اتشالش href) بعد أول fetch، الضغط التاني هيجيب نفس الصفحة أو جزء منها — فتظهر لك بوستات متأخرة أو مكررة.
  const olderLink = document.querySelector(".older-link");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const loadMoreLoading = document.getElementById("loadMoreLoading"); // اختياري: لو عايز أيقونة لودينج داخل/فوق الزر
  const postsContainer = document.querySelector(".blog-posts");

  if (!loadMoreBtn) return;

  let isLoading = false;

  // مساعدة لعمل disable سواء كان button أو a
  function disableBtn() {
    if (loadMoreBtn.tagName.toLowerCase() === 'button') {
      loadMoreBtn.disabled = true;
    } else {
      loadMoreBtn.classList.add('disabled');
      loadMoreBtn.setAttribute('aria-disabled','true');
      // لو هو رابط، نمنع الفعل بحذف href مؤقتاً (نخزنها لو احتجنا)
      if (loadMoreBtn.dataset.origHref === undefined && loadMoreBtn.getAttribute('href')) {
        loadMoreBtn.dataset.origHref = loadMoreBtn.getAttribute('href');
      }
      loadMoreBtn.removeAttribute('href');
    }
  }
  function enableBtn() {
    if (loadMoreBtn.tagName.toLowerCase() === 'button') {
      loadMoreBtn.disabled = false;
    } else {
      loadMoreBtn.classList.remove('disabled');
      loadMoreBtn.removeAttribute('aria-disabled');
      if (loadMoreBtn.dataset.origHref) {
        loadMoreBtn.setAttribute('href', loadMoreBtn.dataset.origHref);
        delete loadMoreBtn.dataset.origHref;
      }
    }
  }

  function showLoading() {
    isLoading = true;
    if (loadMoreLoading) {
      loadMoreLoading.style.display = 'block';
    } else {
      loadMoreBtn.dataset.origText = loadMoreBtn.textContent;
      loadMoreBtn.textContent = 'جاري التحميل...';
    }
    disableBtn();
  }

  function hideLoading() {
    isLoading = false;
    if (loadMoreLoading) loadMoreLoading.style.display = 'none';
    if (loadMoreBtn.dataset.origText) {
      loadMoreBtn.textContent = loadMoreBtn.dataset.origText;
      delete loadMoreBtn.dataset.origText;
    }
    enableBtn();
  }

  function setNoMore() {
    // إظهار رسالة نهائية داخل الزر وتعطيله نهائياً
    if (loadMoreLoading) loadMoreLoading.style.display = 'none';
    document.getElementById("loadMoreEnd").style.display = 'block';
	loadMoreBtn.textContent = 'لا يوجد بوستات جديدة';
    if (loadMoreBtn.tagName.toLowerCase() === 'button') {
      loadMoreBtn.disabled = true;
    } else {
      loadMoreBtn.classList.add('disabled');
      loadMoreBtn.setAttribute('aria-disabled','true');
      loadMoreBtn.removeAttribute('href'); // نضمن أنه مش قابل للنقر
    }
    // نلغي الlistener بتاع الكليك (اختياري)
    loadMoreBtn.replaceWith(loadMoreBtn.cloneNode(true));
  }

  function handleError() {
    if (loadMoreLoading) loadMoreLoading.style.display = 'none';
    loadMoreBtn.textContent = 'حدث خطأ، حاول مرة أخرى';
    enableBtn();
  }

  function fetchMore() {
    if (isLoading) return;
    const href = olderLink ? olderLink.getAttribute('href') : null;
    if (!href) {
      setNoMore();
      return;
    }

    showLoading();

    fetch(href)
      .then(res => res.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const newPosts = doc.querySelectorAll('.blog-posts .article-post');
        const newOlder = doc.querySelector('.older-link');

        // append new posts (لو في)
        if (newPosts.length > 0) {
          newPosts.forEach(post => postsContainer.appendChild(post));
        }

        // تحديث رابط olderLink أو انتهاء البوستات
        if (newOlder && newOlder.getAttribute('href')) {
          olderLink.setAttribute('href', newOlder.getAttribute('href'));
          hideLoading(); // نرجع الزر لو في المزيد
        } else {
          // انتهت البوستات
          setNoMore();
        }
      })
      .catch(err => {
        console.error(err);
        handleError();
      });
  }

  // لو الزر عنصر a، نمنع السلوك الافتراضي
  loadMoreBtn.addEventListener('click', function (e) {
    if (loadMoreBtn.tagName.toLowerCase() === 'a') e.preventDefault();
    fetchMore();
  });

  // حالة ابتدائية: لو مفيش older link
  if (!olderLink || !olderLink.getAttribute('href')) {
    setNoMore();
  }
}
// Home / search / label js -->