# Browser Calculator

Use DOM Manipulation to build a basic calculator using the provided HTML and CSS.

![Example](screenshots/example.gif)

More specifically, the app should allow a user to do the following.

- Click an operand or operator button to append its corresponding text to the screen.
  - If the screen displays the message `Error`, don't append anything.
- Click the `clear` button to remove all the text from the screen.
- Click the `equals` button to evaluate the arithmetic expression shown in the screen.
  - If the expression is in format `operand(+|-|x|÷)operand`, evaluate the expression and update the screen with the result.
  - If the expression isn't in the correct format or when attempting to divide by zero, update the screen with the message `Error`.

### Bonus 1

Try to solve the exercise without changing the existing HTML nested inside the `buttons-container` tag.

### Bonus 2

Try to evaluate the expression without using the `eval()` function.

### Bonus 3

Enhance the calculator so users can input arithmetic expressions using their keyboard. More specifically, the app should allow a user to do the following.

- Type an arithmetic expression directly to the `screen`.
- Press the `Enter` key to evaluate the screen's expression.
- Press the `Escape` key to clear the screen.

**TIP:** You'll have to change the `screen` to an `<input>` tag.
