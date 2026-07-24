#question 1
import numbers
def getOnlyEvens(numbers):
    result = []
    for i  in range(len(numbers)):
        if i % 2 == 0 and numbers[i] % 2 == 0:
            result.append(numbers[i])
    return result
#test 1
print(getOnlyEvens([1, 2, 3, 6, 4, 8]))  # prints [4]
#test 2
print(getOnlyEvens([0, 1, 2, 3, 4]))     # prints [0, 2, 4]



# question 2
def reverseCompare(number):
    first=number//10
    second=number%10
    reverse=second*10+first
    if number>reverse:
        return "Ok"
    else:
        return "Not ok"
#test 
number1=reverseCompare(72)  # prints "Ok"
number2=reverseCompare(23)  # prints "Not ok"
print(number1)
print(number2)



# Question 3
def returnFactorial(n):
    result=1
    for i in range(1, n + 1):
        result *= i
    return result
n1=returnFactorial(5)  # outputs 120
n2=returnFactorial(6)  # outputs 720
n3=returnFactorial(0)  # outputs 1
print(n1)
print(n2)
print(n3)



# Question 4  
def checkMeera(arr):
    for n in arr:
        if n * 2 in arr:
            return "I am NOT a Meera array"
    return "I am a Meera array"
#test
checkMeera([10, 4, 0, 5])  # outputs “I am NOT a Meera array”
checkMeera([7, 4, 9])      # outputs “I am a Meera array”
checkMeera([1, -6, 4, -3]) # outputs “I am NOT a Meera array”



# Question 5 
def isDual(arr):
    for n in arr:
        if arr.count(n) != 2:
            return 0    
    return 1
print(isDual([1, 2, 1, 3, 3, 2]))  # returns 1
print(isDual([2, 5, 2, 5, 5]))  # returns 0
print(isDual([3, 1, 1, 2, 2]))  # returns 0   



 # Question 6
def digitalClock(seconds):
    hours = (seconds // 3600) % 24
    minutes = (seconds % 3600) // 60
    secs = seconds % 60
    if hours<10:
        hours= "0" + str(hours)
    else:
        hours=str(hours)
    if minutes<10:
        minutes= "0" + str(minutes)
    else:
        minutes=str(minutes)
    if secs<10:
        secs= "0" + str(secs)
    else:
        secs=str(secs)
    return f"{hours}:{minutes}:{secs}"
print(digitalClock(5025))   # as "01:23:45"
print(digitalClock(61201))  # as "17:00:01" 
print(digitalClock(87000))  # as "00:10:00" 