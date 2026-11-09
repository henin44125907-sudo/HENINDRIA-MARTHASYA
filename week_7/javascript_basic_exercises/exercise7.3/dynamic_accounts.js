document.addEventListener('DOMContentLoaded', function () {
  const newAccountNameInput = document.getElementById('newAccountName');
  const addAccountButton = document.getElementById('addAccountBtn');
  const accountListElement = document.getElementById('accountList');

  // Buat item akun baru lengkap dengan tombol Delete
  function createAccountItem(accountName) {
    const listItem = document.createElement('li');
    listItem.textContent = accountName;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function () {
      // 'this' adalah tombol Delete yang diklik
      // this.parentNode adalah elemen <li> induknya
      this.parentNode.remove();
    });

    listItem.appendChild(deleteButton);
    accountListElement.appendChild(listItem);
  }

  // Event listener untuk tombol "Add Account"
  addAccountButton.addEventListener('click', function () {
    const accountName = newAccountNameInput.value.trim(); // trim() menghapus spasi di awal/akhir

    if (accountName !== '') {
      createAccountItem(accountName);
      newAccountNameInput.value = ''; // Kosongkan input setelah ditambahkan
    } else {
      alert('Account name cannot be empty!'); // Akan diperbaiki di Chapter 8
    }
  });

  // Tambahkan tombol Delete ke akun statis yang sudah ada saat halaman dimuat
  const staticAccounts = accountListElement.querySelectorAll('li');
  staticAccounts.forEach(function (item) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function () {
      this.parentNode.remove();
    });

    item.appendChild(deleteButton);
  });
});