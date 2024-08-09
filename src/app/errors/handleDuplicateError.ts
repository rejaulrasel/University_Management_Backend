import { TErrorSources } from "../interface/error";

const handleDuplicateError = (err) => {
    const statusCode = 400;
    const errorSources: TErrorSources = [{
        path: 'ami',
        message: err?.errorResponse.errmsg
    }]

    return {
        statusCode,
        message: 'Duplicate Insertion',
        errorSources
    }

}




export default handleDuplicateError;