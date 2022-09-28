import { useState, useEffect } from 'react';

const TicTacToeBoard = ({
    playerXMoves,
    playerOMoves,
    onClickCell,
}) => {
    const spaceIsTaken = (row, column) => {
        return playerXMoves[row][column]
            || playerOMoves[row][column];
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
                {[0, 1, 2].map(row => (
                    <tr key={row}>
                        {[0, 1, 2].map(column => (
                            <td 
                                key={`${row},${column}`}
                                className={`${cellStyles[row][column]} {spaceIsTaken} empty-cell`} 
                                onClick={() => {
                                    if (!spaceIsTaken(row, column) && onClickCell(row, column)) {
                                        onClickCell(row, column);
                                    }
                                }}
                            >
                                {playerXMoves[row][column] ? 'X' : ''}
                                {playerOMoves[row][column] ? 'O' : ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
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