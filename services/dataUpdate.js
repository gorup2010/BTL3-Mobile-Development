import AsyncStorage from '@react-native-async-storage/async-storage';

function parseDateString(dateString) {
  const [month, day, year] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function areObjectsEqual(obj1, obj2) {
    return Object.keys(obj1).length === Object.keys(obj2).length &&
           Object.keys(obj1).every(key => obj1[key] === obj2[key]);
}

const addTransaction = async (newTransaction, walletName) => {
  let walletLst = await AsyncStorage.getItem('wallet_lst');
  if (walletLst == null) walletLst = [];
  else walletLst = JSON.parse(walletLst);
  let wallet = null;
  for (let i in walletLst) {
    if (walletLst[i]['title'] == walletName) {
      wallet = walletLst[i];
    }
  }
  // Update balances
  if (!newTransaction['isExpense']) {
    let currBalance = await AsyncStorage.getItem('curr_balance');
    if (currBalance == null) currBalance = '0';
    /*
    currBalance = (
      parseInt(currBalance) + parseInt(newTransaction['value'])
    ).toString();
    await AsyncStorage.setItem('curr_balance', currBalance);
    */
    wallet['balance'] = (
      parseInt(wallet['balance']) + parseInt(newTransaction['value'])
    ).toString();
  } else {
    wallet['balance'] = (
      parseInt(wallet['balance']) - parseInt(newTransaction['value'])
    ).toString();
  }
  //console.log('Before add transaction: ', wallet);
  //console.log('Transaction List: ', wallet['transaction_lst']);
  wallet['transaction_lst'].push(newTransaction);
  wallet['transaction_lst'].sort((a, b) => {
    const dateA = parseDateString(a['date']);
    const dateB = parseDateString(b['date']);
    return dateB - dateA;
  });

  //console.log('After add transaction: ', walletLst);
  await AsyncStorage.setItem('wallet_lst', JSON.stringify(walletLst));
};

const deleteTransaction = async (transaction, walletName) => {
  let walletLst = await AsyncStorage.getItem('wallet_lst');
  if (walletLst == null) walletLst = [];
  else walletLst = JSON.parse(walletLst);
  let wallet = null;
  for (let i in walletLst) {
    if (walletLst[i]['title'] == walletName) {
      wallet = walletLst[i];
    }
  }
  //console.log("Wallet: ", wallet);
  // Update balances
  let currBalance = await AsyncStorage.getItem('curr_balance');
  if (currBalance == null) currBalance = '0';
  if (!transaction['isExpense']) {
    /*
    currBalance = (
      parseInt(currBalance) - parseInt(transaction['value'])
    ).toString();
    await AsyncStorage.setItem('curr_balance', currBalance);
    */
    wallet['balance'] = (
      parseInt(wallet['balance']) - parseInt(transaction['value'])
    ).toString();
  } else {
    /*
    currBalance = (
      parseInt(currBalance) + parseInt(transaction['value'])
    ).toString();
    await AsyncStorage.setItem('curr_balance', currBalance);
    */
    wallet['balance'] = (
      parseInt(wallet['balance']) + parseInt(transaction['value'])
    ).toString();
  }
  //console.log('Before delete transaction: ', wallet['transaction_lst']);
  //console.log('Transaction List: ', wallet['transaction_lst']);
  wallet['transaction_lst'] = wallet['transaction_lst'].filter(item => !areObjectsEqual(item, transaction));

  //console.log('After delete transaction: ', walletLst);
  await AsyncStorage.setItem('wallet_lst', JSON.stringify(walletLst));
};

const updateTransaction = async (oldTransaction, newTransaction, walletName) => {
  await deleteTransaction(oldTransaction, walletName);
  await addTransaction(newTransaction, walletName);
};

export { addTransaction, deleteTransaction, updateTransaction };
