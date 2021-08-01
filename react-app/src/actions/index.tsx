import PlayerActions from "./PlayerActions";
import InvestigatorSkillsActions from "./InvestigatorSkillsActions";
import WeaponsAndGearActions from "./WeaponsAndGearActions";
import FellowInvestigatorsActions from "./FellowInvestigatorsActions";
import BackstoryActions from "./BackstoryActions";

const actions = {...{
    SET_CLIENT: "CHANGE_CLIENT_TO",
}, ...PlayerActions, ...InvestigatorSkillsActions, ...WeaponsAndGearActions, ...FellowInvestigatorsActions, ...BackstoryActions};

export {actions, PlayerActions, InvestigatorSkillsActions, WeaponsAndGearActions, FellowInvestigatorsActions, BackstoryActions}
export default actions;