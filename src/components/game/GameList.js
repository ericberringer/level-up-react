import React, { useContext, useEffect } from "react"
import { GameContext } from "./GameProvider.js"
import { useHistory } from "react-router-dom"
import { EventContext } from "../event/EventProvider.js"
import "./Games.css"

export const GameList = () => {

    const { games, getGames } = useContext(GameContext)
    const { events, getEvents } = useContext(EventContext)

    const history = useHistory()

    useEffect(() => {
        getGames()
            .then(getEvents)
    }, [])

    return (
        <article className="games">
            <h1>Games</h1>
            <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            history.push({ pathname: "/games/new" })
            }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <h3 className="game__title">{game.title} by {game.maker}</h3>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div className="game__gameType">Game Type: {game.game_type.label}</div>
                        <div className="game__edit">
                        <h3>Upcoming Events</h3>
                        {
                            events.filter(event => event.game.id === game.id)
                            .map(event => {
                                return <div key={`gameEvent--${event.id}`}>
                                        {event.event_name} {event.date} @ {event.time}
                                    </div>
                                })
                        }
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                            history.push(`/games/${game.id}/edit`)
                            }}
                            >Edit {game.title}</button>
                        </div>
                        <div className="">
                        </div>
                    </section>
                })
            }
        </article>
    )
}