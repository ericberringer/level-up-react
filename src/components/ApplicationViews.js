import React from "react"
import { Route } from "react-router-dom"
import { EventForm } from "./event/EventForm.js"
import { EventList } from "./event/EventList.js"
import { EventProvider } from "./event/EventProvider.js"
import { GameList } from "./game/GameList.js"
import { GameProvider } from "./game/GameProvider.js"
import { GameForm } from "./game/GameForm.js"
import { ProfileProvider } from "./profile/ProfileProvider.js"
import { Profile } from "./profile/Profile.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>

                {/* ############# Games ############# */}

            <GameProvider>
                <EventProvider>
                    <ProfileProvider><ProfileProvider/>

                    <Route exact path="/">
                        <GameList />
                    </Route>

                    <Route exact path="/games/new">
                        <GameForm />
                    </Route>

                    <Route exact path="/games/:gameId(\d+)/edit">
                        <GameForm />
                    </Route>

                    </ProfileProvider>
                </EventProvider>
            </GameProvider>

                {/* ############# Events ############# */}

            <GameProvider>
                <EventProvider>
                    <ProfileProvider>

                    <Route exact path="/events">
                        <EventList />
                    </Route>

                    <Route exact path="/events/new">
                        <EventForm />
                    </Route>
                    </ProfileProvider>
                </EventProvider>
            </GameProvider>

                {/* ############# Profile ############# */}

            <GameProvider>
                <EventProvider>
                    <ProfileProvider>

                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                    
                    </ProfileProvider>
                </EventProvider>
            </GameProvider>

        </main>
    </>
}