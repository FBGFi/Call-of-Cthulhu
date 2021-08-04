import React, { useReducer } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import { playerReducer, InitialPlayerState, PlayerContext } from '../../reducers/PlayerReducer';
import { weaponsAndGearReducer, InitialWeaponsAndGearState, WeaponsAndGearContext } from '../../reducers/WeaponsAndGearReducer';
import { investigatorSkillsReducer, InitialInvestigatorSkillsState, InvestigatorSkillsContext } from '../../reducers/InvestigatorSkillsReducer';
import { backstoryReducer, InitialBackstoryState, BackstoryContext } from '../../reducers/BackstoryReducer';
import { fellowInvestigatorsReducer, InitialFellowInvestigatorsState, FellowInvestigatorsContext } from '../../reducers/FellowInvestigatorsReducer';

import SheetPageOne from '../player/SheetPageOne';
import SheetPageTwo from '../player/SheetPageTwo';

const Game: React.FC = () => {
    const params = useParams() as { playerId: string };
    const [playerState, playerDispatch] = useReducer(playerReducer, InitialPlayerState(params.playerId ? params.playerId : undefined));
    const [weaponsAndGearState, weaponsAndGearDispatch] = useReducer(weaponsAndGearReducer, InitialWeaponsAndGearState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [investigatorSkillsState, investigatorSkillsDispatch] = useReducer(investigatorSkillsReducer, InitialInvestigatorSkillsState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [backstoryState, backstoryDispatch] = useReducer(backstoryReducer, InitialBackstoryState(params.playerId ? params.playerId : playerState.CHARACTER_ID));
    const [fellowInvestigatorsState, fellowInvestigatorsDispatch] = useReducer(fellowInvestigatorsReducer, InitialFellowInvestigatorsState(params.playerId ? params.playerId : playerState.CHARACTER_ID));

    return (
        <PlayerContext.Provider value={{ state: playerState, dispatch: playerDispatch }}>
            <WeaponsAndGearContext.Provider value={{ state: weaponsAndGearState, dispatch: weaponsAndGearDispatch }}>
                <InvestigatorSkillsContext.Provider value={{ state: investigatorSkillsState, dispatch: investigatorSkillsDispatch }}>
                    <SheetPageOne />
                </InvestigatorSkillsContext.Provider>

                <FellowInvestigatorsContext.Provider value={{ state: fellowInvestigatorsState, dispatch: fellowInvestigatorsDispatch }}>
                    <BackstoryContext.Provider value={{ state: backstoryState, dispatch: backstoryDispatch }}>
                        <SheetPageTwo />
                    </BackstoryContext.Provider>

                </FellowInvestigatorsContext.Provider>
                <Footer />
            </WeaponsAndGearContext.Provider>
        </PlayerContext.Provider >
    );
}

export default Game;