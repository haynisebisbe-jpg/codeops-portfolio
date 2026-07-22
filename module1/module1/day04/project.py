class Account:
    def __init__(self,owner,account_number,balance = 0):
       self.owner = owner
       self.account_number = account_number
       self.__balance = balance
    @property
    def balance(self):
        return self.__balance
    def deposit(self ,amount):
        if amount <= 0:
            raise ValueError ("Amount can not be negtive")
        self.__balance += amount 
        return self.__balance
    def withdraw(self,amount):
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.__balance:
            raise ValueError("Insufficient balance")
        self.__balance -= amount 
        return self.__balance
    def statement(self):
        print(f"{self.owner} , {self.account_number} , {self.__balance} ETB")
abel= Account("abel",1000159373999,2500)
abel.statement()
print(abel.balance)