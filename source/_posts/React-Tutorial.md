---
title: DenseBox代码解析  
date: 2022-01-02 21:24:39  
tags:  
---

# Tutorial

React 是一个 JS 库，使用 component 构成 UI 。根据官方提供的教程可以完成一个小游戏，同时梳理教程的安排可以更好地理解如何使用 React 。

# 整体结构

## Square

```jsx
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {/* TODO */}
      </button>
    );
  }
}
```

## Board

```jsx
class Board extends React.Component {
  renderSquare(i) {
    return <Square />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
	        /*......*/
        </div>
				/*......*/
      </div>
    );
  }
}
```

## Game

```jsx
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
```

## React DOM

```jsx
ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
```

# 在底层的 Square 中先做些基础工作

## props

我们在 Board 中向 Square 传递的数据，从而控制 Square 应该显示什么。从父向子传递数据，就需要用到 props 。

```jsx
/*父*/
class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }
}

/*子*/
class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}
```

注意，这里我们的 props 名为 value ，当然我们也可以使用其他的名称，但是注意避免使用到保留字（如 key）。

## component 的交互

```jsx
class Square extends React.Component {
 render() {
   return (
     <button className="square" onClick={() => console.log('click')}>
       {this.props.value}
     </button>
   );
 }
}
```

1. 对于传递函数作为参数，需要注意不可以直接传递函数本身，这样会直接调用函数并返回一个 undefine 给 onClick 。常用的做法是在外面包一层匿名函数，然后在匿名函数里执行真正的函数。
2. 另外，我们使用箭头函数（特殊的匿名函数），是因为它不绑定 this ，能够捕获其上下文的 this ，减少出现 bug 的可能。

## state

我们通过 state 记录控件状态，

在 Button 的 onClick 函数中，状态值被 setState() 函数更新之后，会通知 Square 重新渲染界面。

```jsx
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button
        className="square"
        onClick={() => this.setState({value: 'X'})}
      >
        {this.state.value}
      </button>
    );
  }
}
```

当在 component 调用 setState 函数后，React 也会自动更新子 component。

## 已完成

可响应用户点击的交互界面

# 在中层的 Board 进行游戏规则的实现

## Lift State Up

目前的应用虽然在 Square 中记录了 state ，但是它的作用空间太小，凭此无法记录游戏中还需要的两个重要数据：

1. 棋盘当前状态，用于判断游戏终止
2. 当前落子的用户，用于实现轮换落子
- 对于第一点：
    1. 我们把每个 Square 中的状态提升并集中到 Board 中，用数组中统一管理，用来表示当前棋盘状态，可以为 'X' , 'O' 或 null 。
        
        ```jsx
        class Board extends React.Component {
          constructor(props) {
            super(props);
            this.state = {
              squares: Array(9).fill(null),
            };
          }
        
          renderSquare(i) {
            return <Square value={this.state.squares[i]} />;
          }
        	/*...*/
        }
        ```
        
    2. 在统一管理状态时，除了初始化赋值，还需要能够修改它。因此，需要从 Board 向 Square 传入 handleClick(i) 函数，与 每个 Square 对应。
        
        ```jsx
        handleClick(i) {
            const squares = this.state.squares.slice();
            squares[i] = 'X';
            this.setState({squares: squares});
        }
        
        renderSquare(i) {
            return (
              <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)}
              />
            );
          }
        ```
        
    3. 善后工作，因为状态已经提升出去了，因此需要对 Square 这个 component 进行修改:
        
        删除不必要的构造函数 + 从 prop 中获取 value + 从 prop 中获取 onClick 函数。
        
        ```jsx
        class Square extends React.Component {
          render() {
            return (
              <button
                className="square"
                onClick={() => this.props.onClick()}
        				/*onClick={this.props.onClick}*/
              >
                {this.props.value}
              </button>
            );
          }
        }
        ```
        
    4. 进一步简化：Function Components
        
        目前， Square 完全成为一个 controlled components ，因为它不仅接收 Board 的赋值，而且在自身改变时（如被点击）会通知 Board 。由于它只含有一个 render 方法，没有自身的状态，因此我们可以使用 Function component 代替 Class component 的写法，使程序更加简洁：Function component 的输入参数是 props ，返回值为待渲染控件。
        
        ```jsx
        /*Class component*/
        class Square extends React.Component {
          render() {
            return (
              <button
                className="square"
                onClick={() => this.props.onClick()}
        				/*onClick={this.props.onClick}*/
              >
                {this.props.value}
              </button>
            );
          }
        }
        
        /*Function component*/
        function Square(props) {
          return (
            <button className="square" onClick={props.onClick}>
              {props.value}
            </button>
          );
        }
        ```
        
