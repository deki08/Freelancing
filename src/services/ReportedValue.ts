import { API_ROUTES } from "../utils/constants";
import http from "../config/httpConfig";


const save = async (ref: {}) => {
    return http.post(API_ROUTES.REPO_VALUES_GET, ref);
};

const find = async () => {
    return http.get(API_ROUTES.REPO_VALUES_GET);
};


const ReportedValue = {
    save,
    find,

}
export default ReportedValue;
