class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.fields = {
            name: {
                element: document.getElementById('name'),
                error: document.getElementById('nameError'),
                required: true,
                minLength: 3,
                maxLength: 50,
                pattern: /^[a-zA-Z\sąććęłńóśźžđČĆŠĐŽ]+$/
            },
            email: {
                element: document.getElementById('email'),
                error: document.getElementById('emailError'),
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            },
            phone: {
                element: document.getElementById('phone'),
                error: document.getElementById('phoneError'),
                required: false,
                pattern: /^[\+\s0-9]{6,}$/
            },
            subject: {
                element: document.getElementById('subject'),
                error: document.getElementById('subjectError'),
                required: true,
                minLength: 5,
                maxLength: 100
            },
            message: {
                element: document.getElementById('message'),
                error: document.getElementById('messageError'),
                required: true,
                minLength: 10,
                maxLength: 1000
            }
        };
        
        this.init();
    }
    
    // Pomocna funkcija za dohvatanje jezika
    getCurrentLang() {
        return localStorage.getItem('language') || 'sr';
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.setupRealTimeValidation();
        this.setupBlurValidation();
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }
    
    validateForm() {
        let isValid = true;
        
        for (const [fieldName, field] of Object.entries(this.fields)) {
            if (!this.validateField(fieldName)) {
                isValid = false;
            }
        }
        
        const consent = document.getElementById('consent');
        if (consent && !consent.checked) {
            const currentLang = this.getCurrentLang();
            const errorMsg = (currentLang === 'en') 
                ? 'You must agree to the data processing.'
                : 'Morate se složiti sa obradom podataka.';
            this.showError(errorMsg);
            isValid = false;
        }
        
        return isValid;
    }
    
    validateField(fieldName) {
        const field = this.fields[fieldName];
        if (!field || !field.element) return true;
        
        const value = field.element.value.trim();
        let isValid = true;
        let errorMessage = '';
        const currentLang = this.getCurrentLang();
        
        // Provera required
        if (field.required && value === '') {
            errorMessage = (currentLang === 'en') ? 'This field is required.' : 'Ovo polje je obavezno.';
            isValid = false;
        }
        
        // Provera minLength
        if (isValid && field.minLength && value.length < field.minLength) {
            if (currentLang === 'en') {
                errorMessage = `Field must have at least ${field.minLength} characters.`;
            } else {
                errorMessage = `Polje mora imati najmanje ${field.minLength} karaktera.`;
            }
            isValid = false;
        }
        
        // Provera maxLength
        if (isValid && field.maxLength && value.length > field.maxLength) {
            if (currentLang === 'en') {
                errorMessage = `Field cannot have more than ${field.maxLength} characters.`;
            } else {
                errorMessage = `Polje ne može imati više od ${field.maxLength} karaktera.`;
            }
            isValid = false;
        }
        
        // Provera pattern
        if (isValid && field.pattern && value !== '' && !field.pattern.test(value)) {
            errorMessage = (currentLang === 'en') ? 'Field is not in the correct format.' : 'Polje nije u ispravnom formatu.';
            isValid = false;
        }
        
        if (!isValid) {
            this.showFieldError(fieldName, errorMessage);
        } else {
            this.clearFieldError(fieldName);
        }
        
        return isValid;
    }
    
    showFieldError(fieldName, message) {
        const field = this.fields[fieldName];
        if (field.error) {
            field.error.textContent = message;
            field.error.style.display = 'block';
        }
        
        if (field.element) {
            field.element.classList.add('error');
            field.element.classList.remove('success');
        }
    }
    
    clearFieldError(fieldName) {
        const field = this.fields[fieldName];
        if (field.error) {
            field.error.textContent = '';
            field.error.style.display = 'none';
        }
        
        if (field.element) {
            field.element.classList.remove('error');
            field.element.classList.add('success');
        }
    }
    
    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error-general';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            background: #f44336;
            color: white;
            padding: 10px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
        `;
        
        const existingError = this.form.querySelector('.form-error-general');
        if (existingError) {
            existingError.remove();
        }
        
        this.form.insertBefore(errorDiv, this.form.firstChild);
        
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    setupRealTimeValidation() {
        for (const fieldName of Object.keys(this.fields)) {
            const field = this.fields[fieldName];
            if (field.element) {
                field.element.addEventListener('input', () => {
                    this.validateField(fieldName);
                });
            }
        }
    }
    
    setupBlurValidation() {
        for (const fieldName of Object.keys(this.fields)) {
            const field = this.fields[fieldName];
            if (field.element) {
                field.element.addEventListener('blur', () => {
                    this.validateField(fieldName);
                });
            }
        }
    }
    
    submitForm() {
        const formData = new FormData(this.form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        console.log('Slanje forme:', data);
        this.showSuccessMessage();
        this.form.reset();
        
        for (const field of Object.values(this.fields)) {
            if (field.element) {
                field.element.classList.remove('success');
            }
        }
    }
    
    showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'form-success';
        
        const currentLang = this.getCurrentLang();
        let title, message;
        
        if (currentLang === 'en') {
            title = 'Thank you for your message!';
            message = 'We will get back to you as soon as possible.';
        } else {
            title = 'Hvala na poruci!';
            message = 'Javićemo vam se u najkraćem mogućem roku.';
        }
        
        successDiv.innerHTML = `
            <h3>${title}</h3>
            <p>${message}</p>
        `;
        
        successDiv.style.cssText = `
            background: #4CAF50;
            color: white;
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
            text-align: center;
            animation: slideDown 0.5s ease;
        `;
        
        this.form.insertBefore(successDiv, this.form.firstChild);
        
        setTimeout(() => {
            successDiv.style.animation = 'slideUp 0.5s ease';
            setTimeout(() => {
                if (successDiv.parentNode) {
                    successDiv.remove();
                }
            }, 500);
        }, 5000);
    }
}

// CSS za animacije
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Inicijalizacija validatora
document.addEventListener('DOMContentLoaded', function() {
    new FormValidator('contactForm');
});

if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormValidator;
}