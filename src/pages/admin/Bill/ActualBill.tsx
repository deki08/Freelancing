import React, { useState } from 'react';
import { API_ROUTES } from "../../../utils/constants";
import { useNavigate } from "react-router-dom";
import AuthService from "../../../services/AuthService";
import BillService from "../../../services/BillService";
import Invoice from "./Invoice";
import PayBillComponent from "./PayBillComponent";
import ActualBillTable from './ActualBillTable';

function ActualBill(props: any) {
    const navigate = useNavigate();
    const permission = AuthService.getPermission('PATIENT_BILL');
    
   
    const [data, setData] = useState([]);
    const [refresh, doRefresh] = useState(0);
    const [action, setAction] = useState('none');
    const [bill, setBill] = useState<any>({});
    const pageSizes = [100, 200, 500, 1000, 10000];

    const payHandler = (e: any) => {
        setBill(JSON.parse(e.target.dataset.record));
        setAction('pay');

    }
    const viewHandler = (e: any) => {
        setBill(JSON.parse(e.target.dataset.record));
        setAction('view')
    }

    const cancelHandler = (e: any) => {
        setAction('none');
    }

    const successHandler = (e: any) => {
        setAction('none');
        // doRefresh(1);
    }

    const columns: {}[] = [
        { data: "index", name: "SL", sortable: true, class: "text-center px-1" },
        { data: "patientId", name: "Patient Id", class: "px-2 text-center", sort: true },
        { data: "name", name: "Patient Name", class: "px-1 text-center" },
        { data: "date", name: "Date", class: "text-center px-1 dateCreated", sort: true },
        { data: "agency", name: "Agency / Agent", class: "px-1 text-center", sort: true },
        { data: "travellingTo", name: "Travelling To", class: "text-center px-1" },
        { data: "packageName", name: "Package Name", class: "text-center px-1", sort: true },
        { data: "recieved", name: "Received", class: "text-center px-1", calculateSum: true, currency: true, sort: true },
        { data: "netAmount", name: "Net/Package Amount", class: "text-center px-1", calculateSum: true, currency: true, sort: true },
        { data: "commision", name: "Commission", class: "text-center px-1", calculateSum: true, currency: true, sort: true },
        { data: "due", name: "Due", class: "px-1 text-center", calculateSum: true, currency: true, sort: true },
        { data: "paid", name: "Paid", class: "px-1 text-center", calculateSum: true, currency: true, sort: true },
        { data: "remarks", name: "Remarks", class: "px-1 text-center", sort: true },
    ];

    const handleSearch = (params: any) => {
        BillService.findAllByAllColumnAct(params).then(response => {
            setData(response.data);
            // console.log(response.data);
        }).catch(reason => {
            if (reason.code === "ERR_NETWORK") {
                navigate("/maintenance");
            }
            if (reason.response.status === 401) {
                AuthService.logout();
                navigate("/login");
            }
        });
    }

    return (
        <>
            <div className="app-content content">
                <div className="content-wrapper">
                    <div className="content-wrapper-before"></div>
                    <div className="content-header row">
                        <div className="content-header-left col-md-4 col-12 mb-2">
                            <h3 className="content-header-title">Actual Patient Bill List</h3>
                        </div>
                        <div className="content-header-right col-md-8 col-12">
                            <div className="breadcrumbs-top float-md-right">
                                <div className="breadcrumb-wrapper mr-1">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item"><a href="/user">User</a>
                                        </li>
                                        <li className="breadcrumb-item active">Create
                                        </li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-body">
                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-content collapse show">
                                        <div className="card-body">
                                            <ActualBillTable columns={columns} data={data} onSearch={handleSearch}
                                                endpoint={API_ROUTES.ACT_BILL_ADVANCE_SEARCH} refresh={refresh}
                                                dateFilter={true}
                                                actionButtons={true}
                                                pagesSizes={pageSizes}
                                                searchPlaceholder={"Patient Name, Passport No, Agent Or Agency Name"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                action === 'pay' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                        style={{ display: 'block' }} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-85">
                                    <PayBillComponent billId={bill.id} onCancel={cancelHandler} onSuccess={successHandler} />
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
            {
                action === 'view' ?
                    <div className={`modal fade fadeIn show`} role="dialog"
                        style={{ display: 'block' }} data-backdrop="false" tabIndex={-1}>
                        <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-body scroll-80">
                                    <Invoice billId={bill.id} />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary"
                                        onClick={() => setAction('none')}>Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> : ""
            }
        </>
    );
}

export default ActualBill;
