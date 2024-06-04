import AsyncStorage from '@react-native-async-storage/async-storage';
import {expenseLst, incomeLst} from '../components/transactionIcon';

const getAllExpenseTypes = async () => {
  let chunks = [];
  // Iterate over the array in steps of 3
  for (let i = 0; i < expenseLst.length; i += 3) {
    // Slice out a chunk of 3 elements and push it to the chunks array
    chunks.push(expenseLst.slice(i, i + 3));
  }
  return chunks;
}

const getAllIncomeTypes = async () => {
  let chunks = [];
  // Iterate over the array in steps of 3
  for (let i = 0; i < incomeLst.length; i += 3) {
    // Slice out a chunk of 3 elements and push it to the chunks array
    chunks.push(incomeLst.slice(i, i + 3));
  }
  return chunks;
}

const getTarget = async () => {
  const defaultPlanName = await AsyncStorage.getItem('default_plan');
  let storedPlanLst = await AsyncStorage.getItem('plan_lst');
  if (storedPlanLst === null) {
    storedPlanLst = [];
  } else {
    storedPlanLst = JSON.parse(storedPlanLst);
  }
  for (let i in storedPlanLst) {
    if (storedPlanLst[i]['title'] == defaultPlanName) {
      return storedPlanLst[i]['target'];
    }
  }
  return "0";
};

const getWalletLst = async () => {
  let walletLst = await AsyncStorage.getItem('wallet_lst');
  if (walletLst != null) walletLst = JSON.parse(walletLst);
  else walletLst = [];
  return walletLst;
}

const getTotalWalletsBalanace = async () => {
  let totalBalance = 0;
  let storedWalletLst = await AsyncStorage.getItem('wallet_lst');
  if (storedWalletLst === null) {
    storedWalletLst = [];
  } else {
    storedWalletLst = JSON.parse(storedWalletLst);
  }
  for (let i in storedWalletLst) {
    totalBalance += parseInt(storedWalletLst[i]['balance']);
  }
  
  return totalBalance.toString();
}

const getDefaultPlan = async () => {
  let defaultPlanName = await AsyncStorage.getItem('default_plan');
  let storedPlanLst = await AsyncStorage.getItem('plan_lst');
  if (storedPlanLst == null) {
    storedPlanLst = [];
  } else {
    storedPlanLst = JSON.parse(storedPlanLst);
  }
  for (let i in storedPlanLst) {
    if (storedPlanLst[i]['title'] == defaultPlanName) {
      return(storedPlanLst[i]);
    }
  }
  return null;
}

const getDefaultWalletName = async () => {
   const defaultWalletName = await AsyncStorage.getItem('default_wallet');
   return defaultWalletName;
}

const getDefaultWalletInfo = async (month, year) => {
  let balance = null;
  let expenseLst = [];
  let incomeLst = [];
  let expense = 0;
  let income = 0;

  const defaultWalletName = await AsyncStorage.getItem('default_wallet');
  let storedWalletLst = await AsyncStorage.getItem('wallet_lst');
  if (storedWalletLst === null) {
    storedWalletLst = [];
  } else {
    storedWalletLst = JSON.parse(storedWalletLst);
  }
  let storedDefaultWallet = null;
  for (let i in storedWalletLst) {
    if (storedWalletLst[i]['title'] == defaultWalletName) {
      storedDefaultWallet = storedWalletLst[i];
    }
  }
  balance = storedDefaultWallet['balance'];
  
  let transactionLst = storedDefaultWallet['transaction_lst'];
  let returnTransactionLst = [];
  for (let i in transactionLst) {
    let [currMonth, currDay, currYear] = transactionLst[i]['date'].split('-');
    if (parseInt(currYear) < year || (parseInt(currYear) == year && parseInt(currMonth) < month)) break;
    if (parseInt(currYear) == year && parseInt(currMonth) == month) {
      returnTransactionLst.push(transactionLst[i]);
      if (transactionLst[i]['isExpense']) {
        expenseLst.push(transactionLst[i]);
        expense += parseInt(transactionLst[i]['value']);
      }
      else {
        incomeLst.push(transactionLst[i]);
        income += parseInt(transactionLst[i]['value']);
      }
    }
  }
  return {balance: balance, expenseLst: expenseLst, incomeLst: incomeLst, expense: expense, income: income, transactionLst: returnTransactionLst};
};

const compareTarget = async (targetLst, currExpenseLst) => {

  let resultLst = [];
  for (let i in targetLst) {
    resultLst.push({type: targetLst[i]['type'], target: targetLst[i]['target'], currExpense: "0"});
  }
  for (let i in currExpenseLst) {
    let added = false;
    for (let j in resultLst) {
      if (currExpenseLst[i]['type'] == resultLst[j]['type']) {
        resultLst[j]['currExpense'] = (parseInt(currExpenseLst[i]['value']) + parseInt(resultLst[j]['currExpense'])).toString();
        added = true;
        break;
      }
    }
    if (!added) resultLst.push({type: currExpenseLst[i]['type'], target: "0", currExpense: currExpenseLst[i]['value']});
  }
  
  return resultLst;
}

export {getTarget, getDefaultPlan, getDefaultWalletInfo, getTotalWalletsBalanace, compareTarget, getAllExpenseTypes, getAllIncomeTypes, getDefaultWalletName, getWalletLst};

