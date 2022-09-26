const TicTacToeBoard = () => {
    return (
        <table>
            <tr>
                <td>X</td>
                <td className="vertical-lines"></td>
                <td></td>
            </tr>
            <tr>
                <td className="horizontal-lines"></td>
                <td className="vertical-lines horizontal-lines">O</td>
                <td className="horizontal-lines"></td>
            </tr>
            <tr>
                <td></td>
                <td className="vertical-lines"></td>
                <td>X</td>
            </tr>
        </table>
    );
}

export default TicTacToeBoard;