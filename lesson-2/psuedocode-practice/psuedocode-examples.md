
## 1. A function that returns the sum of two numbers

### Informal pseudocode

- Declare function with 2 params, num1, num2
- Function returns num1 + num2

### Formal pseudocode

START
GET num1
GET num2
Add num1 + num2
Return new value

---

## 2. A function that takes an array of strings, and returns a string that is all those strings concatenated together

### Informal pseudocode

- Given an array of strings
- Iterate through the strings one by one
- Add each string to a variable newString
- When the iteration count = the length of the string


### Formal pseudocode

Given an array of strings

START

SET newString
WHILE strings in array
    Add string at index[n] to newString

When no more strings in array
Return newString

---

## 3. a method that takes an array of integers, and returns a new array with every other element from the original array, starting with the first element. 

#### For instance:
everyOther([1,4,7,2,5]); // => [1,7,5]

### Informal pseudocode

Given an array with elements
- There is a Function with one parameter
    - It declares a new variable 'newArray'
    - It iterates over the array, incrementing its loop by 2
    - Each element is pushed to the newArray variable
    - When the loop is complete the newArray variable indexes are reversed.
- The function returns the newArray value.

### Formal pseudocode

START arrayOtherItems(array)

    SET newArray
    WHILE i < array.length, add 2 to i
        newArray.push(array[1])
    
    RETURN newArray.reverse()
END


---

## 4. function that determines the index of the 3rd occurrence of a given character in a string. For instance, if the given character is 'x' and the string is 'axbxcdxex', the function should return 6 (the index of the 3rd 'x'). If the given character does not occur at least 3 times, return null.

### Informal pseudocode

Given a string 

- Set a new variable thirdChar equal to the third index
- Set a new variable charCount
- Iterate of the characters in the string
    - If a character in string === to thirdChar 
        - Add 1 to char count
        - Continue the loop
- Return the charCount

### Formal pseudocode

Given a string

START countChar3(string)
    SET thirdChar = string[2]
    SET charCount = 0;
    WHILE i < string.length
        IF string[i] === thirdChar
            charCount += 1;
    RETURN charCount
END


---

## 5. function that takes two arrays of numbers and returns the result of merging the arrays. The elements of the first array should become the elements at the even indexes of the returned array, while the elements of the second array should become the elements at the odd indexes. 

Output:

#### For instance:
merge([1, 2, 3], [4, 5, 6]); // => [1, 4, 2, 5, 3, 6]

### Informal pseudocode

Given two arrays of numbers arrayEvens, arrayOdds

- Declare function mergeOddsEvens
    - Declare newArray
    - For each item in the arrayEvens, starting at index 0
        - Assign an item to newArray[i]
        - Increment the loop count by 2
    - For each item in arrayEvens, starting at index 1
        - Assign the item to newArray[j]
        - Increment the loop count by 2
    - Return newArray


### Formal pseudocode

START

Given two arrays of numbers arrayEvens, arrayOdds

SET newArray

WHILE i = 0; i < arrayEvens.length
    newArray[i * 2] = arrayEvens[i]
    i += 1

WHILE j = 1; j < array.Odds.length
    newArray[j + j + 1] = arrayOdds[j]
    j += 1

RETURN newArray

END