{ Machine } = require 'stateMachine'

state =
  # An object with your initial state

layers = () ->
  # Add your Framer layers in this function

app = new Machine
  state: state
  layers: layers
  framer: Framer
