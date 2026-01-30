// ========================================
// Checkout Page JavaScript
// Payment processing and interactions
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    initCheckoutButton();
    initProgressAnimation();
});

// === CHECKOUT BUTTON HANDLER ===
function initCheckoutButton() {
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add loading state
            const originalContent = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Processing...</span>';
            this.disabled = true;
            
            // Simulate payment processing (replace with actual payment gateway integration)
            setTimeout(() => {
                // Show success message
                showCheckoutNotification('Redirecting to secure payment gateway...', 'success');
                
                // In a real implementation, redirect to payment gateway
                setTimeout(() => {
                    // For demo purposes, we'll show a modal instead
                    showPaymentModal();
                    
                    // Reset button
                    this.innerHTML = originalContent;
                    this.disabled = false;
                }, 1500);
            }, 1000);
        });
    }
}

// === PAYMENT MODAL ===
function showPaymentModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'payment-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">
                <i class="fas fa-times"></i>
            </button>
            <div class="modal-icon">
                <i class="fas fa-info-circle"></i>
            </div>
            <h2>Payment Integration Required</h2>
            <p>This is a demo website. To enable actual payments, integrate with:</p>
            <ul class="payment-gateway-list">
                <li><i class="fas fa-check"></i> Razorpay (Recommended for India)</li>
                <li><i class="fas fa-check"></i> Stripe (International)</li>
                <li><i class="fas fa-check"></i> PayPal</li>
                <li><i class="fas fa-check"></i> Instamojo</li>
            </ul>
            <p class="modal-note">Contact us at <strong>contact@mextrishiisan.com</strong> for enrollment details.</p>
            <button class="btn btn-primary modal-btn">
                <span>Contact Us</span>
                <i class="fas fa-envelope"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .payment-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: relative;
            background: white;
            border-radius: 16px;
            padding: 2.5rem;
            max-width: 500px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease;
            text-align: center;
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #4A4A4A;
            cursor: pointer;
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #F5F5F5;
            color: #C41E3A;
        }
        
        .modal-icon {
            font-size: 4rem;
            color: #C41E3A;
            margin-bottom: 1.5rem;
        }
        
        .modal-content h2 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            color: #1A1A1A;
        }
        
        .modal-content p {
            font-size: 1.0625rem;
            color: #4A4A4A;
            margin-bottom: 1.5rem;
            line-height: 1.7;
        }
        
        .payment-gateway-list {
            list-style: none;
            text-align: left;
            margin: 1.5rem 0;
            padding: 1.5rem;
            background: #F5F5F5;
            border-radius: 8px;
        }
        
        .payment-gateway-list li {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem 0;
            font-size: 1rem;
            color: #1A1A1A;
        }
        
        .payment-gateway-list i {
            color: #4A7C59;
        }
        
        .modal-note {
            font-size: 0.9375rem;
            color: #4A4A4A;
            margin-bottom: 1.5rem;
        }
        
        .modal-btn {
            width: 100%;
            justify-content: center;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(30px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Close handlers
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    const contactBtn = modal.querySelector('.modal-btn');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    overlay.addEventListener('click', () => closeModal(modal));
    
    contactBtn.addEventListener('click', () => {
        window.location.href = 'index.html#contact';
    });
    
    // ESC key to close
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape' && document.body.contains(modal)) {
            closeModal(modal);
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'slideDown 0.3s ease';
    
    const fadeOutStyle = document.createElement('style');
    fadeOutStyle.textContent = `
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        @keyframes slideDown {
            from {
                transform: translateY(0);
                opacity: 1;
            }
            to {
                transform: translateY(30px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(fadeOutStyle);
    
    setTimeout(() => modal.remove(), 300);
}

// === NOTIFICATION SYSTEM (Checkout specific) ===
function showCheckoutNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `checkout-notification checkout-notification-${type}`;
    notification.innerHTML = `
        <div class="checkout-notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        .checkout-notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 400px;
        }
        
        .checkout-notification-success {
            border-left: 4px solid #4A7C59;
        }
        
        .checkout-notification-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        
        .checkout-notification-content i {
            font-size: 1.25rem;
            color: #4A7C59;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyle);
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// === PROGRESS ANIMATION ===
function initProgressAnimation() {
    const progressFill = document.querySelector('.progress-fill');
    
    if (progressFill) {
        const targetWidth = progressFill.style.width;
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.width = targetWidth;
        }, 500);
    }
}

// === PRICING ANIMATION ON SCROLL ===
const pricingSection = document.querySelector('.summary-pricing');
if (pricingSection) {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const priceRows = pricingSection.querySelectorAll('.price-row');
                priceRows.forEach((row, index) => {
                    setTimeout(() => {
                        row.style.opacity = '1';
                        row.style.transform = 'translateX(0)';
                    }, index * 100);
                });
                observer.unobserve(pricingSection);
            }
        });
    }, { threshold: 0.5 });
    
    const priceRows = pricingSection.querySelectorAll('.price-row');
    priceRows.forEach(row => {
        row.style.opacity = '0';
        row.style.transform = 'translateX(-20px)';
        row.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    observer.observe(pricingSection);
}

// === FAQ ITEM INTERACTION ===
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px)';
        this.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    // Add transition
    item.style.transition = 'all 0.3s ease';
});

// === INCLUDE ITEM ANIMATION ===
const includeItems = document.querySelectorAll('.include-item');
if (includeItems.length > 0) {
    const includeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = Array.from(includeItems);
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 80);
                });
                includeObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });
    
    includeItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    if (includeItems[0]) {
        includeObserver.observe(includeItems[0]);
    }
}

// === CONSOLE BRANDING ===
console.log('%c MEXT with Rishiisan - Checkout ', 'background: #C41E3A; color: white; padding: 10px 20px; font-size: 16px; font-weight: bold;');
console.log('%c Secure your spot in the MEXT journey 🇯🇵 ', 'color: #C41E3A; font-size: 14px;');