- 对于第二点
    
    需要添加一个状态值用于记录轮换状态 ，并且每次点击之后，转换这个状态。官网教程使用 xIsNext 这个逻辑用于判断轮换：
    
    ```jsx
    class Board extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
        };
      }
    
    	handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
      }
    
    	render() {
        const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    		/*...*/
    	}
    	
    	/*...*/
    }
    ```
    
    注意：在 handleClick 函数中，对于 squares（state）的更新，并非直接改变它的值，而是先设置 squares（temp），然后再通过 setState 函数更新 squares （state）。
    

## 游戏终止逻辑

首先，游戏终止的判断一定是在点击触发时执行的，有两个条件会造成游戏终止：

1. 有玩家获胜：在每次点击之后，将当前棋盘状态与所有可能获胜的组合对比，如果获胜则返回当前玩家符号。
    
    ```jsx
    function calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
        }
      }
      return null;
    }
    ```
    
2. 棋盘下满：官方文档没有专门进行判断。因为在 handleClick 函数中，还规定了在同一位置不能重复落子，所以棋盘下满时，用户必然无法进行其他操作。
    
    ```jsx
    handleClick(i) {
        const squares = this.state.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          squares: squares,
          xIsNext: !this.state.xIsNext,
        });
      }
    ```
    

## 已完成

可响应用户点击的交互界面 + 可以判断赢家的游戏机制

# 在高层的 Game 实现历史记录功能

## Lifting State Up, Again

为了实现历史记录，需要把棋盘状态在更高一层的 Game 里进行管理，顺带把 Board 的其他状态或者处理函数也一并上提。

- 对于 Board ，状态上提后需要调整 state 为 props：
    
    ```jsx
    class Board extends React.Component {
      renderSquare(i) {
        return (
          <Square
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
          />
        );
      }
    
      render() {
        return (
          <div>
            <div className="board-row">
    					/*...*/
            </div>
    				/*...*/
            </div>
          </div>
        );
      }
    }
    ```
    
- 对于 Game，则需要将添加一些内容：
    
    在 state 中引入 history 数组，记录每次落子（点击）前的棋盘状态，并把 xIsNext 也添加到 state 中：
    
    ```jsx
    class Game extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          history: [{
            squares: Array(9).fill(null)
          }],
          xIsNext: true
        };
      }
    	/*...*/
    }
    ```
    
    在 handleClick 函数中，我们基于最近的历史记录进行判断，是否可以落子，如果可以落子，则将落子后的状态附加到 history ：
    
    ```jsx
    class Game extends React.Component {
      handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares
          }]),
          xIsNext: !this.state.xIsNext,
        });
      }
    	/*...*/
    }
    ```
    
    在 render 函数中，增加显示 game-info 的逻辑。
    
    ```jsx
    class Game extends React.Component {
    	/*...*/
      render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const winner = calculateWinner(current.squares);
    
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
    
        return (
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{/* TODO */}</ol>
            </div>
          </div>
        );
      }
    }
    ```
    
    你可能注意到了，这里我们在 history 里只记录了棋盘状态，而没有记录当时落子的用户是谁。
    

## 显示历史落子记录

我们在 game-info 里显示历史记录，通过 map 函数将 history 中的历史记录逐一生成有序列表<ol >的元素<li>，其中包含了可以点击跳转的 button 。

