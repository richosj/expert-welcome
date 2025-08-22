import '@/scss/main.scss';

// 과정 선택 레이어 기능
document.addEventListener('DOMContentLoaded', function() {
    const courseSelect = document.getElementById('courseSelect');
    const courseLayer = document.getElementById('courseLayer');
    const closeCourseLayer = document.getElementById('closeCourseLayer');
    const courseItems = document.querySelectorAll('.course-item');
    
    // 과정 선택 필드 클릭 시 레이어 열기
    if (courseSelect) {
        courseSelect.addEventListener('click', function() {
            courseLayer.classList.add('active');
            courseSelect.classList.add('active');
        });
    }
    
    // 뒤로가기 버튼 클릭 시 레이어 닫기
    if (closeCourseLayer) {
        closeCourseLayer.addEventListener('click', function() {
            courseLayer.classList.remove('active');
            courseSelect.classList.remove('active');
        });
    }
    
    // 레이어 외부 클릭 시 닫기
    if (courseLayer) {
        courseLayer.addEventListener('click', function(e) {
            if (e.target === courseLayer) {
                courseLayer.classList.remove('active');
                courseSelect.classList.remove('active');
            }
        });
    }
    
    // 과정 아이템 클릭 시 선택
    courseItems.forEach(item => {
        item.addEventListener('click', function() {
            // 기존 선택 해제
            courseItems.forEach(i => i.classList.remove('selected'));
            
            // 현재 아이템 선택
            this.classList.add('selected');
            
            // 선택된 텍스트를 필드에 표시
            const selectText = courseSelect.querySelector('.select-text');
            if (selectText) {
                selectText.textContent = this.textContent;
            }
            
            // 레이어 닫기
            courseLayer.classList.remove('active');
            courseSelect.classList.remove('active');
        });
    });
    
    // ESC 키로 레이어 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && courseLayer.classList.contains('active')) {
            courseLayer.classList.remove('active');
            courseSelect.classList.remove('active');
        }
    });
});

