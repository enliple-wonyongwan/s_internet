// common ui
// tab
const bindTabEvents = ($tabs, $tabBtn, $panels) => {
  const tabKey = $tabBtn.dataset.tab;

  const $tabBtns = $tabs.querySelectorAll('[data-tab]');
  const $tabPanels = $panels.querySelectorAll('[data-panel]');

  $tabBtns.forEach(($btn) => {
    $btn.classList.remove('card__tab--active');
  });

  $tabPanels.forEach(($panel) => {
    $panel.classList.remove('card__tab-panel--active');
  });

  $tabBtn.classList.add('card__tab--active');

  const $targetPanel = $panels.querySelector(`[data-panel="${CSS.escape(tabKey)}"]`);

  if ($targetPanel) {
    $targetPanel.classList.add('card__tab-panel--active');
  }
};

(() => {
  const $tabsWraps = document.querySelectorAll('[data-tabs-wrap]');
  if (!$tabsWraps.length) return;

  $tabsWraps.forEach(($tabsWrap) => {
    const $tabs = $tabsWrap.querySelector('[data-tabs]');
    const $tabBtns = $tabsWrap.querySelectorAll('[data-tab]');
    const $panels = $tabsWrap.querySelector('[data-panels]');
    // bind
    $tabBtns.forEach(($tabBtn) => {
      $tabBtn.addEventListener('click', () => {
        bindTabEvents($tabs, $tabBtn, $panels);
      });
    });
  });
})();

/* nav */
const navLinks = document.querySelectorAll('.nav_wrap a');

navLinks.forEach((link) => {
  link.addEventListener('click', function (e) {
    navLinks.forEach((el) => el.classList.remove('active'));
    this.classList.add('active');
  });
});

/* 검색어 팝업 */
$('.search_wrap input').on('focus', function () {
  $('.select_active').addClass('select').removeClass('select_active');

  setTimeout(function () {
    $('.search_wrap').addClass('active');
    $('.search_list').show();
  }, 300);
});

$('.wrap').click(function () {
  setTimeout(function () {
    $('.search_wrap').removeClass('active');
    $('.search_list').hide();
  }, 300);
});

/* 클릭 이벤트 전파 방지 */
$('.select, .setting_modal, .box .more_btn, .site_wrap .more_btn, .site_wrap .more_pop, .search_wrap, .search_list').click(function (e) {
  e.stopPropagation();
});

/* 외부 클릭 닫기 */
$('.wrap').click(function () {
  $('.select_active').addClass('select').removeClass('select_active');
  $('.setting_modal, .box .more_btn, .site_wrap .more_btn, .site_wrap .more_pop').removeClass('active');
});

/* 스크롤 드래그 */
const wraps = document.querySelectorAll('.scroll_x');

wraps.forEach((wrap) => {
  let isDown = false;
  let startX;
  let scrollLeft;

  wrap.addEventListener('mousedown', (e) => {
    isDown = true;
    wrap.classList.add('dragging');
    startX = e.pageX - wrap.offsetLeft;
    scrollLeft = wrap.scrollLeft;
  });

  wrap.addEventListener('mouseleave', () => {
    isDown = false;
    wrap.classList.remove('dragging');
  });

  wrap.addEventListener('mouseup', () => {
    isDown = false;
    wrap.classList.remove('dragging');
  });

  wrap.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wrap.offsetLeft;
    const walk = (x - startX) * 1;
    wrap.scrollLeft = scrollLeft - walk;
  });
});

/* 테마 버튼 */
const temaButtons = document.querySelectorAll('.btn_tabs button');

temaButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    temaButtons.forEach((b) => b.classList.remove('active'));

    btn.classList.add('active');
  });
});

/* 포털 사이트 선택 변경 */
$('.select button').click(function () {
  const isOpen = $(this).parent().hasClass('select_active');

  if (isOpen) {
    $(this).parent().removeClass('select_active').addClass('select');
  } else {
    $(this).parent().removeClass('select').addClass('select_active');
  }

  $(this).parent().find('button').removeClass('select_btn');
  $(this).addClass('select_btn').prependTo($(this).parent());

  const btnClasses = $(this).attr('class').split(' ');
  const targetClass = btnClasses.filter((c) => c !== 'select_btn')[0];

  $('.wrap').removeClass('google naver daum').addClass(targetClass);
});

