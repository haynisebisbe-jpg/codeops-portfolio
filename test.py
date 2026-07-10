total=  int  (input("Enter the total bill amount: "))
total_number_of_people= int  (input("Enter the total number of people: "))
def split_the_bill(total,_number_of_people,rate=0.10):
    total_with_tip=total+(total*rate)
    amount_per_person=total_with_tip/total_number_of_people
    return amount_per_person

print (split_the_bill(total,total_number_of_people))