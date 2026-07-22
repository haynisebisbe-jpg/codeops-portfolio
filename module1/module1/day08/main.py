from project import binary_search


class SMSAlert:
    def update(self, account, message):
        print(f"[SMS] {account.owner}: {message}")
class AuditLog:
    def update(self, account, message):
        print(f"[Audit] {account.number}: {message}")
class BankConfig:
    _instance = None

    def __init__(self, interest_rate=0.05, overdraft_limit=1000):
        self.interest_rate = interest_rate
        self.overdraft_limit = overdraft_limit

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = BankConfig()
        return cls._instance
class Account:
    def __init__(self, owner, number, balance):
        self.owner = owner
        self.number = number
        self.balance = balance
        self._observers = []
        self.history = []  

    def subscribe(self, observer):
        self._observers.append(observer)

    def _notify(self, message):
        for obs in self._observers:
            obs.update(self, message)

    def deposit(self, amount):
        self.balance += amount
        self.history.append(("deposit", amount))
        self._notify(f"Deposited {amount}. New balance: {self.balance}")

    def withdraw(self, amount):
        if amount <= self.balance:
            self.balance -= amount
            self.history.append(("withdraw", amount))
            self._notify(f"Withdrew {amount}. New balance: {self.balance}")
        else:
            self._notify("Insufficient funds!")

    def undo_last(self):
        if not self.history:
            return
        action, amount = self.history.pop()
        if action == "deposit":
            self.balance -= amount
        else:
            self.balance += amount
        self._notify(f"Undid {action} of {amount}. New balance: {self.balance}")

    def statement(self):
        print(f"{self.owner} | {self.number} | balance: {self.balance}")
class SavingsAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.rate = BankConfig.get_instance().interest_rate

    def add_interest(self):
        interest = self.balance * self.rate
        self.balance += interest
        self.history.append(("interest", interest))
        self._notify(f"Interest added: {interest}. New balance: {self.balance}")
class CurrentAccount(Account):
    def __init__(self, owner, number, balance=0):
        super().__init__(owner, number, balance)
        self.overdraft = BankConfig.get_instance().overdraft_limit
    def withdraw(self, amount):
        if amount <= self.balance + self.overdraft:
            self.balance -= amount
            self.history.append(("withdraw", amount))
            self._notify(f"Withdrew {amount}. New balance: {self.balance}")
        else:
            self._notify("Overdraft limit exceeded!")
class AccountFactory:
    @staticmethod
    def create(kind, owner, number, balance=0):
        if kind == "savings":
            return SavingsAccount(owner, number, balance)
        elif kind == "current":
            return CurrentAccount(owner, number, balance)
        else:
            return Account(owner, number, balance)
class AccountRegistry:
    def __init__(self):
        self.accounts = {}  
        self.order = []      
    def add(self, account):
        self.accounts[account.number] = account
        self.order.append(account.number)

    def find(self, number):
        return self.accounts.get(number)

    def list_all(self):
        return [self.accounts[num] for num in self.order]
if __name__ == "__main__":
    sms = SMSAlert()
    audit = AuditLog()
    registry = AccountRegistry()

    khalid = AccountFactory.create("savings", "Khalid", 1001, 700)
    kidist = AccountFactory.create("current", "Kidist", 1002, 800)
    almaz = AccountFactory.create("basic", "Almaz", 1003, 500)

    for account in [khalid, kidist, almaz]:
        account.subscribe(sms)
        account.subscribe(audit)
        registry.add(account)

    kidist.withdraw(50)
    kidist.undo_last()
    print("\nAll accounts:")
    for account in registry.list_all():
        account.statement()
def top_by_balance(self, n):
        # Sorts accounts by balance from highest to lowest and returns top n
        sorted_accounts = sorted(
            self.accounts.values(),
            key=lambda acc: acc.balance,
            reverse=True
        )
        return sorted_accounts[:n]
def find_by_number(self, number):
    nums = sorted(self.accounts.keys())
    idx = binary_search(nums, number)
    return self.accounts[nums[idx]] if idx >= 0 else None
def total_transactions(self, number):
    acct = self.find_by_number(number)
    if not acct or not hasattr(acct, "transactions"):
        return 0

    def _sum_rec(txs):
        if not txs:
            return 0
        return txs[0] + _sum_rec(txs[1:])

    return _sum_rec(acct.transactions)

