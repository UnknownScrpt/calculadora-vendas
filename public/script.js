document.getElementById('calculatorForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const clientName = document.getElementById('clientName').value;
    const saleAmount = parseFloat(document.getElementById('saleAmount').value);
    const immediateDiscount = parseFloat(document.getElementById('immediateDiscount').value) / 100;
    const installments = parseInt(document.getElementById('installments').value);
    const installmentDiscount = parseFloat(document.getElementById('installmentDiscount').value) / 100;
    const paymentMethod = document.getElementById('paymentMethod').value;

    const amountAfterImmediateDiscount = saleAmount * (1 - immediateDiscount);
    const totalInstallmentDiscount = amountAfterImmediateDiscount * installmentDiscount * installments;
    const finalAmount = amountAfterImmediateDiscount - totalInstallmentDiscount;

    document.getElementById('result').innerText = `Valor Líquido: R$ ${finalAmount.toFixed(2)}`;

    const data = {
        clientName,
        saleAmount,
        immediateDiscount,
        installments,
        installmentDiscount,
        paymentMethod,
        finalAmount
    };

    fetch('/save-sale', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(() => {
        loadSales();
        document.getElementById('calculatorForm').reset();
    })
    .catch(error => console.error('Erro ao salvar venda:', error));
});

function loadSales() {
    fetch('/get-sales')
        .then(res => res.json())
        .then(sales => {
            const tbody = document.querySelector('#salesTable tbody');
            tbody.innerHTML = '';
            sales.forEach(sale => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${sale.clientName}</td>
                    <td>R$ ${sale.saleAmount.toFixed(2)}</td>
                    <td>${(sale.immediateDiscount * 100).toFixed(2)}%</td>
                    <td>${sale.installments}</td>
                    <td>${(sale.installmentDiscount * 100).toFixed(2)}%</td>
                    <td>R$ ${sale.finalAmount.toFixed(2)}</td>
                    <td>${sale.paymentMethod}</td>
                `;
                tbody.appendChild(row);
            });
        });
}

function openTab(evt, tabId) {
    const tabs = document.getElementsByClassName('tabcontent');
    for (let i = 0; i < tabs.length; i++) tabs[i].style.display = 'none';

    const tablinks = document.getElementsByClassName('tablink');
    for (let i = 0; i < tablinks.length; i++) tablinks[i].classList.remove('active');

    document.getElementById(tabId).style.display = 'block';
    evt.currentTarget.classList.add('active');
}

window.onload = function() {
    document.querySelector('.tablink').click(); // abrir aba inicial
    loadSales(); // carregar lista
};
