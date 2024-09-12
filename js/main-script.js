// Selecionar elementos
const gallery = document.querySelectorAll('.gallery img');
const modal = document.querySelector('.modal');
const modalImg = document.getElementById('modal-img');
const carBrand = document.getElementById('car-brand');
const carYear = document.getElementById('car-year');
const carPrice = document.getElementById('car-price');
const carPayment = document.getElementById('car-payment');
const closeModal = document.querySelector('.close');
const confirmPaymentButton = document.getElementById('confirm-payment');

// Função para verificar o estado do carro e recalcular o valor das parcelas
function getCarStateAndRecalculatePrice(year, price) {
    let state;
    let adjustedPrice;
    let priceNumber = parseFloat(price.replace(/[^0-9.,]/g, '').replace(',', '.')); // Remove símbolos e converte para número

    if (year <= 2010) {
        state = 'Usado';
        adjustedPrice = priceNumber * 0.95; // Reduz 5% do valor do carro
    } else if (year <= 2023) {
        state = 'Seminovo';
        adjustedPrice = priceNumber * 0.90; // Reduz 10% do valor do carro
    } else {
        state = 'Novo';
        adjustedPrice = priceNumber * 1.20; // Aumenta 20% do valor do carro
    }

    return {
        state,
        adjustedPrice: adjustedPrice.toFixed(2) // Retorna o valor ajustado com duas casas decimais
    };
}

// Função para calcular o valor a pagar considerando o valor de entrada e parcelamento
function calculatePayment(price, downPayment, installments) {
    let priceNumber = parseFloat(price.replace(/[^0-9.,]/g, '').replace(',', '.')); // Remove símbolos e converte para número
    let downPaymentNumber = parseFloat(downPayment.replace(/[^0-9.,]/g, '').replace(',', '.')); // Remove símbolos e converte para número
    let remainingAmount = priceNumber - downPaymentNumber;
    let installmentAmount = (remainingAmount / installments);
    alert(installmentAmount)
    alert(remainingAmount)
    alert(installments)
    
    return {
        totalAmount: priceNumber.toFixed(2),
        remainingAmount: remainingAmount.toFixed(2),
        installmentAmount: installmentAmount.toFixed(2)
    };
}

// Abrir modal e popular com informações do carro
gallery.forEach(img => {
    img.addEventListener('click', (e) => {
        const carId = e.target.getAttribute('data-id');
        const car = carData[carId];
        
        // Verifica o estado do carro e recalcula o preço
        const { state, adjustedPrice } = getCarStateAndRecalculatePrice(parseInt(car.year), car.price);
        
        // Atualiza o modal com as informações do carro
        modalImg.src = car.img;
        carBrand.textContent = car.brand;
        carYear.textContent = car.year;
        carPrice.textContent = `R$ ${adjustedPrice}`.replace('.', ',');
        
        // Define o valor padrão para pagamento
        carPayment.value = '1'; // padrão para 1 vez

        // Abre o modal
        modal.classList.add('open');
    });
});

// Fechar modal ao clicar em "x"
closeModal.addEventListener('click', () => {
    modal.classList.remove('open');
});

// Fechar modal ao clicar fora do conteúdo do modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('open');
    }
});

// Lidar com o clique do botão de confirmação
confirmPaymentButton.addEventListener('click', () => {
    const selectedInstallments = parseInt(carPayment.value);
    const downPayment = prompt('Informe o valor de entrada (R$):');
    
    if (downPayment) {
        // Obtém o preço ajustado do modal
        const adjustedPrice = carPrice.textContent.replace('R$ ', '').replace(',', '.');
        
        // Calcula o pagamento
        const { totalAmount, remainingAmount, installmentAmount } = calculatePayment(adjustedPrice, downPayment, selectedInstallments);
        
        // Exibe o resultado
        alert(`Você selecionou pagar em ${selectedInstallments} vezes sem juros.\n\n` +
              `Valor total do carro: R$ ${totalAmount.replace('.', ',')}\n` +
              `Valor de entrada: R$ ${downPayment.replace(',', '.')}\n` +
              `Valor restante: R$ ${remainingAmount.replace('.', ',')}\n` +
              `Valor de cada parcela: R$ ${installmentAmount.replace('.', ',')}`);
    }
    modal.classList.remove('open');
});
