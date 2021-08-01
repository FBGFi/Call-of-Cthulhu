import React, { useContext } from 'react';
import { WeaponsAndGearActions } from '../../../../../actions';
import InfoBox from '../../../../../components/InfoBox';
import { WeaponsAndGearContext } from '../../../../../reducers/WeaponsAndGearReducer';
import './CashAndAssets.css';

type AssetInputProps = {
    defaultValue: string;
    onBlur: (e: React.FocusEvent<HTMLInputElement>, assetKey: string) => void;
    assetKey: "SET_ASSET1"|"SET_ASSET2"|"SET_ASSET3"|"SET_ASSET4"|"SET_ASSET5"|"SET_ASSET6"|"SET_ASSET7"|"SET_ASSET8";
}

const AssetInput: React.FC<AssetInputProps> = (props) => {
    return <input defaultValue={props.defaultValue} type="text" size={1} />
}

const CashAndAssets: React.FC = () => {
    const { state, dispatch } = useContext(WeaponsAndGearContext);

    const setValueForReducer = (e: React.FocusEvent<HTMLInputElement>, assetKey: string) => {
        // @ts-ignore
        dispatch({ type: WeaponsAndGearActions.SET_CASH_AND_ASSETS.ASSETS[assetKey], value: e.target.value});
    }

    return (
        <InfoBox title="Cash & Assets" className='CashAndAssets'>
            <div className="asset-container">
                <div className="row">
                    <span>Spending Level</span>
                    <input onBlur={(e) => dispatch({ type: WeaponsAndGearActions.SET_CASH_AND_ASSETS.SPENDING_LEVEL, value: e.target.value})} defaultValue={state.CASH_AND_ASSETS.SPENDING_LEVEL} type="text" size={1} />
                </div>
                <div className="row">
                    <span>Cash</span>
                    <input onBlur={(e) => dispatch({ type: WeaponsAndGearActions.SET_CASH_AND_ASSETS.CASH, value: e.target.value})} defaultValue={state.CASH_AND_ASSETS.CASH} type="text" size={1} />
                </div>
                <div className="row">
                    <span>Assets</span>
                    <AssetInput assetKey="SET_ASSET1" onBlur={setValueForReducer} defaultValue={state.CASH_AND_ASSETS.ASSETS.ASSET_1} />
                </div>               
                <AssetInput assetKey="SET_ASSET2" onBlur={setValueForReducer} defaultValue={state.CASH_AND_ASSETS.ASSETS.ASSET_2} />           
                <AssetInput assetKey="SET_ASSET3" onBlur={setValueForReducer} defaultValue={state.CASH_AND_ASSETS.ASSETS.ASSET_3} />
                <AssetInput assetKey="SET_ASSET4" onBlur={setValueForReducer} defaultValue={state.CASH_AND_ASSETS.ASSETS.ASSET_4} />                
                <AssetInput assetKey="SET_ASSET5" onBlur={setValueForReducer} defaultValue={state.CASH_AND_ASSETS.ASSETS.ASSET_5} />                
                <AssetInput assetKey="SET_ASSET6" onBlur={setValueForReducer} defaultValue={state.CASH_AND_ASSETS.ASSETS.ASSET_6} />                
                <AssetInput assetKey="SET_ASSET7" onBlur={setValueForReducer} defaultValue={state.CASH_AND_ASSETS.ASSETS.ASSET_7} />                
                <AssetInput assetKey="SET_ASSET8" onBlur={setValueForReducer} defaultValue={state.CASH_AND_ASSETS.ASSETS.ASSET_8} />
            </div>
        </InfoBox>
    );
}

export default CashAndAssets;