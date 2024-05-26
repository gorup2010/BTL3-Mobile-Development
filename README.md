## Data Structure
- Current balance:
  + key: "curr_balance"
  + value: string
- Current income:
  + key: "curr_income"
  + value: string
- Current spending:
  + key: "curr_spending"
  + value: string
- Current spending target:
  + key: "curr_target"
  + value: string
- Wallet list:
  + key: "wallet_lst"
  + value: Array(Struct(title: string, balance: string, des: string, transaction_lst: Array(Transaction)))
- Plan list:
  + key: "plan_lst"
  + value: Array(Struct(title: string, des: string, target: string))
- Transaction:
  + value: Struct(type: string, date: string, isExpense: boolean, value: string)
- Default wallet: name of default wallet
  + key: "default_wallet"
  + value: string
- Default plaan: name of default plan
  + key: "default_plan"
  + value: string