/* 메뉴바 더보기 모달 */
$('.box .more_btn').click(function () {
  $(this).toggleClass('active');
  $('.setting_modal').toggleClass('active');
});

/* 메뉴바 설정 모달 */
$('.box .setting_btn').click(function () {
  $('.modal_wrap3').css('display', 'flex');
});

/* 더보기 버튼(수정/삭제 ) */
$('.site_wrap .more_btn').click(function () {
  let isActive = $(this).hasClass('active');

  $('.site_wrap .more_btn, .site_wrap .more_pop').removeClass('active');

  if (!isActive) {
    $(this).addClass('active');
    $(this).siblings('.more_pop').addClass('active');
  }
});

/* 즐겨찾기 추가 */
$('.go').click(function () {
  $('.modal_wrap1').css('display', 'flex');
});

/* 즐겨찾기 수정 */
$('.more_pop .modify_btn').click(function () {
  $('.modal_wrap2').css('display', 'flex');
  $('.more_btn, .more_pop').removeClass('active');
});

/* 모달 닫기 */
$('.modal_wrap .close_btn, .modal_wrap .cancle_btn').click(function () {
  $('.modal_wrap').css('display', 'none');
});

/* 여러 개 탭 */
$('.tab_wrap').each(function () {
  const $tabWrap = $(this);

  $tabWrap.find('button').click(function () {
    $tabWrap.find('button').removeClass('active');
    $(this).addClass('active');
  });

  $tabWrap.find('button').eq(0).trigger('click');
});

$('.pop3 .tab_wrap button').click(function () {
  $('.tabcontent').hide();
  $('.tabcontent').eq($(this).index()).show();
});

$('.pop3 .tab_wrap button').eq(1).trigger('click');

/*슬라이드 */
const swiper1 = new Swiper('.swiper1.swiper', {
  slidesPerView: 'auto',
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  },
});

/* 더보기 버튼 */
$('.search_more_btn').click(function () {
  $(this).toggleClass('active');

  if ($(this).hasClass('active')) {
    $(this).text('접기');
    $('.show').css('display', 'flex');
    $('.hidden').css('display', 'none');
  } else {
    $(this).text('더보기');
    $('.show').css('display', 'none');
    $('.search_head.hidden').css('display', 'flex');
    $('.recent_search.hidden').css('display', 'block');
  }
});

/* 스크롤 효과 */
const searchWrapper = document.querySelector('.search_wrapper');
const headerMask = document.querySelector('.header_mask');
const contentArea = document.querySelector('.content_area');
const siteGroup = document.querySelector('.swiper_group');
const mainBg = document.querySelector('.main_bg');

function updateSearchWrapper() {
  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const threshold = contentArea.offsetTop;

  const progress = Math.min(scrollY / threshold, 1);

  const startTop = -40;
  const endTop = -130;
  const currentTop = startTop - (startTop - endTop) * progress;
  searchWrapper.style.top = `${currentTop}px`;

  const searchRect = searchWrapper.getBoundingClientRect();
  headerMask.style.height = `${searchRect.bottom}px`;

  const ratio = Math.min(scrollY / threshold, 1);
  const currentOpacity = 0.2 + 0.2 * ratio;

  mainBg.style.setProperty('--bg-opacity', currentOpacity);
  headerMask.style.setProperty('--bg-opacity', currentOpacity);

  if (scrollY === 0) {
    siteGroup.classList.remove('hide');
    headerMask.classList.remove('active');
  } else if (scrollY > vh - 630) {
    siteGroup.classList.add('hide');
    headerMask.classList.add('active');
  } else {
    siteGroup.classList.remove('hide');
    headerMask.classList.remove('active');
  }
}

window.addEventListener('load', updateSearchWrapper);
window.addEventListener('scroll', updateSearchWrapper);

/* 즐겨찾기 리스트 */
const swiper0 = new Swiper('.swiper_group > .swiper', {
  slidesPerView: 1,
  spaceBetween: 13,
  loop: false,
  allowTouchMove: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  on: {
    init: function () {
      const slideCount = this.slides.length;

      if (slideCount === 1) {
        const slide = this.slides[0];
        const siteCount = slide.querySelectorAll('.site').length;

        if (siteCount < 12) {
          slide.classList.add('center');
        } else {
          slide.classList.remove('center');
        }

        this.navigation.nextEl.style.display = 'none';
        this.navigation.prevEl.style.display = 'none';
        this.destroy(true, true);
      }
    },
  },
});

