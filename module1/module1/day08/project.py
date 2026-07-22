def binary_search(items, target):
    low, high = 0, len(items) - 1
    while low <= high:
        mid = (low + high) // 2
        if items[mid] == target:
            return mid
        elif items[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1


class AccountRegistry:
    # ... existing registry setup ...

    def top_by_balance(self, n=5):
        accts = sorted(
            self.by_number.values(),
            key=lambda a: a.balance,
            reverse=True
        )
        return accts[:n]

    def find_by_number(self, number):
        nums = sorted(self.by_number)
        idx = binary_search(nums, number)
        return self.by_number[nums[idx]] if idx >= 0 else None

    def total_transactions(self, number):
        acct = self.find_by_number(number)
        if not acct or not hasattr(acct, "transactions"):
            return 0

        def _sum_rec(txs):
            if not txs:
                return 0
            return txs[0] + _sum_rec(txs[1:])

        return _sum_rec(acct.transactions)
# if __name__ == "__main__":
#     # Mock Account class for testing
#     class Account:
#         def __init__(self, name, balance, transactions):
#             self.name = name
#             self.balance = balance
#             self.transactions = transactions

#     # Set up registry with sample data
#     reg = AccountRegistry()
#     reg.by_number = {
#         101: Account("Alice", 500, [10, 20, 30]),
#         102: Account("Bob", 1200, [100, -50, 200]),
#         103: Account("Charlie", 300, [5, 15]),
#     }

#     # Test top_by_balance
#     top = reg.top_by_balance(2)
#     print("Top 2 accounts:", [a.name for a in top])

#     # Test find_by_number
#     acct = reg.find_by_number(102)
#     print("Found account 102:", acct.name if acct else "Not found")

#     # Test total_transactions
#     print("Total transactions for 102:", reg.total_transactions(102))