document.addEventListener('DOMContentLoaded', () => {
  const screens = Array.from(document.querySelectorAll('.screen'));
  let idx = 0;
  const show = i => {
    screens.forEach(s => s.classList.remove('active'));
    screens[i].classList.add('active');
    // 프로그레스바 업데이트
    document.querySelectorAll('.step').forEach((st, j) =>
      st.classList.toggle('active', j === Math.min(i,2))
    );
  };

  // 다음/이전 버튼
  document.querySelectorAll('[data-next]').forEach(btn =>
    btn.addEventListener('click', () => {
      // 3번 포장 선택 시 모달 띄우기
      if (screens[idx].id==='screen-3' && btn.id!=='takeout-btn') {
        idx++;
        show(idx);
      } else if (screens[idx].id==='screen-3') {
        document.getElementById('utensil-modal').classList.remove('hidden');
      } else {
        idx++;
        show(idx);
      }
    })
  );
  document.querySelectorAll('[data-close]').forEach(btn =>
    btn.addEventListener('click', () => {
      document.getElementById('utensil-modal').classList.add('hidden');
      idx++;
      show(idx);
    })
  );

  // 결제 확인 모달 예시
  screens[4].querySelector('[data-next]').addEventListener('click', ()=>{
    document.getElementById('confirm-items').innerText = '선택한 세트';
    document.getElementById('confirm-modal').classList.remove('hidden');
  });
  document.getElementById('confirm-yes').onclick = ()=>{
    document.getElementById('confirm-modal').classList.add('hidden');
    idx = 6; // 카드 투입 화면으로
    show(idx);
  };
  document.getElementById('confirm-no').onclick = ()=>{
    document.getElementById('confirm-modal').classList.add('hidden');
  };

  // 모달 숨김(기본)
  show(idx);

  // (선택) 메뉴 그리드 동적 채우기
  const sideItems = [
    {name:'반반 팝콘', price:'7,000원'}, {name:'골든 카라멜', price:'7,000원'}
  ];
  const drinkItems = [
    {name:'아이스 커피', price:'2,000원'}, {name:'콜라', price:'1,500원'}
  ];
  const grid = document.getElementById('menu-grid');
  document.querySelectorAll('.tab').forEach(tab =>
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      grid.innerHTML = '';
      const list = tab.dataset.category==='side'? sideItems: drinkItems;
      list.forEach(it=>{
        const div = document.createElement('div');
        div.className='item';
        div.innerHTML = `<img src="" alt=""><p>${it.name}</p><small>${it.price}</small>`;
        grid.appendChild(div);
      });
    })
  );
  // 초기 사이드 채우기
  document.querySelector('.tab[data-category="side"]').click();
});