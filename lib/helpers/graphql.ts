import { jsonToSchema } from "@walmartlabs/json-to-simple-graphql-schema"
import { existsSync, mkdirSync } from "fs"
import fs from "fs/promises"
import sanitize from "sanitize-filename"

const SAVE_PATH = "./snapshots/"

export async function saveGraphQLType(path: string, jsonString: string) {
    const filename = escapeFilename(path) + ".graphql"
    const schema: any = jsonToSchema({jsonInput: jsonString})
    await fs.writeFile(`${SAVE_PATH}${filename}`, schema.value)
}

export function initSetupSync() {
    if(!existsSync(SAVE_PATH)) {
        mkdirSync(SAVE_PATH);
    }
}

function escapeFilename(path: string) {
    if(path.startsWith("/")) {
        path = path.substring(1)
    }
    path = path.replaceAll("/", "-")
    return sanitize(path);
}

