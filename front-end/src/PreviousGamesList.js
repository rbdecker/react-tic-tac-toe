import TicTacToeBoard from './TicTacToeBoard';

const PreviousGamesList = ({ games = [] }) => {
    return (
        <div className="previous-list">
            <h3>Previous Games:</h3>
            {games.map(game => (
                <div className="previous-list-item">
                    <TicTacToeBoard
                    key={game.id}
                        playerXMoves={game.playerXMoves}
                        playerOMoves={game.playerOMoves} />
                </div>
            ))}
        </div>
    );
}

export default PreviousGamesList;