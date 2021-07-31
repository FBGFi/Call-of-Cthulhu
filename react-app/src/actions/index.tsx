import PlayerActions from "./PlayerActions";
import InvestigatorSkillsActions from "./InvestigatorSkillsActions";

const actions = {...{
    SET_CLIENT: "CHANGE_CLIENT_TO",
}, ...PlayerActions, InvestigatorSkillsActions}

export {actions, PlayerActions, InvestigatorSkillsActions}
export default actions;