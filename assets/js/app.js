// DevlopIA Main Application Logic - Multi-Category Support

document.addEventListener('DOMContentLoaded', () => {
    loadQuizzes();
});

async function loadQuizzes() {
    try {
        // Fetch data from local JSON file
        const response = await fetch('data/quiz-list.json?t=' + new Date().getTime());
        if (!response.ok) throw new Error('Erreur chargement quiz');

        const quizzes = await response.json();

        // Separate quizzes by category
        const baseIA = quizzes.filter(q => q.category === 'base-ia' || !q.category);
        const automatisation = quizzes.filter(q => q.category === 'automatisation');

        // Load into respective grids
        const baseGrid = document.getElementById('base-ia-grid');
        if (baseGrid) renderQuizCards(baseIA, baseGrid);

        const autoGrid = document.getElementById('automatisation-grid');
        if (autoGrid) renderQuizCards(automatisation, autoGrid);

    } catch (error) {
        console.error('Erreur:', error);
        const grids = document.querySelectorAll('.quiz-grid');
        grids.forEach(g => g.innerHTML = '<p style="color: var(--error);">Impossible de charger les quiz via quiz-list.json.</p>');
    }
}

function renderQuizCards(quizzes, grid) {
    grid.innerHTML = '';

    if (quizzes.length === 0) {
        grid.innerHTML = '<p class="no-quiz">Aucun quiz disponible pour le moment.</p>';
        return;
    }

    // Generate HTML for each quiz
    quizzes.forEach(quiz => {
        const card = document.createElement('article');
        card.className = 'quiz-card';
        card.onclick = () => window.location.href = quiz.file; // Clickable card

        card.innerHTML = `
            <div class="card-icon">
                <i class="fa-solid fa-clipboard-question" style="font-size: 2rem; color: var(--primary-blue); margin-bottom: 15px;"></i>
            </div>
            <h3>${quiz.title}</h3>
            <p>${quiz.questions} questions • ${quiz.duration}</p>
            <span class="btn-start">Commencer <i class="fa-solid fa-arrow-right"></i></span>
        `;

        grid.appendChild(card);
    });
}
