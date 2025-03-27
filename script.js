document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    const steps = document.querySelectorAll('.step');
    const progressBar = document.getElementById('progress-bar');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    let currentStep = 1;
    
    // Add animation with delays
    cards.forEach((card, index) => {
        card.style.setProperty('--i', index);
        setTimeout(() => {
            card.classList.add('visible');
        }, 150 * index);
    });
    
    // Update progress and active states
    function updateProgress(step) {
        currentStep = step;
        
        // Calculate progress percentage
        const progress = ((step - 1) / (steps.length - 1)) * 100;
        progressBar.style.width = `${progress}%`;
        
        // Update step indicators
        steps.forEach((stepEl, index) => {
            const stepNum = index + 1;
            stepEl.classList.remove('active', 'completed');
            
            if (stepNum < step) {
                stepEl.classList.add('completed');
            } else if (stepNum === step) {
                stepEl.classList.add('active');
            }
        });
        
        // Update card active state and scroll with a small delay for better visual effect
        cards.forEach((card) => {
            const cardStep = parseInt(card.dataset.step);
            if (cardStep === step) {
                setTimeout(() => {
                    card.classList.add('active');
                }, 50);
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                card.classList.remove('active');
            }
        });
        
        // Update navigation buttons
        prevBtn.disabled = step === 1;
        nextBtn.disabled = step === steps.length;
    }
    
    // Click handlers for steps
    steps.forEach((step) => {
        step.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            updateProgress(step);
        });
    });
    
    // Click handlers for cards
    cards.forEach((card) => {
        card.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            updateProgress(step);
        });
    });
    
    // Navigation button handlers
    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            updateProgress(currentStep - 1);
        }
    });
    
    nextBtn.addEventListener('click', () => {
        if (currentStep < steps.length) {
            updateProgress(currentStep + 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentStep > 1) {
            updateProgress(currentStep - 1);
        } else if (e.key === 'ArrowRight' && currentStep < steps.length) {
            updateProgress(currentStep + 1);
        }
    });
}); 