/* 이미지 전환 */
const boxes = document.querySelectorAll('.swiper-slide .img_box.fade');

boxes.forEach((box) => {
  const images = box.querySelectorAll('.swiper-slide .img_box .img');
  let current = 0;

  setInterval(() => {
    images[current].classList.remove('active');

    current = (current + 1) % images.length;

    images[current].classList.add('active');
  }, 2000);
});

/* 스크롤 탑 버튼 */
function onScroll() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const btTop = document.querySelector('.bt_top');

  if (scrollTop > 10) {
    btTop.classList.add('show');
  } else {
    btTop.classList.remove('show');
  }
}

function onTopClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

window.addEventListener('scroll', onScroll);
onScroll();
document.querySelector('.bt_top').addEventListener('click', onTopClick);

/* 뉴스 피드 토글 */
const newssetBtn = document.querySelector('.newsset_btn');
const newsPop = document.querySelector('.news_pop');

newssetBtn.addEventListener('click', function () {
  newsPop.classList.toggle('active');
});

/* 뉴스 피드 설정 */
const buttons = document.querySelectorAll('.toggle_btn');

buttons.forEach((button) => {
  button.addEventListener('click', function () {
    this.classList.toggle('active');
  });
});

/* 토스트 팝업 */
const headerBox = document.querySelector('header > .box');
const headerBoxRect = headerBox.getBoundingClientRect();
const tPopCloseRight = document.querySelectorAll('.t_pop_close_right');
if (tPopCloseRight.length > 0) {
  tPopCloseRight.forEach((tPop) => {
    const isScale = tPop.dataset.scale === 'true';
    const tPopRect = tPop.getBoundingClientRect();
    const dx = headerBoxRect.left + headerBoxRect.width / 2 - (tPopRect.left + tPopRect.width / 2);
    const dy = headerBoxRect.top + headerBoxRect.height / 2 - (tPopRect.top + tPopRect.height / 2);

    tPop.style.transition = 'none';
    tPop.style.opacity = '0';
    tPop.style.top = '0';
    tPop.style.transform = 'translate(-50%, -20px)';

    setTimeout(() => {
      tPop.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';
      tPop.style.opacity = '1';
      tPop.style.transform = 'translate(-50%, 50px)';
    }, 30);

    setTimeout(() => {
      if (isScale) {
        tPop.style.transform = `translate(calc(-50% + ${dx}px), 15px) scale(0.6)`;
      } else {
        tPop.style.transform = `translate(calc(-50% + ${dx}px), 15px)`;
      }
      tPop.style.opacity = '0';
      tPop.style.transition = 'transform .3s ease, opacity .3s ease .2s';

      setTimeout(() => {
        tPop.remove();
      }, 800);
    }, 1500);
  });
}

const tPops = document.querySelectorAll('.t_pop');

if (tPops.length > 0) {
  tPops.forEach((tPop) => {
    tPop.style.transition = 'none';
    tPop.style.opacity = '0';
    tPop.style.top = '50px';
    tPop.style.transform = 'translate(-50%, -70px)';

    setTimeout(() => {
      tPop.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      tPop.style.opacity = '1';
      tPop.style.transform = 'translate(-50%, 0)';
    }, 30);

    setTimeout(() => {
      tPop.style.transition = 'transform 0.25s ease-in';
      tPop.style.transform = 'translate(-50%, -150px)';

      setTimeout(() => {
        tPop.remove();
      }, 250);
    }, 2500);
  });
}

/* 적립 팝업 자동 닫기 */
const tPop2s = document.querySelectorAll('.t_pop2');
if (tPop2s.length > 0) {
  tPop2s.forEach((tPop2) => {
    setTimeout(() => {
      tPop2.style.transition = 'opacity 0.5s ease-in-out';
      tPop2.style.opacity = '0';
      setTimeout(() => {
        tPop2.style.display = 'none';
      }, 500);
    }, 2600);

    const confirmBtn = tPop2.querySelector('.btn_confirm');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', function (e) {
        e.preventDefault();
        tPop2.style.transition = 'opacity 0.3s ease-in-out';
        tPop2.style.opacity = '0';
        setTimeout(() => {
          tPop2.style.display = 'none';
        }, 300);
      });
    }
  });
}
