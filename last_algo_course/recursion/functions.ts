function sum(n: number): number {
    if (n === 0) return 0;
    return n + sum(n - 1);
}

function factorial(n: number): number {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val?: number, next?: ListNode | null) {
        this.val = (val === undefined ? 0 : val)
        this.next = (next === undefined ? null : next)
    }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null, carry: number = 0): ListNode | null {
    // Recursion base case
    if (l1 === null && l2 === null && carry === 0) return null;

    // Get the values of the current nodes
    const val1 = l1 === null ? 0 : l1.val;
    const val2 = l2 === null ? 0 : l2.val;

    // Calculate the sum
    const sum = val1 + val2 + carry;
    const value = sum % 10;
    const newCarry = Math.floor(sum / 10);

    // Create the new node
    const result = new ListNode(value);

    // Get the next nodes
    const next1 = l1 === null ? null : l1.next;
    const next2 = l2 === null ? null : l2.next;

    // Recurse
    result.next = addTwoNumbers(next1, next2, newCarry);

    return result;
}

function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    if (list1 === null) return list2;
    if (list2 === null) return list1;

    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
}

function removeElements(head: ListNode | null, val: number): ListNode | null {
    if (head === null) return null;
    if (head?.val === val) return removeElements(head?.next, val);
    const newHead = new ListNode(head?.val);
    newHead.next = removeElements(head?.next, val);
    return newHead;
}

function myPow (x: number, n: number): number {
    if (n < 0) { // Conversion to positive power when n is negative
        n = Math.abs(n);
        x = 1 / x;
    }
    if (n == 0) return 1; // Exceptional case
    if (n == 1) return x; // Base case
    if (n % 2 == 0) return myPow(x * x, n / 2); // Recursive case (even power)
    return x * myPow(x * x, Math.floor(n / 2)); // Recursive case (odd power)
}

function reverseList(head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) return head; // Base case
    const rest_head = reverseList(head.next);
    const rest_tail = head.next;
    rest_tail.next = head;
    head.next = null;
    return rest_head;
}

// With Recursion
function isPowerOfTwoV1(n: number, i: number = 1): boolean {
    if (n === 1) return true;
    if (2 ** i === n) return true;
    else if (2 ** i > n) return false;
    return isPowerOfTwoV1(n, i + 1);
}

// Without recursion
function isPowerOfTwo(n: number): boolean {
    if (n === 1) return true;
    let i = 0;
    while (2 ** i < n) {
        i++;
    }
    return 2 ** i === n;
}

function swapPairs ( head: ListNode | null): ListNode | null {
    if (head === null || head.next === null) return head;
    const next = head.next;
    head.next = swapPairs( next.next );
    next.next = head;
    return next;
}

function reorderListV1( head: ListNode | null ): void {
    let slow = head;
    let fast = head?.next;
    // Determine split the node in two
    while (fast && fast.next) {
        slow = slow === null ? null : slow?.next;
        fast = fast === null ? null : fast?.next?.next;
    }

    let secondNode : ListNode | null = slow === null ? null : slow?.next; // Setting start of the Node
    let prev : ListNode | null = null; // Setting initial value for prev Node to reverse the ListNode
    if (slow !== null) {
        slow.next = null;
    }

    // Reverse the second Node
    while (!!secondNode) {
        let temp = secondNode.next;
        secondNode.next = prev;
        prev = secondNode;
        secondNode = temp;
    }

    // Merge two Nodes
    let firstNode = head;
    secondNode = prev;

    while (!!secondNode) {
        let [temp1, temp2] = [firstNode?.next, secondNode?.next];
        if (firstNode !== null) {
            firstNode.next = secondNode;
        }
        if (secondNode !== null) {
            secondNode.next = (!!temp1) ? temp1 : null;
        }

        firstNode = (!!temp1) ? temp1 : null;
        secondNode = (!!temp2) ? temp2 : null
    }
}

function reorderList(head: ListNode | null): void {
    let slow = head;
    if (head === null) return;
    let fast = head.next;

    while (fast && fast.next) {
        slow = slow?.next ?? null;
        fast = fast.next.next;
    }

    let second = slow?.next ?? null; // Start of the second node
    if (!!slow) slow.next = null; // Split the list into two
    let reverseTmp: ListNode | null = null; // Reverse the second node

    while (second) {
        const temp = second.next;
        second.next = reverseTmp;
        reverseTmp = second;
        second = temp;
    }

    second = reverseTmp; // Start of the reversed node
    let cur = head;      // Start of the first node
    while (second) {
        const temp1 = cur.next;
        const temp2 = second.next;
        cur.next = second;
        second.next = temp1;
        if (!!temp1) cur = temp1;
        second = temp2;
    }
};

function isPalindromeV1 ( head: ListNode | null ) : boolean {
    let list: number[] = [];
    while (head) {
        list.push(head?.val);
        head = head.next;
    }
    return list.join('') === list.reverse().join('');
}

function isPalindrome ( head: ListNode | null ) : boolean {
    let slow = head;
    if (head === null) return true;
    let fast = head?.next;

    while (fast && fast.next) {
        slow = slow?.next ?? null;
        fast = fast?.next?.next;
    }

    let second = slow?.next ?? null;
    if (!!slow) slow.next = null;
    let reverseTmp : ListNode | null = null;

    while (second) {
        const temp = second.next;
        second.next = reverseTmp;
        reverseTmp = second;
        second = temp;
    }

    second = reverseTmp;
    let cur : ListNode | null = head;

    while (second) {
        const temp1 = cur?.val;
        const temp2 = second?.val;
        if (temp1 !== temp2) return false;

        cur = cur?.next ?? null;
        second = second?.next ?? null;
    }

    return true;
}

function fib (n: number) : number {
    if (n === 0) return 0;
    if (n === 1) return 1 + fib(0);
    return fib( n - 1 ) + fib (n - 2);
}

function isPowerOfThree(n: number, pow: number = 1): boolean {
    if (n === 1) return true;
    if (3 ** pow > n) return false;
    if (3 ** pow === n) return true; 
    return isPowerOfThree(n, pow + 1);
}

function isPowerOfFour(n : number, pow: number = 1): boolean {
    if (n === 1) return true;
    if (4 ** pow === n) return true;
    if (4 ** pow > n) return false;
    return isPowerOfFour(n, pow + 1); 
}

function lastRemaining(n: number): number {
    if (n === 1) return 1; 
    return 2 * (Math.floor(n / 2) + 1 - lastRemaining(Math.floor(n / 2)));
}