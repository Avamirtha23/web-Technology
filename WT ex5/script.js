document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const calculateBtn = document.getElementById('calculate-btn');
    const resultBox = document.getElementById('result-box');
    const receiptSubtotal = document.getElementById('receipt-subtotal');
    const receiptDiscount = document.getElementById('receipt-discount');
    const receiptTotal = document.getElementById('receipt-total');
    const discountDisplayRow = document.getElementById('discount-display-row');
    const discountAlertBox = document.getElementById('discount-alert-box');
    const promoHintBox = document.getElementById('promo-hint-box');
    const promoHintText = document.getElementById('promo-hint-text');


    const qtyInputs = document.querySelectorAll('.qty-input');
    const priceInputs = document.querySelectorAll('.price-input');

    const updateIndividualTotals = () => {
        for (let i = 1; i <= 3; i++) {
            const qty = parseFloat(document.getElementById(`p${i}-qty`).value) || 0;
            const price = parseFloat(document.getElementById(`p${i}-price`).value) || 0;
            const total = qty * price;
            
            document.getElementById(`p${i}-total`).textContent = `₹${total.toFixed(2)}`;
        }
    };

    updateIndividualTotals();

    // Listen to changes on any input field
    const allInputs = document.querySelectorAll('.input-field');
    allInputs.forEach(input => {
        input.addEventListener('input', updateIndividualTotals);
    });

     const calculateBill = () => {
        let subtotal = 0;
        const discountThreshold = 2000;
        const discountRate = 0.10; 

        for (let i = 1; i <= 3; i++) {
            const qty = parseFloat(document.getElementById(`p${i}-qty`).value) || 0;
            const price = parseFloat(document.getElementById(`p${i}-price`).value) || 0;
            
            // Accumulate product total
            const productTotal = qty * price;
            subtotal = subtotal + productTotal;
        }
        let discountAmount = 0;
        if (subtotal > discountThreshold) {
            discountAmount = subtotal * discountRate;
        }

        const finalAmount = subtotal - discountAmount;

        receiptSubtotal.textContent = `₹${subtotal.toFixed(2)}`;
        
        if (discountAmount > 0) {
            receiptDiscount.textContent = `-₹${discountAmount.toFixed(2)}`;
            discountDisplayRow.classList.remove('hidden');
            
            discountAlertBox.classList.remove('hidden');
            promoHintBox.classList.add('hidden');
        } else {
            discountDisplayRow.classList.add('hidden');
            discountAlertBox.classList.add('hidden');

            
            const remainingAmount = discountThreshold - subtotal;
            if (subtotal > 0) {
                promoHintText.textContent = `Add ₹${remainingAmount.toFixed(2)} more to unlock a 10% discount!`;
                promoHintBox.classList.remove('hidden');
            } else {
                promoHintBox.classList.add('hidden');
            }
        }

        receiptTotal.textContent = `₹${finalAmount.toFixed(2)}`;

        resultBox.classList.remove('hidden');

    
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    calculateBtn.addEventListener('click', calculateBill);
});
