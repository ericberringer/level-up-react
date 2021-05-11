import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { GameContext } from "../game/GameProvider"
import { EventContext } from "./EventProvider"


export const EventForm = () => {

    const { getGames, games } = useContext(GameContext)
    const { createEvent } = useContext(EventContext)

    const history = useHistory()

    const [currentEvent, setEvent] = useState({
        eventName: "",
        description: "",
        organizer: "",
        date: "",
        gameId: 0,
        time: ""
    })

    useEffect(() => {
        getGames()
    }, [])

    const handleControlledInputChange = (event) => {
        const newEventState = { ...currentEvent }
        newEventState[event.target.name] = event.target.value
        setEvent(newEventState)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Schedule New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="eventName">Event Name: </label>
                    <input type="text" name="eventName" required autoFocus className="form-control"
                        value={currentEvent.eventName}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentEvent.description}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="organizer">Organizer: </label>
                    <input type="text" name="organizer" required autoFocus className="form-control"
                        value={currentEvent.organizer}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input type="date" name="date" required autoFocus className="form-control"
                        value={currentEvent.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="time">Time: </label>
                    <input type="time" name="time" required autoFocus className="form-control"
                        value={currentEvent.time}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameId">Game: </label>
                    <select name="gameId" className="form-control"
                        value={ currentEvent.gameId }
                        onChange={handleControlledInputChange}>
                        <option value="0">Select a game...</option>
                        {
                            games.map(g => (
                                <option key={g.id} value={g.id}>
                                    {g.title}
                                </option>
                            ))
                        }
                    </select>
                </div>
            </fieldset>

            {/* Create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    // Create the event
                    const event = {
                        eventName: currentEvent.eventName,
                        description: currentEvent.description,
                        organizer: currentEvent.organizer,
                        date: currentEvent.date,
                        gameId: parseInt(currentEvent.gameId),
                        time: currentEvent.time
                    }
                    createEvent(event)
                        .then(() => history.push("/events"))
                    // Once event is created, redirect user to event list
                }}
                className="btn btn-2 btn-sep icon-create">Create Event</button>
        </form>
    )
}