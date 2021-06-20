# Homework 4: Code Quiz

## Features
* Class **Question** builds multiple choice question objects with correct answer. 
    * Method displayQuestion changes main-text (h1) to this question text, 
    shows multiple choice buttons and adds event listeners to those buttons.
    * Method answerQuestion is passed to button click events.
* Functions startQuiz and endQuiz 
    * Styles updated properly
    * startQuiz starts timer, endQuiz stops it

## User Story

As a coding boot camp student
I want to take a timed quiz on JavaScript fundamentals that stores high scores
So that I can gauge my progress compared to my peers

## Goals of Project

Given I am taking a code quiz

* When I click the start button
    * Then a timer starts and I am presented with a question
* When I answer a question
    * Then I am presented with another question
* When I answer a question incorrectly
    * Then time is subtracted from the clock
* When all questions are answered or the timer reaches 0
    * Then the game is over
* When the game is over
    * Then I can save my initials and my score

