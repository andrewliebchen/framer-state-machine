class exports.Machine
	constructor: (options) ->
		@options = options

		# Render the initial view
		@render()

	render: -> @options.layers()

	killLayers: () ->
		# Destroy all layers
		# It'd be cool to do some diffing here...
		for layer in @options.framer.CurrentContext._layers
			layer.destroy()

	setState: (newState) ->
		# Set the state
		# Iterate through the object
		_.map newState, (value, key) =>
				@options.state = _.set @options.state, key, value

		@killLayers()
		@render()

	toggleState: (key) ->
		# Get the current value
		@value = _.get @options.state, key

		# Set the value to the opposite
		@options.state = _.set @options.state, key, !@value

		@killLayers()
		@render()

	debug: () ->
		print @options.state
