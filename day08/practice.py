# 1. Recursive sum & count_down
def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])


def count_down(n):
    if n <= 0:
        return
    print(n)
    count_down(n - 1)


# 2. Binary search
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


# 3. Merge sort
def merge_sort(items):
    if len(items) <= 1:
        return items

    mid = len(items) // 2
    left = merge_sort(items[:mid])
    right = merge_sort(items[mid:])

    return _merge(left, right)


def _merge(left, right):
    out = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1

    out.extend(left[i:])
    out.extend(right[j:])
    return out


# 4. Sort with a key
def sort_by_balance(accounts):
    return sorted(accounts, key=lambda acc: acc[1], reverse=True)


# 5. Two pointers
def has_pair(nums, target):
    l, r = 0, len(nums) - 1

    while l < r:
        val = nums[l] + nums[r]
        if val == target:
            return True
        elif val < target:
            l += 1
        else:
            r -= 1

    return False
# print(total([1, 2, 3, 4, 5]))
# count_down(3)
# print(binary_search([10, 20, 30, 40], 30))
# print(merge_sort([5, 2, 8, 1, 9]))
# print(sort_by_balance([("Alice", 200), ("Bob", 500)]))
# print(has_pair([1, 3, 5, 8, 11], 13))