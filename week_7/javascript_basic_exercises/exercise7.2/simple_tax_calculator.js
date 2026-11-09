document.addEventListener('DOMContentLoaded', function () {
  const incomeInput = document.getElementById('grossIncome');
  const dependentsInput = document.getElementById('numDependents');
  const calculateBtn = document.getElementById('calculateTaxBtn');
  const resultDiv = document.getElementById('taxResult');

  // Format angka ke Rupiah
  function formatRupiah(number) {
    const formatter = new Intl.NumberFormat('en-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    return formatter.format(number);
  }

  function calculateTax() {
    const grossIncome = parseFloat(incomeInput.value);
    const numDependents = parseInt(dependentsInput.value);

    if (
      isNaN(grossIncome) ||
      isNaN(numDependents) ||
      grossIncome < 0 ||
      numDependents < 0
    ) {
      resultDiv.textContent = 'Please enter valid numbers for income and dependents.';
      resultDiv.style.color = 'red';
      return;
    }

    let payableTax = 0;

    // Fictional tax rates
    if (grossIncome <= 50000000) {
      payableTax = grossIncome * 0.05; // 5%
    } else if (grossIncome <= 250000000) {
      // 5% first layer + 15% second layer
      payableTax = (50000000 * 0.05) + ((grossIncome - 50000000) * 0.15);
    } else {
      // 5% + 15% + 25%
      payableTax =
        (50000000 * 0.05) +
        (200000000 * 0.15) +
        ((grossIncome - 250000000) * 0.25);
    }

    // Fictional tax reduction based on dependents
    const reductionPerDependent = 500000;
    const totalReduction = numDependents * reductionPerDependent;
    payableTax = Math.max(0, payableTax - totalReduction); // Pajak tidak boleh negatif

    const netIncome = grossIncome - payableTax;

    resultDiv.style.color = '#333';
    resultDiv.innerHTML = `
      <p>Gross Income: ${formatRupiah(grossIncome)}</p>
      <p>Number of Dependents: ${numDependents}</p>
      <p>Estimated PPh Payable: ${formatRupiah(payableTax)}</p>
      <p>Estimated Net Income: ${formatRupiah(netIncome)}</p>
    `;
  }

  calculateBtn.addEventListener('click', calculateTax);
});