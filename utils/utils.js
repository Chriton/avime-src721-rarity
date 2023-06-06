import {console} from "next/dist/compiled/@edge-runtime/primitives/console";
import {avimeObject} from "@/utils/src721";

export async function getTraitsPretty(assetID) {
    try {
        let rawTraits = await getTraitsRaw(assetID);
        // console.log("rawData: ", rawTraits.ts);
        let traits = rawTraits.ts;

        let prettyTraits = {
            "assetID":      assetID,
            "background":   traits[0],
            "body":         traits[1],
            "face":         traits[2],
            "clothes":      traits[3],
            "hair" :        traits[4],
            "accessory":    traits[5],
            "frame":        traits[6]
        }

        return prettyTraits;
    } catch (e) {
        console.log(e)
    }
}

export async function getTraitsRaw(assetID) {
    let xchainData = await getXchainData(assetID);
    // console.log("xchainData: ", xchainData);
    let imgJSON = decodeTraits(xchainData.description);
    // console.log("imgJSON: ", imgJSON);
    return imgJSON;
}

export function decodeTraits(xChainDescriptionData) {

    // description will be like this:
    // stamp:eyJwIjoic3JjLTcyMSIsIm9wIjoibWludCIsImMiOiJBOTI4NjgyMzI5MzU4Njg0ODAwMCIsInN5bWJvbCI6IkFWSU1FIiwidHMiOls3LDUsNSwwLDEsNCwwXX0=

    // start from 6 (without stamp:)
    // decoded will be like this:
    // {"p":"src-721","op":"mint","c":"A9286823293586848000","symbol":"AVIME","ts":[7,5,5,0,1,4,0]}
    // console.log("xChainDescriptionData", xChainDescriptionData);
    try {
        let mintData = (xChainDescriptionData).slice(6);
        let imgJSON = JSON.parse(atob(mintData));
        // console.log("src721 imgJSON: ", imgJSON)
        return imgJSON;
    } catch (e) {
        console.log(e)
    }
}

export async function getXchainData(asset) {
    try {
        let url = `https://xchain.io/api/asset/${asset}`
        const response = await fetch(url)
        const newData = await response.json()
        // console.log(newData)
        return (newData)

    } catch (e) {
        console.log(e)
    }
}

export function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}