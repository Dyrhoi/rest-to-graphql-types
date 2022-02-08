import axios from "axios"
import { API } from "./lib/helpers/api"
import {initSetupSync, saveGraphQLType } from "./lib/helpers/graphql";

const paths = [
    "/your-path",
    "/your-path/other",
]

initSetupSync();
generate(paths);

async function generate(paths: Array<string>) {

    const pathsAmount = paths.length;
    let pathsRemaning = 0;

    await Promise.all(paths.map(async path => {
        try {
            const response = await API.get(path)
            await saveGraphQLType(path, JSON.stringify(response.data));
        } catch(err) {
            axios.isAxiosError(err) && err.response ? 
                console.error(`Error loading path [${path}], returned: `, err.response.status) :
                console.error(`Unknon error occured loading ${path}`, err.code)

            console.debug(err)
        }
        pathsRemaning++;
        console.log(`Path complete: ${path}`, pathsRemaning, "/", pathsAmount);
    }));

    console.log("done")
}