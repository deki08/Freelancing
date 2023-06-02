import { API_ROUTES } from "../utils/constants";
import http from "../config/httpConfig";

const save = async (ref: {}) => {
    return http.post(API_ROUTES.MAL_VALUES_POST, ref);
};


const uppdate = async (ref: {}) => {
    return http.post(API_ROUTES.MAL_VALUES_Uppdate, ref);
};

const find = async () => {
    return http.get(API_ROUTES.MAL_VALUES_GET);
};

const findAll = async () => {
    return await http.get(API_ROUTES.MAL_VALUES_ALL);
};

const findById = async (id: any) => {
    return http.get(API_ROUTES.MAL_VALUES_GET_BY_ID + id);
};

const MalaysiService = {
    save,
    find,
    findAll,
    findById,
    uppdate,
}
export default MalaysiService;
