import {API_ROUTES} from "../utils/constants";
import http from "../config/httpConfig";

const save = async (patient:{}) => {
    return http.post(API_ROUTES.BILL_POST, patient);
};

const addBill = async (patient:{}) => {
    return http.put(API_ROUTES.BILL_PUT, patient);
};

const findById = async (id:any) => {
    return http.get(API_ROUTES.BILL_GET+id);
};

const findAll = async () =>{
    return await http.get(API_ROUTES.BILL_ALL);
};

const findByPatient = async (id:any) => {
    return http.get(API_ROUTES.PATIENT_REPORT_BILL_GET.replace(':id',id));
};

const deleteById = async (id:bigint) => {
    return http.delete(API_ROUTES.BILL_DELETE+id);
};

const findAllByAllColumn = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.BILL_ADVANCE_SEARCH,data);
};

const findAllByAllColumnAct = async (data:{pageNumber: number,pageSize:number,text:string}) => {
    return http.post(API_ROUTES.ACT_BILL_ADVANCE_SEARCH,data);
};

const pay = async (data:{accountId: number,billId: number,amount:number,updateEmail:String}) => {
    return http.post(API_ROUTES.BILL_PAYMENT_ADD.replace(':ID',data.billId.toString()),data);
};

const updateActualBill =async (patient:{}) => {
    return http.put(API_ROUTES.ACT_BILL_ADVANCE_SEARCH, patient);
    
}

const BillService = {
    save,
    addBill,
    findById,
    findAll,
    findByPatient,
    deleteById,
    findAllByAllColumn,
    pay,
    findAllByAllColumnAct,
    updateActualBill,
    
}
export default BillService;
