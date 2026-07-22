#1. Book class. Define Book with title, author, and pages. Add a describe() method that prints a one-line summary. Create two books. 
class Book:
    def __init__(self, title,author,page):
        self.title = title
        self.author = author
        self.page = page  
    def describe (self):
        return f"the book {self.title} is written by {self.author} having {self.page} pages"
book1 = Book("Advanced programming" , "Henery" , 380)
book2 = Book ("python" , "john" , 800)
print (book1.describe())
print (book2.describe())
#2. Product class. Define Product with name, price (ETB), and quantity. Add restock(n) and 
#sell(n) methods that change the quantity.
class Product:
    def __init__(self , name , price , quantity):
        self.name = name 
        self.price = price
        self.quantity = quantity
    def restock(self , amount):
        if amount <= 0 :
            raise ValueError ("amount must be greater than zero")
        self.quantity += amount
        return self.quantity 
    def sell(self, amount):
        if amount <= 0 :
            return ValueError ("amount must be greater than zero")
        elif amount > self.quantity :
            return ValueError ("insuficent amount")
        self.quantity -= amount
        return self.quantity
product1 = Product( "milk" , 50 , 10)
print(product1.sell(11))   
#3. Make it private. Change quantity to a private quantity and add a @property getter for it
class Product:
    def __init__(self , name , price , quantity):
        self.name = name 
        self.price = price
        self.__quantity = quantity
    @property 
    def qantity (self):
        return self.__quantity
    @qantity.setter
    def quantity (self , value):
        if value < 0 :
            return ValueError ("quantity can`t be negtive")
        else :
            self.__quantity = value
    def restock(self , amount):
        if amount <= 0 :
            raise ValueError ("amount must be greater than zero")
        self.__quantity += amount
        return self.__quantity 
    def sell(self, amount):
        if amount <= 0 :
            return ValueError ("amount must be greater than zero")
        elif amount > self.__quantity :
            return ValueError ("insuficent amount")
        self.__quantity -= amount
        return self.__quantity
    
product1 = Product( "milk" , 50 , 10)
product2 = Product( "water" , 40 , 30)
product3 = Product( "pen" , 25 , 15)


print(product1.quantity)
product1.quantity = 15
print(product1.quantity)
print(product2.quantity)
print(product3.quantity)

#4. Validate. Add a setter (or guard in sell) that refuses to let the quantity go below zero.
#5. Prove independence. Create three Product objects, change one, and show the other two are 
#unaffected.