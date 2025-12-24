

const accounts = [
  { name: "John Mutua", pin: "2345", account_number: 34345, amount: 0 },
  { name: "Samson Maingi", pin: "9993", account_number: 12345, amount: 0 },
  { name: "Dennis Mogaka", pin: "2134", account_number: 234567, amount: 0},
];



let atm = null;

function createAccount() {
  const name = prompt("Enter your name");
  const pin = prompt("Enter 4 digit pin");
  //recursion
  const account_number = prompt("Enter account number ");

  for (let i = 0; i < accounts.length; i++) {
    console.log("i is ", i);
    let singleAccount = accounts[i];
    if (singleAccount.account_number == account_number) {
      alert(`Account number ${account_number} exists`);
      return;
    }
  }
  const account = {
    name: name,
    pin: pin,
    account_number: account_number,
    amount: 0,
  };
  accounts.push(account);
}


function LoginUser() {
  const account_number = prompt("Enter account number ");
  const pin = prompt("Enter 4 digit pin");
  //recursion
  let foundAccount = null;
  for (let i = 0; i < accounts.length; i++) {
    let singleAccount = accounts[i];
    if (account_number == singleAccount.account_number) {
      foundAccount = singleAccount;
      break;
    }
  }
  
  if (!foundAccount) {
    alert(`Account  ${account_number} not found`);
    return; //ext
  }
  
  if (pin !== foundAccount.pin) {
    alert(`Invalid pin`);
    return;
  }
  
  atm = foundAccount;
}

function deposit() {
  if (!atm) {
    alert("Login please");
    return;
  }
  console.log("bofore deposit");
  console.log(atm);
  let amountToDeposit = prompt("Enter Amount To Deposit:");
  
  
  if (isNaN(amountToDeposit)) {
    alert("Enter a valid number to depost");
    return;
  }
  
  let numberAmount = Number(amountToDeposit);
  
  if (numberAmount <= 0) {
    alert("To deposit enter amount greater than 1");
    return;
  }
  
  storeLastTransction(numberAmount, "deposit", atm.amount);
  let newAmount = atm.amount + numberAmount;
  
  atm.amount = newAmount;
  
  console.log("after");
  console.log(atm);
}

function withdraw() {
  if (!atm) {
    alert("Login please");
    return;
  }
  console.log("before");
  console.log(atm);
  let amountToWithdraw = prompt("Enter Amount To Withdraw:");
  if (isNaN(amountToWithdraw)) {
    alert("Enter a valid number to withdraw");
    return;
  }
  amountToWithdraw = Number(amountToWithdraw);
  if (amountToWithdraw === 0) {
    alert("Minimum withdrwal amount is 1 ksh");
    return;
  }
  if (amountToWithdraw < 0) {
    amountToWithdraw = amountToWithdraw * -1;
  }

  if (atm.amount < amountToWithdraw) {
    alert("Insufficient Balance in your account");
    return;
  }

  storeLastTransction(amountToWithdraw, "withdraw", atm.amount);

  let newAmount = atm.amount - amountToWithdraw;

  atm.amount = newAmount;
  alert(`Witdrawal success ${amountToWithdraw}`);
  console.log("after");
  console.log(atm);
}

function storeLastTransction(amount, type, prevBalance) {
  let date = new Date();
  let transaction = {
    amount: amount,
    type: type,
    prevBalance: prevBalance,
    timeStamp: date.toISOString(),
  };

  
  atm.lastTransaction = transaction;
}

function logout() {
  atm = null;  
}

function showBalance() {
  if (!atm) {
    alert("please login");
    return;
  }
  if (atm.lastTransaction) {
    alert(`Hi, ${atm.name}.
        Balance ${atm.amount}
        Last Transaction ${atm.lastTransaction.type}
        Date ${atm.lastTransaction.timeStamp}
        prevBalance ${atm.lastTransaction.prevBalance}
        amount Transacted ${atm.lastTransaction.amount}
        `);
  } else {
    alert(`Hi, ${atm.name}.
        Balance ${atm.amount}`);
  }
}
