// 手风琴效果
const accordionButtons = document.querySelectorAll('.accordion-button');
accordionButtons.forEach(button => {
  button.addEventListener('click', () => {
    button.classList.toggle('active');
    const content = button.nextElementSibling;
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  });
});

// 编辑内容功能
const editButton = document.getElementById('edit-button');
const accordionContents = document.querySelectorAll('.accordion-content');

editButton.addEventListener('click', () => {
  accordionContents.forEach(content => {
    const p = content.querySelector('p');
    if (p.contentEditable === 'false' || p.contentEditable === '') {
      p.contentEditable = 'true';
      p.style.backgroundColor = '#ffffcc';
      editButton.textContent = '保存内容';
    } else {
      p.contentEditable = 'false';
      p.style.backgroundColor = 'transparent';
      editButton.textContent = '编辑内容';
    }
  });
});