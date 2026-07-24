
#1. Vehicle hierarchy. Make a Vehicle base class with make, model, and a describe() method. 
#Add Car and Truck subclasses. 
class Vehicle:
    def __init__(self , make ,model):
        self.make = make 
        self.model = model 
    def describe(self):
        print( f"the car was made in {self.make} is {self.model} model ")
class Car(Vehicle):
    pass
class Truck(Vehicle):
    pass
car1 = Car("china" , "F150")
car1.describe()
#2. . Use super(). Give Truck a capacity attribute, setting make and model via super().init(). 
class Vehicle:
    def __init__ (self , make ,model):
        self.make = make 
        self.model = model 
    def describe(self):
        print( f"the car was made in {self.make} is {self.model} model ")
class Truck(Vehicle):
    def __init__(self ,make , model , capacity):
        super().__init__(make , model)
        self.capacity = capacity 
    def describe(self):
        return f"the car was made in {self.make} is {self.model} model have a {self.capacity} capacity"
vehicle = [Truck ("italy","vitz" , 500 ) , Truck("englan" ,"BYD" , 660) , Truck("usa" , "nissan" , 1000) ]
for i in vehicle:
    print(i.describe())
#5. Abstract method. Make Vehicle an abstract base class with an abstract wheels() method, and 
#have each subclass return its own number.
#from abc import ABC , abstractmethod
class Vehicle :
    def __init__(self , make ,model):
        self.make = make 
        self.model = model 
    from abc import ABC , abstractmethod
    def wheels(self , wheel):
        self.wheel = wheel
        return f"This vechicle has {self.wheel}"
    def describe(self):
        print( f"the vechile was made in {self.make} is {self.model} model ")
class Car(Vehicle):
    def __init__(self ,make , model , capacity):
        super().__init__(make , model)
        self.capacity = capacity 
    def wheels (self):
        return "This car has 4"
    def describe(self):
        return f"the car was made in {self.make} is {self.model} model have a {self.capacity} capacity"
class Truck(Vehicle):
    def __init__(self ,make , model , capacity):
        super(). __init__(make , model)
        self.capacity = capacity 
    def wheels (self):
        return "This truck has 8"
    def describe(self):
        return f"the truck was made in {self.make} is {self.model} model have a {self.capacity} capacity"
vehicle = [Truck ("italy","vitz" , 500 ) , Truck("england" ,"BYD" , 660) , Truck("usa" , "nissan" , 1000) ]

for i in vehicle:
    print(i.describe())
    print(i.wheels())