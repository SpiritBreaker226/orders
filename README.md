# Cloudkitchens Interview Challenge

## Background

At City Storage Systems, we assist in the production and fulfillment of online food orders. In the process of creating and delivering these orders, some common workflows involve processing and displaying large amounts of order events — when orders are placed, prepared, delivered, etc. These orders and events can be displayed on interfaces used by cooks, delivery drivers, in-house engineers, and more. You will be building a (simulated) system to help facilitate this.

## Challenge Prompt

Build an in-browser application that displays Orders in real-time as they are delivered from a provided server API, and allows users to search their Orders by price.

During the deep dive following the challenge, we’ll check out your real-time simulation in action, collaboratively explore your code, and augment, fix, and iterate on your solution together.

## Notes

### Order Search Tree vs Orders in State

Since the Order search tree is not used for display, it is too slow to convert it into an array that the UI can use. However, we can still use it for searching and let it be where the full orders are located, whereas the orders in the state can be used for display. Those we can use to remove orders that have already been delivered.

### Remove Completed Orders

Remove the completed orders from the Orders event to not clog up the display with finished orders since this will slow the screen. Furthermore, pagination or infinite scroll will not work in this context as the page is continually updated.

Instead, we should limit what is being displayed and only show the active orders as the users will more likely see what is happening. For example, we can store all the orders in other data structures and search there, speeding up the search and having a place where we can display an archive to the user of what orders they have done for the day. Furthermore, we can make reports from them using this data structure.