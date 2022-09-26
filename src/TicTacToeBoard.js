import { useState, useEffect } from 'react';

const getStartingMatrix = () => {
    return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
}

const TicTacToeBoard = () => {
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [playerXMoves, setPlayerXMoves] = useState(getStartingMatrix());
    const [playerOMoves, setPlayerOMoves] = useState(getStartingMatrix());

    useEffect(() => {
        console.log({ 
            playerXMoves,
            playerOMoves,
        });
    }, [playerXMoves, playerOMoves]);

    const togglePlayer = () => {
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    const handleTurn = (row, column) => {
        if (currentPlayer === 'X') {
            const newMoves = [...playerXMoves];
            newMoves[row][column] = 1;
            setPlayerXMoves(newMoves);
        } else {
            const newMoves = [...playerOMoves];
            newMoves[row][column] = 1;
            setPlayerOMoves(newMoves);            
        }

        togglePlayer();
    }

    const cellStyles = [
        ['', 'vertical-lines', ''],
        ['horizontal-lines', 'vertical-lines horizontal-lines', 'horizontal-lines'],
        ['', 'vertical-lines', ''],
    ];

    return (
        <>
        <table>
            <tbody>
                {[0, 1, 2].map((row) => (
                    <tr key={row}>
                        {[0, 1, 2].map((column, index) => (
                            <td 
                                key={`${row},${column}`}
                                className={cellStyles[row][column]}
                                onClick={() => handleTurn(row, column)}
                            >
                                {playerXMoves[row][column] ? 'X' : ''}
                                {playerOMoves[row][column] ? 'O' : ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <h3>It is Player {currentPlayer}'s turn</h3>
        </>
    )

    // return (
    //     <>
    //     <table>
    //         <tbody>
    //             <tr>
    //                 <td onClick={() => handleTurn(0 , 0)}></td>
    //                 <td className="vertical-lines"></td>
    //                 <td></td>
    //             </tr>
    //             <tr>
    //                 <td className="horizontal-lines"></td>
    //                 <td className="vertical-lines horizontal-lines">O</td>
    //                 <td className="horizontal-lines"></td>
    //             </tr>
    //             <tr>
    //                 <td></td>
    //                 <td className="vertical-lines"></td>
    //                 <td>X</td>
    //             </tr>
    //         </tbody>
    //     </table>
    //     <h3>It is Player {currentPlayer}'s turn</h3>
    //     </>
    // );
}

export default TicTacToeBoard;