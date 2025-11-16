
#include <iostream>
#include <stack>  // include the stack library
using namespace std;

int main() {
    // Create a stack of integers
    stack<int> s;

    // ----- PUSH -----
    cout << "Pushing elements into the stack...\n";
    s.push(10);
    s.push(20);
    s.push(30);

    cout << "Current top element: " << s.top() << endl; // Should print 30

    // ----- POP -----
    cout << "\nPopping top element...\n";
    s.pop(); // Removes 30
    cout << "New top element: " << s.top() << endl; // Should print 20

    // ----- SIZE -----
    cout << "\nStack size now: " << s.size() << endl;

    // ----- EMPTY -----
    if (s.empty())
        cout << "Stack is empty.\n";
    else
        cout << "Stack is not empty.\n";

    // Display all elements (by popping them)
    cout << "\nElements in stack (top to bottom): ";
    while (!s.empty()) {
        cout << s.top() << " ";
        s.pop();
    }
    cout << endl;

    return 0;
}
