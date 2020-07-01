import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;




class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <Container>
        <Main />
      </Container>
    );
  }
}


export default App;

// Cellコンポーネント

const Cell = styled.td`
background: #fefefe;
height: 48px;
width: 48px;
cursor: pointer;
font-size: 2rem;
&.js-no-mark{
  pointer-events: none;
}
`;

function Cells(props) {
  return(
    <Cell className="js-cell" onClick = {props.onClick}>
      {props.value}
    </Cell>
 )
}

// Mainコンポーネント

const AllBoard = styled.div`
padding: 16px;
`;
const Table = styled.table`
background-color: black;
border: 2px solid #fefefe;
`;
const Line = styled.div`
display: flex;
border-bottom: 1px solid black;
`;

const Game = styled.div`
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: Array(9).fill(null),
      turnCircle: true,
      counter: 0
    };
  }
  handleClick(i) {
    const newCells = this.state.cells.slice();
    if(newCells[i] || isWin(newCells)) {
      return;
    }
    newCells[i] = this.state.turnCircle ? '○' : '×';
    let newCounter = this.state.counter;
    newCounter++;
    this.setState({
      cells: newCells,
      turnCircle: !this.state.turnCircle,
      counter: newCounter
    });
  }
  renderCell(i) {
    return (
      <Cells
        value={this.state.cells[i]}
        onClick = {() => this.handleClick(i)}
      />
    );
  }
  render() {
    return(
      <Game>
        <Display turnCircle={this.state.turnCircle}/>
        <AllBoard>
          <Table>
            <tbody>
              <tr className="row">
                {this.renderCell(0)}
                {this.renderCell(1)}
                {this.renderCell(2)}
              </tr>
              <tr className="row">
                {this.renderCell(3)}
                {this.renderCell(4)}
                {this.renderCell(5)}
              </tr>
              <tr className="row">
                {this.renderCell(6)}
                {this.renderCell(7)}
                {this.renderCell(8)}
              </tr>
            </tbody>
          </Table>
        </AllBoard>
        <Messages
          cells={this.state.cells}
          counter={this.state.counter}
        />
        
      </Game>
    )
  }
}

// Displayコンポーネント

const Top = styled.div`
padding: 16px;
`;
const Turn = styled.div`
display: flex;
justify-content: center;
`;
const TurnItem = styled.div`
&.noActive {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 8px 16px; 
}
&.active {
  font-size: 1.2rem;
  font-weight: bold;
  padding: 8px 16px;
  border-bottom: 3px solid black;
}
`;

class Display extends React.Component {
  render() {
    const circleClass = this.props.turnCircle ? 'active' : 'noActive';
    const crossClass = this.props.turnCircle ? 'noActive' : 'active';
    return(
      <Top>
        <h1>TIC TAC TOE</h1>
        <Turn>
          <TurnItem className={circleClass}>○</TurnItem>
          <TurnItem className={crossClass}>×</TurnItem>
        </Turn>
      </Top>   
    )
  }
}

// Messagesコンポーネント

const Under = styled.div`
display: flex;
flex-direction: column;
-webkit-box-pack: center;
justify-content: center;
padding: 16px;
`;
const Message = styled.div`
padding: 8px;
`;
const Button = styled.a`
display: inline-block;
font-weight: bold;
border: 3px solid black;
border-radius: 6px;
padding: 4px 16px;
&:hover{
  background-color: black;
  color: white;
  cursor: pointer;
}
`;


class Messages extends React.Component {
  render() {
    let result;
    if(isWin(this.props.cells)) {
      result = `${isWin(this.props.cells)} win`;
    } else if(this.props.counter === 9) {
      result = 'draw';
    }  else {
      result = 'processing';
    }
    return(
      <Under>
        <Message className="js-state-message">{result}</Message>
        <Button 
          className="js-restart"
          onClick= {() => window.location.reload()}
          >Restart</Button>
      </Under>
    )
  }
}

// 勝敗の判定

const isWin = (array) => {
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
  for(let i = 0;i < lines.length;i++) {
    const [a,b,c] = lines[i];
    if(array[a] && array[b] === array[a] && array[c] === array[a] ) {
      return array[a];
    }
  }
  return null;
} 