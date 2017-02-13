{ Machine } = require 'stateMachine'
{ TextLayer } = require 'TextLayer'
InputModule = require 'input'

Framer.Defaults.Layer =
	backgroundColor: null
	color: 'black'

p =
	todo:
		width: Screen.width * 0.75
		height: 40
	textStyle:
		fontSize: 16
		fontFamily: '-apple-system'
		color: 'black'
		lineHeight: '40px'

state = 
	todos: [
		{
			label: 'Make a state machine for Framer'
			done: true
			color: Utils.randomColor()
		}, {
			label: 'Create a todo app in Framer'
			done: false
			color: Utils.randomColor()
		}
	]

layers = () ->
	todosCompleted = _.sumBy(state.todos, {done: true}) / state.todos.length
	
	todoList = new Layer
		x: Align.center
		y: Align.top(p.todo.height * 1.5)
		width: p.todo.width
			
	input = new InputModule.Input
		parent: todoList
		y: (p.todo.height + 10) * state.todos.length
		width: p.todo.width
		height: p.todo.height
		fontSize: 16
		borderWidth: 1
		borderColor: 'black'
		placeholder: 'New todo'
		virtualKeyboard: false
		
	input.style =
		'line-height': '40px'
		'box-sizing': 'border-box'
	
	input.form.addEventListener "submit", (event) ->
		event.preventDefault()
		app.setState {
			"todos[#{state.todos.length}].label": input.value
			"todos[#{state.todos.length}].color": Utils.randomColor()
		}
	
	if todosCompleted == 1
		banner = new TextLayer
		bannerTextStyle =
			text: 'All done! 👍' 
			width: p.todo.width
			x: Align.center
			y: Align.top(20)
			fontWeight: 'bold'
		_.assign banner, _.extend bannerTextStyle, p.textStyle
	else	
		progress = new Layer
			width: p.todo.width
			height: 10
			backgroundColor: '#ddd'
			x: Align.center
			y: Align.top(p.todo.height)
	
		progressBar = new Layer
			parent: progress
			width: todosCompleted * progress.width 
			height: progress.height
			backgroundColor: 'black'
				
	for item, index in state.todos
		do (item, index) ->
			@todo = new Layer
				parent: todoList
				name: 'todo'
				borderWidth: 1
				borderColor: 'black'
				width: p.todo.width
				height: p.todo.height
				y: Align.top((p.todo.height + 10) * index)
			
			todo.onClick ->
				app.toggleState "todos[#{index}].done"
			
			@checkBox = new Layer
				name: 'checkbox'
				parent: @todo
				borderWidth: 1
				borderColor: 'black'
				size: p.todo.height / 2
				x: Align.left(9)
				y: Align.center
				backgroundColor: if item.done then 'black' else null
			
			@todoText = new TextLayer
			todoTextStyle = 
				name: 'todo:text'
				parent: @todo
				text: item.label
				width: todo.width
				paddingLeft: p.todo.height
				style: 
					'text-decoration': if item.done then 'line-through' else 'none'
			_.assign todoText, _.assign todoTextStyle, p.textStyle
		
			@color = new Layer
				name: 'todo:color'
				parent: @todo
				size: p.todo.height / 2
				x: Align.right(-9)
				y: Align.center
				backgroundColor: item.color
	

app = new Machine
	state: state
	layers: layers
	framer: Framer	