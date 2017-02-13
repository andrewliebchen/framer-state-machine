# Framer State Machine

Managing simple application state in Framer is pretty straightforward for simple prototypes, but things get complicated quickly.

For example, let’s say we’ve got a counter, a message that tells you the state of the counter, and a button that increments the counter. Simple: just set the initial value of the counter variable, set up the message, increment the variable onClick, then update the message.

```coffeescript
counter = 0
message = new Layer
  html: "The button has been pressed #{counter} times"
button = new Layer
  ...
button.onClick ->
  counter++
  message.html = "The button has been pressed #{counter} times"
```

ReactJS, unlike Framer, has got a neat way of dealing with application state: it stores it all in one place and then re-renders the necessary parts of the UI when the state changes. Combined with a well-defined inheritance model to pass information around the component tree, React makes it really easy to “reason” about state. All your application's state is in one place, and how components respond to that state are written in the components themselves.

If we had built the example above in React instead of Framer, when we increment that counter, any part of the component that relies on the state (in our case, the message) is automatically re-rendered to reflect the change. Nice!

## Okay, so what does this module do?

This module provides you with some basic React-style state management in your Framer prototype. The module provides you with methods to update the application state, and automatically re-renders the application to represent the latest state.

Included with this repo is a simple demo...

![State machine demo](/demo.gif)

Read more about the module on [Medium](https://blog.framer.com/react-style-state-machine-for-framer-e1c4e7032e65#.oc8c4jawv).

## How to use it

Add the module to your Framer project:
* Download the project from Github
* Copy `stateMachine.coffee` into your project's `/modules` directory
* Import the module into your prototype by adding `{ machine } = require 'stateMachine'` at the top of your `app.coffee`
* Rename `boilerplate.coffee` to `app.coffee`, copy and overwrite it into your project's root directory (optional)

## There's more set up to do...

For this module to work, you need to format your project code in a certain way. There are three parts to any prototype using Framer-state:

1. A `state` object
2. A `layers` function
3. An instantiation of the `Machine` class

Let's take those things one by one, using our counter example above.

### `state`

You must define an initial...uh...state for the state object. In the counter example, our state object would look like this:

```coffeescript
state =
  counter: 0
```

As I bet you can guess, we'll be updating `state.counter` in response to something the user does, and the prototype's rending of the current count will update too.

### `layers`

`layers` is a function which contains your normal Framer layers. We might write this:

```coffeescript
layers = () ->
  counter = new Layer
    html: "The current count is #{state.counter}"
```

By calling `state.counter` in that interpolated string, well actually render the current state of the counter. So when the prototype first loads, the counter layer will read "The current count is 0"

Let's make the counter increment when you click on it:

```coffeescript
  counter = new Layer
    html: "The current count is #{state.counter}"

  counter.onClick ->
    app.setState { 'counter': state.counter++ }
```

The `setState` method simply iterates through all key/value pairs in the param and updates the corresponding key/value pairs in the `state` object, then re-renders the prototype to reflect the new state. Above, we're updating `counter` to be one number greater than the current value of the counter (`state.counter++` is the same as `state.counter + 1`).

There are a couple other methods for updating state, covered below.

### `Machine`

To make this all work, you must instantiate an instance of the State Machine. At the end of your prototype, after your `layer` function, add the class:

```coffeescript
app = new Machine
  state: state
  layers: layers
  framer: Framer
```

You'll notice that we also pass the `Framer` object the State Machine. That's just so it can have access to a list of layers in your prototype. `state` and `layers` will be the variables you assigned above.

Putting it all together, your (condensed) prototype will look like this:

```coffeescript
{ Machine } = require 'stateMachine'

state =
  counter: 0

layers = () ->
  ...

app = new Machine
  state: state
  layers: layers
  framer: Framer
```

For a slightly more sophisticated example, view `todoExample.framer` included in this repo.

## It's not perfect

One of React's nice features is the virtual DOM, which allows React to only re-render parts of your app that actually changed. For State Machine, I'm kind of brute-forcing the solution: every state update re-renders the entire app.

This is pretty performant when your prototype is smaller or consists only of Framer-drawn layers, not imported Sketch layers. You've been warned 🤷

If you've got ideas about how to make this better, feel free to open an issue or submit a pull request!

## Methods

`setState`: Requires an object. Iterates through each key/value pair you pass it, updates the state object, then re-renders the prototype.

Path to your key are represented by a string. So for instance `'item[3].status'` as a key will update the `status` of the third `item` in the state collection.

`toggleState`: Requires a string. The key's value must be a boolean. This method simply reverses the boolean. You'd use this method to update the state controlled by a switch or single checkbox, for example. The string represents the path to a key in your state object, as detailed above.
