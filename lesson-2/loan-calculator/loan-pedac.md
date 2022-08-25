# Question:

Create a loan calculator using thhe following equation:
let m = p * (j / (1 - Math.pow((1 + j), (-n))));
m = monthly payment
p = loan amount
j = monthly interest rate
n = loan duration in months

# PEDAC:

## Problem:
Inputs (all via readlineSync - strings):
 - Loan amount in dollars and cents
   - Could have currency sign - include currency sign as prompt
   - Could be in wirtten words? - To edge casey
   - Could be in EU format? - Good edge case
 - Monthly interest rate
    - Could be percentage, or decimal? 
    - Could be monthly or annual (APR / APY)
 - Duration
   - Years in years and months (ask years)

### Other rules


## Output: 

Monthly payment in dollar & cents  + concat text for explanation

## Examples:
https://www.calculator.net/loan-calculator.html?cloanamount=3200&cloanterm=10&cloantermmonth=0&cinterestrate=6&ccompound=monthly&cpayback=month&x=69&y=5#amortized-result

## Datastructure:

## Algorithm:

- Welcome user

- Ask for loan amount in years whole dollars
    - Input must be in whole dollars for example 5000
    - If input has comma or period remove - regex search / replace

    - If input contains alphabet characters, excluding ./,
        - While input contains alphatbet characters 
        - Report 'non numeric input invalid'
        - Ask for input
- Assign input for loanAmount
- Convert input string to number

- Ask for loan length in years
  - If input contains alphabet characters, excluding ./,
        - While input contains alphatbet characters 
        - Report 'non numeric input invalid'
        - Ask for input
- Convert to string to number/float
- Assign input to periodYears 
      
- If periodYears is an interger
    -  Ask for months in whole number ('if zero input 0')
        - While input contains alphatbet characters 
        - Report 'non numeric input invalid'
        - Ask for input
    -  Convert string to number
    -  Assign number to periodMonths

- Assign periodFull to periodYears + periodMonths

- Ask if percentage rate yearly (APY), convert percetage rate to monthky (APR)
    - If APR run conversion formuala
    - APR = ((((APY / 100) + 1) ** 12) - 1) * 100 
        - apy = 4 (for example)
        - 4 / 100 = 0.04
        - 0.04 + 1 = 1.04
        - 0.04 pow (1/12) = 1.0032737
        - 1.0032737 - 1 = 0.0032737
        - 0.0032737 * 100 = 0.32737
        - apr = 0.32737...
        - Formula from: https://budgeting.thenest.com/convert-annual-interest-rate-monthly-interest-rate-3366.html

    - Reassign % yearly to mothly rate

- Run calculation using formula
    - Round result to 2DP

-  Report unit + result  + string + units

- Ask if they would like to make anoth calculation
    If yes repeat calculation

