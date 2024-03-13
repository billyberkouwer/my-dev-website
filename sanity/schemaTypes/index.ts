import { image } from "./image";
import { infoSchema } from "./info";
import { MuxVideo } from "./mux";
import { projectSchema } from "./project";

export const schemaTypes = [
    image,
    MuxVideo,
    projectSchema,
    infoSchema
]
