import React, { useContext, useState, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory, useParams } from 'react-router-dom'


export const GameForm = props => {

    const history = useHistory()
    const { gameId } = useParams()

    const { createGame, getGameTypes, gameTypes, getGameById, updateGame } = useContext(GameContext)

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        skillLevel: 1,
        numberOfPlayers: 0,
        title: "",
        maker: "",
        gameTypeId: 0
    })

    /*
        Get game types on initialization so that the <select>
        element presents game type choices to the user.
    */
    const handleSaveGame = () => {
        if (gameId) {
            updateGame({
                id: gameId,
                skillLevel: parseInt(currentGame.skillLevel),
                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                title: currentGame.title,
                maker: currentGame.maker,
                gameTypeId: parseInt(currentGame.gameTypeId)
            })
            .then(() => history.push(`/`))
        } else {
            createGame({
                skillLevel: parseInt(currentGame.skillLevel),
                numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                title: currentGame.title,
                maker: currentGame.maker,
                gameTypeId: parseInt(currentGame.gameTypeId)
            })
            .then(() => history.push("/"))
        }
    }
    
    useEffect(() => {
        getGameTypes()
    }, [])

    useEffect(() => {
        if (gameId) {
            getGameById(gameId)
                .then(game => {
                    setCurrentGame({
                        skillLevel: game.skill_level,
                        numberOfPlayers: game.number_of_players,
                        title: game.title,
                        maker: game.maker,
                        gameTypeId: game.game_type.id
                    })
                })
        }
    }, [gameId])

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
    const handleControlledInputChange = (event) => {
        const newGameState = { ...currentGame }
        newGameState[event.target.name] = event.target.value
        setCurrentGame(newGameState)
    }

    return (
        <form className="gameForm">
            {gameId ? <h2 className="editGameForm__title">Edit Game</h2> : <h2 className="gameForm__title">Register New Game</h2>}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number Of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="text" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame.skillLevel}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select value={currentGame.gameTypeId} name="gameTypeId" className="form-control" onChange={handleControlledInputChange}>
                        <option value="0">Select a game type:</option>
                        {gameTypes.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button className="btn btn-2 btn-sep icon-create"
            type="submit"
            onClick={evt => {
                evt.preventDefault()
                handleSaveGame()
            }}>{gameId ? "Save" : "Create"}</button>               
        </form>
    )
}