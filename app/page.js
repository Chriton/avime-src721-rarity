'use client';

import {useEffect, useRef, useState} from "react";
import {getTraitsPretty, sleep} from "@/utils/utils";

export default function Home() {

    // This keeps track of how many occurrences a trait has in the collection.
    // This is the initial state of the traits.
    let traitsOccurrencesInitial = {
        "background": {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0,
            "10": 0
        },
        "body": {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0
        },
        "face": {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
        },
        "clothes": {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
        },
        "hair": {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
        },
        "accessory": {
            "0": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4": 0,
            "5": 0,
            "6": 0,
            "7": 0,
            "8": 0,
            "9": 0
        },
        "frame": {
            "0": 0,
        }
    }

    // The list of assetIds that the collection has. The traits for each of them will be fetched from xchain.
    const defaultList = ["A11009555737458156000", "A11149477965487233000", "A14360992668463825000", "A8532798063812652000"];

    const [assetsToRetrieve, setAssetsToRetrieve] = useState(defaultList);

    const handleTextareaChange = (event) => {
        setAssetsToRetrieve(event.target.value.split(/,|\n/).map(value => value.trim()));
    };

    const getCommaSeparatedValues = () => {
        // Filter out any empty strings
        const values = assetsToRetrieve.filter(Boolean);
        console.log(values); // For debugging
        return values;
    };

    // Holds the list of assets with their traits fetched from xchain
    const [assetsList, setAssetsList] = useState([]);

    // Holds the list of traits occurrences in the collection
    const [traitsOccurrences, setTraitsOccurrences] = useState(traitsOccurrencesInitial);

    const [loading, setLoading] = useState(false);
    const avimeTextAreaRef = useRef(null);
    const traitsTextAreaRef = useRef(null);
    const assetsToRetrieveRef = useRef(null);


    async function processAvime() {
        setLoading(true);

        // Reset all the data first
        setAssetsList([]);
        setTraitsOccurrences(traitsOccurrencesInitial);

        // Get the list of assets for which we want to retrieve traits
        let retrieveTheseAssets = getCommaSeparatedValues();
        console.log("retrieveTheseAssets: ", retrieveTheseAssets);

        // Loop through avimeCollection assetIds
        for (const asset of retrieveTheseAssets) {
            try {
                // Get traits from xchain and update our list
                let stamp = await getTraitsPretty(asset);
                // if stamp is not null
                if (stamp) {
                    setAssetsList((prev) => [...prev, stamp]);
                    console.log("Stamp retrieved: ", stamp);

                    // Update traitsOccurrences list
                    setTraitsOccurrences(prev => {
                        let newState = {...prev};
                        newState["background"][stamp["background"]] += 1;
                        newState["body"][stamp["body"]] += 1;
                        newState["face"][stamp["face"]] += 1;
                        newState["clothes"][stamp["clothes"]] += 1;
                        newState["hair"][stamp["hair"]] += 1;
                        newState["accessory"][stamp["accessory"]] += 1;
                        newState["frame"][stamp["frame"]] += 1;
                        return newState;
                    });
                    // To not get rate limited wait a little bit
                    await sleep(300);
                }
            } catch (e) {
                console.log("An error has occurred: ", e);
            }
        }
        setLoading(false);
    }

    useEffect(() => {
        avimeTextAreaRef.current.value = JSON.stringify(assetsList, null, 2);
    }, [assetsList])

    useEffect(() => {
        traitsTextAreaRef.current.value = JSON.stringify(traitsOccurrences, null, 2);
    }, [traitsOccurrences])

    useEffect(() => {
        const area = avimeTextAreaRef.current;
        area.scrollTop = area.scrollHeight;
    });

    return (
        <div className={"flex flex-col w-screen h-screen items-center"}>

            {/*The list of assets to retrieve traits from:*/}
            <div className={"text-xl mt-12"}>Paste assets to retrieve traits from (comma separated)</div>
            <div className={"flex w-full h-80 mx-auto"}>
                <textarea className={"flex bg-gray-100 relative w-full mx-12"}
                          ref={assetsToRetrieveRef}
                          defaultValue={defaultList}
                          onChange={handleTextareaChange}
                />
            </div>

            {/*Get Avime Traits*/}
            <div className={"flex m-6"}>
                <button className="rounded-2xl bg-blue-300 p-5 m-3"
                        onClick={processAvime}>
                    Get Avime Traits
                </button>
            </div>
            <div>
                {loading &&
                    <div className="m-5 animate-spin rounded-full border-t-2 p-6 border-b-2 border-blue-500"></div>
                }
            </div>
            <div className={"flex w-full h-80 mx-auto"}>
                <textarea className={"flex bg-gray-100 relative w-full m-12"} ref={avimeTextAreaRef}/>
            </div>


            {/* Processing rarity*/}
            <div className={"text-2xl"}>Traits Occurrences counter</div>
            <div className={"flex w-full h-80 mx-auto"}>
                <textarea className={"flex bg-gray-100 relative w-full mx-12"} ref={traitsTextAreaRef}/>
            </div>
        </div>
    )
}