```jsx
class Game extends React.Component {
	render() {
	    const history = this.state.history;
			/*...*/
	
	    const moves = history.map((step, move) => {
	      const desc = move ? ('Go to move #' + move) : ('Go to game start');
	      return (
	        <li>
	          <button onClick={() => this.jumpTo(move)}>{desc}</button>
	        </li>
	      );
	    });
	
			/*...*/
			
	    return (
	      <div className="game">
					/*...*/
	        <div className="game-info">
	          <div>{status}</div>
	          <ol>{moves}</ol>
	        </div>
	      </div>
	    );
	  }
	}
}
```

map 函数的参数 step 和 move 可以看作是 value 和 index 。

## Picking a Key

完成上述步骤后，你会得到下列警告：

```jsx
Warning: Each child in an array or iterator should have a unique “key” prop. Check the render method of “Game”.
```

这是因为当 React 渲染列表时，它会存储每个元素的信息，当我们更新列表时，React 需要根据这个来确定哪些地方改变了，我们才能够看到列表元素的增、删、重新排序、改。因此我们需要给每个列表元素一个 key ，React 通过维护和更新这些 key 来实现列表的更新。因此，当你构建动态列表时，一定要分配适当的 key 。

在官网教程中，使用 move （即 history 的 index）作为 key，它表示步数序号。这里能够安全使用 move 作为 key 的原因，是因为这里的列表元素不会重新排序、删除或者在中间插入， 因此步数序号与执行步骤一一对应。另外，key 无需全局唯一，它只需要在同一级的 component 直接唯一即可。

```jsx
class Game extends React.Component {
	/*...*/
	render() {
    const history = this.state.history;
		/*...*/

    const moves = history.map((step, move) => {
      const desc = move ? ('Go to move #' + move) : ('Go to game start');
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

		/*...*/
  }
}
```

## 历史记录跳转功能

接下来我们要做的事情就是点击按钮可以跳转到对应的历史记录。分为以下两步：

1. 将点击的按钮与对应历史绑定
2. 更新跳转后的状态
3. 调整渲染逻辑

对于第一点：将历史记录的序号与点击跳转按钮的序号对应即可：在给每一个历史记录按钮添加对应的 key (move) 之后，我们在 Game 的 state 中添加 stepNumber 状态，使得 move 和 stepNumber 两者相互配合：即点击某一条历史记录，跳转到与之 key (move) 对应的 stepNumber 历史。

对于第二点：有两处的状态需要更新，

1. 跳转函数执行时，需要更新 xIsNext 状态
2. 点击棋盘函数执行时，需要更新新增的 stepNumber 状态

在新增状态之后，点击棋盘函数处理的 history 也应开始使用最近的基于当前上下文的历史而非完整历史。这样在每次跳转历史之后，总能基于当前的状态重新记录历史。

对于第三点：

我们修改一下渲染逻辑，从总是渲染最新历史，变更为渲染当前上下文对应的历史记录即可：

```jsx
class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,  /*新增状态*/
      xIsNext: true,
    };
  }

	jumpTo(step) {
    this.setState({
      stepNumber: step,
			xIsNext: (step % 2) === 0,  /*第一处状态更新*/
    });
  }

	handleClick(i) {
		/*
		const history = this.state.history;
		*/
    const history = this.state.history.slice(0, this.state.stepNumber + 1);  /*使用当前上下文的历史*/
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,  /*第二处状态更新*/
      xIsNext: !this.state.xIsNext,
    });
  }

	render() {
	    const history = this.state.history;
	    const current = history[this.state.stepNumber];  /*渲染当前上下文对应的历史*/
	    const winner = calculateWinner(current.squares);
			/*...*/
	}
}

```

至此，TIc-Toc-Toe 基本完成。

# TODO

1. Display the location for each move in the format (col, row) in the move history list.

2. Bold the currently selected item in the move list.

3. Rewrite Board to use two loops to make the squares instead of hardcoding them.

4. Add a toggle button that lets you sort the moves in either ascending or descending order.

5. When someone wins, highlight the three squares that caused the win.

6. When no one wins, display a message about the result being a draw.